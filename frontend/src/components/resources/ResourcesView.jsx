import React, { useState } from 'react';
import ResourceDashboard from './ResourceDashboard';
import ResourceTable from './ResourceTable';
import ResourceDetailPanel from './ResourceDetailPanel';
import useResourceStore from '../../store/useResourceStore';
import Sidebar from '../dashboard/Sidebar';
import OperationsTreePanel from '../project-builder/OperationsTreePanel';

export default function ResourcesView() {
  const syncState = useResourceStore(state => state.syncState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#0B1120] overflow-hidden relative font-sans text-[#F8FAFC]">
      
      {/* Left Navigation Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Operations Tree Panel */}
      <OperationsTreePanel />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-[#111827] border-b border-[#1E293B] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex flex-col justify-center">
            <h1 className="text-[#F8FAFC] font-bold text-base leading-tight uppercase tracking-wider">Centro de Recursos</h1>
            <p className="text-[#8B5CF6] text-[10px] uppercase font-bold tracking-widest">MdPlans RTS Engine</p>
          </div>
          
          {/* Sync Status Indicator */}
          <div className="flex items-center gap-2">
            {syncState === 'saving' && (
              <span className="text-[10px] text-[#94A3B8] flex items-center gap-1 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse"></span>
                Guardando...
              </span>
            )}
            {syncState === 'saved' && (
              <span className="text-[10px] text-[#10B981] flex items-center gap-1 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Guardado
              </span>
            )}
            {syncState === 'error' && (
              <span className="text-[10px] text-[#EF4444] flex items-center gap-1 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                Error
              </span>
            )}
          </div>
        </header>

        {/* Dashboard and Table */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          <ResourceDashboard />
          <ResourceTable />
        </div>
      </div>

      {/* Right Panel */}
      <ResourceDetailPanel />
      
    </div>
  );
}
