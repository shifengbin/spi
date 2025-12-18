import React from 'react';
import { Timer, Binary, Zap, AlertTriangle, CheckCircle2, Flag, Cpu } from 'lucide-react';

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

export const FreeRTOSAdvancedPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-rose-600 rounded-lg text-white">
                <Cpu size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                FreeRTOS 进阶特性
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          掌握了任务和 IPC 只是第一步。
          在复杂的嵌入式系统中，我们还需要处理<strong>定时任务</strong>、<strong>多事件同步</strong>以及棘手的<strong>中断上下文</strong>交互。
        </p>
      </section>

      {/* Software Timers */}
      <section id="timers" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Timer className="text-blue-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">软件定时器 (Software Timers)</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                    硬件定时器资源有限，FreeRTOS 允许你创建无限数量的“软件定时器”。
                    它们基于系统 Tick 计数，当时间到达时，会自动调用你指定的回调函数。
                </p>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2">
                        <Zap size={16}/> Daemon 任务 (Tmr Svc)
                    </h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        这就是软件定时器的核心原理：所有的定时器回调函数并不是在中断里执行，而是在一个专门的系统任务 <strong>"Tmr Svc"</strong> (Timer Service Task) 的上下文中执行的。
                    </p>
                </div>

                 <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h4 className="font-bold text-amber-800 text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle size={16}/> 黄金法则
                    </h4>
                    <p className="text-xs text-amber-700">
                        绝对不要在定时器回调函数中调用任何会<strong>阻塞 (Block)</strong> 的 API（如 `vTaskDelay` 或等待信号量）。
                        <br/>
                        因为一旦 Daemon 任务被阻塞，所有其他的软件定时器都会“卡死”不再触发！
                    </p>
                </div>
            </div>

            <div>
                <CodeBlock title="创建定时器" code={`
// 回调函数
void vTimerCallback(TimerHandle_t xTimer) {
    // 这里的代码由 Daemon 任务执行
    // 快进快出，不要阻塞！
    LED_Toggle();
}

void StartApp() {
    // 创建一个自动重装载 (Auto-reload) 的定时器
    // 周期: 500ms
    TimerHandle_t xLedTimer = xTimerCreate(
        "LedTimer",         // 名字
        pdMS_TO_TICKS(500), // 周期
        pdTRUE,             // pdTRUE=周期性, pdFALSE=单次
        (void *)0,          // Timer ID
        vTimerCallback      // 回调函数
    );

    if (xLedTimer != NULL) {
        xTimerStart(xLedTimer, 0);
    }
}
`} />
            </div>
        </div>
      </section>

      {/* Event Groups */}
      <section id="eventgroups" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Binary className="text-emerald-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">事件组 (Event Groups)</h3>
        </div>

        <p className="text-slate-600 max-w-3xl">
            二值信号量只能表示 1 个事件。如果你需要等待“WiFi连接成功 <strong>并且</strong> MQTT连接成功”才开始发送数据，或者等待“用户按下停止按钮 <strong>或者</strong> 发生过温故障”才停机，该怎么办？
            <br/><br/>
            事件组就是一个 32 位（或 24 位）的整数，每一位 (Bit) 代表一个事件标志。
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
             <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm text-slate-300 shadow-lg border border-slate-800">
                <div className="flex justify-between border-b border-slate-700 pb-2 mb-4 text-xs text-slate-500">
                    <span>Event Group Bits (EventBits_t)</span>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold">1</div>
                        <div>
                            <span className="block text-white font-bold">Bit 0 (1 &lt;&lt; 0)</span>
                            <span className="text-xs text-slate-500">WIFI_CONNECTED_BIT</span>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 font-bold">0</div>
                        <div>
                            <span className="block text-slate-400 font-bold">Bit 1 (1 &lt;&lt; 1)</span>
                            <span className="text-xs text-slate-500">MQTT_CONNECTED_BIT</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 font-bold">1</div>
                        <div>
                            <span className="block text-white font-bold">Bit 2 (1 &lt;&lt; 2)</span>
                            <span className="text-xs text-slate-500">ERROR_BIT</span>
                        </div>
                    </div>
                    <div className="text-center py-2 text-slate-600 text-xs">... Bit 23 ...</div>
                </div>
             </div>

             <div>
                 <CodeBlock title="等待多个事件 (Wait Bits)" code={`
#define WIFI_BIT  (1 << 0)
#define MQTT_BIT  (1 << 1)

void vUploadTask(void *pvParameters) {
    EventBits_t uxBits;
    
    // 等待 WiFi 和 MQTT 都连接成功
    uxBits = xEventGroupWaitBits(
        xEventGroup,   // 句柄
        WIFI_BIT | MQTT_BIT, // 等待哪些位
        pdFALSE,       // 退出时是否清除这些位?
        pdTRUE,        // pdTRUE=等待所有(AND), pdFALSE=等待任一(OR)
        portMAX_DELAY  // 超时
    );
    
    if ((uxBits & (WIFI_BIT | MQTT_BIT)) == (WIFI_BIT | MQTT_BIT)) {
        printf("All Connected. Uploading...\\n");
    }
}
`} />
             </div>
        </div>
      </section>

      {/* Interrupt Management */}
      <section id="interrupts" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Zap className="text-amber-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">中断管理 (Interrupts)</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                 <p className="text-slate-600 text-sm leading-relaxed">
                    在 ISR (中断服务程序) 中调用 FreeRTOS API 需要特别小心。
                </p>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                     <h4 className="font-bold text-slate-800 text-sm">三大铁律</h4>
                     <ul className="text-xs text-slate-600 space-y-2">
                        <li className="flex gap-2">
                            <CheckCircle2 size={16} className="text-green-500 shrink-0"/>
                            <span><strong>只能使用 FromISR 结尾的 API：</strong> 例如 `xQueueSendFromISR`。绝对不能用 `xQueueSend`。</span>
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle2 size={16} className="text-green-500 shrink-0"/>
                            <span><strong>不要阻塞：</strong> ISR 必须分秒必争，API 中没有阻塞等待时间参数 (always 0)。</span>
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle2 size={16} className="text-green-500 shrink-0"/>
                            <span><strong>手动触发调度：</strong> 如果 ISR 唤醒了一个高优先级任务，需要手动调用 `portYIELD_FROM_ISR` 来请求上下文切换。</span>
                        </li>
                     </ul>
                </div>

                <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-800 text-sm mb-2 flex items-center gap-2">
                        <Flag size={16}/> 延迟中断处理 (Deferred Interrupt Processing)
                    </h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                        ISR 应该尽可能短。如果中断需要做大量计算（如解析数据包），应该在 ISR 中只做一个简单的“通知”动作（发信号量或 TaskNotify），唤醒一个高优先级的 Handler 任务去处理繁重的工作。
                    </p>
                </div>
            </div>

            <div className="flex-1">
                 <CodeBlock title="标准 ISR 写法" code={`
void UART_IRQHandler(void) {
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;
    uint8_t data = UART->DR;

    // 1. 快速处理: 放入队列
    // 注意最后那个参数 &xHigherPriorityTaskWoken
    xQueueSendFromISR(xRxQueue, &data, &xHigherPriorityTaskWoken);

    // 2. 清除中断标志
    UART_ClearITPendingBit(UART_IT_RXNE);

    // 3. 如果放入队列导致某个高优先级任务解除了阻塞，
    //    这里请求一次上下文切换，这样中断退出后直接运行那个任务
    portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}
`} />
            </div>
        </div>
      </section>

    </div>
  );
};

export const freeRtosAdvancedNavItems = [
    { id: 'intro', label: '进阶概览' },
    { id: 'timers', label: '软件定时器' },
    { id: 'eventgroups', label: '事件组' },
    { id: 'interrupts', label: '中断管理' },
];