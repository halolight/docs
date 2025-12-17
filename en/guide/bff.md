# TypeScript tRPC Gateway API

A type-safe API gateway built on tRPC 11 + Express 5, providing unified end-to-end type-safe interface layer for frontend applications.

**API Documentation**: [https://halolight-bff.h7ml.cn](https://halolight-bff.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-bff](https://github.com/halolight/halolight-bff)

## Features

- 🎯 **End-to-End Type Safety** - tRPC provides complete type inference from server to client with zero runtime overhead
- 🔐 **JWT Dual Token Auth** - Access Token + Refresh Token auto-renewal with RBAC permission control
- 📡 **Service Gateway Aggregation** - Unified aggregation of multiple backend services (Python/Java/Go/Bun) with automatic failover
- ✅ **Zod Data Validation** - Automatic input validation, type-safe with detailed error messages
- 🔄 **SuperJSON Serialization** - Automatic handling of Date, Map, Set, BigInt, RegExp and other complex types
- 🎭 **Request Batching** - Automatic batch processing of multiple requests to reduce network overhead
- 📊 **Distributed Tracing** - Automatic Trace ID propagation with complete request chain logging
- 🐳 **Docker Support** - Containerized deployment with production-grade configuration

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| TypeScript | 5.9 | Programming Language |
| tRPC | 11 | RPC Framework |
| Zod | - | Data Validation |
| Express | 5 | Web Server |
| SuperJSON | - | Serialization |
| JWT | - | Authentication |
| Pino | - | Logging System |

## Quick Start

### Requirements

- Node.js >= 20.0
- pnpm >= 8.0
- At least one backend service (Python/Java/Go/Bun)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-bff.git
cd halolight-bff

# Install dependencies
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Server configuration
PORT=3002
HOST=0.0.0.0
NODE_ENV=development

# JWT secret (must change in production)
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# CORS configuration
CORS_ORIGIN=*

# Log level
LOG_LEVEL=info

# Backend service registry (configure at least one)
HALOLIGHT_API_PYTHON_URL=http://localhost:8000
HALOLIGHT_API_BUN_URL=http://localhost:3000
HALOLIGHT_API_JAVA_URL=http://localhost:8080
HALOLIGHT_API_NESTJS_URL=http://localhost:3001
HALOLIGHT_API_NODE_URL=http://localhost:3003
HALOLIGHT_API_GO_URL=http://localhost:8081
```

### Database Initialization

No database required (API gateway does not directly access database).

### Start Service

```bash
# Development mode (hot reload)
pnpm dev

# Production mode
pnpm build
pnpm start
```

Visit http://localhost:3002

## Project Structure

```
halolight-bff/
├── src/
│   ├── index.ts              # Application entry
│   ├── server.ts             # Express server + tRPC adapter
│   ├── trpc.ts               # tRPC instance and procedure definitions
│   ├── context.ts            # Context creation (user, tracing, services)
│   ├── routers/
│   │   ├── index.ts          # Root router (combining all modules)
│   │   ├── auth.ts           # Authentication module (8 endpoints)
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
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication/authorization middleware
│   ├── services/
│   │   ├── httpClient.ts     # HTTP client (backend communication)
│   │   └── serviceRegistry.ts # Backend service registry
│   └── schemas/
│       ├── index.ts          # Schema exports
│       └── common.ts         # Common Zod schemas (pagination, sorting, response)
├── .env.example              # Environment variables template
├── .github/workflows/        # CI/CD configuration
├── Dockerfile                # Docker image build
├── docker-compose.yml        # Docker Compose configuration
├── package.json              # Dependencies configuration
└── tsconfig.json             # TypeScript configuration
```

## API Modules

HaloLight BFF provides **12 core business modules** covering **100+ tRPC endpoints**:

| Module | Endpoints | Description |
|--------|-----------|-------------|
| auth | 8 | Login, register, token refresh, logout, password management |
| users | 8 | User CRUD, role/status management, profile |
| dashboard | 9 | Statistics, visit trends, sales data, tasks, calendar |
| permissions | 7 | Permission CRUD, tree structure, module permissions, batch operations |
| roles | 8 | Role CRUD, permission assignment, user association |
| teams | 9 | Team CRUD, member management, invitations, permissions |
| folders | 8 | Folder CRUD, tree structure, move, breadcrumb |
| files | 9 | File CRUD, upload, download, move, copy, share |
| documents | 10 | Document CRUD, version control, collaboration, sharing |
| calendar | 10 | Event CRUD, attendee management, RSVP, reminders |
| notifications | 7 | Notification list, unread count, mark read, batch delete |
| messages | 9 | Conversation management, message CRUD, send, read status |

### Authentication Endpoints

| Procedure | Type | Description | Permission |
|-----------|------|-------------|------------|
| `auth.login` | mutation | User login | Public |
| `auth.register` | mutation | User registration | Public |
| `auth.refresh` | mutation | Refresh token | Public |
| `auth.logout` | mutation | Logout | Authenticated |
| `auth.forgotPassword` | mutation | Forgot password | Public |
| `auth.resetPassword` | mutation | Reset password | Public |
| `auth.verifyEmail` | mutation | Verify email | Public |
| `auth.changePassword` | mutation | Change password | Authenticated |

### User Management Endpoints

| Procedure | Type | Description | Permission |
|-----------|------|-------------|------------|
| `users.list` | query | Get user list | `users:view` |
| `users.byId` | query | Get user details | `users:view` |
| `users.me` | query | Get current user | Authenticated |
| `users.create` | mutation | Create user | `users:create` |
| `users.update` | mutation | Update user | `users:update` |
| `users.delete` | mutation | Delete user | `users:delete` |
| `users.updateRole` | mutation | Update user role | `users:update` |
| `users.updateStatus` | mutation | Update user status | `users:update` |

### Complete Endpoint List

#### Dashboard - 9 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `dashboard.getStats` | query | Statistics (users, documents, files, tasks) |
| `dashboard.getVisits` | query | Visit trends (7/30 days) |
| `dashboard.getSales` | query | Sales data (line chart) |
| `dashboard.getPieData` | query | Pie chart data (category distribution) |
| `dashboard.getTasks` | query | Todo task list |
| `dashboard.getCalendar` | query | Today's calendar |
| `dashboard.getActivities` | query | Recent activities |
| `dashboard.getNotifications` | query | Latest notifications |
| `dashboard.getProgress` | query | Project progress |

#### Permissions - 7 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `permissions.list` | query | Get permission list |
| `permissions.tree` | query | Get permission tree |
| `permissions.byId` | query | Get permission details |
| `permissions.create` | mutation | Create permission |
| `permissions.update` | mutation | Update permission |
| `permissions.delete` | mutation | Delete permission |
| `permissions.modules` | query | Get permission modules |

#### Roles - 8 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `roles.list` | query | Get role list |
| `roles.byId` | query | Get role details |
| `roles.create` | mutation | Create role |
| `roles.update` | mutation | Update role |
| `roles.delete` | mutation | Delete role |
| `roles.assignPermissions` | mutation | Assign permissions |
| `roles.removePermissions` | mutation | Remove permissions |
| `roles.users` | query | Get users in role |

#### Teams - 9 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `teams.list` | query | Get team list |
| `teams.byId` | query | Get team details |
| `teams.create` | mutation | Create team |
| `teams.update` | mutation | Update team |
| `teams.delete` | mutation | Delete team |
| `teams.addMember` | mutation | Add member |
| `teams.removeMember` | mutation | Remove member |
| `teams.updateMemberRole` | mutation | Update member role |
| `teams.members` | query | Get team members |

#### Folders - 8 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `folders.list` | query | Get folder list |
| `folders.tree` | query | Get folder tree |
| `folders.byId` | query | Get folder details |
| `folders.create` | mutation | Create folder |
| `folders.update` | mutation | Update folder |
| `folders.delete` | mutation | Delete folder |
| `folders.move` | mutation | Move folder |
| `folders.breadcrumb` | query | Get breadcrumb path |

#### Files - 9 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `files.list` | query | Get file list |
| `files.byId` | query | Get file details |
| `files.upload` | mutation | Upload file |
| `files.update` | mutation | Update file info |
| `files.delete` | mutation | Delete file |
| `files.move` | mutation | Move file |
| `files.copy` | mutation | Copy file |
| `files.download` | query | Get download link |
| `files.share` | mutation | Share file |

#### Documents - 10 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `documents.list` | query | Get document list |
| `documents.byId` | query | Get document details |
| `documents.create` | mutation | Create document |
| `documents.update` | mutation | Update document |
| `documents.delete` | mutation | Delete document |
| `documents.versions` | query | Get version history |
| `documents.restore` | mutation | Restore version |
| `documents.share` | mutation | Share document |
| `documents.unshare` | mutation | Unshare document |
| `documents.collaborators` | query | Get collaborators |

#### Calendar - 10 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `calendar.events` | query | Get event list |
| `calendar.byId` | query | Get event details |
| `calendar.create` | mutation | Create event |
| `calendar.update` | mutation | Update event |
| `calendar.delete` | mutation | Delete event |
| `calendar.addAttendee` | mutation | Add attendee |
| `calendar.removeAttendee` | mutation | Remove attendee |
| `calendar.rsvp` | mutation | RSVP response |
| `calendar.setReminder` | mutation | Set reminder |
| `calendar.byMonth` | query | Get events by month |

#### Notifications - 7 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `notifications.list` | query | Get notification list |
| `notifications.unreadCount` | query | Get unread count |
| `notifications.markRead` | mutation | Mark as read |
| `notifications.markAllRead` | mutation | Mark all as read |
| `notifications.delete` | mutation | Delete notification |
| `notifications.deleteAll` | mutation | Delete all |
| `notifications.preferences` | query | Get notification preferences |

#### Messages - 9 Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `messages.conversations` | query | Get conversation list |
| `messages.byConversation` | query | Get conversation messages |
| `messages.send` | mutation | Send message |
| `messages.markRead` | mutation | Mark as read |
| `messages.delete` | mutation | Delete message |
| `messages.createConversation` | mutation | Create conversation |
| `messages.deleteConversation` | mutation | Delete conversation |
| `messages.search` | query | Search messages |
| `messages.unreadCount` | query | Get unread count |

## Core Concepts

### tRPC Procedures

tRPC provides three procedure types:

```typescript
// Public endpoint - no authentication required
export const publicProcedure = t.procedure;

// Protected endpoint - requires valid JWT
export const protectedProcedure = t.procedure.use(isAuthenticated);

// Admin endpoint - requires admin role
export const adminProcedure = t.procedure.use(isAdmin);
```

**Usage Example**:

```typescript
export const usersRouter = router({
  // Query - fetch data
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      keyword: z.string().optional(),
    }))
    .query(async ({ input, ctx }) => {
      // ctx.user contains authenticated user info
      const client = ctx.services.getDefault();
      const data = await client.get('/api/users', { query: input });
      return { code: 200, message: 'success', data };
    }),

  // Mutation - modify data
  create: adminProcedure
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      role: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.post('/api/users', { body: input });
      return { code: 201, message: 'Created', data };
    }),
});
```

### Context

Each request creates an independent context:

```typescript
interface Context {
  req: Request;                    // Express request object
  res: Response;                   // Express response object
  user: JWTPayload | null;         // Authenticated user (via JWT)
  traceId: string;                 // Distributed tracing ID (UUID)
  services: ServiceRegistry;       // Backend service registry
}
```

**Context Creation Flow**:

1. Parse JWT Token from `Authorization` header
2. Verify token validity and extract user information
3. Generate unique `traceId` (for distributed tracing)
4. Inject `ServiceRegistry` (backend service collection)

### JWT Token Structure

```typescript
interface JWTPayload {
  id: string;                      // User ID
  name: string;                    // Username
  email: string;                   // Email
  role: {
    id: string;                    // Role ID
    name: string;                  // Role name (e.g., admin, user)
    label: string;                 // Role display name
    permissions: string[];         // Permission list (e.g., ["users:*", "documents:view"])
  };
}
```

**Token Usage**:

```typescript
// Client sends request
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Server automatically parses and injects into ctx.user
const userId = ctx.user.id;
const userPermissions = ctx.user.role.permissions;
```

### Permission System

Supports flexible wildcard permission matching:

| Permission Format | Description | Example |
|-------------------|-------------|---------|
| `*` | All permissions (super admin) | Can perform any operation |
| `{resource}:*` | All operations on module | `users:*` = all user module permissions |
| `{resource}:{action}` | Specific operation | `users:view` = view users only |

**Permission Check Example**:

```typescript
// Check permission in middleware
export const requirePermission = (permission: string) => {
  return t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const hasPermission = ctx.user.role.permissions.some(p =>
      p === '*' ||
      p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    );

    if (!hasPermission) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    return next();
  });
};

