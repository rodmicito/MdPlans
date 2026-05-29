package main

import (
	"encoding/json"
	"log"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	
	"github.com/mdplans/backend/engines"
	"github.com/mdplans/backend/models"
	wsHub "github.com/mdplans/backend/websocket"
	redisCache "github.com/mdplans/backend/redis"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB
var cache *redisCache.CacheLayer

func initDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("mdplans.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database")
	}

	err = models.SetupDatabase(db)
	if err != nil {
		log.Fatal("Failed to migrate database")
	}

	// Create dummy project if it doesn't exist
	var count int64
	db.Model(&models.Proyecto{}).Where("id = ?", "PRJ-001").Count(&count)
	if count == 0 {
		db.Create(&models.Proyecto{
			ID: "PRJ-001",
			Nombre: "Edificio Corporativo 5 Pisos",
			Estado: "En progreso",
			Configuracion: []byte(`{"velocidadTimeline": 1, "escalaTiempo": "Días", "calidadRender": "Alta", "fpsObjetivo": 60, "zoomMaximo": 5, "simulacionRealtime": true, "iaActiva": true, "riesgosAutomaticos": true, "climaDinamico": false, "autoSave": true}`),
		})
	}
}

func main() {
	app := fiber.New()

	// Enable CORS for frontend connection
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST, PUT, DELETE",
	}))

	initDB()
	cache = redisCache.NewCacheLayer()

	// 1. Inicializar el Hub de WebSockets
	hub := wsHub.NewHub()
	go hub.Run()

	// 2. Definir el Estado Inicial MOCK Oficial (El mismo del Frontend)
	// Trataríamos de sacar esto de la DB, pero por ahora usamos el base para inicializar el engine.
	initialState := &models.ProjectState{
		Proyecto: models.ProyectoInfo{
			ID: "PRJ-001", Nombre: "Edificio Corporativo 5 Pisos", Responsable: "Juan Pérez", Rol: "Administrador", Estado: "En progreso",
		},
		KPIs: models.KPIs{
			AvanceFisico: 62.4, TendenciaAvance: "+3.2% vs ayer", TiempoRestanteDias: 128, FechaFinEstimada: "18/09/2025",
			CostoActual: 245680, TendenciaCosto: "+4.3% vs planificado", IndiceDesempeno: 0.93, CPI: 0.91, SPI: 0.95,
			PresupuestoTotal: 1250000, PresupuestoEjecutadoPorcentaje: 19.6,
		},
		Riesgos: []models.Riesgo{
			{ID: "RSK-001", Descripcion: "Retraso en entrega de material estructural", Nivel: "Alto", Probabilidad: 70, Impacto: "Alto"},
			{ID: "RSK-002", Descripcion: "Clima lluvioso afecta productividad", Nivel: "Medio", Probabilidad: 45, Impacto: "Medio"},
		},
		Recursos: models.Recursos{
			ManoObra:     models.RecursoCant{Actual: 72, Total: 120},
			Equipos:      models.RecursoCant{Actual: 8, Total: 15},
			Materiales:   models.RecursoPorc{PorcentajeDisponible: 65},
			Subcontratos: models.RecursoCant{Actual: 3, Total: 6},
		},
		IA: models.IA{
			Recomendaciones: []models.Recomendacion{
				{ID: "IA-01", Mensaje: "Agregar 1 cuadrilla de albañilería puede reducir 8 días en el plazo final.", Impacto: "Alto"},
			},
		},
		TimelineGantt: models.TimelineGantt{
			MesesVisibles: []string{"Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"},
			TareasActivas: []models.Tarea{
				{Categoria: "Obras", Nombre: "Movimiento de Tierras", Estado: "Completado"},
			},
		},
	}

	// Try to get from cache first
	cachedState, _ := cache.GetProjectState("PRJ-001")
	if cachedState != nil {
		initialState = cachedState
	} else {
		// Save initial mock state to cache
		cache.SetProjectState("PRJ-001", initialState)
	}

	// 3. Inicializar el Manager del Motor y comenzar el loop de "Ticks"
	manager := engines.NewEngineManager(hub, initialState)
	manager.StartTickLoop(2 * time.Second)

	// Middleware para WebSocket
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	// API Endpoints
	app.Get("/api/dashboard/:id", func(c *fiber.Ctx) error {
		// We return the state from the manager (which represents runtime)
		return c.JSON(manager.State)
	})

	app.Get("/api/proyectos/:id", func(c *fiber.Ctx) error {
		// Reconstruct JSON from relational DB (Just a mockup of the structure needed by Zustand)
		id := c.Params("id")
		var proyecto models.Proyecto
		if err := db.Where("id = ?", id).First(&proyecto).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{"error": "Project not found"})
		}
		
		// Return standard payload for Zustand
		// In a full implementation, we'd pull from PropiedadesProyecto, AssetVisuales, etc.
		return c.JSON(fiber.Map{
			"id": proyecto.ID,
			"nombre": proyecto.Nombre,
		})
	})

	app.Put("/api/proyectos/:id/sync", func(c *fiber.Ctx) error {
		id := c.Params("id")
		
		var payload models.SyncPayload
		if err := c.BodyParser(&payload); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// 1. Guardar en SQLite (Estructural Histórico)
		// Por simplificación de este mockup guardamos en una transacción
		err := db.Transaction(func(tx *gorm.DB) error {
			// Update Proyecto info based on formData
			if payload.FormData != nil {
				formData := payload.FormData
				var updateData map[string]interface{} = make(map[string]interface{})
				if nombre, ok := formData["nombre"].(string); ok {
					updateData["nombre"] = nombre
				}
				if codigo, ok := formData["codigo"].(string); ok {
					updateData["codigo"] = codigo
				}
				if desc, ok := formData["descripcion"].(string); ok {
					updateData["descripcion"] = desc
				}
				if conf, ok := payload.AccordionsState["configuracion"]; ok {
					confBytes, _ := json.Marshal(conf)
					updateData["configuracion"] = confBytes
				}
				
				tx.Model(&models.Proyecto{}).Where("id = ?", id).Updates(updateData)
			}
			return nil
		})

		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to save in DB"})
		}

		// 2. Actualizar estado temporal en Redis
		// Here we would partially update the initialState in cache.
		// For the sake of the mockup we update the engine manager state directly 
		// if it affects simulation, and then save the whole state to Redis.
		
		// (Optional) Map incoming payload data to manager.State if needed
		cache.SetProjectState(id, manager.State)

		// 3. Emitir evento WebSocket
		eventPayload := map[string]interface{}{
			"type": "project.updated",
			"projectId": id,
			"timestamp": time.Now(),
		}
		eventBytes, _ := json.Marshal(eventPayload)
		hub.Broadcast <- eventBytes

		return c.JSON(fiber.Map{"status": "ok", "message": "Synced successfully"})
	})

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		hub.Register <- c
		defer func() {
			hub.Unregister <- c
			c.Close()
		}()
		for {
			var msg interface{}
			if err := c.ReadJSON(&msg); err != nil {
				log.Println("WS Error:", err)
				break
			}
		}
	}))

	log.Println("⚡ MdPlans Engine iniciado en el puerto 3000")
	log.Fatal(app.Listen(":3000"))
}
