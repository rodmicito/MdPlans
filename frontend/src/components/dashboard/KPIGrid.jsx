import React from 'react';
import useProjectStore from '../../store/useProjectStore';
import { Clock, DollarSign, TrendingUp, Briefcase } from 'lucide-react';

export default function KPIGrid() {
  const kpis = useProjectStore(state => state.project?.kpis);

  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* KPI 1: Progreso Físico */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 flex items-center gap-4 hover:border-[#4F6BFF]/40 transition-colors group">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
            <path
              className="text-[#1E293B]"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#06B6D4] transition-all duration-500 ease-out"
              strokeWidth="3"
              strokeDasharray={`${kpis.avance_fisico}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#F8FAFC]">
            {kpis.avance_fisico}%
          </div>
        </div>
        <div>
          <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Progreso Físico</p>
          <p className="text-sm font-medium text-[#22C55E]">{kpis.tendencia_avance}</p>
        </div>
      </div>

      {/* KPI 2: Tiempo Restante */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 flex flex-col justify-center relative overflow-hidden hover:border-[#4F6BFF]/40 transition-colors">
        <div className="absolute top-4 right-4 text-[#4F6BFF] opacity-10"><Clock size={40} /></div>
        <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Tiempo Restante</p>
        <p className="text-2xl font-bold text-[#F8FAFC]">{kpis.tiempo_restante_dias} <span className="text-sm font-normal text-[#94A3B8]">días</span></p>
        <p className="text-xs text-[#94A3B8] mt-1">Fin est: {kpis.fecha_fin_estimada}</p>
      </div>

      {/* KPI 3: Costo Actual */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 flex flex-col justify-center relative overflow-hidden hover:border-[#4F6BFF]/40 transition-colors">
        <div className="absolute top-4 right-4 text-[#F59E0B] opacity-10"><DollarSign size={40} /></div>
        <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Costo Actual (AC)</p>
        <p className="text-2xl font-bold text-[#F8FAFC]">${kpis.costo_actual.toLocaleString()}</p>
        <p className="text-xs text-[#EF4444] mt-1">{kpis.tendencia_costo}</p>
      </div>

      {/* KPI 4: Índice de Desempeño */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 flex flex-col justify-center relative overflow-hidden hover:border-[#4F6BFF]/40 transition-colors">
        <div className="absolute top-4 right-4 text-[#8B5CF6] opacity-10"><TrendingUp size={40} /></div>
        <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Índice de Desempeño</p>
        <div className="flex items-end gap-2">
           <p className="text-2xl font-bold text-[#F8FAFC]">{kpis.indice_desempeno}</p>
        </div>
        <p className="text-xs text-[#94A3B8] mt-1">CPI: {kpis.cpi} | SPI: {kpis.spi}</p>
      </div>

      {/* KPI 5: Presupuesto */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 flex flex-col justify-center relative overflow-hidden hover:border-[#4F6BFF]/40 transition-colors">
        <div className="absolute top-4 right-4 text-[#22C55E] opacity-10"><Briefcase size={40} /></div>
        <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Presupuesto</p>
        <p className="text-2xl font-bold text-[#F8FAFC]">${(kpis.presupuesto_total / 1000000).toFixed(2)}M</p>
        <p className="text-xs text-[#22C55E] mt-1">{kpis.presupuesto_ejecutado_porcentaje}% ejecutado</p>
      </div>
    </div>
  );
}
