import React, { useState } from 'react';
import useProjectBuilderStore from '../../store/useProjectBuilderStore';
import { 
  X, 
  ChevronDown, 
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  MapPin,
  CircleDot,
  Sparkles
} from 'lucide-react';
import ProjectAccordions from './ProjectAccordions';

const Accordion = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#1E293B]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-6 bg-[#111827] hover:bg-[#1E293B]/30 transition-colors"
      >
        <span className="text-xs font-bold text-[#F8FAFC] tracking-wider uppercase">{title}</span>
        {isOpen ? <ChevronUp size={16} className="text-[#94A3B8]" /> : <ChevronDown size={16} className="text-[#94A3B8]" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 bg-[#111827]">
          {children}
        </div>
      )}
    </div>
  );
};

export default function ProjectPropertiesPanel() {
  const formData = useProjectBuilderStore(state => state.formData);
  const updateForm = useProjectBuilderStore(state => state.updateForm);
  const openAssetModal = useProjectBuilderStore(state => state.openAssetModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);
  };

  const [isPanelOpen, setIsPanelOpen] = useState(true);

  if (!isPanelOpen) {
    return (
      <div className="h-full bg-[#111827] border-l border-[#1E293B] flex flex-col flex-shrink-0 relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.2)] w-12 items-center pt-4 transition-all duration-300">
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors"
          title="Abrir panel"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[400px] h-full bg-[#111827] border-l border-[#1E293B] flex flex-col flex-shrink-0 relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.2)] transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#1E293B] h-16 flex-shrink-0">
        <h2 className="text-base font-bold text-[#F8FAFC]">Propiedades del Proyecto</h2>
        <button onClick={() => setIsPanelOpen(false)} className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors p-1">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        
        {/* Datos Generales */}
        <div className="p-6 border-b border-[#1E293B]">
          <h3 className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase mb-6">Datos Generales</h3>
          
          <div className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94A3B8] flex items-center gap-1">
                Nombre del proyecto <span className="text-[#EF4444]">*</span>
              </label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Construcción Edificio..."
                className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#334155] focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <div className="space-y-1.5 flex-1">
                <label className="text-xs font-medium text-[#94A3B8]">Código / ID</label>
                <input 
                  type="text" 
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="PRY-2026-001"
                  className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#334155] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="text-xs font-medium text-[#94A3B8]">Tipo de proyecto</label>
                <div className="relative">
                  <select 
                    name="tipo_proyecto"
                    value={formData.tipo_proyecto}
                    onChange={handleChange}
                    className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  >
                    <option>Construcción</option>
                    <option>Tecnología</option>
                    <option>Consultoría</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94A3B8]">Descripción</label>
              <textarea 
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Escribe una breve descripción del alcance..."
                rows={3}
                className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#334155] focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="space-y-1.5 flex-1 relative">
                <label className="text-xs font-medium text-[#94A3B8]">Ubicación</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input 
                    type="text" 
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    placeholder="Ciudad, País"
                    className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md pl-8 pr-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#334155] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="text-xs font-medium text-[#94A3B8]">Estado</label>
                <div className="relative">
                  <CircleDot size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#06B6D4]" />
                  <select 
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md pl-8 pr-3 py-2 text-sm text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  >
                    <option>En planificación</option>
                    <option>En ejecución</option>
                    <option>Completado</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col">
          <Accordion title="Visual del Proyecto" defaultOpen={true}>
            <div className="flex flex-col gap-3 py-2">
              <p className="text-xs text-[#94A3B8]">Gestiona los gráficos 2D/3D vinculados al lienzo central de este proyecto.</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Añadir gráfico clicked! openAssetModal is:", openAssetModal);
                  if (openAssetModal) openAssetModal();
                  else console.error("openAssetModal function is undefined in store!");
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-lg text-sm font-medium text-[#F8FAFC] transition-colors shadow-sm"
              >
                + Añadir gráfico
              </button>
            </div>
          </Accordion>
          
          <ProjectAccordions />
        </div>

      </div>

      {/* Sticky Footer */}
      <div className="p-4 border-t border-[#1E293B] bg-[#111827] flex items-center justify-between flex-shrink-0 gap-3">
        <button className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
          Cancelar
        </button>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] bg-transparent hover:bg-[#1E293B] border border-transparent hover:border-[#1E293B] px-4 py-2 rounded-lg transition-colors">
            Guardar borrador
          </button>
          <button className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] px-6 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <Sparkles size={16} />
            Guardar proyecto
          </button>
        </div>
      </div>

    </div>
  );
}
