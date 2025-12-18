import React from 'react';
import { InfoCard } from '../components/InfoCard';
import { Cpu, Zap, Activity, Shield, FastForward, ToggleLeft, Thermometer, BatteryLow, Box } from 'lucide-react';

export const MosfetPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Zap size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                MOS管 (MOSFET) 深度解析
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          MOSFET 是一种<strong>电压控制</strong>型器件。不同于三极管，它在栅极 (G) 几乎不消耗电流，且拥有极高的开关速度和极低的导通电阻，是高性能功率电子的核心。
        </p>
      </section>

      {/* Symbols Gallery */}
      <section id="symbols" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Box className="text-indigo-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">1. 电路符号全集</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            {/* NMOS */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">N-Channel (NMOS)</h4>
                <div className="flex justify-center mb-4">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-800 fill-none" strokeWidth="2.5">
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
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="fill-slate-800" />
                            </marker>
                        </defs>
                        
                        <text x="5" y="55" className="text-[12px] font-bold stroke-none fill-slate-500">G</text>
                        <text x="75" y="35" className="text-[12px] font-bold stroke-none fill-slate-500">D</text>
                        <text x="75" y="70" className="text-[12px] font-bold stroke-none fill-slate-500">S</text>
                    </svg>
                </div>
                <p className="text-xs text-slate-500"><strong>特性：</strong> 高电平 (Vgs &gt; Vth) 开启。类似于 NPN。</p>
            </div>
            {/* PMOS */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">P-Channel (PMOS)</h4>
                <div className="flex justify-center mb-4">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-slate-800 fill-none" strokeWidth="2.5">
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
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="fill-slate-800" />
                            </marker>
                        </defs>
                        
                        <text x="5" y="55" className="text-[12px] font-bold stroke-none fill-slate-500">G</text>
                        <text x="75" y="35" className="text-[12px] font-bold stroke-none fill-slate-500">D</text>
                        <text x="75" y="70" className="text-[12px] font-bold stroke-none fill-slate-500">S</text>
                    </svg>
                </div>
                <p className="text-xs text-slate-500"><strong>特性：</strong> 低电平 (Vgs &lt; -Vth) 开启。类似于 PNP。</p>
            </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800">
            <h4 className="text-sm font-bold text-indigo-400 mb-4 uppercase tracking-widest">引脚识记指南</h4>
            <div className="grid grid-cols-3 gap-6">
                <div className="border-l-2 border-indigo-500 pl-4">
                    <span className="block font-bold text-white">G: 栅极 (Gate)</span>
                    <span className="text-[10px] text-slate-400 leading-tight">控制大门。通过电压建立电场。</span>
                </div>
                <div className="border-l-2 border-blue-500 pl-4">
                    <span className="block font-bold text-white">D: 漏极 (Drain)</span>
                    <span className="text-[10px] text-slate-400 leading-tight">电流入口。对应 BJT 的 C 极。</span>
                </div>
                <div className="border-l-2 border-emerald-500 pl-4">
                    <span className="block font-bold text-white">S: 源极 (Source)</span>
                    <span className="text-[10px] text-slate-400 leading-tight">电流出口。对应 BJT 的 E 极。</span>
                </div>
            </div>
        </div>
      </section>

      {/* Key Principle Section */}
      <section id="principle" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Activity className="text-indigo-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">2. 电压驱动与电荷机制</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2">
                    <BatteryLow className="text-amber-500" size={18}/>
                    开启阈值：V_gs(th)
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                    栅极电压必须超过阈值电压（通常 1V~4V）才能形成<strong>反型层（沟道）</strong>。
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <span className="text-[10px] font-bold text-indigo-700 block mb-1">工程提示：</span>
                    <p className="text-[10px] text-indigo-600 leading-relaxed">
                        仅仅达到 Vgs(th) 只是刚刚开始导通。为了获得最低的<strong>导通电阻 (Rds_on)</strong>，建议给栅极提供更大的过驱动电压（如 5V 或 10V）。
                    </p>
                </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2">
                    <FastForward className="text-indigo-600" size={18}/>
                    栅极电容：为什么需要驱动电流？
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                    虽然静态下栅极电流为0，但栅极内部结构本质上是一个<strong>电容</strong>。
                    在高速开关时，必须给这个电容快速充电，因此需要瞬时电流（几百mA到几A）。这也是为什么驱动大 MOS 管需要专门的<strong>驱动芯片</strong>。
                </p>
            </div>
        </div>
      </section>

      {/* Body Diode & Apps */}
      <section id="apps" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Shield className="text-emerald-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">3. 寄生结构与实际应用</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <InfoCard title="体二极管" icon={<Activity className="text-rose-500" />}>
                MOS 管内部天生自带一个反向并联的二极管。在电机驱动中，它常被用作<strong>续流二极管</strong>，但在设计中必须注意其反向恢复特性。
            </InfoCard>
            <InfoCard title="PWM 调速" icon={<Zap className="text-amber-500" />}>
                利用 MOSFET 的极快开关速度，配合 PWM 信号调节电机或 LED 的占空比，实现极高效的功率控制。
            </InfoCard>
            <InfoCard title="防反接 (PMOS)" icon={<ToggleLeft className="text-blue-500" />}>
                在电源入口使用 PMOS。相比二极管，它的导通压降极小，能显著降低系统发热和功耗。
            </InfoCard>
        </div>
      </section>
    </div>
  );
};

export const mosfetNavItems = [
    { id: 'intro', label: '基本介绍' },
    { id: 'symbols', label: '符号全集' },
    { id: 'principle', label: '驱动机制' },
    { id: 'apps', label: '应用场景' },
];