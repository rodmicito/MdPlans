package engines

import (
	"math/rand"

	"github.com/mdplans/backend/models"
)

// ProcessTimelineTick simula la evolución natural del tiempo y el progreso de la obra
func ProcessTimelineTick(state *models.ProjectState) {
	// Simulamos un micro-avance físico para mantener la interfaz "viva"
	// Incrementa entre 0.1 y 0.5%
	increment := (rand.Float64() * 0.4) + 0.1
	newAvance := state.KPIs.AvanceFisico + increment

	if newAvance > 100 {
		newAvance = 100
	}
	state.KPIs.AvanceFisico = newAvance
	state.KPIs.RoundAvance() // Redondear a 1 decimal

	// Simulamos eventos aleatorios que afectan la tendencia
	eventChance := rand.Float64()
	if eventChance > 0.90 {
		state.KPIs.TiempoRestanteDias += 1
		state.KPIs.TendenciaAvance = "Desaceleración detectada"
		state.KPIs.CostoActual += float64(rand.Intn(5000))
		state.KPIs.TendenciaCosto = "Alerta: Sobre-ejecución"
		
		// Opcional: Alterar un riesgo si el clima es malo
		if len(state.Riesgos) > 1 {
			state.Riesgos[1].Probabilidad = 80
			state.Riesgos[1].Impacto = "Alto"
			state.Riesgos[1].Nivel = "Alto"
		}
	} else if eventChance < 0.10 {
		state.KPIs.TendenciaAvance = "Óptimo (+0.4% / hr)"
	} else {
		state.KPIs.TendenciaAvance = "+0.2% vs hora anterior"
		state.KPIs.TendenciaCosto = "Dentro de lo planificado"
	}
}
