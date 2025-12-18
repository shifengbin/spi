import React, { useState } from 'react';
import { InfoCard } from '../components/InfoCard';
import { Zap, Cpu, ToggleRight, Layers, Lightbulb, Activity, ArrowDown, RefreshCw, ShieldAlert, ZapOff, Gauge } from 'lucide-react';

/**
 * MosSymbol 坐标规范:
 * 整体宽度约 55px, 高度约 60px
 * - 输入(栅极 G): (x + 0, y + 30)
 * - 上端点 (S/D): (x + 55, y + 20)
 * - 下端点 (D/S): (x + 55, y + 40)
 */
const MosSymbol: React.FC<{ x: number, y: number, type: 'pmos' | 'nmos', isOn: boolean, label?: string }> = ({ x, y, type, isOn, label }) => {
  const isP = type === 'pmos';
  // 即使关闭状态也给予微弱的背景色区分
  const bodyFill = isP ? "rgba(251, 191, 36, 0.05)" : "rgba(16, 185, 129, 0.05)";
  const activeColor = isP ? "#f59e0b" : "#10b981";
  const strokeColor = isOn ? activeColor : "#475569";
  
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* 识别背景区域 */}
      <rect x="25" y="10" width="35" height="40" rx="4" fill={isOn ? (isP ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)") : bodyFill} className="transition-all duration-300" />
      
      {/* 栅极控制线 */}
      <line x1="0" y1="30" x2="18" y2="30" stroke={isOn ? activeColor : "#64748b"} strokeWidth="2" />
      
      {/* PMOS 的取反圆圈 - 显著加大 */}
      {isP && <circle cx="22" cy="30" r="4" fill="white" stroke={strokeColor} strokeWidth="2" />}
      
      {/* 绝缘层 */}
      <line x1="28" y1="15" x2="28" y2="45" stroke="#1e293b" strokeWidth="3" />
      
      {/* 沟道区 */}
      <line x1="35" y1="15" x2="35" y2="45" stroke="#1e293b" strokeWidth="2" strokeDasharray="3,2" opacity="0.5" />
      
      {/* 内部引线 */}
      <line x1="35" y1="20" x2="55" y2="20" stroke="#1e293b" strokeWidth="2" />
      <line x1="35" y1="40" x2="55" y2="40" stroke="#1e293b" strokeWidth="2" />
      
      {/* 衬底箭头 */}
      <path 
        d={isP ? "M 35 30 L 45 30 L 40 25 Z" : "M 45 30 L 35 30 L 40 35 Z"} 
        fill="#1e293b" 
      />

      {/* 导通动画 */}
      {isOn && (
        <path d="M 55 20 V 40" fill="none" stroke={activeColor} strokeWidth="4" strokeLinecap="round">
          <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-dasharray" from="0,20" to="20,0" dur="1s" repeatCount="indefinite" />
        </path>
      )}
      
      {label && <text x="-8" y="25" textAnchor="end" className="text-[11px] fill-slate-500 font-black">{label}</text>}
      <text x="43" y="8" textAnchor="middle" className={`text-[9px] font-mono font-black ${isP ? 'fill-amber-600' : 'fill-emerald-600'}`}>
        {isP ? 'PMOS' : 'NMOS'}
      </text>
    </g>
  );
};

