import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const WiringDiagram: React.FC = () => {
  // Shared dimension classes to ensure perfect alignment across columns
  const rowClass = "h-10 flex items-center"; 
  // Fixed height headers to ensure alignment regardless of content
  const headerClass = "h-12 mb-6 border-b border-white/20 flex items-center justify-center";
  const spacerClass = "h-12 mb-6"; // Must match headerClass height + margin

  return (
    <div className="w-full p-2 md:p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold mb-6 text-slate-800 px-2">硬件接线图</h3>
      
      {/* Responsive container: gap-0 ensures wires touch the devices */}
      <div className="w-full flex justify-between items-start gap-0 relative py-2">
        
        {/* Master Device */}
        <div className="flex-1 min-w-0 bg-slate-800 text-white rounded-lg py-4 px-2 md:p-5 shadow-lg relative z-10">
          <div className={headerClass}>
             <span className="font-bold text-sm md:text-xl tracking-wide truncate">主机 <span className="hidden md:inline">(MASTER)</span></span>
          </div>
          
          <div className="space-y-4">
            <div className={`${rowClass} justify-between group`}>
              <span className="font-mono font-bold text-blue-300 text-xs md:text-base">SCLK</span>
              {/* Circle pushed right to overlap wire start */}
              <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] border-2 border-slate-700 relative -right-[calc(0.5rem+6px)] md:-right-[calc(1.25rem+6px)] z-20"></div>
            </div>
            <div className={`${rowClass} justify-between group`}>
              <span className="font-mono font-bold text-emerald-300 text-xs md:text-base">MOSI</span>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] border-2 border-slate-700 relative -right-[calc(0.5rem+6px)] md:-right-[calc(1.25rem+6px)] z-20"></div>
            </div>
            <div className={`${rowClass} justify-between group`}>
              <span className="font-mono font-bold text-amber-300 text-xs md:text-base">MISO</span>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] border-2 border-slate-700 relative -right-[calc(0.5rem+6px)] md:-right-[calc(1.25rem+6px)] z-20"></div>
            </div>
            <div className={`${rowClass} justify-between group`}>
              <span className="font-mono font-bold text-red-300 text-xs md:text-base">CS</span>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] border-2 border-slate-700 relative -right-[calc(0.5rem+6px)] md:-right-[calc(1.25rem+6px)] z-20"></div>
            </div>
          </div>
        </div>

        {/* Wires Section (Middle Column) */}
        {/* Added py-4 md:py-5 to MATCH the Master/Slave card padding perfectly */}
        <div className="w-12 md:flex-1 flex flex-col z-0 py-4 md:py-5">
            {/* Spacer to perfectly align with the card headers */}
            <div className={spacerClass}></div> 
            
            <div className="space-y-4 w-full">
                 {/* SCLK Wire */}
                <div className={`${rowClass} w-full flex items-center`}>
                    <div className="h-1 md:h-1.5 flex-1 bg-blue-500/80 relative flex items-center justify-center">
                         <div className="bg-white p-0.5 md:p-1 rounded-full border border-blue-100 shadow-sm hidden md:block">
                            <ArrowRight className="text-blue-600" size={14} />
                         </div>
                    </div>
                </div>
                 {/* MOSI Wire */}
                <div className={`${rowClass} w-full flex items-center`}>
                    <div className="h-1 md:h-1.5 flex-1 bg-emerald-500/80 relative flex items-center justify-center">
                         <div className="bg-white p-0.5 md:p-1 rounded-full border border-emerald-100 shadow-sm hidden md:block">
                            <ArrowRight className="text-emerald-600" size={14} />
                         </div>
                    </div>
                </div>
                 {/* MISO Wire */}
                <div className={`${rowClass} w-full flex items-center`}>
                    <div className="h-1 md:h-1.5 flex-1 bg-amber-500/80 relative flex items-center justify-center">
                         <div className="bg-white p-0.5 md:p-1 rounded-full border border-amber-100 shadow-sm hidden md:block">
                            <ArrowLeft className="text-amber-600" size={14} />
                         </div>
                    </div>
                </div>
                 {/* CS Wire */}
                <div className={`${rowClass} w-full flex items-center`}>
                    <div className="h-1 md:h-1.5 flex-1 bg-red-500/80 relative flex items-center justify-center">
                         <div className="bg-white p-0.5 md:p-1 rounded-full border border-red-100 shadow-sm hidden md:block">
                            <ArrowRight className="text-red-600" size={14} />
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Slave Device */}
        <div className="flex-1 min-w-0 bg-slate-700 text-white rounded-lg py-4 px-2 md:p-5 shadow-lg relative z-10">
          <div className={headerClass}>
             <span className="font-bold text-sm md:text-xl tracking-wide truncate">从机 <span className="hidden md:inline">(SLAVE)</span></span>
          </div>
          <div className="space-y-4">
            <div className={`${rowClass} justify-start gap-2 md:gap-4`}>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full border-2 border-slate-600 relative -left-[calc(0.5rem+6px)] md:-left-[calc(1.25rem+6px)] z-20"></div>
              <span className="font-mono font-bold text-blue-200 text-xs md:text-base">SCLK</span>
            </div>
            <div className={`${rowClass} justify-start gap-2 md:gap-4`}>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full border-2 border-slate-600 relative -left-[calc(0.5rem+6px)] md:-left-[calc(1.25rem+6px)] z-20"></div>
              <span className="font-mono font-bold text-emerald-200 text-xs md:text-base">MOSI</span>
            </div>
            <div className={`${rowClass} justify-start gap-2 md:gap-4`}>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rounded-full border-2 border-slate-600 relative -left-[calc(0.5rem+6px)] md:-left-[calc(1.25rem+6px)] z-20"></div>
              <span className="font-mono font-bold text-amber-200 text-xs md:text-base">MISO</span>
            </div>
            <div className={`${rowClass} justify-start gap-2 md:gap-4`}>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-slate-600 relative -left-[calc(0.5rem+6px)] md:-left-[calc(1.25rem+6px)] z-20"></div>
              <span className="font-mono font-bold text-red-200 text-xs md:text-base">CS</span>
            </div>
          </div>
        </div>

      </div>
      <p className="mt-8 text-xs md:text-sm text-slate-500 text-center italic bg-slate-50 py-2 rounded">
        提示：主机的 MOSI 连接到从机的 MOSI，MISO 连接到 MISO。
      </p>
    </div>
  );
};

export default WiringDiagram;