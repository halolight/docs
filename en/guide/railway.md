# Railway Deployment

HaloLight Railway deployment edition, an optimized one-click deployment solution tailored for the Railway platform.

**Live Preview**: [https://halolight-railway.h7ml.cn](https://halolight-railway.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-railway](https://github.com/halolight/halolight-railway)

## Features

- 🚂 **One-Click Deploy** - Templated fast deployment, live in 30 seconds
- 📈 **Auto Scaling** - On-demand auto scaling, zero-downtime deploys
- 🐘 **PostgreSQL** - One-click managed database
- 🔴 **Redis** - Built-in cache service support
- 🌐 **Custom Domains** - Free HTTPS with auto renewal
- ⚙️ **Environment Variables** - Convenient config management with references
- 📊 **Monitoring Panel** - Real-time resource monitoring and log aggregation
- 🔄 **Auto Deployments** - Git push triggers automatic deploys

## Quick Start

### Method 1: One-Click Deploy (Recommended)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/halolight)

After clicking the button:
1. Sign in to your Railway account
2. Choose the GitHub repository
3. Configure environment variables
4. Deployment completes automatically

### Method 2: CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Sign in to Railway
railway login

# Clone the project
git clone https://github.com/halolight/halolight-railway.git
cd halolight-railway

# Initialize Railway project
railway init

# Link to an existing project (optional)
railway link

# Deploy
railway up
```

### Method 3: GitHub Integration

1. Fork the [halolight-railway](https://github.com/halolight/halolight-railway) repository
2. In the Railway console select "Deploy from GitHub repo"
3. Choose your forked repo
4. Configure environment variables and deploy

## Configuration Files

### railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pnpm install && pnpm build"
  },
  "deploy": {
    "startCommand": "pnpm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10,
    "numReplicas": 1
  }
}
```

### nixpacks.toml (Optional)

```toml
[phases.setup]
nixPkgs = ["nodejs_20", "pnpm"]

[phases.install]
cmds = ["pnpm install --frozen-lockfile"]

[phases.build]
cmds = ["pnpm build"]

[start]
cmd = "pnpm start"
```

## Environment Variables

### App Configuration

| Variable | Description | Example |
|--------|------|------|
| `NODE_ENV` | Runtime environment | `production` |
| `PORT` | Server port | `3000` (Railway sets automatically) |
| `NEXT_PUBLIC_API_URL` | API base URL | `/api` |
| `NEXT_PUBLIC_MOCK` | Enable mock data | `false` |
| `NEXT_PUBLIC_APP_TITLE` | App title | `Admin Pro` |

### Railway Variable References

Railway lets you reference other services in env vars:

```bash
# Reference the auto-generated domain
NEXT_PUBLIC_API_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}/api

# Reference PostgreSQL service
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Reference Redis service
REDIS_URL=${{Redis.REDIS_URL}}

# Reference project variables
JWT_SECRET=${{shared.JWT_SECRET}}
```

## Add Services

### PostgreSQL Database

```bash
# Via CLI
railway add --database postgres

# Or in the console
# 1. Click "New Service"
# 2. Select "Database" → "PostgreSQL"
# 3. DATABASE_URL is generated automatically
```

Generated environment variables:
- `DATABASE_URL` - Full connection string
- `PGHOST` - Host
- `PGPORT` - Port
- `PGUSER` - Username
- `PGPASSWORD` - Password
- `PGDATABASE` - Database name

### Redis Cache

```bash
# Via CLI
railway add --database redis

# Or in the console
# 1. Click "New Service"
# 2. Select "Database" → "Redis"
# 3. REDIS_URL is generated automatically
```

Generated environment variables:
- `REDIS_URL` - Full connection string
- `REDISHOST` - Host
- `REDISPORT` - Port
- `REDISPASSWORD` - Password

## Custom Domains

### Add a Domain

1. In service settings click "Settings"
2. Find the "Domains" section
3. Click "Generate Domain" (free Railway domain)
4. Or click "Add Custom Domain" (custom domain)

### DNS Configuration

```
Type: CNAME
Name: your-subdomain
Value: <your-app>.up.railway.app
```

### HTTPS

Railway automatically configures HTTPS for all domains:
- Automatically requests Let's Encrypt certificates
- Auto renews
- Forces HTTPS redirects

## Common Commands

```bash
# Sign in
railway login

# View status
railway status

# Deploy
railway up

# View logs
railway logs

# Open console
railway open

# Run remote command
railway run <command>

# Connect to database
railway connect postgres

# Environment variables
railway variables
railway variables set KEY=value
```

## Monitoring and Logs

### Real-Time Logs

```bash
# View logs via CLI
railway logs -f

# Or in the console
# Service → Deployments → click a deployment → View Logs
```

### Resource Monitoring

Railway console provides:
- CPU usage
- Memory usage
- Network traffic
- Request count/response time
- Error rate

### Alerting

1. Go to project settings
2. Configure webhook notifications
3. Supports Slack, Discord, Email

## Scaling

### Manual Scaling

```json
// railway.json
{
  "deploy": {
    "numReplicas": 3
  }
}
```

### Auto Scaling (Pro Plan)

Railway Pro supports metric-based autoscaling:
- CPU threshold
- Memory threshold
- Request queue depth

## Pricing

| Plan | Price | Features |
|------|------|------|
| Hobby | $5/mo | 500 execution hours, 1GB RAM |
| Pro | $20/mo+ | Unlimited hours, more resources |
| Enterprise | Contact sales | Dedicated support, SLA guarantees |

## FAQ

### Q: What if deployment fails?

A: Check these items:
1. Inspect build logs to confirm dependencies installed correctly
2. Make sure `pnpm-lock.yaml` is committed
3. Verify environment variables are set correctly
4. Confirm the `start` command is correct

### Q: How to roll back a deployment?

A: In the Deployments page:
1. Find a previous successful deployment
2. Click "Redeploy"
3. Or use CLI: `railway rollback`

### Q: How to configure private networking?

A: Railway services communicate over the internal network:
```bash
# Use internal DNS
DATABASE_URL=postgres://user:pass@postgres.railway.internal:5432/db
```

## Comparison with Other Platforms

| Feature | Railway | Vercel | Fly.io |
|------|---------|--------|--------|
| One-Click Deploy | ✅ | ✅ | ⚠️ CLI required |
| Managed Database | ✅ Built-in | ❌ External needed | ✅ Built-in |
| Free Tier/Credit | $5/mo credit | 100GB | 3 shared VMs |
| Auto Scaling | ✅ Pro | ✅ | ✅ |
| Private Network | ✅ | ⚠️ Limited | ✅ |

## Related Links

- [Live Preview](https://halolight-railway.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-railway)
- [Railway Official Docs](https://docs.railway.app)
- [Railway Template Marketplace](https://railway.app/templates)
- [Railway CLI Docs](https://docs.railway.app/develop/cli)
- [HaloLight Docs](https://docs.halolight.h7ml.cn)
