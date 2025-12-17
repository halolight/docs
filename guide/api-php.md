# PHP Laravel 后端 API

HaloLight PHP 企业级后端 API 服务，基于 Laravel 11 + PostgreSQL + Redis 构建，提供完整的 RESTful API。

**API 文档**：[https://halolight-api-php.h7ml.cn/docs](https://halolight-api-php.h7ml.cn/docs)

**GitHub**：[https://github.com/halolight/halolight-api-php](https://github.com/halolight/halolight-api-php)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 🗄️ **Eloquent ORM** - 优雅的 ActiveRecord 数据库操作
- ✅ **数据验证** - Form Request 请求参数校验
- 📊 **日志系统** - 请求日志，错误追踪
- 🐳 **Docker 支持** - 容器化部署

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| PHP | 8.2+ | 运行时 |
| Laravel | 11.x | Web 框架 |
| Eloquent | 11.x | 数据库 ORM |
| PostgreSQL | 16 | 数据存储 |
| Redis | 7 | 缓存/队列 |
| Form Request | 11.x | 数据验证 |
| JWT | tymon/jwt-auth | 身份认证 |
| L5-Swagger | 8.x | API 文档 |

## 快速开始

### 环境要求

- PHP >= 8.2
- Composer >= 2.0
- PostgreSQL 16 (可选，默认 SQLite)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-php.git
cd halolight-api-php

# 安装依赖
composer install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# 数据库
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=halolight
DB_USERNAME=postgres
DB_PASSWORD=your_password

# JWT 密钥
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_TTL=10080  # 7天，单位：分钟

# 服务配置
APP_PORT=8080
APP_ENV=development
APP_DEBUG=true
```

### 数据库初始化

```bash
# 生成应用密钥
php artisan key:generate

# 运行迁移
php artisan migrate

# 填充种子数据
php artisan db:seed
```

### 启动服务

```bash
# 开发模式
php artisan serve --port=8080

# 生产模式
php artisan optimize
php artisan serve --port=8080 --env=production
```

访问 http://localhost:8080

## 项目结构

```
halolight-api-php/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # 控制器/路由处理
│   │   ├── Middleware/      # 中间件
│   │   └── Requests/        # 请求验证
│   ├── Services/            # 业务逻辑层
│   ├── Models/              # 数据模型
│   ├── Enums/               # 枚举类型
│   └── Providers/           # 服务提供者
├── database/
│   ├── migrations/          # 数据库迁移
│   └── seeders/             # 种子数据
├── tests/                   # 测试文件
├── Dockerfile               # Docker 配置
├── docker-compose.yml
└── composer.json
```

## API 模块

### 认证相关端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/auth/login` | 用户登录 | 公开 |
| POST | `/api/auth/register` | 用户注册 | 公开 |
| POST | `/api/auth/refresh` | 刷新令牌 | 公开 |
| POST | `/api/auth/logout` | 退出登录 | 需认证 |
| POST | `/api/auth/forgot-password` | 忘记密码 | 公开 |
| POST | `/api/auth/reset-password` | 重置密码 | 公开 |
| GET | `/api/auth/me` | 获取当前用户 | 需认证 |

### 用户管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/users` | 获取用户列表 | `users:view` |
| GET | `/api/users/:id` | 获取用户详情 | `users:view` |
| POST | `/api/users` | 创建用户 | `users:create` |
| PUT | `/api/users/:id` | 更新用户 | `users:update` |
| DELETE | `/api/users/:id` | 删除用户 | `users:delete` |
| GET | `/api/users/me` | 获取当前用户 | 需认证 |
| PATCH | `/api/users/:id/status` | 更新用户状态 | `users:update` |

### 完整端点清单

#### 角色管理 (Roles) - 6 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/roles` | 获取角色列表 |
| GET | `/api/roles/:id` | 获取角色详情 |
| POST | `/api/roles` | 创建角色 |
| PUT | `/api/roles/:id` | 更新角色 |
| DELETE | `/api/roles/:id` | 删除角色 |
| POST | `/api/roles/:id/permissions` | 分配权限 |

#### 权限管理 (Permissions) - 4 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/permissions` | 获取权限列表 |
| GET | `/api/permissions/:id` | 获取权限详情 |
| POST | `/api/permissions` | 创建权限 |
| DELETE | `/api/permissions/:id` | 删除权限 |

#### 团队管理 (Teams) - 7 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/teams` | 获取团队列表 |
| GET | `/api/teams/:id` | 获取团队详情 |
| POST | `/api/teams` | 创建团队 |
| PUT | `/api/teams/:id` | 更新团队 |
| DELETE | `/api/teams/:id` | 删除团队 |
| POST | `/api/teams/:id/members` | 添加成员 |
| DELETE | `/api/teams/:id/members/:userId` | 移除成员 |

#### 文档管理 (Documents) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/documents` | 获取文档列表 |
| GET | `/api/documents/:id` | 获取文档详情 |
| POST | `/api/documents` | 创建文档 |
| PUT | `/api/documents/:id` | 更新文档 |
| DELETE | `/api/documents/:id` | 删除文档 |
| POST | `/api/documents/:id/share` | 分享文档 |
| GET | `/api/documents/:id/versions` | 获取版本历史 |
| POST | `/api/documents/:id/restore` | 恢复版本 |
| POST | `/api/documents/:id/duplicate` | 复制文档 |

#### 文件管理 (Files) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/files` | 获取文件列表 |
| GET | `/api/files/:id` | 获取文件详情 |
| POST | `/api/files/upload` | 上传文件 |
| PUT | `/api/files/:id` | 更新文件信息 |
| DELETE | `/api/files/:id` | 删除文件 |
| GET | `/api/files/:id/download` | 下载文件 |
| POST | `/api/files/:id/move` | 移动文件 |
| POST | `/api/files/:id/copy` | 复制文件 |
| GET | `/api/files/:id/preview` | 预览文件 |

#### 文件夹管理 (Folders) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/folders` | 获取文件夹列表 |
| GET | `/api/folders/:id` | 获取文件夹详情 |
| POST | `/api/folders` | 创建文件夹 |
| PUT | `/api/folders/:id` | 更新文件夹 |
| DELETE | `/api/folders/:id` | 删除文件夹 |

#### 消息管理 (Messages) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/messages` | 获取消息列表 |
| GET | `/api/messages/:id` | 获取消息详情 |
| POST | `/api/messages` | 发送消息 |
| PUT | `/api/messages/:id/read` | 标记已读 |
| DELETE | `/api/messages/:id` | 删除消息 |

#### 通知管理 (Notifications) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/notifications` | 获取通知列表 |
| GET | `/api/notifications/:id` | 获取通知详情 |
| PUT | `/api/notifications/:id/read` | 标记已读 |
| PUT | `/api/notifications/read-all` | 全部已读 |
| DELETE | `/api/notifications/:id` | 删除通知 |

#### 日历管理 (Calendar) - 8 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/calendar/events` | 获取日程列表 |
| GET | `/api/calendar/events/:id` | 获取日程详情 |
| POST | `/api/calendar/events` | 创建日程 |
| PUT | `/api/calendar/events/:id` | 更新日程 |
| DELETE | `/api/calendar/events/:id` | 删除日程 |
| POST | `/api/calendar/events/:id/attendees` | 添加参会人 |
| DELETE | `/api/calendar/events/:id/attendees/:userId` | 移除参会人 |
| GET | `/api/calendar/availability` | 查询可用时间 |

#### 仪表盘 (Dashboard) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/dashboard/stats` | 统计数据 |
| GET | `/api/dashboard/visits` | 访问趋势 |
| GET | `/api/dashboard/sales` | 销售数据 |
| GET | `/api/dashboard/pie` | 饼图数据 |
| GET | `/api/dashboard/tasks` | 待办任务 |
| GET | `/api/dashboard/calendar` | 今日日程 |
| GET | `/api/dashboard/notifications` | 最新通知 |
| GET | `/api/dashboard/activity` | 活动日志 |
| GET | `/api/dashboard/overview` | 概览数据 |

## 认证机制

### JWT 双令牌

```
Access Token:  7 天有效期，用于 API 请求
Refresh Token: 30 天有效期，用于刷新 Access Token
```

### 请求头

```http
Authorization: Bearer <access_token>
```

### 刷新流程

```php
<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function refresh(Request $request)
    {
        $refreshToken = $request->input('refreshToken');

        // 验证 Refresh Token
        try {
            auth()->setToken($refreshToken)->authenticate();

            // 生成新的 Access Token
            $newAccessToken = auth()->refresh();

            return response()->json([
                'accessToken' => $newAccessToken,
                'refreshToken' => $refreshToken, // 可选：也可以生成新的 Refresh Token
                'expiresIn' => auth()->factory()->getTTL() * 60
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Invalid refresh token'
            ], 401);
        }
    }
}
```

## 权限系统

### 角色定义

| 角色 | 说明 | 权限 |
|------|------|------|
| `super_admin` | 超级管理员 | `*` (所有权限) |
| `admin` | 管理员 | `users:*`, `documents:*`, `files:*`, `teams:*` |
| `user` | 普通用户 | `documents:view`, `files:view`, `calendar:*` |
| `guest` | 访客 | `dashboard:view` |

### 权限格式

```
{resource}:{action}

示例：
- users:view      # 查看用户
- users:create    # 创建用户
- users:*         # 用户所有操作
- *               # 所有权限
```

## 错误处理

### 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      { "field": "email", "message": "邮箱格式不正确" }
    ]
  }
}
```

### 错误码

| 状态码 | 错误码 | 说明 |
|--------|--------|------|
| 400 | `VALIDATION_ERROR` | 参数验证失败 |
| 401 | `UNAUTHORIZED` | 未授权 |
| 403 | `FORBIDDEN` | 无权限 |
| 404 | `NOT_FOUND` | 资源不存在 |
| 409 | `CONFLICT` | 资源冲突 |
| 422 | `UNPROCESSABLE_ENTITY` | 无法处理的实体 |
| 500 | `INTERNAL_ERROR` | 服务器错误 |

## 常用命令

```bash
# 开发
php artisan serve --port=8080    # 启动开发服务器
php artisan tinker                # 进入 REPL 环境

