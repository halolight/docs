# tRPC BFF Gateway

HaloLight BFF (Backend for Frontend) Gateway, a type-safe API gateway built on tRPC 11 + Express 5, providing unified type-safe interfaces for frontend applications.

## Features

- **End-to-End Type Safety** - tRPC provides complete type inference from server to client
- **Zero Runtime Overhead** - Compile-time type checking with zero runtime cost
- **JWT Authentication** - Built-in JWT token validation and RBAC permission control
- **Zod Validation** - Automatic input validation with detailed error messages
- **Service Discovery** - Support for multiple backend services with automatic failover
- **Request Tracing** - Distributed tracing support with automatic Trace ID propagation
- **SuperJSON Serialization** - Automatic handling of Date, Map, Set, BigInt, and other complex types
- **Interactive Docs** - Swagger UI-like interactive documentation

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | tRPC 11 + Express 5 |
| Language | TypeScript 5.9 |
| Validation | Zod |
| Serialization | SuperJSON |
| Authentication | JWT (jsonwebtoken) |
| Logging | Pino + pino-http |
| Security | Helmet + CORS |
| Runtime | Node.js 20+ |

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-bff.git
cd halolight-bff

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env to configure JWT secret and backend service URLs

# Run development server
pnpm dev

# Build for production
pnpm build
pnpm start
```

## Project Structure

```
halolight-bff/
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # Express server + tRPC adapter
│   ├── trpc.ts               # tRPC instance and procedures
│   ├── context.ts            # Context creation (user, traceId, services)
│   ├── schemas/
│   │   ├── index.ts          # Schema exports
│   │   └── common.ts         # Common Zod schemas (pagination, sorting, response)
│   ├── services/
│   │   ├── index.ts          # Service exports
│   │   ├── httpClient.ts     # HTTP client for backend services
│   │   └── serviceRegistry.ts # Backend service registry
│   ├── routers/
│   │   ├── index.ts          # Root router (combining all routers)
│   │   ├── auth.ts           # Authentication (8 endpoints)
│   │   ├── users.ts          # User management (8 endpoints)
│   │   ├── dashboard.ts      # Dashboard statistics (9 endpoints)
│   │   ├── permissions.ts    # Permission management (7 endpoints)
│   │   ├── roles.ts          # Role management (8 endpoints)
│   │   ├── teams.ts          # Team management (9 endpoints)
│   │   ├── folders.ts        # Folder management (8 endpoints)
│   │   ├── files.ts          # File management (9 endpoints)
│   │   ├── documents.ts      # Document management (10 endpoints)
│   │   ├── calendar.ts       # Calendar events (10 endpoints)
│   │   ├── notifications.ts  # Notifications (7 endpoints)
│   │   └── messages.ts       # Messaging/chat (9 endpoints)
│   └── middleware/
│       └── auth.ts           # Authentication/authorization middleware
├── .env.example              # Environment variables template
├── .github/workflows/        # CI/CD configuration
├── Dockerfile                # Docker image build
├── package.json              # Dependencies configuration
└── tsconfig.json             # TypeScript configuration
```

## API Modules

HaloLight BFF provides **12 core business modules** with **100+ API endpoints**:

| Module | Endpoints | Description |
|--------|-----------|-------------|
| auth | 8 | Login, register, token refresh, logout, password management |
| users | 8 | User CRUD, role/status management |
| dashboard | 9 | Statistics, trends, activities, tasks |
| permissions | 7 | Permission CRUD, tree structure, modules |
| roles | 8 | Role CRUD, permission assignment |
| teams | 9 | Team CRUD, member management |
| folders | 8 | Folder CRUD, tree, move, breadcrumb |
| files | 9 | File CRUD, upload, download, move, copy |
| documents | 10 | Document CRUD, versions, sharing |
| calendar | 10 | Event CRUD, attendees, RSVP |
| notifications | 7 | List, unread count, mark read, delete |
| messages | 9 | Conversations, messages, send, read status |

## Core Concepts

### tRPC Procedures

tRPC provides three procedure types:

- **publicProcedure** - Public endpoints, no authentication required
- **protectedProcedure** - Protected endpoints, requires valid JWT token
- **adminProcedure** - Admin endpoints, requires admin role

```typescript
// Example: Creating a protected endpoint
export const usersRouter = router({
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ input, ctx }) => {
      // ctx.user contains authenticated user info
      // Call backend service to fetch data
      const client = ctx.services.getDefault();
      const data = await client.get('/api/users', { query: input });
      return { code: 200, message: 'success', data };
    }),
});
```

### Context

Each request creates a context containing:

```typescript
interface Context {
  req: Request;                    // Express request
  res: Response;                   // Express response
  user: JWTPayload | null;         // Authenticated user (if any)
  traceId: string;                 // Distributed tracing ID
  services: ServiceRegistry;       // Backend service registry
}
```

### JWT Token Structure

```typescript
interface JWTPayload {
  id: string;                      // User ID
  name: string;                    // Username
  email: string;                   // Email
  role: {
    id: string;                    // Role ID
    name: string;                  // Role name
    label: string;                 // Role label
    permissions: string[];         // Permission list
  };
}
```

### Permission System

Supports wildcard permissions:

- `*` - All permissions (super admin)
- `users:*` - All operations on users module
- `users:view` - View users only
- `users:create` - Create users only

### Service Registry

Configure multiple backend services via environment variables:

```bash
HALOLIGHT_API_PYTHON_URL=http://api-python:8000
HALOLIGHT_API_BUN_URL=http://api-bun:3000
HALOLIGHT_API_JAVA_URL=http://api-java:8080
```

Usage in code:

```typescript
// Use default service (highest priority)
const client = ctx.services.getDefault();

