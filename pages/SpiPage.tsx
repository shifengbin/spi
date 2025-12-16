import React from 'react';
import WaveformVisualizer from '../components/WaveformVisualizer';
import WiringDiagram from '../components/WiringDiagram';
import { InfoCard } from '../components/InfoCard';
import { PINS } from '../constants';
import { Cable, CheckCircle2, XCircle, Zap, Layers, ArrowRightLeft, Activity } from 'lucide-react';

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
                    <li>高速 (可达 10Mbps+)，QSPI/OSPI 更快。</li>
                    <li>全双工 (标准模式)。</li>
                    <li>协议简单，无起始位/停止位开销。</li>
                    <li>数据传输连续，无最大帧长度限制。</li>
                </ul>
                </InfoCard>

                <InfoCard title="缺点" icon={<XCircle className="text-red-500" />} colorClass="bg-red-50/50 border-red-100">
                <ul className="space-y-2 list-disc list-inside">
                    <li>引脚占用多 (尤其是多从机或并行模式)。</li>
                    <li>无应答机制 (ACK)，需高层协议保证完整性。</li>
                    <li>主从设备时钟配置 (CPOL/CPHA) 必须严格匹配。</li>
                    <li>长距离传输抗干扰能力弱。</li>
                </ul>
                </InfoCard>
        </section>

        {/* Detailed Variants Section - Moved to End */}
        <section id="variants" className="scroll-mt-24 space-y-8">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-900 text-white rounded-lg">
                    <Layers size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">进阶模式与协议变体</h3>
                    <p className="text-slate-500 text-sm">针对高性能存储和低引脚场景的扩展标准</p>
                </div>
            </div>

            {/* 3-Wire SPI Detail */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-indigo-300 transition-colors">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                        3-Wire SPI (半双工)
                    </h4>
                    <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">Pins: CS, SCK, DATA</span>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                            在标准的 4 线 SPI 中，MOSI 和 MISO 是独立的，允许同时收发数据（全双工）。
                            但在 3 线模式下，这两根线合并为一根双向数据线（通常称为 <strong>MOMI</strong> 或 <strong>SISO</strong>）。
                        </p>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">●</span>
                                <span><strong>节省引脚：</strong> 减少了一根物理连线，适合引脚极少的微控制器或传感器。</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">●</span>
                                <span><strong>半双工限制：</strong> 主机和从机不能同时发送数据。通信时需要通过协议约定谁在控制数据线，必须在软件或硬件层切换 GPIO 的输入/输出方向。</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-indigo-50/50 rounded-lg p-4 flex flex-col items-center justify-center border border-indigo-100">
                         <div className="flex items-center gap-4 text-xs font-mono font-bold">
                            <div className="p-3 bg-white border border-indigo-200 rounded shadow-sm text-slate-700">Master</div>
                            <div className="flex flex-col gap-1 items-center w-32">
                                <div className="h-0.5 w-full bg-slate-300 relative"></div>
                                <div className="flex items-center gap-1 w-full text-[10px] text-indigo-600 justify-center bg-white/50 py-1 rounded">
                                    <ArrowRightLeft size={12} />
                                    <span>Bi-Directional</span>
                                </div>
                                <div className="h-0.5 w-full bg-indigo-400"></div>
                            </div>
                            <div className="p-3 bg-white border border-indigo-200 rounded shadow-sm text-slate-700">Slave</div>
                         </div>
                         <p className="mt-3 text-[10px] text-indigo-400 font-medium">数据线复用 (MOSI + MISO &#8594; SISO)</p>
                    </div>
                </div>
            </div>

            {/* QSPI Detail */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-purple-300 transition-colors">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                     <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                        Quad SPI (QSPI)
                    </h4>
                    <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">Pins: CS, SCK, IO0-3</span>
                </div>
                <div className="p-6">
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                        QSPI 是对标准 SPI 的扩展，主要用于连接大容量外部 Flash 存储器。它将数据线增加到 4 根（IO0, IO1, IO2, IO3），在每个时钟周期内可以传输 4 位数据，理论吞吐量是标准 SPI 的 4 倍。
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <h5 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>多阶段传输
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                典型的 QSPI 事务分为：<br/>1. 命令阶段 (1线)<br/>2. 地址阶段 (1/4线)<br/>3. 空闲周期 (Dummy)<br/>4. 数据阶段 (4线)。
                            </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <h5 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>XIP (Execute in Place)
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                允许 CPU 绕过 RAM，直接从外部 Flash 读取并执行指令。这极大地扩展了 MCU 的可用代码空间。
                            </p>
                        </div>
                         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <h5 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>引脚复用
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                IO0/IO1 复用原 MOSI/MISO。IO2/IO3 通常复用为写保护 (WP) 和保持 (HOLD) 功能。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* OSPI Detail */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-rose-300 transition-colors">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-6 bg-rose-500 rounded-full"></span>
                        Octal SPI (OSPI) / xSPI
                    </h4>
                     <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">Pins: CS, SCK, IO0-7, DQS</span>
                </div>
                <div className="p-6">
                     <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                        为了追求更高的带宽，OSPI 将数据线扩展到 8 根。配合高频时钟（如 200MHz+），其性能接近传统的并行总线，但引脚数仍远少于并行总线。常用于高性能 MCU 的外部 RAM 或 Flash 扩展。
                    </p>
                     <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 bg-rose-100 text-rose-600 rounded p-1 h-fit"><Zap size={16} /></div>
                                <div>
                                    <h5 className="font-bold text-slate-800 text-sm">DDR (Double Data Rate)</h5>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        OSPI 通常支持双倍数据速率模式，即在时钟的<strong>上升沿和下降沿</strong>都进行数据传输。配合 8 线宽度，一个时钟周期可传输 16 位 (2字节) 数据。
                                    </p>
                                </div>
                            </div>
                             <div className="flex gap-3">
                                <div className="mt-1 bg-rose-100 text-rose-600 rounded p-1 h-fit"><Activity size={16} /></div>
                                <div>
                                    <h5 className="font-bold text-slate-800 text-sm">DQS (Data Strobe)</h5>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        在极高频率下，为了解决时钟和数据的相位偏差问题，OSPI 引入了独立的 DQS 信号。数据传输时随数据一起发送选通脉冲，接收端利用 DQS 来准确采样数据。
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                         <div className="flex-1 bg-slate-900 rounded-lg p-5 text-slate-400 font-mono text-xs flex flex-col justify-center shadow-inner">
                            <div className="mb-3 text-slate-500 border-b border-slate-700 pb-2 uppercase tracking-wider font-bold text-[10px]">理论带宽对比 (Example @ 100MHz)</div>
                            <div className="flex justify-between mb-2 items-center">
                                <span>SPI (1-bit)</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-1 bg-blue-900 rounded overflow-hidden"><div className="h-full bg-blue-500 w-[10%]"></div></div>
                                    <span className="text-blue-400">100 Mbps</span>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2 items-center">
                                <span>QSPI (4-bit)</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-1 bg-purple-900 rounded overflow-hidden"><div className="h-full bg-purple-500 w-[40%]"></div></div>
                                    <span className="text-purple-400">400 Mbps</span>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2 items-center">
                                <span>OSPI (8-bit)</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-1 bg-rose-900 rounded overflow-hidden"><div className="h-full bg-rose-500 w-[80%]"></div></div>
                                    <span className="text-rose-400">800 Mbps</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>OSPI DDR</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-1 bg-rose-900 rounded overflow-hidden"><div className="h-full bg-white w-full"></div></div>
                                    <span className="text-white font-bold">1600 Mbps</span>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
            
        </section>
    </div>
  );
};

export const spiNavItems = [
    { id: 'intro', label: '协议简介' },
    { id: 'wiring', label: '硬件接线' },
    { id: 'simulation', label: '波形仿真' },
    { id: 'pros-cons', label: '优缺点' },
    { id: 'variants', label: '进阶模式' },
];