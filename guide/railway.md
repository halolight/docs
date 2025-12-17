# Railway 部署

HaloLight Railway 部署版本，针对 Railway 平台优化的一键部署方案。

**在线预览**：[https://halolight-railway.h7ml.cn](https://halolight-railway.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-railway](https://github.com/halolight/halolight-railway)

## 特性

- 🚂 **一键部署** - 模板化快速部署，30 秒上线
- 📈 **自动扩缩容** - 按需自动扩展，零停机部署
- 🐘 **PostgreSQL** - 一键添加托管数据库
- 🔴 **Redis** - 内置缓存服务支持
- 🌐 **自定义域名** - 免费 HTTPS，自动续期
- ⚙️ **环境变量** - 便捷的配置管理，支持引用
- 📊 **监控面板** - 实时资源监控，日志聚合
- 🔄 **自动部署** - Git push 触发自动部署

## 快速开始

### 方式一：一键部署 (推荐)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/halolight)

点击按钮后：
1. 登录 Railway 账号
2. 选择 GitHub 仓库
3. 配置环境变量
4. 自动部署完成

### 方式二：CLI 部署

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录 Railway
railway login

# 克隆项目
git clone https://github.com/halolight/halolight-railway.git
cd halolight-railway

# 初始化 Railway 项目
railway init

# 关联到已有项目 (可选)
railway link

# 部署
railway up
```

### 方式三：GitHub 集成

1. Fork [halolight-railway](https://github.com/halolight/halolight-railway) 仓库
2. 在 Railway 控制台选择 “Deploy from GitHub repo”
3. 选择你的 Fork 仓库
4. 配置环境变量并部署

## 配置文件

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

### nixpacks.toml (可选)

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

## 环境变量

### 应用配置

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 服务端口 | `3000` (Railway 自动设置) |
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `NEXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |

### Railway 变量引用

Railway 支持在环境变量中引用其他服务：

```bash
# 引用自动生成的域名
NEXT_PUBLIC_API_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}/api

# 引用 PostgreSQL 服务
DATABASE_URL=${{Postgres.DATABASE_URL}}

# 引用 Redis 服务
REDIS_URL=${{Redis.REDIS_URL}}

# 引用项目变量
JWT_SECRET=${{shared.JWT_SECRET}}
```

## 添加服务

### PostgreSQL 数据库

```bash
# CLI 方式
railway add --database postgres

# 或在控制台
# 1. 点击 "New Service"
# 2. 选择 "Database" → "PostgreSQL"
# 3. 自动生成 DATABASE_URL
```

生成的环境变量：
- `DATABASE_URL` - 完整连接字符串
- `PGHOST` - 主机地址
- `PGPORT` - 端口
- `PGUSER` - 用户名
- `PGPASSWORD` - 密码
- `PGDATABASE` - 数据库名

### Redis 缓存

```bash
# CLI 方式
railway add --database redis

# 或在控制台
# 1. 点击 "New Service"
# 2. 选择 "Database" → "Redis"
# 3. 自动生成 REDIS_URL
```

生成的环境变量：
- `REDIS_URL` - 完整连接字符串
- `REDISHOST` - 主机地址
- `REDISPORT` - 端口
- `REDISPASSWORD` - 密码

## 自定义域名

### 添加域名

1. 在服务设置中点击 “Settings”
2. 找到 “Domains” 部分
3. 点击 “Generate Domain” (免费 Railway 域名)
4. 或点击 “Add Custom Domain” (自定义域名)

### DNS 配置

```
类型: CNAME
名称: your-subdomain
值: <your-app>.up.railway.app
```

### HTTPS

Railway 自动为所有域名配置 HTTPS：
- 自动申请 Let's Encrypt 证书
- 自动续期
- 强制 HTTPS 重定向

## 常用命令

```bash
# 登录
railway login

# 查看状态
railway status

# 部署
railway up

# 查看日志
railway logs

# 打开控制台
railway open

# 运行远程命令
railway run <command>

# 连接数据库
railway connect postgres

# 环境变量
railway variables
railway variables set KEY=value
```

## 监控与日志

### 实时日志

```bash
# CLI 查看日志
railway logs -f

# 或在控制台
# Service → Deployments → 点击部署 → View Logs
```

### 资源监控

Railway 控制台提供：
- CPU 使用率
- 内存使用量
- 网络流量
- 请求数/响应时间
- 错误率

### 告警设置

1. 进入项目设置
2. 配置 Webhook 通知
3. 支持 Slack、Discord、Email

## 扩缩容

### 手动扩容

```json
// railway.json
{
  "deploy": {
    "numReplicas": 3
  }
}
```

### 自动扩容 (Pro 计划)

Railway Pro 支持基于指标的自动扩容：
- CPU 阈值
- 内存阈值
- 请求队列深度

## 费用说明

| 计划 | 价格 | 特性 |
|------|------|------|
| Hobby | $5/月 | 500 小时执行时间，1GB 内存 |
| Pro | $20/月起 | 无限执行时间，更多资源 |
| Enterprise | 联系销售 | 专属支持，SLA 保障 |

## 常见问题

### Q：部署失败怎么办？

A：检查以下几点：
1. 查看构建日志，确认依赖安装正确
2. 确认 `pnpm-lock.yaml` 已提交
3. 检查环境变量是否配置正确
4. 确认 `start` 命令正确

### Q：如何回滚部署？

A：在 Deployments 页面：
1. 找到之前的成功部署
2. 点击 “Redeploy”
3. 或使用 CLI：`railway rollback`

### Q：如何配置私有网络？

A：Railway 服务间通过内部网络通信：
```bash
# 使用内部 DNS
DATABASE_URL=postgres://user:pass@postgres.railway.internal:5432/db
```

## 与其他平台对比

| 特性 | Railway | Vercel | Fly.io |
|------|---------|--------|--------|
| 一键部署 | ✅ | ✅ | ⚠️ 需 CLI |
| 托管数据库 | ✅ 内置 | ❌ 需外部 | ✅ 内置 |
| 免费额度 | $5/月信用 | 100GB | 3 个共享 VM |
| 自动扩容 | ✅ Pro | ✅ | ✅ |
| 私有网络 | ✅ | ⚠️ 有限 | ✅ |

## 相关链接

- [在线预览](https://halolight-railway.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-railway)
- [Railway 官方文档](https://docs.railway.app)
- [Railway 模板市场](https://railway.app/templates)
- [Railway CLI 文档](https://docs.railway.app/develop/cli)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
