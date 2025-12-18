import React, { useState } from 'react';
import { InfoCard } from '../components/InfoCard';
import { Cpu, Zap, Binary, List, Lightbulb, Info, RefreshCw, ToggleRight } from 'lucide-react';

// 通用的三极管符号组件，坐标固定在 0,0 到 60,60
const TransistorSymbol: React.FC<{ x: number, y: number, isOn: boolean, label?: string }> = ({ x, y, isOn, label }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* 基极 B */}
    <line x1="0" y1="30" x2="20" y2="30" stroke="#64748b" strokeWidth="2" />
    <path d="M 20 20 V 40" stroke="#1e293b" strokeWidth="3" />
    {/* 集电极 C 和 发射极 E */}
    <line x1="20" y1="25" x2="40" y2="10" stroke="#1e293b" strokeWidth="2" />
    <line x1="20" y1="35" x2="40" y2="50" stroke="#1e293b" strokeWidth="2" />
    {/* NPN 箭头 */}
    <path d="M 35 42 L 40 50 L 32 48 Z" fill="#1e293b" />
    {/* 导通状态高亮 */}
    {isOn && (
      <path d="M 40 10 L 20 25 V 35 L 40 50" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" opacity="0.3">
        <animate attributeName="stroke-dasharray" from="0,40" to="40,0" dur="1s" repeatCount="indefinite" />
      </path>
    )}
    {label && <text x="-5" y="25" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">{label}</text>}
  </g>
);

// 电阻符号
const ResistorSymbol: React.FC<{ x: number, y: number, vertical?: boolean }> = ({ x, y, vertical = true }) => (
  <g transform={`translate(${x}, ${y})`}>
    {vertical ? (
      <path d="M 0 0 V 10 L -5 14 L 5 18 L -5 22 L 5 26 L 0 30 V 40" fill="none" stroke="#64748b" strokeWidth="2" />
    ) : (
      <path d="M 0 0 H 10 L 14 -5 L 18 5 L 22 -5 L 26 5 L 30 0 H 40" fill="none" stroke="#64748b" strokeWidth="2" />
    )}
  </g>
);

