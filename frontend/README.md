# MdPlans - Frontend Inteligente

Este repositorio contiene la arquitectura frontend para **MdPlans**, un simulador interactivo y avanzado de gestión de proyectos, impulsado por IA.

## Tecnologías Principales

- **React 18**: Librería principal de interfaces.
- **Vite**: Empaquetador extremadamente rápido para desarrollo y build.
- **Tailwind CSS**: Framework de utilidades para un diseño a medida de la interfaz tipo "Dark Surface".
- **Zustand**: Gestión del estado global ligero y rápido (sustituto ágil de Redux).
- **Lucide React**: Colección de íconos vectoriales de gran calidad.

## Estructura de Vistas

El aplicativo actualmente está diseñado como una **Single Page Application (SPA)** con enrutamiento basado en estados (`useProjectStore.js` -> `currentView`), alternando dinámicamente entre las siguientes vistas principales:

### 1. Dashboard View (`DashboardView.jsx`)
Una vista de resumen gerencial compuesta por:
- **KPIGrid**: Tarjetas de indicadores clave (Avance físico, Costos, CPI, SPI).
- **AnalyticsRow**: Dona de ejecución de presupuesto y matriz de riesgos activos.
- **MiniTimeline**: Un pequeño Gantt o timeline con estado visual de tareas.
- **AIAssistantPanel**: Barra lateral derecha con recomendaciones inteligentes y atajos de creación.

### 2. Project Builder View (`ProjectBuilderView.jsx`)
Un entorno de creación visual inmersivo, enfocado en definir nuevos proyectos o simularlos:
- **TopToolBar**: Contiene el input para "Generar con IA" y utilidades como carga de gráficos locales.
- **CanvasArea**: El lienzo central. Contiene el *Empty State* interactivo, subida de imágenes, y está estructuralmente preparado para montar **PixiJS** y manejar nodos visuales WebGL 2D de altísimo rendimiento.
- **ProjectPropertiesPanel**: Panel lateral derecho de propiedades, con inputs reactivos y acordeones oscuros (Dark Mode UI) para detallar alcances, objetivos, etc.

## Estado Global (Zustand)

Toda la aplicación se comunica de forma sincrónica sin recargar mediante Zustand:
- `useProjectStore.js`: Maneja los datos globales, el enrutador (`currentView`), y la simulación local tipo *Tick* para animar la vista (Preparado para inyectar WebSockets reales de Go).
- `useProjectBuilderStore.js`: Maneja exclusivamente el estado efímero del espacio de trabajo de construcción (Zoom, Pan, Prompts de IA, Datos del formulario en vivo, e imágenes subidas al canvas).

## Instalación y Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Levantar servidor local en caliente:
   ```bash
   npm run dev
   ```

El proyecto estará disponible por defecto en `http://localhost:5173`.
