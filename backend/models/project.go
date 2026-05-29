package models

import "math"

type ProjectState struct {
	Proyecto      ProyectoInfo   `json:"proyecto"`
	KPIs          KPIs           `json:"kpis"`
	Riesgos       []Riesgo       `json:"riesgos"`
	Recursos      Recursos       `json:"recursos"`
	IA            IA             `json:"ia"`
	TimelineGantt TimelineGantt  `json:"timeline_gantt"`
}

type ProyectoInfo struct {
	ID          string `json:"id"`
	Nombre      string `json:"nombre"`
	Responsable string `json:"responsable"`
	Rol         string `json:"rol"`
	Estado      string `json:"estado"`
}

type KPIs struct {
	AvanceFisico                   float64 `json:"avance_fisico"`
	TendenciaAvance                string  `json:"tendencia_avance"`
	TiempoRestanteDias             int     `json:"tiempo_restante_dias"`
	FechaFinEstimada               string  `json:"fecha_fin_estimada"`
	CostoActual                    float64 `json:"costo_actual"`
	TendenciaCosto                 string  `json:"tendencia_costo"`
	IndiceDesempeno                float64 `json:"indice_desempeno"`
	CPI                            float64 `json:"cpi"`
	SPI                            float64 `json:"spi"`
	PresupuestoTotal               float64 `json:"presupuesto_total"`
	PresupuestoEjecutadoPorcentaje float64 `json:"presupuesto_ejecutado_porcentaje"`
}

// Round helpers
func (k *KPIs) RoundAvance() {
	k.AvanceFisico = math.Round(k.AvanceFisico*10) / 10
}

type Riesgo struct {
	ID           string `json:"id"`
	Descripcion  string `json:"descripcion"`
	Nivel        string `json:"nivel"`
	Probabilidad int    `json:"probabilidad"`
	Impacto      string `json:"impacto"`
}

type Recursos struct {
	ManoObra     RecursoCant `json:"mano_obra"`
	Equipos      RecursoCant `json:"equipos"`
	Materiales   RecursoPorc `json:"materiales"`
	Subcontratos RecursoCant `json:"subcontratos"`
}

type RecursoCant struct {
	Actual int `json:"actual"`
	Total  int `json:"total"`
}

type RecursoPorc struct {
	PorcentajeDisponible int `json:"porcentaje_disponible"`
}

type IA struct {
	Recomendaciones []Recomendacion `json:"recomendaciones"`
}

type Recomendacion struct {
	ID      string `json:"id"`
	Mensaje string `json:"mensaje"`
	Impacto string `json:"impacto"`
}

type TimelineGantt struct {
	MesesVisibles []string `json:"meses_visibles"`
	TareasActivas []Tarea  `json:"tareas_activas"`
}

type Tarea struct {
	Categoria string `json:"categoria"`
	Nombre    string `json:"nombre"`
	Estado    string `json:"estado"`
}
