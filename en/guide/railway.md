# Railway Deployment

HaloLight Railway deployment version, one-click deployment to Railway platform.

## Features

- 🚂 **One-Click Deploy** - Quick deployment to Railway
- 📈 **Auto Scaling** - Automatic scaling on demand
- 🐘 **PostgreSQL** - Built-in database service
- 🔴 **Redis** - Built-in cache service
- ⚙️ **Environment Variables** - Convenient configuration management
- 📊 **Monitoring Dashboard** - Real-time resource monitoring

## Quick Start

### Method 1: One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/halolight)

### Method 2: CLI Deploy

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

## Configuration File

### railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "pnpm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Environment Variables

Set in Railway dashboard:

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=${{RAILWAY_PUBLIC_DOMAIN}}
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
```

## Adding Services

### PostgreSQL

1. Click "New Service" in Railway project
2. Select "Database" → "PostgreSQL"
3. Automatically generates `DATABASE_URL` environment variable

### Redis

1. Click "New Service" in Railway project
2. Select "Database" → "Redis"
3. Automatically generates `REDIS_URL` environment variable

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-railway)
- [Live Preview](https://halolight-railway.up.railway.app)
- [Railway Documentation](https://docs.railway.app)
