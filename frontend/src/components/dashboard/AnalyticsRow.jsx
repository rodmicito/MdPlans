import React from 'react';
import useProjectStore from '../../store/useProjectStore';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export default function AnalyticsRow() {
  const riesgos = useProjectStore(state => state.project?.riesgos);
  const recursos = useProjectStore(state => state.project?.recursos);

  if (!riesgos || !recursos) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Col 1: Curva S (Progreso) */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-5 flex flex-col hover:border-[#1E293B]/80 transition-colors">
        <h3 className="text-xs font-bold text-[#F8FAFC] mb-4 uppercase tracking-wider">
          Progreso del Proyecto
        </h3>
        <div className="flex-1 min-h-[200px] flex items-end relative border-l border-b border-[#1E293B] pt-4 pr-2">
           {/* Mock S-Curve Chart with SVG */}
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Línea Planificada (Gris) */}
             <path d="M 0,100 C 30,90 40,50 100,10" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
             {/* Línea Real (Cyan) */}
             <path d="M 0,100 C 35,95 45,60 80,40" fill="none" stroke="#06B6D4" strokeWidth="2.5" className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
             {/* Punto actual */}
             <circle cx="80" cy="40" r="3" fill="#0B1120" stroke="#06B6D4" strokeWidth="2" />
           </svg>
           {/* Leyenda */}
           <div className="absolute top-0 right-0 flex gap-4 text-[10px] text-[#94A3B8]">
             <span className="flex items-center gap-1.5">
               <span className="w-4 h-0.5 bg-[#334155] inline-block border-t border-dashed border-[#334155]"></span> 
               Planificado
             </span>
             <span className="flex items-center gap-1.5">
               <span className="w-4 h-0.5 bg-[#06B6D4] inline-block"></span> 
               Real
             </span>
           </div>
           {/* Ejes Mocks */}
           <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-[9px] text-[#94A3B8]">
             <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span>
           </div>
           <div className="absolute top-0 -left-6 bottom-0 flex flex-col justify-between text-[9px] text-[#94A3B8] items-end">
             <span>100%</span><span>50%</span><span>0%</span>
           </div>
        </div>
      </div>

      {/* Col 2: Riesgos Activos */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
             Riesgos Activos
           </h3>
           <span className="bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-bold px-2 py-0.5 rounded border border-[#EF4444]/20">{riesgos.length} Detectados</span>
        </div>
        <div className="space-y-3 flex-1 overflow-y-auto pr-1 scrollbar-thin">
          {riesgos.map((riesgo, index) => {
            const isHigh = riesgo.nivel === "Alto";
            const ColorIcon = isHigh ? AlertCircle : AlertTriangle;
            const colorCls = isHigh ? "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20" : "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20";

            return (
              <div key={riesgo.id} className="flex gap-3 items-start border-b border-[#1E293B]/50 pb-3">
                <span className={`${colorCls} p-1.5 rounded text-[10px] font-bold border flex items-center gap-1 mt-0.5 uppercase`}>
                  <ColorIcon size={12}/> {riesgo.nivel}
                </span>
                <div>
                  <p className="text-sm text-[#F8FAFC] font-medium leading-snug">{riesgo.descripcion}</p>
                  <p className="text-[10px] text-[#94A3B8] mt-1">Prob: {riesgo.probabilidad}% • Impacto: {riesgo.impacto}</p>
                </div>
              </div>
            )
          })}
        </div>
        <button className="text-[#4F6BFF] text-[11px] font-medium hover:underline mt-3 self-start transition-colors">Ver todos los riesgos →</button>
      </div>

      {/* Col 3: Recursos Activos */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
             Recursos Activos
           </h3>
        </div>
        <div className="space-y-4 flex-1">
          {/* Mano de Obra */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#F8FAFC] font-medium flex items-center gap-2">Mano de Obra</span>
              <span className="text-[#94A3B8] font-mono text-[11px]">{recursos.mano_obra.actual} / {recursos.mano_obra.total}</span>
            </div>
            <div className="w-full bg-[#1E293B] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#22C55E] h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(34,197,94,0.4)]" style={{ width: `${(recursos.mano_obra.actual / recursos.mano_obra.total) * 100}%` }}></div>
            </div>
          </div>
          {/* Equipos */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#F8FAFC] font-medium">Equipos</span>
              <span className="text-[#94A3B8] font-mono text-[11px]">{recursos.equipos.actual} / {recursos.equipos.total}</span>
            </div>
            <div className="w-full bg-[#1E293B] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#F59E0B] h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(245,158,11,0.4)]" style={{ width: `${(recursos.equipos.actual / recursos.equipos.total) * 100}%` }}></div>
            </div>
          </div>
          {/* Materiales */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#F8FAFC] font-medium">Materiales</span>
              <span className="text-[#94A3B8] font-mono text-[11px]">{recursos.materiales.porcentaje_disponible}% disp.</span>
            </div>
            <div className="w-full bg-[#1E293B] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#4F6BFF] h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(79,107,255,0.4)]" style={{ width: `${recursos.materiales.porcentaje_disponible}%` }}></div>
            </div>
          </div>
          {/* Subcontratos */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#F8FAFC] font-medium">Subcontratos</span>
              <span className="text-[#94A3B8] font-mono text-[11px]">{recursos.subcontratos.actual} / {recursos.subcontratos.total}</span>
            </div>
            <div className="w-full bg-[#1E293B] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#8B5CF6] h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(139,92,246,0.4)]" style={{ width: `${(recursos.subcontratos.actual / recursos.subcontratos.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <button className="text-[#4F6BFF] text-[11px] font-medium hover:underline mt-3 self-start transition-colors">Ver balance de recursos →</button>
      </div>
    </div>
  );
}
