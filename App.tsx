import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SpiPage, spiNavItems } from './pages/SpiPage';
import { I2cPage, i2cNavItems } from './pages/I2cPage';
import { UARTPage, uartNavItems } from './pages/UARTPage';
import { FlashingPage, flashingNavItems } from './pages/FlashingPage';
import { FreeRTOSPage, freeRtosNavItems } from './pages/FreeRTOSPage';
import { FreeRTOSTaskPage, freeRtosTaskNavItems } from './pages/FreeRTOSTaskPage';
import { FreeRTOSIPCPage, freeRtosIpcNavItems } from './pages/FreeRTOSIPCPage';
import { FreeRTOSAdvancedPage, freeRtosAdvancedNavItems } from './pages/FreeRTOSAdvancedPage';
import { RTThreadPage, rtThreadNavItems } from './pages/RTThreadPage';
import { RTThreadIPCPage, rtThreadIPCNavItems } from './pages/RTThreadIPCPage';
import { DiodePage, diodeNavItems } from './pages/DiodePage';
import { TransistorPage, transistorNavItems } from './pages/TransistorPage';
import { MosfetPage, mosfetNavItems } from './pages/MosfetPage';
import { LogicGatesPage, logicGatesNavItems } from './pages/LogicGatesPage';
import { Activity, Cpu } from 'lucide-react';

const ContentLayout: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('');

  let currentNavItems = spiNavItems;
  if (location.pathname === '/i2c') currentNavItems = i2cNavItems;
  else if (location.pathname === '/uart') currentNavItems = uartNavItems;
  else if (location.pathname === '/flashing') currentNavItems = flashingNavItems;
  else if (location.pathname === '/freertos') currentNavItems = freeRtosNavItems;
  else if (location.pathname === '/freertos-tasks') currentNavItems = freeRtosTaskNavItems;
  else if (location.pathname === '/freertos-ipc') currentNavItems = freeRtosIpcNavItems;
  else if (location.pathname === '/freertos-advanced') currentNavItems = freeRtosAdvancedNavItems;
  else if (location.pathname === '/rtthread') currentNavItems = rtThreadNavItems;
  else if (location.pathname === '/rtthread-ipc') currentNavItems = rtThreadIPCNavItems;
  else if (location.pathname === '/diode') currentNavItems = diodeNavItems;
  else if (location.pathname === '/transistor') currentNavItems = transistorNavItems;
  else if (location.pathname === '/mosfet') currentNavItems = mosfetNavItems;
  else if (location.pathname === '/logic-gates') currentNavItems = logicGatesNavItems;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );
    setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));
    }, 100);
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
        <aside className="hidden lg:block lg:col-span-3 lg:order-1">
          <Sidebar activeSection={activeSection} pageNavItems={currentNavItems} />
        </aside>
        <main className="lg:col-span-9 lg:order-2 lg:min-w-0">
          <Routes>
            <Route path="/" element={<SpiPage />} />
            <Route path="/i2c" element={<I2cPage />} />
            <Route path="/uart" element={<UARTPage />} />
            <Route path="/flashing" element={<FlashingPage />} />
            <Route path="/freertos" element={<FreeRTOSPage />} />
            <Route path="/freertos-tasks" element={<FreeRTOSTaskPage />} />
            <Route path="/freertos-ipc" element={<FreeRTOSIPCPage />} />
            <Route path="/freertos-advanced" element={<FreeRTOSAdvancedPage />} />
            <Route path="/rtthread" element={<RTThreadPage />} />
            <Route path="/rtthread-ipc" element={<RTThreadIPCPage />} />
            <Route path="/diode" element={<DiodePage />} />
            <Route path="/transistor" element={<TransistorPage />} />
            <Route path="/mosfet" element={<MosfetPage />} />
            <Route path="/logic-gates" element={<LogicGatesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
        <div className="min-h-screen bg-slate-50 pb-20">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                    <Cpu size={20} />
                </div>
                <h1 className="font-bold text-xl tracking-tight text-slate-900">Embedded & Electronics Guide</h1>
            </div>
            </div>
        </header>
        <ContentLayout />
        <footer className="border-t border-slate-200 mt-20 py-8 bg-white">
            <div className="max-w-5xl mx-auto px-6 text-center text-slate-400 text-sm">
            <div className="flex justify-center items-center gap-2 mb-2">
                <Activity size={16} />
                <span>交互式学习平台</span>
            </div>
            <p>© {new Date().getFullYear()} 嵌入式工程师指南。React & SVG Visualization.</p>
            </div>
        </footer>
        </div>
    </HashRouter>
  );
}