import React, { useRef, useEffect } from 'react';
import useProjectBuilderStore from '../../store/useProjectBuilderStore';
import { 
  Mountain, 
  Sparkles, 
  Upload, 
  MousePointerClick, 
  LayoutTemplate,
  ZoomIn,
  ZoomOut,
  Maximize,
  Hand,
  ChevronDown,
  ListTodo,
  BrainCircuit,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

export default function CanvasArea() {
  const canvasRef = useRef(null);
  const { isGenerated, zoom, activeTool, uploadedImage, selectedAsset } = useProjectBuilderStore(state => state.canvasState);
  const setCanvasState = useProjectBuilderStore(state => state.setCanvasState);

  // Here would be the PixiJS init logic, but we just leave the ref ready.
  useEffect(() => {
    if (isGenerated && canvasRef.current && !uploadedImage && !selectedAsset) {
      // Initialize PixiJS Engine2D here in the future
      console.log("Canvas is ready for PixiJS!");
    }
  }, [isGenerated, uploadedImage, selectedAsset]);

  const displayImage = selectedAsset?.url || uploadedImage;

  return (
    <div className="flex-1 bg-[#0B1120] relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background dot pattern to simulate a canvas board */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4F6BFF 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {!isGenerated && (
        <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-6">
          
          <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#1E293B] flex items-center justify-center mb-6 bg-[#111827]/50">
            <Mountain size={40} className="text-[#334155]" />
          </div>

          <h2 className="text-2xl font-bold text-[#F8FAFC] text-center mb-2">Aquí se visualizará el gráfico del proyecto</h2>
          <p className="text-[#94A3B8] text-sm mb-10">Objetivo final del proyecto</p>

          <div className="flex flex-col gap-4 w-full max-w-md mb-16">
            <div className="flex items-center gap-4 text-[#F8FAFC]">
              <Sparkles size={18} className="text-[#8B5CF6]" />
              <span className="text-sm font-medium">Usa la barra superior para generar con IA</span>
            </div>
            <div className="flex items-center gap-4 text-[#F8FAFC]">
              <Upload size={18} className="text-[#94A3B8]" />
              <span className="text-sm font-medium text-[#94A3B8]">Sube un archivo con tu gráfico</span>
            </div>
            <div className="flex items-center gap-4 text-[#F8FAFC]">
              <MousePointerClick size={18} className="text-[#94A3B8]" />
              <span className="text-sm font-medium text-[#94A3B8]">O arrastra y suelta una imagen aquí</span>
            </div>
            <div className="flex items-center gap-4 text-[#F8FAFC]">
              <LayoutTemplate size={18} className="text-[#94A3B8]" />
              <span className="text-sm font-medium text-[#94A3B8]">Comienza desde una plantilla prediseñada</span>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="w-full bg-[#111827]/80 backdrop-blur-sm border border-[#1E293B] rounded-xl p-6 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center">
                <ListTodo size={18} className="text-[#94A3B8]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F8FAFC] mb-1">Define el objetivo</p>
                <p className="text-[10px] text-[#94A3B8]">Escribe un prompt claro.</p>
              </div>
            </div>
            <div className="text-[#334155]">→</div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 flex items-center justify-center">
                <BrainCircuit size={18} className="text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F8FAFC] mb-1">IA genera gráfico</p>
                <p className="text-[10px] text-[#94A3B8]">La IA procesa el modelo.</p>
              </div>
            </div>
            <div className="text-[#334155]">→</div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center">
                <SlidersHorizontal size={18} className="text-[#06B6D4]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F8FAFC] mb-1">Revisa y ajusta</p>
                <p className="text-[10px] text-[#94A3B8]">Personaliza el resultado.</p>
              </div>
            </div>
            <div className="text-[#334155]">→</div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center">
                <CheckCircle2 size={18} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F8FAFC] mb-1">Guarda y visualiza</p>
                <p className="text-[10px] text-[#94A3B8]">Listos para simulación.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {isGenerated && (
        <div ref={canvasRef} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing flex items-center justify-center p-8">
          {displayImage ? (
            <img 
              src={displayImage} 
              alt="Gráfico en lienzo" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
              style={{ transform: `scale(${zoom / 100})`, transition: 'transform 0.2s ease-in-out' }}
            />
          ) : (
            <div className="text-2xl font-bold text-[#F8FAFC]/30">PixiJS Canvas Area</div>
          )}
        </div>
      )}

      {/* Floating Controls - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center bg-[#111827] border border-[#1E293B] rounded-lg shadow-xl overflow-hidden">
        <button className="p-2.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors border-r border-[#1E293B]" title="Zoom In">
          <ZoomIn size={18} />
        </button>
        <button className="p-2.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors border-r border-[#1E293B]" title="Zoom Out">
          <ZoomOut size={18} />
        </button>
        <button className="p-2.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors border-r border-[#1E293B]" title="Fit to Screen">
          <Maximize size={18} />
        </button>
        <div className="flex items-center gap-1 px-3 py-2.5 border-r border-[#1E293B] cursor-pointer hover:bg-[#1E293B] transition-colors">
          <span className="text-xs font-medium text-[#F8FAFC]">{zoom}%</span>
          <ChevronDown size={14} className="text-[#94A3B8]" />
        </div>
        <button 
          onClick={() => setCanvasState({ activeTool: activeTool === 'hand' ? 'pointer' : 'hand' })}
          className={`p-2.5 transition-colors ${activeTool === 'hand' ? 'text-[#8B5CF6] bg-[#8B5CF6]/10' : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'}`} 
          title="Pan Tool"
        >
          <Hand size={18} />
        </button>
      </div>

      {/* Floating Minimap - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 w-48 h-32 bg-[#111827] border border-[#1E293B] rounded-lg shadow-xl overflow-hidden flex flex-col">
        <div className="flex-1 bg-[#0B1120] relative p-2">
          {/* Mock minimap content */}
          <div className="w-full h-full border border-[#1E293B]/50 rounded flex items-center justify-center relative">
             {isGenerated && <div className="absolute w-1/3 h-1/3 bg-[#8B5CF6]/20 border border-[#8B5CF6] rounded"></div>}
          </div>
        </div>
        <div className="h-6 bg-[#1E293B]/50 border-t border-[#1E293B] flex items-center justify-end px-2">
          <span className="text-[9px] font-bold text-[#94A3B8] tracking-widest uppercase">Minimapa</span>
        </div>
      </div>

    </div>
  );
}
