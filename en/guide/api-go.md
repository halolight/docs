# Go Fiber Backend API

HaloLight Go Fiber backend API is built on Fiber 3.0, providing high-performance Go backend service with complete JWT dual-token authentication.

**API Documentation**: [https://halolight-api-go.h7ml.cn/docs](https://halolight-api-go.h7ml.cn/docs)

**GitHub**: [https://github.com/halolight/halolight-api-go](https://github.com/halolight/halolight-api-go)

## Features

- 🔐 **JWT Dual Tokens** - Access Token + Refresh Token with auto-renewal
- 🛡️ **RBAC Permissions** - Role-based access control with wildcard matching
- 📡 **RESTful API** - Standardized interface design with OpenAPI documentation
- 🗄️ **GORM 2** - Type-safe database operations
- ✅ **Data Validation** - Request parameter validation and error handling
- 📊 **Logging System** - Request logging and error tracking
- 🐳 **Docker Support** - Containerized deployment

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Go | 1.22+ | Runtime |
| Fiber | 3.0 | Web Framework |
| GORM | 2.0 | Database ORM |
| PostgreSQL | 16 | Data Storage |
| go-playground/validator | v10 | Data Validation |
| JWT | golang-jwt/jwt/v5 | Authentication |
| Swagger UI | - | API Documentation |

## Quick Start

### Environment Requirements

- Go >= 1.22
- PostgreSQL 16 (optional, defaults to SQLite)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# Install dependencies
go mod download
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/halolight?sslmode=disable

# JWT Secret
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=7d
JWT_REFRESH_EXPIRES=30d

# Service Configuration
PORT=8080
APP_ENV=development
```

### Database Initialization

```bash
# GORM auto-migration
go run cmd/server/main.go

# Or use Makefile
make migrate
```

### Start Service

```bash
# Development mode
go run cmd/server/main.go

# Production mode
make build
./bin/server
```

Visit http://localhost:8080

## Project Structure

```
halolight-api-go/
├── cmd/
│   └── server/
│       └── main.go              # Application entry
├── internal/
│   ├── handlers/                # Controllers/route handlers
│   │   ├── auth_handler.go      # Authentication endpoints
│   │   ├── user_handler.go      # User management
│   │   ├── role_handler.go      # Role management
│   │   ├── permission_handler.go # Permission management
│   │   ├── team_handler.go      # Team management
│   │   ├── document_handler.go  # Document management
│   │   ├── file_handler.go      # File management
│   │   ├── folder_handler.go    # Folder management
│   │   ├── calendar_handler.go  # Calendar events
│   │   ├── notification_handler.go # Notification management
│   │   ├── message_handler.go   # Message management
│   │   ├── dashboard_handler.go # Dashboard statistics
│   │   └── home_handler.go      # Homepage + health check
│   ├── services/                # Business logic layer
│   │   ├── auth_service.go
│   │   ├── user_service.go
│   │   └── ...
│   ├── models/                  # Data models
│   │   ├── user.go
│   │   ├── role.go
│   │   └── ...
│   ├── middleware/              # Middleware
│   │   ├── auth.go
│   │   └── cors.go
│   └── routes/                  # Route configuration
│       └── router.go
├── pkg/
│   ├── config/                  # Configuration management
│   ├── database/                # Database connection
│   └── utils/                   # Utility functions
├── docs/                        # Documentation
├── .github/workflows/           # GitHub Actions
├── Dockerfile                   # Docker configuration
├── docker-compose.yml
└── go.mod
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
| GET | `/api/users` | List users | `users:view` |
| GET | `/api/users/:id` | Get user details | `users:view` |
| POST | `/api/users` | Create user | `users:create` |
| PUT | `/api/users/:id` | Update user | `users:update` |
| DELETE | `/api/users/:id` | Delete user | `users:delete` |
| PATCH | `/api/users/:id/status` | Update user status | `users:update` |
| POST | `/api/users/batch-delete` | Batch delete users | `users:delete` |

### Complete Endpoint List

#### Role Management (Roles) - 6 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/roles` | List roles |
| GET | `/api/roles/:id` | Get role details |
| POST | `/api/roles` | Create role |
| PUT | `/api/roles/:id` | Update role |
| POST | `/api/roles/:id/permissions` | Assign permissions |
| DELETE | `/api/roles/:id` | Delete role |

#### Permission Management (Permissions) - 4 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/permissions` | List permissions |
| GET | `/api/permissions/:id` | Get permission details |
| POST | `/api/permissions` | Create permission |
| DELETE | `/api/permissions/:id` | Delete permission |

#### Team Management (Teams) - 7 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/teams` | List teams |
| GET | `/api/teams/:id` | Get team details |
| POST | `/api/teams` | Create team |
| PATCH | `/api/teams/:id` | Update team |
| DELETE | `/api/teams/:id` | Delete team |
| POST | `/api/teams/:id/members` | Add member |
| DELETE | `/api/teams/:id/members/:userId` | Remove member |

#### Document Management (Documents) - 11 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/documents` | List documents |
| GET | `/api/documents/:id` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/:id` | Update document |
| PATCH | `/api/documents/:id/rename` | Rename document |
| POST | `/api/documents/:id/move` | Move document |
| POST | `/api/documents/:id/tags` | Update tags |
| POST | `/api/documents/:id/share` | Share document |
| POST | `/api/documents/:id/unshare` | Unshare document |
| POST | `/api/documents/batch-delete` | Batch delete |
| DELETE | `/api/documents/:id` | Delete document |

#### File Management (Files) - 14 endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/files/upload` | Upload file |
| POST | `/api/files/folder` | Create folder |
| GET | `/api/files` | List files |
| GET | `/api/files/storage` | Get storage info |
| GET | `/api/files/:id` | Get file details |
| GET | `/api/files/:id/download-url` | Get download URL |
| PATCH | `/api/files/:id/rename` | Rename file |
| POST | `/api/files/:id/move` | Move file |
| POST | `/api/files/:id/copy` | Copy file |
| PATCH | `/api/files/:id/favorite` | Toggle favorite |
| POST | `/api/files/:id/share` | Share file |
| POST | `/api/files/batch-delete` | Batch delete |
| DELETE | `/api/files/:id` | Delete file |

#### Folder Management (Folders) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/folders` | List folders |
| GET | `/api/folders/tree` | Get folder tree |
| GET | `/api/folders/:id` | Get folder details |
| POST | `/api/folders` | Create folder |
| DELETE | `/api/folders/:id` | Delete folder |

#### Message Management (Messages) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/messages/conversations` | List conversations |
| GET | `/api/messages/conversations/:id` | Get conversation details |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |

#### Notification Management (Notifications) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | List notifications |
| GET | `/api/notifications/unread-count` | Get unread count |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

#### Calendar Management (Calendar) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar/events` | List events |
| GET | `/api/calendar/events/:id` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/:id` | Update event |
| PATCH | `/api/calendar/events/:id/reschedule` | Reschedule event |
| POST | `/api/calendar/events/:id/attendees` | Add attendee |
| DELETE | `/api/calendar/events/:id/attendees/:attendeeId` | Remove attendee |
| POST | `/api/calendar/events/batch-delete` | Batch delete |
| DELETE | `/api/calendar/events/:id` | Delete event |

#### Dashboard (Dashboard) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Get statistics |
| GET | `/api/dashboard/visits` | Get visit data |
| GET | `/api/dashboard/sales` | Get sales data |
| GET | `/api/dashboard/products` | Get product data |
| GET | `/api/dashboard/orders` | Get order data |
| GET | `/api/dashboard/activities` | Get activity data |
| GET | `/api/dashboard/pie` | Get pie chart data |
| GET | `/api/dashboard/tasks` | Get task data |
| GET | `/api/dashboard/overview` | Get overview data |

## Authentication Mechanism

### JWT Dual Tokens

```
Access Token:  7 days validity, used for API requests
Refresh Token: 30 days validity, used to refresh Access Token
```

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```go
// Token refresh example
func RefreshToken(c *fiber.Ctx) error {
    type RefreshRequest struct {
        RefreshToken string `json:"refreshToken"`
    }

    var req RefreshRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "success": false,
            "message": "Invalid request",
        })
    }

    // Validate refresh token
    claims, err := utils.ValidateToken(req.RefreshToken)
    if err != nil {
        return c.Status(401).JSON(fiber.Map{
            "success": false,
            "message": "Invalid refresh token",
        })
    }

    // Generate new access token
    accessToken, err := utils.GenerateAccessToken(claims.UserID)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{
            "success": false,
            "message": "Failed to generate token",
        })
    }

    return c.JSON(fiber.Map{
        "success": true,
        "accessToken": accessToken,
    })
}
```

## Permission System

### Role Definitions

| Role | Description | Permissions |
|------|-------------|-------------|
| `super_admin` | Super Administrator | `*` (all permissions) |
| `admin` | Administrator | `users:*`, `documents:*`, `files:*`, `teams:*` |
| `user` | Regular User | `documents:view`, `documents:create`, `files:*` |
| `guest` | Guest | `dashboard:view` |

### Permission Format

```
{resource}:{action}

