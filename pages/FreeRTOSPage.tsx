import React from 'react';
import { InfoCard } from '../components/InfoCard';
import { Layers, Activity, Lock, Clock, Box, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const FreeRTOSPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          FreeRTOS 实时操作系统
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          <strong>FreeRTOS</strong> 是目前市场占有率最高的嵌入式实时操作系统内核。
          它通过<strong>任务调度器 (Scheduler)</strong> 让单核 MCU 看起来像在同时做多件事（并发），并提供了任务间通信和同步的机制。
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">抢占式调度</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">微内核</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">MIT 开源</span>
        </div>
      </section>

      {/* Task Management & State Machine */}
      <section id="tasks" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Layers className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">任务管理与状态机</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                    在 FreeRTOS 中，每个功能模块通常被设计为一个<strong>任务 (Task)</strong>。任务本质上是一个死循环函数。
                </p>
                <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Activity size={18} className="text-blue-500"/>
                        上下文切换 (Context Switch)
                    </h4>
                    <p className="text-sm text-slate-600">
                        当高优先级任务就绪，或时间片用完时，调度器会保存当前任务的现场（寄存器），恢复下一个任务的现场。这个过程极快，让用户感觉所有任务在“同时”运行。
                    </p>
                </div>
            </div>

            {/* SVG State Machine Diagram */}
            <div className="order-1 lg:order-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full h-auto max-w-md">
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                        </marker>
                    </defs>

                    {/* States */}
                    {/* Running */}
                    <g transform="translate(200, 20)">
                        <rect x="0" y="0" width="100" height="50" rx="25" fill="#3b82f6" />
                        <text x="50" y="30" textAnchor="middle" fill="white" className="font-bold text-sm">运行 (Running)</text>
                    </g>

                    {/* Ready */}
                    <g transform="translate(20, 140)">
                        <rect x="0" y="0" width="100" height="50" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                        <text x="50" y="30" textAnchor="middle" fill="#475569" className="font-bold text-sm">就绪 (Ready)</text>
                    </g>

                    {/* Blocked */}
                    <g transform="translate(200, 250)">
                        <rect x="0" y="0" width="100" height="50" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                        <text x="50" y="30" textAnchor="middle" fill="#b45309" className="font-bold text-sm">阻塞 (Blocked)</text>
                    </g>

                    {/* Suspended */}
                    <g transform="translate(380, 140)">
                        <rect x="0" y="0" width="100" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                        <text x="50" y="30" textAnchor="middle" fill="#64748b" className="font-bold text-sm text-[11px]">挂起 (Suspended)</text>
                    </g>


                    {/* Transitions */}
                    {/* Ready -> Running */}
                    <path d="M 80 140 Q 120 100 190 60" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="90" y="100" className="text-[10px] fill-slate-500">调度器选中</text>

                    {/* Running -> Ready */}
                    <path d="M 210 70 Q 150 110 110 140" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="180" y="120" className="text-[10px] fill-slate-500">被抢占/时间片到</text>

                    {/* Running -> Blocked */}
                    <path d="M 240 70 L 240 240" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow)" />
                    <text x="245" y="160" className="text-[10px] fill-amber-600 font-bold">等待事件/延时</text>

                    {/* Blocked -> Ready */}
                    <path d="M 210 260 Q 100 260 70 190" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="100" y="240" className="text-[10px] fill-slate-500">事件发生/超时</text>

                    {/* Transitions to Suspended */}
                     <path d="M 430 140 Q 430 45 300 45" fill="none" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" />
                     <text x="360" y="30" className="text-[10px] fill-slate-400">vTaskSuspend()</text>

                     <path d="M 380 165 L 130 165" fill="none" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" />
                     <text x="250" y="180" className="text-[10px] fill-slate-400">vTaskResume()</text>
                </svg>
            </div>
        </div>
      </section>

      {/* IPC Mechanisms */}
      <section id="ipc" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2">
            <RefreshCw className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">通信与同步 (IPC)</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
             {/* Queue */}
             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-emerald-300 transition-colors">
                <div className="bg-emerald-50/50 p-4 border-b border-slate-100 flex items-center gap-2">
                    <Box size={20} className="text-emerald-600"/>
                    <h4 className="font-bold text-slate-800">队列 (Queue)</h4>
                </div>
                <div className="p-5">
                    <p className="text-sm text-slate-600 mb-4">
                        任务间传递数据的<strong>主要方式</strong>。数据是“值拷贝”入队的。
                    </p>
                    <div className="bg-slate-50 p-3 rounded text-xs space-y-2">
                         <div className="flex justify-between">
                            <span className="text-slate-500">用途:</span>
                            <span className="font-bold text-slate-700">传递数据 (串口数据等)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">特性:</span>
                            <span className="font-bold text-slate-700">FIFO (先进先出)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">阻塞:</span>
                            <span className="font-bold text-slate-700">读空/写满时可阻塞</span>
                        </div>
                    </div>
                </div>
             </div>

             {/* Semaphore */}
             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-blue-300 transition-colors">
                <div className="bg-blue-50/50 p-4 border-b border-slate-100 flex items-center gap-2">
                    <Zap size={20} className="text-blue-600"/>
                    <h4 className="font-bold text-slate-800">信号量 (Semaphore)</h4>
                </div>
                <div className="p-5">
                    <p className="text-sm text-slate-600 mb-4">
                        用于任务同步或中断通知。不传递具体数据，只传递“事件发生了”。
                    </p>
                    <div className="bg-slate-50 p-3 rounded text-xs space-y-2">
                         <div className="flex justify-between">
                            <span className="text-slate-500">二值信号量:</span>
                            <span className="font-bold text-slate-700">类似 Flag，同步</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">计数信号量:</span>
                            <span className="font-bold text-slate-700">资源计数 (如停车位)</span>
                        </div>
                    </div>
                </div>
             </div>

             {/* Mutex */}
             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-red-300 transition-colors">
                <div className="bg-red-50/50 p-4 border-b border-slate-100 flex items-center gap-2">
                    <Lock size={20} className="text-red-600"/>
                    <h4 className="font-bold text-slate-800">互斥量 (Mutex)</h4>
                </div>
                <div className="p-5">
                    <p className="text-sm text-slate-600 mb-4">
                        一种特殊的二值信号量，用于<strong>保护共享资源</strong> (如同一个 I2C 总线)。
                    </p>
                    <div className="bg-slate-50 p-3 rounded text-xs space-y-2">
                         <div className="flex justify-between">
                            <span className="text-slate-500">特性:</span>
                            <span className="font-bold text-slate-700">优先级继承</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">解决:</span>
                            <span className="font-bold text-slate-700">优先级翻转问题</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">原则:</span>
                            <span className="font-bold text-slate-700">谁上锁，谁解锁</span>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* Scheduler */}
      <section id="scheduler" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
            <Clock className="text-slate-700" size={24}/>
            <h3 className="text-2xl font-bold text-slate-900">调度策略</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h4 className="font-bold text-slate-800 mb-4">抢占式调度 (Preemptive Scheduling)</h4>
             <div className="flex flex-col gap-4">
                 <div className="flex items-start gap-4">
                     <div className="min-w-[4px] h-full bg-slate-200 rounded relative">
                         <div className="absolute top-0 w-full h-8 bg-blue-500 rounded"></div>
                         <div className="absolute top-12 w-full h-16 bg-emerald-500 rounded"></div>
                     </div>
                     <div>
                         <p className="text-sm text-slate-600">
                             <strong>高优先级抢占：</strong> 如果一个高优先级的任务就绪（例如中断触发释放了信号量），调度器会立即暂停当前运行的低优先级任务，转而运行高优先级任务。
                             <br/><br/>
                             这保证了系统对紧急事件的<strong>实时响应能力</strong>。
                         </p>
                     </div>
                 </div>
                 <div className="border-t border-slate-100 pt-4">
                     <h5 className="font-bold text-slate-800 text-sm mb-2">时间片轮转 (Time Slicing)</h5>
                     <p className="text-xs text-slate-500">
                         当多个任务处于<strong>相同优先级</strong>时，调度器会给每个任务分配固定的时间片（Tick），轮流执行，雨露均沾。
                     </p>
                 </div>
             </div>
        </div>
      </section>

    </div>
  );
};

export const freeRtosNavItems = [
    { id: 'intro', label: 'FreeRTOS 简介' },
    { id: 'tasks', label: '任务状态机' },
    { id: 'ipc', label: '通信与同步 (IPC)' },
    { id: 'scheduler', label: '调度策略' },
];