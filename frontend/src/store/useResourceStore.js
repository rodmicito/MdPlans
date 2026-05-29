import { create } from 'zustand';

// Mock data para probar la vista inmediatamente
const mockResources = [
  {
    id: "EQ-4029",
    nombre: "Excavadora CAT 320",
    tipo: "Equipo",
    categoria: "Maquinaria Pesada",
    estado: "En uso",
    disponibilidad: "10% (1 día disponible)",
    ubicacion: "Zona B",
    costo_unitario: 850,
    uso_actual: 90 // porcentaje
  },
  {
    id: "HM-0102",
    nombre: "Juan Pérez",
    tipo: "Humano",
    categoria: "Operador Senior",
    estado: "En uso",
    disponibilidad: "20% (2 días disponibles)",
    ubicacion: "Zona B",
    costo_unitario: 150,
    uso_actual: 80
  },
  {
    id: "MT-S900",
    nombre: "Cemento Portland",
    tipo: "Material",
    categoria: "Construcción",
    estado: "Disponible",
    disponibilidad: "75% (750 sacos)",
    ubicacion: "Almacén Central",
    costo_unitario: 12,
    uso_actual: 25
  },
  {
    id: "EQ-1055",
    nombre: "Grúa Torre Liebherr",
    tipo: "Equipo",
    categoria: "Maquinaria Pesada",
    estado: "Reservado",
    disponibilidad: "0% (Hasta 15/08)",
    ubicacion: "Zona A",
    costo_unitario: 1200,
    uso_actual: 100
  }
];

const useResourceStore = create((set, get) => ({
  resources: mockResources,
  selectedResource: null,
  
  // KPIs dinámicos
  kpis: {
    total: mockResources.length,
    disponibles: mockResources.filter(r => r.estado === 'Disponible').length,
    en_uso: mockResources.filter(r => r.estado === 'En uso').length,
    reservados: mockResources.filter(r => r.estado === 'Reservado').length,
    costo_mensual: 245850 // Mock de cálculo complejo
  },
  
  filters: {
    tipo: 'Todos',
    estado: 'Todos',
    rangoCostos: [0, 5000]
  },

  syncState: 'idle', // idle, saving, saved, error

  // Acciones locales
  setSelectedResource: (resource) => set({ selectedResource: resource }),
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  updateResourceStatus: (id, newStatus) => {
    set((state) => {
      const updatedResources = state.resources.map(r => 
        r.id === id ? { ...r, estado: newStatus } : r
      );
      return { 
        resources: updatedResources,
        kpis: {
          ...state.kpis,
          disponibles: updatedResources.filter(r => r.estado === 'Disponible').length,
          en_uso: updatedResources.filter(r => r.estado === 'En uso').length,
          reservados: updatedResources.filter(r => r.estado === 'Reservado').length,
        }
      };
    });
    // Dispara Autosave silencioso
    get().triggerAutosave();
  },

  // Preparación para eventos WebSockets
  handleWebSocketEvent: (event) => {
    const { type, payload } = event;
    switch (type) {
      case 'resource.updated':
      case 'resource.assigned':
      case 'resource.available':
        // En una app real, actualizaríamos el store aquí desde el servidor
        console.log(`Evento WS recibido: ${type}`, payload);
        break;
      case 'resource.conflict':
        console.warn('Conflicto detectado en asignación de recursos:', payload);
        break;
      default:
        break;
    }
  },

  // Lógica de Autosave
  triggerAutosave: () => {
    const currentState = get();
    set({ syncState: 'saving' });

    // Simulando debounce y petición PUT
    clearTimeout(window.resourceAutosaveTimer);
    window.resourceAutosaveTimer = setTimeout(async () => {
      try {
        /*
        const response = await fetch('http://localhost:3000/api/resources/sync', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resources: currentState.resources, filters: currentState.filters })
        });
        if (!response.ok) throw new Error('Error al guardar recursos');
        */
        console.log("AutoSave: Recursos guardados en backend.");
        set({ syncState: 'saved' });
        setTimeout(() => set({ syncState: 'idle' }), 2000);
      } catch (error) {
        console.error("AutoSave Falló:", error);
        set({ syncState: 'error' });
      }
    }, 1000);
  }
}));

export default useResourceStore;