Examples:
- users:view      # View users
- users:create    # Create users
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

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `VALIDATION_ERROR` | Parameter validation failed |
| 401 | `UNAUTHORIZED` | Unauthorized |
| 403 | `FORBIDDEN` | Forbidden |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 500 | `INTERNAL_ERROR` | Internal server error |

## Common Commands

```bash
# Development
go run cmd/server/main.go

# Build
go build -o bin/server cmd/server/main.go

# Testing
go test ./...

# Database
make migrate

# Code Quality
go vet ./...
golangci-lint run
```

## Deployment

### Docker

```bash
docker build -t halolight-api-go .
docker run -p 8080:8080 halolight-api-go
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
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Production Configuration

```env
APP_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-production-secret
```

## Testing

### Run Tests

```bash
# Unit tests
go test ./...

# Test coverage
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

### Test Example

```go
func TestUserLogin(t *testing.T) {
    app := fiber.New()

    // Setup routes
    app.Post("/api/auth/login", handlers.Login)

    // Prepare test data
    reqBody := `{"email":"test@example.com","password":"password123"}`
    req := httptest.NewRequest("POST", "/api/auth/login", strings.NewReader(reqBody))
    req.Header.Set("Content-Type", "application/json")

    // Execute request
    resp, _ := app.Test(req)

    // Verify response
    assert.Equal(t, 200, resp.StatusCode)
}
```

