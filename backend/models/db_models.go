package models

import (
	"encoding/json"
	"gorm.io/gorm"
)

type Proyecto struct {
	ID               string `gorm:"primaryKey"`
	Nombre           string `gorm:"not null"`
	Codigo           string
	Descripcion      string
	Cliente          string
	TipoProyecto     string
	Estado           string
	FechaInicio      string // Can be time.Time or string for simplicity with JSON
	FechaFinEstimada string
	PresupuestoTotal float64
	Moneda           string
	Configuracion    json.RawMessage `gorm:"type:json"` // JSON params

	// Relationships
	KPIs                ProyectoKPI          `gorm:"foreignKey:ProyectoID;constraint:OnDelete:CASCADE"`
	AssetsVisuales      []AssetVisual        `gorm:"foreignKey:ProyectoID;constraint:OnDelete:CASCADE"`
	PropiedadesProyecto []PropiedadProyecto  `gorm:"foreignKey:ProyectoID;constraint:OnDelete:CASCADE"`
}

type ProyectoKPI struct {
	ProyectoID         string  `gorm:"primaryKey"`
	AvanceFisico       float64
	TiempoRestanteDias int
	CostoActual        float64
	IndiceDesempeno    float64
	CPI                float64
	SPI                float64
}

type AssetVisual struct {
	ID         uint   `gorm:"primaryKey;autoIncrement"`
	ProyectoID string `gorm:"index"`
	Nombre     string
	Tipo       string
	Source     string
	Path       string
	Metadata   json.RawMessage `gorm:"type:json"`
}

type PropiedadProyecto struct {
	ID         uint   `gorm:"primaryKey;autoIncrement"`
	ProyectoID string `gorm:"index"`
	Categoria  string // 'restriccion', 'supuesto', 'meta_kpi', 'nota'
	Nombre     string
	Datos      json.RawMessage `gorm:"type:json"`
}

// Struct for the incoming PUT request
type SyncPayload struct {
	FormData        map[string]interface{} `json:"formData"`
	AccordionsState map[string]interface{} `json:"accordionsState"`
}

// Setup DB
func SetupDatabase(db *gorm.DB) error {
	return db.AutoMigrate(
		&Proyecto{},
		&ProyectoKPI{},
		&AssetVisual{},
		&PropiedadProyecto{},
	)
}
