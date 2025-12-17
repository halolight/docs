# Bun Hono Backend API

HaloLight Bun Backend API is built on Bun + Hono + Drizzle ORM, providing ultra-high-performance backend service.

**API Documentation**: [https://halolight-api-bun.h7ml.cn/docs](https://halolight-api-bun.h7ml.cn/docs)

**GitHub**: [https://github.com/halolight/halolight-api-bun](https://github.com/halolight/halolight-api-bun)

## Features

- 🔐 **JWT Dual Token** - Access Token + Refresh Token, automatic renewal
- 🛡️ **RBAC Authorization** - Role-based access control with wildcard matching
- 📡 **RESTful API** - Standardized interface design, OpenAPI documentation
- 🗄️ **Drizzle ORM** - Type-safe database operations
- ✅ **Data Validation** - Request parameter validation, error handling
- 📊 **Logging System** - Request logging, error tracking
- 🐳 **Docker Support** - Containerized deployment
- ⚡ **Extreme Performance** - 4x faster than Node.js

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Bun | 1.1+ | Runtime |
| Hono | 4.x | Web Framework |
| Drizzle ORM | 0.36+ | Database ORM |
| PostgreSQL | 15+ | Data Storage |
| Zod | 3.x | Data Validation |
| JWT | - | Authentication |
| Swagger | - | API Documentation |

## Quick Start

### Requirements

- Bun >= 1.1
- pnpm >= 8.0
- PostgreSQL (optional, defaults to SQLite)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-bun.git
cd halolight-api-bun

# Install dependencies
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/halolight

# JWT Secrets
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Service Config
PORT=3002
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
API_PREFIX=/api
```

### Database Initialization

```bash
bun run db:push
bun run db:seed
```

### Start Service

```bash
# Development mode
bun run dev

# Production mode
bun run build
bun run start
```

Visit http://localhost:3002

## Project Structure

```
halolight-api-bun/
├── src/
│   ├── routes/          # Controllers/Route handlers
│   ├── services/        # Business logic layer
│   ├── db/              # Data models
│   ├── middleware/      # Middleware
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry
├── test/                # Test files
├── Dockerfile           # Docker configuration
├── docker-compose.yml
└── package.json
```

## API Modules

### Authentication Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh token | Public |
| POST | `/api/auth/logout` | User logout | Required |
| POST | `/api/auth/forgot-password` | Forgot password | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |

### User Management Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/users` | Get user list | `users:view` |
| GET | `/api/users/:id` | Get user details | `users:view` |
| POST | `/api/users` | Create user | `users:create` |
| PUT | `/api/users/:id` | Update user | `users:update` |
| DELETE | `/api/users/:id` | Delete user | `users:delete` |
| GET | `/api/users/me` | Get current user | Required |

### Complete Endpoint List

#### Document Management (Documents) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/:id` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/:id` | Update document |
| DELETE | `/api/documents/:id` | Delete document |

#### File Management (Files) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/files` | Get file list |
| GET | `/api/files/:id` | Get file details |
| POST | `/api/files/upload` | Upload file |
| PUT | `/api/files/:id` | Update file info |
| DELETE | `/api/files/:id` | Delete file |

#### Message Management (Messages) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/messages` | Get message list |
| GET | `/api/messages/:id` | Get message details |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |

#### Notification Management (Notifications) - 4 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | Get notification list |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

#### Calendar Management (Calendar) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar/events` | Get event list |
| GET | `/api/calendar/events/:id` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/:id` | Update event |
| DELETE | `/api/calendar/events/:id` | Delete event |

#### Dashboard (Dashboard) - 6 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Statistics data |
| GET | `/api/dashboard/visits` | Visit trends |
| GET | `/api/dashboard/sales` | Sales data |
| GET | `/api/dashboard/pie` | Pie chart data |
| GET | `/api/dashboard/tasks` | Pending tasks |
| GET | `/api/dashboard/calendar` | Today's events |

## Authentication Mechanism

### JWT Dual Token

```
Access Token:  15 minutes validity, for API requests
Refresh Token: 7 days validity, for refreshing Access Token
```

### Request Header

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```typescript
// Refresh token example
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    refreshToken: 'your_refresh_token'
  })
});

