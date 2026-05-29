import React, { useRef } from 'react';
import useProjectBuilderStore from '../../store/useProjectBuilderStore';
import { 
  Sparkles, 
  Upload, 
  LayoutTemplate, 
  Undo2, 
  Redo2, 
  HelpCircle, 
  Bell, 
  ChevronDown
} from 'lucide-react';

export default function TopToolBar() {
  const isGenerating = useProjectBuilderStore(state => state.aiState.isGenerating);
  const setGenerating = useProjectBuilderStore(state => state.setGenerating);
  const setCanvasState = useProjectBuilderStore(state => state.setCanvasState);
  const syncState = useProjectBuilderStore(state => state.syncState);
  const fileInputRef = useRef(null);

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setGenerating(false);
      setCanvasState({ isGenerated: true });
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCanvasState({ uploadedImage: imageUrl, isGenerated: true });
    }
  };

  return (
    <header className="h-16 bg-[#111827] border-b border-[#1E293B] flex items-center justify-between px-6 flex-shrink-0">
      
      {/* Left: Titles */}
      <div className="flex flex-col justify-center min-w-[200px]">
        <h1 className="text-[#F8FAFC] font-bold text-base leading-tight">Gestor de Proyectos</h1>
        <p className="text-[#94A3B8] text-[10px] uppercase tracking-wider">Simulador Inteligente RPG</p>
      </div>

      {/* Center: AI Controls */}
      <div className="flex items-center gap-3 flex-1 justify-center max-w-3xl">
        <div className="flex items-center bg-[#0B1120] border border-[#1E293B] rounded-lg p-1 w-full max-w-xl transition-all focus-within:border-[#8B5CF6]/50 focus-within:ring-1 focus-within:ring-[#8B5CF6]/20">
          <div className="pl-3 pr-2 text-[#94A3B8]">
            <Sparkles size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Ej: Construcción de un ed..."
            className="flex-1 bg-transparent text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none px-2 py-1"
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#8B5CF6]/50 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
          >
            {isGenerating ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Sparkles size={14} />
            )}
            Generar
          </button>
        </div>

        <div className="h-8 w-px bg-[#1E293B] mx-1"></div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          accept="image/*" 
          className="hidden" 
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-sm font-medium text-[#F8FAFC] bg-[#1E293B]/50 hover:bg-[#1E293B] border border-[#1E293B] px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
        >
          <Upload size={16} className="text-[#94A3B8]" />
          Subir gráfico
        </button>

        <button className="flex items-center gap-2 text-sm font-medium text-[#F8FAFC] bg-[#1E293B]/50 hover:bg-[#1E293B] border border-[#1E293B] px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
          <LayoutTemplate size={16} className="text-[#94A3B8]" />
          Plantillas
          <ChevronDown size={14} className="text-[#94A3B8]" />
        </button>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center justify-end gap-4 min-w-[200px]">
        <div className="flex items-center gap-2 mr-2 hidden lg:flex">
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
          
          <div className="h-6 w-px bg-[#1E293B] mx-2"></div>

          <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-md transition-colors" title="Deshacer">
            <Undo2 size={18} />
          </button>
          <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-md transition-colors" title="Rehacer">
            <Redo2 size={18} />
          </button>
        </div>
        
        <div className="h-6 w-px bg-[#1E293B] hidden lg:block"></div>

        <button className="relative p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-md transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full"></span>
        </button>
        <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-md transition-colors">
          <HelpCircle size={18} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer group ml-2">
          <div className="hidden text-right lg:block">
            <p className="text-xs font-semibold text-[#F8FAFC]">Juan P.</p>
            <p className="text-[10px] text-[#94A3B8] uppercase">Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center border border-[#4F6BFF]/30 group-hover:border-[#4F6BFF] transition-colors overflow-hidden">
            <span className="text-xs font-bold text-[#F8FAFC]">JP</span>
          </div>
        </div>
      </div>

    </header>
  );
}
