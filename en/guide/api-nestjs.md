# TypeScript NestJS Backend API

HaloLight NestJS backend API is built on NestJS 11, providing enterprise-grade backend services with complete RBAC permission system.

**API Documentation**: [https://halolight-api-nestjs.h7ml.cn/docs](https://halolight-api-nestjs.h7ml.cn/docs)

**GitHub**: [https://github.com/halolight/halolight-api-nestjs](https://github.com/halolight/halolight-api-nestjs)

## Features

- 🔐 **JWT Dual Tokens** - Access Token + Refresh Token with auto-renewal
- 🛡️ **RBAC Permissions** - Role-Based Access Control with wildcard matching
- 📡 **RESTful API** - Standardized interface design with OpenAPI documentation
- 🗄️ **Prisma ORM** - Type-safe database operations
- ✅ **Data Validation** - Request parameter validation and error handling
- 📊 **Logging System** - Request logs and error tracking
- 🐳 **Docker Support** - Containerized deployment

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| TypeScript | 5.7 | Runtime |
| NestJS | 11 | Web Framework |
| Prisma | 5 | Database ORM |
| PostgreSQL | 16 | Data Storage |
| class-validator | - | Data Validation |
| JWT | - | Authentication |
| Swagger | - | API Documentation |

## Quick Start

### Requirements

- Node.js >= 18
- pnpm >= 8
- PostgreSQL (optional, defaults to SQLite)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-nestjs.git
cd halolight-api-nestjs

# Install dependencies
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/halolight_db

# JWT Keys
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Service Configuration
PORT=3000
NODE_ENV=development
```

### Database Initialization

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

### Start Service

```bash
# Development mode
pnpm dev

# Production mode
pnpm build
pnpm start:prod
```

Visit http://localhost:3000

## Project Structure

```
halolight-api-nestjs/
├── src/
│   ├── common/                  # Shared modules
│   ├── configs/                 # Configuration modules
│   ├── infrastructure/          # Infrastructure layer
│   ├── modules/                 # Business modules (12 modules)
│   │   ├── auth/                # Authentication
│   │   ├── users/               # User management
│   │   ├── roles/               # Role management
│   │   ├── permissions/         # Permission management
│   │   ├── teams/               # Team management
│   │   ├── documents/           # Document management
│   │   ├── files/               # File management
│   │   ├── folders/             # Folder management
│   │   ├── calendar/            # Calendar management
│   │   ├── notifications/       # Notification management
│   │   ├── messages/            # Message management
│   │   └── dashboard/           # Dashboard statistics
│   ├── app.controller.ts        # Root controller
│   ├── app.service.ts           # Root service
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry
├── prisma/
│   ├── schema.prisma            # Database model definitions
│   └── migrations/              # Database migration history
├── test/                        # Test files
├── Dockerfile                   # Docker configuration
├── docker-compose.yml
└── package.json
```

## API Modules

### Authentication Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh token | Public |
| POST | `/api/auth/logout` | User logout | Required |
| POST | `/api/auth/forgot-password` | Forgot password | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |

### User Management Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/users` | Get user list | `users:view` |
| GET | `/api/users/:id` | Get user details | `users:view` |
| POST | `/api/users` | Create user | `users:create` |
| PUT | `/api/users/:id` | Update user | `users:update` |
| DELETE | `/api/users/:id` | Delete user | `users:delete` |
| GET | `/api/users/me` | Get current user | Required |

### Complete Endpoint List

#### Document Management (Documents) - 11 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/:id` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/:id` | Update document |
| DELETE | `/api/documents/:id` | Delete document |

#### File Management (Files) - 14 endpoints

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

#### Notification Management (Notifications) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | Get notification list |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

#### Calendar Management (Calendar) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar/events` | Get event list |
| GET | `/api/calendar/events/:id` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/:id` | Update event |
| DELETE | `/api/calendar/events/:id` | Delete event |

#### Dashboard (Dashboard) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Statistics data |
| GET | `/api/dashboard/visits` | Visit trends |
| GET | `/api/dashboard/sales` | Sales data |
| GET | `/api/dashboard/pie` | Pie chart data |
| GET | `/api/dashboard/tasks` | Task list |
| GET | `/api/dashboard/overview` | System overview |

## Authentication Mechanism

### JWT Dual Tokens

```
Access Token:  15 minutes validity, used for API requests
Refresh Token: 7 days validity, used to refresh Access Token
```

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```typescript
// Token refresh example
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
});

const { accessToken, refreshToken: newRefreshToken } = await response.json();
```

## Permission System

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

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `VALIDATION_ERROR` | Validation failed |
| 401 | `UNAUTHORIZED` | Unauthorized |
| 403 | `FORBIDDEN` | No permission |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 500 | `INTERNAL_ERROR` | Server error |

## Common Commands

```bash
# Development
pnpm dev              # Start development server
pnpm start:debug      # Debug mode

# Build
pnpm build            # Build for production
pnpm start:prod       # Run production build

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm test:cov         # Generate coverage report

# Database
pnpm prisma:generate  # Generate Prisma Client
pnpm prisma:migrate   # Run migrations
pnpm prisma:studio    # Prisma Studio GUI
pnpm prisma:seed      # Run seed data

# Code Quality
pnpm lint             # ESLint check
pnpm lint:fix         # Auto-fix issues
pnpm format           # Prettier formatting
```

## Deployment

### Docker

```bash
docker build -t halolight-api-nestjs .
docker run -p 3000:3000 halolight-api-nestjs
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
      - "3000:3000"
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

### Run Tests

```bash
pnpm test             # Unit tests
pnpm test:e2e         # E2E tests
pnpm test:cov         # Coverage report
```

### Test Example

```typescript
describe('AuthController', () => {
  it('should login user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });
});
```

## Performance Metrics

### Benchmarks

| Metric | Value | Conditions |
|--------|-------|------------|
| Request Throughput | 5000+ QPS | Single CPU core |
| Average Response Time | <50ms | Simple queries |
| Memory Usage | ~150MB | After startup |
| CPU Usage | <30% | Normal load |

## Observability

### Logging System

```typescript
// Logging configuration
import { WinstonModule } from 'nest-winston';

WinstonModule.forRoot({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Health Check

```typescript
// GET /health
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" }
  }
}
```

### Monitoring Metrics

```typescript
// Prometheus metrics endpoint
// GET /metrics
http_requests_total{method="GET",status="200"} 1234
http_request_duration_seconds{quantile="0.99"} 0.052
```

## FAQ

### Q: How to configure database connection?

A: Set `DATABASE_URL` in `.env` file

```env
DATABASE_URL="postgresql://user:password@localhost:5432/halolight"
```

### Q: How to handle file uploads?

A: Use `FileInterceptor` from `@nestjs/platform-express`

```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return { filename: file.originalname };
}
```

## Development Tools

### Recommended Plugins/Tools

- **Prisma Studio** - Database visualization and management
- **Swagger UI** - API documentation and testing
- **Postman** - API debugging tool
- **NestJS CLI** - Code generation tool

## Backend Comparison

| Feature | NestJS | FastAPI | Spring Boot | Laravel |
|---------|--------|---------|-------------|---------|
| Language | TypeScript | Python | Java | PHP |
| ORM | Prisma | SQLAlchemy | JPA | Eloquent |
| Performance | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |

## Related Links

- [API Documentation](https://halolight-api-nestjs.h7ml.cn/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-nestjs)
- [NestJS Official Docs](https://docs.nestjs.com)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