// Use specific service
const pythonClient = ctx.services.get('python');
```

## Response Format

All APIs follow a unified response format:

```typescript
// Standard response
interface APIResponse<T> {
  code: number;        // HTTP status code
  message: string;     // Human-readable message
  data: T | null;      // Response data
}

// Paginated response
interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: {
    list: T[];
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
  };
}
```

## Environment Variables

### Required Configuration

```bash
# JWT secret (must change in production)
JWT_SECRET=your-secret-key-at-least-32-characters-long

# Server port
PORT=3002
```

### Optional Configuration

```bash
# Server configuration
HOST=0.0.0.0
NODE_ENV=development

# CORS configuration
CORS_ORIGIN=*

# JWT configuration
JWT_EXPIRES_IN=7d

# Logging level
LOG_LEVEL=info

# Backend services (configure at least one)
HALOLIGHT_API_PYTHON_URL=http://localhost:8000
HALOLIGHT_API_BUN_URL=http://localhost:3000
HALOLIGHT_API_JAVA_URL=http://localhost:8080
HALOLIGHT_API_NESTJS_URL=http://localhost:3001
HALOLIGHT_API_NODE_URL=http://localhost:3003
HALOLIGHT_API_GO_URL=http://localhost:8081
```

## Client Usage

### React + @tanstack/react-query

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'halolight-bff';

const trpc = createTRPCReact<AppRouter>();

function UserList() {
  const { data, isLoading } = trpc.users.list.useQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.data.list.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Next.js App Router

```typescript
// Server Component
import { createCaller } from '@trpc/server';
import { appRouter } from './routers';

export default async function Page() {
  const caller = createCaller({ req: {}, res: {}, user: null });
  const data = await caller.dashboard.getStats();

  return <div>{JSON.stringify(data)}</div>;
}
```

### Vanilla TypeScript

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'halolight-bff';
import superjson from 'superjson';

const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      headers() {
        return {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        };
      },
    }),
  ],
});

// Usage
const users = await client.users.list.query({ page: 1 });
```

## Development Guide

### Adding New Router

1. Create new router file:

```typescript
// src/routers/products.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const productsRouter = router({
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.get('/api/products', { query: input });
      return { code: 200, message: 'success', data };
    }),
});
```

2. Register in root router:

```typescript
// src/routers/index.ts
import { productsRouter } from './products';

export const appRouter = router({
  // ... existing routers
  products: productsRouter,
});
```

### Error Handling

Use tRPC error types:

```typescript
import { TRPCError } from '@trpc/server';

throw new TRPCError({
  code: 'UNAUTHORIZED',
  message: 'Not authenticated',
}); // 401

throw new TRPCError({
  code: 'FORBIDDEN',
  message: 'Insufficient permissions',
}); // 403

throw new TRPCError({
  code: 'NOT_FOUND',
  message: 'Resource not found',
}); // 404
```

## Docker Deployment

### Using Docker

```bash
# Build image
docker build -t halolight-bff .

# Run container
docker run -p 3002:3002 \
  -e JWT_SECRET=your-secret-key \
  -e HALOLIGHT_API_PYTHON_URL=http://api-python:8000 \
  halolight-bff
```

### Using Docker Compose

```yaml
version: '3.8'

services:
  bff:
    build: .
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - HALOLIGHT_API_PYTHON_URL=http://api-python:8000
    depends_on:
      - api-python
```

## Testing

```bash
# Run type checking
pnpm type-check

# Run linter
pnpm lint

# Format code
pnpm format
```

## Performance Optimization

1. **Enable Batching** - tRPC automatically batches multiple requests
2. **Use DataLoader** - Avoid N+1 query problems
3. **Caching Strategy** - Use Redis to cache frequently accessed data
4. **Rate Limiting** - Protect API with rate limiting

## Security Best Practices

1. **Use Strong JWT Secret** - At least 32 characters
2. **Enable HTTPS** - Required in production
3. **Restrict CORS** - Only allow trusted origins
4. **Input Validation** - Use Zod to validate all inputs
5. **Log Sanitization** - Don't log sensitive information (passwords, tokens)

## Troubleshooting

### Port Already in Use

Change `PORT` in `.env` or terminate the process using the port.

### CORS Errors

Update `CORS_ORIGIN` in `.env` to allow your origin.

### Token Verification Fails

Ensure `JWT_SECRET` is consistent across all environments.

## Related Links

- [tRPC Official Docs](https://trpc.io/docs)
- [Zod Documentation](https://zod.dev/)
- [Project Repository](https://github.com/halolight/halolight-bff)
- [Live Demo](https://halolight-bff.h7ml.cn)

## License

MIT License