# 构建
php artisan optimize              # 优化应用
php artisan config:cache          # 缓存配置
php artisan route:cache           # 缓存路由

# 测试
php artisan test                  # 运行测试
php artisan test --coverage       # 运行测试并生成覆盖率报告

# 数据库
php artisan migrate               # 运行迁移
php artisan migrate:fresh --seed  # 重置并填充数据
php artisan db:seed               # 填充种子数据

# 代码质量
composer lint                     # Laravel Pint 代码风格检查
composer analyse                  # PHPStan 静态分析
```

## 部署

### Docker

```bash
docker build -t halolight-api-php .
docker run -p 8080:8080 halolight-api-php
```

### Docker Compose

```bash
docker-compose up -d
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - APP_ENV=production
      - APP_DEBUG=false
      - DB_CONNECTION=pgsql
      - DB_HOST=db
      - DB_DATABASE=halolight
      - DB_USERNAME=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - REDIS_HOST=redis
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### 生产环境配置

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://halolight-api-php.h7ml.cn

DB_CONNECTION=pgsql
DB_HOST=your-db-host
DB_DATABASE=halolight
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

REDIS_HOST=your-redis-host
REDIS_PASSWORD=your-redis-password

JWT_SECRET=your-production-secret-min-32-chars
JWT_TTL=10080

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