// Usage
export const deleteUser = protectedProcedure
  .use(requirePermission('users:delete'))
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    // Only users with users:delete permission can execute
  });
```

### Service Registry and Discovery

Configure multiple backend services via environment variables:

```bash
# Python FastAPI
HALOLIGHT_API_PYTHON_URL=http://api-python:8000

# Bun Hono
HALOLIGHT_API_BUN_URL=http://api-bun:3000

# Java Spring Boot
HALOLIGHT_API_JAVA_URL=http://api-java:8080

# Go Fiber
HALOLIGHT_API_GO_URL=http://api-go:8081
```

**Service Priority**: By configuration order, the first available service is used as default.

**Usage Example**:

```typescript
// Use default service (highest priority)
const client = ctx.services.getDefault();
const data = await client.get('/api/users');

// Use specific service
const pythonClient = ctx.services.get('python');
const stats = await pythonClient.get('/api/dashboard/stats');

// Failover: automatically switch to next service if default is unavailable
try {
  const data = await ctx.services.getDefault().get('/api/users');
} catch (error) {
  // ServiceRegistry automatically retries other services
}
```

### Response Format

All APIs follow a unified response structure:

```typescript
// Standard response
interface APIResponse<T> {
  code: number;        // HTTP status code (200, 201, 400, 500...)
  message: string;     // Human-readable message (success, error, ...)
  data: T | null;      // Response data (on success) or null (on failure)
}

