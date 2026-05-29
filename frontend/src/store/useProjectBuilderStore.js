import { create } from 'zustand';

const useProjectBuilderStore = create((set) => ({
  formData: {
    nombre: '',
    codigo: '',
    descripcion: '',
    cliente: '',
    tipo_proyecto: 'Construcción',
    ubicacion: '',
    estado: 'En planificación',
    gerente: '',
    patrocinador: '',
    fecha_inicio: '',
    fecha_fin: '',
    presupuesto: '',
    moneda: 'USD'
  },
  canvasState: {
    zoom: 100,
    activeTool: 'pointer', // 'pointer' or 'hand'
    isGenerated: false,
    uploadedImage: null,
    selectedAsset: null
  },
  aiState: {
    isGenerating: false
  },
  modalState: {
    isAssetModalOpen: false
  },
  
  syncState: 'idle', // 'idle', 'saving', 'saved', 'error'

  setSyncState: (stateString) => set({ syncState: stateString }),

  accordionsState: {
    restricciones: { tipo: 'Tiempo', nombre: '', descripcion: '', severidad: 'Media', valorLimite: 0, unidad: 'días', fechaInicio: '', fechaFin: '', flexible: false, impacto: [] },
    supuestos: { nombre: '', descripcion: '', probabilidad: 50, riesgoAsociado: 'Ninguno', fuente: '', fechaValidacion: '', activo: true },
    kpis: { nombre: '', tipo: 'Avance', objetivo: 100, unidad: '%', valorActual: 0, formula: '', color: '#06B6D4', umbralAlerta: 80, visibleDashboard: true },
    notas: { titulo: '', contenido: '', categoria: 'General', adjuntos: null, importancia: 'Media', visibleIA: true, fecha: '' },
    configuracion: { velocidadTimeline: 1, escalaTiempo: 'Días', calidadRender: 'Alta', fpsObjetivo: 60, zoomMaximo: 5, simulacionRealtime: true, iaActiva: true, riesgosAutomaticos: true, climaDinamico: false, autoSave: true }
  },

  updateForm: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value
    }
  })),

  updateAccordionField: (section, field, value) => set((state) => ({
    accordionsState: {
      ...state.accordionsState,
      [section]: {
        ...state.accordionsState[section],
        [field]: value
      }
    }
  })),

  setCanvasState: (updates) => set((state) => ({
    canvasState: {
      ...state.canvasState,
      ...updates
    }
  })),

  setGenerating: (isGenerating) => set((state) => ({
    aiState: {
      ...state.aiState,
      isGenerating
    }
  })),

  openAssetModal: () => set((state) => ({
    modalState: { ...state.modalState, isAssetModalOpen: true }
  })),

  closeAssetModal: () => set((state) => ({
    modalState: { ...state.modalState, isAssetModalOpen: false }
  })),

  setSelectedAsset: (asset) => set((state) => ({
    canvasState: {
      ...state.canvasState,
      selectedAsset: asset,
      isGenerated: true // Ensure canvas displays the asset
    }
  }))
}));

export default useProjectBuilderStore;
