import React from 'react';
import { InfoCard } from '../components/InfoCard';
import I2cWaveformVisualizer from '../components/I2cWaveformVisualizer';
import { Cable, CheckCircle2, XCircle, ArrowRight, Activity, ArrowDownRight, ArrowUpRight, Lock, MessageSquare, Layers, RefreshCw, FastForward } from 'lucide-react';

export const I2cPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          I2C (IIC) 通信协议
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          <strong>Inter-Integrated Circuit (I²C)</strong> 是一种串行通信总线，使用多主从架构。
          它只需要两根双向信号线就能连接多个设备，非常适合引脚受限的场合。
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">半双工</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">2线制</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">地址寻址</span>
        </div>
      </section>

      {/* Wiring Section */}
      <section id="wiring" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Cable className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">硬件接线 (Open Drain)</h3>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                {/* SVG I2C Diagram */}
                <svg viewBox="0 0 600 250" className="w-full h-auto">
                    {/* Power Lines */}
                    <line x1="50" y1="20" x2="550" y2="20" stroke="#ef4444" strokeWidth="2" />
                    <text x="30" y="25" fill="#ef4444" className="font-mono font-bold text-xs">VCC</text>
                    
                    {/* Pull-up Resistors */}
                    <path d="M150 20 V60 L145 65 L155 70 L145 75 L155 80 L150 85 V120" fill="none" stroke="#64748b" strokeWidth="2"/>
                    <text x="160" y="60" fill="#64748b" className="font-mono text-xs">Rp</text>
                    <path d="M250 20 V60 L245 65 L255 70 L245 75 L255 80 L250 85 V150" fill="none" stroke="#64748b" strokeWidth="2"/>
                    <text x="260" y="60" fill="#64748b" className="font-mono text-xs">Rp</text>

                    {/* SCL Bus Line */}
                    <line x1="50" y1="120" x2="550" y2="120" stroke="#3b82f6" strokeWidth="3" />
                    <text x="20" y="125" fill="#3b82f6" className="font-mono font-bold text-sm">SCL</text>

                    {/* SDA Bus Line */}
                    <line x1="50" y1="150" x2="550" y2="150" stroke="#10b981" strokeWidth="3" />
                    <text x="20" y="155" fill="#10b981" className="font-mono font-bold text-sm">SDA</text>

                    {/* Master Device */}
                    <g transform="translate(80, 180)">
                        <rect width="80" height="60" rx="4" fill="#1e293b" />
                        <text x="40" y="35" fill="white" textAnchor="middle" className="font-bold text-sm">Master</text>
                        <line x1="20" y1="0" x2="20" y2="-60" stroke="#3b82f6" strokeWidth="2" />
                        <line x1="60" y1="0" x2="60" y2="-30" stroke="#10b981" strokeWidth="2" />
                    </g>

                    {/* Slave 1 */}
                    <g transform="translate(300, 180)">
                        <rect width="80" height="60" rx="4" fill="#475569" />
                        <text x="40" y="25" fill="white" textAnchor="middle" className="font-bold text-sm">Slave 1</text>
                        <text x="40" y="45" fill="#94a3b8" textAnchor="middle" className="font-mono text-[10px]">Addr: 0x50</text>
                        <line x1="20" y1="0" x2="20" y2="-60" stroke="#3b82f6" strokeWidth="2" />
                        <circle cx="20" cy="-60" r="3" fill="#3b82f6" />
                        <line x1="60" y1="0" x2="60" y2="-30" stroke="#10b981" strokeWidth="2" />
                        <circle cx="60" cy="-30" r="3" fill="#10b981" />
                    </g>

                    {/* Slave 2 */}
                    <g transform="translate(450, 180)">
                        <rect width="80" height="60" rx="4" fill="#475569" />
                        <text x="40" y="25" fill="white" textAnchor="middle" className="font-bold text-sm">Slave 2</text>
                        <text x="40" y="45" fill="#94a3b8" textAnchor="middle" className="font-mono text-[10px]">Addr: 0x68</text>
                        <line x1="20" y1="0" x2="20" y2="-60" stroke="#3b82f6" strokeWidth="2" />
                        <circle cx="20" cy="-60" r="3" fill="#3b82f6" />
                        <line x1="60" y1="0" x2="60" y2="-30" stroke="#10b981" strokeWidth="2" />
                        <circle cx="60" cy="-30" r="3" fill="#10b981" />
                    </g>
                </svg>
                <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded">
                    <strong>关键点：</strong> I2C 采用<span className="text-slate-800 font-bold">开漏 (Open-Drain)</span> 输出结构。总线上必须接<span className="text-slate-800 font-bold">上拉电阻 (Pull-up Resistors)</span>，通常为 4.7kΩ 或 10kΩ。空闲时总线被拉高。
                </div>
            </div>

            <div className="space-y-4">
                 <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-blue-600">SCL</span>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">时钟线</span>
                    </div>
                    <p className="text-xs text-slate-500">
                        Serial Clock。始终由主机产生。数据在 SCL 为高电平时必须保持稳定，低电平时才允许变化。
                    </p>
                 </div>
                 <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-emerald-600">SDA</span>
                        <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">数据线</span>
                    </div>
                    <p className="text-xs text-slate-500">
                        Serial Data。双向传输。设备控制 SDA 将其拉低表示 '0'，释放(由电阻拉高)表示 '1'。
                    </p>
                 </div>
            </div>
        </div>
      </section>

      {/* Protocol Details */}
      <section id="protocol" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Activity className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">时序仿真 & 详解</h3>
        </div>
        
        <p className="text-slate-600 max-w-2xl">
            下方展示了完整的 I2C 写操作时序：起始信号 + 7位地址 + 读写位 + ACK + 8位数据 + ACK + 停止信号。
        </p>

        <I2cWaveformVisualizer />
        
        {/* Detailed Protocol Breakdown Cards */}
        <div className="grid md:grid-cols-2 gap-6 pt-4">
            
            {/* Start Condition */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-amber-200 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                        <ArrowDownRight size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800">起始信号 (Start)</h4>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                    <strong>唯一例外：</strong> 在 SCL 为高电平 (High) 期间，SDA 由高电平跳变为低电平。
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                    标志着一次通信的开始，总线进入“忙”状态。所有从机开始监听。
                </div>
            </div>

            {/* Data Validity */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Lock size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800">数据有效性</h4>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                    <strong>SCL 高电平 = 采样：</strong> 数据线必须保持稳定，不允许变化。<br/>
                    <strong>SCL 低电平 = 变换：</strong> 允许 SDA 电平切换以准备下一位数据。
                </p>
            </div>

            {/* ACK */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                        <MessageSquare size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800">应答信号 (ACK/NACK)</h4>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                    每发送 8 位数据后，发送方释放 SDA。在第 9 个时钟脉冲期间，接收方必须将 SDA <strong>拉低</strong> 以表示“收到”(ACK)。
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                    若 SDA 保持高电平，则为非应答 (NACK)，通常表示接收方忙、数据传完或出错。
                </div>
            </div>

             {/* Stop Condition */}
             <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <ArrowUpRight size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800">停止信号 (Stop)</h4>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                    <strong>唯一例外：</strong> 在 SCL 为高电平 (High) 期间，SDA 由低电平跳变为高电平。
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                    标志着通信结束，总线释放，恢复为空闲状态 (SCL=1, SDA=1)。
                </div>
            </div>

        </div>

      </section>

      {/* Advanced Operations */}
      <section id="advanced" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Layers className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">进阶操作：连续传输与重复起始</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
            {/* Repeated Start */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><RefreshCw size={18}/></div>
                    重复起始 (Repeated Start)
                 </h4>
                 <div className="space-y-4">
                     <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600">
                        <span className="font-bold text-slate-800 block mb-1">场景：我要读寄存器数据</span>
                        为了读取传感器特定寄存器（如温度），你需要两个步骤：<br/>
                        1. <strong>写</strong>：告诉传感器“把指针移到温度寄存器”。<br/>
                        2. <strong>读</strong>：读取该处的数据。
                     </div>
                     <p className="text-sm text-slate-600 leading-relaxed">
                        如果在第1步后发送停止信号 (Stop)，总线就会被释放，其他主设备可能会趁机插队打断。
                        <br/><br/>
                        <strong>解决方案：</strong> 主机在第1步结束后，<strong>不挂断 (不发 Stop)</strong>，直接再次发送一个起始信号 (Start)。这就像在电话里说“稍等，我还有事”，保持通话不中断，直接切换到接收模式。
                     </p>
                 </div>
                 <div className="mt-4 bg-slate-900 p-3 rounded-lg text-xs font-mono text-white border border-slate-800 overflow-x-auto">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-amber-500">S</span>
                        <span>ADDR(写)</span>
                        <span>ACK</span>
                        <span>REG地址</span>
                        <span>ACK</span>
                        <span className="text-indigo-400 font-bold border border-indigo-500 px-1 rounded">Sr (再拨号)</span>
                        <span>ADDR(读)</span>
                        <span>ACK</span>
                        <span>数据...</span>
                        <span className="text-red-500">P</span>
                    </div>
                 </div>
            </div>

            {/* Sequential Transfer */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg"><FastForward size={18}/></div>
                    连续传输 (Sequential Transfer)
                 </h4>
                 <div className="space-y-4">
                     <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600">
                        <span className="font-bold text-slate-800 block mb-1">场景：读取大块数据</span>
                        假设你要读取 EEPROM 中的 1KB 数据，或者读取 XYZ 三轴加速度数据。
                     </div>
                     <p className="text-sm text-slate-600 leading-relaxed">
                        不需要每次只读一个字节。你只需要告诉从机<strong>起始地址</strong>。
                        <br/><br/>
                        <strong>自动翻页原理：</strong> 从机内部有一个地址指针。每传输一个字节，指针自动 +1。主机只要不断发送应答 (ACK)，从机就会像流水线一样源源不断地吐出后续数据，直到主机喊停 (NACK + Stop)。
                     </p>
                 </div>
                 <div className="mt-4 bg-slate-900 p-3 rounded-lg text-xs font-mono text-white border border-slate-800 overflow-x-auto">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-amber-500">S</span>
                        <span>ADDR+W</span>
                        <span>ACK</span>
                        <span>起始位置</span>
                        <span>ACK</span>
                        <span className="text-emerald-400 font-bold border border-emerald-500 px-1 rounded">数据1</span>
                        <span>ACK(继续)</span>
                        <span className="text-emerald-400 font-bold border border-emerald-500 px-1 rounded">数据2</span>
                        <span>ACK(继续)...</span>
                        <span className="text-red-500">P</span>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section id="pros-cons" className="scroll-mt-24 grid md:grid-cols-2 gap-6">
            <InfoCard title="优点" icon={<CheckCircle2 className="text-emerald-500" />} colorClass="bg-emerald-50/50 border-emerald-100">
            <ul className="space-y-2 list-disc list-inside">
                <li>极其节省引脚 (仅需2根线)。</li>
                <li>支持多主多从。</li>
                <li>具有应答 (ACK) 机制，可靠性较高。</li>
                <li>硬件上容易实现电平转换。</li>
            </ul>
            </InfoCard>

            <InfoCard title="缺点" icon={<XCircle className="text-red-500" />} colorClass="bg-red-50/50 border-red-100">
            <ul className="space-y-2 list-disc list-inside">
                <li>速度较慢 (标准模式 100kHz，快速 400kHz)。</li>
                <li>半双工通信 (同一时间只能收或发)。</li>
                <li>协议相对复杂 (需要处理起始/停止位和应答)。</li>
                <li>开漏输出导致功耗较高 (电阻持续耗电)。</li>
            </ul>
            </InfoCard>
      </section>

    </div>
  );
};

export const i2cNavItems = [
    { id: 'intro', label: '协议简介' },
    { id: 'wiring', label: '硬件接线' },
    { id: 'protocol', label: '时序仿真' },
    { id: 'advanced', label: '进阶操作' },
    { id: 'pros-cons', label: '优缺点' },
];