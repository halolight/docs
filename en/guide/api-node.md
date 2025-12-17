# Node.js Express Backend API

HaloLight Node.js backend API is built on Express 5 + TypeScript + Prisma, providing enterprise-grade RESTful API service.

**API Documentation**: [https://halolight-api-node.h7ml.cn/docs](https://halolight-api-node.h7ml.cn/docs)

**GitHub**: [https://github.com/halolight/halolight-api-node](https://github.com/halolight/halolight-api-node)

## Features

- 🔐 **Dual JWT Tokens** - Access Token + Refresh Token with auto-renewal
- 🛡️ **RBAC Permissions** - Role-based access control with wildcard matching
- 📡 **RESTful API** - Standardized interface design with OpenAPI documentation
- 🗄️ **Prisma ORM** - Type-safe database operations
- ✅ **Data Validation** - Zod request validation and error handling
- 📊 **Logging System** - Pino logging with request tracking
- 🐳 **Docker Support** - Containerized deployment
- 🎯 **12 Business Modules** - 90+ RESTful endpoints

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | 20+ | JavaScript runtime |
| Express | 5.x | Web framework |
| Prisma | 6.x | Database ORM |
| PostgreSQL | 16 | Data storage |
| Zod | 3.x | Data validation |
| JWT | 9.x | Authentication |
| Pino | 9.x | Logging system |
| Swagger UI | 5.x | API documentation |

## Quick Start

### Requirements

- Node.js >= 20
- pnpm >= 9
- PostgreSQL (optional, defaults to SQLite)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-node.git
cd halolight-api-node

# Install dependencies
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/halolight?schema=public"

# JWT Secrets (must be ≥32 characters)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET="your-refresh-secret-key-minimum-32-characters-long"
REFRESH_TOKEN_EXPIRES_IN=30d

# Service Configuration
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### Database Initialization

```bash
# Generate Prisma Client
pnpm db:generate

# Push database changes
pnpm db:push

# Seed database (optional)
pnpm db:seed
```

### Start Service

```bash
# Development mode
pnpm dev

# Production mode
pnpm build
pnpm start
```

Visit http://localhost:3001

## Project Structure

```
halolight-api-node/
├── src/
│   ├── routes/               # Controllers/Route handlers
│   │   ├── auth.ts          # Authentication routes
│   │   ├── users.ts         # User management
│   │   ├── roles.ts         # Role management
│   │   ├── permissions.ts   # Permission management
│   │   ├── teams.ts         # Team management
│   │   ├── documents.ts     # Document management
│   │   ├── files.ts         # File management
│   │   ├── folders.ts       # Folder management
│   │   ├── calendar.ts      # Calendar events
│   │   ├── notifications.ts # Notification management
│   │   ├── messages.ts      # Message management
│   │   └── dashboard.ts     # Dashboard statistics
│   ├── services/            # Business logic layer
│   ├── middleware/          # Middleware
│   │   ├── auth.ts          # JWT auth + RBAC
│   │   ├── validate.ts      # Zod request validation
│   │   └── error.ts         # Global error handling
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   │   ├── env.ts           # Environment variables
│   │   └── swagger.ts       # Swagger configuration
│   └── index.ts             # Application entry
├── prisma/                  # Database migrations/Schema
│   └── schema.prisma        # Database models (17+ models)
├── tests/                   # Test files
├── Dockerfile               # Docker configuration
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
| POST | `/api/auth/logout` | User logout | Authenticated |
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
| GET | `/api/users/me` | Get current user | Authenticated |

### Complete Endpoint List

#### Role Management (Roles) - 6 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/roles` | Get role list |
| GET | `/api/roles/:id` | Get role details |
| POST | `/api/roles` | Create role |
| PUT | `/api/roles/:id` | Update role |
| DELETE | `/api/roles/:id` | Delete role |
| PUT | `/api/roles/:id/permissions` | Assign permissions |

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

#### Document Management (Documents) - 11 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/:id` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/:id` | Update document |
| DELETE | `/api/documents/:id` | Delete document |
| POST | `/api/documents/:id/share` | Share document |
| DELETE | `/api/documents/:id/share/:shareId` | Unshare document |
| POST | `/api/documents/:id/tags` | Add tag |
| DELETE | `/api/documents/:id/tags/:tagId` | Remove tag |
| POST | `/api/documents/:id/move` | Move document |
| POST | `/api/documents/:id/copy` | Copy document |

#### File Management (Files) - 14 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/files` | Get file list |
| GET | `/api/files/:id` | Get file details |
| POST | `/api/files/upload` | Upload file |
| GET | `/api/files/:id/download` | Download file |
| PUT | `/api/files/:id` | Update file info |
| DELETE | `/api/files/:id` | Delete file |
| POST | `/api/files/:id/move` | Move file |
| POST | `/api/files/:id/copy` | Copy file |
| POST | `/api/files/:id/share` | Share file |
| GET | `/api/files/:id/versions` | Get version history |
| GET | `/api/files/storage` | Get storage info |
| POST | `/api/files/batch-delete` | Batch delete |
| POST | `/api/files/batch-move` | Batch move |
| POST | `/api/files/search` | Search files |

#### Folder Management (Folders) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/folders` | Get folder tree |
| POST | `/api/folders` | Create folder |
| PUT | `/api/folders/:id` | Update folder |
| DELETE | `/api/folders/:id` | Delete folder |
| POST | `/api/folders/:id/move` | Move folder |

#### Calendar Management (Calendar) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar/events` | Get event list |
| GET | `/api/calendar/events/:id` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/:id` | Update event |
| DELETE | `/api/calendar/events/:id` | Delete event |
| POST | `/api/calendar/events/:id/attendees` | Add attendee |
| DELETE | `/api/calendar/events/:id/attendees/:userId` | Remove attendee |
| POST | `/api/calendar/events/:id/reminder` | Set reminder |
| GET | `/api/calendar/events/upcoming` | Get upcoming events |

#### Notification Management (Notifications) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | Get notification list |
| GET | `/api/notifications/:id` | Get notification details |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

#### Message Management (Messages) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/messages/conversations` | Get conversation list |
| GET | `/api/messages/conversations/:id` | Get conversation details |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |

#### Dashboard (Dashboard) - 9 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Statistics data |
| GET | `/api/dashboard/visits` | Visit trends |
| GET | `/api/dashboard/sales` | Sales data |
| GET | `/api/dashboard/pie` | Pie chart data |
| GET | `/api/dashboard/tasks` | To-do tasks |
| GET | `/api/dashboard/calendar` | Today's events |
| GET | `/api/dashboard/activities` | Recent activities |
| GET | `/api/dashboard/notifications` | Unread notifications |
| GET | `/api/dashboard/users` | User statistics |

## Authentication Mechanism

### Dual JWT Tokens

```
Access Token:  7 days validity, used for API requests
Refresh Token: 30 days validity, used to refresh Access Token
```

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```typescript
// POST /api/auth/refresh
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken: 'your_refresh_token' })
});

const { accessToken, refreshToken } = await response.json();
// Update locally stored tokens
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);
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
- users:create    # Create users
- users:*         # All user operations
- *               # All permissions
```

### Permission Validation Example

```typescript
// Using permission middleware in routes
import { requireAuth, requirePermission } from './middleware/auth';

// Requires authentication
router.get('/api/users/me', requireAuth, getUserProfile);

// Requires specific permission
router.post('/api/users', requireAuth, requirePermission('users:create'), createUser);

// Requires one of multiple permissions
router.put('/api/users/:id', requireAuth, requirePermission(['users:update', 'users:*']), updateUser);
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
| 403 | `FORBIDDEN` | Forbidden |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 500 | `INTERNAL_ERROR` | Internal server error |

## Common Commands

```bash
# Development
pnpm dev              # Start dev server (hot reload)
pnpm build            # TypeScript compilation
pnpm start            # Start production server

# Testing
pnpm test             # Run tests
pnpm test:coverage    # Test coverage

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push database changes
pnpm db:migrate       # Run migrations
pnpm db:studio        # Prisma Studio (database GUI)
pnpm db:seed          # Seed database

# Code Quality
pnpm lint             # ESLint check
pnpm lint:fix         # Auto fix
pnpm format           # Prettier formatting
```

## Deployment

### Docker

```bash
docker build -t halolight-api-node .
docker run -p 3001:3001 halolight-api-node
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
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
    restart: unless-stopped
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Production Configuration

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host:5432/halolight
JWT_SECRET=your-production-secret-minimum-32-characters
REFRESH_TOKEN_SECRET=your-refresh-secret-minimum-32-characters
CORS_ORIGIN=https://yourdomain.com
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run test coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Test Examples

```typescript
// tests/auth.test.ts
import request from 'supertest';
import app from '../src/index';

describe('Authentication', () => {
  it('should login successfully', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@halolight.h7ml.cn',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('accessToken');
    expect(response.body.data).toHaveProperty('refreshToken');
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@halolight.h7ml.cn',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
```

## Performance Metrics

### Benchmarks

| Metric | Value | Condition |
|--------|-------|-----------|
| Request Throughput | ~8,000 req/s | Single core, simple queries |
| Average Response Time | <10ms | Local database, no complex queries |
| Memory Usage | ~80MB | Base memory after startup |
| CPU Usage | <5% | Idle state |

### Performance Optimization Tips

- Use connection pooling for database connections
- Enable database indexes to optimize queries
- Implement caching strategy (Redis)
- Use CDN for static assets
- Enable Gzip compression

## Observability

### Logging System

```typescript
// Using Pino logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});

// Log requests
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip
  }, 'Incoming request');
  next();
});
```

### Health Check

```typescript
// GET /health
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'connected'
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    health.status = 'unhealthy';
    health.database = 'disconnected';
    return res.status(503).json(health);
  }

  res.json(health);
});
```

### Monitoring Metrics

```typescript
// Prometheus metrics integration
import promClient from 'prom-client';

const register = new promClient.Registry();

// Default metrics
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});
```

## FAQ

### Q: How to share database across multiple services?

A: Configure the same `DATABASE_URL` and ensure identical Prisma Schema.

```env
# All services use the same database connection
DATABASE_URL="postgresql://user:pass@shared-db:5432/halolight"
```

```bash
# Ensure Schema consistency
pnpm db:push
```

### Q: How to auto-refresh JWT tokens when expired?

A: Detect 401 errors in frontend interceptor and automatically call refresh endpoint.

```typescript
// Axios interceptor example
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('/api/auth/refresh', { refreshToken });

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        // Refresh failed, redirect to login
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
```

### Q: How to implement file upload restrictions?

A: Use multer middleware to configure file size and type limits.

```typescript
import multer from 'multer';

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  }
});

router.post('/api/files/upload', upload.single('file'), uploadFile);
```

### Q: How to enable HTTPS?

A: Use Nginx reverse proxy or configure SSL certificates in Express.

```typescript
// Enable HTTPS in Express
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});
```

## Development Tools

### Recommended Plugins/Tools

- **Prisma Studio** - Visual database management tool (`pnpm db:studio`)
- **Postman** - API testing tool (can import Swagger docs)
- **VSCode Extension Pack** - ESLint + Prettier + TypeScript
- **Docker Desktop** - Container management
- **pgAdmin** - PostgreSQL database management

### VSCode Configuration

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Comparison with Other Backends

| Feature | Express | NestJS | Fastify | Koa |
|---------|---------|--------|---------|-----|
| Language | JavaScript/TypeScript | TypeScript | JavaScript/TypeScript | JavaScript/TypeScript |
| Performance | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Ecosystem | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Built-in Features | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Community Support | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

### Why Choose Express?

- **Mature and Stable** - Over 10 years of production validation
- **High Flexibility** - Minimalist framework with free middleware composition
- **Rich Ecosystem** - Massive third-party plugins and tools
- **Low Learning Curve** - Simple and easy to understand for quick start
- **Active Community** - Abundant documentation and Q&A resources

## Related Links

- [API Documentation](https://halolight-api-node.h7ml.cn/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-node)
- [Express Official Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