const { accessToken, refreshToken } = await response.json();
```

## Authorization System

### Role Definitions

| Role | Description | Permissions |
|------|-------------|-------------|
| `super_admin` | Super Administrator | `*` (all permissions) |
| `admin` | Administrator | `users:*`, `documents:*`, ... |
| `user` | Regular User | `documents:view`, `files:view`, ... |
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
    "message": "Request validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Error Codes

| Status | Error Code | Description |
|--------|------------|-------------|
| 400 | `VALIDATION_ERROR` | Validation failed |
| 401 | `UNAUTHORIZED` | Unauthorized |
| 403 | `FORBIDDEN` | Forbidden |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 500 | `INTERNAL_ERROR` | Server error |

## Common Commands

```bash
# Development
bun run dev                 # Start development server
bun run build               # Production build
bun run start               # Run production build

# Build
bun run build               # Build production version

# Testing
bun test                    # Run unit tests
bun test --coverage         # Generate coverage report

# Database
bun run db:push             # Push schema to database
bun run db:generate         # Generate migration files
bun run db:migrate          # Run database migrations
bun run db:seed             # Seed test data
bun run db:studio           # Open Drizzle Studio

# Code Quality
bun run lint                # ESLint check
bun run lint:fix            # ESLint auto-fix
bun run type-check          # TypeScript type check
```

## Deployment

### Docker

```bash
docker build -t halolight-api-bun .
docker run -p 3002:3002 halolight-api-bun
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
      - "3002:3002"
    environment:
      - NODE_ENV=production
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
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-production-secret
```

## Testing

### Running Tests

```bash
bun test                    # Run all tests
bun test --coverage         # Generate coverage report
```

### Test Examples

```typescript
// Authentication test example
import { describe, test, expect } from 'bun:test';

describe('Auth API', () => {
  test('should login successfully', async () => {
    const response = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      })
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.accessToken).toBeDefined();
  });
});
```

## Performance Metrics

### Benchmarks

| Metric | Value | Condition |
|--------|-------|-----------|
| Request Throughput | ~50,000 req/s | Single core, simple route |
| Average Response Time | <5ms | Local database |
| Memory Usage | ~30MB | Cold start |
| CPU Usage | <10% | Idle state |

## Observability

### Logging System

```typescript
// Logging configuration example
import { logger } from './utils/logger';

logger.info('User logged in', { userId: user.id });
logger.error('Database error', { error: err.message });
```

### Health Check

```typescript
// GET /health
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Monitoring Metrics

```typescript
// Prometheus metrics endpoint
app.get('/metrics', async (c) => {
  return c.text(await register.metrics());
});
```

## FAQ

### Q: How to configure database connection?

A: Set `DATABASE_URL` in `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/halolight
```

### Q: How to use Bun's built-in password hashing?

A: Use `Bun.password` API:

```typescript
// Hash password
const hash = await Bun.password.hash(password, {
  algorithm: 'bcrypt',
  cost: 10
});

// Verify password
const isValid = await Bun.password.verify(password, hash, 'bcrypt');
```

## Development Tools

### Recommended Tools

- **Drizzle Studio** - Visual database management tool
- **Hoppscotch/Postman** - API testing tools
- **ESLint + Prettier** - Code formatting
- **Bun VSCode Extension** - Bun syntax support

## Comparison with Other Backends

| Feature | Bun + Hono | NestJS | FastAPI | Spring Boot |
|---------|-----------|--------|---------|-------------|
| Language | TypeScript | TypeScript | Python | Java |
| ORM | Drizzle | Prisma | SQLAlchemy | JPA |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## Related Links

- [API Documentation](https://halolight-api-bun.h7ml.cn/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-bun)
- [Bun Official Docs](https://bun.sh/docs)
- [Hono Official Docs](https://hono.dev/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
