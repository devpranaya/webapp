# Docker Commands

## Build and Run

```bash
# Build the Docker image
docker-compose build

# Start the container
docker-compose up

# Start in background (detached mode)
docker-compose up -d

# Stop the container
docker-compose down

# View logs
docker-compose logs -f webapp

# Rebuild and restart
docker-compose up --build
```

## Direct Docker Commands

```bash
# Build image
docker build -t court-room-webapp .

# Run container
docker run -p 3000:3000 court-room-webapp

# Run with environment variables
docker run -p 3000:3000 -e DATABASE_URL=file:./dev.db court-room-webapp
```

## Debugging

```bash
# Access container shell
docker exec -it $(docker ps -q -f name=webapp) sh

# Check container logs
docker logs $(docker ps -q -f name=webapp)

# Inspect container
docker inspect $(docker ps -q -f name=webapp)

# Remove all containers and images
docker system prune -a
```

## Health Check

```bash
# Check container health status
docker ps

# Manual health check
curl http://localhost:3000
```

## Database

```bash
# Access Prisma in container
docker exec -it $(docker ps -q -f name=webapp) npx prisma studio

# Run migrations in container
docker exec -it $(docker ps -q -f name=webapp) npx prisma migrate deploy
```
