import React, { useEffect, useState } from 'react';
import useOperationsTreeStore from '../../store/useOperationsTreeStore';
import TreeNode from './TreeNode';
import { ChevronsLeft, Search, GitMerge, Braces, ListTree, PanelLeftOpen } from 'lucide-react';

export default function OperationsTreePanel() {
  const isTreeOpen = useOperationsTreeStore((state) => state.isTreeOpen);
  const toggleTree = useOperationsTreeStore((state) => state.toggleTree);
  const activeTab = useOperationsTreeStore((state) => state.activeTab);
  const setActiveTab = useOperationsTreeStore((state) => state.setActiveTab);
  const searchQuery = useOperationsTreeStore((state) => state.searchQuery);
  const setSearchQuery = useOperationsTreeStore((state) => state.setSearchQuery);
  const projectData = useOperationsTreeStore((state) => state.projectData);

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isTreeOpen) {
    return (
      <div className="h-full border-r border-[#1E293B] bg-[#0B1120] flex flex-col items-center py-4 px-2 transition-all duration-300">
        <button 
          onClick={toggleTree}
          className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors"
          title="Abrir Árbol de Operaciones"
        >
          <PanelLeftOpen size={20} />
        </button>
      </div>
    );
  }

  return (
    <aside className="h-full w-[320px] bg-[#111827] border-r border-[#1E293B] flex flex-col flex-shrink-0 transition-all duration-300 shadow-xl z-10">
      
      {/* Header */}
      <div className="p-4 flex flex-col gap-4 border-b border-[#1E293B]/50">
        <div className="flex justify-between items-center">
          <h2 className="text-[#F8FAFC] font-bold text-xs tracking-widest uppercase">Árbol de Operaciones</h2>
          <button 
            onClick={toggleTree}
            className="text-[#94A3B8] hover:text-white p-1 rounded hover:bg-[#1E293B] transition-colors"
          >
            <ChevronsLeft size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0B1120] rounded-lg p-1 border border-[#1E293B]">
          <button 
            onClick={() => setActiveTab('arbol')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'arbol' ? 'bg-[#8B5CF6] text-white shadow-md' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <ListTree size={14} /> Árbol
          </button>
          <button 
            onClick={() => setActiveTab('grafo')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'grafo' ? 'bg-[#8B5CF6] text-white shadow-md' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <GitMerge size={14} /> Grafo
          </button>
          <button 
            onClick={() => setActiveTab('datos')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'datos' ? 'bg-[#8B5CF6] text-white shadow-md' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <Braces size={14} /> Datos
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Buscar nodo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B1120] border border-[#1E293B] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#8B5CF6] transition-colors"
          />
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 custom-scrollbar">
        {activeTab === 'arbol' && (
          <TreeNode nodeKey="proyecto" data={projectData.proyecto} level={0} />
        )}
        {activeTab === 'grafo' && (
          <div className="flex items-center justify-center h-full text-xs text-[#94A3B8] p-4 text-center">
            Vista de relaciones de Grafo (Próximamente)
          </div>
        )}
        {activeTab === 'datos' && (
          <div className="flex items-center justify-center h-full text-xs text-[#94A3B8] p-4 text-center">
            Vista de JSON CRUD (Próximamente)
          </div>
        )}
      </div>

      {/* Footer Sync Status */}
      <div className="p-3 border-t border-[#1E293B] bg-[#0B1120]/50 flex justify-between items-center">
        <span className="text-[10px] text-[#94A3B8]">Última actualización: {currentTime}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-wider">Sync</span>
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        </div>
      </div>
      
    </aside>
  );
}
