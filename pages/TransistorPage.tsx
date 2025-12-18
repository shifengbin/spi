import React from 'react';
import { InfoCard } from '../components/InfoCard';
import { Cpu, Zap, Activity, Repeat, Share2, Layers, TrendingUp, AlertCircle, Box } from 'lucide-react';

export const TransistorPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-600 rounded-lg text-white">
                <Cpu size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                三极管 (BJT) 全解析
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          双极性结型晶体管 (BJT) 是一种<strong>电流控制</strong>器件。通过基极 (B) 的微小电流，可以控制集电极 (C) 到发射极 (E) 的巨大电流，实现<strong>放大</strong>或<strong>开关</strong>功能。
        </p>
      </section>

      {/* Symbols & Terminals */}
      <section id="symbols" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Box className="text-purple-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">1. 电路符号与引脚定义</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            {/* NPN */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">NPN 类型 (最常用)</h4>
                <div className="flex justify-center mb-4">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-800 fill-none" strokeWidth="2.5">
                        <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="1" />
                        <line x1="35" y1="30" x2="35" y2="70" strokeWidth="4" />
                        <line x1="10" y1="50" x2="35" y2="50" />
                        <line x1="35" y1="40" x2="70" y2="20" />
                        <line x1="35" y1="60" x2="70" y2="80" />
                        <path d="M 60 74 L 70 80 L 64 68 Z" fill="currentColor" className="fill-slate-800" />
                        <text x="5" y="55" className="text-[12px] font-bold stroke-none fill-slate-500">B</text>
                        <text x="75" y="25" className="text-[12px] font-bold stroke-none fill-slate-500">C</text>
                        <text x="75" y="85" className="text-[12px] font-bold stroke-none fill-slate-500">E</text>
                    </svg>
                </div>
                <p className="text-xs text-slate-500"><strong>口诀：</strong> 箭头朝外 NPN，电子流出发射极。</p>
            </div>
            {/* PNP */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">PNP 类型</h4>
                <div className="flex justify-center mb-4">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-800 fill-none" strokeWidth="2.5">
                        <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="1" />
                        <line x1="35" y1="30" x2="35" y2="70" strokeWidth="4" />
                        <line x1="10" y1="50" x2="35" y2="50" />
                        <line x1="35" y1="40" x2="70" y2="20" />
                        <line x1="35" y1="60" x2="70" y2="80" />
                        <path d="M 45 46 L 35 40 L 48 38 Z" fill="currentColor" className="fill-slate-800" />
                        <text x="5" y="55" className="text-[12px] font-bold stroke-none fill-slate-500">B</text>
                        <text x="75" y="25" className="text-[12px] font-bold stroke-none fill-slate-500">C</text>
                        <text x="75" y="85" className="text-[12px] font-bold stroke-none fill-slate-500">E</text>
                    </svg>
                </div>
                <p className="text-xs text-slate-500"><strong>口诀：</strong> 箭头朝里 PNP，空穴流入发射极。</p>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-800 text-xs mb-1">B: 基极 (Base)</div>
                <p className="text-[10px] text-slate-500">控制引脚，注入微小电流以开启管子。</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-800 text-xs mb-1">C: 集电极 (Collector)</div>
                <p className="text-[10px] text-slate-500">接收来自电源的主电流。</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-800 text-xs mb-1">E: 发射极 (Emitter)</div>
                <p className="text-[10px] text-slate-500">所有电流的汇聚流出点。</p>
            </div>
        </div>
      </section>

      {/* Characteristic Regions */}
      <section id="principle" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <TrendingUp className="text-purple-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">2. 工作状态与特性曲线</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <h4 className="font-bold text-slate-800 mb-4 text-sm">输出特性曲线</h4>
                <div className="aspect-video bg-slate-50 border border-slate-100 relative p-4">
                    <svg viewBox="0 0 300 150" className="w-full h-full">
                        <path d="M 30 130 L 30 10 M 30 130 L 280 130" stroke="#94a3b8" fill="none" />
                        <path d="M 30 130 Q 40 120, 270 120" stroke="#3b82f6" fill="none" strokeWidth="2" />
                        <path d="M 30 130 Q 40 90, 270 90" stroke="#3b82f6" fill="none" strokeWidth="2" />
                        <path d="M 30 130 Q 40 60, 270 60" stroke="#3b82f6" fill="none" strokeWidth="2" />
                        <text x="20" y="20" className="text-[10px] fill-slate-400">Ic</text>
                        <text x="270" y="145" className="text-[10px] fill-slate-400">Vce</text>
                        <rect x="30" y="10" width="20" height="120" fill="rgba(16, 185, 129, 0.1)" />
                    </svg>
                </div>
                <div className="mt-4 flex gap-4 text-[10px] font-bold">
                    <span className="text-emerald-600">● 饱和区 (开关合)</span>
                    <span className="text-blue-600">● 放大区 (Ic = βIb)</span>
                    <span className="text-slate-400">● 截止区 (开关断)</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <h4 className="font-bold text-purple-800 text-sm mb-2">核心参数：&beta; (hFE)</h4>
                    <p className="text-xs text-purple-700 leading-relaxed">
                        这是电流放大倍数。例如 &beta; = 100 时，给基极 1mA 电流，集电极就能通过 100mA 电流。
                    </p>
                </div>
                <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex gap-3">
                    <AlertCircle className="text-rose-600 shrink-0" />
                    <div>
                        <h4 className="font-bold text-rose-800 text-sm">工程限制 (SOA)</h4>
                        <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                            {/* Fix: Wrapped LaTeX-style expressions in string literals to avoid JSX parsing error */}
                            设计时必须遵守：<strong>{'$V_{CEO}$'}</strong> (最大耐压) 和 <strong>{'$I_C$'}</strong> (最大电流)。超过限制会导致管子瞬间烧毁。
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Practical Circuits */}
      <section id="apps" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Zap className="text-rose-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">3. 典型应用电路</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">作为开关：驱动继电器</h4>
                <p className="text-sm text-slate-600 mb-4">
                    使用 NPN 管。当单片机 GPIO 输出高电平时，管子进入<strong>饱和状态</strong>，如同开关合上，驱动大功率设备。
                </p>
                <div className="bg-slate-900 rounded p-4 font-mono text-[10px] text-blue-300">
                    MCU_IO -> [Resistor] -> Base <br/>
                    VCC -> [Relay] -> Collector <br/>
                    Emitter -> GND
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">达林顿管 (Darlington)</h4>
                <p className="text-sm text-slate-600 mb-4">
                    将两个三极管级联，放大倍数相乘。用于极微弱信号驱动大功率负载，例如传感器信号驱动电机。
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 italic font-medium">
                    <Share2 size={14} /> 总 &beta; = &beta;1 &times; &beta;2
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export const transistorNavItems = [
    { id: 'intro', label: '基本介绍' },
    { id: 'symbols', label: '符号与引脚' },
    { id: 'principle', label: '工作特性' },
    { id: 'apps', label: '典型应用' },
];
