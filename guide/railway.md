# Railway 部署

HaloLight Railway 部署版本，一键部署到 Railway 平台。

## 特性

- 🚂 **一键部署** - 快速部署到 Railway
- 📈 **自动扩缩容** - 按需自动扩展
- 🐘 **PostgreSQL** - 内置数据库服务
- 🔴 **Redis** - 内置缓存服务
- ⚙️ **环境变量** - 便捷的配置管理
- 📊 **监控面板** - 实时资源监控

## 快速开始

### 方式一：一键部署

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/halolight)

### 方式二：CLI 部署

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 初始化项目
railway init

# 部署
railway up
```

## 配置文件

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

## 环境变量

在 Railway 控制台设置：

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=${{RAILWAY_PUBLIC_DOMAIN}}
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
```

## 添加服务

### PostgreSQL

1. 在 Railway 项目中点击 “New Service”
2. 选择 “Database” → “PostgreSQL”
3. 自动生成 `DATABASE_URL` 环境变量

### Redis

1. 在 Railway 项目中点击 “New Service”
2. 选择 “Database” → “Redis”
3. 自动生成 `REDIS_URL` 环境变量

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-railway)
- [在线预览](https://halolight-railway.up.railway.app)
- [Railway 文档](https://docs.railway.app)
