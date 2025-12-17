# PHP Laravel Backend API

HaloLight PHP enterprise-grade backend API service, built with Laravel 11 + PostgreSQL + Redis, providing a complete RESTful API.

**API Documentation**: [https://halolight-api-php.h7ml.cn/docs](https://halolight-api-php.h7ml.cn/docs)

**GitHub**: [https://github.com/halolight/halolight-api-php](https://github.com/halolight/halolight-api-php)

## Features

- 🔐 **JWT Dual Token** - Access Token + Refresh Token, automatic renewal
- 🛡️ **RBAC Permissions** - Role-based access control, wildcard matching
- 📡 **RESTful API** - Standardized API design, OpenAPI documentation
- 🗄️ **Eloquent ORM** - Elegant ActiveRecord database operations
- ✅ **Data Validation** - Form Request parameter validation
- 📊 **Logging System** - Request logging, error tracking
- 🐳 **Docker Support** - Containerized deployment

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| PHP | 8.2+ | Runtime |
| Laravel | 11.x | Web Framework |
| Eloquent | 11.x | Database ORM |
| PostgreSQL | 16 | Data Storage |
| Redis | 7 | Cache/Queue |
| Form Request | 11.x | Data Validation |
| JWT | tymon/jwt-auth | Authentication |
| L5-Swagger | 8.x | API Documentation |

## Quick Start

### Requirements

- PHP >= 8.2
- Composer >= 2.0
- PostgreSQL 16 (optional, defaults to SQLite)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-php.git
cd halolight-api-php

# Install dependencies
composer install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Database
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=halolight
DB_USERNAME=postgres
DB_PASSWORD=your_password

# JWT Secret
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_TTL=10080  # 7 days, in minutes

# Service Config
APP_PORT=8080
APP_ENV=development
APP_DEBUG=true
```

### Database Initialization

```bash
# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed data
php artisan db:seed
```

### Start Service

```bash
# Development mode
php artisan serve --port=8080

# Production mode
php artisan optimize
php artisan serve --port=8080 --env=production
```

Visit http://localhost:8080

## Project Structure

```
halolight-api-php/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Controllers/Route handlers
│   │   ├── Middleware/      # Middleware
│   │   └── Requests/        # Request validation
│   ├── Services/            # Business logic layer
│   ├── Models/              # Data models
│   ├── Enums/               # Enum types
│   └── Providers/           # Service providers
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/             # Seed data
├── tests/                   # Test files
├── Dockerfile               # Docker configuration
├── docker-compose.yml
└── composer.json
```

## API Modules

### Authentication Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh token | Public |
| POST | `/api/auth/logout` | Logout | Authenticated |
| POST | `/api/auth/forgot-password` | Forgot password | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |
| GET | `/api/auth/me` | Get current user | Authenticated |

### User Management Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/users` | Get user list | `users:view` |
| GET | `/api/users/:id` | Get user details | `users:view` |
| POST | `/api/users` | Create user | `users:create` |
| PUT | `/api/users/:id` | Update user | `users:update` |
| DELETE | `/api/users/:id` | Delete user | `users:delete` |
| GET | `/api/users/me` | Get current user | Authenticated |
| PATCH | `/api/users/:id/status` | Update user status | `users:update` |

### Complete Endpoint List

#### Role Management (Roles) - 6 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/roles` | Get role list |
| GET | `/api/roles/:id` | Get role details |
| POST | `/api/roles` | Create role |
| PUT | `/api/roles/:id` | Update role |
| DELETE | `/api/roles/:id` | Delete role |
| POST | `/api/roles/:id/permissions` | Assign permissions |

#### Permission Management (Permissions) - 4 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/permissions` | Get permission list |
| GET | `/api/permissions/:id` | Get permission details |
| POST | `/api/permissions` | Create permission |
| DELETE | `/api/permissions/:id` | Delete permission |

#### Team Management (Teams) - 7 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/teams` | Get team list |
| GET | `/api/teams/:id` | Get team details |
| POST | `/api/teams` | Create team |
| PUT | `/api/teams/:id` | Update team |
| DELETE | `/api/teams/:id` | Delete team |
| POST | `/api/teams/:id/members` | Add member |
| DELETE | `/api/teams/:id/members/:userId` | Remove member |

#### Document Management (Documents) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/:id` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/:id` | Update document |
| DELETE | `/api/documents/:id` | Delete document |
| POST | `/api/documents/:id/share` | Share document |
| GET | `/api/documents/:id/versions` | Get version history |
| POST | `/api/documents/:id/restore` | Restore version |
| POST | `/api/documents/:id/duplicate` | Duplicate document |

#### File Management (Files) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/files` | Get file list |
| GET | `/api/files/:id` | Get file details |
| POST | `/api/files/upload` | Upload file |
| PUT | `/api/files/:id` | Update file info |
| DELETE | `/api/files/:id` | Delete file |
| GET | `/api/files/:id/download` | Download file |
| POST | `/api/files/:id/move` | Move file |
| POST | `/api/files/:id/copy` | Copy file |
| GET | `/api/files/:id/preview` | Preview file |

#### Folder Management (Folders) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/folders` | Get folder list |
| GET | `/api/folders/:id` | Get folder details |
| POST | `/api/folders` | Create folder |
| PUT | `/api/folders/:id` | Update folder |
| DELETE | `/api/folders/:id` | Delete folder |

#### Message Management (Messages) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/messages` | Get message list |
| GET | `/api/messages/:id` | Get message details |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |

#### Notification Management (Notifications) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | Get notification list |
| GET | `/api/notifications/:id` | Get notification details |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

#### Calendar Management (Calendar) - 8 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar/events` | Get event list |
| GET | `/api/calendar/events/:id` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/:id` | Update event |
| DELETE | `/api/calendar/events/:id` | Delete event |
| POST | `/api/calendar/events/:id/attendees` | Add attendee |
| DELETE | `/api/calendar/events/:id/attendees/:userId` | Remove attendee |
| GET | `/api/calendar/availability` | Check availability |

#### Dashboard (Dashboard) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Statistics data |
| GET | `/api/dashboard/visits` | Visit trends |
| GET | `/api/dashboard/sales` | Sales data |
| GET | `/api/dashboard/pie` | Pie chart data |
| GET | `/api/dashboard/tasks` | Todo tasks |
| GET | `/api/dashboard/calendar` | Today's schedule |
| GET | `/api/dashboard/notifications` | Latest notifications |
| GET | `/api/dashboard/activity` | Activity log |
| GET | `/api/dashboard/overview` | Overview data |

## Authentication

### JWT Dual Token

```
Access Token:  7 days validity, for API requests
Refresh Token: 30 days validity, for refreshing Access Token
```

### Request Header

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```php
<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function refresh(Request $request)
    {
        $refreshToken = $request->input('refreshToken');

        // Validate Refresh Token
        try {
            auth()->setToken($refreshToken)->authenticate();

            // Generate new Access Token
            $newAccessToken = auth()->refresh();

            return response()->json([
                'accessToken' => $newAccessToken,
                'refreshToken' => $refreshToken, // Optional: can also generate new Refresh Token
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

## Permission System

### Role Definitions

| Role | Description | Permissions |
|------|-------------|-------------|
| `super_admin` | Super Administrator | `*` (all permissions) |
| `admin` | Administrator | `users:*`, `documents:*`, `files:*`, `teams:*` |
| `user` | Regular User | `documents:view`, `files:view`, `calendar:*` |
| `guest` | Guest | `dashboard:view` |

### Permission Format

```
{resource}:{action}

Examples:
- users:view      # View users
- users:create    # Create user
- users:*         # All user operations
- *               # All permissions
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request parameter validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Error Codes

| Status | Error Code | Description |
|--------|-----------|-------------|
| 400 | `VALIDATION_ERROR` | Parameter validation failed |
| 401 | `UNAUTHORIZED` | Unauthorized |
| 403 | `FORBIDDEN` | No permission |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 422 | `UNPROCESSABLE_ENTITY` | Unprocessable entity |
| 500 | `INTERNAL_ERROR` | Server error |

## Common Commands

```bash
# Development
php artisan serve --port=8080    # Start development server
php artisan tinker                # Enter REPL environment

# Build
php artisan optimize              # Optimize application
php artisan config:cache          # Cache configuration
php artisan route:cache           # Cache routes

# Testing
php artisan test                  # Run tests
php artisan test --coverage       # Run tests with coverage report

# Database
php artisan migrate               # Run migrations
php artisan migrate:fresh --seed  # Reset and seed data
php artisan db:seed               # Seed data

# Code quality
composer lint                     # Laravel Pint code style check
composer analyse                  # PHPStan static analysis
```

## Deployment

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

### Production Configuration

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

## Testing

### Run Tests

```bash
php artisan test
php artisan test --coverage
```

### Test Example

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

## Performance Metrics

### Benchmark

| Metric | Value | Description |
|--------|-------|-------------|
| Request Throughput | ~1,500 QPS | Single core, using Swoole/Octane |
| Average Response Time | ~15ms | Simple query, PostgreSQL |
| Memory Usage | ~50MB | Single process, no cache |
| CPU Usage | ~40% | High load, 4 cores |

## Observability

### Logging System

```php
<?php

use Illuminate\Support\Facades\Log;

// Configure log channels
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

// Use logging
Log::info('User logged in', ['user_id' => $user->id]);
Log::error('Payment failed', ['error' => $exception->getMessage()]);
```

### Health Check

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

        // Check database
        try {
            DB::connection()->getPdo();
            $status['services']['database'] = 'healthy';
        } catch (\Exception $e) {
            $status['status'] = 'unhealthy';
            $status['services']['database'] = 'unhealthy';
        }

        // Check Redis
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

### Monitoring Metrics

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

        // Record request metrics
        Cache::increment('metrics:requests_total');
        Cache::increment("metrics:requests_{$response->status()}");

        // Record response time (can use Prometheus or other tools)
        $this->recordDuration($request->path(), $duration);

        return $response;
    }

    private function recordDuration($path, $duration)
    {
        // Implement metrics recording logic
    }
}
```

## FAQ

### Q: How to handle file uploads?

A: Laravel provides convenient file upload handling:

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

### Q: How to implement database transactions?

A: Use Laravel's DB facade or Eloquent models:

```php
<?php

use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Payment;

// Method 1: DB facade
DB::transaction(function () {
    $order = Order::create([...]);
    $payment = Payment::create([
        'order_id' => $order->id,
        ...
    ]);
});

// Method 2: Manual control
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

## Development Tools

### Recommended Plugins/Tools

- **Laravel Idea** - Laravel enhancement plugin for PhpStorm
- **Laravel Telescope** - Local development debugging tool
- **Laravel Debugbar** - Development environment performance analysis
- **PHPStan** - Static analysis tool
- **Laravel Pint** - Code style formatter

## Backend Framework Comparison

| Feature | Laravel | NestJS | FastAPI | Spring Boot |
|---------|---------|--------|---------|-------------|
| Language | PHP | TypeScript | Python | Java |
| ORM | Eloquent | Prisma | SQLAlchemy | JPA |
| Performance | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Ecosystem | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Development Speed | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## Related Links

- [API Documentation](https://halolight-api-php.h7ml.cn/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-php)
- [Laravel Official Documentation](https://laravel.com/docs)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
