import React, { useState } from 'react';
import useProjectStore from '../../store/useProjectStore';
import AIAssistantPanel from './AIAssistantPanel';
import Sidebar from './Sidebar';
import { 
  Settings, 
  Search, 
  Bell,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  FileBarChart
} from 'lucide-react';

import OperationsTreePanel from '../project-builder/OperationsTreePanel';

export default function DashboardLayout({ children }) {
  const proyecto = useProjectStore(state => state.project?.proyecto);
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#0B1120] text-[#F8FAFC] overflow-hidden font-sans">
      
      {/* Sidebar Izquierdo */}
      <Sidebar isOpen={isLeftOpen} onToggle={() => setIsLeftOpen(!isLeftOpen)} />

      {/* Operations Tree Panel */}
      <OperationsTreePanel />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 border-b border-[#1E293B] bg-[#111827]/80 backdrop-blur-md flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-4 w-1/3">
             {/* Left side empty for layout balance */}
          </div>
          
          <div className="flex items-center justify-center flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
              <input 
                type="text" 
                placeholder="Search parameters..." 
                className="w-full bg-[#0B1120] border border-[#1E293B] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4F6BFF] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 w-1/3">
            <button className="relative text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#111827]"></span>
            </button>
            <button className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <FileBarChart size={18} className="rotate-90" />
            </button>
            <button className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <Settings size={18} />
            </button>
            
            <div className="h-6 w-px bg-[#1E293B] mx-2"></div>
            
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <span>MdPlans</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <div className="max-w-[1600px] mx-auto h-full">
             {children}
          </div>
        </main>
      </div>
      
      {/* Sidebar Derecho (Intelligence) */}
      <aside 
        className={`${isRightOpen ? 'w-[320px]' : 'w-0'} bg-[#0B1120] border-l border-[#1E293B] flex flex-col z-20 transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-[#1E293B]/50 whitespace-nowrap overflow-hidden">
           <h2 className="text-xs font-bold text-[#F8FAFC] tracking-[0.2em] uppercase">Intelligence</h2>
           <button onClick={() => setIsRightOpen(false)} className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors p-1">
             <Menu size={18} />
           </button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin w-[320px]">
           <div className="p-4">
             <AIAssistantPanel />
           </div>
        </div>
      </aside>
      
      {/* Toggle para reabrir el panel derecho si está cerrado */}
      {!isRightOpen && (
        <div className="absolute right-0 top-16 bottom-0 w-12 flex flex-col items-center py-4 bg-[#111827] border-l border-[#1E293B] z-10">
           <button onClick={() => setIsRightOpen(true)} className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors p-2 rounded hover:bg-[#1E293B]">
             <PanelRightOpen size={18} />
           </button>
        </div>
      )}

    </div>
  );
}
