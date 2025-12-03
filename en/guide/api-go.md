# Go Backend API

HaloLight Go backend API, a high-performance backend service built on Gin/Fiber framework.

## Features

- 🐹 **Go Language** - High performance, concurrency-friendly
- 🔥 **Gin/Fiber** - Optional web frameworks
- 🔐 **JWT Authentication** - Complete authentication and authorization system
- 🛡️ **RBAC Permissions** - Role-based access control
- 🐘 **PostgreSQL** - Relational database support
- 🔴 **Redis Cache** - High-performance caching layer
- 📡 **RESTful API** - Standardized API design

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# Install dependencies
go mod download

# Run development server
go run main.go

# Build production version
go build -o server main.go
```

## Project Structure

```
halolight-api-go/
├── cmd/              # Entry files
├── internal/
│   ├── api/          # API handlers
│   ├── middleware/   # Middleware
│   ├── models/       # Data models
│   ├── repository/   # Data access layer
│   └── service/      # Business logic layer
├── pkg/              # Public packages
├── configs/          # Configuration files
└── main.go
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/v1/auth/login | User login |
| POST | /api/v1/auth/register | User registration |
| GET | /api/v1/users | Get user list |
| GET | /api/v1/users/:id | Get user details |
| PUT | /api/v1/users/:id | Update user |
| DELETE | /api/v1/users/:id | Delete user |

## Environment Variables

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=halolight

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-api-go)
- [API Documentation](https://halolight-api-go.h7ml.cn/swagger)
