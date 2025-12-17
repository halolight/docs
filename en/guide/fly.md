# Fly.io Deployment

HaloLight Fly.io deployment version, a global edge deployment solution that supports multi-region distributed deployments.

**Live Preview**: [https://halolight-fly.h7ml.cn](https://halolight-fly.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-fly](https://github.com/halolight/halolight-fly)

## Features

- ✈️ **Global Edge** - Deploy to 30+ regions worldwide
- 📈 **Auto Scaling** - Scale instances automatically on demand
- 💾 **Volumes** - Persistent storage volume support
- 🔒 **Private Network** - Built-in WireGuard private network
- 📊 **Monitoring Metrics** - Prometheus/Grafana integration
- 🔄 **Blue-Green Deployment** - Zero-downtime rolling deployments
- 🐘 **Managed Databases** - One-click PostgreSQL/Redis creation
- 🖥️ **Machines API** - Fine-grained instance control

## Quick Start

### Option 1: CLI Deployment (Recommended)

```bash
# Install Fly CLI
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# Log in to Fly.io
fly auth login

# Clone the project
git clone https://github.com/halolight/halolight-fly.git
cd halolight-fly

# Initialize the app (creates fly.toml)
fly launch

# Deploy
fly deploy
```

### Option 2: From Dockerfile

```bash
# Clone the project
git clone https://github.com/halolight/halolight-fly.git
cd halolight-fly

# Log in
fly auth login

# Create the app
fly apps create halolight

# Deploy using Dockerfile
fly deploy --dockerfile Dockerfile
```

### Option 3: GitHub Actions

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
          FLY_API_TOKEN: \${{ secrets.FLY_API_TOKEN }}
```

## Configuration Files

### fly.toml

```toml
# App name
app = "halolight"

# Primary region (Hong Kong)
primary_region = "hkg"

# Build configuration
[build]
  dockerfile = "Dockerfile"

# Environment variables
[env]
  NODE_ENV = "production"
  PORT = "3000"
  NEXT_PUBLIC_API_URL = "/api"
  NEXT_PUBLIC_MOCK = "false"

# HTTP service configuration
[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true      # Automatically stop when idle
  auto_start_machines = true     # Automatically start on request
  min_machines_running = 1       # Keep at least 1 instance running
  processes = ["app"]

# TCP service port mapping
[[services]]
  protocol = "tcp"
  internal_port = 3000

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

  # Health checks
  [[services.http_checks]]
    interval = "10s"
    timeout = "2s"
    grace_period = "5s"
    method = "GET"
    path = "/api/health"
    protocol = "http"
    tls_skip_verify = false

  # TCP checks
  [[services.tcp_checks]]
    interval = "15s"
    timeout = "2s"
    grace_period = "1s"

# VM configuration
[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512

# Process groups (multi-process optional)
[processes]
  app = "pnpm start"
  # worker = "pnpm run worker"

# Mount volumes
[mounts]
  source = "halolight_data"
  destination = "/data"
  initial_size = "1gb"

# Deployment strategy
[deploy]
  strategy = "rolling"
  max_unavailable = 0.33

# Static assets
[[statics]]
  guest_path = "/app/public"
  url_prefix = "/static/"
```

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
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

## Environment Variables

### How to Set

```bash
# Set a single variable via CLI
fly secrets set DATABASE_URL="postgresql://user:pass@host:5432/db"

# Set multiple variables via CLI
fly secrets set \\
  JWT_SECRET="your-secret" \\
  REDIS_URL="redis://..."

# Import from .env file
fly secrets import < .env.production

# View existing variables
fly secrets list

# Delete a variable
fly secrets unset DATABASE_URL
```

### Common Variables

| Variable | Description | Example |
|--------|------|------|
| \`NODE_ENV\` | Runtime environment | \`production\` |
| \`PORT\` | Server port | \`3000\` |
| \`NEXT_PUBLIC_API_URL\` | API base URL | \`/api\` |
| \`NEXT_PUBLIC_MOCK\` | Enable mock data | \`false\` |
| \`DATABASE_URL\` | PostgreSQL connection | \`postgresql://...\` |
| \`REDIS_URL\` | Redis connection | \`redis://...\` |
| \`JWT_SECRET\` | JWT secret | \`your-secret-key\` |

### Built-in Variables

Fly.io automatically injects the following environment variables:

```bash
FLY_APP_NAME        # App name
FLY_REGION          # Current region code (e.g., hkg)
FLY_ALLOC_ID        # Instance allocation ID
FLY_PUBLIC_IP       # Public IP
FLY_PRIVATE_IP      # Private network IP
PRIMARY_REGION      # Primary region
```

## Persistent Storage

### Create a Volume

```bash
# Create a Volume in the specified region
fly volumes create halolight_data \\
  --region hkg \\
  --size 10 \\
  --count 1

# View Volumes
fly volumes list

# Expand size
fly volumes extend vol_xxx --size 20

# Delete Volume
fly volumes destroy vol_xxx
```

### Mount Configuration

```toml
# fly.toml
[mounts]
  source = "halolight_data"
  destination = "/data"
```

### Using SQLite

```typescript
// lib/db.ts
import Database from 'better-sqlite3';

const db = new Database('/data/app.db');

// Initialize table schema
db.exec(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT
  )
\`);
```

## Managed Databases

### PostgreSQL

```bash
# Create a PostgreSQL cluster
fly postgres create --name halolight-db

# Optional configuration
fly postgres create \\
  --name halolight-db \\
  --region hkg \\
  --vm-size shared-cpu-1x \\
  --volume-size 10 \\
  --initial-cluster-size 1

# Attach to the app
fly postgres attach halolight-db --app halolight

# This automatically sets the DATABASE_URL environment variable

# Connect to the database (interactive)
fly postgres connect -a halolight-db

# Use psql
fly proxy 5432 -a halolight-db
# Then in another terminal
psql "postgresql://postgres:xxx@localhost:5432/halolight"
```

### Redis

```bash
# Create Redis (Upstash)
fly redis create

# Or use Fly-managed Redis
fly apps create halolight-redis
fly deploy --config redis.toml

# Get connection info
fly redis status halolight-redis
```

### Redis Configuration File

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

## Multi-Region Deployment

### Add Regions

```bash
# View available regions
fly platform regions

# Add regions
fly regions add sin nrt syd

# View current regions
fly regions list

# Remove regions
fly regions remove syd
```

### Region Code Reference

| Code | Location | Latency (Asia) |
|------|----------|----------------|
| `hkg` | Hong Kong | ~5ms |
| `sin` | Singapore | ~30ms |
| `nrt` | Tokyo | ~50ms |
| `syd` | Sydney | ~100ms |
| `lax` | Los Angeles | ~150ms |
| `iad` | Washington | ~200ms |
| `lhr` | London | ~200ms |
| `fra` | Frankfurt | ~180ms |

### Scale Instances

```bash
# Set instance count
fly scale count 3

# Set instance count per region
fly scale count hkg=2 sin=1 nrt=1

# View current instances
fly scale show

# Adjust instance size
fly scale vm shared-cpu-2x
fly scale memory 1024

# Or configure in fly.toml
[[vm]]
  cpu_kind = "shared"
  cpus = 2
  memory_mb = 1024
```

## Private Network

### Service-to-Service Communication

```bash
# View private IPs
fly ips private

# Use the .internal domain for app-to-app communication
# Format: <app-name>.internal

# Example for connecting to the database
DATABASE_URL=postgres://user:pass@halolight-db.internal:5432/db
```

### WireGuard Tunnel

```bash
# Create WireGuard configuration
fly wireguard create

# View configurations
fly wireguard list

# Import into the WireGuard client to access directly
# Internal service: http://halolight.internal:3000
```

## Common Commands

```bash
# App management
fly apps list                 # List all apps
fly apps create <name>        # Create an app
fly apps destroy <name>       # Delete an app

# Deployment
fly deploy                    # Deploy
fly deploy --remote-only      # Remote build only
fly deploy --local-only       # Local build only
fly deploy --strategy rolling # Rolling deployment

# Status and logs
fly status                    # View status
fly logs                      # View logs
fly logs -a halolight         # Logs for a specific app

# Instance management
fly machines list             # List instances
fly machines start <id>       # Start an instance
fly machines stop <id>        # Stop an instance
fly machines destroy <id>     # Destroy an instance

# SSH access
fly ssh console               # SSH into an instance
fly ssh issue                 # Generate SSH certificate

# Proxy
fly proxy 5432 -a halolight-db  # Proxy port

# Monitoring
fly dashboard                 # Open dashboard
fly metrics                   # View metrics

# Release management
fly releases                  # View release history
fly releases rollback         # Roll back to the previous version
```

## Monitoring and Alerts

### Prometheus Metrics

Fly.io automatically exposes Prometheus metrics:

```bash
# Access metrics endpoint
curl https://halolight.fly.dev/_metrics

# Configure Prometheus scraping
scrape_configs:
  - job_name: 'fly'
    static_configs:
      - targets: ['halolight.fly.dev']
    metrics_path: '/_metrics'
```

### Grafana Integration

```bash
# Deploy Grafana
fly apps create halolight-grafana
fly deploy --config grafana.toml

# Configure data source to connect to Prometheus
```

### Custom Health Checks

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

## Custom Domains

### Add a Domain

```bash
# Add a custom domain
fly certs create halolight-fly.h7ml.cn

# View certificate status
fly certs show halolight-fly.h7ml.cn

# List all certificates
fly certs list
```

### DNS Configuration

```
# A record
Type: A
Name: halolight-fly
Value: <fly-app-ipv4>

# AAAA record (IPv6)
Type: AAAA
Name: halolight-fly
Value: <fly-app-ipv6>

# Or use CNAME
Type: CNAME
Name: halolight-fly
Value: halolight.fly.dev
```

### Get IPs

```bash
# View app IPs
fly ips list

# Allocate dedicated IPv4 (paid)
fly ips allocate-v4

# Allocate IPv6 (free)
fly ips allocate-v6
```

## FAQ

### Q: What if deployment fails?

A: Check these items:
1. Inspect build logs: \`fly logs --build\`
2. Confirm the Dockerfile is correct
3. Verify fly.toml is correctly configured
4. Check if memory is sufficient

### Q: How to roll back a deployment?

A: Use the following commands:

```bash
# View release history
fly releases

# Roll back to the previous version
fly releases rollback

# Roll back to a specific version
fly releases rollback v5
```

### Q: Cold starts are too slow?

A: Optimization tips:
1. Keep \`min_machines_running = 1\`
2. Increase the number of instances
3. Use \`auto_start_machines = true\`
4. Optimize Docker image size

### Q: How to debug the app?

A: Use SSH access:

```bash
# SSH into an instance
fly ssh console

# Run a command
fly ssh console -C "ls -la"

# View processes
fly ssh console -C "ps aux"
```

### Q: Database connection issues?

A: Check the following:
1. Confirm DATABASE_URL is correct
2. Use the \`.internal\` domain for internal connections
3. Ensure PostgreSQL is on the same private network

## Pricing

| Resource | Free Tier | Price Beyond |
|----------|-----------|--------------|
| Shared CPU | 3 instances | $1.94/mo/instance |
| Memory | 256MB/instance | $0.01/GB/hour |
| Bandwidth | 160GB/month | $0.02/GB |
| IPv4 | - | $2/month |
| IPv6 | Unlimited | Free |
| Volumes | 3GB | $0.15/GB/month |
| PostgreSQL | - | From $6.44/month |

### Recommended Cost-Effective Configurations

```toml
# Development/Test
[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256

# Production
[[vm]]
  cpu_kind = "shared"
  cpus = 2
  memory_mb = 1024
```

## Comparison With Other Platforms

| Feature | Fly.io | Railway | Render |
|---------|--------|---------|--------|
| Global Regions | 30+ | 2 | 4 |
| Private Network | ✅ WireGuard | ✅ | ✅ |
| Managed Databases | ✅ PostgreSQL | ✅ | ✅ |
| Auto Scaling | ✅ | ✅ Pro | ✅ |
| Free Tier | 3 instances | $5/month | 750 hours |
| Docker Support | ✅ Native | ✅ | ✅ |
| Edge Computing | ✅ | ❌ | ❌ |

## Related Links

- [Live Preview](https://halolight-fly.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-fly)
- [Fly.io Docs](https://fly.io/docs)
- [Fly.io CLI Reference](https://fly.io/docs/flyctl)
- [Fly.io Region List](https://fly.io/docs/reference/regions)
- [HaloLight Docs](https://docs.halolight.h7ml.cn)
