import React from 'react';
import WaveformVisualizer from './components/WaveformVisualizer';
import WiringDiagram from './components/WiringDiagram';
import { InfoCard } from './components/InfoCard';
import { PINS } from './constants';
import { Activity, Cable, CheckCircle2, XCircle, Cpu, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <Activity size={20} />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900">SPI 协议管理器</h1>
          </div>
          <a 
            href="https://zh.wikipedia.org/wiki/序列周邊介面" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            文档 / Wiki
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            深入理解 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">SPI 通信协议</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            <strong>串行外设接口 (Serial Peripheral Interface)</strong> 是一种同步串行通信接口规范，主要用于嵌入式系统中短距离通信。
          </p>
          <div className="flex justify-center gap-4 text-sm font-medium">
             <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">同步通信</span>
             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">全双工</span>
             <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">主从架构</span>
          </div>
        </section>

        {/* Wiring Section */}
        <section className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Cable className="text-slate-700" size={24}/>
                    <h3 className="text-2xl font-bold text-slate-900">接线方式</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                    SPI 通常使用 4 根线。单个主机控制时钟并选择从设备。
                </p>
                <div className="space-y-3">
                    {PINS.map(pin => (
                        <div key={pin.name} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm group hover:border-blue-300 transition-colors">
                            <div className={`font-bold font-mono text-sm ${pin.color}`}>{pin.name}</div>
                            <div className="text-xs font-semibold text-slate-800">{pin.fullName}</div>
                            <div className="text-xs text-slate-500 mt-1">{pin.description}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:col-span-2">
                <WiringDiagram />
            </div>
        </section>

        {/* Interactive Waveform Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <Zap className="text-amber-500 fill-amber-500" />
                <h3 className="text-2xl font-bold text-slate-900">信号传输仿真</h3>
            </div>
            <p className="text-slate-600 max-w-2xl">
                SPI 是“同步”协议，这意味着数据是跟随时钟信号移动的。
                在下方，你可以修改发送的数据和 SPI 模式（时钟极性 CPOL / 相位 CPHA），观察信号波形的变化。
            </p>
            
            <WaveformVisualizer />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                 <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-700 border border-slate-200">
                    <span className="font-bold block mb-1">CPOL (Clock Polarity - 时钟极性)</span>
                    决定时钟线空闲时的电平状态。<br/>
                    0 = 空闲低电平 (脉冲为高)。 1 = 空闲高电平 (脉冲为低)。
                 </div>
                 <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-700 border border-slate-200">
                    <span className="font-bold block mb-1">CPHA (Clock Phase - 时钟相位)</span>
                    决定在时钟的第几个边沿采样数据。<br/>
                    0 = 第一个边沿 (前沿) 采样。 1 = 第二个边沿 (后沿) 采样。
                 </div>
            </div>
        </section>

        {/* Pros & Cons */}
        <section className="grid md:grid-cols-2 gap-6">
             <InfoCard title="优点" icon={<CheckCircle2 className="text-emerald-500" />} colorClass="bg-emerald-50/50 border-emerald-100">
                <ul className="space-y-2 list-disc list-inside">
                    <li>高速数据传输 (全双工)。</li>
                    <li>硬件协议简单 (推挽驱动，无需上拉电阻)。</li>
                    <li>从机不需要唯一地址 (通过 CS 片选线区分)。</li>
                    <li>数据位长度灵活，不限于8位。</li>
                </ul>
             </InfoCard>

             <InfoCard title="缺点" icon={<XCircle className="text-red-500" />} colorClass="bg-red-50/50 border-red-100">
                <ul className="space-y-2 list-disc list-inside">
                    <li>占用引脚较多 (每个从机需要额外的 CS 线)。</li>
                    <li>没有流控制或应答机制 (ACK)。</li>
                    <li>通常仅支持单个主机。</li>
                    <li>仅适用于短距离通信 (板级通信)。</li>
                </ul>
             </InfoCard>
        </section>

      </main>

      <footer className="border-t border-slate-200 mt-20 py-8 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center text-slate-400 text-sm">
           <div className="flex justify-center items-center gap-2 mb-2">
               <Cpu size={16} />
               <span>嵌入式系统教育</span>
           </div>
           <p>© {new Date().getFullYear()} SPI 协议交互式指南。使用 React & D3 构建。</p>
        </div>
      </footer>
    </div>
  );
}