package websocket

import (
	"log"
	"sync"

	"github.com/gofiber/contrib/websocket"
)

// Hub maintains the set of active clients and broadcasts messages to the clients.
type Hub struct {
	// Registered clients.
	Clients map[*websocket.Conn]bool

	// Inbound messages to be broadcasted to the clients.
	Broadcast chan interface{}

	// Register requests from the clients.
	Register chan *websocket.Conn

	// Unregister requests from clients.
	Unregister chan *websocket.Conn

	mu sync.Mutex
}

func NewHub() *Hub {
	return &Hub{
		Broadcast:  make(chan interface{}),
		Register:   make(chan *websocket.Conn),
		Unregister: make(chan *websocket.Conn),
		Clients:    make(map[*websocket.Conn]bool),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			h.mu.Lock()
			h.Clients[client] = true
			h.mu.Unlock()
			log.Println("Cliente WebSocket conectado. Total:", len(h.Clients))

		case client := <-h.Unregister:
			h.mu.Lock()
			if _, ok := h.Clients[client]; ok {
				delete(h.Clients, client)
				client.Close()
				log.Println("Cliente WebSocket desconectado. Total:", len(h.Clients))
			}
			h.mu.Unlock()

		case message := <-h.Broadcast:
			h.mu.Lock()
			for client := range h.Clients {
				if err := client.WriteJSON(message); err != nil {
					log.Printf("Error de escritura en WS: %v", err)
					client.Close()
					delete(h.Clients, client)
				}
			}
			h.mu.Unlock()
		}
	}
}
