import React from 'react';
import { Layers, Box, Cpu, Code, Settings, Database, Play, Power, MemoryStick, GitBranch } from 'lucide-react';

const CodeBlock = ({ title, code }: { title: string, code: string }) => (
  <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-sm my-4 group">
    <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-700 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
        <span className="ml-2 font-bold text-slate-300">{title}</span>
    </div>
    <pre className="p-4 text-blue-50 font-mono text-sm overflow-x-auto leading-relaxed whitespace-pre">
        {code}
    </pre>
  </div>
);

export const RTThreadPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <Layers size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                RT-Thread 核心基础
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          <strong>RT-Thread</strong> 是一款来自中国的开源实时操作系统。
          不同于 FreeRTOS 仅仅是一个内核，RT-Thread 定位为<strong>“物联网操作系统”</strong>，拥有完善的中间件、设备驱动框架和丰富的软件包生态。
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">类 Linux 风格</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">面向对象设计</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">极简启动</span>
        </div>
      </section>

      {/* Startup & Auto-Init */}
      <section id="startup" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Power className="text-rose-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">启动流程与自动初始化</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                    在 RT-Thread 中，<code>main()</code> 函数并不是程序的入口，而只是一个普通的线程！
                    RT-Thread 利用编译器段特性（Section）实现了独特的<strong>自动初始化机制</strong>，让用户无需手动调用初始化函数。
                </p>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4 text-sm">RT-Thread 启动时间轴</h4>
                    <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                        <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-400 border-2 border-white"></span>
                            <h5 className="text-xs font-bold text-slate-500">Reset_Handler (汇编)</h5>
                            <p className="text-[10px] text-slate-400">系统复位，设置栈指针</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></span>
                            <h5 className="text-sm font-bold text-blue-600">rtthread_startup()</h5>
                            <p className="text-xs text-slate-500">内核入口，关闭中断</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></span>
                            <h5 className="text-sm font-bold text-amber-600">rt_components_board_init()</h5>
                            <p className="text-xs text-slate-500">执行 INIT_BOARD_EXPORT 宏修饰的函数</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                            <h5 className="text-sm font-bold text-emerald-600">rt_components_init()</h5>
                            <p className="text-xs text-slate-500">执行 INIT_APP_EXPORT 等宏修饰的函数</p>
                        </div>
                         <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-800 border-2 border-white"></span>
                            <h5 className="text-sm font-bold text-slate-800">main() 线程启动</h5>
                            <p className="text-xs text-slate-500">进入用户主逻辑</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                 <CodeBlock title="魔法宏：自动初始化" code={`
// 在任意 .c 文件中，只要加上这个宏
// 系统启动时就会自动调用 my_driver_init
// 无需在 main 函数里写 my_driver_init();

int my_driver_init(void) {
    rt_kprintf("Driver Init Success!\\n");
    return 0;
}
INIT_APP_EXPORT(my_driver_init);

// 宏的原理：
// 将函数指针放入特定的数据段 (.rti_fn.4)
// 启动时遍历该段并依次执行
`} />
                 <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-xs text-amber-800 mt-4">
                     <strong>提示：</strong> 有了它，组件之间可以高度解耦。添加一个 Wi-Fi 模块只需添加相应文件，无需修改 main.c。
                 </div>
            </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="arch" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Box className="text-blue-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">内核架构：C 语言的面向对象</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                    RT-Thread 采用 C 语言实现了面向对象的设计模式。系统中的线程、信号量、互斥量、设备等，统统被称为<strong>“内核对象” (rt_object)</strong>。
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 text-sm mb-3">内核对象容器</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                            <Database size={16} className="text-slate-400"/>
                            <span className="text-xs font-mono font-bold text-slate-600">rt_thread</span>
                            <span className="text-[10px] text-slate-400 ml-auto">链表管理</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                            <Database size={16} className="text-slate-400"/>
                            <span className="text-xs font-mono font-bold text-slate-600">rt_semaphore</span>
                            <span className="text-[10px] text-slate-400 ml-auto">链表管理</span>
                        </div>
                         <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                            <Database size={16} className="text-slate-400"/>
                            <span className="text-xs font-mono font-bold text-slate-600">rt_device</span>
                            <span className="text-[10px] text-slate-400 ml-auto">链表管理</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-6 text-white border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Settings size={120}/></div>
                <h4 className="font-bold mb-4 border-b border-slate-700 pb-2">rt_object 继承结构</h4>
                <div className="font-mono text-sm space-y-2">
                    <div className="pl-0 text-emerald-400">struct rt_object (基类)</div>
                    <div className="pl-4 text-slate-400">├── name (名字)</div>
                    <div className="pl-4 text-slate-400">├── type (类型)</div>
                    <div className="pl-4 text-slate-400">└── list (链表节点)</div>
                    
                    <div className="pl-4 pt-2 text-blue-400">├── struct rt_thread (线程)</div>
                    <div className="pl-8 text-slate-500">├── stack_addr</div>
                    <div className="pl-8 text-slate-500">└── sp</div>
                    
                    <div className="pl-4 pt-2 text-amber-400">├── struct rt_ipc_object (IPC)</div>
                    <div className="pl-8 text-slate-500">├── rt_sem</div>
                    <div className="pl-8 text-slate-500">└── rt_mutex</div>
                </div>
            </div>
        </div>
      </section>

      {/* Thread Management */}
      <section id="threads" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Cpu className="text-emerald-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">线程管理：静态 vs 动态</h3>
        </div>

        <p className="text-slate-600">
            RT-Thread 提供了非常灵活的线程创建方式。你可以选择系统自动分配内存（动态），也可以完全手动管理内存（静态），这对于资源极度受限的 MCU 非常友好。
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mt-4">
            
            {/* Dynamic Thread */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-emerald-300 transition-colors">
                <div className="bg-emerald-50/50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <h4 className="font-bold text-slate-800">动态线程</h4>
                    <span className="text-xs font-mono bg-white px-2 py-1 rounded text-emerald-600 font-bold">rt_thread_create</span>
                </div>
                <div className="p-5">
                    <p className="text-xs text-slate-500 mb-3">
                        简单易用。栈空间和线程句柄由系统从堆 (Heap) 中自动申请，删除时自动释放。
                    </p>
                    <CodeBlock title="动态创建" code={`
rt_thread_t tid;

tid = rt_thread_create(
    "dynamic",   // 名字
    thread_entry,// 入口函数
    RT_NULL,     // 参数
    1024,        // 栈大小 (Bytes)
    25,          // 优先级 (0-31)
    10           // 时间片 (Ticks)
);

if (tid != RT_NULL)
    rt_thread_startup(tid);
`} />
                </div>
            </div>

            {/* Static Thread */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-blue-300 transition-colors">
                <div className="bg-blue-50/50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <h4 className="font-bold text-slate-800">静态线程</h4>
                    <span className="text-xs font-mono bg-white px-2 py-1 rounded text-blue-600 font-bold">rt_thread_init</span>
                </div>
                <div className="p-5">
                    <p className="text-xs text-slate-500 mb-3">
                        极致控制。栈空间和线程结构体由用户定义（通常是全局数组），不占用堆内存，无内存碎片。
                    </p>
                    <CodeBlock title="静态初始化" code={`
// 1. 定义结构体和栈
struct rt_thread static_thread;
rt_uint8_t static_stack[1024];

// 2. 初始化
rt_thread_init(
    &static_thread, // 句柄指针
    "static",       // 名字
    thread_entry,   // 入口函数
    RT_NULL,        // 参数
    &static_stack[0], // 栈起始
    sizeof(static_stack), // 栈大小
    25, 10          // 优先级, 时间片
);

rt_thread_startup(&static_thread);
`} />
                </div>
            </div>

        </div>
      </section>

      {/* Memory Management */}
      <section id="memory" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <MemoryStick className="text-purple-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">内存管理算法</h3>
        </div>
        
        <p className="text-slate-600">RT-Thread 针对不同资源大小的 MCU 提供了不同的堆内存管理算法，这是相比 FreeRTOS 更灵活的地方。</p>

        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">Small Memory</h4>
                <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded font-bold">资源受限</span>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    针对 RAM 小于 2MB 的系统。算法简单，开销极小。将内存视为一个长链表，分配时寻找合适的空闲块。
                </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">SLAB 算法</h4>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">高性能</span>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    针对 RAM 充裕的系统。采用类似 Linux 的页分配机制，将内存分为多个固定大小的块。<strong>分配和释放时间是固定的 (O(1))</strong>，极大地减少了碎片。
                </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">Memheap</h4>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">多内存堆</span>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    允许将多个不连续的物理地址（如内部 SRAM + 外部 SDRAM）“粘贴”在一起，当做一个大的连续堆来使用。
                </p>
            </div>
        </div>
      </section>

      {/* Scheduler Logic */}
      <section id="scheduler" className="scroll-mt-24 space-y-6">
         <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Settings className="text-slate-700" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">调度与时间片</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                    <h4 className="font-bold text-slate-800">双重调度策略</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex gap-2">
                            <span className="font-bold text-emerald-600">1. 基于优先级:</span>
                            <span>高优先级任务（数字越小越高，0最高）永远抢占低优先级。</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-blue-600">2. 时间片轮转:</span>
                            <span>同优先级任务，按照创建时指定的 <code>tick</code> 参数轮流执行。</span>
                        </li>
                    </ul>
                </div>
                
                <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">时间片工作原理 (Tick)</h5>
                    <div className="flex items-center gap-1 mb-2">
                         <div className="h-8 flex-1 bg-blue-500 rounded flex items-center justify-center text-xs text-white font-bold">Task A (10)</div>
                         <div className="h-8 flex-1 bg-emerald-500 rounded flex items-center justify-center text-xs text-white font-bold">Task B (5)</div>
                         <div className="h-8 flex-1 bg-blue-500 rounded flex items-center justify-center text-xs text-white font-bold">Task A (10)</div>
                    </div>
                    <p className="text-[10px] text-slate-500">
                        Task A 运行 10 个 Tick 后，强制切换到 Task B；Task B 运行 5 个 Tick 后，切回 Task A。
                        这防止了同优先级下某个任务独占 CPU。
                    </p>
                </div>
            </div>
        </div>

      </section>

    </div>
  );
};

export const rtThreadNavItems = [
    { id: 'intro', label: '基础概览' },
    { id: 'startup', label: '启动与初始化' },
    { id: 'arch', label: '内核架构 (OO)' },
    { id: 'threads', label: '线程管理' },
    { id: 'memory', label: '内存算法' },
    { id: 'scheduler', label: '调度策略' },
];