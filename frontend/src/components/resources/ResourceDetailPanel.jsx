import React from 'react';
import useResourceStore from '../../store/useResourceStore';
import { X, Sparkles, Image as ImageIcon, MapPin, DollarSign, Activity, FileSpreadsheet } from 'lucide-react';

export default function ResourceDetailPanel() {
  const selectedResource = useResourceStore(state => state.selectedResource);
  const setSelectedResource = useResourceStore(state => state.setSelectedResource);

  if (!selectedResource) return null;

  return (
    <div className="w-[350px] bg-[#111827] border-l border-[#1E293B] flex flex-col h-full flex-shrink-0 relative shadow-[-10px_0_30px_rgba(0,0,0,0.2)]">
      
      {/* Header */}
      <div className="p-4 border-b border-[#1E293B] flex justify-between items-start bg-[#0B1120]/50">
        <div>
          <h2 className="text-[#F8FAFC] font-bold text-lg leading-tight">{selectedResource.nombre}</h2>
          <p className="text-[#94A3B8] text-xs uppercase tracking-wider">{selectedResource.categoria}</p>
        </div>
        <button 
          onClick={() => setSelectedResource(null)}
          className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-4 flex flex-col gap-6">
        
        {/* Photo Placeholder */}
        <div className="w-full h-40 bg-[#0B1120] border border-[#1E293B] rounded-xl flex flex-col items-center justify-center text-[#334155]">
          <ImageIcon size={32} className="mb-2" />
          <span className="text-xs">Sin previsualización</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0B1120] border border-[#1E293B] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-[#94A3B8]" />
              <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Ubicación</span>
            </div>
            <span className="text-sm font-semibold text-[#F8FAFC]">{selectedResource.ubicacion}</span>
          </div>
          <div className="bg-[#0B1120] border border-[#1E293B] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-[#94A3B8]" />
              <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Costo Unit.</span>
            </div>
            <span className="text-sm font-semibold text-[#F8FAFC]">${selectedResource.costo_unitario}</span>
          </div>
        </div>

        {/* AI Action */}
        <button className="w-full bg-gradient-to-r from-[#8B5CF6]/10 to-[#8B5CF6]/20 border border-[#8B5CF6]/50 hover:border-[#8B5CF6] hover:from-[#8B5CF6]/20 hover:to-[#8B5CF6]/30 text-[#F8FAFC] font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-all group shadow-[0_0_15px_rgba(139,92,246,0.1)]">
          <Sparkles size={18} className="text-[#8B5CF6] group-hover:animate-pulse" />
          Optimizar con IA
        </button>

        {/* Chart Placeholders */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-[#94A3B8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Uso en el Tiempo</h3>
          </div>
          <div className="w-full h-32 bg-[#0B1120] border border-[#1E293B] rounded-xl relative overflow-hidden flex items-end px-4 gap-2 pb-2">
            <div className="w-full h-full absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20"></div>
            {/* Fake Chart Bars */}
            <div className="w-1/6 bg-[#8B5CF6]/40 h-1/3 rounded-t z-10"></div>
            <div className="w-1/6 bg-[#8B5CF6]/60 h-2/3 rounded-t z-10"></div>
            <div className="w-1/6 bg-[#8B5CF6]/80 h-[90%] rounded-t z-10"></div>
            <div className="w-1/6 bg-[#8B5CF6] h-1/2 rounded-t z-10"></div>
            <div className="w-1/6 bg-[#8B5CF6]/50 h-1/4 rounded-t z-10"></div>
            <div className="w-1/6 bg-[#8B5CF6]/70 h-3/4 rounded-t z-10"></div>
          </div>
        </div>

        {/* Tasks Assigned */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <FileSpreadsheet size={16} className="text-[#94A3B8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Asignaciones Activas</h3>
          </div>
          <div className="w-full bg-[#0B1120] border border-[#1E293B] rounded-xl p-3 flex justify-between items-center text-sm">
            <span className="text-[#F8FAFC]">Excavación Sector Norte</span>
            <span className="text-[#10B981] font-bold text-xs bg-[#10B981]/10 px-2 py-1 rounded">Activo</span>
          </div>
          <div className="w-full bg-[#0B1120] border border-[#1E293B] rounded-xl p-3 flex justify-between items-center text-sm opacity-50">
            <span className="text-[#F8FAFC] line-through">Transporte Materiales</span>
            <span className="text-[#94A3B8] font-bold text-xs bg-[#1E293B] px-2 py-1 rounded">Finalizado</span>
          </div>
        </div>

      </div>
    </div>
  );
}
