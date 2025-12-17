# Fly.io 部署

HaloLight Fly.io 部署版本，全球边缘部署方案，支持多区域分布式部署。

**在线预览**：[https://halolight-fly.h7ml.cn](https://halolight-fly.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-fly](https://github.com/halolight/halolight-fly)

## 特性

- ✈️ **全球边缘** - 部署到全球 30+ 区域
- 📈 **自动扩缩容** - 按需自动扩展实例
- 💾 **Volumes** - 持久化存储卷支持
- 🔒 **私有网络** - 内置 WireGuard 私有网络
- 📊 **监控指标** - Prometheus/Grafana 集成
- 🔄 **蓝绿部署** - 零停机滚动部署
- 🐘 **托管数据库** - PostgreSQL/Redis 一键创建
- 🖥️ **Machines API** - 细粒度实例控制

## 快速开始

### 方式一：CLI 部署 (推荐)

```bash
# 安装 Fly CLI
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# 登录 Fly.io
fly auth login

# 克隆项目
git clone https://github.com/halolight/halolight-fly.git
cd halolight-fly

# 初始化应用 (会创建 fly.toml)
fly launch

# 部署
fly deploy
```

### 方式二：从 Dockerfile

```bash
# 克隆项目
git clone https://github.com/halolight/halolight-fly.git
cd halolight-fly

# 登录
fly auth login

# 创建应用
fly apps create halolight

# 使用 Dockerfile 部署
fly deploy --dockerfile Dockerfile
```

### 方式三：GitHub Actions

```yaml
# .github/workflows/fly.yml
name: Fly Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: superfly/flyctl-actions/setup-flyctl@master

      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

## 配置文件

### fly.toml

```toml
# 应用名称
app = "halolight"

# 主区域 (香港)
primary_region = "hkg"

# 构建配置
[build]
  dockerfile = "Dockerfile"

# 环境变量
[env]
  NODE_ENV = "production"
  PORT = "3000"
  NEXT_PUBLIC_API_URL = "/api"
  NEXT_PUBLIC_MOCK = "false"

# HTTP 服务配置
[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true      # 空闲时自动停止
  auto_start_machines = true     # 请求时自动启动
  min_machines_running = 1       # 最少保持 1 个实例
  processes = ["app"]

# TCP 服务端口映射
[[services]]
  protocol = "tcp"
  internal_port = 3000

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

  # 健康检查
  [[services.http_checks]]
    interval = "10s"
    timeout = "2s"
    grace_period = "5s"
    method = "GET"
    path = "/api/health"
    protocol = "http"
    tls_skip_verify = false

  # TCP 检查
  [[services.tcp_checks]]
    interval = "15s"
    timeout = "2s"
    grace_period = "1s"

# 虚拟机配置
[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512

# 进程组 (可选多进程)
[processes]
  app = "pnpm start"
  # worker = "pnpm run worker"

# 挂载卷
[mounts]
  source = "halolight_data"
  destination = "/data"
  initial_size = "1gb"

# 部署策略
[deploy]
  strategy = "rolling"
  max_unavailable = 0.33

# 静态资源
[[statics]]
  guest_path = "/app/public"
  url_prefix = "/static/"
```

### Dockerfile

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# 生产阶段
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## 环境变量

### 设置方式

```bash
# CLI 设置单个变量
fly secrets set DATABASE_URL="postgresql://user:pass@host:5432/db"

# CLI 设置多个变量
fly secrets set \
  JWT_SECRET="your-secret" \
  REDIS_URL="redis://..."

# 从 .env 文件导入
fly secrets import < .env.production

# 查看已设置的变量
fly secrets list

# 删除变量
fly secrets unset DATABASE_URL
```

### 常用变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 服务端口 | `3000` |
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `DATABASE_URL` | PostgreSQL 连接 | `postgresql://...` |
| `REDIS_URL` | Redis 连接 | `redis://...` |
| `JWT_SECRET` | JWT 密钥 | `your-secret-key` |

### 内置变量

Fly.io 自动注入以下环境变量：

```bash
FLY_APP_NAME        # 应用名称
FLY_REGION          # 当前区域代码 (如 hkg)
FLY_ALLOC_ID        # 实例分配 ID
FLY_PUBLIC_IP       # 公网 IP
FLY_PRIVATE_IP      # 私有网络 IP
PRIMARY_REGION      # 主区域
```

## 持久化存储

### 创建 Volume

```bash
# 在指定区域创建 Volume
fly volumes create halolight_data \
  --region hkg \
  --size 10 \
  --count 1

# 查看 Volumes
fly volumes list

# 扩展大小
fly volumes extend vol_xxx --size 20

# 删除 Volume
fly volumes destroy vol_xxx
```

### 挂载配置

```toml
# fly.toml
[mounts]
  source = "halolight_data"
  destination = "/data"
```

### 使用 SQLite

```typescript
// lib/db.ts
import Database from 'better-sqlite3';

const db = new Database('/data/app.db');

// 初始化表结构
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT
  )
`);
```

## 托管数据库

### PostgreSQL

```bash
# 创建 PostgreSQL 集群
fly postgres create --name halolight-db

# 可选配置
fly postgres create \
  --name halolight-db \
  --region hkg \
  --vm-size shared-cpu-1x \
  --volume-size 10 \
  --initial-cluster-size 1

# 连接到应用
fly postgres attach halolight-db --app halolight

# 这会自动设置 DATABASE_URL 环境变量

# 连接到数据库 (交互式)
fly postgres connect -a halolight-db

# 使用 psql
fly proxy 5432 -a halolight-db
# 然后在另一个终端
psql "postgresql://postgres:xxx@localhost:5432/halolight"
```

### Redis

```bash
# 创建 Redis (Upstash)
fly redis create

# 或使用 Fly 托管 Redis
fly apps create halolight-redis
fly deploy --config redis.toml

# 获取连接信息
fly redis status halolight-redis
```

### Redis 配置文件

```toml
# redis.toml
app = "halolight-redis"
primary_region = "hkg"

[build]
  image = "flyio/redis:6.2.6"

[env]
  REDIS_PASSWORD = ""

[[mounts]]
  source = "redis_data"
  destination = "/data"

[[services]]
  internal_port = 6379
  protocol = "tcp"

  [[services.ports]]
    port = 6379
```

## 多区域部署

### 添加区域

```bash
# 查看可用区域
fly platform regions

# 添加区域
fly regions add sin nrt syd

# 查看当前区域
fly regions list

# 移除区域
fly regions remove syd
```

### 区域代码参考

| 代码 | 位置 | 延迟 (亚洲) |
|------|------|-------------|
| `hkg` | 香港 | ~5ms |
| `sin` | 新加坡 | ~30ms |
| `nrt` | 东京 | ~50ms |
| `syd` | 悉尼 | ~100ms |
| `lax` | 洛杉矶 | ~150ms |
| `iad` | 华盛顿 | ~200ms |
| `lhr` | 伦敦 | ~200ms |
| `fra` | 法兰克福 | ~180ms |

### 扩展实例

```bash
# 设置实例数量
fly scale count 3

# 按区域设置实例数
fly scale count hkg=2 sin=1 nrt=1

# 查看当前实例
fly scale show

# 调整实例规格
fly scale vm shared-cpu-2x
fly scale memory 1024

# 或在 fly.toml 中配置
[[vm]]
  cpu_kind = "shared"
  cpus = 2
  memory_mb = 1024
```

## 私有网络

### 服务间通信

```bash
# 查看私有 IP
fly ips private

# 应用间通信使用 .internal 域名
# 格式: <app-name>.internal

# 例如连接到数据库
DATABASE_URL=postgres://user:pass@halolight-db.internal:5432/db
```

### WireGuard 隧道

```bash
# 创建 WireGuard 配置
fly wireguard create

# 查看配置
fly wireguard list

# 导入到 WireGuard 客户端后可直接访问
# 内部服务: http://halolight.internal:3000
```

## 常用命令

```bash
# 应用管理
fly apps list                 # 列出所有应用
fly apps create <name>        # 创建应用
fly apps destroy <name>       # 删除应用

# 部署
fly deploy                    # 部署
fly deploy --remote-only      # 仅远程构建
fly deploy --local-only       # 仅本地构建
fly deploy --strategy rolling # 滚动部署

# 状态与日志
fly status                    # 查看状态
fly logs                      # 查看日志
fly logs -a halolight         # 指定应用日志

# 实例管理
fly machines list             # 列出实例
fly machines start <id>       # 启动实例
fly machines stop <id>        # 停止实例
fly machines destroy <id>     # 销毁实例

# SSH 访问
fly ssh console               # SSH 到实例
fly ssh issue                 # 生成 SSH 证书

# 代理
fly proxy 5432 -a halolight-db  # 代理端口

# 监控
fly dashboard                 # 打开控制台
fly metrics                   # 查看指标

# 发布管理
fly releases                  # 查看发布历史
fly releases rollback         # 回滚到上一版本
```

## 监控与告警

### Prometheus 指标

Fly.io 自动暴露 Prometheus 指标：

```bash
# 访问指标端点
curl https://halolight.fly.dev/_metrics

# 配置 Prometheus 采集
scrape_configs:
  - job_name: 'fly'
    static_configs:
      - targets: ['halolight.fly.dev']
    metrics_path: '/_metrics'
```

### Grafana 集成

```bash
# 部署 Grafana
fly apps create halolight-grafana
fly deploy --config grafana.toml

# 配置数据源连接到 Prometheus
```

### 自定义健康检查

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    region: process.env.FLY_REGION,
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
    },
  };

  const allHealthy = Object.values(checks.checks).every(c => c === 'ok');

  return NextResponse.json(checks, {
    status: allHealthy ? 200 : 503,
  });
}
```

## 自定义域名

### 添加域名

```bash
# 添加自定义域名
fly certs create halolight-fly.h7ml.cn

# 查看证书状态
fly certs show halolight-fly.h7ml.cn

# 列出所有证书
fly certs list
```

### DNS 配置

```
# A 记录
类型: A
名称: halolight-fly
值: <fly-app-ipv4>

# AAAA 记录 (IPv6)
类型: AAAA
名称: halolight-fly
值: <fly-app-ipv6>

# 或使用 CNAME
类型: CNAME
名称: halolight-fly
值: halolight.fly.dev
```

### 获取 IP

```bash
# 查看应用 IP
fly ips list

# 分配专用 IPv4 (付费)
fly ips allocate-v4

# 分配 IPv6 (免费)
fly ips allocate-v6
```

## 常见问题

### Q：部署失败怎么办？

A：检查以下几点：
1. 查看构建日志：`fly logs --build`
2. 检查 Dockerfile 是否正确
3. 确认 fly.toml 配置无误
4. 检查内存是否足够

### Q：如何回滚部署？

A：使用以下命令：

```bash
# 查看发布历史
fly releases

# 回滚到上一版本
fly releases rollback

# 回滚到指定版本
fly releases rollback v5
```

### Q：冷启动太慢？

A：优化建议：
1. 保持 `min_machines_running = 1`
2. 增加实例数量
3. 使用 `auto_start_machines = true`
4. 优化 Docker 镜像大小

### Q：如何调试应用？

A：使用 SSH 访问：

```bash
# SSH 到实例
fly ssh console

# 运行命令
fly ssh console -C "ls -la"

# 查看进程
fly ssh console -C "ps aux"
```

### Q：数据库连接问题？

A：检查以下几点：
1. 确认 DATABASE_URL 正确
2. 使用 `.internal` 域名进行内部连接
3. 检查 PostgreSQL 是否在同一私有网络

## 费用说明

| 资源 | 免费额度 | 超出价格 |
|------|----------|----------|
| 共享 CPU | 3 个实例 | $1.94/月/实例 |
| 内存 | 256MB/实例 | $0.01/GB/小时 |
| 带宽 | 160GB/月 | $0.02/GB |
| IPv4 | - | $2/月 |
| IPv6 | 无限 | 免费 |
| Volumes | 3GB | $0.15/GB/月 |
| PostgreSQL | - | 从 $6.44/月 |

### 性价比配置推荐

```toml
# 开发/测试环境
[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256

# 生产环境
[[vm]]
  cpu_kind = "shared"
  cpus = 2
  memory_mb = 1024
```

## 与其他平台对比

| 特性 | Fly.io | Railway | Render |
|------|--------|---------|--------|
| 全球区域 | 30+ | 2 | 4 |
| 私有网络 | ✅ WireGuard | ✅ | ✅ |
| 托管数据库 | ✅ PostgreSQL | ✅ | ✅ |
| 自动扩缩容 | ✅ | ✅ Pro | ✅ |
| 免费额度 | 3 实例 | $5/月 | 750 小时 |
| Docker 支持 | ✅ 原生 | ✅ | ✅ |
| 边缘计算 | ✅ | ❌ | ❌ |

## 相关链接

- [在线预览](https://halolight-fly.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-fly)
- [Fly.io 官方文档](https://fly.io/docs)
- [Fly.io CLI 参考](https://fly.io/docs/flyctl)
- [Fly.io 区域列表](https://fly.io/docs/reference/regions)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
