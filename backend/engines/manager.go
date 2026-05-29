package engines

import (
	"time"

	"github.com/mdplans/backend/models"
	"github.com/mdplans/backend/websocket"
)

type EngineManager struct {
	State *models.ProjectState
	Hub   *websocket.Hub
}

func NewEngineManager(hub *websocket.Hub, initialState *models.ProjectState) *EngineManager {
	return &EngineManager{
		State: initialState,
		Hub:   hub,
	}
}

func (m *EngineManager) StartTickLoop(tickRate time.Duration) {
	ticker := time.NewTicker(tickRate)
	go func() {
		for {
			<-ticker.C
			m.ProcessTick()
		}
	}()
}

func (m *EngineManager) ProcessTick() {
	// Llamada a los motores individuales que mutan el estado
	ProcessTimelineTick(m.State)
	// ProcessCostsTick(m.State)     // Futuro motor de costos
	// ProcessResourcesTick(m.State) // Futuro motor de recursos

	// Formatear el payload que el frontend (Zustand) espera
	message := map[string]interface{}{
		"type":    "tick",
		"payload": m.State,
	}

	// Emitir el "Tick" a todos los clientes WebSocket conectados
	m.Hub.Broadcast <- message
}
