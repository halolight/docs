# PHP Laravel API

HaloLight PHP 企业级后端 API 服务，基于 Laravel 11 + PostgreSQL + Redis 构建，提供完整的 RESTful API。

**GitHub**：[https://github.com/halolight/halolight-api-php](https://github.com/halolight/halolight-api-php)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Laravel | 11.x | PHP 全栈框架 |
| PHP | 8.2+ | 运行时 |
| PostgreSQL | 16 | 关系型数据库 |
| Redis | 7 | 缓存/队列 |
| JWT | tymon/jwt-auth | 双令牌认证 |
| RBAC | spatie/laravel-permission | 权限管理 |
| Swagger | L5-Swagger | OpenAPI 3.0 文档 |
| Docker | latest | 容器化部署 |

## 核心特性

- **JWT 双令牌认证**：基于 tymon/jwt-auth，支持自动刷新和黑名单
- **RBAC 权限系统**：使用 spatie/laravel-permission，支持角色继承
- **高性能缓存**：Redis 驱动的 Session、Cache、Queue
- **Swagger 文档**：完整的 OpenAPI 3.0 交互式文档
- **Docker 部署**：Nginx + PHP-FPM + Supervisor 多进程架构
- **完整测试**：PHPUnit 单元测试和功能测试
- **代码质量**：PHPStan + Laravel Pint 保证代码质量

## 目录结构

```
halolight-api-php/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php           # 基础控制器
│   │   │   ├── HomeController.php       # 首页和健康检查
│   │   │   └── Api/V1/                  # API 控制器 (12 个模块)
│   │   │       ├── AuthController.php
│   │   │       ├── UserController.php
│   │   │       ├── RoleController.php
│   │   │       └── ...
│   │   ├── Middleware/
│   │   │   ├── ForceJsonResponse.php   # 强制 JSON 响应
│   │   │   ├── JwtAuthenticate.php     # JWT 认证
│   │   │   └── CheckPermission.php     # 权限检查
│   │   └── Requests/                    # 表单验证请求
│   ├── Services/                        # 业务逻辑层
│   ├── Models/                          # 数据模型 (17+ 模型)
│   ├── Enums/                           # 枚举类型
│   └── Providers/
├── config/                              # 配置文件
├── routes/
│   ├── web.php                          # Web 路由
│   └── api.php                          # API 路由
├── tests/
│   ├── Unit/                            # 单元测试
│   └── Feature/                         # 功能测试
├── docker-compose.yml
├── Dockerfile
└── composer.json
```

## 快速开始

### 前提条件

- PHP 8.2+
- Composer
- PostgreSQL 16
- Redis 7
- Docker (可选)

### 本地开发

```bash
# 克隆项目
git clone https://github.com/halolight/halolight-api-php.git
cd halolight-api-php

# 安装依赖
composer install

# 配置环境变量
cp .env.example .env
php artisan key:generate

# 运行迁移
php artisan migrate

# 填充种子数据 (可选)
php artisan db:seed

# 启动服务
php artisan serve --port=8080
```

访问：
- **首页**：http://localhost:8080
- **健康检查**：http://localhost:8080/health
- **Swagger 文档**：http://localhost:8080/docs

### Docker 部署

```bash
# 配置环境变量
cp .env.example .env

# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f app
```

访问：http://localhost:8000

## API 模块

| 模块 | 端点 | 说明 |
|------|------|------|
| Auth | 7 | 登录、注册、刷新、登出、密码管理 |
| Users | 7 | 用户增删改查、状态管理 |
| Roles | 6 | 角色管理、权限分配 |
| Permissions | 4 | 权限管理 |
| Teams | 7 | 团队管理、成员管理 |
| Documents | 9 | 文档增删改查、分享 |
| Files | 9 | 文件上传、下载、管理 |
| Folders | 5 | 文件夹树形管理 |
| Calendar | 8 | 日历事件、参会人 |
| Notifications | 5 | 通知管理 |
| Messages | 5 | 会话、消息 |
| Dashboard | 9 | 统计数据 |

## 认证机制

### JWT 双令牌认证

```bash
# 登录
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@halolight.com","password":"password123"}'

# 响应
{
  "accessToken": "eyJ...",   // 7天有效
  "refreshToken": "eyJ...",  // 30天有效
  "user": { ... }
}

# 使用 Token 访问受保护的端点
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 刷新令牌

```bash
POST /api/auth/refresh
{ "refreshToken": "eyJ..." }
```

## 环境变量

```env
# 应用配置
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=http://localhost:8080

# 数据库
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=halolight
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
CACHE_DRIVER=redis
SESSION_DRIVER=redis

# JWT 配置
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_TTL=10080  # 分钟，7天

# CORS
CORS_ALLOWED_ORIGINS=*
```

## 常用命令

```bash
# 开发
php artisan serve --port=8080   # 启动开发服务器

# 数据库
php artisan migrate              # 运行迁移
php artisan migrate:fresh --seed # 重置并填充数据
php artisan db:seed              # 填充种子数据

# 代码质量
composer lint                    # 代码风格检查
composer test                    # 运行测试
composer analyse                 # 静态分析

# Swagger 文档
php artisan l5-swagger:generate  # 生成 Swagger 文档

# Docker
docker-compose up -d             # 启动服务
docker-compose down              # 停止服务
```

## 安全特性

- JWT 令牌认证和自动刷新
- RBAC 基于角色的权限控制
- CORS 跨域配置
- SQL 注入防护 (Eloquent ORM)
- XSS 防护 (Laravel 自动转义)
- CSRF 保护 (API 令牌模式)
- 速率限制 (Laravel Throttle)
- 密码哈希 (bcrypt)

## 部署

### Fly.io

```bash
# 安装 flyctl
curl -L https://fly.io/install.sh | sh

# 登录
fly auth login

# 部署
fly launch

# 设置环境变量
fly secrets set \
  APP_KEY="base64:your-app-key" \
  JWT_SECRET="your-jwt-secret" \
  DB_HOST="your-db-host" \
  DB_PASSWORD="your-db-password"

# 部署
fly deploy
```

## 相关项目

- [halolight-api-go](https://github.com/halolight/halolight-api-go) - Go 版本 API
- [halolight-api-node](https://github.com/halolight/halolight-api-node) - Node.js 版本 API
- [halolight-api-python](https://github.com/halolight/halolight-api-python) - Python 版本 API
- [halolight](https://github.com/halolight/halolight) - Next.js 前端
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 3 前端