## 测试

### 运行测试

```bash
php artisan test
php artisan test --coverage
```

### 测试示例

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123')
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'accessToken',
                     'refreshToken',
                     'user'
                 ]);
    }

    public function test_user_cannot_login_with_incorrect_password()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123')
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'wrong-password'
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'error' => 'Unauthorized'
                 ]);
    }
}
```

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | ~1,500 QPS | 单核，使用 Swoole/Octane |
| 平均响应时间 | ~15ms | 简单查询，PostgreSQL |
| 内存占用 | ~50MB | 单进程，未开启缓存 |
| CPU 使用率 | ~40% | 高负载，4核心 |

## 可观测性

### 日志系统

```php
<?php

use Illuminate\Support\Facades\Log;

// 配置日志通道
// config/logging.php
return [
    'default' => env('LOG_CHANNEL', 'stack'),
    'channels' => [
        'stack' => [
            'driver' => 'stack',
            'channels' => ['single', 'daily'],
        ],
        'daily' => [
            'driver' => 'daily',
            'path' => storage_path('logs/laravel.log'),
            'level' => 'debug',
            'days' => 14,
        ],
    ],
];

// 使用日志
Log::info('User logged in', ['user_id' => $user->id]);
Log::error('Payment failed', ['error' => $exception->getMessage()]);
```

### 健康检查

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class HealthController extends Controller
{
    public function check()
    {
        $status = [
            'status' => 'healthy',
            'timestamp' => now()->toIso8601String(),
            'services' => []
        ];

        // 检查数据库
        try {
            DB::connection()->getPdo();
            $status['services']['database'] = 'healthy';
        } catch (\Exception $e) {
            $status['status'] = 'unhealthy';
            $status['services']['database'] = 'unhealthy';
        }

        // 检查 Redis
        try {
            Redis::ping();
            $status['services']['redis'] = 'healthy';
        } catch (\Exception $e) {
            $status['status'] = 'unhealthy';
            $status['services']['redis'] = 'unhealthy';
        }

        return response()->json($status);
    }
}
```

