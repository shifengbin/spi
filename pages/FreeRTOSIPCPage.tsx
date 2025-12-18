import React from 'react';
import { Box, ArrowRight, Lock, Zap, Bell, Layers, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

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

export const FreeRTOSIPCPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Layers size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                FreeRTOS IPC 详解
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          <strong>进程间通信 (IPC)</strong> 是 RTOS 的灵魂。在 FreeRTOS 中，IPC 不仅用于数据传输，还用于任务同步和资源管理。
          本页将深入探讨其核心机制、API 使用方法及“坑”点。
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                <span className="block text-2xl font-bold text-emerald-600 mb-1">Queue</span>
                <span className="text-xs text-slate-500 font-medium">数据传递 (值拷贝)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                <span className="block text-2xl font-bold text-blue-600 mb-1">Semaphore</span>
                <span className="text-xs text-slate-500 font-medium">信号同步</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                <span className="block text-2xl font-bold text-red-600 mb-1">Mutex</span>
                <span className="text-xs text-slate-500 font-medium">资源锁 (优先级继承)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                <span className="block text-2xl font-bold text-amber-600 mb-1">Notify</span>
                <span className="text-xs text-slate-500 font-medium">轻量级通知</span>
            </div>
        </div>
      </section>

      {/* Queue Section */}
      <section id="queue" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Box className="text-emerald-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">1. 队列 (Queue)</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                    队列是 FreeRTOS 通信的基石。不同于某些 RTOS 传递指针，FreeRTOS 队列默认采用<strong>“值拷贝” (Copy by Value)</strong>。
                    这意味着当你把变量发送到队列时，系统会把它的内容完整复制一份存入队列缓冲区。
                </p>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                    <h4 className="font-bold text-emerald-800 text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 size={16}/> 为什么使用值拷贝？
                    </h4>
                    <ul className="text-xs text-emerald-700 space-y-2 list-disc list-inside">
                        <li><strong>安全性：</strong> 发送完数据后，源变量可以被随意修改或销毁（如局部变量），不会影响队列中的数据。</li>
                        <li><strong>简单性：</strong> 不用担心多个任务同时访问同一块内存区域。</li>
                    </ul>
                </div>
                 <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h4 className="font-bold text-amber-800 text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle size={16}/> 性能提示
                    </h4>
                    <p className="text-xs text-amber-700">
                        如果要传输大数据结构（如 1KB 的 buffer），直接拷贝太慢且浪费 RAM。
                        此时应<strong>发送指向数据的指针</strong>，而不是数据本身。
                    </p>
                </div>
            </div>

            <div>
                <CodeBlock title="Queue 示例 (传递结构体)" code={`
typedef struct {
    uint8_t cmd_id;
    uint8_t value;
} Command_t;

// 1. 创建队列: 深度10, 每个单元大小为 sizeof(Command_t)
QueueHandle_t xQueue = xQueueCreate(10, sizeof(Command_t));

// Task A: 发送数据
void vSenderTask(void *pvParameters) {
    Command_t txCmd = {0x01, 100};
    while(1) {
        // 如果队列满，等待 10 ticks
        if(xQueueSend(xQueue, &txCmd, 10) == pdTRUE) {
             // 发送成功
        }
        vTaskDelay(100);
    }
}

// Task B: 接收数据
void vReceiverTask(void *pvParameters) {
    Command_t rxCmd;
    while(1) {
        // 如果队列空，一直阻塞等待 (portMAX_DELAY)
        if(xQueueReceive(xQueue, &rxCmd, portMAX_DELAY)) {
            ProcessCommand(rxCmd);
        }
    }
}
`} />
            </div>
        </div>
      </section>

      {/* Semaphore Section */}
      <section id="semaphore" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Zap className="text-blue-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">2. 信号量 (Semaphore)</h3>
        </div>

        <p className="text-slate-600 max-w-3xl">
            信号量主要用于<strong>同步</strong>（任务A做完某事，通知任务B）或<strong>资源计数</strong>。底层实现其实就是一个特殊的队列（不传数据，只传状态）。
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-3 text-lg">二值信号量 (Binary)</h4>
                <div className="h-20 bg-slate-100 rounded mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center shadow-lg font-bold text-blue-600">1</div>
                    <span className="absolute bottom-1 text-[10px] text-slate-400">最大值 = 1</span>
                </div>
                <p className="text-sm text-slate-600 mb-4 h-20">
                    就像只有一把钥匙。用于“事件通知”。<br/>
                    例如：按键中断触发 -> Give 信号量 -> 任务 Take 信号量并处理按键逻辑。
                </p>
                <CodeBlock title="ISR 同步示例" code={`
// 中断服务函数
void EXTI_Handler(void) {
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;
    // 发送信号量 (FromISR 版本)
    xSemaphoreGiveFromISR(xSem, &xHigherPriorityTaskWoken);
    // 强制上下文切换
    portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}

// 处理任务
void vHandlerTask(void *params) {
    while(1) {
        // 阻塞等待信号量
        if(xSemaphoreTake(xSem, portMAX_DELAY)) {
            printf("Button Pressed!\\n");
        }
    }
}
`} />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-3 text-lg">计数信号量 (Counting)</h4>
                <div className="h-20 bg-slate-100 rounded mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-lg font-bold text-emerald-600">3</div>
                    <span className="absolute bottom-1 text-[10px] text-slate-400">最大值 = N</span>
                </div>
                <p className="text-sm text-slate-600 mb-4 h-20">
                    就像停车场有多个车位。用于“资源管理”。<br/>
                    例如：限制同时访问网络连接的任务数量不超过 3 个。
                </p>
                <CodeBlock title="资源管理示例" code={`
// 创建最大计数为3，初始值为3的信号量
xSem = xSemaphoreCreateCounting(3, 3);

void vNetworkTask(void *params) {
    // 占用一个连接槽位
    xSemaphoreTake(xSem, portMAX_DELAY);
    
    // ... 执行网络请求 ...
    ConnectToServer();
    
    // 释放槽位
    xSemaphoreGive(xSem);
}
`} />
            </div>
        </div>
      </section>

      {/* Mutex Section */}
      <section id="mutex" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Lock className="text-red-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">3. 互斥量 (Mutex)</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
                 <p className="text-slate-600 text-sm leading-relaxed">
                    互斥量是一种特殊的二值信号量，专用于<strong>互斥访问</strong>（保护共享资源，如 I2C 总线）。
                    <br/><br/>
                    <span className="font-bold text-slate-800">关键区别：</span> 互斥量具有<span className="text-red-600 font-bold">优先级继承 (Priority Inheritance)</span> 机制，而二值信号量没有。
                </p>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">什么是优先级继承？</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">
                        假设高优先级任务 H 需要锁，但锁被低优先级任务 L 占用。
                        如果没有继承，H 只能干等，而中等优先级任务 M 可能抢占 L 运行，导致 L 迟迟无法释放锁，H 也就被无限期阻塞。这叫<strong>优先级翻转</strong>。
                    </p>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed bg-white p-2 rounded border border-slate-100">
                        继承机制：当 H 等待 L 持有的锁时，RTOS 会临时把 L 的优先级提升到和 H 一样高，让 L 尽快跑完释放锁，防止被 M 插队。
                    </p>
                </div>
            </div>

            <div className="flex-1">
                 <CodeBlock title="互斥锁保护 I2C" code={`
SemaphoreHandle_t xI2CMutex;

void I2C_WriteData(uint8_t addr, uint8_t data) {
    // 获取锁 (Wait forever)
    xSemaphoreTake(xI2CMutex, portMAX_DELAY);
    
    // --- 临界区开始 ---
    // 此时其他任务无法使用 I2C
    HAL_I2C_Master_Transmit(&hi2c1, addr, &data, 1, 100);
    // --- 临界区结束 ---
    
    // 释放锁 (必须由持有者释放!)
    xSemaphoreGive(xI2CMutex);
}
`} />
            </div>
        </div>
      </section>

      {/* Task Notification Section */}
      <section id="notification" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Bell className="text-amber-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">4. 任务通知 (Task Notification)</h3>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-4">
                    <h4 className="text-lg font-bold text-slate-800">更轻、更快、更省</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        FreeRTOS v8.2 引入的杀手级特性。每个任务控制块 (TCB) 中内置了一个 32 位的“通知值”。
                        它可以直接向指定任务发送事件，而<strong>不需要创建任何中间对象</strong>（如队列或信号量）。
                    </p>
                    <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-amber-800">
                        <li className="flex items-center gap-2 bg-white/60 p-2 rounded"><CheckCircle2 size={14} className="text-green-600"/> 速度快 45%</li>
                        <li className="flex items-center gap-2 bg-white/60 p-2 rounded"><CheckCircle2 size={14} className="text-green-600"/> RAM 消耗更少</li>
                    </ul>
                </div>
                <div className="w-full md:w-auto md:min-w-[400px]">
                     <CodeBlock title="轻量级同步" code={`
// Task A (发送方)
void vSenderTask(void *params) {
    // 直接通知 Task B，将其通知值 +1
    xTaskNotifyGive(xTaskB_Handle);
}

// Task B (接收方)
void vHandlerTask(void *params) {
    while(1) {
        // 等待通知值 > 0，收到后自动减 1
        // 类似二值/计数信号量，但无需创建信号量对象
        ulTaskNotifyTake(pdTRUE, portMAX_DELAY);
        
        ProcessEvent();
    }
}
`} />
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export const freeRtosIpcNavItems = [
    { id: 'intro', label: 'IPC 概览' },
    { id: 'queue', label: '1. 队列 (Queue)' },
    { id: 'semaphore', label: '2. 信号量 (Semaphore)' },
    { id: 'mutex', label: '3. 互斥量 (Mutex)' },
    { id: 'notification', label: '4. 任务通知' },
];