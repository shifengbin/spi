import React from 'react';
import { InfoCard } from '../components/InfoCard';
import UARTWaveformVisualizer from '../components/UARTWaveformVisualizer';
import { Cable, CheckCircle2, XCircle, ArrowRightLeft, Settings, ShieldCheck, Activity } from 'lucide-react';

export const UARTPage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">UART 通信协议</h2>
        <p className="text-lg text-slate-600 leading-relaxed italic">
          <strong>通用异步收发传输器</strong> 是一种点对点、异步的全双工通信协议。由于没有时钟线，双方必须通过预设的“波特率”来保持同步。
        </p>
      </section>

      {/* 修复后的接线图 */}
      <section id="wiring" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Cable className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">硬件接线 (TX-RX 交叉连接)</h3>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col items-center">
            <div className="relative w-full max-w-2xl bg-slate-50 rounded-xl p-4 border border-slate-100">
                 <svg viewBox="0 0 600 200" className="w-full h-auto overflow-visible">
                    <defs>
                        <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6" /></marker>
                        <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#10b981" /></marker>
                    </defs>

                    {/* 设备 A */}
                    <g transform="translate(50, 40)">
                        <rect width="100" height="120" rx="8" fill="#1e293b" />
                        <text x="50" y="25" fill="white" textAnchor="middle" className="font-bold text-[10px] uppercase">Device A</text>
                        <circle cx="95" cy="50" r="4" fill="#3b82f6" />
                        <circle cx="95" cy="90" r="4" fill="#10b981" />
                        <text x="85" y="54" fill="white" textAnchor="end" className="text-[10px] font-mono">TX</text>
                        <text x="85" y="94" fill="white" textAnchor="end" className="text-[10px] font-mono">RX</text>
                    </g>

                    {/* 设备 B */}
                    <g transform="translate(450, 40)">
                        <rect width="100" height="120" rx="8" fill="#334155" />
                        <text x="50" y="25" fill="white" textAnchor="middle" className="font-bold text-[10px] uppercase">Device B</text>
                        <circle cx="5" cy="50" r="4" fill="#3b82f6" />
                        <circle cx="5" cy="90" r="4" fill="#10b981" />
                        <text x="15" y="54" fill="white" textAnchor="start" className="text-[10px] font-mono">RX</text>
                        <text x="15" y="94" fill="white" textAnchor="start" className="text-[10px] font-mono">TX</text>
                    </g>
                    
                    {/* 连接线 - 精确对齐 40(g_y) + 50/90(circle_y) */}
                    <path d="M 145 90 L 450 90" fill="none" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                    <path d="M 450 130 L 145 130" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
                    
                    <text x="300" y="80" textAnchor="middle" className="text-[10px] fill-blue-500 font-bold italic underline">TX A → RX B</text>
                    <text x="300" y="150" textAnchor="middle" className="text-[10px] fill-emerald-500 font-bold italic underline">RX A ← TX B</text>

                    {/* GND 连通示意 */}
                    <path d="M 145 150 Q 300 170 450 150" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,2" />
                    <text x="300" y="175" textAnchor="middle" className="text-[9px] fill-slate-400 font-black">COMMON GROUND</text>
                 </svg>
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-4 w-full text-xs">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3">
                    <Activity size={18} className="text-blue-500" />
                    <span><strong>全双工通信：</strong> 两条独立线路同时收发。</span>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3">
                    <ArrowRightLeft size={18} className="text-amber-500" />
                    <span><strong>交叉接线：</strong> 必须 TX 接对方 RX。</span>
                </div>
                <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                    <ShieldCheck size={18} className="text-slate-500" />
                    <span><strong>共地：</strong> 必须连接 GND 以提供电压参考。</span>
                </div>
            </div>
        </div>
      </section>

      {/* 仿真与参数 */}
      <section id="simulation" className="scroll-mt-24 space-y-6">
        <UARTWaveformVisualizer />
      </section>

      {/* 优缺点 */}
      <section id="pros-cons" className="scroll-mt-24 grid md:grid-cols-2 gap-6">
            <InfoCard title="优点" icon={<CheckCircle2 className="text-emerald-500" />}>硬件极其简单，只需 2 根线，不需复杂的寻址逻辑。</InfoCard>
            <InfoCard title="缺点" icon={<XCircle className="text-red-500" />}>仅支持点对点，抗干扰弱，对时钟（波特率）误差极度敏感。</InfoCard>
      </section>
    </div>
  );
};

export const uartNavItems = [
    { id: 'intro', label: '协议简介' },
    { id: 'wiring', label: '接线与共地' },
    { id: 'simulation', label: '波形仿真' },
    { id: 'pros-cons', label: '优缺点' },
];