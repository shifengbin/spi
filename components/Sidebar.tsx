import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, Activity, Share2, ArrowRightLeft, HardDriveDownload, Layers, Box, Cpu, Zap, Terminal, CircleDot, Database, Binary, Shapes } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  pageNavItems: { id: string; label: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, pageNavItems }) => {
  return (
    <div className="sticky top-24 space-y-8">
      
      {/* Category: Electronic Components */}
      <div className="space-y-2">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">基础电子元器件</h4>
         <NavLink 
            to="/diode" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Activity size={18} />
            <span>二极管 (Diode)</span>
         </NavLink>
         <NavLink 
            to="/transistor" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Cpu size={18} />
            <span>三极管 (BJT)</span>
         </NavLink>
         <NavLink 
            to="/mosfet" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Zap size={18} />
            <span>MOS管 (MOSFET)</span>
         </NavLink>
         <NavLink 
            to="/logic-gates" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Binary size={18} />
            <span>三极管逻辑门 (RTL)</span>
         </NavLink>
         <NavLink 
            to="/mos-logic-gates" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-indigo-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Shapes size={18} />
            <span>MOS逻辑门 (CMOS)</span>
         </NavLink>
      </div>

      {/* Category: Communication Protocols */}
      <div className="space-y-2">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">通信协议</h4>
         <NavLink 
            to="/uart" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
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
                isActive ? 'bg-sky-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <CircleDot size={18} />
            <span>SPI 协议</span>
         </NavLink>
      </div>

      {/* Category: RTOS */}
      <div className="space-y-2">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">嵌入式操作系统</h4>
         <NavLink 
            to="/freertos" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-orange-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Layers size={18} />
            <span>FreeRTOS</span>
         </NavLink>
         <NavLink 
            to="/rtthread" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
         >
            <Database size={18} />
            <span>RT-Thread</span>
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
