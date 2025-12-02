# Docker 部署

HaloLight Docker 容器化部署方案，支持多阶段构建和 Kubernetes 部署。

## 特性

- 🐳 **Docker 容器化** - 标准化的容器部署
- 🏗️ **多阶段构建** - 优化镜像大小
- 📦 **Docker Compose** - 多服务编排
- 🔄 **Nginx 反代** - 高性能反向代理
- ✅ **健康检查** - 容器健康监控
- ☸️ **K8s Ready** - Kubernetes 部署支持

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-docker.git
cd halolight-docker

# 使用 Docker Compose 启动
docker-compose up -d

# 查看日志
docker-compose logs -f
```

## Dockerfile

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产阶段
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

## Kubernetes 部署

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

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-docker)
- [Docker Hub](https://hub.docker.com/r/halolight/halolight)
