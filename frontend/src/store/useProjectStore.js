import { create } from 'zustand';

const initialMockData = {
  proyecto: {
    id: "PRJ-001",
    nombre: "Edificio Corporativo 5 Pisos",
    responsable: "Juan Pérez",
    rol: "Administrador",
    estado: "En progreso"
  },
  kpis: {
    avance_fisico: 62.4,
    tendencia_avance: "+3.2% vs ayer",
    tiempo_restante_dias: 128,
    fecha_fin_estimada: "18/09/2025",
    costo_actual: 245680,
    tendencia_costo: "+4.3% vs planificado",
    indice_desempeno: 0.93,
    cpi: 0.91,
    spi: 0.95,
    presupuesto_total: 1250000,
    presupuesto_ejecutado_porcentaje: 19.6
  },
  riesgos: [
    {
      id: "RSK-001",
      descripcion: "Retraso en entrega de material estructural",
      nivel: "Alto",
      probabilidad: 70,
      impacto: "Alto"
    },
    {
      id: "RSK-002",
      descripcion: "Clima lluvioso afecta productividad",
      nivel: "Medio",
      probabilidad: 45,
      impacto: "Medio"
    },
    {
      id: "RSK-003",
      descripcion: "Falla potencial en maquinaria crítica",
      nivel: "Medio",
      probabilidad: 30,
      impacto: "Medio"
    }
  ],
  recursos: {
    mano_obra: { actual: 72, total: 120 },
    equipos: { actual: 8, total: 15 },
    materiales: { porcentaje_disponible: 65 },
    subcontratos: { actual: 3, total: 6 }
  },
  ia: {
    recomendaciones: [
      {
        id: "IA-01",
        mensaje: "Agregar 1 cuadrilla de albañilería puede reducir 8 días en el plazo final.",
        impacto: "Alto"
      },
      {
        id: "IA-02",
        mensaje: "Reprogramar entrega de material estructural para evitar retrasos.",
        impacto: "Medio"
      },
      {
        id: "IA-03",
        mensaje: "Revisar rendimiento de equipo de excavación.",
        impacto: "Bajo"
      }
    ]
  },
  timeline_gantt: {
    meses_visibles: ["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
    tareas_activas: [
      { categoria: "Obras Preliminares", nombre: "Limpieza de Terreno", estado: "Completado" },
      { categoria: "Estructura", nombre: "Cimentación", estado: "En progreso" },
      { categoria: "Estructura", nombre: "Columnas y Vigas", estado: "En progreso" },
      { categoria: "Albañilería", nombre: "Muros y Tabiques", estado: "Retrasado" },
      { categoria: "Instalaciones", nombre: "Inst. Eléctricas", estado: "Pendiente" }
    ]
  }
};

const useProjectStore = create((set, get) => ({
  project: initialMockData,
  wsStatus: 'disconnected',
  simulationInterval: null,
  currentView: 'dashboard', // View switcher state

  setCurrentView: (view) => set({ currentView: view }),

  updateFromTick: (tickData) => set((state) => ({
    project: {
      ...state.project,
      ...tickData,
      kpis: {
        ...state.project.kpis,
        ...(tickData.kpis || {})
      }
    }
  })),

  startSimulation: () => {
    console.log("Iniciando simulación de Ticks locales...");
    // Simulamos un tick del WebSocket cada 2 segundos
    const interval = setInterval(() => {
       set((state) => {
         const currentAvance = state.project.kpis.avance_fisico;
         // Incrementamos el avance físico un poco para simular progreso vivo
         const newAvance = Math.min(100, currentAvance + (Math.random() * 0.5));
         
         return {
           project: {
             ...state.project,
             kpis: {
               ...state.project.kpis,
               avance_fisico: Number(newAvance.toFixed(1))
             }
           }
         };
       });
    }, 2000);

    set({ simulationInterval: interval });
  },

  stopSimulation: () => {
    const { simulationInterval } = get();
    if (simulationInterval) {
      clearInterval(simulationInterval);
      set({ simulationInterval: null });
    }
  },

  connectWebSocket: () => {
    // Aquí iría la lógica real de WebSockets que ya teníamos.
    // Para motivos de simulación, solo llamamos a startSimulation.
    set({ wsStatus: 'connected' });
    get().startSimulation();
  }
}));

export default useProjectStore;