export const LogicGatesPage: React.FC = () => {
  const [notIn, setNotIn] = useState(0);
  const [nandIn, setNandIn] = useState([0, 0]);
  const [norIn, setNorIn] = useState([0, 0]);

  return (
    <div className="space-y-16">
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-600 rounded-lg text-white">
            <Binary size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            三极管逻辑门 (RTL) 精准原理
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          数字逻辑的本质是<strong>受控的短路</strong>。点击下方的开关，观察三极管如何通过“导通”将输出信号强行拉低到地。
        </p>
      </section>

      {/* 1. NOT Gate */}
      <section id="not-gate" className="scroll-mt-24 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Zap className="text-amber-500" size={24} />
              <h3 className="text-2xl font-bold text-slate-900">1. 非门 (NOT Gate)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              非门只有一个三极管。当 A 为高时，三极管导通，输出端 Y 就像碰到了地线（GND），电压变为 0。
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setNotIn(notIn === 0 ? 1 : 0)}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${notIn ? 'bg-rose-600 text-white shadow-lg scale-105' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
              >
                <ToggleRight size={18} />
                输入 A = {notIn}
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200">
                <span className="text-sm font-bold text-slate-500">输出 Y = </span>
                <span className={`text-xl font-mono font-bold ${notIn === 0 ? 'text-blue-600' : 'text-slate-400'}`}>{notIn === 0 ? 1 : 0}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-200 flex justify-center">
            <svg viewBox="0 0 200 240" className="w-full max-w-[240px] h-auto overflow-visible">
              {/* VCC */}
              <text x="100" y="15" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">VCC (5V)</text>
              <line x1="100" y1="20" x2="100" y2="40" stroke="#ef4444" strokeWidth="2" />
              <ResistorSymbol x={100} y={40} />
              
              {/* Output Y Connection */}
              <circle cx="100" cy="95" r="4" fill={notIn === 0 ? "#3b82f6" : "#94a3b8"} />
              <line x1="100" y1="95" x2="160" y2="95" stroke={notIn === 0 ? "#3b82f6" : "#94a3b8"} strokeWidth="3" />
              <text x="170" y="100" className={`text-sm font-bold ${notIn === 0 ? 'fill-blue-600' : 'fill-slate-400'}`}>Y</text>

              {/* Transistor Wiring */}
              <line x1="100" y1="80" x2="100" y2="105" stroke={notIn === 1 ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
              <TransistorSymbol x={60} y={95} isOn={notIn === 1} label="A" />
              
              {/* Ground Connection */}
              <line x1="100" y1="145" x2="100" y2="170" stroke="#94a3b8" strokeWidth="2" />
              <g transform="translate(100, 170)">
                <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
                <line x1="-10" y1="5" x2="10" y2="5" stroke="#94a3b8" strokeWidth="2" />
                <line x1="-5" y1="10" x2="5" y2="10" stroke="#94a3b8" strokeWidth="2" />
                <text x="0" y="25" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">GND</text>
              </g>

              {/* Input Control Path */}
              <line x1="10" y1="125" x2="60" y2="125" stroke={notIn === 1 ? "#ef4444" : "#94a3b8"} strokeWidth="2" strokeDasharray={notIn === 1 ? "" : "3,2"} />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. NAND Gate */}
      <section id="nand-gate" className="scroll-mt-24 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <RefreshCw className="text-emerald-500" size={24} />
              <h3 className="text-2xl font-bold text-slate-900">2. 与非门 (NAND Gate)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              与非门使用两个三极管<strong>串联</strong>。电流像过独木桥，只有 A 和 B 两个开关都闭合，输出 Y 才会接通地线变成 0。
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setNandIn([nandIn[0] === 0 ? 1 : 0, nandIn[1]])} className={`p-3 rounded-xl font-bold border-2 transition-all ${nandIn[0] ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>A = {nandIn[0]}</button>
              <button onClick={() => setNandIn([nandIn[0], nandIn[1] === 0 ? 1 : 0])} className={`p-3 rounded-xl font-bold border-2 transition-all ${nandIn[1] ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>B = {nandIn[1]}</button>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl flex justify-between items-center text-white">
              <span className="text-xs font-mono opacity-50">LOGIC RESULT:</span>
              <span className={`text-2xl font-mono font-bold ${(nandIn[0] && nandIn[1]) ? 'text-slate-400' : 'text-emerald-400'}`}>Y = {(nandIn[0] && nandIn[1]) ? 0 : 1}</span>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-200 flex justify-center">
            <svg viewBox="0 0 200 300" className="w-full max-w-[240px] h-auto overflow-visible">
              <text x="100" y="15" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">VCC</text>
              <line x1="100" y1="20" x2="100" y2="40" stroke="#ef4444" strokeWidth="2" />
              <ResistorSymbol x={100} y={40} />
              
              <circle cx="100" cy="95" r="4" fill={(nandIn[0] && nandIn[1]) ? "#94a3b8" : "#3b82f6"} />
              <line x1="100" y1="95" x2="160" y2="95" stroke={(nandIn[0] && nandIn[1]) ? "#94a3b8" : "#3b82f6"} strokeWidth="3" />
              <text x="170" y="100" className={`text-sm font-bold ${(nandIn[0] && nandIn[1]) ? 'fill-slate-400' : 'fill-blue-600'}`}>Y</text>

              {/* Two BJTs in Series */}
              <line x1="100" y1="80" x2="100" y2="105" stroke={(nandIn[0] && nandIn[1]) ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
              <TransistorSymbol x={60} y={95} isOn={nandIn[0] === 1} label="A" />
              
              <line x1="100" y1="145" x2="100" y2="165" stroke={(nandIn[0] && nandIn[1]) ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
              <TransistorSymbol x={60} y={155} isOn={nandIn[1] === 1} label="B" />
              
              <line x1="100" y1="205" x2="100" y2="230" stroke="#94a3b8" strokeWidth="2" />
              <g transform="translate(100, 230)">
                <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
                <line x1="-5" y1="10" x2="5" y2="10" stroke="#94a3b8" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 3. NOR Gate */}
      <section id="nor-gate" className="scroll-mt-24 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Lightbulb className="text-indigo-500" size={24} />
              <h3 className="text-2xl font-bold text-slate-900">3. 或非门 (NOR Gate)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              或非门使用两个三极管<strong>并联</strong>。就像两个泄洪口，只要 A 或 B 有一个“开闸”，输出端 Y 就会被瞬间泄洪接地。
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setNorIn([norIn[0] === 0 ? 1 : 0, norIn[1]])} className={`p-3 rounded-xl font-bold border-2 transition-all ${norIn[0] ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>A = {norIn[0]}</button>
              <button onClick={() => setNorIn([norIn[0], norIn[1] === 0 ? 1 : 0])} className={`p-3 rounded-xl font-bold border-2 transition-all ${norIn[1] ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>B = {norIn[1]}</button>
            </div>
            <div className="p-4 bg-indigo-900 rounded-xl flex justify-between items-center text-white">
              <span className="text-xs font-mono opacity-50">OUTPUT VOLTAGE:</span>
              <span className={`text-2xl font-mono font-bold ${(norIn[0] || norIn[1]) ? 'text-slate-400' : 'text-indigo-300'}`}>Y = {(norIn[0] || norIn[1]) ? 0 : 1}</span>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-200 flex justify-center">
            <svg viewBox="0 0 300 240" className="w-full max-w-[320px] h-auto overflow-visible">
              <text x="150" y="15" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">VCC</text>
              <line x1="150" y1="20" x2="150" y2="40" stroke="#ef4444" strokeWidth="2" />
              <ResistorSymbol x={150} y={40} />
              
              <circle cx="150" cy="95" r="4" fill={(norIn[0] || norIn[1]) ? "#94a3b8" : "#3b82f6"} />
              <line x1="150" y1="95" x2="240" y2="95" stroke={(norIn[0] || norIn[1]) ? "#94a3b8" : "#3b82f6"} strokeWidth="3" />
              <text x="250" y="100" className={`text-sm font-bold ${(norIn[0] || norIn[1]) ? 'fill-slate-400' : 'fill-blue-600'}`}>Y</text>

              {/* Parallel Layout */}
              <line x1="150" y1="80" x2="150" y2="95" stroke="#94a3b8" strokeWidth="2" />
              <line x1="90" y1="95" x2="210" y2="95" stroke="#94a3b8" strokeWidth="2" />
              
              <line x1="90" y1="95" x2="90" y2="105" stroke={norIn[0] ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
              <TransistorSymbol x={50} y={95} isOn={norIn[0] === 1} label="A" />
              
              <line x1="210" y1="95" x2="210" y2="105" stroke={norIn[1] ? "#ef4444" : "#94a3b8"} strokeWidth="2" />
              <TransistorSymbol x={170} y={95} isOn={norIn[1] === 1} label="B" />
              
              {/* Bottom Ground Rail */}
              <line x1="90" y1="145" x2="90" y2="170" stroke="#94a3b8" strokeWidth="2" />
              <line x1="210" y1="145" x2="210" y2="170" stroke="#94a3b8" strokeWidth="2" />
              <line x1="90" y1="170" x2="210" y2="170" stroke="#94a3b8" strokeWidth="2" />
              <line x1="150" y1="170" x2="150" y2="185" stroke="#94a3b8" strokeWidth="2" />
              <g transform="translate(150, 185)">
                <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
                <line x1="-5" y1="10" x2="5" y2="10" stroke="#94a3b8" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section id="summary" className="scroll-mt-24 space-y-6">
        <InfoCard title="从 RTL 到现代芯片" icon={<Cpu className="text-rose-600" />}>
          虽然现代处理器内部主要使用 CMOS (由 PMOS 和 NMOS 组成) 来降低功耗，但 RTL 电路完美展示了逻辑门的<strong>物理本质</strong>。理解了三极管如何控制电流，你就理解了二进制信号是如何从最底层的原子层面产生的。
        </InfoCard>
      </section>
    </div>
  );
};

export const logicGatesNavItems = [
  { id: 'intro', label: '逻辑门简介' },
  { id: 'not-gate', label: '1. 非门 (NOT)' },
  { id: 'nand-gate', label: '2. 与非门 (NAND)' },
  { id: 'nor-gate', label: '3. 或非门 (NOR)' },
  { id: 'summary', label: '原理总结' },
];
