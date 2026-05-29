import React, { useState, memo } from 'react';
import useProjectBuilderStore from '../../store/useProjectBuilderStore';
import { ChevronDown, ChevronUp, UploadCloud } from 'lucide-react';
import useProjectAutosave from '../../hooks/useProjectAutosave';

// --- Reusable Internal UI Components ---

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

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-xs font-medium text-[#94A3B8]">{label}</span>
    <button 
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-[#8B5CF6]' : 'bg-[#1E293B]'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
    </button>
  </div>
);

const Slider = ({ label, value, min, max, step, onChange, displayValue }) => (
  <div className="flex flex-col gap-2 py-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium text-[#94A3B8] uppercase">{label}</span>
      <span className="text-xs font-bold text-[#F8FAFC]">{displayValue || value}</span>
    </div>
    <input 
      type="range" 
      min={min} max={max} step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
    />
  </div>
);

const InputField = ({ label, type = "text", value, onChange, placeholder, className = "" }) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-xs font-medium text-[#94A3B8]">{label}</label>
    <input 
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      className={`w-full bg-[#0B1120] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#334155] focus:outline-none focus:border-[#8B5CF6] transition-colors ${className}`}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-xs font-medium text-[#94A3B8]">{label}</label>
    <div className="relative">
      <select 
        value={value} onChange={onChange}
        className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md pl-3 pr-8 py-2 text-sm text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#8B5CF6] transition-colors"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
    </div>
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-[#94A3B8]">{label}</label>
    <textarea 
      value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#334155] focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
    />
  </div>
);

// --- Sections (Memoized for Performance) ---

const RestriccionesSection = memo(({ data, update }) => (
  <div className="flex flex-col gap-4 py-2">
    <SelectField label="Tipo restricción" value={data.tipo} onChange={e => update('tipo', e.target.value)} options={['Tiempo', 'Costo', 'Alcance', 'Recursos']} />
    <InputField label="Nombre" value={data.nombre} onChange={e => update('nombre', e.target.value)} placeholder="Ej: Presupuesto máximo" />
    <TextAreaField label="Descripción" value={data.descripcion} onChange={e => update('descripcion', e.target.value)} />
    <div className="flex gap-4">
      <SelectField label="Severidad" value={data.severidad} onChange={e => update('severidad', e.target.value)} options={['Baja', 'Media', 'Alta', 'Crítica']} />
      <SelectField label="Impacto" value={data.impacto[0] || 'Tiempo'} onChange={e => update('impacto', [e.target.value])} options={['Tiempo', 'Costo', 'Calidad']} />
    </div>
    <div className="flex gap-4">
      <InputField type="number" label="Valor límite" value={data.valorLimite} onChange={e => update('valorLimite', e.target.value)} />
      <SelectField label="Unidad" value={data.unidad} onChange={e => update('unidad', e.target.value)} options={['días', 'USD', '%', 'horas']} />
    </div>
    <div className="flex gap-4">
      <InputField type="date" label="Fecha Inicio" value={data.fechaInicio} onChange={e => update('fechaInicio', e.target.value)} className="[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
      <InputField type="date" label="Fecha Fin" value={data.fechaFin} onChange={e => update('fechaFin', e.target.value)} className="[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
    </div>
    <Toggle label="Flexible" checked={data.flexible} onChange={v => update('flexible', v)} />
  </div>
));

const SupuestosSection = memo(({ data, update }) => (
  <div className="flex flex-col gap-4 py-2">
    <InputField label="Nombre corto" value={data.nombre} onChange={e => update('nombre', e.target.value)} placeholder="Ej: Entrega de materiales a tiempo" />
    <TextAreaField label="Descripción" value={data.descripcion} onChange={e => update('descripcion', e.target.value)} />
    <Slider label="Probabilidad cumplimiento" value={data.probabilidad} min={0} max={100} step={1} displayValue={`${data.probabilidad}%`} onChange={v => update('probabilidad', v)} />
    <SelectField label="Riesgo asociado" value={data.riesgoAsociado} onChange={e => update('riesgoAsociado', e.target.value)} options={['Ninguno', 'Retraso proveedor', 'Clima', 'Presupuesto']} />
    <InputField label="Fuente" value={data.fuente} onChange={e => update('fuente', e.target.value)} placeholder="Ej: Contrato proveedor" />
    <InputField type="date" label="Fecha validación" value={data.fechaValidacion} onChange={e => update('fechaValidacion', e.target.value)} className="[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
    <Toggle label="Activo" checked={data.activo} onChange={v => update('activo', v)} />
  </div>
));

const KPIsSection = memo(({ data, update }) => (
  <div className="flex flex-col gap-4 py-2">
    <InputField label="Nombre KPI" value={data.nombre} onChange={e => update('nombre', e.target.value)} placeholder="Ej: Eficiencia Energética" />
    <div className="flex gap-4">
      <SelectField label="Tipo KPI" value={data.tipo} onChange={e => update('tipo', e.target.value)} options={['Avance', 'Costo', 'Calidad', 'Seguridad']} />
      <SelectField label="Unidad" value={data.unidad} onChange={e => update('unidad', e.target.value)} options={['%', 'USD', 'Horas', 'Unidades']} />
    </div>
    <div className="flex gap-4">
      <InputField type="number" label="Objetivo" value={data.objetivo} onChange={e => update('objetivo', e.target.value)} />
      <InputField type="number" label="Valor actual" value={data.valorActual} onChange={e => update('valorActual', e.target.value)} />
    </div>
    <InputField label="Fórmula" value={data.formula} onChange={e => update('formula', e.target.value)} placeholder="Ej: (output / input) * 100" />
    <div className="flex gap-4 items-end">
      <InputField type="number" label="Umbral de alerta" value={data.umbralAlerta} onChange={e => update('umbralAlerta', e.target.value)} />
      <div className="space-y-1.5 flex-1">
        <label className="text-xs font-medium text-[#94A3B8]">Color de acento</label>
        <div className="flex items-center gap-2 bg-[#0B1120] border border-[#1E293B] rounded-md px-2 py-1.5 h-[38px]">
          <input type="color" value={data.color} onChange={e => update('color', e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0" />
          <span className="text-xs text-[#F8FAFC] uppercase">{data.color}</span>
        </div>
      </div>
    </div>
    <Toggle label="Visible en Dashboard" checked={data.visibleDashboard} onChange={v => update('visibleDashboard', v)} />
  </div>
));

const NotasSection = memo(({ data, update }) => (
  <div className="flex flex-col gap-4 py-2">
    <InputField label="Título nota" value={data.titulo} onChange={e => update('titulo', e.target.value)} placeholder="Ej: Acceso norte" />
    <SelectField label="Categoría" value={data.categoria} onChange={e => update('categoria', e.target.value)} options={['General', 'Riesgo', 'Técnica', 'Legal']} />
    {/* Rich Textarea mockup */}
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-[#94A3B8]">Contenido (Rich Text)</label>
        <div className="flex gap-2 text-[#94A3B8] text-[10px] font-bold">
          <button className="hover:text-white">B</button>
          <button className="italic hover:text-white">I</button>
          <button className="underline hover:text-white">U</button>
        </div>
      </div>
      <textarea 
        value={data.contenido} onChange={e => update('contenido', e.target.value)} rows={4}
        className="w-full bg-[#0B1120] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
      />
    </div>
    
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[#94A3B8]">Adjuntos</label>
      <label className="flex items-center justify-center gap-2 w-full border border-dashed border-[#334155] rounded-lg py-4 cursor-pointer hover:bg-[#1E293B]/30 transition-colors">
        <UploadCloud size={16} className="text-[#94A3B8]" />
        <span className="text-xs text-[#94A3B8]">Subir archivo</span>
        <input type="file" className="hidden" onChange={(e) => update('adjuntos', e.target.files[0]?.name)} />
      </label>
      {data.adjuntos && <p className="text-[10px] text-[#8B5CF6] truncate">{data.adjuntos}</p>}
    </div>

    <div className="flex gap-4">
      <SelectField label="Importancia" value={data.importancia} onChange={e => update('importancia', e.target.value)} options={['Baja', 'Media', 'Alta']} />
      <InputField type="date" label="Fecha" value={data.fecha} onChange={e => update('fecha', e.target.value)} className="[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
    </div>
    <Toggle label="Visible para IA" checked={data.visibleIA} onChange={v => update('visibleIA', v)} />
  </div>
));

const ConfiguracionSection = memo(({ data, update }) => (
  <div className="flex flex-col gap-2 py-2">
    <Slider label="Velocidad del timeline" value={data.velocidadTimeline} min={0.1} max={10} step={0.1} displayValue={`${data.velocidadTimeline}x`} onChange={v => update('velocidadTimeline', v)} />
    <SelectField label="Escala de tiempo" value={data.escalaTiempo} onChange={e => update('escalaTiempo', e.target.value)} options={['Minutos', 'Horas', 'Días', 'Semanas']} />
    <Slider label="Calidad de render" value={data.calidadRender === 'Alta' ? 3 : data.calidadRender === 'Media' ? 2 : 1} min={1} max={3} step={1} displayValue={data.calidadRender} onChange={v => update('calidadRender', v === 3 ? 'Alta' : v === 2 ? 'Media' : 'Baja')} />
    <Slider label="FPS Objetivo" value={data.fpsObjetivo} min={30} max={120} step={30} displayValue={data.fpsObjetivo} onChange={v => update('fpsObjetivo', v)} />
    <Slider label="Zoom Máximo" value={data.zoomMaximo} min={1} max={10} step={1} displayValue={`${data.zoomMaximo}x`} onChange={v => update('zoomMaximo', v)} />
    
    <div className="h-px bg-[#1E293B] my-2"></div>
    
    <Toggle label="Simulación realtime" checked={data.simulacionRealtime} onChange={v => update('simulacionRealtime', v)} />
    <Toggle label="IA predictiva activa" checked={data.iaActiva} onChange={v => update('iaActiva', v)} />
    <Toggle label="Riesgos automáticos" checked={data.riesgosAutomaticos} onChange={v => update('riesgosAutomaticos', v)} />
    <Toggle label="Clima dinámico" checked={data.climaDinamico} onChange={v => update('climaDinamico', v)} />
    <Toggle label="AutoSave" checked={data.autoSave} onChange={v => update('autoSave', v)} />
  </div>
));

// --- Main Container ---

export default function ProjectAccordions() {
  const { 
    restricciones, supuestos, kpis, notas, configuracion 
  } = useProjectBuilderStore(state => state.accordionsState);
  
  const updateAccordionField = useProjectBuilderStore(state => state.updateAccordionField);

  // Initialize AutoSave logic
  useProjectAutosave();

  return (
    <div className="flex flex-col">
      <Accordion title="Restricciones">
        <RestriccionesSection data={restricciones} update={(f, v) => updateAccordionField('restricciones', f, v)} />
      </Accordion>
      
      <Accordion title="Supuestos">
        <SupuestosSection data={supuestos} update={(f, v) => updateAccordionField('supuestos', f, v)} />
      </Accordion>
      
      <Accordion title="Metas / KPI">
        <KPIsSection data={kpis} update={(f, v) => updateAccordionField('kpis', f, v)} />
      </Accordion>
      
      <Accordion title="Notas Adicionales">
        <NotasSection data={notas} update={(f, v) => updateAccordionField('notas', f, v)} />
      </Accordion>
      
      <Accordion title="Configuración del Proyecto">
        <ConfiguracionSection data={configuracion} update={(f, v) => updateAccordionField('configuracion', f, v)} />
      </Accordion>
    </div>
  );
}
