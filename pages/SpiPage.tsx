import React from 'react';
import WaveformVisualizer from '../components/WaveformVisualizer';
import WiringDiagram from '../components/WiringDiagram';
import { InfoCard } from '../components/InfoCard';
import { PINS } from '../constants';
import { Cable, CheckCircle2, XCircle, Zap } from 'lucide-react';

export const SpiPage: React.FC = () => {
  return (
    <div className="space-y-16">
        {/* Hero Section */}
        <section id="intro" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            SPI 通信协议
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
            <strong>串行外设接口 (Serial Peripheral Interface)</strong> 是一种高速、全双工、同步的通信总线。
            它以主从方式工作，通常由一个主设备和一个或多个从设备组成。
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-medium">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">同步通信</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">全双工</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">4线制</span>
            </div>
        </section>

        {/* Wiring Section */}
        <section id="wiring" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2">
                <Cable className="text-slate-700" size={24}/>
                <h3 className="text-2xl font-bold text-slate-900">硬件接线</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1 space-y-3">
                    <p className="text-slate-600 text-sm mb-4">
                        SPI 使用推挽输出，信号线直接连接。每增加一个从机，通常需要增加一根 CS 线。
                    </p>
                    {PINS.map(pin => (
                        <div key={pin.name} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm group hover:border-blue-300 transition-colors">
                            <div className={`font-bold font-mono text-sm ${pin.color}`}>{pin.name}</div>
                            <div className="text-xs font-semibold text-slate-800">{pin.fullName}</div>
                        </div>
                    ))}
                </div>
                <div className="md:col-span-2">
                    <WiringDiagram />
                </div>
            </div>
        </section>

        {/* Interactive Waveform Section */}
        <section id="simulation" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3">
                <Zap className="text-amber-500 fill-amber-500" />
                <h3 className="text-2xl font-bold text-slate-900">波形仿真</h3>
            </div>
            <p className="text-slate-600 max-w-2xl">
                数据传输由 SCLK 时钟同步。主机和从机通过移位寄存器交换数据。
            </p>
            
            <WaveformVisualizer />
        </section>

        {/* Pros & Cons */}
        <section id="pros-cons" className="scroll-mt-24 grid md:grid-cols-2 gap-6">
                <InfoCard title="优点" icon={<CheckCircle2 className="text-emerald-500" />} colorClass="bg-emerald-50/50 border-emerald-100">
                <ul className="space-y-2 list-disc list-inside">
                    <li>高速 (可达 10Mbps+)。</li>
                    <li>全双工 (同时收发)。</li>
                    <li>硬件简单 (无复杂协议开销)。</li>
                    <li>无地址位，传输效率高。</li>
                </ul>
                </InfoCard>

                <InfoCard title="缺点" icon={<XCircle className="text-red-500" />} colorClass="bg-red-50/50 border-red-100">
                <ul className="space-y-2 list-disc list-inside">
                    <li>从机增多时 CS 引脚占用多。</li>
                    <li>无应答机制 (ACK)，不知从机是否接收。</li>
                    <li>没有标准化的错误处理。</li>
                </ul>
                </InfoCard>
        </section>
    </div>
  );
};

export const spiNavItems = [
    { id: 'intro', label: '协议简介' },
    { id: 'wiring', label: '硬件接线' },
    { id: 'simulation', label: '波形仿真' },
    { id: 'pros-cons', label: '优缺点' },
];