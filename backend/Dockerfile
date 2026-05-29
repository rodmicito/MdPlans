FROM golang:alpine AS builder

WORKDIR /app

# Download dependencies first (caching layer)
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and build
COPY . .
# CGO_ENABLED=0 since we are using pure-go sqlite (glebarez/sqlite)
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Run stage
FROM alpine:latest

WORKDIR /app
COPY --from=builder /app/main .

EXPOSE 3000

CMD ["./main"]
