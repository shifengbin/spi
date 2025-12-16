import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SpiPage, spiNavItems } from './pages/SpiPage';
import { I2cPage, i2cNavItems } from './pages/I2cPage';
import { UARTPage, uartNavItems } from './pages/UARTPage';
import { FlashingPage, flashingNavItems } from './pages/FlashingPage';
import { Activity, Cpu } from 'lucide-react';

// Wrapper component to handle location-based logic (scroll spy)
const ContentLayout: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('');

  // Determine which nav items to show based on current path
  let currentNavItems = spiNavItems;
  if (location.pathname === '/i2c') currentNavItems = i2cNavItems;
  else if (location.pathname === '/uart') currentNavItems = uartNavItems;
  else if (location.pathname === '/flashing') currentNavItems = flashingNavItems;

  useEffect(() => {
    // Reset active section on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -70% 0px', 
        threshold: 0
      }
    );

    // Short delay to allow DOM to render new route content before observing
    setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
        
        {/* Sidebar Navigation - Moved to Left */}
        <aside className="hidden lg:block lg:col-span-3 lg:order-1">
          <Sidebar activeSection={activeSection} pageNavItems={currentNavItems} />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 lg:order-2 lg:min-w-0">
          <Routes>
            <Route path="/" element={<SpiPage />} />
            <Route path="/i2c" element={<I2cPage />} />
            <Route path="/uart" element={<UARTPage />} />
            <Route path="/flashing" element={<FlashingPage />} />
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
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                    <Cpu size={20} />
                </div>
                <h1 className="font-bold text-xl tracking-tight text-slate-900">Embedded Protocol Guide</h1>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
                <a 
                href="https://github.com/topics/embedded-systems" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-500 hover:text-blue-600 transition-colors hidden md:block"
                >
                资源库
                </a>
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
            <p>© {new Date().getFullYear()} 通信协议指南。React & D3 Visualization.</p>
            </div>
        </footer>
        </div>
    </HashRouter>
  );
}