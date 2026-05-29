import React, { useState } from 'react';
import useProjectBuilderStore from '../../store/useProjectBuilderStore';
import { 
  X, 
  Search, 
  ChevronDown, 
  LayoutGrid, 
  List,
  CheckCircle2,
  MousePointerClick,
  Move,
  RotateCw,
  Maximize,
  Trash2,
  Info
} from 'lucide-react';

const MOCK_ASSETS = [
  { id: 1, title: 'edificio_moderno', format: 'WEBP', type: 'EDIFICIO', dimensions: '1024 x 1024', style: 'Isométrico - Semi Flat', source: 'Biblioteca', tags: ['edificio', 'moderno', 'corporativo'], url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'edificio_industrial', format: 'WEBP', type: 'EDIFICIO', dimensions: '1024 x 1024', style: 'Realista', source: 'Biblioteca', tags: ['industrial', 'fábrica'], url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'almacen_01', format: 'WEBP', type: 'INFRAESTRUCTURA', dimensions: '800 x 800', style: '3D Render', source: 'Biblioteca', tags: ['almacén', 'logística'], url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80' },
  { id: 4, title: 'casa_oficina', format: 'WEBP', type: 'EDIFICIO', dimensions: '1024 x 1024', style: 'Isométrico', source: 'Biblioteca', tags: ['oficina', 'pequeño'], url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
  { id: 5, title: 'grua_torre', format: 'SVG', type: 'MAQUINARIA', dimensions: 'Vector', style: 'Flat', source: 'Biblioteca', tags: ['grúa', 'construcción'], url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80' },
  { id: 6, title: 'excavadora_01', format: 'PNG', type: 'MAQUINARIA', dimensions: '512 x 512', style: 'Realista', source: 'Biblioteca', tags: ['excavadora', 'pesada'], url: 'https://images.unsplash.com/photo-1579928509371-d102dc87e6fa?auto=format&fit=crop&w=400&q=80' },
  { id: 7, title: 'camion_volquete', format: 'PNG', type: 'MAQUINARIA', dimensions: '512 x 512', style: 'Realista', source: 'Biblioteca', tags: ['camión', 'transporte'], url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80' },
  { id: 8, title: 'hormigonera', format: 'PNG', type: 'MAQUINARIA', dimensions: '512 x 512', style: '3D Render', source: 'Biblioteca', tags: ['cemento', 'mezcladora'], url: 'https://images.unsplash.com/photo-1541888081691-10c0e7379f8f?auto=format&fit=crop&w=400&q=80' },
  { id: 9, title: 'andamio_01', format: 'PNG', type: 'EQUIPO', dimensions: '512 x 512', style: 'Isométrico', source: 'Biblioteca', tags: ['andamio', 'seguridad'], url: 'https://images.unsplash.com/photo-1534320478175-52cd65882cd4?auto=format&fit=crop&w=400&q=80' },
];

export default function AssetStudioModal() {
  const isAssetModalOpen = useProjectBuilderStore(state => state.modalState?.isAssetModalOpen);
  const closeAssetModal = useProjectBuilderStore(state => state.closeAssetModal);
  const setSelectedAssetGlobal = useProjectBuilderStore(state => state.setSelectedAsset);

  const [activeTab, setActiveTab] = useState('Biblioteca');
  const [selectedAssetId, setSelectedAssetId] = useState(1);

  console.log("AssetStudioModal render! isAssetModalOpen:", isAssetModalOpen);

  if (!isAssetModalOpen) {
    return null;
  }

  const selectedAsset = MOCK_ASSETS.find(a => a.id === selectedAssetId);

  const handleConfirmSelection = () => {
    if (selectedAsset) {
      setSelectedAssetGlobal(selectedAsset);
      closeAssetModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1120]/80 backdrop-blur-sm p-6">
      <div className="w-full max-w-5xl bg-[#111827] border border-[#1E293B] rounded-xl shadow-2xl flex flex-col h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1E293B]">
          <h2 className="text-xs font-bold text-[#F8FAFC] tracking-widest uppercase">Añadir Visual al Proyecto</h2>
          <button onClick={closeAssetModal} className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 border-b border-[#1E293B] flex items-center gap-6">
          {['Biblioteca', 'Subir archivo', 'Generar con IA', 'Favoritos', 'Recientes'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium transition-colors border-b-2 relative -bottom-px ${activeTab === tab ? 'text-[#8B5CF6] border-[#8B5CF6]' : 'text-[#94A3B8] hover:text-[#F8FAFC] border-transparent'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="p-5 flex items-center justify-between bg-[#0B1120]/50 border-b border-[#1E293B]">
          <div className="flex items-center gap-3 w-full max-w-md">
            <div className="relative">
              <select className="bg-[#1E293B] border border-[#334155] text-[#F8FAFC] text-sm rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#8B5CF6]">
                <option>Tipo: Todos</option>
                <option>Edificios</option>
                <option>Maquinaria</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            </div>
            
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input 
                type="text" 
                placeholder="Buscar assets..." 
                className="w-full bg-[#111827] border border-[#1E293B] text-[#F8FAFC] text-sm rounded-md pl-9 pr-3 py-2 focus:outline-none focus:border-[#8B5CF6] placeholder:text-[#334155]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-[#94A3B8] cursor-pointer hover:text-[#F8FAFC]">
              <span>Ordenar: Más recientes</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center bg-[#1E293B] rounded-md p-1">
              <button className="p-1.5 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded shadow-sm">
                <LayoutGrid size={16} />
              </button>
              <button className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC]">
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Grid Area */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#0B1120]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {MOCK_ASSETS.map((asset) => {
              const isSelected = selectedAssetId === asset.id;
              return (
                <div 
                  key={asset.id} 
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={`relative flex flex-col group cursor-pointer rounded-xl overflow-hidden transition-all ${isSelected ? 'ring-2 ring-[#8B5CF6] bg-[#111827]' : 'hover:bg-[#111827] border border-transparent hover:border-[#1E293B]'}`}
                >
                  <div className="aspect-square bg-[#1E293B]/50 p-2 relative flex items-center justify-center">
                    <img src={asset.url} alt={asset.title} className="max-w-full max-h-full object-contain drop-shadow-lg rounded-lg mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all" />
                    <span className="absolute bottom-2 left-2 bg-[#0B1120]/80 text-[#94A3B8] text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      {asset.format}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#8B5CF6] text-white rounded-full p-0.5 shadow-lg">
                        <CheckCircle2 size={16} fill="#8B5CF6" className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <p className={`text-xs font-medium truncate ${isSelected ? 'text-[#8B5CF6]' : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'}`}>{asset.title}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Preview Panel */}
        <div className="h-32 bg-[#111827] border-t border-[#1E293B] flex items-center p-5 gap-6">
          
          {/* Toolbar actions */}
          <div className="flex items-center gap-2 border-r border-[#1E293B] pr-6">
            <button className="flex flex-col items-center gap-1.5 p-2 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 rounded-lg transition-colors">
              <MousePointerClick size={18} />
              <span className="text-[9px] uppercase font-bold tracking-wider">Seleccionar</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors">
              <Move size={18} />
              <span className="text-[9px] uppercase font-bold tracking-wider">Mover</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors">
              <RotateCw size={18} />
              <span className="text-[9px] uppercase font-bold tracking-wider">Rotar</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors">
              <Maximize size={18} />
              <span className="text-[9px] uppercase font-bold tracking-wider">Escalar</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors">
              <Trash2 size={18} />
              <span className="text-[9px] uppercase font-bold tracking-wider">Eliminar</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors">
              <Info size={18} />
              <span className="text-[9px] uppercase font-bold tracking-wider">Info</span>
            </button>
          </div>

          {/* Metadata */}
          {selectedAsset && (
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-sm font-bold text-[#F8FAFC]">{selectedAsset.title}</h3>
                <span className="bg-[#8B5CF6]/20 text-[#8B5CF6] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {selectedAsset.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-2">
                <p>Formato: <span className="text-[#F8FAFC] font-medium">{selectedAsset.format}</span></p>
                <p>Dimensiones: <span className="text-[#F8FAFC] font-medium">{selectedAsset.dimensions}</span></p>
                <p>Estilo: <span className="text-[#F8FAFC] font-medium">{selectedAsset.style}</span></p>
                <p>Fuente: <span className="text-[#F8FAFC] font-medium">{selectedAsset.source}</span></p>
              </div>
              <div className="flex gap-2">
                {selectedAsset.tags.map(tag => (
                  <span key={tag} className="bg-[#1E293B] text-[#94A3B8] text-[10px] px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button onClick={closeAssetModal} className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors px-4">
              Cancelar
            </button>
            <button 
              onClick={handleConfirmSelection}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-sm font-semibold px-8 py-2.5 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
            >
              Seleccionar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
