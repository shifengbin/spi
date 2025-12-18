import React from 'react';
import { Terminal, Mail, HardDrive, Share2, Zap, MessageSquare, Package, FolderTree, Cpu } from 'lucide-react';

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

export const RTThreadIPCPage: React.FC = () => {
  return (
    <div className="space-y-16">
      
      {/* Hero */}
      <section id="intro" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-800 rounded-lg text-white">
                <Terminal size={28} />
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                生态与组件
             </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          RT-Thread 最迷人的地方不在于内核，而在于其丰富的组件。
          <strong>FinSH 控制台</strong>让调试像在 Linux Shell 中一样丝滑，而<strong>Env 工具</strong>允许你像搭积木一样添加网络、文件系统等软件包。
        </p>
      </section>

      {/* Env & Packages */}
      <section id="packages" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Package className="text-blue-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">软件包管理 (Env & Pkgs)</h3>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                    告别手动移植代码！RT-Thread 提供了类似 Linux Kernel 的 Kconfig 配置系统。
                    通过 <code>menuconfig</code> 命令，你可以图形化地开启/关闭系统组件，或者在线下载 MQTT、cJSON、Modbus 等数千个软件包。
                </p>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 text-sm mb-2">Env 工具工作流</h4>
                    <ol className="list-decimal list-inside text-xs text-blue-700 space-y-1">
                        <li>在项目目录打开 Env 控制台</li>
                        <li>输入 <code>menuconfig</code> 选择所需组件</li>
                        <li>输入 <code>pkgs --update</code> 自动下载代码</li>
                        <li>输入 <code>scons --target=mdk5</code> 生成工程</li>
                    </ol>
                </div>
            </div>

            <div className="flex-1 bg-slate-900 rounded-lg p-4 font-mono text-xs text-white shadow-xl border border-slate-800">
                <div className="mb-2 border-b border-slate-700 pb-2 text-center text-slate-400">Env Console - menuconfig</div>
                <div className="space-y-1">
                    <div className="text-blue-300">RT-Thread Configuration</div>
                    <div>  RT-Thread Kernel  ---&gt;</div>
                    <div>  RT-Thread Drivers ---&gt;</div>
                    <div>  RT-Thread online packages  ---&gt;</div>
                    <div className="pl-4">  IoT - internet of things  ---&gt;</div>
                    <div className="pl-8 text-green-400">[*] Paho MQTT: Eclipse Paho MQTT C/C++</div>
                    <div className="pl-8 text-white">[ ] WebClient: A HTTP/HTTPS Client</div>
                    <div className="pl-8 text-white">[ ] cJSON: C Json library</div>
                    <div>  security packages  ---&gt;</div>
                    <br/>
                    <div className="bg-blue-700 text-white px-1 w-fit">&lt;Select&gt;</div>
                </div>
            </div>
        </div>
      </section>

      {/* FinSH Console */}
      <section id="finsh" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Terminal className="text-slate-700" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">FinSH 控制台</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                    FinSH 是 RT-Thread 的命令行组件（Shell）。通过串口，用户可以实时输入命令、查看系统状态（如 `ps`, `free`）、甚至直接调用 C 函数。
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">常用命令</h4>
                    <ul className="text-xs font-mono text-slate-600 space-y-1 pl-2 border-l-2 border-slate-300">
                        <li>list_thread : 查看线程状态/栈使用率</li>
                        <li>list_sem    : 查看信号量</li>
                        <li>free        : 查看内存池剩余</li>
                        <li>ps          : 类似 Linux ps</li>
                    </ul>
                </div>
            </div>

            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 shadow-xl border border-slate-800">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-500 text-xs ml-2">Serial Port - COM3</span>
                </div>
                <div className="space-y-1 opacity-90">
                    <div> \ | /</div>
                    <div>- RT -     Thread Operating System</div>
                    <div> / | \     4.1.0 build Jun 22 2023</div>
                    <div> 2006 - 2022 Copyright by RT-Thread team</div>
                    <br/>
                    <div><span className="text-blue-400">msh /></span>led_on</div>
                    <div>LED is ON now.</div>
                    <div><span className="text-blue-400">msh /></span>ps</div>
                    <div className="text-slate-400 text-xs">
                        thread   pri  status      sp     stack left<br/>
                        -------- ---  ------- ---------- ----------<br/>
                        tshell    20  running 0x00000084 0x00000320<br/>
                        tidle     31  ready   0x00000040 0x000000e0
                    </div>
                    <div><span className="text-blue-400">msh /></span><span className="animate-pulse">_</span></div>
                </div>
            </div>
        </div>

        <div>
            <CodeBlock title="导出自定义命令 (MSH_CMD_EXPORT)" code={`
#include <rtthread.h>

void led_on(void) {
    rt_kprintf("LED is ON now.\\n");
    // HAL_GPIO_WritePin(...)
}
// 将函数导出为命令，第二个参数是描述
MSH_CMD_EXPORT(led_on, Turn on the LED);
`} />
        </div>
      </section>

      {/* IPC: Mailbox */}
      <section id="ipc" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Mail className="text-amber-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">邮箱 (Mailbox)</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                         <Zap size={18} className="text-amber-500"/>
                         比队列更高效
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        在 FreeRTOS 中，Queue 会把数据完整拷贝一份。但在 RT-Thread 中，**Mailbox 固定传输 4 字节内容**（通常是把指针转为 uint32_t 传递）。
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        因为只拷贝 4 字节，它比消息队列（Message Queue）效率高得多，非常适合传递大数据的**指针**。
                    </p>
                </div>
                <div className="flex-1">
                    <CodeBlock title="邮箱通信示例" code={`
struct rt_mailbox mb;
char mb_pool[128]; // 邮箱内存池

// 初始化邮箱，容量32
rt_mb_init(&mb, "mb", &mb_pool[0], sizeof(mb_pool)/4, RT_IPC_FLAG_FIFO);

// 发送指针
char *str = "Hello RTT";
rt_mb_send(&mb, (rt_uint32_t)str);

// 接收指针
char *rx_str;
rt_mb_recv(&mb, (rt_uint32_t *)&rx_str, RT_WAITING_FOREVER);
`} />
                </div>
            </div>
        </div>
      </section>

      {/* Device IPC */}
      <section id="device" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <HardDrive className="text-purple-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">I/O 设备驱动框架</h3>
        </div>

        <p className="text-slate-600">
            RT-Thread 提供了一套类 POSIX 的统一接口。应用程序不需要关心底层是 STM32 还是 ESP32，只需要调用 `write`。
            特别是 <strong>PIN 设备驱动</strong>，让操作 GPIO 像 Arduino 一样简单。
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
             {/* General Device API */}
             <div className="space-y-4">
                 <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2">PIN 设备示例 (GPIO)</h4>
                    <CodeBlock title="类 Arduino 风格" code={`
#include <rtdevice.h>

#define LED_PIN  GET_PIN(F, 9) // PF9

void app_main(void) {
    // 设置模式：输出
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

    while(1) {
        // 写入电平
        rt_pin_write(LED_PIN, PIN_HIGH);
        rt_thread_mdelay(500);
        rt_pin_write(LED_PIN, PIN_LOW);
        rt_thread_mdelay(500);
    }
}
`} />
                 </div>
             </div>

             {/* Standard Device API */}
             <div className="space-y-4">
                <div className="bg-slate-900 rounded-lg p-6 relative h-full">
                    <div className="absolute top-4 right-4 text-slate-600"><Share2 size={24}/></div>
                    <div className="text-white font-mono text-sm space-y-4 pt-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-slate-400 text-xs uppercase">Step 1: 查找设备</span>
                            <span className="text-green-400">dev = rt_device_find("uart1");</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-slate-400 text-xs uppercase">Step 2: 打开设备</span>
                            <span className="text-blue-400">rt_device_open(dev, RT_DEVICE_FLAG_INT_RX);</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-slate-400 text-xs uppercase">Step 3: 读写数据</span>
                            <span className="text-amber-400">rt_device_write(dev, 0, buffer, len);</span>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* File System */}
      <section id="dfs" className="scroll-mt-24 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <FolderTree className="text-amber-600" size={28}/>
            <h3 className="text-2xl font-bold text-slate-900">虚拟文件系统 (DFS)</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-3">
                 <p className="text-slate-600 text-sm">
                     RT-Thread 拥有完善的虚拟文件系统层。无论底层是 SD 卡 (FATFS)、SPI Flash (LittleFS) 还是只读文件系统 (RomFS)，上层应用都使用标准的 POSIX 接口。
                 </p>
                 <div className="flex gap-2">
                     <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-mono">open()</span>
                     <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-mono">read()</span>
                     <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-mono">write()</span>
                     <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-mono">close()</span>
                 </div>
            </div>
            <div className="flex-1">
                 <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs font-mono text-slate-700">
                     <div><span className="text-blue-600">msh /></span>ls /</div>
                     <div>Directory /:</div>
                     <div>sdcard              &lt;DIR&gt;</div>
                     <div>flash               &lt;DIR&gt;</div>
                     <div>hello.txt           12</div>
                     <br/>
                     <div><span className="text-blue-600">msh /></span>cat /hello.txt</div>
                     <div>Hello World!</div>
                 </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export const rtThreadIPCNavItems = [
    { id: 'intro', label: '生态概览' },
    { id: 'packages', label: '软件包 (Env)' },
    { id: 'finsh', label: 'FinSH 控制台' },
    { id: 'ipc', label: '邮箱 (Mailbox)' },
    { id: 'device', label: 'I/O 设备框架' },
    { id: 'dfs', label: '虚拟文件系统' },
];