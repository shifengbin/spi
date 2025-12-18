import React from 'react';
import { InfoCard } from '../components/InfoCard';
import { Zap, Activity, ShieldCheck, Lightbulb, ArrowRight, Gauge, RefreshCw, Thermometer, Clock, Box } from 'lucide-react';

export const DiodePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Zap size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                二极管 (Diode) 基础与进阶
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          二极管是最基础的半导体器件，由一个 <strong>PN 结</strong> 构成。它的核心特性是 <strong>单向导电性</strong>：正向导通，反向截止。
        </p>
      </section>

      {/* Basic Symbols Gallery */}
      <section id="symbols" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Box className="text-blue-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">1. 电路符号与引脚</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                { name: '普通二极管', sub: 'Rectifier', path: 'M 30 50 L 70 50 M 50 30 L 50 70 M 30 30 L 30 70' },
                { name: '稳压二极管', sub: 'Zener', path: 'M 30 50 L 70 50 M 50 30 L 50 70 M 30 30 L 30 40 L 25 35 M 30 70 L 30 60 L 35 65' },
                { name: '肖特基', sub: 'Schottky', path: 'M 30 50 L 70 50 M 50 30 L 50 70 M 30 30 L 30 40 L 25 40 M 30 70 L 30 60 L 35 60' },
                { name: '发光二极管', sub: 'LED', path: 'M 30 50 L 70 50 M 50 30 L 50 70 M 30 30 L 30 70 M 60 20 L 75 5 M 65 30 L 80 15' }
            ].map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 mb-2 stroke-slate-800 fill-none" strokeWidth="3">
                        {/* Generic Diode Symbol Logic */}
                        <line x1="10" y1="50" x2="40" y2="50" />
                        <line x1="60" y1="50" x2="90" y2="50" />
                        <path d="M 40 30 L 60 50 L 40 70 Z" fill="currentColor" className="fill-slate-200" />
                        <path d={s.path} />
                    </svg>
                    <span className="text-sm font-bold text-slate-800">{s.name}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{s.sub}</span>
                </div>
            ))}
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1 space-y-4">
                 <h4 className="font-bold text-slate-800">引脚识别：阳极 vs 阴极</h4>
                 <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">A</span>
                        <span><strong>阳极 (Anode)：</strong> 对应符号中的三角形底边，接正电。</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">K</span>
                        <span><strong>阴极 (Cathode)：</strong> 对应符号中的竖线，接负电。实物通常有<strong>色环</strong>标注。</span>
                    </li>
                 </ul>
             </div>
             <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-inner">
                 <div className="w-48 h-12 bg-slate-800 rounded-full relative flex items-center shadow-lg">
                    <div className="absolute right-8 w-4 h-full bg-slate-400"></div>
                    <div className="absolute -left-8 w-8 h-1 bg-slate-400"></div>
                    <div className="absolute -right-8 w-8 h-1 bg-slate-400"></div>
                 </div>
                 <p className="text-[10px] text-center mt-3 text-slate-400 font-mono">实物图示 (色环端为负极)</p>
             </div>
        </div>
      </section>

      {/* Physical Structure */}
      <section id="principle" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Activity className="text-blue-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">2. 物理结构：PN 结</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 text-sm">内部半导体层</h4>
                <svg viewBox="0 0 400 160" className="w-full h-auto">
                    <rect x="50" y="40" width="150" height="80" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <text x="125" y="85" textAnchor="middle" className="font-bold fill-blue-700">P 型 (空穴多)</text>
                    <rect x="200" y="40" width="150" height="80" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                    <text x="275" y="85" textAnchor="middle" className="font-bold fill-emerald-700">N 型 (电子多)</text>
                    <rect x="180" y="40" width="40" height="80" fill="rgba(203, 213, 225, 0.4)" strokeDasharray="4" stroke="#94a3b8" />
                    <text x="200" y="30" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">耗尽层</text>
                </svg>
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="text-[10px] p-2 bg-blue-50 text-blue-700 rounded border border-blue-100">
                        <strong>正偏：</strong> 外加电场抵消内建电场，耗尽层变薄，导通。
                    </div>
                    <div className="text-[10px] p-2 bg-rose-50 text-rose-700 rounded border border-rose-100">
                        <strong>反偏：</strong> 外加电场增强内建电场，耗尽层变厚，截止。
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                    <Thermometer className="text-amber-600 shrink-0" />
                    <div>
                        <h4 className="font-bold text-amber-800 text-sm">温度敏感性</h4>
                        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                            温度每升高 1℃，二极管正向压降 {'$V_F$'} 约降低 2mV。这一特性常被用来制作简单的<strong>温度传感器</strong>，但也需要在功率电路中防止<strong>热失控</strong>。
                        </p>
                    </div>
                </div>
                <div className="bg-blue-900 p-5 rounded-xl text-white shadow-inner">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><Clock size={16}/> 反向恢复时间 {'($t_{rr}$)'}</h4>
                    <p className="text-[11px] text-blue-200 leading-relaxed">
                        当二极管从导通转为截止时，电荷不能瞬间消失。这个“关断延迟” {'$t_{rr}$'} 决定了管子能处理的<strong>最高开关频率</strong>。
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Applications */}
      <section id="apps" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <ShieldCheck className="text-rose-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">3. 经典工程应用</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="桥式整流" icon={<RefreshCw className="text-blue-500" />}>
                利用四个二极管将 AC（交流）变为单向 DC（直流）。是所有电源适配器的第一道工序。
            </InfoCard>
            <InfoCard title="续流保护" icon={<ShieldCheck className="text-emerald-500" />}>
                并联在继电器或马达两端。在断电瞬间，感性负载产生的<strong>反向高压</strong>通过二极管泄放，保护驱动芯片。
            </InfoCard>
            <InfoCard title="防反接" icon={<ArrowRight className="text-amber-500" />}>
                串联在电池输入端。如果电池正负极接反，二极管不导通，防止整个系统被烧毁。
            </InfoCard>
            <InfoCard title="稳压基准" icon={<Lightbulb className="text-purple-500" />}>
                利用稳压二极管的反向击穿特性，在电路中提供一个恒定的参考电压（如 3.3V 或 5.1V）。
            </InfoCard>
        </div>
      </section>
    </div>
  );
};

export const diodeNavItems = [
    { id: 'intro', label: '基本介绍' },
    { id: 'symbols', label: '符号与引脚' },
    { id: 'principle', label: '内部原理' },
    { id: 'apps', label: '应用场景' },
];