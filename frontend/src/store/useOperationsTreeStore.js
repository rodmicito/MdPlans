import { create } from 'zustand';

const initialProjectData = {
  proyecto: {
    id: "PRY-2026-001",
    nombre: "Edificio Corporativo 5 Pisos",
    estado: "activo",
    configuracion: {
      timeline_speed: 1.0,
      escala_tiempo: "dias",
      simulacion_realtime: true,
      ia_activa: true
    },
    timeline: {
      calendario: { estado: "completado" },
      hitos_principales: [
        { id: "h1", nombre: "Cimentación", estado: "completado" },
        { id: "h2", nombre: "Estructura Base", estado: "en_progreso" }
      ],
      fases: 5
    },
    recursos: {
      mano_obra: [
        { id: "r1", nombre: "Juan Pérez (Operador)", estado: "en_uso" },
        { id: "r2", nombre: "Cuadrilla A", estado: "disponible" }
      ],
      maquinaria: [
        { id: "m1", nombre: "Excavadora CAT 320", estado: "en_uso" },
        { id: "m2", nombre: "Grúa Torre", estado: "disponible" }
      ],
      materiales: [
        { id: "mat1", nombre: "Cemento Portland", estado: "disponible" }
      ],
      equipos: []
    },
    tareas: [
      { id: "t1", nombre: "Excavación", estado: "en_riesgo" },
      { id: "t2", nombre: "Estructura", "estado": "en_progreso" },
      { id: "t3", nombre: "Arquitectura", "estado": "completado" },
      { id: "t4", nombre: "Instalaciones", "estado": "pendiente" }
    ],
    riesgos: [
      { id: "rk1", nombre: "Retraso en entrega de acero", estado: "en_riesgo" }
    ],
    eventos: [
      { id: "ev1", nombre: "Lluvia intensa", estado: "en_progreso" }
    ],
    kpis_metas: {
      avance_fisico: "62.4%",
      costo_actual: "$245,680"
    },
    supuestos: [
      { id: "sup1", nombre: "Permisos aprobados", estado: "completado" }
    ],
    simulacion: {
      estado: "en_progreso",
      escenario_actual: "Base"
    },
    assets_visuales: [
      { id: "a1", nombre: "edificio_moderno.webp", estado: "completado" }
    ],
    ia_predicciones: [
      { id: "ia1", nombre: "Alerta: Retraso Estructura", estado: "en_riesgo" }
    ]
  }
};

const useOperationsTreeStore = create((set) => ({
  isTreeOpen: true,
  activeTab: 'arbol',
  searchQuery: '',
  selectedNodeId: null,
  projectData: initialProjectData,

  toggleTree: () => set((state) => ({ isTreeOpen: !state.isTreeOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
}));

export default useOperationsTreeStore;
