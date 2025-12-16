import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Play, Pause, RefreshCw } from 'lucide-react';

const UARTWaveformVisualizer: React.FC = () => {
  const [dataByte, setDataByte] = useState<number>(0x55); // Default 'U' (0x55 is 01010101 pattern)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Constants
  const TOTAL_TIME = 12; // Start(1) + 8 Data + Stop(1) + Padding(2)
  const DURATION = 6000; // Animation duration in ms

  // LSB First for UART
  const dataBits = useMemo(() => Array.from({ length: 8 }, (_, i) => (dataByte >> i) & 1), [dataByte]);

  // Draw Waveforms
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 240;
    const margin = { top: 40, right: 30, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scale
    const x = d3.scaleLinear().domain([0, TOTAL_TIME]).range([0, innerWidth]);
    const y = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

    // Data Generation
    const txData: {t: number, v: number}[] = [];
    
    // Helper
    const addPt = (t: number, v: number) => {
        if (txData.length > 0) {
            txData.push({ t, v: txData[txData.length - 1].v });
        }
        txData.push({ t, v });
    };

    // 1. Idle (High)
    addPt(0, 1);
    
    // 2. Start Bit (Low) at t=1
    addPt(1, 0);

    // 3. Data Bits (t=2 to t=10)
    dataBits.forEach((bit, i) => {
        addPt(2 + i, bit);
    });

    // 4. Stop Bit (High) at t=10
    addPt(10, 1);
    
    // 5. Idle (High) to end
    addPt(TOTAL_TIME, 1);

    // Draw Line
    const line = d3.line<{t: number, v: number}>()
        .x(d => x(d.t))
        .y(d => y(d.v))
        .curve(d3.curveStepAfter);

    // Grid lines
    g.append("line").attr("x1", 0).attr("x2", innerWidth).attr("y1", y(0)).attr("y2", y(0)).attr("stroke", "#e2e8f0").attr("stroke-dasharray", "4");
    g.append("line").attr("x1", 0).attr("x2", innerWidth).attr("y1", y(1)).attr("y2", y(1)).attr("stroke", "#e2e8f0").attr("stroke-dasharray", "4");

    // Path
    g.append("path")
        .attr("d", line(txData))
        .attr("fill", "none")
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 3);

    // Label Y axis
    g.append("text").attr("x", -10).attr("y", y(1)).text("High (1)").attr("text-anchor", "end").attr("alignment-baseline", "middle").attr("class", "text-[10px] font-mono fill-slate-400");
    g.append("text").attr("x", -10).attr("y", y(0)).text("Low (0)").attr("text-anchor", "end").attr("alignment-baseline", "middle").attr("class", "text-[10px] font-mono fill-slate-400");
    g.append("text").attr("x", -10).attr("y", y(0.5)).text("TX Line").attr("text-anchor", "end").attr("alignment-baseline", "middle").attr("class", "text-sm font-bold fill-blue-600");

    // Annotations
    const annotations = [
        { t: 1.5, label: "Start", color: "text-amber-600", desc: "Always 0" },
        ...dataBits.map((b, i) => ({ t: 2.5 + i, label: `D${i}`, color: "text-slate-600", desc: `Bit ${i}: ${b}` })),
        { t: 10.5, label: "Stop", color: "text-red-600", desc: "Always 1" }
    ];

    annotations.forEach(note => {
        // Vertical Divider
        g.append("line")
            .attr("x1", x(Math.floor(note.t)))
            .attr("x2", x(Math.floor(note.t)))
            .attr("y1", margin.top - 10)
            .attr("y2", height - margin.bottom + 10)
            .attr("stroke", "#cbd5e1")
            .attr("stroke-dasharray", "2")
            .attr("opacity", 0.5);

        // Text
        g.append("text")
            .attr("x", x(note.t))
            .attr("y", height - 10)
            .attr("text-anchor", "middle")
            .attr("class", `text-[10px] font-bold ${note.color}`)
            .text(note.label);
    });
    
    // Add Stop bit end line
    g.append("line")
            .attr("x1", x(11))
            .attr("x2", x(11))
            .attr("y1", margin.top - 10)
            .attr("y2", height - margin.bottom + 10)
            .attr("stroke", "#cbd5e1")
            .attr("stroke-dasharray", "2")
            .attr("opacity", 0.5);


    // Scanline Logic
    const scanG = g.append("g").attr("class", "scan-group").style("display", "none");
    
    scanG.append("line")
         .attr("class", "scan-line")
         .attr("y1", 0).attr("y2", height)
         .attr("stroke", "#dc2626").attr("stroke-width", 2).attr("stroke-dasharray", "5,2");
         
    const labelGroup = scanG.append("g").attr("class", "scan-label-group");
    labelGroup.append("rect")
         .attr("class", "scan-label-bg")
         .attr("x", -40)
         .attr("y", 10)
         .attr("width", 80)
         .attr("height", 22)
         .attr("rx", 4)
         .attr("fill", "#dc2626");
         
    labelGroup.append("text")
         .attr("class", "scan-label-text")
         .attr("y", 25)
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("font-size", "11px")
         .attr("font-family", "monospace")
         .attr("font-weight", "bold")
         .text("IDLE");

  }, [dataBits]);

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

        // Update Labels
        let text = "IDLE";
        let color = "#64748b";

        if (t >= 1 && t < 2) {
            text = "START (0)";
            color = "#d97706";
        } else if (t >= 2 && t < 10) {
            const bitIdx = Math.floor(t - 2);
            text = `DATA[${bitIdx}]=${dataBits[bitIdx]}`;
            color = "#3b82f6";
        } else if (t >= 10 && t < 11) {
            text = "STOP (1)";
            color = "#dc2626";
        }

        scanText.text(text);
        scanRect.attr("fill", color);
        const w = Math.max(80, text.length * 8 + 10);
        scanRect.attr("width", w).attr("x", -w/2);
        
        // Highlight logic for UI bits
        document.querySelectorAll('.uart-bit').forEach(el => {
            el.classList.remove('bg-amber-500', 'bg-blue-500', 'bg-red-500', 'text-white', 'scale-110');
            el.classList.add('bg-slate-100', 'text-slate-400');
        });

        if (t >= 1 && t < 2) {
            document.getElementById('bit-start')?.classList.add('bg-amber-500', 'text-white', 'scale-110');
            document.getElementById('bit-start')?.classList.remove('bg-slate-100', 'text-slate-400');
        } else if (t >= 2 && t < 10) {
             const bitIdx = Math.floor(t - 2);
             const el = document.getElementById(`bit-d${bitIdx}`);
             el?.classList.add('bg-blue-500', 'text-white', 'scale-110');
             el?.classList.remove('bg-slate-100', 'text-slate-400');
        } else if (t >= 10 && t < 11) {
            document.getElementById('bit-stop')?.classList.add('bg-red-500', 'text-white', 'scale-110');
            document.getElementById('bit-stop')?.classList.remove('bg-slate-100', 'text-slate-400');
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, dataBits]);

  const reset = () => { startTimeRef.current = 0; };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-2">
                 <button onClick={() => { reset(); setIsPlaying(!isPlaying); }} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm text-sm font-medium active:scale-95">
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? "暂停" : "播放"}
                 </button>
                 <button onClick={reset} className="p-1.5 text-slate-500 hover:text-blue-600 rounded-full transition-colors"><RefreshCw size={16} /></button>
            </div>
            
            <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500">发送字符</span>
                <input 
                    type="text" maxLength={1} value={String.fromCharCode(dataByte)}
                    onChange={(e) => {
                        const char = e.target.value;
                        if(char.length > 0) { setDataByte(char.charCodeAt(0)); reset(); }
                    }}
                    className="w-12 text-center border border-slate-300 rounded p-1 font-mono font-bold focus:border-blue-500 outline-none"
                    placeholder="A"
                />
                <span className="text-xs text-slate-400">Hex: 0x{dataByte.toString(16).toUpperCase().padStart(2, '0')}</span>
            </div>
        </div>

        {/* Bits UI */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-center gap-1 overflow-x-auto">
             <div id="bit-start" className="uart-bit w-8 h-10 rounded border border-slate-200 flex flex-col items-center justify-center bg-slate-100 text-slate-400 transition-all">
                <span className="text-[9px] font-bold">ST</span>
                <span className="text-xs font-mono">0</span>
             </div>
             {dataBits.map((b, i) => (
                <div key={i} id={`bit-d${i}`} className="uart-bit w-8 h-10 rounded border border-slate-200 flex flex-col items-center justify-center bg-slate-100 text-slate-400 transition-all">
                    <span className="text-[9px] font-bold">D{i}</span>
                    <span className="text-xs font-mono">{b}</span>
                </div>
             ))}
             <div id="bit-stop" className="uart-bit w-8 h-10 rounded border border-slate-200 flex flex-col items-center justify-center bg-slate-100 text-slate-400 transition-all">
                <span className="text-[9px] font-bold">SP</span>
                <span className="text-xs font-mono">1</span>
             </div>
        </div>

        <div className="p-4 relative" ref={containerRef}>
            <svg ref={svgRef} className="w-full min-w-[600px] block touch-pan-x"></svg>
            <div className="mt-2 text-center text-xs text-slate-400">
                UART 默认为低位先行 (LSB First)。空闲时高电平。
            </div>
        </div>
    </div>
  );
};

export default UARTWaveformVisualizer;
