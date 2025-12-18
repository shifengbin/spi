import React, { useState, useMemo } from 'react';
import { InfoCard } from '../components/InfoCard';
import { 
  Cpu, Zap, Activity, Layers, TrendingUp, AlertCircle, 
  Box, Sliders, ArrowRight, Power, Volume2, ToggleRight, 
  ListOrdered, Waves, MoveRight, Atom, Thermometer, Info,
  ChevronRight, Maximize2
} from 'lucide-react';

/**
 * BJT 三种工作状态交互实验室 - 机械闸门模型
 */
const BjtStatesInteractive: React.FC = () => {
  const [voltage, setVoltage] = useState(0); 
  
  const state = useMemo(() => {
    if (voltage < 0.6) return { 
        id: 'cutoff', 
        label: '截止状态 (Cut-off)', 
        color: 'text-slate-400', 
        accent: '#94a3b8',
        desc: '基极电压不足，推不动闸门。主回路完全不通，相当于断开的开关。',
        gateY: 0,
        flowIntensity: 0,
        baseParticles: 0
    };
    if (voltage < 0.85) {
        const ratio = (voltage - 0.6) / 0.25;
        return { 
            id: 'active', 
            label: '线性放大 (Active)', 
            color: 'text-blue-600', 
            accent: '#3b82f6',
            desc: '基极微小电流产生的压力推开闸门，主回路大流量随之线性增加。',
            gateY: ratio * 45,
            flowIntensity: ratio * 15,
            baseParticles: ratio * 5 + 2
        };
    }
    return { 
        id: 'sat', 
        label: '深度饱和 (Saturation)', 
        color: 'text-purple-600', 
        accent: '#a855f7',
        desc: '闸门已推至物理极限。电流不再受基极控制，相当于闭合的开关。',
        gateY: 55,
        flowIntensity: 22,
        baseParticles: 15
    };
  }, [voltage]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/80 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Maximize2 size={20} />
           </div>
           <div>
              <h3 className="font-black text-slate-800 text-base">2. 三种状态控制模型</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Base Control Mechanism</p>
           </div>
        </div>
        <div className={`px-6 py-2 rounded-full text-xs font-black uppercase shadow-sm border-2 ${state.color} border-current bg-white animate-pulse`}>
          {state.label}
        </div>
      </div>

      <div className="p-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden">
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <path d="M 300 20 V 230" stroke="#1e293b" strokeWidth="45" strokeLinecap="round" /> 
            <path d="M 40 125 H 300" stroke="#1e293b" strokeWidth="25" strokeLinecap="round" /> 
            
            {state.flowIntensity > 0 && Array.from({ length: Math.floor(state.flowIntensity) }).map((_, i) => (
                <circle key={`ic-${i}`} r="3.5" fill="#3b82f6" opacity="0.6">
                    <animateMotion dur={`${0.8 / (state.flowIntensity/20 + 0.1)}s`} repeatCount="indefinite" path="M 300 20 V 230" begin={`${i * 0.15}s`} />
                </circle>
            ))}
            {state.baseParticles > 0 && Array.from({ length: Math.floor(state.baseParticles) }).map((_, i) => (
                <circle key={`ib-${i}`} r="2" fill="#f59e0b">
                    <animateMotion dur="1s" repeatCount="indefinite" path="M 40 125 H 280" begin={`${i * 0.3}s`} />
                </circle>
            ))}
            <g transform={`translate(280, ${125 - state.gateY})`} className="transition-transform duration-300">
                <rect x="0" y="-10" width="35" height="65" fill={state.accent} rx="4" />
                <rect x="-25" y="20" width="25" height="8" fill="#475569" />
            </g>
            <text x="300" y="15" textAnchor="middle" className="text-[10px] font-black fill-slate-500 italic">Collector</text>
            <text x="300" y="245" textAnchor="middle" className="text-[10px] font-black fill-slate-500 italic">Emitter</text>
            <text x="40" y="105" className="text-[10px] font-black fill-amber-500 italic">Base Input</text>
          </svg>
        </div>

        <div className="space-y-6">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
             <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">控制电压 (Vbe)</label>
             <div className={`text-4xl font-mono font-black mb-4 ${state.color}`}>{voltage.toFixed(2)} V</div>
             <input type="range" min="0" max="1" step="0.01" value={voltage} onChange={(e) => setVoltage(parseFloat(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
           </div>
           <div className="p-5 bg-blue-50 border-2 border-blue-100 rounded-2xl">
              <p className="text-xs text-slate-700 leading-relaxed italic font-medium">"{state.desc}"</p>
           </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 载流子输运互动演示
 */
const BjtPhysicsLab: React.FC = () => {
  const [injection, setInjection] = useState(0.2); 
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-white font-bold flex items-center gap-2"><Atom className="text-indigo-400"/> 3. 内部载流子输运实验室</h3>
        <div className="text-indigo-400 font-mono text-xs font-bold">ALPHA (穿透率) ≈ 0.99</div>
      </div>
      <div className="p-8 grid lg:grid-cols-2 gap-12">
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4">
           <svg viewBox="0 0 300 300" className="w-full h-full">
              <rect x="50" y="20" width="200" height="115" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" />
              <rect x="50" y="135" width="200" height="15" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
              <rect x="75" y="150" width="150" height="100" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="150" y="146" textAnchor="middle" className="fill-amber-500 text-[10px] font-black">BASE (P) - 极薄</text>
              {injection > 0 && Array.from({length: 20}).map((_, i) => (
                <circle key={i} r="2.5" fill="#fbbf24">
                  <animateMotion dur={`${1/(injection+0.2)}s`} repeatCount="indefinite" path="M 150 240 V 40" begin={`${i*0.2}s`} />
                </circle>
              ))}
           </svg>
        </div>
        <div className="space-y-6">
           <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700">
              <label className="text-[10px] font-black text-slate-500 uppercase block mb-2">注入强度 (Vbe)</label>
              <input type="range" min="0" max="1" step="0.01" value={injection} onChange={(e) => setInjection(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
           </div>
           <div className="space-y-4">
              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-xs text-slate-300">
                <strong>发射区 (N++):</strong> 掺杂极高，提供海量电子。
              </div>
              <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-xs text-slate-300">
                <strong>基区 (P):</strong> 极薄且掺杂低。电子在此复合率极低，直接穿透。
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const TransistorPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-600 rounded-lg text-white"><Cpu size={28} /></div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">三极管 (BJT) 全解析</h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">三极管是现代电子学的核心。它是一个<strong>电流控制</strong>器件，用极其微小的基极电流（Ib）去控制巨大的集电极电流（Ic）。</p>
      </section>

      {/* 1. 符号与引脚 - 修复Skewed箭头 */}
      <section id="symbols" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="w-8 h-8 bg-purple-100 rounded text-purple-600 flex items-center justify-center font-bold">1</div>
            <h3 className="text-2xl font-bold text-slate-900">电路符号与引脚定义</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                <h4 className="font-bold text-slate-800 mb-6 uppercase text-xs">NPN 类型 (箭头向外)</h4>
                <div className="flex justify-center mb-4">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-900 fill-none" strokeWidth="2.5">
                        <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="38" y1="30" x2="38" y2="70" strokeWidth="4" strokeLinecap="round" />
                        <line x1="10" y1="50" x2="38" y2="50" />
                        <line x1="38" y1="42" x2="70" y2="20" />
                        <line x1="38" y1="58" x2="70" y2="80" />
                        <path d="M 62 72 L 72 82 L 67 66 Z" fill="currentColor" stroke="none" />
                        <text x="5" y="55" className="text-[12px] font-black fill-slate-400 stroke-none">B</text>
                        <text x="75" y="22" className="text-[12px] font-black fill-slate-400 stroke-none">C</text>
                        <text x="75" y="88" className="text-[12px] font-black fill-slate-400 stroke-none">E</text>
                    </svg>
                </div>
                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-4 py-1 rounded-full uppercase">Never Point iN (NPN)</span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                <h4 className="font-bold text-slate-800 mb-6 uppercase text-xs">PNP 类型 (箭头向里)</h4>
                <div className="flex justify-center mb-4">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-900 fill-none" strokeWidth="2.5">
                        <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="38" y1="30" x2="38" y2="70" strokeWidth="4" strokeLinecap="round" />
                        <line x1="10" y1="50" x2="38" y2="50" />
                        <line x1="38" y1="42" x2="70" y2="20" />
                        <line x1="38" y1="58" x2="70" y2="80" />
                        <path d="M 46 48 L 38 42 L 50 40 Z" fill="currentColor" stroke="none" />
                        <text x="5" y="55" className="text-[12px] font-black fill-slate-400 stroke-none">B</text>
                        <text x="75" y="22" className="text-[12px] font-black fill-slate-400 stroke-none">C</text>
                        <text x="75" y="88" className="text-[12px] font-black fill-slate-400 stroke-none">E</text>
                    </svg>
                </div>
                <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-4 py-1 rounded-full uppercase">Points iN Proudly (PNP)</span>
            </div>
        </div>
      </section>

      {/* 2. 工作状态 */}
      <section id="states" className="scroll-mt-24 space-y-8"><BjtStatesInteractive /></section>

      {/* 3. 物理原理 */}
      <section id="principle" className="scroll-mt-24 space-y-8"><BjtPhysicsLab /></section>

      {/* 4. 典型应用 - 增加图片电路 */}
      <section id="apps" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="w-8 h-8 bg-rose-100 rounded text-rose-600 flex items-center justify-center font-bold">4</div>
            <h3 className="text-2xl font-bold text-slate-900">典型工程应用电路</h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Power size={18} className="text-blue-500"/> 开关驱动电路 (NPN)</h4>
                <div className="bg-slate-50 p-6 rounded-xl mb-4 flex justify-center border border-slate-100">
                    <svg viewBox="0 0 240 160" className="w-48 h-auto">
                        <line x1="120" y1="10" x2="120" y2="40" stroke="#ef4444" strokeWidth="2" />
                        <rect x="100" y="40" width="40" height="40" rx="4" fill="#334155" />
                        <text x="120" y="65" textAnchor="middle" fill="white" className="text-[8px] font-bold uppercase">Load</text>
                        <line x1="120" y1="80" x2="120" y2="95" stroke="#1e293b" strokeWidth="2" />
                        <g transform="translate(100, 95) scale(0.6)">
                           <line x1="0" y1="30" x2="20" y2="30" stroke="#1e293b" strokeWidth="4" />
                           <path d="M 20 15 V 45" stroke="#1e293b" strokeWidth="6" />
                           <line x1="20" y1="20" x2="50" y2="0" stroke="#1e293b" strokeWidth="4" />
                           <line x1="20" y1="40" x2="50" y2="60" stroke="#1e293b" strokeWidth="4" />
                           <path d="M 40 54 L 50 60 L 44 48 Z" fill="#1e293b" />
                        </g>
                        <line x1="130" y1="131" x2="130" y2="150" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="20" y1="113" x2="100" y2="113" stroke="#f59e0b" strokeWidth="2" />
                        <text x="50" y="105" className="text-[10px] font-bold fill-amber-500">MCU GPIO</text>
                        <text x="140" y="25" className="text-[8px] font-bold fill-rose-500">VCC (12V)</text>
                    </svg>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">利用<b>截止</b>和<b>饱和</b>状态，通过微弱电流驱动大电流负载（如电机）。</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-emerald-500"/> 音频放大电路 (线性)</h4>
                <div className="bg-slate-50 p-6 rounded-xl mb-4 flex justify-center border border-slate-100">
                    <svg viewBox="0 0 240 160" className="w-48 h-auto">
                        <path d="M 20 80 Q 40 40 60 80 Q 80 120 100 80" fill="none" stroke="#3b82f6" strokeWidth="2" />
                        <ArrowRight x={110} y={70} className="text-slate-300"/>
                        <path d="M 140 80 Q 160 0 180 80 Q 200 160 220 80" fill="none" stroke="#10b981" strokeWidth="4" />
                        <text x="60" y="140" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold uppercase">Input Signal</text>
                        <text x="180" y="140" textAnchor="middle" className="text-[8px] fill-emerald-500 font-bold uppercase">Amplified Output</text>
                    </svg>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">工作在<b>放大区</b>。基极微弱的交流电压波动映射为集电极巨大的同步波动。</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export const transistorNavItems = [
    { id: 'intro', label: '基本介绍' },
    { id: 'symbols', label: '1. 符号与引脚' },
    { id: 'states', label: '2. 三种工作状态' },
    { id: 'principle', label: '3. 物理结构原理' },
    { id: 'apps', label: '4. 典型应用电路' },
];
