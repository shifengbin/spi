import React, { useState, useMemo } from 'react';
import { InfoCard } from '../components/InfoCard';
import { 
  Cpu, Zap, Activity, Shield, FastForward, ToggleLeft, 
  Thermometer, Box, Sliders, Maximize2, 
  Atom, Layers, ArrowRight, Gauge, Info
} from 'lucide-react';

const MosInteractiveLab: React.FC = () => {
  const [vgs, setVgs] = useState(0);
  const vth = 0.4;

  const state = useMemo(() => {
    if (vgs < vth) return {
      id: 'cutoff',
      label: '截止 (Cut-off)',
      color: 'text-slate-400',
      accent: '#94a3b8',
      desc: 'Vgs 小于阈值，电场未建立，通道被物理性阻断。',
      current: 0
    };
    if (vgs < 0.8) {
      const ratio = (vgs - vth) / (0.8 - vth);
      return {
        id: 'linear',
        label: '线性区 (Linear)',
        color: 'text-indigo-600',
        accent: '#6366f1',
        desc: '沟道刚形成，电阻随电压增大而减小。',
        current: ratio * 15
      };
    }
    return {
      id: 'saturation',
      label: '饱和区 (Saturation)',
      color: 'text-emerald-600',
      accent: '#10b981',
      desc: '沟道完全打开，内阻极低。',
      current: 25
    };
  }, [vgs]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-indigo-600 rounded-lg text-white"><Maximize2 size={20} /></div>
           <h3 className="font-black text-slate-800">电压驱动控制模型</h3>
        </div>
        <div className={`px-4 py-1 rounded-full text-xs font-black border-2 ${state.color} border-current bg-white`}>{state.label}</div>
      </div>

      <div className="p-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl p-4">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path d="M 50 100 H 350" stroke="#1e293b" strokeWidth="50" strokeLinecap="round" />
            {state.current > 0 && Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} r="3" fill="#6366f1">
                <animateMotion 
                  dur={`${1.5 / (state.current/25 + 0.1)}s`} 
                  repeatCount="indefinite" 
                  path="M 50 100 H 350" 
                  begin={`${i * 0.2}s`} 
                />
              </circle>
            ))}
            <g transform={`translate(200, ${60 + (vgs * 40)})`} className="transition-transform duration-300">
                <rect x="-60" y="-20" width="120" height="10" fill="#f59e0b" rx="2" />
                <rect x="-60" y="-10" width="120" height="4" fill="white" opacity="0.3" />
            </g>
            <text x="50" y="80" className="fill-slate-500 text-[10px] font-black italic">Source</text>
            <text x="350" y="80" textAnchor="end" className="fill-slate-500 text-[10px] font-black italic">Drain</text>
            <text x="200" y="40" textAnchor="middle" className="fill-amber-500 text-[10px] font-black italic">Gate Control</text>
          </svg>
        </div>

        <div className="space-y-6">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
             <label className="text-xs font-black text-slate-400 uppercase block mb-2">栅极电压 (Vgs)</label>
             <div className={`text-4xl font-mono font-black ${state.color}`}>{vgs.toFixed(2)} V</div>
             <input type="range" min="0" max="1" step="0.01" value={vgs} onChange={(e) => setVgs(parseFloat(e.target.value))} className="w-full h-3 mt-4 accent-indigo-600" />
           </div>
           <div className="p-4 bg-indigo-50 rounded-xl flex gap-3 items-start">
              <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed italic">"{state.desc}"</p>
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
             <div className="p-2 bg-indigo-600 rounded-lg text-white"><Zap size={28} /></div>
             <h2 className="text-3xl font-extrabold text-slate-900">MOS管 (MOSFET) 全解析</h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed italic">MOSFET 是一种通过电场控制电流的<strong>电压控制型</strong>器件，其栅极输入阻抗极高。</p>
      </section>

      <section id="principle" className="scroll-mt-24"><MosInteractiveLab /></section>

      <section id="apps" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="w-8 h-8 bg-rose-100 rounded text-rose-600 flex items-center justify-center font-bold">4</div>
            <h3 className="text-2xl font-bold text-slate-900">工程应用</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
            <InfoCard title="PWM 调速" icon={<Gauge className="text-indigo-500" />}>纳秒级开关速度，非常适合电机调速和 LED 调光。</InfoCard>
            <InfoCard title="防反接" icon={<Shield className="text-emerald-500" />}>利用低导通电阻特性，在电源入口替代二极管减小发热。</InfoCard>
            <InfoCard title="功率开关" icon={<ToggleLeft className="text-blue-500" />}>作为 MCU 的大电流执行机构。</InfoCard>
        </div>
      </section>
    </div>
  );
};

export const mosfetNavItems = [
    { id: 'intro', label: '基本介绍' },
    { id: 'principle', label: '电压控制动画' },
    { id: 'apps', label: '工程应用' },
];