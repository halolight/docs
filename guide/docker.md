# Docker 部署

HaloLight Docker 容器化部署方案，支持多阶段构建、Docker Compose 编排和 Kubernetes 部署。

**Docker Hub**：[https://hub.docker.com/r/halolight/halolight](https://hub.docker.com/r/halolight/halolight)

**GitHub**：[https://github.com/halolight/halolight-docker](https://github.com/halolight/halolight-docker)

## 特性

- 🐳 **Docker 容器化** - 标准化的容器部署，环境一致性
- 🏗️ **多阶段构建** - 优化镜像大小，生产镜像 < 150MB
- 📦 **Docker Compose** - 多服务编排，一键启动完整环境
- 🔄 **Nginx 反代** - 高性能反向代理，负载均衡
- ✅ **健康检查** - 容器健康监控，自动重启
- ☸️ **K8s Ready** - Kubernetes 部署支持，Helm Charts
- 🔒 **安全加固** - 非 root 用户，最小化镜像
- 📊 **日志集成** - 支持 ELK/Loki 日志收集

## 快速开始

### 方式一：Docker Run

```bash
# 拉取镜像
docker pull halolight/halolight:latest

# 运行容器
docker run -d \
  --name halolight \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=/api \
  -e NEXT_PUBLIC_MOCK=true \
  halolight/halolight:latest

# 查看日志
docker logs -f halolight

# 停止容器
docker stop halolight
```

### 方式二：Docker Compose (推荐)

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-docker.git
cd halolight-docker

# 复制环境变量
cp .env.example .env

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方式三：从源码构建

```bash
# 克隆主仓库
git clone https://github.com/halolight/halolight.git
cd halolight

# 构建镜像
docker build -t halolight:local .

# 运行
docker run -d -p 3000:3000 halolight:local
```

## Dockerfile

### 生产环境 Dockerfile

```dockerfile
# ============================================
# 阶段 1: 依赖安装
# ============================================
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# ============================================
# 阶段 2: 构建应用
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置构建时环境变量
ARG NEXT_PUBLIC_API_URL=/api
ARG NEXT_PUBLIC_MOCK=false

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_MOCK=$NEXT_PUBLIC_MOCK
ENV NEXT_TELEMETRY_DISABLED=1

# 构建
RUN pnpm build

# ============================================
# 阶段 3: 生产运行
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# 启动命令
CMD ["node", "server.js"]
```

### 开发环境 Dockerfile

```dockerfile
# Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装所有依赖（包括 devDependencies）
RUN pnpm install

# 复制源代码
COPY . .

EXPOSE 3000

# 启动开发服务器
CMD ["pnpm", "dev"]
```

## Docker Compose

### 完整生产环境配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  # ============================================
  # 应用服务
  # ============================================
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_API_URL: /api
        NEXT_PUBLIC_MOCK: "false"
    image: halolight/halolight:latest
    container_name: halolight-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@db:5432/halolight
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/api/health')"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - halolight-network
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M

  # ============================================
  # PostgreSQL 数据库
  # ============================================
  db:
    image: postgres:16-alpine
    container_name: halolight-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d halolight"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - halolight-network
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M

  # ============================================
  # Redis 缓存
  # ============================================
  redis:
    image: redis:7-alpine
    container_name: halolight-redis
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 128mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - halolight-network
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 128M

  # ============================================
  # Nginx 反向代理
  # ============================================
  nginx:
    image: nginx:alpine
    container_name: halolight-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx_logs:/var/log/nginx
    depends_on:
      - app
    networks:
      - halolight-network
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 64M

  # ============================================
  # Adminer 数据库管理 (可选)
  # ============================================
  adminer:
    image: adminer:latest
    container_name: halolight-adminer
    restart: unless-stopped
    ports:
      - "8080:8080"
    depends_on:
      - db
    networks:
      - halolight-network
    profiles:
      - tools

networks:
  halolight-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
  nginx_logs:
```

### 开发环境配置

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: halolight-dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_MOCK=true
    command: pnpm dev

  db:
    image: postgres:16-alpine
    container_name: halolight-db-dev
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: halolight-redis-dev
    ports:
      - "6379:6379"

volumes:
  postgres_dev_data:
```

## Nginx 配置

### nginx.conf

```nginx
# nginx/nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

    access_log /var/log/nginx/access.log main;

    # 性能优化
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript
               application/xml application/xml+rss text/javascript application/x-javascript;

    # 上游服务器
    upstream app_servers {
        least_conn;
        server app:3000 weight=1 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    # 限流配置
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

    include /etc/nginx/conf.d/*.conf;
}
```

### 站点配置

```nginx
# nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;

    # 重定向到 HTTPS (生产环境启用)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://app_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API 限流
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        limit_conn conn_limit 10;

        proxy_pass http://app_servers;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源缓存
    location /_next/static/ {
        proxy_pass http://app_servers;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 健康检查
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}

# HTTPS 配置 (生产环境)
server {
    listen 443 ssl http2;
    server_name localhost;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://app_servers;
        # ... 其他配置同上
    }
}
```

## Kubernetes 部署

### Deployment

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: halolight
  namespace: halolight
  labels:
    app: halolight
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
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
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
              protocol: TCP
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: halolight-secrets
                  key: database-url
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: halolight-secrets
                  key: jwt-secret
          resources:
            requests:
              cpu: "100m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - halolight
                topologyKey: kubernetes.io/hostname
```

### Service

```yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: halolight
  namespace: halolight
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
  selector:
    app: halolight
```

### Ingress

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: halolight
  namespace: halolight
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
spec:
  tls:
    - hosts:
        - halolight.example.com
      secretName: halolight-tls
  rules:
    - host: halolight.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: halolight
                port:
                  number: 80
```

### HPA 自动扩缩容

```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: halolight
  namespace: halolight
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: halolight
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### ConfigMap 和 Secret

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: halolight-config
  namespace: halolight
data:
  NEXT_PUBLIC_API_URL: "/api"
  NEXT_PUBLIC_MOCK: "false"
  NEXT_PUBLIC_APP_TITLE: "Admin Pro"

---
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: halolight-secrets
  namespace: halolight
type: Opaque
stringData:
  database-url: "postgresql://user:password@postgres:5432/halolight"
  jwt-secret: "your-super-secret-key"
  redis-url: "redis://redis:6379"
```

## 常用命令

```bash
# Docker 基础命令
docker build -t halolight .              # 构建镜像
docker run -d -p 3000:3000 halolight     # 运行容器
docker logs -f <container_id>            # 查看日志
docker exec -it <container_id> sh        # 进入容器
docker stop <container_id>               # 停止容器
docker rm <container_id>                 # 删除容器
docker rmi halolight                     # 删除镜像

# Docker Compose 命令
docker-compose up -d                     # 后台启动
docker-compose down                      # 停止并删除
docker-compose down -v                   # 停止并删除（含数据卷）
docker-compose ps                        # 查看状态
docker-compose logs -f app               # 查看指定服务日志
docker-compose exec app sh               # 进入服务容器
docker-compose pull                      # 拉取最新镜像
docker-compose up -d --build             # 重新构建并启动

# Kubernetes 命令
kubectl apply -f k8s/                    # 应用所有配置
kubectl get pods -n halolight            # 查看 Pod
kubectl logs -f <pod_name> -n halolight  # 查看日志
kubectl exec -it <pod_name> -n halolight -- sh  # 进入 Pod
kubectl rollout restart deployment/halolight -n halolight  # 重启
kubectl rollout status deployment/halolight -n halolight   # 查看状态
kubectl scale deployment/halolight --replicas=5 -n halolight  # 扩容
```

## 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 服务端口 | `3000` |
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `DATABASE_URL` | PostgreSQL 连接 | `postgresql://...` |
| `REDIS_URL` | Redis 连接 | `redis://redis:6379` |
| `JWT_SECRET` | JWT 密钥 | `your-secret-key` |
| `DB_PASSWORD` | 数据库密码 | `your-db-password` |

## 镜像优化

### 镜像大小对比

| 构建方式 | 镜像大小 |
|----------|----------|
| 单阶段构建 | ~1.5GB |
| 多阶段构建 | ~150MB |
| 多阶段 + Alpine | ~120MB |
| 多阶段 + Distroless | ~100MB |

### 优化建议

1. **使用多阶段构建** - 分离构建和运行环境
2. **使用 Alpine 镜像** - 基础镜像更小
3. **使用 standalone 输出** - Next.js 独立运行模式
4. **清理缓存** - 构建后清理 npm/pnpm 缓存
5. **合并 RUN 指令** - 减少镜像层数

## 监控与日志

### Prometheus 指标

```yaml
# prometheus/prometheus.yml
scrape_configs:
  - job_name: 'halolight'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/api/metrics'
```

### Loki 日志收集

```yaml
# docker-compose with Loki
services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log
      - ./promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
```

## 常见问题

### Q：容器启动失败？

A：检查以下几点：
1. 查看日志：`docker logs <container_id>`
2. 检查端口是否被占用
3. 确认环境变量配置正确
4. 检查依赖服务 (数据库、Redis) 是否就绪

### Q：如何进行滚动更新？

A: Docker Compose:
```bash
docker-compose pull
docker-compose up -d --no-deps app
```

Kubernetes:
```bash
kubectl set image deployment/halolight halolight=halolight/halolight:v2
```

### Q：数据持久化？

A：使用 Docker volumes：
```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
  - redis_data:/data
```

### Q：如何备份数据？

A：PostgreSQL 备份：
```bash
docker exec halolight-db pg_dump -U postgres halolight > backup.sql
```

恢复：
```bash
docker exec -i halolight-db psql -U postgres halolight < backup.sql
```

## 与其他部署方式对比

| 特性 | Docker | Vercel | Kubernetes |
|------|--------|--------|------------|
| 部署复杂度 | 中等 | 低 | 高 |
| 可移植性 | ✅ 高 | ❌ 平台锁定 | ✅ 高 |
| 扩展性 | 手动/Swarm | 自动 | ✅ HPA |
| 成本 | 自行承担 | 按用量 | 自行承担 |
| 适用场景 | 自托管/私有云 | 快速上线 | 大规模生产 |

## 相关链接

- [Docker Hub](https://hub.docker.com/r/halolight/halolight)
- [GitHub 仓库](https://github.com/halolight/halolight-docker)
- [Docker 官方文档](https://docs.docker.com)
- [Docker Compose 文档](https://docs.docker.com/compose)
- [Kubernetes 文档](https://kubernetes.io/docs)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
