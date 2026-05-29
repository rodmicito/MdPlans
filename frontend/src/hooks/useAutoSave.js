import { useEffect, useRef } from 'react';
import useProjectBuilderStore from '../store/useProjectBuilderStore';

export default function useAutoSave() {
  const accordionsState = useProjectBuilderStore(state => state.accordionsState);
  const formData = useProjectBuilderStore(state => state.formData);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!accordionsState.configuracion.autoSave) {
      return;
    }

    const timer = setTimeout(() => {
      // Mocking WebSocket Event emission
      console.log(`[WebSocket Emit] project.updated`, {
        timestamp: new Date().toISOString(),
        formData,
        accordionsState
      });
      // In a real scenario:
      // socket.emit('project.updated', { projectId, formData, accordionsState });
    }, 2000); // 2 second debounce

    return () => clearTimeout(timer);
  }, [accordionsState, formData]);
}
