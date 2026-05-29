import React from 'react';
import useProjectStore from '../../store/useProjectStore';
import { Zap, Plus, CheckSquare, UserPlus, AlertTriangle, Activity, FileBarChart, ArrowRight } from 'lucide-react';

export default function AIAssistantPanel() {
  const ia = useProjectStore(state => state.project?.ia);

  if (!ia || !ia.recomendaciones || ia.recomendaciones.length === 0) return null;

  const mainRecommendation = ia.recomendaciones[0];

  return (
    <div className="w-full flex flex-col gap-6 h-full">
      {/* Panel Asistente IA */}
      <div className="bg-[#111827] border border-[#8B5CF6]/30 rounded-xl p-5 relative overflow-hidden shadow-[0_0_20px_rgba(139,92,246,0.05)] group">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6] opacity-10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 transition-opacity group-hover:opacity-20"></div>
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="p-1.5 bg-[#8B5CF6]/20 rounded-lg text-[#8B5CF6] border border-[#8B5CF6]/30">
            <Zap size={16} className="animate-pulse" />
          </div>
          <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">Asistente IA</h3>
        </div>

        <div className="relative z-10">
           <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-4">
             He analizado tu proyecto y esto recomiendo:
           </p>

           <div className="bg-[#0B1120] border border-[#1E293B] rounded-lg p-3.5 mb-5 relative overflow-hidden group-hover:border-[#8B5CF6]/40 transition-colors">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22C55E]"></div>
             <p className="text-sm text-[#F8FAFC] font-medium leading-snug pl-1" dangerouslySetInnerHTML={{__html: mainRecommendation.mensaje.replace('1 cuadrilla de albañilería', '<span class="text-[#8B5CF6] font-bold">1 cuadrilla de albañilería</span>').replace('8 días', '<span class="text-[#22C55E] font-bold">8 días</span>')}}>
             </p>
           </div>

           <button className="w-full py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white rounded-lg text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
             Ver <ArrowRight size={16} />
           </button>
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-5 flex-1 flex flex-col">
        <h3 className="text-xs font-bold text-[#F8FAFC] mb-4 uppercase tracking-wider">
          Accesos Rápidos
        </h3>
        <div className="space-y-2 flex-1">
          <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] hover:border-[#4F6BFF]/50 text-[#F8FAFC] transition-all group">
            <span className="text-[13px] font-medium">Nuevo Proyecto</span>
            <Plus size={16} className="text-[#06B6D4] group-hover:scale-110 transition-transform" />
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] hover:border-[#4F6BFF]/50 text-[#F8FAFC] transition-all group">
            <span className="text-[13px] font-medium">Nueva Tarea</span>
            <CheckSquare size={16} className="text-[#06B6D4] group-hover:scale-110 transition-transform" />
          </button>

          <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] hover:border-[#4F6BFF]/50 text-[#F8FAFC] transition-all group">
            <span className="text-[13px] font-medium">Nuevo Recurso</span>
            <UserPlus size={16} className="text-[#06B6D4] group-hover:scale-110 transition-transform" />
          </button>

          <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] hover:border-[#4F6BFF]/50 text-[#F8FAFC] transition-all group">
            <span className="text-[13px] font-medium">Nuevo Riesgo</span>
            <AlertTriangle size={16} className="text-[#06B6D4] group-hover:scale-110 transition-transform" />
          </button>

          <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] hover:border-[#4F6BFF]/50 text-[#F8FAFC] transition-all group">
            <span className="text-[13px] font-medium">Simular Escenario</span>
            <Activity size={16} className="text-[#06B6D4] group-hover:scale-110 transition-transform" />
          </button>

          <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] hover:border-[#4F6BFF]/50 text-[#F8FAFC] transition-all group">
            <span className="text-[13px] font-medium">Generar Reporte</span>
            <FileBarChart size={16} className="text-[#06B6D4] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
