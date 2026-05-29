package redis

import (
	"context"
	"encoding/json"
	"log"
	"sync"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/mdplans/backend/models"
)

var ctx = context.Background()

type CacheLayer struct {
	client     *redis.Client
	memoryMock sync.Map
	useMemory  bool
}

func NewCacheLayer() *CacheLayer {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	// Try pinging
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Println("⚠️  Redis no detectado en localhost:6379. Se utilizará memoria emulada (Mock) para el runtime.")
		return &CacheLayer{useMemory: true}
	}

	log.Println("✅ Conectado a Redis exitosamente.")
	return &CacheLayer{client: rdb, useMemory: false}
}

func (c *CacheLayer) SetProjectState(projectID string, state *models.ProjectState) error {
	key := "mdplans:proyecto:" + projectID
	
	bytes, err := json.Marshal(state)
	if err != nil {
		return err
	}

	if c.useMemory {
		c.memoryMock.Store(key, string(bytes))
		return nil
	}

	return c.client.Set(ctx, key, string(bytes), 24*time.Hour).Err()
}

func (c *CacheLayer) GetProjectState(projectID string) (*models.ProjectState, error) {
	key := "mdplans:proyecto:" + projectID
	var val string
	var err error

	if c.useMemory {
		v, ok := c.memoryMock.Load(key)
		if !ok {
			return nil, nil // Not found is not an error, just nil
		}
		val = v.(string)
	} else {
		val, err = c.client.Get(ctx, key).Result()
		if err == redis.Nil {
			return nil, nil
		} else if err != nil {
			return nil, err
		}
	}

	var state models.ProjectState
	err = json.Unmarshal([]byte(val), &state)
	return &state, err
}
