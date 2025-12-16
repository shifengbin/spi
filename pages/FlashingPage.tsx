import React from 'react';
import { InfoCard } from '../components/InfoCard';
import { Cpu, HardDriveDownload, RefreshCw, Cable, Layers, ArrowRight, Settings, FileCode, Lock } from 'lucide-react';

export const FlashingPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          MCU 烧录 (Flashing) 原理
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          <strong>烧录 (Burning/Flashing)</strong> 是将计算机编译好的二进制机器码 (Machine Code) 写入 MCU 内部非易失性存储器 (Flash Memory) 的过程。
          这相当于给单片机“安装操作系统和软件”。
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">非易失性存储</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Hex/Bin 文件</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">程序加载</span>
        </div>
      </section>

      {/* The Process Visualization */}
      <section id="process" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <FileCode className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">从代码到芯片</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
                
                {/* Step 1: PC */}
                <div className="flex flex-col items-center z-10 w-full md:w-auto">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-200 mb-3">
                        <FileCode className="text-blue-500" size={32} />
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-slate-800">1. 编译 (Compile)</h4>
                        <p className="text-xs text-slate-500">C Code &rarr; Hex/Bin</p>
                    </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-1 items-center justify-center relative -top-4">
                    <div className="h-1 bg-slate-200 w-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rotate-45 w-3 h-3 border-t-4 border-r-4 border-slate-200"></div>
                    </div>
                    <span className="absolute -top-6 text-xs font-mono text-slate-400 bg-white px-2">USB / Serial</span>
                </div>
                <div className="md:hidden text-slate-300 transform rotate-90"><ArrowRight size={24}/></div>

                {/* Step 2: Programmer */}
                <div className="flex flex-col items-center z-10 w-full md:w-auto">
                    <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center shadow-lg mb-3 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
                        <Settings className="text-white" size={32} />
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-slate-800">2. 烧录器 / 接口</h4>
                        <p className="text-xs text-slate-500">J-Link / Bootloader</p>
                    </div>
                </div>

                 {/* Arrow */}
                 <div className="hidden md:flex flex-1 items-center justify-center relative -top-4">
                    <div className="h-1 bg-slate-200 w-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rotate-45 w-3 h-3 border-t-4 border-r-4 border-slate-200"></div>
                    </div>
                    <span className="absolute -top-6 text-xs font-mono text-slate-400 bg-white px-2">SWD / JTAG / UART</span>
                </div>
                <div className="md:hidden text-slate-300 transform rotate-90"><ArrowRight size={24}/></div>

                {/* Step 3: MCU */}
                <div className="flex flex-col items-center z-10 w-full md:w-auto">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-200 mb-3 relative">
                         <div className="absolute inset-2 border border-slate-300 rounded bg-slate-50 flex flex-col">
                            <div className="h-1/3 bg-slate-200 border-b border-slate-300 w-full"></div>
                            <div className="flex-1 w-full bg-blue-100/50"></div>
                         </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-slate-800">3. 存储 (Flash)</h4>
                        <p className="text-xs text-slate-500">电荷存储 (Floating Gate)</p>
                    </div>
                </div>

             </div>
        </div>
      </section>

      {/* Methods Comparison */}
      <section id="methods" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2">
            <Layers className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">三种主要烧录方式</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            
            {/* ICP Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-300 transition-colors">
                <div className="bg-blue-50/50 p-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        ICP (In-Circuit)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">在电路编程 - 硬件调试器</p>
                </div>
                <div className="p-5 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        使用专用的硬件调试器（如 J-Link, ST-Link）直接控制 MCU 的调试接口，强制接管 CPU 总线来写入 Flash。
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-slate-500">接口:</span>
                            <span className="font-mono font-bold text-slate-700">SWD / JTAG</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">特点:</span>
                            <span className="font-bold text-slate-700">速度快，可单步调试</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">场景:</span>
                            <span className="font-bold text-slate-700">研发调试，产线烧录</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ISP Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-emerald-300 transition-colors">
                <div className="bg-emerald-50/50 p-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        ISP (In-System)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">在系统编程 - Bootloader</p>
                </div>
                <div className="p-5 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        MCU 出厂时内部固化了一段引导代码 (System Memory)。通过特定引脚电平（如 BOOT0=1）让 MCU 从这里启动，通过串口/USB 接收数据并写入 Flash。
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-slate-500">接口:</span>
                            <span className="font-mono font-bold text-slate-700">UART / USB / SPI</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">特点:</span>
                            <span className="font-bold text-slate-700">无需昂贵仿真器</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">场景:</span>
                            <span className="font-bold text-slate-700">生产线，简单更新</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* IAP Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-purple-300 transition-colors">
                <div className="bg-purple-50/50 p-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        IAP (In-Application)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">在应用编程 - OTA</p>
                </div>
                <div className="p-5 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        用户自己编写一段 Bootloader 程序放在 Flash 头部。程序运行时可以接收新固件（如通过 4G/WiFi），并自我更新应用区代码。
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-slate-500">接口:</span>
                            <span className="font-mono font-bold text-slate-700">Wireless / CAN / Any</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">特点:</span>
                            <span className="font-bold text-slate-700">灵活，远程升级 (OTA)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">场景:</span>
                            <span className="font-bold text-slate-700">已发布产品维护</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Memory Map Section */}
      <section id="memory" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Lock className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">内存映射：代码存在哪？</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
                <div className="space-y-4">
                    <InfoCard title="Bootloader 区" colorClass="bg-slate-50 border-slate-200">
                        <p className="text-sm">
                            通常位于 Flash 的起始地址 (例如 0x0800 0000)。
                            如果是 ISP 模式，这是厂家固化的 ROM；如果是 IAP 模式，这是开发者写的引导程序。
                            它的作用是：<strong>检查是否有新固件 ? 更新固件 : 跳转到 APP</strong>。
                        </p>
                    </InfoCard>
                    <InfoCard title="APP (用户程序) 区" colorClass="bg-blue-50/50 border-blue-100">
                        <p className="text-sm">
                            这是我们编写的 `main()` 函数逻辑实际存放的地方。
                            在 IAP 模式下，往往需要修改中断向量表偏移 (VTOR)，因为程序不是从 0 地址开始的。
                        </p>
                    </InfoCard>
                </div>
            </div>

            {/* Visual Memory Map */}
            <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 border-2 border-slate-800 rounded-lg overflow-hidden bg-white shadow-xl relative">
                    {/* Header */}
                    <div className="bg-slate-800 text-white text-center py-2 text-sm font-mono border-b border-slate-800">
                        0x080X FFFF (End)
                    </div>
                    
                    {/* App Area */}
                    <div className="h-48 bg-blue-100 flex flex-col items-center justify-center relative group cursor-default">
                        <span className="font-bold text-blue-800">Application Code</span>
                        <span className="text-xs text-blue-600">(User Firmware)</span>
                        
                        {/* Hover hint */}
                        <div className="absolute inset-0 bg-blue-200/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center text-xs text-blue-900">
                            IAP 模式下，新固件会覆盖这里，保留 Bootloader 不变。
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-4 bg-stripes-slate border-y border-slate-300 flex items-center justify-center">
                         <span className="text-[10px] bg-white px-1 font-mono text-slate-500">Offset</span>
                    </div>

                    {/* Bootloader Area */}
                    <div className="h-24 bg-amber-100 flex flex-col items-center justify-center relative">
                         <span className="font-bold text-amber-800">Bootloader</span>
                         <span className="text-xs text-amber-600">(System / Custom)</span>
                         <div className="absolute left-2 bottom-2 text-[10px] font-mono text-amber-900">PC -> 0x0800 0000</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SWD vs JTAG */}
      <section id="interface" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Cable className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">常见调试接口对比</h3>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                        <th className="p-4">特性</th>
                        <th className="p-4">SWD (Serial Wire Debug)</th>
                        <th className="p-4">JTAG (Joint Test Action Group)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr>
                        <td className="p-4 font-bold text-slate-600">引脚数量</td>
                        <td className="p-4 text-emerald-600 font-bold">2线 (SWCLK, SWDIO) + GND</td>
                        <td className="p-4 text-slate-600">4-5线 (TCK, TMS, TDI, TDO, nTRST)</td>
                    </tr>
                     <tr>
                        <td className="p-4 font-bold text-slate-600">主要厂商</td>
                        <td className="p-4">ARM (Cortex-M 系列标配)</td>
                        <td className="p-4">通用标准 (ARM, FPGA, DSP)</td>
                    </tr>
                     <tr>
                        <td className="p-4 font-bold text-slate-600">优势</td>
                        <td className="p-4">极省引脚，性能与 JTAG 相当</td>
                        <td className="p-4">支持边界扫描 (测试芯片引脚焊接)</td>
                    </tr>
                    <tr>
                        <td className="p-4 font-bold text-slate-600">接线图</td>
                        <td className="p-4">
                            <div className="flex items-center gap-2 font-mono text-xs">
                                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">CLK</span>
                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded">DIO</span>
                            </div>
                        </td>
                        <td className="p-4">
                            <div className="flex flex-wrap gap-1 font-mono text-xs">
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">TCK</span>
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">TMS</span>
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">TDI</span>
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">TDO</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
             </table>
        </div>
      </section>

    </div>
  );
};

export const flashingNavItems = [
    { id: 'intro', label: '烧录定义' },
    { id: 'process', label: '烧录流程' },
    { id: 'methods', label: '三种方式 (ICP/ISP/IAP)' },
    { id: 'memory', label: '内存映射' },
    { id: 'interface', label: 'SWD vs JTAG' },
];