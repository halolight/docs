# PHP Laravel API

HaloLight PHP enterprise-grade backend API service, built with Laravel 11 + PostgreSQL + Redis, providing a complete RESTful API.

**GitHub**: [https://github.com/halolight/halolight-api-php](https://github.com/halolight/halolight-api-php)

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Laravel | 11.x | PHP full-stack framework |
| PHP | 8.2+ | Runtime |
| PostgreSQL | 16 | Relational database |
| Redis | 7 | Cache/Queue |
| JWT | tymon/jwt-auth | Dual token authentication |
| RBAC | spatie/laravel-permission | Permission management |
| Swagger | L5-Swagger | OpenAPI 3.0 documentation |
| Docker | latest | Containerized deployment |

## Core Features

- **JWT Dual Token Auth**: Based on tymon/jwt-auth, supports auto-refresh and blacklist
- **RBAC Permission System**: Using spatie/laravel-permission, supports role inheritance
- **High-Performance Cache**: Redis-driven Session, Cache, Queue
- **Swagger Documentation**: Complete OpenAPI 3.0 interactive documentation
- **Docker Deployment**: Nginx + PHP-FPM + Supervisor multi-process architecture
- **Complete Testing**: PHPUnit unit and feature tests
- **Code Quality**: PHPStan + Laravel Pint ensures code quality

## Directory Structure

```
halolight-api-php/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php           # Base controller
│   │   │   ├── HomeController.php       # Homepage and health check
│   │   │   └── Api/V1/                  # API controllers (12 modules)
│   │   │       ├── AuthController.php
│   │   │       ├── UserController.php
│   │   │       ├── RoleController.php
│   │   │       └── ...
│   │   ├── Middleware/
│   │   │   ├── ForceJsonResponse.php   # Force JSON response
│   │   │   ├── JwtAuthenticate.php     # JWT authentication
│   │   │   └── CheckPermission.php     # Permission check
│   │   └── Requests/                    # Form validation requests
│   ├── Services/                        # Business logic layer
│   ├── Models/                          # Data models (17+ models)
│   ├── Enums/                           # Enum types
│   └── Providers/
├── config/                              # Configuration files
├── routes/
│   ├── web.php                          # Web routes
│   └── api.php                          # API routes
├── tests/
│   ├── Unit/                            # Unit tests
│   └── Feature/                         # Feature tests
├── docker-compose.yml
├── Dockerfile
└── composer.json
```

## Quick Start

### Prerequisites

- PHP 8.2+
- Composer
- PostgreSQL 16
- Redis 7
- Docker (optional)

### Local Development

```bash
# Clone project
git clone https://github.com/halolight/halolight-api-php.git
cd halolight-api-php

# Install dependencies
composer install

# Configure environment variables
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Seed data (optional)
php artisan db:seed

# Start server
php artisan serve --port=8080
```

Access:
- **Homepage**: http://localhost:8080
- **Health Check**: http://localhost:8080/health
- **Swagger Docs**: http://localhost:8080/docs

### Docker Deployment

```bash
# Configure environment variables
cp .env.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app
```

Access: http://localhost:8000

## API Modules

| Module | Endpoints | Description |
|--------|-----------|-------------|
| Auth | 7 | Login, register, refresh, logout, password management |
| Users | 7 | User CRUD, status management |
| Roles | 6 | Role management, permission assignment |
| Permissions | 4 | Permission management |
| Teams | 7 | Team management, member management |
| Documents | 9 | Document CRUD, sharing |
| Files | 9 | File upload, download, management |
| Folders | 5 | Folder tree management |
| Calendar | 8 | Calendar events, attendees |
| Notifications | 5 | Notification management |
| Messages | 5 | Conversations, messages |
| Dashboard | 9 | Statistics data |

## Authentication

### JWT Dual Token Auth

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@halolight.com","password":"password123"}'

# Response
{
  "accessToken": "eyJ...",   // 7 days valid
  "refreshToken": "eyJ...",  // 30 days valid
  "user": { ... }
}

# Use Token to access protected endpoints
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token

```bash
POST /api/auth/refresh
{ "refreshToken": "eyJ..." }
```

## Environment Variables

```env
# Application config
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=http://localhost:8080

# Database
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

# JWT config
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_TTL=10080  # minutes, 7 days

# CORS
CORS_ALLOWED_ORIGINS=*
```

## Common Commands

```bash
# Development
php artisan serve --port=8080   # Start development server

# Database
php artisan migrate              # Run migrations
php artisan migrate:fresh --seed # Reset and seed data
php artisan db:seed              # Seed data

# Code quality
composer lint                    # Code style check
composer test                    # Run tests
composer analyse                 # Static analysis

# Swagger docs
php artisan l5-swagger:generate  # Generate Swagger docs

# Docker
docker-compose up -d             # Start services
docker-compose down              # Stop services
```

## Security Features

- JWT token authentication and auto-refresh
- RBAC role-based permission control
- CORS configuration
- SQL injection protection (Eloquent ORM)
- XSS protection (Laravel auto-escaping)
- CSRF protection (API token mode)
- Rate limiting (Laravel Throttle)
- Password hashing (bcrypt)

## Deployment

### Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy
fly launch

# Set environment variables
fly secrets set \
  APP_KEY="base64:your-app-key" \
  JWT_SECRET="your-jwt-secret" \
  DB_HOST="your-db-host" \
  DB_PASSWORD="your-db-password"

# Deploy
fly deploy
```

## Related Projects

- [halolight-api-go](https://github.com/halolight/halolight-api-go) - Go API
- [halolight-api-node](https://github.com/halolight/halolight-api-node) - Node.js API
- [halolight-api-python](https://github.com/halolight/halolight-api-python) - Python API
- [halolight](https://github.com/halolight/halolight) - Next.js frontend
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 3 frontend
