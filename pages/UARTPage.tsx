import React from 'react';
import { InfoCard } from '../components/InfoCard';
import UARTWaveformVisualizer from '../components/UARTWaveformVisualizer';
import { Cable, CheckCircle2, XCircle, ArrowRightLeft, Settings, ArrowRight } from 'lucide-react';

export const UARTPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          UART 通信协议
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          <strong>Universal Asynchronous Receiver-Transmitter (通用异步收发传输器)</strong> 是一种简单的点对点串行通信协议。
          它不需要时钟线，而是依靠双方约定的波特率 (Baud Rate) 来同步数据。
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">异步通信</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">全双工</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">点对点</span>
        </div>
      </section>

      {/* Wiring Section */}
      <section id="wiring" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Cable className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">硬件接线 (交叉连接)</h3>
        </div>
        
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
            <div className="relative w-full max-w-2xl">
                 {/* Connection Visualization */}
                 <svg viewBox="0 0 600 200" className="w-full h-auto">
                    {/* Device A */}
                    <g transform="translate(50, 40)">
                        <rect width="100" height="120" rx="8" fill="#1e293b" />
                        <text x="50" y="30" fill="white" textAnchor="middle" className="font-bold text-sm">Device A</text>
                        <text x="80" y="60" fill="#94a3b8" textAnchor="end" className="font-mono text-xs font-bold">TX</text>
                        <text x="80" y="100" fill="#94a3b8" textAnchor="end" className="font-mono text-xs font-bold">RX</text>
                        <circle cx="90" cy="56" r="4" fill="#3b82f6" />
                        <circle cx="90" cy="96" r="4" fill="#10b981" />
                    </g>

                    {/* Device B */}
                    <g transform="translate(450, 40)">
                        <rect width="100" height="120" rx="8" fill="#475569" />
                        <text x="50" y="30" fill="white" textAnchor="middle" className="font-bold text-sm">Device B</text>
                        <text x="20" y="60" fill="#94a3b8" textAnchor="start" className="font-mono text-xs font-bold">RX</text>
                        <text x="20" y="100" fill="#94a3b8" textAnchor="start" className="font-mono text-xs font-bold">TX</text>
                        <circle cx="10" cy="56" r="4" fill="#3b82f6" />
                        <circle cx="10" cy="96" r="4" fill="#10b981" />
                    </g>
                    
                    {/* Wires */}
                    {/* TX A -> RX B */}
                    <path d="M 140 56 C 250 56, 350 56, 460 56" fill="none" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                    {/* RX A <- TX B */}
                    <path d="M 140 96 C 200 96, 400 96, 460 96" fill="none" stroke="#10b981" strokeWidth="3" />
                    
                    {/* Cross indication (visual only, actual wires cross physically) */}
                    <text x="300" y="45" textAnchor="middle" className="text-xs fill-slate-400">TX 连接到 RX</text>
                    <text x="300" y="120" textAnchor="middle" className="text-xs fill-slate-400">RX 连接到 TX</text>

                    {/* Ground */}
                     <path d="M 100 160 L 100 180 L 500 180 L 500 160" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
                     <text x="300" y="190" textAnchor="middle" fill="#64748b" className="text-xs font-mono">GND (Common Ground)</text>
                 </svg>
            </div>
            <p className="mt-4 text-slate-500 text-sm bg-slate-50 px-4 py-2 rounded border border-slate-100">
                <strong>重要提示：</strong> 两个设备的 <strong>GND</strong> 必须连接在一起以提供共同的参考电平。
            </p>
        </div>
      </section>
      
      {/* Parameters */}
      <section id="params" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Settings className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">通信参数</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">波特率 (Baud Rate)</h4>
                <p className="text-sm text-slate-600">
                    表示每秒传输的符号数（位）。常见值有 9600, 115200 等。双方必须配置为<strong>完全一致</strong>，否则会出现乱码。
                </p>
             </div>
             <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">数据帧格式</h4>
                <p className="text-sm text-slate-600">
                    通常为 8N1：8位数据位，无校验位 (None)，1位停止位。这是最常用的配置。
                </p>
             </div>
        </div>
      </section>

      {/* Simulation */}
      <section id="simulation" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <ArrowRightLeft className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">波形仿真</h3>
        </div>
        <p className="text-slate-600 max-w-2xl">
            UART 空闲时为高电平。发送开始时，TX 拉低（起始位），随后按顺序发送数据位（通常低位在前），最后拉高（停止位）。
        </p>

        <UARTWaveformVisualizer />
      </section>

      {/* Pros & Cons */}
      <section id="pros-cons" className="scroll-mt-24 grid md:grid-cols-2 gap-6">
            <InfoCard title="优点" icon={<CheckCircle2 className="text-emerald-500" />} colorClass="bg-emerald-50/50 border-emerald-100">
            <ul className="space-y-2 list-disc list-inside">
                <li>只需要2根信号线 (+GND)。</li>
                <li>不需要时钟信号。</li>
                <li>有奇偶校验位用于错误检测。</li>
                <li>广泛支持，调试方便 (Serial Monitor)。</li>
            </ul>
            </InfoCard>

            <InfoCard title="缺点" icon={<XCircle className="text-red-500" />} colorClass="bg-red-50/50 border-red-100">
            <ul className="space-y-2 list-disc list-inside">
                <li>传输速度相对较慢。</li>
                <li>仅支持点对点通信 (非总线)。</li>
                <li>对时钟偏差敏感 (波特率需精确)。</li>
                <li>帧结构增加了额外开销 (Start/Stop bits)。</li>
            </ul>
            </InfoCard>
      </section>

    </div>
  );
};

export const uartNavItems = [
    { id: 'intro', label: '协议简介' },
    { id: 'wiring', label: '接线图' },
    { id: 'params', label: '通信参数' },
    { id: 'simulation', label: '波形仿真' },
    { id: 'pros-cons', label: '优缺点' },
];
