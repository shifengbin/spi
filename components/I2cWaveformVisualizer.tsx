import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Play, Pause, RefreshCw } from 'lucide-react';

const I2cWaveformVisualizer: React.FC = () => {
  const [address, setAddress] = useState<number>(0x50); // 7-bit address
  const [dataByte, setDataByte] = useState<number>(0xA5); // 8-bit data
  const [isWrite, setIsWrite] = useState<boolean>(true); // R/W bit
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Constants
  const TOTAL_TIME = 22; // Total time units for visualization
  const DURATION = 8000; // Animation duration in ms

  // Calculate bits for Address (7 bits) and Data (8 bits)
  const addrBits = useMemo(() => Array.from({ length: 7 }, (_, i) => (address >> (6 - i)) & 1), [address]);
  const dataBits = useMemo(() => Array.from({ length: 8 }, (_, i) => (dataByte >> (7 - i)) & 1), [dataByte]);

  // Draw Waveforms
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 280;
    const margin = { top: 40, right: 30, bottom: 20, left: 60 }; // Increased top margin for labels
    const innerWidth = width - margin.left - margin.right;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scale
    const x = d3.scaleLinear()
      .domain([0, TOTAL_TIME])
      .range([0, innerWidth]);

    const channelHeight = 60;
    const gap = 50; // Increased gap
    const getY = (channelIndex: number, val: number) => {
      const base = channelIndex * (channelHeight + gap) + channelHeight;
      return base - (val * (channelHeight - 15));
    };

    // --- Signal Generation ---
    const sclData: {t: number, v: number}[] = [];
    const sdaData: {t: number, v: number}[] = [];

    // Helper to add points
    const addPt = (arr: any[], t: number, v: number) => {
        // Add a point just before change to create square wave
        if (arr.length > 0) {
            arr.push({ t: t, v: arr[arr.length - 1].v });
        }
        arr.push({ t: t, v: v });
    };

    // Initial State (Idle: Both High)
    addPt(sclData, 0, 1);
    addPt(sdaData, 0, 1);

    // 1. START Condition (t=1): SDA drops while SCL is High
    addPt(sdaData, 1, 0);
    // SCL drops at t=1.5 to start clocking
    addPt(sclData, 1.5, 0);

    let currentTime = 1.5;

    // Function to generate a clock cycle and data bit
    const addBit = (bitVal: number) => {
        // Data changes when SCL is Low
        addPt(sdaData, currentTime, bitVal);
        
        // SCL Pulse (Low -> High -> Low)
        addPt(sclData, currentTime + 0.25, 0); // Ensure Low
        addPt(sclData, currentTime + 0.25, 1); // Rising Edge (Sample)
        addPt(sclData, currentTime + 0.75, 1); // Hold High
        addPt(sclData, currentTime + 0.75, 0); // Falling Edge
        
        currentTime += 1;
    };

    // 2. Address Bits (7 bits)
    addrBits.forEach(bit => addBit(bit));

    // 3. R/W Bit
    addBit(isWrite ? 0 : 1);

    // 4. ACK (Slave pulls low)
    addBit(0); 
    const ack1Time = currentTime - 0.5;

    // 5. Data Bits (8 bits)
    dataBits.forEach(bit => addBit(bit));

    // 6. ACK (Slave pulls low)
    addBit(0);
    const ack2Time = currentTime - 0.5;

    // 7. STOP Condition
    // SCL goes High, then SDA goes High
    addPt(sdaData, currentTime, 0); // Ensure SDA low first
    addPt(sclData, currentTime + 0.25, 0);
    addPt(sclData, currentTime + 0.25, 1); // SCL High
    
    // STOP: SDA Rising while SCL High
    addPt(sdaData, currentTime + 0.5, 1); 
    const stopTime = currentTime + 0.5;
    
    // Extend to end
    addPt(sclData, TOTAL_TIME, 1);
    addPt(sdaData, TOTAL_TIME, 1);


    // --- Drawing ---
    
    // Draw Special Highlights for Start & Stop (Backgrounds first)
    const drawHighlight = (t: number, type: 'START' | 'STOP') => {
        const color = type === 'START' ? '#d97706' : '#dc2626'; // Amber / Red
        const bgColor = type === 'START' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(239, 68, 68, 0.1)';
        
        // 1. Shaded Region
        g.append("rect")
         .attr("x", x(t - 0.6))
         .attr("y", -30)
         .attr("width", x(1.2) - x(0))
         .attr("height", height + 30)
         .attr("fill", bgColor)
         .attr("rx", 6);
         
        // 2. Vertical Guide (Dashed)
        g.append("line")
         .attr("x1", x(t))
         .attr("x2", x(t))
         .attr("y1", -20)
         .attr("y2", height)
         .attr("stroke", color)
         .attr("stroke-dasharray", "4,3")
         .attr("stroke-width", 1.5)
         .attr("opacity", 0.7);

        // 3. Label Badge
        g.append("rect")
         .attr("x", x(t) - 28)
         .attr("y", -35)
         .attr("width", 56)
         .attr("height", 20)
         .attr("rx", 10)
         .attr("fill", color)
         .attr("stroke", "white")
         .attr("stroke-width", 2);
         
        g.append("text")
         .attr("x", x(t))
         .attr("y", -21)
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("font-size", "11px")
         .attr("font-weight", "bold")
         .text(type);
         
        // 4. Highlight the transition on SDA
        // SDA is index 1. 
        g.append("circle")
         .attr("cx", x(t))
         .attr("cy", getY(1, 0.5)) // Midpoint
         .attr("r", 7)
         .attr("stroke", color)
         .attr("stroke-width", 2)
         .attr("fill", "white");
         
        // 5. Arrow indicating edge direction
        if (type === 'START') {
             // Arrow pointing down (Falling edge)
             g.append("path")
              .attr("d", d3.symbol().type(d3.symbolTriangle).size(25))
              .attr("transform", `translate(${x(t)}, ${getY(1, 0.5) + 4}) rotate(180)`)
              .attr("fill", color);
        } else {
             // Arrow pointing up (Rising edge)
             g.append("path")
              .attr("d", d3.symbol().type(d3.symbolTriangle).size(25))
              .attr("transform", `translate(${x(t)}, ${getY(1, 0.5) - 4})`)
              .attr("fill", color);
        }
        
        // 6. Highlight SCL is HIGH indicator
        g.append("line")
         .attr("x1", x(t - 0.4))
         .attr("x2", x(t + 0.4))
         .attr("y1", getY(0, 1) - 8)
         .attr("y2", getY(0, 1) - 8)
         .attr("stroke", color)
         .attr("stroke-width", 2);
         
        g.append("text")
         .attr("x", x(t))
         .attr("y", getY(0, 1) - 12)
         .attr("text-anchor", "middle")
         .attr("fill", color)
         .attr("font-size", "9px")
         .attr("font-weight", "bold")
         .text("SCL HIGH");
    };

    drawHighlight(1, 'START');
    drawHighlight(stopTime, 'STOP');


    const drawChannel = (index: number, name: string, data: {t: number, v: number}[], color: string) => {
        // Label
        g.append("text")
         .attr("x", -10)
         .attr("y", getY(index, 0.5))
         .attr("text-anchor", "end")
         .attr("alignment-baseline", "middle")
         .attr("class", "font-mono font-bold text-sm fill-slate-600")
         .text(name);

        // Grid
        g.append("line")
            .attr("x1", 0).attr("x2", innerWidth)
            .attr("y1", getY(index, 0)).attr("y2", getY(index, 0))
            .attr("stroke", "#e2e8f0").attr("stroke-dasharray", "4");
        g.append("line")
            .attr("x1", 0).attr("x2", innerWidth)
            .attr("y1", getY(index, 1)).attr("y2", getY(index, 1))
            .attr("stroke", "#e2e8f0").attr("stroke-dasharray", "4");

        // Waveform
        const line = d3.line<{t: number, v: number}>()
            .x(d => x(d.t))
            .y(d => getY(index, d.v))
            .curve(d3.curveStepAfter); // Step curve for cleaner square waves

        g.append("path")
            .attr("d", line(data))
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 2.5);
    };

    drawChannel(0, "SCL", sclData, "#3b82f6");
    drawChannel(1, "SDA", sdaData, "#10b981");

    // --- Annotations (Only ACKs now) ---
    const annotations = [
        { t: ack1Time, label: "ACK", color: "text-emerald-600" }, 
        { t: ack2Time, label: "ACK", color: "text-emerald-600" }, 
    ];

    annotations.forEach(note => {
        g.append("text")
            .attr("x", x(note.t))
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .attr("class", `text-[10px] font-bold ${note.color}`)
            .text(note.label);
            
        g.append("line")
            .attr("x1", x(note.t)).attr("x2", x(note.t))
            .attr("y1", 0).attr("y2", height)
            .attr("stroke", "currentColor")
            .attr("class", `${note.color} opacity-20`)
            .attr("stroke-dasharray", "2");
    });

    // --- Animation Scanline ---
    const scanG = g.append("g").attr("class", "scan-group").style("display", "none");
    
    scanG.append("line")
         .attr("class", "scan-line")
         .attr("y1", -20).attr("y2", height)
         .attr("stroke", "#0f172a").attr("stroke-width", 2).attr("stroke-dasharray", "5,2");
         
    // Dynamic Scan Label Background
    const labelGroup = scanG.append("g").attr("class", "scan-label-group");
    labelGroup.append("rect")
         .attr("class", "scan-label-bg")
         .attr("x", -50)
         .attr("y", -30)
         .attr("width", 100)
         .attr("height", 22)
         .attr("rx", 4)
         .attr("fill", "#0f172a");
         
    // Dynamic Scan Label Text
    labelGroup.append("text")
         .attr("class", "scan-label-text")
         .attr("y", -15)
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("font-size", "11px")
         .attr("font-family", "monospace")
         .attr("font-weight", "bold")
         .text("IDLE");

  }, [address, dataByte, isWrite]);

  // Animation Loop
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
    const margin = { left: 60, right: 30 };
    const innerWidth = width - margin.left - margin.right;
    const x = d3.scaleLinear().domain([0, TOTAL_TIME]).range([0, innerWidth]);

    const animate = (time: number) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        let elapsed = time - startTimeRef.current;
        if (elapsed > DURATION) {
            elapsed = 0;
            startTimeRef.current = time;
        }

        const t = (elapsed / DURATION) * TOTAL_TIME;
        const xPos = x(t);
        scanLine.attr("transform", `translate(${xPos}, 0)`);
        labelGroup.attr("transform", `translate(${xPos}, 0)`);

        // Highlight active bits in UI
        
        // Reset all
        document.querySelectorAll('.bit-indicator').forEach(el => {
            el.classList.remove('bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-red-500', 'bg-purple-500', 'text-white', 'scale-110', 'shadow-lg');
            el.classList.add('bg-slate-100', 'text-slate-400');
            // Restore original text color for Start/Stop/ACK if needed
            if(el.id === 'start-cond') el.querySelector('span')?.classList.add('text-amber-600');
            if(el.id === 'stop-cond') el.querySelector('span')?.classList.add('text-red-600');
        });

        const highlight = (id: string, color: string) => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('bg-slate-100', 'text-slate-400');
                el.classList.add(color, 'text-white', 'scale-110', 'shadow-lg');
                // Remove inner span specific colors so white text shows
                el.querySelector('span')?.classList.remove('text-amber-600', 'text-red-600');
            }
        };

        let labelText = "IDLE";
        let labelColor = "#64748b";

        if (t < 1.0) {
            labelText = "IDLE";
            labelColor = "#64748b";
        } else if (t >= 1.0 && t < 1.5) {
            highlight('start-cond', 'bg-amber-500');
            labelText = "START";
            labelColor = "#d97706";
        } else if (t >= 1.5 && t < 8.5) {
            const bitIdx = Math.floor(t - 1.5);
            if (bitIdx < 7) {
                 highlight(`addr-bit-${bitIdx}`, 'bg-blue-500');
                 labelText = `ADDR [${6-bitIdx}]`;
                 labelColor = "#3b82f6";
            }
        } else if (t >= 8.5 && t < 9.5) {
            highlight('rw-bit', 'bg-purple-500');
            labelText = isWrite ? "WRITE" : "READ";
            labelColor = "#8b5cf6";
        } else if (t >= 9.5 && t < 10.5) {
            highlight('ack-1', 'bg-emerald-500');
            labelText = "ACK";
            labelColor = "#10b981";
        } else if (t >= 10.5 && t < 18.5) {
            const bitIdx = Math.floor(t - 10.5);
            if (bitIdx < 8) {
                 highlight(`data-bit-${bitIdx}`, 'bg-emerald-500');
                 labelText = `DATA [${7-bitIdx}]`;
                 labelColor = "#10b981";
            }
        } else if (t >= 18.5 && t < 19.5) {
             highlight('ack-2', 'bg-emerald-500');
             labelText = "ACK";
             labelColor = "#10b981";
        } else if (t >= 19.5) {
             highlight('stop-cond', 'bg-red-500');
             labelText = "STOP";
             labelColor = "#dc2626";
        }

        scanText.text(labelText);
        scanRect.attr("fill", labelColor);
        // Adjust width based on text length
        const boxWidth = Math.max(60, labelText.length * 8 + 20);
        scanRect.attr("width", boxWidth).attr("x", -boxWidth/2);

        animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, address, dataByte, isWrite]);

  const reset = () => {
    startTimeRef.current = 0;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Controls Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => { reset(); setIsPlaying(!isPlaying); }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm text-sm font-medium transition-transform active:scale-95"
                >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? "暂停" : "播放"}
                </button>
                 <button
                    onClick={reset}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                >
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Inputs */}
            <div className="flex flex-wrap gap-4 justify-center">
                 {/* Address Input */}
                 <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-slate-200">
                    <span className="text-xs font-bold text-slate-500">ADDR (Hex)</span>
                    <input 
                        type="text" maxLength={2}
                        value={address.toString(16).toUpperCase().padStart(2, '0')}
                        onChange={(e) => {
                            const v = parseInt(e.target.value, 16);
                            if (!isNaN(v) && v < 128) { setAddress(v); reset(); }
                        }}
                        className="w-8 text-center font-mono font-bold text-blue-600 outline-none border-b border-transparent focus:border-blue-500"
                    />
                 </div>
                 
                 {/* RW Switch */}
                 <button 
                    onClick={() => { setIsWrite(!isWrite); reset(); }}
                    className={`px-2 py-1 rounded border text-xs font-bold transition-colors ${isWrite ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}
                 >
                    {isWrite ? 'WRITE (0)' : 'READ (1)'}
                 </button>

                 {/* Data Input */}
                 <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-slate-200">
                    <span className="text-xs font-bold text-slate-500">DATA (Hex)</span>
                    <input 
                        type="text" maxLength={2}
                        value={dataByte.toString(16).toUpperCase().padStart(2, '0')}
                        onChange={(e) => {
                            const v = parseInt(e.target.value, 16);
                            if (!isNaN(v) && v < 256) { setDataByte(v); reset(); }
                        }}
                        className="w-8 text-center font-mono font-bold text-emerald-600 outline-none border-b border-transparent focus:border-emerald-500"
                    />
                 </div>
            </div>
        </div>

        {/* Bit Visualization */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex justify-center overflow-x-auto">
            <div className="flex gap-1 min-w-max">
                {/* Start */}
                <div id="start-cond" className="bit-indicator w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center transition-all duration-150">
                    <span className="text-xs font-bold text-amber-600">S</span>
                </div>
                
                {/* Address Bits */}
                {addrBits.map((b, i) => (
                    <div key={`a-${i}`} id={`addr-bit-${i}`} className="bit-indicator w-6 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center transition-all duration-150">
                        <span className="font-mono text-xs font-bold">{b}</span>
                    </div>
                ))}
                
                {/* RW */}
                <div id="rw-bit" className="bit-indicator w-6 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center transition-all duration-150">
                    <span className="font-mono text-xs font-bold">{isWrite ? 0 : 1}</span>
                </div>

                {/* ACK */}
                <div id="ack-1" className="bit-indicator w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center transition-all duration-150">
                    <span className="text-xs text-slate-400">A</span>
                </div>

                {/* Data Bits */}
                {dataBits.map((b, i) => (
                    <div key={`d-${i}`} id={`data-bit-${i}`} className="bit-indicator w-6 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center transition-all duration-150">
                        <span className="font-mono text-xs font-bold">{b}</span>
                    </div>
                ))}
                
                 {/* ACK 2 */}
                <div id="ack-2" className="bit-indicator w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center transition-all duration-150">
                    <span className="text-xs text-slate-400">A</span>
                </div>

                {/* Stop */}
                <div id="stop-cond" className="bit-indicator w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center transition-all duration-150">
                    <span className="text-xs font-bold text-red-600">P</span>
                </div>
            </div>
        </div>

        {/* D3 Graph */}
        <div className="p-4 relative" ref={containerRef}>
            <svg ref={svgRef} className="w-full min-w-[600px] block touch-pan-x"></svg>
             <div className="mt-2 text-center text-xs text-slate-400">
                SDA 数据在 SCL 低电平时变化，高电平时保持稳定（被采样）。Start/Stop 是唯一例外。
             </div>
        </div>
    </div>
  );
};

export default I2cWaveformVisualizer;
