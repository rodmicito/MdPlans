import React, { useEffect } from 'react';
import useProjectStore from './store/useProjectStore';
import ProjectBuilderView from './components/project-builder/ProjectBuilderView';
import DashboardView from './components/dashboard/DashboardView';
import ResourcesView from './components/resources/ResourcesView';

function App() {
  const connectWebSocket = useProjectStore(state => state.connectWebSocket);
  const currentView = useProjectStore(state => state.currentView);

  useEffect(() => {
    // Iniciar conexión al WebSocket al montar la app
    connectWebSocket();
  }, [connectWebSocket]);

  return (
    <>
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'proyectos' && <ProjectBuilderView />}
      {currentView === 'recursos' && <ResourcesView />}
    </>
  );
}

export default App;
