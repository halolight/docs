# Deno Fresh Backend API

HaloLight Deno backend API is built on Fresh framework and Deno KV, using the native Deno runtime to provide high-performance RESTful API services.

**API Documentation**: [https://halolight-deno.h7ml.cn/docs](https://halolight-deno.h7ml.cn/docs)

**GitHub**: [https://github.com/halolight/halolight-deno](https://github.com/halolight/halolight-deno)

## Features

- 🔐 **JWT Dual Tokens** - Access Token + Refresh Token with auto-renewal
- 🛡️ **RBAC Permissions** - Role-based access control with wildcard matching
- 📡 **RESTful API** - Standardized interface design with OpenAPI documentation
- 💾 **Deno KV** - Built-in key-value storage, no external database needed
- ⚡ **Islands Architecture** - Partial hydration for extreme performance
- ✅ **Data Validation** - Request parameter validation and error handling
- 📊 **Logging System** - Request logs and error tracking
- 🐳 **Docker Support** - Containerized deployment

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Deno | 2.x | Runtime (built-in TypeScript) |
| Fresh | 1.x | Deno-native web framework |
| Preact | 10.x | Lightweight UI library |
| Deno KV | - | Built-in key-value storage (database) |
| Hono | 4.x | API routing framework (optional) |
| JWT | - | Authentication |
| Tailwind CSS | 3.x | Atomic CSS |

## Quick Start

### Requirements

- Deno >= 2.0.0

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-deno.git
cd halolight-deno

# No dependency install needed, Deno manages automatically
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# API Configuration
API_URL=/api
USE_MOCK=true

# JWT Secret
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Deno KV (optional, local by default)
DENO_KV_PATH=./data/kv.db

# Service Configuration
PORT=8000
NODE_ENV=development

# Demo Account
DEMO_EMAIL=admin@halolight.h7ml.cn
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=false

# Brand Configuration
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
```

### Database Initialization

```bash
# Deno KV requires no migration, auto-creates
# If seed data needed
deno task seed
```

### Start Service

```bash
# Development mode
deno task dev

# Production mode
deno task build
deno task start
```

Visit http://localhost:8000

## Project Structure

```
halolight-deno/
├── routes/                  # Route handlers
│   ├── api/                 # API endpoints
│   │   ├── auth/            # Auth routes
│   │   ├── users/           # User routes
│   │   ├── dashboard/       # Dashboard routes
│   │   ├── documents/       # Document routes
│   │   ├── files/           # File routes
│   │   ├── messages/        # Message routes
│   │   ├── notifications/   # Notification routes
│   │   └── calendar/        # Calendar routes
│   ├── (auth)/              # Auth pages
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   └── (dashboard)/         # Dashboard pages
│       ├── index.tsx
│       ├── users.tsx
│       └── settings.tsx
├── utils/                   # Utilities
│   ├── auth.ts              # Auth utilities
│   ├── kv.ts                # Deno KV wrapper
│   ├── permissions.ts       # Permission checks
│   ├── jwt.ts               # JWT utilities
│   └── validation.ts        # Data validation
├── islands/                 # Interactive components (client-side)
│   ├── AuthProvider.tsx
│   ├── ThemeToggle.tsx
│   └── Dashboard.tsx
├── components/              # UI components
│   ├── ui/
│   ├── layout/
│   └── dashboard/
├── static/                  # Static assets
├── fresh.gen.ts             # Fresh generated file
├── fresh.config.ts          # Fresh config
├── deno.json                # Deno config
└── import_map.json          # Import map
```

## API Modules

### Authentication Endpoints

| Method | Path | Description | Permission |
|------|------|------|------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh token | Public |
| POST | `/api/auth/logout` | User logout | Authenticated |
| POST | `/api/auth/forgot-password` | Forgot password | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |

### User Management Endpoints

| Method | Path | Description | Permission |
|------|------|------|------|
| GET | `/api/users` | Get user list | `users:view` |
| GET | `/api/users/:id` | Get user details | `users:view` |
| POST | `/api/users` | Create user | `users:create` |
| PUT | `/api/users/:id` | Update user | `users:update` |
| DELETE | `/api/users/:id` | Delete user | `users:delete` |
| GET | `/api/users/me` | Get current user | Authenticated |

### Complete Endpoint List

#### Document Management (Documents) - 5 endpoints

| Method | Path | Description |
|------|------|------|
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/:id` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/:id` | Update document |
| DELETE | `/api/documents/:id` | Delete document |

#### File Management (Files) - 5 endpoints

| Method | Path | Description |
|------|------|------|
| GET | `/api/files` | Get file list |
| GET | `/api/files/:id` | Get file details |
| POST | `/api/files/upload` | Upload file |
| PUT | `/api/files/:id` | Update file info |
| DELETE | `/api/files/:id` | Delete file |

#### Message Management (Messages) - 5 endpoints

| Method | Path | Description |
|------|------|------|
| GET | `/api/messages` | Get message list |
| GET | `/api/messages/:id` | Get message details |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |

#### Notification Management (Notifications) - 4 endpoints

| Method | Path | Description |
|------|------|------|
| GET | `/api/notifications` | Get notification list |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

#### Calendar Management (Calendar) - 5 endpoints

| Method | Path | Description |
|------|------|------|
| GET | `/api/calendar/events` | Get event list |
| GET | `/api/calendar/events/:id` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/:id` | Update event |
| DELETE | `/api/calendar/events/:id` | Delete event |

#### Dashboard - 6 endpoints

| Method | Path | Description |
|------|------|------|
| GET | `/api/dashboard/stats` | Statistics data |
| GET | `/api/dashboard/visits` | Visit trends |
| GET | `/api/dashboard/sales` | Sales data |
| GET | `/api/dashboard/pie` | Pie chart data |
| GET | `/api/dashboard/tasks` | Todo tasks |
| GET | `/api/dashboard/calendar` | Today's schedule |

## Authentication

### JWT Dual Tokens

```
Access Token:  15-minute validity for API requests
Refresh Token: 7-day validity for refreshing Access Token
```

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```typescript
// utils/jwt.ts
import { create, verify } from "https://deno.land/x/djwt@v3.0.0/mod.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);

export async function createAccessToken(userId: string): Promise<string> {
  return await create(
    { alg: "HS256", typ: "JWT" },
    { userId, exp: Date.now() + 15 * 60 * 1000 }, // 15 minutes
    key,
  );
}

export async function refreshToken(refreshToken: string): Promise<string> {
  const payload = await verify(refreshToken, key);
  return await createAccessToken(payload.userId as string);
}
```

## Permission System

### Role Definitions

| Role | Description | Permissions |
|------|------|------|
| `super_admin` | Super Administrator | `*` (all permissions) |
| `admin` | Administrator | `users:*`, `documents:*`, `files:*`, `messages:*`, `calendar:*` |
| `user` | Regular User | `documents:view`, `files:view`, `messages:view`, `calendar:view` |
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

### Permission Check Implementation

```typescript
// utils/permissions.ts
export function hasPermission(user: User, permission: string): boolean {
  const userPermissions = user.permissions || [];

  return userPermissions.some((p) => {
    if (p === "*") return true;
    if (p.endsWith(":*")) {
      const resource = p.slice(0, -2);
      return permission.startsWith(resource + ":");
    }
    return p === permission;
  });
}

// Route middleware
export function requirePermission(permission: string) {
  return async (req: Request, ctx: any) => {
    const user = ctx.state.user;
    if (!hasPermission(user, permission)) {
      return new Response("Forbidden", { status: 403 });
    }
    return await ctx.next();
  };
}
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
|--------|--------|------|
| 400 | `VALIDATION_ERROR` | Parameter validation failed |
| 401 | `UNAUTHORIZED` | Unauthorized |
| 403 | `FORBIDDEN` | Forbidden |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 500 | `INTERNAL_ERROR` | Server error |

## Common Commands

```bash
# Development
deno task dev              # Start dev server (hot reload)

# Build
deno task build            # Build production bundle

# Testing
deno test                  # Run tests
deno test --coverage       # Test coverage

# Database
deno task seed             # Initialize seed data

# Code Quality
deno lint                  # Lint
deno fmt                   # Format
deno check **/*.ts         # Type check
```

## Deployment

### Docker

```bash
docker build -t halolight-deno .
docker run -p 8000:8000 halolight-deno
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
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - DENO_KV_PATH=/data/kv.db
    volumes:
      - deno_kv_data:/data
    restart: unless-stopped

volumes:
  deno_kv_data:
```

### Deno Deploy (Recommended)

```bash
# Install deployctl
deno install -Arf jsr:@deno/deployctl

# Deploy to Deno Deploy
deployctl deploy --project=halolight-deno main.ts
```

### Production Configuration

```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key-min-32-chars
DENO_KV_PATH=/data/kv.db
PORT=8000
```

## Testing

### Run Tests

```bash
deno test                  # Run all tests
deno test --coverage       # Generate coverage report
deno test --watch          # Watch mode
```

### Test Examples

```typescript
// routes/api/auth/_test.ts
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

Deno.test("POST /api/auth/login - success", async () => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@halolight.h7ml.cn",
      password: "123456",
    }),
  });

  assertEquals(response.status, 200);
  const data = await response.json();
  assertEquals(data.success, true);
  assertEquals(typeof data.data.accessToken, "string");
});

Deno.test("POST /api/auth/login - invalid credentials", async () => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "wrong@example.com",
      password: "wrong",
    }),
  });

  assertEquals(response.status, 401);
  const data = await response.json();
  assertEquals(data.success, false);
});
```

## Performance Metrics

### Benchmarks

| Metric | Value | Notes |
|------|------|------|
| Request Throughput | ~45,000 req/s | Deno 2.0, single core, wrk test |
| Average Response Time | <5ms | Local Deno KV, no external deps |
| Memory Usage | ~30MB | Base memory after startup |
| CPU Usage | <10% | Idle state |

## Observability

### Logging System

```typescript
// utils/logger.ts
import { Logger } from "https://deno.land/std@0.208.0/log/mod.ts";

const logger = new Logger("app");

export function logRequest(req: Request, res: Response, duration: number) {
  logger.info(
    `${req.method} ${new URL(req.url).pathname} ${res.status} ${duration}ms`,
  );
}

export function logError(error: Error, context?: any) {
  logger.error(`Error: ${error.message}`, { error, context });
}
```

### Health Check

```typescript
// routes/api/health.ts
export const handler = async (req: Request): Promise<Response> => {
  try {
    // Check Deno KV connection
    const kv = await Deno.openKv();
    await kv.get(["health"]);
    await kv.close();

    return Response.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: Deno.memoryUsage(),
    });
  } catch (error) {
    return Response.json(
      { status: "unhealthy", error: error.message },
      { status: 503 },
    );
  }
};
```

### Monitoring Metrics

```typescript
// utils/metrics.ts
const metrics = {
  requests: 0,
  errors: 0,
  responseTime: [] as number[],
};

export function recordRequest(duration: number) {
  metrics.requests++;
  metrics.responseTime.push(duration);
}

export function recordError() {
  metrics.errors++;
}

export function getMetrics() {
  const avg = metrics.responseTime.reduce((a, b) => a + b, 0) /
    metrics.responseTime.length;
  return {
    totalRequests: metrics.requests,
    totalErrors: metrics.errors,
    avgResponseTime: avg || 0,
  };
}
```

## FAQ

### Q: How to persist Deno KV data?

A: Configure the `DENO_KV_PATH` environment variable to specify the data file path.

```bash
# .env
DENO_KV_PATH=./data/kv.db
```

```typescript
// Use custom path
const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));
```

### Q: How to enable remote Deno KV (Deno Deploy)?

A: When deploying on Deno Deploy, using `Deno.openKv()` automatically connects to the hosted distributed KV.

```typescript
// Production environment automatically uses remote KV
const kv = await Deno.openKv();
```

### Q: How to handle file uploads?

A: Use Fresh's `FormData` API to handle file uploads.

```typescript
// routes/api/files/upload.ts
export const handler = async (req: Request): Promise<Response> => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Save file to Deno KV or cloud storage
  const bytes = await file.arrayBuffer();
  const kv = await Deno.openKv();
  await kv.set(["files", crypto.randomUUID()], {
    name: file.name,
    type: file.type,
    size: file.size,
    data: new Uint8Array(bytes),
  });

  return Response.json({ success: true });
};
```

### Q: How does Islands architecture integrate with APIs?

A: Islands are client-side interactive components that call backend APIs via `fetch`.

```typescript
// islands/UserList.tsx
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function UserList() {
  const users = useSignal([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => users.value = data);
  }, []);

  return (
    <div>
      {users.value.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Development Tools

### Recommended Tools/Plugins

- **Deno VSCode Extension** - Official VS Code plugin with IntelliSense and debugging
- **deployctl** - Deno Deploy command-line tool
- **wrk / autocannon** - HTTP stress testing tools
- **Deno Lint** - Built-in code linting tool

## Comparison with Other Backends

| Feature | Deno Fresh | NestJS | FastAPI | Spring Boot |
|------|------------|--------|---------|-------------|
| Language | TypeScript (Deno) | TypeScript | Python | Java |
| ORM | Deno KV | Prisma | SQLAlchemy | JPA |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Startup Time | <100ms | ~2s | ~1s | ~5s |
| Memory Usage | 30MB | 80MB | 50MB | 150MB |
| Deployment | Deno Deploy | Docker/Cloud | Docker/Cloud | Docker/Cloud |

## Related Links

- [API Documentation](https://halolight-deno.h7ml.cn/docs)
- [GitHub Repository](https://github.com/halolight/halolight-deno)
- [Deno Official Documentation](https://deno.land/manual)
- [Fresh Official Documentation](https://fresh.deno.dev)
- [Deno KV Documentation](https://deno.com/kv)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
