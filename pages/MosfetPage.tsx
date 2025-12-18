
import React, { useState, useMemo } from 'react';
import { InfoCard } from '../components/InfoCard';
import { 
  Cpu, Zap, Activity, Shield, FastForward, ToggleLeft, 
  Thermometer, BatteryLow, Box, Sliders, Maximize2, 
  Atom, Layers, ArrowRight, Gauge, Info
} from 'lucide-react';

/**
 * MOSFET 状态交互仿真：机械压敏开关模型
 * 展示 Vgs 如何通过压紧“沟道”来改变导通电阻
 */
const MosInteractiveLab: React.FC = () => {
  const [vgs, setVgs] = useState(0);
  const vth = 0.4; // 阈值电压

  const state = useMemo(() => {
    if (vgs < vth) return {
      id: 'cutoff',
      label: '截止 (Cut-off)',
      color: 'text-slate-400',
      accent: '#94a3b8',
      desc: 'Vgs 小于阈值，电场未建立，主通道被物理性阻断。',
      channelWidth: 0,
      current: 0
    };
    if (vgs < 0.8) {
      const ratio = (vgs - vth) / (0.8 - vth);
      return {
        id: 'linear',
        label: '线性区 (Linear)',
        color: 'text-indigo-600',
        accent: '#6366f1',
        desc: '沟道刚形成，电阻随 Vgs 增大而迅速减小，像渐开的水阀。',
        channelWidth: ratio * 20,
        current: ratio * 15
      };
    }
    return {
      id: 'saturation',
      label: '饱和区 (Saturation)',
      color: 'text-emerald-600',
      accent: '#10b981',
      desc: '沟道完全打开，内阻极低，电流达到外电路限制的最大值。',
      channelWidth: 25,
      current: 25
    };
  }, [vgs]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
      <div className="p-6 border-b border-slate-100 bg-slate-50/80 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Maximize2 size={20} />
           </div>
           <div>
              <h3 className="font-black text-slate-800 text-base">2. 电压驱动控制模型</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Voltage-Controlled Switch</p>
           </div>
        </div>
        <div className={`px-6 py-2 rounded-full text-xs font-black uppercase shadow-sm border-2 ${state.color} border-current bg-white transition-all duration-500`}>
          {state.label}
        </div>
      </div>

      <div className="p-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* 动画演示区 */}
        <div className="relative aspect-video bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden p-4">
          <svg viewBox="0 0 400 250" className="w-full h-full">
            {/* 主通道 D-S */}
            <path d="M 50 125 H 350" stroke="#1e293b" strokeWidth="60" strokeLinecap="round" />
            
            {/* 电流粒子 (Id) */}
            {state.current > 0 && Array.from({ length: Math.floor(state.current) }).map((_, i) => (
              <circle key={`id-${i}`} r="3" fill="#6366f1">
                <animateMotion 
                  dur={`${0.6 / (state.current/25 + 0.1)}s`} 
                  repeatCount="indefinite" 
                  path="M 50 125 H 350" 
                  begin={`${i * 0.15}s`} 
                />
              </circle>
            ))}

            {/* 栅极压板 (Gate Control) */}
            <g transform={`translate(200, ${80 + (vgs * 40)})`} className="transition-transform duration-300">
                {/* 压板 */}
                <rect x="-60" y="-30" width="120" height="15" fill="#f59e0b" rx="4" />
                {/* 绝缘层图标 */}
                <rect x="-60" y="-15" width="120" height="5" fill="#ffffff" opacity="0.3" />
                <text x="0" y="-18" textAnchor="middle" className="fill-white text-[9px] font-black uppercase tracking-widest">Insulator</text>
            </g>

            {/* 沟道物理限制 */}
            <rect x="140" y="100" width="120" height="50" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4,2" />
            
            {/* 标注 */}
            <text x="40" y="105" className="fill-slate-500 text-[10px] font-black italic">Source (S)</text>
            <text x="360" y="105" textAnchor="end" className="fill-slate-500 text-[10px] font-black italic">Drain (D)</text>
            <text x="200" y="60" textAnchor="middle" className="fill-amber-500 text-[10px] font-black italic">Gate (G) - 压板控制</text>
          </svg>

          {/* 电压指示器 */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
             <div className="bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${vgs >= vth ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'}`}></div>
                   <span className="text-[10px] text-slate-300 font-bold">沟道状态: {vgs >= vth ? '已形成' : '被阻断'}</span>
                </div>
                <div className="w-px h-4 bg-slate-600"></div>
                <span className="text-xs font-mono text-indigo-400 font-bold">Rds: {vgs < vth ? '∞' : (10 - vgs * 8).toFixed(1)} Ω</span>
             </div>
          </div>
        </div>

        {/* 控制面板 */}
        <div className="space-y-8">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
             <div className="flex justify-between items-end mb-6">
                <div>
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">栅源电压 (Vgs)</label>
                   <div className={`text-4xl font-mono font-black ${state.color}`}>{vgs.toFixed(2)} <span className="text-sm">V</span></div>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-bold text-slate-400 block">开启阈值 Vth</span>
                   <span className="text-sm font-black text-slate-700">0.40 V</span>
                </div>
             </div>
             
             <input 
               type="range" min="0" max="1" step="0.01" 
               value={vgs} 
               onChange={(e) => setVgs(parseFloat(e.target.value))}
               className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
             />
             
             <div className="flex justify-between mt-3 text-[10px] font-black text-slate-400 uppercase">
                <span>0.0V 截止</span>
                <span className="text-indigo-500">0.4V 开启</span>
                <span>1.0V 强导通</span>
             </div>
           </div>

           <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
              <h4 className="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                 {/* Fixed: Added missing Info icon import to resolve "Cannot find name 'Info'" error */}
                 <Info size={18} className="text-indigo-600" /> 交互说明
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                "{state.desc}"
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MOSFET 半导体物理实验室
 * 演示反型层 (Inversion Layer) 的形成
 */
const MosPhysicsLab: React.FC = () => {
  const [fieldStrength, setFieldStrength] = useState(0.2);
  const vth = 0.5;

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden mb-12">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-white font-bold flex items-center gap-2"><Atom className="text-indigo-400"/> 3. 半导体物理：反型层形成</h3>
        <div className="flex bg-slate-800 p-1 rounded-lg">
           <div className="px-3 py-1 text-[10px] text-slate-400 font-bold uppercase border-r border-slate-700">电场强度</div>
           <div className="px-3 py-1 text-[10px] text-indigo-400 font-mono font-bold">{(fieldStrength * 100).toFixed(0)} kV/cm</div>
        </div>
      </div>

      <div className="p-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative">
           <svg viewBox="0 0 300 200" className="w-full h-auto overflow-visible">
              {/* P-Substrate */}
              <rect x="20" y="60" width="260" height="120" fill="#332115" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" />
              <text x="150" y="140" textAnchor="middle" className="fill-amber-500/30 text-[10px] font-black tracking-widest uppercase">P-Type Substrate</text>

              {/* N+ Source/Drain */}
              <rect x="20" y="60" width="60" height="40" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <rect x="220" y="60" width="60" height="40" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="50" y="85" textAnchor="middle" className="fill-emerald-500 text-[8px] font-black">N+ (S)</text>
              <text x="250" y="85" textAnchor="middle" className="fill-emerald-500 text-[8px] font-black">N+ (D)</text>

              {/* Gate Oxide (Insulator) */}
              <rect x="80" y="55" width="140" height="5" fill="#f8fafc" opacity="0.8" />
              
              {/* Gate Electrode */}
              <rect x="80" y="40" width="140" height="15" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              <text x="150" y="51" textAnchor="middle" className="fill-white text-[8px] font-black">GATE (Polysilicon)</text>

              {/* 电场感应粒子 (Electrons) */}
              {fieldStrength > 0.1 && Array.from({ length: Math.floor(fieldStrength * 40) }).map((_, i) => (
                <circle 
                  key={i} 
                  r="2" 
                  fill="#6366f1"
                  cx={85 + Math.random() * 130}
                  cy={65 + (Math.random() * (fieldStrength > vth ? 15 : 5))}
                  className="transition-all duration-700"
                >
                   <animate attributeName="opacity" values="0;1;0" dur={`${Math.random() * 2 + 1}s`} repeatCount="indefinite" />
                </circle>
              ))}

              {/* 沟道贯通动画 */}
              {fieldStrength >= vth && (
                 <rect x="80" y="60" width="140" height="10" fill="rgba(99, 102, 241, 0.2)">
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="1.5s" repeatCount="indefinite" />
                 </rect>
              )}
           </svg>

           <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
                 <span className="text-[10px] text-slate-500 font-bold uppercase">空穴 (Holes)</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
                 <span className="text-[10px] text-slate-500 font-bold uppercase">感应电子 (Electrons)</span>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">调节 Gate 电场强度</label>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={fieldStrength}
                onChange={(e) => setFieldStrength(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="mt-4 p-4 bg-slate-900 rounded-xl">
                 <h4 className="text-white text-xs font-bold mb-2 uppercase tracking-widest">物理机制</h4>
                 <p className="text-[11px] text-slate-400 leading-relaxed">
                    当 Gate 电压上升时，电场会排斥 P-Substrate 表面的空穴，并吸引少子电子。当电子浓度超过空穴，表面发生<strong>反型 (Inversion)</strong>，形成一座连接 S 和 D 的“电子桥”。
                  </p>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                 <span className="block text-[8px] text-slate-500 font-black mb-1 uppercase">当前极板</span>
                 <span className="text-xs text-indigo-400 font-bold">{fieldStrength > 0.3 ? '正极化' : '中性'}</span>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                 <span className="block text-[8px] text-slate-500 font-black mb-1 uppercase">沟道类型</span>
                 <span className="text-xs text-emerald-400 font-bold">{fieldStrength >= vth ? 'N-Channel' : '无沟道'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const MosfetPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Zap size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                MOS管 (MOSFET) 全解析
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          MOSFET (金属-氧化物半导体场效应晶体管) 是一种<strong>电压控制型</strong>器件。它在栅极 (G) 几乎不消耗电流，拥有极高的开关速度和极低的导通电阻，是现代集成电路和功率电子的基石。
        </p>
      </section>

      {/* 1. 符号全集 */}
      <section id="symbols" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded text-indigo-600 flex items-center justify-center font-bold shadow-sm">1</div>
            <h3 className="text-2xl font-bold text-slate-900">电路符号与引脚识别</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center group hover:border-indigo-500 transition-all">
                <h4 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-xs">N-Channel (NMOS)</h4>
                <div className="flex justify-center mb-6">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-900 fill-none" strokeWidth="2.5">
                        <line x1="30" y1="30" x2="30" y2="70" strokeWidth="4" />
                        <line x1="40" y1="30" x2="40" y2="45" strokeWidth="3" />
                        <line x1="40" y1="48" x2="40" y2="52" strokeWidth="3" />
                        <line x1="40" y1="55" x2="40" y2="70" strokeWidth="3" />
                        <line x1="10" y1="50" x2="30" y2="50" />
                        <line x1="40" y1="35" x2="70" y2="35" />
                        <line x1="40" y1="65" x2="70" y2="65" />
                        <line x1="40" y1="50" x2="70" y2="50" />
                        <line x1="70" y1="50" x2="70" y2="65" />
                        <path d="M 45 50 L 55 50" markerEnd="url(#arrowNMOS)" />
                        <defs>
                            <marker id="arrowNMOS" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="fill-slate-900" />
                            </marker>
                        </defs>
                        <text x="5" y="55" className="text-[12px] font-black stroke-none fill-slate-400">G</text>
                        <text x="75" y="35" className="text-[12px] font-black stroke-none fill-slate-400">D</text>
                        <text x="75" y="72" className="text-[12px] font-black stroke-none fill-slate-400">S</text>
                    </svg>
                </div>
                <div className="text-[10px] font-bold text-indigo-500 bg-indigo-50 py-1.5 rounded-full px-4 inline-block uppercase tracking-widest">Low Side Switch (N)</div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center group hover:border-rose-500 transition-all">
                <h4 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-xs">P-Channel (PMOS)</h4>
                <div className="flex justify-center mb-6">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-900 fill-none" strokeWidth="2.5">
                        <line x1="30" y1="30" x2="30" y2="70" strokeWidth="4" />
                        <line x1="40" y1="30" x2="40" y2="45" strokeWidth="3" />
                        <line x1="40" y1="48" x2="40" y2="52" strokeWidth="3" />
                        <line x1="40" y1="55" x2="40" y2="70" strokeWidth="3" />
                        <line x1="10" y1="50" x2="30" y2="50" />
                        <line x1="40" y1="35" x2="70" y2="35" />
                        <line x1="40" y1="65" x2="70" y2="65" />
                        <line x1="40" y1="50" x2="70" y2="50" />
                        <line x1="70" y1="50" x2="70" y2="65" />
                        <path d="M 65 50 L 55 50" markerEnd="url(#arrowPMOS)" />
                        <defs>
                            <marker id="arrowPMOS" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="fill-slate-900" />
                            </marker>
                        </defs>
                        <text x="5" y="55" className="text-[12px] font-black stroke-none fill-slate-400">G</text>
                        <text x="75" y="35" className="text-[12px] font-black stroke-none fill-slate-400">D</text>
                        <text x="75" y="72" className="text-[12px] font-black stroke-none fill-slate-400">S</text>
                    </svg>
                </div>
                <div className="text-[10px] font-bold text-rose-500 bg-rose-50 py-1.5 rounded-full px-4 inline-block uppercase tracking-widest">High Side Switch (P)</div>
            </div>
        </div>
      </section>

      {/* 2. 状态交互实验室 */}
      <section id="principle" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="w-8 h-8 bg-amber-100 rounded text-amber-600 flex items-center justify-center font-bold shadow-sm">2</div>
            <h3 className="text-2xl font-bold text-slate-900">核心重点：电压驱动机制</h3>
        </div>
        <MosInteractiveLab />
      </section>

      {/* 3. 物理实验室 */}
      <section id="physics" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="w-8 h-8 bg-emerald-100 rounded text-emerald-600 flex items-center justify-center font-bold shadow-sm">3</div>
            <h3 className="text-2xl font-bold text-slate-900">半导体物理结构原理</h3>
        </div>
        <MosPhysicsLab />
      </section>

      {/* 4. 应用场景 */}
      <section id="apps" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="w-8 h-8 bg-rose-100 rounded text-rose-600 flex items-center justify-center font-bold shadow-sm">4</div>
            <h3 className="text-2xl font-bold text-slate-900">典型工程应用</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <InfoCard title="PWM 调速" icon={<Gauge className="text-indigo-500" />}>
                利用 MOSFET 纳秒级的开关速度，配合 PWM 信号调节电机或 LED 亮度。相比线性电源，其效率可接近 100%。
            </InfoCard>
            <InfoCard title="防反接保护" icon={<Shield className="text-emerald-500" />}>
                在电源入口使用 PMOS。相比二极管，它的导通压降 (Rds_on) 极低，能显著降低系统大电流下的发热。
            </InfoCard>
            <InfoCard title="功率开关" icon={<ToggleLeft className="text-blue-500" />}>
                驱动大功率继电器或马达。注意：栅极电容在高速切换时需要较大的瞬时充电电流。
            </InfoCard>
        </div>

        {/* 补充：栅极驱动的重要性 */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={120}/></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
               <div className="flex-1 space-y-4">
                  <h4 className="text-xl font-black text-indigo-400 flex items-center gap-2">
                     <FastForward size={24}/> 工程师必知：栅极电容
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                     虽然 MOSFET 是电压控制，但栅极内部是一个<strong>电容</strong>。
                     为了实现高速开关（降低开关损耗），驱动电路必须能瞬间提供或吸收几十 mA 甚至数 A 的电流。
                  </p>
                  <div className="flex gap-4">
                     <div className="bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                        <span className="block text-[8px] text-slate-500 font-bold">公式</span>
                        <code className="text-xs font-mono text-indigo-300 italic">I = C * (dv / dt)</code>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-64 bg-slate-800 rounded-2xl p-4 border border-slate-700">
                  <h5 className="text-[10px] font-black text-slate-500 uppercase mb-3">损耗组成</h5>
                  <div className="space-y-3">
                     <div>
                        <div className="flex justify-between text-[10px] mb-1"><span>导通损耗 (I²R)</span><span>70%</span></div>
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[70%]"></div></div>
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] mb-1"><span>开关损耗 (Esw)</span><span>30%</span></div>
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[30%]"></div></div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export const mosfetNavItems = [
    { id: 'intro', label: '基本介绍' },
    { id: 'symbols', label: '1. 符号与引脚' },
    { id: 'principle', label: '2. 电压驱动机制' },
    { id: 'physics', label: '3. 半导体物理原理' },
    { id: 'apps', label: '4. 工程应用' },
];