export const MosLogicGatesPage: React.FC = () => {
  const [notIn, setNotIn] = useState(0);
  const [nandIn, setNandIn] = useState([0, 0]);
  const [norIn, setNorIn] = useState([0, 0]);

  return (
    <div className="space-y-16">
      {/* Intro */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Layers size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            CMOS 逻辑门交互式实验
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          CMOS (互补型 MOS) 是现代数字电路的核心。通过 **PMOS (上拉网络)** 和 **NMOS (下拉网络)** 的精准配合，实现了零静态功耗的高效逻辑。
        </p>
      </section>

      {/* 1. CMOS Inverter (NOT) */}
      <section id="mos-not" className="scroll-mt-24 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Zap className="text-amber-500" size={24} />
              <h3 className="text-2xl font-bold text-slate-900">1. 反相器 (NOT)</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              最精简的互补结构。
              <br/>• **输入 A=0**: PMOS 开启，NMOS 关闭 &rarr; 输出连通电源 (1)
              <br/>• **输入 A=1**: NMOS 开启，PMOS 关闭 &rarr; 输出连通地线 (0)
            </p>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <button 
                onClick={() => setNotIn(notIn === 0 ? 1 : 0)}
                className={`px-6 py-2 rounded-lg font-bold transition-all shadow-md active:scale-95 ${notIn ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                点击切换 A = {notIn}
              </button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="font-mono font-bold">
                <span className="text-slate-400 mr-2 text-xs">OUTPUT Y =</span>
                <span className={notIn === 0 ? 'text-indigo-600' : 'text-slate-400'}>{notIn === 0 ? 1 : 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 flex justify-center">
            <svg viewBox="0 0 200 260" className="w-full max-w-[220px] h-auto overflow-visible">
              <text x="120" y="10" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">VCC (5V)</text>
              <line x1="120" y1="15" x2="120" y2="40" stroke="#ef4444" strokeWidth="2" />
              
              <MosSymbol x={65} y={20} type="pmos" isOn={notIn === 0} label="A" />
              
              <line x1="120" y1="60" x2="120" y2="100" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="120" cy="100" r="4" fill={notIn === 0 ? "#6366f1" : "#94a3b8"} />
              <line x1="120" y1="100" x2="180" y2="100" stroke={notIn === 0 ? "#6366f1" : "#94a3b8"} strokeWidth="3" />
              <text x="185" y="105" className={`text-sm font-bold ${notIn === 0 ? 'fill-indigo-600' : 'fill-slate-400'}`}>Y</text>

              <MosSymbol x={65} y={100} type="nmos" isOn={notIn === 1} label="A" />
              <line x1="120" y1="100" x2="120" y2="120" stroke="#94a3b8" strokeWidth="2" />
              
              <line x1="120" y1="140" x2="120" y2="170" stroke="#94a3b8" strokeWidth="2" />
              <g transform="translate(120, 170)">
                 <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
                 <line x1="-8" y1="6" x2="8" y2="6" stroke="#94a3b8" strokeWidth="2" />
                 <text x="0" y="20" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">GND</text>
              </g>

              {/* 连线 */}
              <path d="M 30 50 V 130" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <line x1="30" y1="50" x2="65" y2="50" stroke="#94a3b8" strokeWidth="2" />
              <line x1="30" y1="130" x2="65" y2="130" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="30" cy="50" r="2" fill="#94a3b8" />
              <circle cx="30" cy="130" r="2" fill="#94a3b8" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. CMOS NAND */}
      <section id="mos-nand" className="scroll-mt-24 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <RefreshCw className="text-emerald-500" size={24} />
              <h3 className="text-2xl font-bold text-slate-900">2. 与非门 (NAND)</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              **NAND 的逻辑：**
              <br/>• **PMOS 并联**: A, B 任意一个为 0 就能“送电”给 Y。
              <br/>• **NMOS 串联**: A, B 必须全部为 1 才能“连地”将 Y 归零。
            </p>
            <div className="flex gap-4">
               {[0, 1].map(i => (
                 <button 
                  key={i}
                  onClick={() => {
                    const next = [...nandIn];
                    next[i] = next[i] === 0 ? 1 : 0;
                    setNandIn(next);
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all shadow-sm active:scale-95 ${nandIn[i] ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                 >
                   输入 {i === 0 ? 'A' : 'B'} = {nandIn[i]}
                 </button>
               ))}
            </div>
            <div className="p-4 bg-slate-900 rounded-xl flex justify-between items-center text-white">
              <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">NAND Logic State</span>
              <span className={`text-2xl font-mono font-bold ${(nandIn[0] && nandIn[1]) ? 'text-slate-400' : 'text-emerald-400'}`}>Y = {(nandIn[0] && nandIn[1]) ? 0 : 1}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 flex justify-center">
             <svg viewBox="0 0 280 340" className="w-full max-w-[280px] h-auto overflow-visible">
                <text x="140" y="10" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">VCC</text>
                
                <line x1="85" y1="20" x2="195" y2="20" stroke="#ef4444" strokeWidth="2" />
                <line x1="85" y1="20" x2="85" y2="40" stroke="#94a3b8" strokeWidth="2" />
                <line x1="195" y1="20" x2="195" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <MosSymbol x={30} y={20} type="pmos" isOn={nandIn[0] === 0} label="A" />
                <MosSymbol x={140} y={20} type="pmos" isOn={nandIn[1] === 0} label="B" />
                
                <line x1="85" y1="60" x2="85" y2="90" stroke="#94a3b8" strokeWidth="2" />
                <line x1="195" y1="60" x2="195" y2="90" stroke="#94a3b8" strokeWidth="2" />
                <line x1="85" y1="90" x2="220" y2="90" stroke="#94a3b8" strokeWidth="2" />
                
                <circle cx="140" cy="90" r="4" fill={!(nandIn[0] && nandIn[1]) ? "#10b981" : "#94a3b8"} />
                <line x1="140" y1="90" x2="250" y2="90" stroke={!(nandIn[0] && nandIn[1]) ? "#10b981" : "#94a3b8"} strokeWidth="3" />
                <text x="260" y="95" className={`text-sm font-bold ${!(nandIn[0] && nandIn[1]) ? 'fill-emerald-600' : 'fill-slate-400'}`}>Y</text>

                <line x1="140" y1="90" x2="140" y2="120" stroke="#94a3b8" strokeWidth="2" />
                <MosSymbol x={85} y={100} type="nmos" isOn={nandIn[0] === 1} label="A" />
                
                <line x1="140" y1="140" x2="140" y2="170" stroke="#94a3b8" strokeWidth="2" />
                <MosSymbol x={85} y={150} type="nmos" isOn={nandIn[1] === 1} label="B" />
                
                <line x1="140" y1="190" x2="140" y2="220" stroke="#94a3b8" strokeWidth="2" />
                <g transform="translate(140, 220)">
                  <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
                  <text x="0" y="15" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">GND</text>
                </g>
             </svg>
          </div>
        </div>
      </section>

      {/* 3. CMOS NOR (Missing section added here) */}
      <section id="mos-nor" className="scroll-mt-24 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 flex justify-center order-2 lg:order-1 overflow-visible">
             <svg viewBox="0 0 280 340" className="w-full max-w-[280px] h-auto overflow-visible">
                <text x="140" y="10" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">VCC</text>
                
                {/* PMOS 串联网络 (X=140) */}
                <line x1="140" y1="15" x2="140" y2="40" stroke="#ef4444" strokeWidth="2" />
                <MosSymbol x={85} y={20} type="pmos" isOn={norIn[0] === 0} label="A" />
                
                <line x1="140" y1="60" x2="140" y2="90" stroke="#94a3b8" strokeWidth="2" />
                <MosSymbol x={85} y={70} type="pmos" isOn={norIn[1] === 0} label="B" />
                
                <line x1="140" y1="110" x2="140" y2="140" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="140" cy="140" r="4" fill={!(norIn[0] || norIn[1]) ? "#6366f1" : "#94a3b8"} />
                <line x1="140" y1="140" x2="220" y2="140" stroke={!(norIn[0] || norIn[1]) ? "#6366f1" : "#94a3b8"} strokeWidth="3" />
                <text x="230" y="145" className={`text-sm font-bold ${!(norIn[0] || norIn[1]) ? 'fill-indigo-600' : 'fill-slate-400'}`}>Y</text>

                {/* NMOS 并联网络 */}
                <line x1="140" y1="140" x2="140" y2="160" stroke="#94a3b8" strokeWidth="2" />
                <line x1="85" y1="160" x2="195" y2="160" stroke="#94a3b8" strokeWidth="2" />
                
                <line x1="85" y1="160" x2="85" y2="180" stroke="#94a3b8" strokeWidth="2" />
                <MosSymbol x={30} y={160} type="nmos" isOn={norIn[0] === 1} label="A" />
                
                <line x1="195" y1="160" x2="195" y2="180" stroke="#94a3b8" strokeWidth="2" />
                <MosSymbol x={140} y={160} type="nmos" isOn={norIn[1] === 1} label="B" />
                
                <line x1="85" y1="200" x2="85" y2="230" stroke="#94a3b8" strokeWidth="2" />
                <line x1="195" y1="200" x2="195" y2="230" stroke="#94a3b8" strokeWidth="2" />
                <line x1="85" y1="230" x2="195" y2="230" stroke="#94a3b8" strokeWidth="2" />
                
                <line x1="140" y1="230" x2="140" y2="250" stroke="#94a3b8" strokeWidth="2" />
                <g transform="translate(140, 250)">
                  <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
                  <text x="0" y="15" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">GND</text>
                </g>
             </svg>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Lightbulb className="text-indigo-500" size={24} />
              <h3 className="text-2xl font-bold text-slate-900">3. 或非门 (NOR)</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              **NOR 的逻辑：**
              <br/>• **PMOS 串联**: 只有 A 和 B 都是 0，电源才能通到输出端（逻辑 1）。
              <br/>• **NMOS 并联**: 只要 A 或 B 有一个是 1，输出端就接通地（逻辑 0）。
            </p>
            <div className="flex gap-4">
               {[0, 1].map(i => (
                 <button 
                  key={i}
                  onClick={() => {
                    const next = [...norIn];
                    next[i] = next[i] === 0 ? 1 : 0;
                    setNorIn(next);
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all shadow-md active:scale-95 ${norIn[i] ? 'bg-indigo-600 border-indigo-400 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                 >
                   输入 {i === 0 ? 'A' : 'B'} = {norIn[i]}
                 </button>
               ))}
            </div>
            <div className="p-4 bg-indigo-900 rounded-xl flex justify-between items-center text-white">
              <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">NOR Logic State</span>
              <span className={`text-2xl font-mono font-bold ${(norIn[0] || norIn[1]) ? 'text-slate-400' : 'text-indigo-300'}`}>Y = {(norIn[0] || norIn[1]) ? 0 : 1}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CMOS Key Knowledge Section */}
      <section id="knowledge" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-lg">
            <Lightbulb size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">CMOS 核心知识清单</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><ZapOff size={20}/></div>
                 <h4 className="font-bold text-slate-800">极低静态功耗</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                在任何稳定的 0 或 1 状态下，上拉和下拉网络总有一个是**完全关断**的。除了极其微小的漏电流，CMOS 在不切换状态时几乎不耗电。
              </p>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Gauge size={20}/></div>
                 <h4 className="font-bold text-slate-800">阈值电压 (Vth)</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                控制管子开启的“临界点”。现代低电压芯片（如 1.8V）要求 Vth 非常低且精确，以确保信号在高频下依然能快速翻转。
              </p>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Activity size={20}/></div>
                 <h4 className="font-bold text-slate-800">互补特性</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                CMOS 意为“互补”。在逻辑设计上，PMOS 负责输出高电平，NMOS 负责输出低电平，它们像跷跷板一样此消彼长。
              </p>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><ShieldAlert size={20}/></div>
                 <h4 className="font-bold text-slate-800">体效应与闭锁</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                由于 CMOS 内部紧凑的结构，如果不妥善设计，会形成寄生三极管导致“锁死（Latch-up）”，这可能导致芯片瞬间烧毁。
              </p>
           </div>
        </div>
      </section>

      {/* Summary */}
      <section id="summary" className="scroll-mt-24">
        <InfoCard title="从电子到逻辑" icon={<Activity className="text-rose-500" />}>
           当你在一台计算机上点击鼠标，数以亿计的这种 CMOS 反相器正在以每秒数十亿次的速度翻转。正是这种微小的“互补”机制，支撑起了整个信息时代的算力。
        </InfoCard>
      </section>
    </div>
  );
};

export const mosLogicGatesNavItems = [
  { id: 'intro', label: 'CMOS 简介' },
  { id: 'mos-not', label: '1. 反相器 (NOT)' },
  { id: 'mos-nand', label: '2. 与非门 (NAND)' },
  { id: 'mos-nor', label: '3. 或非门 (NOR)' },
  { id: 'knowledge', label: '核心知识清单' },
  { id: 'summary', label: '原理总结' },
];