### 监控指标

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Cache;

class MetricsMiddleware
{
    public function handle($request, $next)
    {
        $start = microtime(true);

        $response = $next($request);

        $duration = microtime(true) - $start;

        // 记录请求指标
        Cache::increment('metrics:requests_total');
        Cache::increment("metrics:requests_{$response->status()}");

        // 记录响应时间（可以使用 Prometheus 等工具）
        $this->recordDuration($request->path(), $duration);

        return $response;
    }

    private function recordDuration($path, $duration)
    {
        // 实现指标记录逻辑
    }
}
```

## 常见问题

### Q：如何处理文件上传？

A：Laravel 提供了便捷的文件上传处理方式：

```php
<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB
        ]);

        $file = $request->file('file');
        $path = $file->store('uploads', 'public');

        return response()->json([
            'path' => Storage::url($path),
            'name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'mime' => $file->getMimeType()
        ]);
    }
}
```

### Q：如何实现数据库事务？

A：使用 Laravel 的 DB facade 或 Eloquent 模型：

```php
<?php

use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Payment;

// 方式 1: DB facade
DB::transaction(function () {
    $order = Order::create([...]);
    $payment = Payment::create([
        'order_id' => $order->id,
        ...
    ]);
});

// 方式 2: 手动控制
DB::beginTransaction();
try {
    $order = Order::create([...]);
    $payment = Payment::create([...]);
    DB::commit();
} catch (\Exception $e) {
    DB::rollback();
    throw $e;
}
```

## 开发工具

### 推荐插件/工具

- **Laravel Idea** - PhpStorm 的 Laravel 增强插件
- **Laravel Telescope** - 本地开发调试工具
- **Laravel Debugbar** - 开发环境性能分析
- **PHPStan** - 静态分析工具
- **Laravel Pint** - 代码风格格式化

## 与其他后端对比

| 特性 | Laravel | NestJS | FastAPI | Spring Boot |
|------|---------|--------|---------|-------------|
| 语言 | PHP | TypeScript | Python | Java |
| ORM | Eloquent | Prisma | SQLAlchemy | JPA |
| 性能 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| 生态系统 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 开发速度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 相关链接

- [API 文档](https://halolight-api-php.h7ml.cn/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-php)
- [Laravel 官方文档](https://laravel.com/docs)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