## Performance Metrics

### Benchmarks

| Metric | Value | Conditions |
|--------|-------|------------|
| Request Throughput | 10,000+ QPS | Single machine, 8-core CPU |
| Average Response Time | < 10ms | Simple queries |
| Memory Usage | ~50MB | Idle state |
| CPU Usage | < 10% | Idle state |

## Observability

### Logging System

```go
// Logging configuration
logger := log.New(os.Stdout, "API: ", log.LstdFlags)

app.Use(func(c *fiber.Ctx) error {
    start := time.Now()
    err := c.Next()
    logger.Printf("%s %s %s %v",
        c.Method(),
        c.Path(),
        c.IP(),
        time.Since(start),
    )
    return err
})
```

### Health Check

```go
// Health check endpoint
app.Get("/health", func(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
        "status": "healthy",
        "timestamp": time.Now(),
        "database": db.Ping() == nil,
    })
})
```

### Monitoring Metrics

```go
// Prometheus metrics
import "github.com/prometheus/client_golang/prometheus"

var (
    requestCounter = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "api_requests_total",
            Help: "Total API requests",
        },
        []string{"method", "path", "status"},
    )
)
```

## FAQ

### Q: JWT secret key length requirements?

A: JWT secret must be at least 32 characters. Recommend using 64+ character random strings.

```bash
# Generate secure key
openssl rand -base64 64
```

### Q: Database connection failed?

A: Check database configuration and network connection.

```bash
# Check PostgreSQL status
docker-compose ps postgres

# Test connection
psql -h localhost -U postgres -d halolight
```

## Development Tools

### Recommended Plugins/Tools

- **Air** - Go hot reload tool
- **golangci-lint** - Go code linter
- **goose** - Database migration tool
- **mockery** - Mock generation tool

## Comparison with Other Backends

| Feature | Go Fiber | NestJS | FastAPI | Spring Boot |
|---------|----------|--------|---------|-------------|
| Language | Go | TypeScript | Python | Java |
| ORM | GORM | Prisma | SQLAlchemy | JPA |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## Related Links

- [API Documentation](https://halolight-api-go.h7ml.cn/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-go)
- [Fiber Official Documentation](https://docs.gofiber.io)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
