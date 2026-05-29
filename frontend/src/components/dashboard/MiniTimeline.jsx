import React, { useEffect, useRef } from 'react';
import { Filter, Maximize2 } from 'lucide-react';
import useProjectStore from '../../store/useProjectStore';
import { Engine2D } from '../../canvas/Engine2D';

export default function MiniTimeline() {
  const canvasContainerRef = useRef(null);
  const engineRef = useRef(null);
  const projectData = useProjectStore(state => state.project);

  // Inicialización del Motor Visual (PixiJS)
  useEffect(() => {
    if (canvasContainerRef.current && !engineRef.current) {
       const engine = new Engine2D(canvasContainerRef.current);
       engine.init().catch(err => console.error("Error inicializando PixiJS:", err));
       engineRef.current = engine;
    }

    // Cleanup al desmontar
    return () => {
       if (engineRef.current) {
          engineRef.current.destroy();
          engineRef.current = null;
       }
    };
  }, []);

  // Reactividad: Escuchar actualizaciones del store (originadas por WebSockets)
  useEffect(() => {
    if (engineRef.current && projectData) {
        engineRef.current.updateFromStore(projectData);
    }
  }, [projectData]);

  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-5 flex flex-col relative overflow-hidden min-h-[300px]">
      <div className="flex justify-between items-center mb-4 z-10">
        <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
          Línea de Tiempo del Proyecto (Motor Visual)
        </h3>
        <div className="flex gap-2 items-center">
          <div className="flex bg-[#0B1120] border border-[#1E293B] rounded-md p-0.5">
            <button className="px-3 py-1 text-[11px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded">Semana</button>
            <button className="px-3 py-1 text-[11px] font-medium bg-[#1E293B] text-[#F8FAFC] rounded shadow-sm">Mes</button>
            <button className="px-3 py-1 text-[11px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded">Trimestre</button>
          </div>
          <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded border border-transparent hover:border-[#1E293B] transition-colors ml-2">
             <Filter size={14} />
          </button>
          <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded border border-transparent hover:border-[#1E293B] transition-colors">
             <Maximize2 size={14} />
          </button>
        </div>
      </div>
      
      {/* Contenedor Principal (Donde PixiJS se monta) */}
      <div className="flex-1 bg-[#0B1120] rounded-lg border border-[#1E293B] relative overflow-hidden flex flex-col shadow-inner">
        {/* Cabecera de Meses (HTML sobre el Canvas) */}
        <div className="flex border-b border-[#1E293B] bg-[#111827]/80 backdrop-blur-sm text-[10px] text-[#94A3B8] font-medium z-10 relative">
           <div className="flex-1 border-r border-[#1E293B] py-1 text-center">Marzo</div>
           <div className="flex-1 border-r border-[#1E293B] py-1 text-center">Abril</div>
           <div className="flex-1 border-r border-[#1E293B] py-1 text-center">Mayo</div>
           <div className="flex-1 border-r border-[#1E293B] py-1 text-center bg-[#4F6BFF]/10 text-[#4F6BFF] font-bold">Junio (Actual)</div>
           <div className="flex-1 border-r border-[#1E293B] py-1 text-center">Julio</div>
           <div className="flex-1 py-1 text-center">Agosto</div>
        </div>

        {/* Zona de Renderizado PixiJS */}
        <div 
          ref={canvasContainerRef} 
          className="flex-1 relative w-full h-full cursor-grab active:cursor-grabbing"
        />
      </div>

      <div className="flex gap-5 mt-4 text-[10px] text-[#94A3B8] justify-end font-medium z-10 relative">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span> Completado</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_5px_rgba(6,182,212,0.5)]"></span> En progreso</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4F6BFF] shadow-[0_0_5px_rgba(79,107,255,0.5)]"></span> Pendiente</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_5px_rgba(239,68,68,0.5)]"></span> Retrasado</span>
      </div>
    </div>
  );
}
