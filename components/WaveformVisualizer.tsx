import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { SpiMode } from '../types';
import { SPI_MODES_INFO } from '../constants';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface WaveformVisualizerProps {
  initialMode?: SpiMode;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ initialMode = SpiMode.Mode0 }) => {
  const [mode, setMode] = useState<SpiMode>(initialMode);
  const [dataByte, setDataByte] = useState<number>(0xA5); // Default 10100101
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Helper to get bits array from byte
  const bits = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => (dataByte >> (7 - i)) & 1);
  }, [dataByte]);

  const modeInfo = SPI_MODES_INFO.find(m => m.mode === mode) || SPI_MODES_INFO[0];

  // Draw Waveforms
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 320; // Slightly shorter to fit UI
    const margin = { top: 30, right: 30, bottom: 20, left: 80 };
    const innerWidth = width - margin.left - margin.right;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // --- Signal Generation Logic ---
    const x = d3.scaleLinear()
      .domain([0, 20])
      .range([0, innerWidth]);

    const channelHeight = 60;
    const gap = 30;
    const getY = (channelIndex: number, val: number) => {
      const base = channelIndex * (channelHeight + gap) + channelHeight;
      return base - (val * (channelHeight - 10)); // -10 padding
    };

    const { cpol, cpha } = modeInfo;
    const idleClk = cpol;
    const activeClk = cpol === 0 ? 1 : 0;

    // 1. CS Signal
    const csData = [
      { t: 0, v: 1 }, { t: 1, v: 1 }, { t: 1.001, v: 0 },
      { t: 18, v: 0 }, { t: 18.001, v: 1 }, { t: 20, v: 1 }
    ];

    // 2. SCLK Signal
    const clkData = [{ t: 0, v: idleClk }, { t: 2, v: idleClk }];
    let currentClk = idleClk;
    // Fix: Loop runs from t=2 to t<18 (stopping at 17) to generate exactly 8 clock pulses (edges at 2..17)
    // t=18 is the start of a theoretical 9th bit, so we must stop before it.
    for (let t = 2; t < 18; t++) {
        const nextVal = (t % 2 === 0) ? activeClk : idleClk; 
        clkData.push({ t: t, v: currentClk }); 
        clkData.push({ t: t + 0.001, v: nextVal }); 
        currentClk = nextVal;
    }
    // Ensure the line stays flat at idle level after the last clock edge
    clkData.push({ t: 18, v: idleClk }); 
    clkData.push({ t: 20, v: idleClk });

    // 3. MOSI Data
    const mosiData: {t: number, v: number}[] = [{t: 0, v: 0}]; 
    const dataStartT = cpha === 0 ? 1 : 2;
    bits.forEach((bit, i) => {
      const tStart = dataStartT + (i * 2);
      mosiData.push({ t: tStart, v: mosiData[mosiData.length-1].v });
      mosiData.push({ t: tStart + 0.001, v: bit });
    });
    const lastT = dataStartT + 16;
    mosiData.push({ t: lastT, v: bits[7] });
    mosiData.push({ t: lastT + 0.001, v: 0 }); 
    mosiData.push({ t: 20, v: 0 });

    // --- Drawing Functions ---
    const drawChannel = (index: number, name: string, data: {t: number, v: number}[], color: string) => {
       // Label
       g.append("text")
        .attr("x", -10)
        .attr("y", getY(index, 0.5))
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .attr("class", "font-mono font-bold text-sm fill-slate-600")
        .text(name);

       // Guide lines
       [0, 1].forEach(v => {
        g.append("line")
            .attr("x1", 0).attr("x2", innerWidth)
            .attr("y1", getY(index, v)).attr("y2", getY(index, v))
            .attr("stroke", "#e2e8f0").attr("stroke-dasharray", "4");
       });

       // Path
       const pathData = d3.line<{t: number, v: number}>()
        .x(d => x(d.t))
        .y(d => getY(index, d.v))
        (data);
        
       g.append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2.5);

       // Sampling Indicators
       if (name === "SCLK") {
           const sampleStart = cpha === 0 ? 2 : 3;
           for(let k=0; k<8; k++) {
               const tSample = sampleStart + (k*2);
               // Vertical sampling line
               g.append("line")
                .attr("x1", x(tSample))
                .attr("x2", x(tSample))
                .attr("y1", -20)
                .attr("y2", height)
                .attr("stroke", "rgba(0,0,0,0.05)")
                .attr("stroke-dasharray", "2")
                .attr("class", `sample-guide sample-guide-${k}`);
                
               // Sampling Circle
               const circleY = getY(index, (tSample % 2 === 0 && cpol === 0) ? 1 : (tSample % 2 !== 0 && cpol === 1) ? 1 : 0 );
               g.append("circle")
                .attr("cx", x(tSample))
                .attr("cy", circleY) 
                .attr("r", 4)
                .attr("fill", color)
                .attr("class", `sclk-circle-${k}`);
           }
       }
       
       if (name === "MOSI") {
           bits.forEach((bit, k) => {
               const bitCenterT = (cpha === 0 ? 1 : 2) + (k * 2) + 1;
               g.append("text")
                .attr("x", x(bitCenterT))
                .attr("y", getY(index, 0.5))
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("class", "text-[10px] font-mono fill-slate-500 font-bold")
                .text(bit);
           });
       }
    };

    drawChannel(0, "CS / SS", csData, "#ef4444");
    drawChannel(1, "SCLK", clkData, "#3b82f6");
    drawChannel(2, "MOSI", mosiData, "#10b981");

    // --- Animation Elements ---
    const scanG = g.append("g").attr("class", "scan-group").style("display", "none");
    
    scanG.append("line")
         .attr("class", "scan-line")
         .attr("y1", -20)
         .attr("y2", height)
         .attr("stroke", "#dc2626")
         .attr("stroke-width", 2)
         .attr("stroke-dasharray", "5,2");
         
    const labelGroup = scanG.append("g").attr("class", "scan-label-group");
    
    labelGroup.append("rect")
         .attr("class", "scan-label-bg")
         .attr("x", -35)
         .attr("y", -28)
         .attr("width", 70)
         .attr("height", 24)
         .attr("rx", 4)
         .attr("fill", "#dc2626");
         
    labelGroup.append("text")
         .attr("class", "scan-label-text")
         .attr("y", -12)
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("font-size", "11px")
         .attr("font-family", "monospace")
         .attr("font-weight", "bold")
         .text("t=0");

  }, [mode, dataByte, bits, modeInfo]);

  // Handle Animation Frame
  useEffect(() => {
    if (!svgRef.current || !isPlaying) return;
    
    const svg = d3.select(svgRef.current);
    const scanG = svg.select(".scan-group");
    const scanLine = svg.select(".scan-line");
    const labelGroup = svg.select(".scan-label-group");
    const scanText = svg.select(".scan-label-text");
    const scanRect = svg.select(".scan-label-bg");
    
    if (scanG.empty()) return;
    
    scanG.style("display", "block");
    
    const width = containerRef.current?.clientWidth || 0;
    const margin = { left: 80, right: 30 };
    const innerWidth = width - margin.left - margin.right;
    const x = d3.scaleLinear().domain([0, 20]).range([0, innerWidth]);

    const duration = 8000; // Slower for better observation (8s)
    
    // Calculate sample times
    const sampleStart = modeInfo.cpha === 0 ? 2 : 3;
    const sampleTimes = Array.from({length: 8}, (_, k) => sampleStart + k * 2);

    const animate = (time: number) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        let elapsed = time - startTimeRef.current;
        
        // Loop logic
        if (elapsed > duration) {
            elapsed = 0;
            startTimeRef.current = time;
            // Reset UI on loop
            for(let k=0; k<8; k++) {
                const cell = document.getElementById(`bit-cell-${k}`);
                if (cell) {
                    cell.style.backgroundColor = '#f1f5f9';
                    cell.style.borderColor = '#e2e8f0';
                    cell.classList.remove('text-white', 'shadow-lg', 'scale-110');
                    cell.querySelector('.value-text')?.classList.add('opacity-0');
                }
            }
        }

        const t = (elapsed / duration) * 20; 
        const xPos = x(t);
        
        // Move scanline
        scanLine.attr("transform", `translate(${xPos}, 0)`);
        labelGroup.attr("transform", `translate(${xPos}, 0)`);
        
        // Check for triggers
        let activeLabel = `t=${t.toFixed(1)}`;
        let activeColor = "#dc2626"; // Default Red

        sampleTimes.forEach((st, k) => {
            const dist = Math.abs(t - st);
            const isNear = dist < 0.2; // Trigger window
            const isPast = t > st;

            // DOM UI Update (Shift Register)
            const cell = document.getElementById(`bit-cell-${k}`);
            if (cell) {
                const textEl = cell.querySelector('.value-text');
                if (isPast) {
                     // Bit is latched
                     const bitVal = bits[k];
                     const color = bitVal ? '#10b981' : '#3b82f6'; // Green(1) or Blue(0)
                     cell.style.backgroundColor = color;
                     cell.style.borderColor = color;
                     cell.classList.add('text-white');
                     textEl?.classList.remove('opacity-0');
                }
                
                if (isNear) {
                    // Flash effect
                    cell.style.transform = "scale(1.15)";
                    cell.style.boxShadow = `0 0 15px ${bits[k] ? 'rgba(16,185,129,0.6)' : 'rgba(59,130,246,0.6)'}`;
                    activeLabel = `采样 Bit ${7-k}`; // MSB First, so index 0 is Bit 7
                    activeColor = "#0f172a"; // Dark text bg
                } else if (isPast) {
                    cell.style.transform = "scale(1)";
                    cell.style.boxShadow = "none";
                }
            }

            // SVG Graph Update
            const circle = svg.select(`.sclk-circle-${k}`);
            const guide = svg.select(`.sample-guide-${k}`);
            
            if (!circle.empty()) {
                if (isNear) {
                    circle
                        .attr("r", 8)
                        .attr("stroke", "white")
                        .attr("stroke-width", 3)
                        .attr("filter", "drop-shadow(0px 0px 4px rgba(0,0,0,0.5))");
                    guide.attr("stroke", "rgba(220, 38, 38, 0.4)").attr("stroke-width", 2);
                } else {
                    circle
                        .attr("r", 4)
                        .attr("stroke", "none")
                        .attr("stroke-width", 0)
                        .attr("filter", "none");
                    guide.attr("stroke", "rgba(0,0,0,0.05)").attr("stroke-width", 1);
                }
            }
        });

        // Update Scan Label
        scanText.text(activeLabel);
        scanRect.attr("fill", activeColor);
        // Adjust label width based on text length approximation
        const labelWidth = activeLabel.length > 5 ? 80 : 50;
        scanRect.attr("width", labelWidth).attr("x", -labelWidth/2);
        
        animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
        cancelAnimationFrame(animationRef.current);
        startTimeRef.current = 0; 
    };
  }, [isPlaying, mode, dataByte, bits]); 

  const resetAnimation = () => {
      startTimeRef.current = 0; // Will restart loop on next frame
      // Manually reset UI
      for(let k=0; k<8; k++) {
        const cell = document.getElementById(`bit-cell-${k}`);
        if (cell) {
            cell.style.backgroundColor = '#f1f5f9';
            cell.style.borderColor = '#e2e8f0';
            cell.classList.remove('text-white');
            cell.style.transform = "scale(1)";
            cell.style.boxShadow = "none";
            cell.querySelector('.value-text')?.classList.add('opacity-0');
        }
      }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col xl:flex-row justify-between items-center gap-6">
        
        <div className="flex-1 min-w-[200px]">
           <h3 className="font-semibold text-slate-800">波形仿真器</h3>
           <p className="text-xs text-slate-500">观察移位寄存器填充过程</p>
        </div>

        {/* Shift Register Visualization */}
        <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">从机移位寄存器 (接收)</span>
            <div className="flex gap-1 p-2 bg-slate-200/50 rounded-lg border border-slate-200 shadow-inner">
                {bits.map((b, i) => (
                    <div 
                        key={i} 
                        id={`bit-cell-${i}`} 
                        className="w-8 h-10 bg-slate-100 border-2 border-slate-200 rounded flex flex-col items-center justify-center transition-all duration-200 relative overflow-hidden"
                    >
                        <span className="text-[9px] text-slate-400 absolute top-0.5 left-1">
                            {7-i}
                        </span>
                        <span className="value-text opacity-0 font-mono font-bold text-sm">
                            {b}
                        </span>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={resetAnimation}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="重置动画"
                >
                    <RefreshCw size={18} />
                </button>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all text-sm font-medium active:scale-95"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? "暂停" : "播放"}
                </button>
            </div>

            {/* Input Controls */}
             <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1.5 pl-3">
                <span className="text-xs font-medium text-slate-500">数据(Hex)</span>
                <input 
                    type="text" 
                    maxLength={2}
                    value={dataByte.toString(16).toUpperCase().padStart(2, '0')}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 16);
                        if (!isNaN(val)) {
                            setDataByte(val);
                            resetAnimation();
                        }
                    }}
                    className="w-12 text-center border-b-2 border-slate-300 focus:border-blue-500 outline-none font-mono text-sm text-slate-700 font-bold"
                />
            </div>

            <div className="flex flex-col gap-1">
                 <div className="flex bg-slate-100 rounded-lg p-1">
                    {[0, 1, 2, 3].map((m) => (
                        <button
                            key={m}
                            onClick={() => { setMode(m as SpiMode); resetAnimation(); }}
                            className={`w-8 py-1 rounded text-xs font-bold transition-all ${
                                mode === m 
                                ? 'bg-white text-blue-600 shadow-sm scale-105' 
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
                <span className="text-[10px] text-slate-400 text-center font-medium">SPI 模式</span>
            </div>
        </div>
      </div>

      <div className="p-4 relative">
        <div ref={containerRef} className="w-full overflow-x-auto">
            <svg ref={svgRef} className="w-full min-w-[600px] block touch-pan-x"></svg>
        </div>
        
        <div className="mt-2 flex justify-between items-end px-2">
             <div className="text-xs text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span> 数据 1
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 ml-3 mr-1"></span> 数据 0
             </div>
             <div className="font-mono text-xs text-right text-slate-400">
                CPOL={modeInfo.cpol} | CPHA={modeInfo.cpha}
             </div>
        </div>
      </div>
    </div>
  );
};

export default WaveformVisualizer;