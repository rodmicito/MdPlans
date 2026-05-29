import React, { useState } from 'react';
import useOperationsTreeStore from '../../store/useOperationsTreeStore';
import { ChevronRight, ChevronDown, Folder, Box, FileText, Database, Activity, AlertTriangle } from 'lucide-react';

// Helpers to get color from state
const getStateColor = (estado) => {
  if (!estado) return null;
  const s = estado.toLowerCase();
  if (['completado', 'disponible', 'activo'].includes(s)) return 'bg-[#10B981]'; // Green
  if (['en_progreso', 'en_uso'].includes(s)) return 'bg-[#F59E0B]'; // Yellow
  if (['en_riesgo'].includes(s)) return 'bg-[#EF4444]'; // Red
  return 'bg-[#94A3B8]'; // Gray (pendiente, etc)
};

const getIconForKey = (key) => {
  if (key === 'proyecto') return <Database size={14} className="text-[#8B5CF6]" />;
  if (key === 'timeline') return <Activity size={14} className="text-[#3B82F6]" />;
  if (key === 'recursos') return <Folder size={14} className="text-[#F59E0B]" />;
  if (key === 'tareas') return <Box size={14} className="text-[#10B981]" />;
  if (key === 'riesgos' || key === 'ia_predicciones') return <AlertTriangle size={14} className="text-[#EF4444]" />;
  return <FileText size={14} className="text-[#94A3B8]" />;
};

// Formats key nicely (e.g. "ia_predicciones" -> "Ia Predicciones")
const formatKey = (key) => {
  if (!isNaN(key)) return null; // Don't show array indices if possible, or handle differently
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const TreeNode = ({ nodeKey, data, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const selectedNodeId = useOperationsTreeStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useOperationsTreeStore((state) => state.setSelectedNodeId);
  const searchQuery = useOperationsTreeStore((state) => state.searchQuery).toLowerCase();

  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);
  const hasChildren = isObject && Object.keys(data).length > 0;
  
  // Extract identifier for selection (id, or key)
  const nodeId = data?.id || nodeKey;
  const isSelected = selectedNodeId === nodeId;
  
  // Determine display name
  let displayName = data?.nombre || formatKey(nodeKey) || String(data);
  // Hide numeric keys for array items if they have a name
  if (!isNaN(nodeKey) && data?.nombre) {
    displayName = data.nombre;
  }

  // Filter logic (simple)
  const matchesSearch = displayName.toString().toLowerCase().includes(searchQuery);
  // If we have a search query and this node doesn't match (and isn't a parent of a match - simplified here by just hiding leaves that don't match)
  // For a robust tree, we'd need a recursive search first, but this is a start.
  if (searchQuery && !matchesSearch && !isObject) {
    return null;
  }

  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren) setIsExpanded(!isExpanded);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
  };

  const stateColor = data?.estado ? getStateColor(data.estado) : null;
  
  // Calculate badges for arrays
  const badgeCount = isArray ? data.length : null;

  return (
    <div className="select-none flex flex-col font-sans">
      <div 
        className={`flex items-center justify-between py-1.5 px-2 hover:bg-[#1E293B]/50 cursor-pointer transition-colors ${
          isSelected ? 'bg-[#8B5CF6]/10 border-l-2 border-[#8B5CF6]' : 'border-l-2 border-transparent'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={hasChildren ? handleToggle : handleSelect}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          {/* Caret */}
          <div className="w-4 flex items-center justify-center flex-shrink-0" onClick={handleToggle}>
            {hasChildren && (
              isExpanded ? <ChevronDown size={14} className="text-[#94A3B8]" /> : <ChevronRight size={14} className="text-[#94A3B8]" />
            )}
          </div>
          
          {/* Icon */}
          <div className="flex-shrink-0" onClick={handleSelect}>
            {getIconForKey(nodeKey)}
          </div>

          {/* Label */}
          <span 
            onClick={handleSelect}
            className={`truncate text-xs ${isSelected ? 'text-white font-bold' : 'text-[#E2E8F0] font-medium'}`}
          >
            {displayName}
          </span>
          
          {/* Value if not object */}
          {!isObject && (
            <span className="text-xs text-[#94A3B8] truncate ml-2">
              {String(data)}
            </span>
          )}
        </div>

        {/* Right side indicators */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {badgeCount !== null && (
            <span className="bg-[#4F6BFF]/20 text-[#4F6BFF] px-2 rounded-full text-[10px] font-bold">
              {badgeCount}
            </span>
          )}
          
          {stateColor && (
            <span className={`w-2 h-2 rounded-full ${stateColor}`}></span>
          )}
        </div>
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <div className="flex flex-col">
          {Object.entries(data).map(([childKey, childValue]) => {
            // Avoid rendering 'id', 'nombre', 'estado' as separate nodes if they are properties of the current object
            if (['id', 'nombre', 'estado'].includes(childKey) && typeof childValue !== 'object') return null;
            
            return (
              <TreeNode 
                key={`${nodeId}-${childKey}`} 
                nodeKey={childKey} 
                data={childValue} 
                level={level + 1} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