// Paginated response
interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: {
    list: T[];         // Data list
    total: number;     // Total record count
    page: number;      // Current page number
    limit: number;     // Items per page
    totalPages?: number; // Total pages (optional)
  };
}
```

**Examples**:

```typescript
// Success response
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

// Paginated response
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [{ "id": "1", "name": "User 1" }],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}

// Error response (tRPC auto-formatted)
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Not authenticated"
  }
}
```

## Authentication

### JWT Dual Token

```
Access Token:  15 minutes validity, used for API requests
Refresh Token: 7 days validity, used to refresh Access Token
```

### Request Header

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```typescript
// Client example
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const result = await trpc.auth.refresh.mutate({ refreshToken });

  localStorage.setItem('accessToken', result.data.accessToken);
  localStorage.setItem('refreshToken', result.data.refreshToken);

  return result.data.accessToken;
};

// tRPC client configuration - auto refresh
const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      async headers() {
        let token = localStorage.getItem('accessToken');

        // Auto refresh if token expired
        if (isTokenExpired(token)) {
          token = await refreshToken();
        }

        return {
          authorization: `Bearer ${token}`,
        };
      },
    }),
  ],
});
```

## Error Handling

### tRPC Error Types

```typescript
import { TRPCError } from '@trpc/server';

// 400 - Bad request
throw new TRPCError({
  code: 'BAD_REQUEST',
  message: 'Invalid input',
});

