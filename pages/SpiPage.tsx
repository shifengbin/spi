import React from 'react';
import WaveformVisualizer from '../components/WaveformVisualizer';
import WiringDiagram from '../components/WiringDiagram';
import { InfoCard } from '../components/InfoCard';
import { PINS } from '../constants';
import { Cable, CheckCircle2, XCircle, Zap, Layers, ArrowRightLeft, Activity } from 'lucide-react';

export const SpiPage: React.FC = () => {
  return (
    <div className="space-y-16">
        {/* 协议简介 */}
        <section id="intro" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            SPI 通信协议 (Serial Peripheral Interface)
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
            SPI 是一种<strong>高速、全双工、同步</strong>的串行通信协议。它采用主从架构（Master-Slave），由主机产生时钟信号，控制数据的收发。
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-medium">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1.5"><Activity size={14}/> 同步传输</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1.5"><ArrowRightLeft size={14}/> 全双工</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full flex items-center gap-1.5">4线制接口</span>
            </div>
        </section>

        {/* 硬件连接方式 */}
        <section id="wiring" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
                <Cable className="text-slate-700" size={24}/>
                <h3 className="text-2xl font-bold text-slate-900">1. 硬件接线方式</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1 space-y-3">
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                        SPI 标准使用四根信号线。主机的 MOSI 接从机的 MOSI，MISO 接 MISO，时钟和片选直连。
                    </p>
                    {PINS.map(pin => (
                        <div key={pin.name} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <div className={`font-bold font-mono text-sm ${pin.color}`}>{pin.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{pin.fullName}</div>
                            <div className="text-[10px] text-slate-500 mt-1 italic">{pin.direction}</div>
                        </div>
                    ))}
                </div>
                <div className="md:col-span-2">
                    <WiringDiagram />
                </div>
            </div>
        </section>

        {/* 波形与时序仿真 */}
        <section id="simulation" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <Zap className="text-amber-500 fill-amber-500" size={24} />
                <h3 className="text-2xl font-bold text-slate-900">2. 发送波形仿真</h3>
            </div>
            <p className="text-slate-600 max-w-2xl text-sm italic">
                您可以切换下方的模式 (0-3)，观察不同极性 (CPOL) 和相位 (CPHA) 如何影响时钟边沿的数据采样。
            </p>
            
            <WaveformVisualizer />
        </section>

        {/* 优缺点对比 */}
        <section id="pros-cons" className="scroll-mt-24 grid md:grid-cols-2 gap-6">
                <InfoCard title="协议优点" icon={<CheckCircle2 className="text-emerald-500" />} colorClass="bg-emerald-50/50 border-emerald-100">
                <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2"><ArrowRightLeft size={14} className="mt-0.5 text-emerald-600"/> <strong>极高速度：</strong> 无最大速度限制，通常可达几十MHz。</li>
                    <li className="flex items-start gap-2"><ArrowRightLeft size={14} className="mt-0.5 text-emerald-600"/> <strong>全双工：</strong> 同时收发数据，效率高于 I2C。</li>
                    <li className="flex items-start gap-2"><ArrowRightLeft size={14} className="mt-0.5 text-emerald-600"/> <strong>硬件简单：</strong> 不需要地址识别逻辑。</li>
                </ul>
                </InfoCard>

                <InfoCard title="局限性" icon={<XCircle className="text-red-500" />} colorClass="bg-red-50/50 border-red-100">
                <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2"><XCircle size={14} className="mt-0.5 text-red-600"/> <strong>引脚消耗：</strong> 每增加一个从机都需要一根额外的 CS 线。</li>
                    <li className="flex items-start gap-2"><XCircle size={14} className="mt-0.5 text-red-600"/> <strong>无应答：</strong> 没有类似 I2C 的 ACK 机制，无法确认对方是否收到。</li>
                </ul>
                </InfoCard>
        </section>
    </div>
  );
};

export const spiNavItems = [
    { id: 'intro', label: '协议简介' },
    { id: 'wiring', label: '1. 硬件接线' },
    { id: 'simulation', label: '2. 波形仿真' },
    { id: 'pros-cons', label: '优缺点' },
];