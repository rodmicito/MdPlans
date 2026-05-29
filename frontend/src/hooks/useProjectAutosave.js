import { useEffect, useRef } from 'react';
import useProjectBuilderStore from '../store/useProjectBuilderStore';

export default function useProjectAutosave(projectId = "PRJ-001") {
  const accordionsState = useProjectBuilderStore(state => state.accordionsState);
  const formData = useProjectBuilderStore(state => state.formData);
  const setSyncState = useProjectBuilderStore(state => state.setSyncState);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!accordionsState.configuracion.autoSave) {
      return;
    }

    setSyncState('saving');

    const timer = setTimeout(async () => {
      try {
        const payload = {
          formData,
          accordionsState
        };

        const response = await fetch(`http://localhost:3000/api/proyectos/${projectId}/sync`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setSyncState('saved');
        
        // Return to idle after a few seconds
        setTimeout(() => setSyncState('idle'), 3000);

      } catch (error) {
        console.error("Autosave error:", error);
        setSyncState('error');
      }
    }, 1500); // 1.5 second debounce

    return () => clearTimeout(timer);
  }, [accordionsState, formData, projectId, setSyncState]);
}