// 401 - Unauthorized
throw new TRPCError({
  code: 'UNAUTHORIZED',
  message: 'Not authenticated',
});

// 403 - Forbidden
throw new TRPCError({
  code: 'FORBIDDEN',
  message: 'Insufficient permissions',
});

// 404 - Not found
throw new TRPCError({
  code: 'NOT_FOUND',
  message: 'Resource not found',
});

// 409 - Conflict
throw new TRPCError({
  code: 'CONFLICT',
  message: 'Email already exists',
});

// 500 - Internal server error
throw new TRPCError({
  code: 'INTERNAL_SERVER_ERROR',
  message: 'Something went wrong',
});
```

### Error Response Format

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Not authenticated",
    "data": {
      "code": "UNAUTHORIZED",
      "httpStatus": 401,
      "path": "auth.login"
    }
  }
}
```

## Client Usage

### React + @tanstack/react-query

```typescript
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from 'halolight-bff';

// Create tRPC React hooks
const trpc = createTRPCReact<AppRouter>();

// Create tRPC client
const trpcClient = trpc.createClient({
  transformer: superjson, // Support Date, Map, Set, etc.
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

// Create React Query client
const queryClient = new QueryClient();

// Root component
function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

// Use tRPC hooks
function UserList() {
  // Query - auto-managed loading state, caching, refetching
  const { data, isLoading, error } = trpc.users.list.useQuery({
    page: 1,
    limit: 10,
  });

  // Mutation - auto-managed loading state, error handling
  const createUser = trpc.users.create.useMutation({
    onSuccess: () => {
      // Auto refresh user list
      trpc.users.list.invalidate();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => createUser.mutate({
        name: 'New User',
        email: 'new@example.com',
        role: 'user',
      })}>
        Create User
      </button>

      {data?.data.list.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Next.js App Router

```typescript
// app/api/trpc/[trpc]/route.ts - tRPC API route
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };

