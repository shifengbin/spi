import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, Activity, Share2, ArrowRightLeft, HardDriveDownload, Layers, Box, Cpu, Zap, Terminal } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  pageNavItems: { id: string; label: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, pageNavItems }) => {
  return (
    <div className="sticky top-24 space-y-8">
      
      {/* Category: Communication Protocols */}
      <div className="space-y-2">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">通信协议</h4>
         <NavLink 
            to="/uart" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <ArrowRightLeft size={18} />
            <span>UART 协议</span>
         </NavLink>
         <NavLink 
            to="/i2c" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Share2 size={18} />
            <span>I2C (IIC) 协议</span>
         </NavLink>
         <NavLink 
            to="/" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Activity size={18} />
            <span>SPI 协议</span>
         </NavLink>
      </div>

      {/* Category: Embedded Basics */}
      <div className="space-y-2">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">嵌入式基础</h4>
         <NavLink 
            to="/flashing" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-slate-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <HardDriveDownload size={18} />
            <span>MCU 烧录原理</span>
         </NavLink>
         
         {/* FreeRTOS Section */}
         <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400">FreeRTOS 系列</div>
         
         <NavLink 
            to="/freertos" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-orange-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Layers size={18} />
            <span>RTOS 基础概念</span>
         </NavLink>
         <NavLink 
            to="/freertos-tasks" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Cpu size={18} />
            <span>任务管理详解</span>
         </NavLink>
         <NavLink 
            to="/freertos-ipc" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Box size={18} />
            <span>IPC 通信机制</span>
         </NavLink>
         <NavLink 
            to="/freertos-advanced" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Zap size={18} />
            <span>进阶特性</span>
         </NavLink>

         {/* RT-Thread Section */}
         <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400">RT-Thread 系列</div>
         
         <NavLink 
            to="/rtthread" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Layers size={18} />
            <span>RT-Thread 基础</span>
         </NavLink>
         <NavLink 
            to="/rtthread-ipc" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Terminal size={18} />
            <span>生态与组件</span>
         </NavLink>

      </div>

      <div className="border-t border-slate-200 my-4"></div>

      {/* Table of Contents */}
      <div className="px-1">
        <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold px-2">
           <List size={18} />
           <span>本页目录</span>
        </div>
        <nav className="space-y-1 relative">
           {/* Vertical line track */}
           <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200 rounded-full"></div>
           
           {pageNavItems.map((item) => (
             <a
               key={item.id}
               href={`#${item.id}`}
               onClick={(e) => {
                 e.preventDefault();
                 document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
               }}
               className={`
                 block pl-6 py-2 text-sm font-medium transition-all duration-200 border-l-2 ml-[10px] relative
                 ${activeSection === item.id 
                   ? 'border-blue-500 text-blue-600 bg-blue-50/50 rounded-r-lg' 
                   : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}
               `}
             >
               {item.label}
             </a>
           ))}
        </nav>
      </div>

    </div>
  );
};