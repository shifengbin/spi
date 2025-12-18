import React from 'react';
import { Layers, Activity, Clock, AlertTriangle, Code, Cpu, CheckCircle2, ListOrdered, Ruler, Zap } from 'lucide-react';

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

export const FreeRTOSTaskPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Activity size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                任务管理详解
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          任务 (Task) 是 FreeRTOS 应用程序的基本构建块。
          与裸机编程中的超级循环不同，RTOS 任务是<strong>独立的、互不干扰的死循环函数</strong>，拥有自己的堆栈空间和优先级。
        </p>
      </section>

      {/* Creation API */}
      <section id="creation" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Code className="text-blue-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">创建任务 (xTaskCreate)</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                    创建任务本质上是向内核申请一块 RAM 作为任务控制块 (TCB) 和堆栈，并将其加入就绪列表。
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-700 font-bold">
                            <tr>
                                <th className="p-3 border-b">参数</th>
                                <th className="p-3 border-b">说明</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr>
                                <td className="p-3 font-mono text-blue-600">pvTaskCode</td>
                                <td className="p-3 text-slate-600">任务函数名 (函数指针)</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-blue-600">pcName</td>
                                <td className="p-3 text-slate-600">任务名称 (字符串，用于调试)</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-blue-600">usStackDepth</td>
                                <td className="p-3 text-slate-600">堆栈深度 (单位是 <strong>Word</strong> 非 Byte!)</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-blue-600">pvParameters</td>
                                <td className="p-3 text-slate-600">传递给任务的参数指针 (可为 NULL)</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-blue-600">uxPriority</td>
                                <td className="p-3 text-slate-600">任务优先级 (数字越大越高)</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-blue-600">pxCreatedTask</td>
                                <td className="p-3 text-slate-600">任务句柄 (用于删除/挂起任务)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <CodeBlock title="动态创建任务" code={`
// 任务句柄
TaskHandle_t xLedTaskHandle = NULL;

// 任务函数
void vLedTask(void *pvParameters) {
    for(;;) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
        vTaskDelay(1000); // 阻塞延时，释放 CPU
    }
}

// 在 main() 或 StartDefaultTask 中创建
void StartRun(void) {
    BaseType_t ret = xTaskCreate(
        vLedTask,       // 函数指针
        "LED_Task",     // 名字
        128,            // 堆栈 (128 Words = 512 Bytes on 32-bit CPU)
        NULL,           // 参数
        2,              // 优先级
        &xLedTaskHandle // 句柄
    );
    
    if (ret != pdPASS) {
        printf("Task Creation Failed!\\n");
    }
}
`} />
            </div>
        </div>
      </section>

      {/* Priorities */}
      <section id="priorities" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <ListOrdered className="text-amber-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">优先级与抢占</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500"/> 数字越大，优先级越高
                 </h4>
                 <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    这点与 ARM Cortex-M 硬件中断优先级（数字越小越高）<strong>截然相反</strong>，初学者极易混淆。
                 </p>
                 <ul className="space-y-2 text-sm text-slate-600 bg-slate-50 p-3 rounded">
                     <li><strong>0 (tskIDLE_PRIORITY)</strong>: 空闲任务，最低优先级。</li>
                     <li><strong>1 ~ N</strong>: 用户任务。</li>
                     <li><strong>configMAX_PRIORITIES - 1</strong>: 最高可用优先级。</li>
                 </ul>
            </div>

            <div className="flex-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Zap size={18} className="text-amber-500"/> 抢占式调度 (Preemption)
                 </h4>
                 <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    当一个高优先级任务从“阻塞态”变为“就绪态”（例如延时结束、收到信号量），内核会<strong>立即</strong>中断当前运行的低优先级任务，切换到高优先级任务。
                 </p>
                 <div className="bg-amber-50 border border-amber-100 p-2 rounded text-xs text-amber-800">
                    <strong>注意：</strong> 如果高优先级任务是个死循环且不调用阻塞 API (如 vTaskDelay)，低优先级任务将<strong>永远无法运行</strong>（饿死）。
                 </div>
            </div>
        </div>
      </section>

      {/* Stack Management */}
      <section id="stack" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Layers className="text-purple-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">堆栈管理 (Stack)</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
             <div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    每个任务都有自己独立的堆栈，用于保存局部变量、函数调用链和中断上下文。
                    如果堆栈分配太小，会导致<strong>堆栈溢出 (Stack Overflow)</strong>，这是 RTOS 崩溃最常见的原因之一。
                </p>
                
                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-4">
                    <h5 className="font-bold text-slate-800 text-sm mb-2">如何确定堆栈大小？</h5>
                    <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                        <li><strong>简单任务：</strong> 仅做 GPIO 翻转，128 Words (512 Bytes) 通常足够。</li>
                        <li><strong>复杂任务：</strong> 调用了 `printf` (占用极大) 或使用了大数组，可能需要 512~1024 Words。</li>
                        <li><strong>推荐方法：</strong> 先给大一点，运行一段时间后，使用 `uxTaskGetStackHighWaterMark()` 查看历史剩余最小值，再进行缩减。</li>
                    </ul>
                </div>

                <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex gap-3">
                    <AlertTriangle className="text-red-500 shrink-0" size={20}/>
                    <div>
                        <h5 className="font-bold text-red-800 text-sm">溢出保护</h5>
                        <p className="text-xs text-red-700 mt-1">
                            在 `FreeRTOSConfig.h` 中定义 <code>configCHECK_FOR_STACK_OVERFLOW</code> 为 1 或 2，并实现钩子函数 <code>vApplicationStackOverflowHook</code> 来捕获溢出。
                        </p>
                    </div>
                </div>
             </div>

             <div className="bg-slate-900 rounded-lg p-6 flex flex-col items-center justify-center text-white relative h-64 border-2 border-slate-700">
                 {/* Stack Visualization */}
                 <div className="w-40 h-full border-x-2 border-slate-500 relative bg-slate-800/50">
                     <div className="absolute top-0 w-full text-center border-b border-slate-600 py-1 text-xs text-slate-400">High Address</div>
                     <div className="absolute bottom-0 w-full text-center border-t border-slate-600 py-1 text-xs text-slate-400">Low Address</div>
                     
                     {/* Used Stack */}
                     <div className="absolute bottom-0 left-0 w-full h-[60%] bg-purple-600/30 border-t border-purple-500 flex items-center justify-center transition-all duration-1000">
                        <span className="text-purple-300 text-xs font-bold">Used Stack</span>
                     </div>
                     
                     {/* Unused Stack (High Water Mark) */}
                     <div className="absolute top-8 left-0 w-full h-[30%] flex flex-col items-center justify-center">
                        <div className="text-[10px] text-slate-500 text-center">Free Space<br/>(High Water Mark)</div>
                     </div>
                     
                     {/* Stack Pointer */}
                     <div className="absolute bottom-[60%] -left-12 w-12 border-b-2 border-white text-right pr-2 text-xs font-bold">SP</div>
                 </div>
             </div>
        </div>
      </section>

      {/* Delay Functions */}
      <section id="delay" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Clock className="text-emerald-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">延时控制</h3>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                 <div className="p-6">
                     <h4 className="font-bold text-slate-800 mb-2 font-mono text-sm bg-slate-100 w-fit px-2 py-1 rounded">vTaskDelay(ticks)</h4>
                     <p className="text-sm text-slate-600 mb-3">
                         <strong>相对延时</strong>。表示“从调用这一刻开始，睡多久”。
                     </p>
                     <p className="text-xs text-slate-500 leading-relaxed">
                         如果任务本身执行需要时间，那么循环的总周期会变长且不稳定。<br/>
                         周期 = 任务执行时间 + 延时时间。
                     </p>
                 </div>
                 <div className="p-6 bg-emerald-50/30">
                     <h4 className="font-bold text-emerald-800 mb-2 font-mono text-sm bg-emerald-100 w-fit px-2 py-1 rounded">vTaskDelayUntil(&last, ticks)</h4>
                     <p className="text-sm text-slate-600 mb-3">
                         <strong>绝对延时</strong>。表示“每隔多久唤醒一次”。
                     </p>
                     <p className="text-xs text-slate-500 leading-relaxed">
                         它会自动扣除任务执行消耗的时间，保证唤醒的<strong>频率是恒定</strong>的。<br/>
                         适合周期性采样传感器。
                     </p>
                 </div>
             </div>
             
             <div className="p-6 bg-slate-900 border-t border-slate-800">
                 <CodeBlock title="固定频率采样示例 (100Hz / 10ms)" code={`
void vSensorTask(void *pvParameters) {
    TickType_t xLastWakeTime;
    const TickType_t xFrequency = 10; // 10ms

    // 初始化当前时间
    xLastWakeTime = xTaskGetTickCount();

    for(;;) {
        // 等待直到下一个周期点 (自动补偿 ReadSensor 的耗时)
        vTaskDelayUntil(&xLastWakeTime, xFrequency);

        // 执行任务逻辑
        ReadSensor(); 
        ProcessData();
    }
}
`} />
             </div>
        </div>
      </section>

    </div>
  );
};

export const freeRtosTaskNavItems = [
    { id: 'intro', label: '任务剖析' },
    { id: 'creation', label: '创建任务 (API)' },
    { id: 'priorities', label: '优先级与抢占' },
    { id: 'stack', label: '堆栈管理' },
    { id: 'delay', label: '绝对 vs 相对延时' },
];