// app/providers.tsx - tRPC Provider
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';
import type { AppRouter } from '@/server/routers';

const trpc = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

// app/page.tsx - Server Component
import { createCaller } from '@/server/routers';

export default async function Page() {
  const caller = createCaller({ req: {}, res: {}, user: null });
  const stats = await caller.dashboard.getStats();

  return <div>Total Users: {stats.data.totalUsers}</div>;
}
```

### Vue 3 + TanStack Query

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import superjson from 'superjson';
import type { AppRouter } from 'halolight-bff';

// Create tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
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

// Use in component
export default {
  setup() {
    const queryClient = useQueryClient();

    // Query
    const { data, isLoading } = useQuery({
      queryKey: ['users', { page: 1 }],
      queryFn: () => trpc.users.list.query({ page: 1, limit: 10 }),
    });

    // Mutation
    const createUser = useMutation({
      mutationFn: (user) => trpc.users.create.mutate(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });

    return { data, isLoading, createUser };
  },
};
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

// Usage (full type inference)
const users = await client.users.list.query({ page: 1 });
console.log(users.data.list); // TS automatically infers type

const newUser = await client.users.create.mutate({
  name: 'John',
  email: 'john@example.com',
  role: 'user',
});
```

## Development Guide

### Adding New Router

1. **Create new router file**:

```typescript
// src/routers/products.ts
import { z } from 'zod';
import { router, protectedProcedure, adminProcedure } from '../trpc';

export const productsRouter = router({
  // Query - get product list
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      category: z.string().optional(),
    }))
    .query(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.get('/api/products', { query: input });
      return { code: 200, message: 'success', data };
    }),

  // Query - get product details
  byId: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.get(`/api/products/${input.id}`);
      return { code: 200, message: 'success', data };
    }),

  // Mutation - create product (requires admin permission)
  create: adminProcedure
    .input(z.object({
      name: z.string().min(2),
      price: z.number().positive(),
      category: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.post('/api/products', { body: input });
      return { code: 201, message: 'Created', data };
    }),

  // Mutation - update product
  update: adminProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(2).optional(),
      price: z.number().positive().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;
      const client = ctx.services.getDefault();
      const data = await client.put(`/api/products/${id}`, { body: updateData });
      return { code: 200, message: 'Updated', data };
    }),

  // Mutation - delete product
  delete: adminProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      await client.delete(`/api/products/${input.id}`);
      return { code: 200, message: 'Deleted', data: null };
    }),
});
```

2. **Register in root router**:

```typescript
// src/routers/index.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { productsRouter } from './products'; // Import new router

export const appRouter = router({
  auth: authRouter,
  users: usersRouter,
  products: productsRouter, // Register new router
  // ... other routers
});

export type AppRouter = typeof appRouter;
```

3. **Client usage**:

```typescript
// Type auto-inference, no manual definition needed
const products = await trpc.products.list.query({ page: 1 });
const product = await trpc.products.byId.query({ id: '1' });
const newProduct = await trpc.products.create.mutate({
  name: 'iPhone 15',
  price: 999,
  category: 'electronics',
});
```

### Adding Custom Middleware

```typescript
// src/middleware/rateLimit.ts
import { TRPCError } from '@trpc/server';
import { t } from '../trpc';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export const rateLimit = (maxRequests: number, windowMs: number) => {
  return t.middleware(({ ctx, next }) => {
    const key = ctx.user?.id || ctx.req.ip;
    const now = Date.now();

    const record = rateLimitMap.get(key);

    if (!record || now > record.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Rate limit exceeded',
      });
    }

    record.count++;
    return next();
  });
};

// Usage
export const limitedProcedure = protectedProcedure.use(
  rateLimit(10, 60000) // Max 10 requests per minute
);
```

