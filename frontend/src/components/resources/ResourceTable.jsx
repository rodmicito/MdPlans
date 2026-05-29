import React from 'react';
import useResourceStore from '../../store/useResourceStore';
import { Wrench, User, Box, Search, Filter, Plus } from 'lucide-react';

const ResourceIcon = ({ tipo }) => {
  switch(tipo) {
    case 'Equipo': return <div className="p-2 bg-[#1E293B] rounded-lg"><Wrench size={18} className="text-[#94A3B8]" /></div>;
    case 'Humano': return <div className="p-2 bg-[#1E293B] rounded-lg"><User size={18} className="text-[#94A3B8]" /></div>;
    case 'Material': return <div className="p-2 bg-[#1E293B] rounded-lg"><Box size={18} className="text-[#94A3B8]" /></div>;
    default: return <div className="p-2 bg-[#1E293B] rounded-lg"><Box size={18} className="text-[#94A3B8]" /></div>;
  }
};

const StatusBadge = ({ estado }) => {
  let bg = 'bg-[#1E293B]', text = 'text-[#94A3B8]';
  if (estado === 'En uso') { bg = 'bg-[#F59E0B]/20'; text = 'text-[#F59E0B]'; }
  if (estado === 'Disponible') { bg = 'bg-[#10B981]/20'; text = 'text-[#10B981]'; }
  if (estado === 'Reservado') { bg = 'bg-[#EF4444]/20'; text = 'text-[#EF4444]'; }
  
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${bg} ${text}`}>
      {estado}
    </span>
  );
};

export default function ResourceTable() {
  const resources = useResourceStore(state => state.resources);
  const selectedResource = useResourceStore(state => state.selectedResource);
  const setSelectedResource = useResourceStore(state => state.setSelectedResource);

  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-xl flex flex-col flex-1 overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-[#1E293B] flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 items-center flex-1 min-w-[250px]">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Buscar recurso por nombre o ID..."
              className="w-full bg-[#0B1120] border border-[#1E293B] rounded-lg pl-10 pr-4 py-2 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#8B5CF6] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#0B1120] border border-[#1E293B] hover:border-[#334155] rounded-lg text-sm text-[#94A3B8] transition-colors">
            <Filter size={16} /> Filtros
          </button>
        </div>
        
        <button className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} /> Agregar Recurso
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1E293B] bg-[#0B1120]/50 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
        <div className="col-span-4">Recurso</div>
        <div className="col-span-3">Tipo / Cat</div>
        <div className="col-span-2">Estado</div>
        <div className="col-span-3">Disponibilidad / Uso</div>
      </div>

      {/* Table Body */}
      <div className="overflow-y-auto flex-1">
        {resources.map(resource => (
          <div 
            key={resource.id}
            onClick={() => setSelectedResource(resource)}
            className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1E293B]/50 hover:bg-[#1E293B]/30 cursor-pointer transition-colors items-center ${selectedResource?.id === resource.id ? 'bg-[#1E293B]/50 border-l-2 border-l-[#8B5CF6]' : 'border-l-2 border-l-transparent'}`}
          >
            {/* Recurso */}
            <div className="col-span-4 flex items-center gap-3">
              <ResourceIcon tipo={resource.tipo} />
              <div>
                <p className="text-sm font-bold text-[#F8FAFC] leading-tight">{resource.nombre}</p>
                <p className="text-[10px] text-[#94A3B8]">ID: {resource.id}</p>
              </div>
            </div>

            {/* Tipo */}
            <div className="col-span-3">
              <p className="text-sm font-medium text-[#E2E8F0] leading-tight">{resource.tipo}</p>
              <p className="text-[10px] text-[#94A3B8]">{resource.categoria}</p>
            </div>

            {/* Estado */}
            <div className="col-span-2">
              <StatusBadge estado={resource.estado} />
            </div>

            {/* Disponibilidad y Uso */}
            <div className="col-span-3 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#F8FAFC]">{resource.uso_actual}% en uso</span>
                <span className="text-[10px] text-[#94A3B8] truncate ml-2 max-w-[100px]" title={resource.disponibilidad}>
                  {resource.disponibilidad}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${resource.uso_actual > 85 ? 'bg-[#EF4444]' : resource.uso_actual > 50 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}`}
                  style={{ width: `${resource.uso_actual}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-3 border-t border-[#1E293B] bg-[#0B1120]/50 text-xs text-[#94A3B8] flex justify-between items-center">
        <span>Mostrando {resources.length} resultados</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 hover:bg-[#1E293B] rounded transition-colors">&lt;</button>
          <button className="px-2 py-1 bg-[#8B5CF6] text-white rounded transition-colors">1</button>
          <button className="px-2 py-1 hover:bg-[#1E293B] rounded transition-colors">2</button>
          <button className="px-2 py-1 hover:bg-[#1E293B] rounded transition-colors">&gt;</button>
        </div>
      </div>
    </div>
  );
}
