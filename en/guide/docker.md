# Docker Deployment

HaloLight Docker containerized deployment solution, supporting multi-stage builds and Kubernetes deployment.

## Features

- 🐳 **Docker Containerization** - Standardized container deployment
- 🏗️ **Multi-Stage Build** - Optimized image size
- 📦 **Docker Compose** - Multi-service orchestration
- 🔄 **Nginx Reverse Proxy** - High-performance reverse proxy
- ✅ **Health Checks** - Container health monitoring
- ☸️ **K8s Ready** - Kubernetes deployment support

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-docker.git
cd halolight-docker

# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
```

## Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/halolight
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  postgres_data:
  redis_data:
```

## Kubernetes Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: halolight
spec:
  replicas: 3
  selector:
    matchLabels:
      app: halolight
  template:
    metadata:
      labels:
        app: halolight
    spec:
      containers:
      - name: halolight
        image: halolight/halolight:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-docker)
- [Docker Hub](https://hub.docker.com/r/halolight/halolight)