### Adding Schema Validation

```typescript
// src/schemas/product.ts
import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'books']),
  stock: z.number().int().nonnegative(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = createProductSchema.partial();

// Use in router
export const productsRouter = router({
  create: adminProcedure
    .input(createProductSchema)
    .mutation(async ({ input, ctx }) => {
      // input is already validated by Zod, type-safe
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      data: updateProductSchema,
    }))
    .mutation(async ({ input, ctx }) => {
      // ...
    }),
});
```

## Common Commands

```bash
# Development
pnpm dev              # Start dev server (hot reload)
pnpm dev:watch        # Start dev server (file watch)

# Build
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate test coverage

# Code quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix lint errors
pnpm type-check       # TypeScript type checking
pnpm format           # Prettier code formatting
```

## Deployment

### Docker

```bash
# Build image
docker build -t halolight-bff .

# Run container
docker run -p 3002:3002 \
  -e JWT_SECRET=your-secret-key \
  -e HALOLIGHT_API_PYTHON_URL=http://api-python:8000 \
  halolight-bff
```

### Docker Compose

```yaml
# docker-compose.yml
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
      - HALOLIGHT_API_BUN_URL=http://api-bun:3000
      - HALOLIGHT_API_JAVA_URL=http://api-java:8080
    depends_on:
      - api-python
      - api-bun
      - api-java
    restart: unless-stopped

  api-python:
    image: halolight-api-python
    ports:
      - "8000:8000"

  api-bun:
    image: halolight-api-bun
    ports:
      - "3000:3000"

  api-java:
    image: halolight-api-java
    ports:
      - "8080:8080"
```

```bash
docker-compose up -d
```

### Production Configuration

```env
NODE_ENV=production
PORT=3002
HOST=0.0.0.0

# Strong secret (at least 32 characters)
JWT_SECRET=your-production-secret-key-with-at-least-32-characters
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Restrict CORS
CORS_ORIGIN=https://your-frontend.com

# Production logging
LOG_LEVEL=warn

# Backend services
HALOLIGHT_API_PYTHON_URL=https://api-python.production.com
HALOLIGHT_API_BUN_URL=https://api-bun.production.com
HALOLIGHT_API_JAVA_URL=https://api-java.production.com
```

## Performance Optimization

### 1. Enable Request Batching

tRPC automatically batches multiple concurrent requests to reduce network overhead:

```typescript
// Client configuration
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      maxURLLength: 2083, // Max URL length
    }),
  ],
});

// These three requests are automatically batched into one HTTP request
const [users, stats, notifications] = await Promise.all([
  trpc.users.list.query({ page: 1 }),
  trpc.dashboard.getStats.query(),
  trpc.notifications.unreadCount.query(),
]);
```

### 2. Use DataLoader to Avoid N+1 Queries

```typescript
import DataLoader from 'dataloader';

// Create DataLoader
const userLoader = new DataLoader(async (ids: string[]) => {
  const users = await db.user.findMany({
    where: { id: { in: ids } },
  });
  return ids.map(id => users.find(u => u.id === id));
});

// Inject in context
export const createContext = (opts: CreateExpressContextOptions) => {
  return {
    ...opts,
    loaders: {
      user: userLoader,
    },
  };
};

// Use in router
export const postsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const posts = await db.post.findMany();

    // Batch load author info, avoid N+1 queries
    const postsWithAuthors = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        author: await ctx.loaders.user.load(post.authorId),
      }))
    );

    return postsWithAuthors;
  }),
});
```

### 3. Caching Strategy

```typescript
// Use Redis caching
import Redis from 'ioredis';

const redis = new Redis();

export const dashboardRouter = router({
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const cacheKey = `dashboard:stats:${ctx.user.id}`;

    // Try to get from cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fetch from backend service
    const client = ctx.services.getDefault();
    const data = await client.get('/api/dashboard/stats');

    // Cache for 5 minutes
    await redis.setex(cacheKey, 300, JSON.stringify(data));

    return data;
  }),
});
```

### 4. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Configure global rate limiting in Express
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests
  message: 'Too many requests from this IP',
});

