import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import TopToolBar from './TopToolBar';
import CanvasArea from './CanvasArea';
import ProjectPropertiesPanel from './ProjectPropertiesPanel';
import AssetStudioModal from './AssetStudioModal';
import OperationsTreePanel from './OperationsTreePanel';

export default function ProjectBuilderView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#0B1120] text-[#F8FAFC] overflow-hidden font-sans">
      
      {/* Left Navigation Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Operations Tree Panel */}
      <OperationsTreePanel />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopToolBar />
        
        <div className="flex-1 flex overflow-hidden">
          <CanvasArea />
          <ProjectPropertiesPanel />
        </div>
      </div>
      
      {/* Overlay Modals */}
      <AssetStudioModal />

    </div>
  );
}
