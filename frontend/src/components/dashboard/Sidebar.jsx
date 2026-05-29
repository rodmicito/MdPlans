import React from 'react';
import useProjectStore from '../../store/useProjectStore';
import { 
  LayoutDashboard, 
  FolderOpen,
  Users,
  ClipboardList,
  CalendarClock,
  CircleDollarSign,
  AlertTriangle,
  Map,
  Activity,
  FileBarChart,
  CalendarDays,
  Settings,
  Menu
} from 'lucide-react';

export default function Sidebar({ isOpen, onToggle }) {
  const proyecto = useProjectStore(state => state.project?.proyecto);
  const currentView = useProjectStore(state => state.currentView);
  const setCurrentView = useProjectStore(state => state.setCurrentView);

  return (
    <aside 
      className={`${isOpen ? 'w-64' : 'w-20'} bg-[#0B1120] border-r border-[#1E293B] flex flex-col z-20 transition-all duration-300 ease-in-out`}
    >
      {/* Header / Logo */}
      <div className="p-5 flex flex-col gap-4 border-b border-[#1E293B]/50 h-24">
        <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} overflow-hidden`}>
          {isOpen && (
            <div className="flex items-center gap-1 font-bold text-xl tracking-wide whitespace-nowrap">
              <span className="text-[#F8FAFC]">Md</span>
              <span className="text-[#4F6BFF]">Plans</span>
            </div>
          )}
          {!isOpen && (
            <div className="font-bold text-xl text-[#F8FAFC]">M</div>
          )}
        </div>
        
        <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
          {isOpen && <span className="text-[11px] text-[#94A3B8] font-medium tracking-wider uppercase">Project Intelligence</span>}
          <button onClick={onToggle} className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors p-1 rounded hover:bg-[#1E293B]/50">
            <Menu size={18} />
          </button>
        </div>
      </div>
      
      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-none">
        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" viewName="dashboard" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<FolderOpen size={18} />} label="Proyectos" viewName="proyectos" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<Users size={18} />} label="Recursos" viewName="recursos" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<ClipboardList size={18} />} label="Tareas" viewName="tareas" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<CalendarClock size={18} />} label="Gantt" viewName="gantt" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<CircleDollarSign size={18} />} label="Costos" viewName="costos" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<AlertTriangle size={18} />} label="Riesgos" viewName="riesgos" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<Map size={18} />} label="Vista Visual 2D" viewName="visual2d" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<Activity size={18} />} label="Simulación" viewName="simulacion" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<FileBarChart size={18} />} label="Reportes" viewName="reportes" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<CalendarDays size={18} />} label="Calendarios" viewName="calendarios" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
        <NavItem icon={<Settings size={18} />} label="Configuración" viewName="configuracion" currentView={currentView} setCurrentView={setCurrentView} isOpen={isOpen} />
      </nav>
      
      {/* Footer / User Profile */}
      <div className="p-4 border-t border-[#1E293B]">
        {isOpen ? (
          <div className="flex items-center gap-3 cursor-pointer group px-2">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-xs font-bold text-white">JP</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#F8FAFC] truncate">{proyecto?.responsable || 'Juan Pérez'}</p>
              <p className="text-[10px] text-[#94A3B8] truncate">{proyecto?.rol || 'Admin Principal'}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-xs font-bold text-white">JP</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function NavItem({ icon, label, viewName, currentView, setCurrentView, isOpen }) {
  const active = currentView === viewName;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setCurrentView(viewName)}
        className={`w-full flex items-center justify-center p-3 rounded-lg transition-all ${active ? 'bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-[#94A3B8] hover:text-[#8B5CF6] hover:bg-[#1E293B]/50'}`} 
        title={label}
      >
        {icon}
      </button>
    );
  }

  return (
    <button 
      onClick={() => setCurrentView(viewName)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${active ? 'bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50 hover:border-l-2 hover:border-[#8B5CF6] border-l-2 border-transparent'}`}
    >
      {icon}
      <span className="font-medium text-[13px]">{label}</span>
    </button>
  );
}