app.use('/trpc', limiter);
```

## Security Best Practices

### 1. Use Strong JWT Secret

```bash
# Generate strong secret (at least 32 characters)
openssl rand -base64 32

# Configure in .env
JWT_SECRET=your-generated-secret-key-with-at-least-32-characters
```

### 2. Enable HTTPS

```typescript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}
```

### 3. Restrict CORS

```bash
# Allow only specific origin
CORS_ORIGIN=https://your-frontend.com

# Or multiple origins (comma-separated)
CORS_ORIGIN=https://app1.com,https://app2.com
```

### 4. Input Validation

```typescript
// Strictly validate all inputs with Zod
export const createUser = protectedProcedure
  .input(z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    age: z.number().int().positive().max(150),
    role: z.enum(['admin', 'user']),
  }))
  .mutation(async ({ input, ctx }) => {
    // input is strictly validated
  });
```

### 5. Log Sanitization

```typescript
// Use Pino redact configuration
const logger = pino({
  redact: {
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.token',
      'res.headers["set-cookie"]',
    ],
    remove: true, // Completely remove sensitive fields
  },
});
```

## Observability

### Logging System

```typescript
// Use Pino structured logging
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

// HTTP request logging
app.use(pinoHttp({ logger }));

// Use in router
export const usersRouter = router({
  create: adminProcedure.mutation(async ({ input, ctx }) => {
    logger.info({ userId: ctx.user.id, input }, 'Creating user');

    try {
      const data = await createUser(input);
      logger.info({ userId: ctx.user.id, data }, 'User created');
      return data;
    } catch (error) {
      logger.error({ userId: ctx.user.id, error }, 'Failed to create user');
      throw error;
    }
  }),
});
```

### Health Check

```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check backend service connections
    const services = await Promise.all([
      fetch(`${process.env.HALOLIGHT_API_PYTHON_URL}/health`),
      fetch(`${process.env.HALOLIGHT_API_BUN_URL}/health`),
    ]);

    const allHealthy = services.every(s => s.ok);

    res.status(allHealthy ? 200 : 503).json({
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        python: services[0].ok,
        bun: services[1].ok,
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});
```

### Monitoring Metrics

```typescript
// Prometheus metrics
import promClient from 'prom-client';

// Create registry
const register = new promClient.Registry();

// Collect default metrics
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## Troubleshooting

### Q: Port Already in Use

**A**: Change `PORT` in `.env` or terminate the process using the port:

```bash
# Find process using port
lsof -i :3002

# Kill process
kill -9 <PID>

# Or change port
echo "PORT=3003" >> .env
```

### Q: CORS Errors

**A**: Update `CORS_ORIGIN` in `.env` to allow your origin:

```bash
# Development - allow all origins
CORS_ORIGIN=*

# Production - specify origin
CORS_ORIGIN=https://your-frontend.com
```

### Q: Token Verification Fails

**A**: Ensure `JWT_SECRET` is consistent across all environments:

```bash
# Check JWT_SECRET consistency
echo $JWT_SECRET

# Regenerate token
curl -X POST http://localhost:3002/trpc/auth.login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### Q: Backend Service Connection Failed

**A**: Check if backend services are running and URLs are configured correctly:

```bash
# Check service health
curl http://localhost:8000/health
curl http://localhost:3000/health

# Check environment variables
echo $HALOLIGHT_API_PYTHON_URL
echo $HALOLIGHT_API_BUN_URL

# Test connection
curl http://localhost:3002/health
```

### Q: Type Inference Not Working

**A**: Ensure `AppRouter` type is correctly exported and imported in client:

```typescript
// Server - src/routers/index.ts
export const appRouter = router({
  // ... routers
});

export type AppRouter = typeof appRouter; // Must export type

// Client - ensure importing from correct path
import type { AppRouter } from 'halolight-bff'; // NPM package
// or
import type { AppRouter } from '@/server/routers'; // Monorepo
```

## Comparison with Other Gateways

| Feature | tRPC BFF | GraphQL | REST API | gRPC |
|---------|----------|---------|----------|------|
| Type Safety | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| Developer Experience | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Performance | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Ecosystem | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Documentation | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## Related Links

- [API Documentation](https://halolight-bff.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-bff)
- [tRPC Official Docs](https://trpc.io/docs)
- [Zod Documentation](https://zod.dev/)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
