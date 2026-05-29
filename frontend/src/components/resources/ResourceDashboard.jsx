import React from 'react';
import useResourceStore from '../../store/useResourceStore';
import { Package, CheckCircle2, Cog, Ban, DollarSign } from 'lucide-react';

const KPICard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
  <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 flex flex-col relative overflow-hidden group hover:border-[#334155] transition-colors">
    <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 blur-xl ${colorClass}`}></div>
    <div className="flex justify-between items-start mb-2 relative z-10">
      <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">{title}</span>
      <div className={`p-1.5 rounded-lg bg-[#0B1120] ${colorClass.replace('bg-', 'text-')}`}>
        <Icon size={16} />
      </div>
    </div>
    <div className="flex items-end gap-2 relative z-10">
      <h3 className="text-3xl font-bold text-[#F8FAFC] leading-none">{value}</h3>
      {subtitle && <span className="text-[10px] text-[#94A3B8] mb-1">{subtitle}</span>}
    </div>
  </div>
);

export default function ResourceDashboard() {
  const kpis = useResourceStore(state => state.kpis);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <KPICard 
        title="Total Recursos" 
        value={kpis.total} 
        subtitle="Activos en el proyecto"
        icon={Package} 
        colorClass="bg-[#8B5CF6]" 
      />
      <KPICard 
        title="Disponibles" 
        value={kpis.disponibles} 
        subtitle={`${Math.round((kpis.disponibles / kpis.total) * 100) || 0}% del total`}
        icon={CheckCircle2} 
        colorClass="bg-[#10B981]" 
      />
      <KPICard 
        title="En Uso" 
        value={kpis.en_uso} 
        subtitle={`${Math.round((kpis.en_uso / kpis.total) * 100) || 0}% del total`}
        icon={Cog} 
        colorClass="bg-[#F59E0B]" 
      />
      <KPICard 
        title="Reservados" 
        value={kpis.reservados} 
        subtitle={`${Math.round((kpis.reservados / kpis.total) * 100) || 0}% del total`}
        icon={Ban} 
        colorClass="bg-[#EF4444]" 
      />
      <KPICard 
        title="Costo Mensual" 
        value={`$${kpis.costo_mensual.toLocaleString()}`} 
        subtitle="Costo proyectado"
        icon={DollarSign} 
        colorClass="bg-[#3B82F6]" 
      />
    </div>
  );
}
