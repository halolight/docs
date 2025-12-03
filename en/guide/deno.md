# Deno KV + Hono Backend Scaffold

HaloLight Deno backend scaffold, a modern backend API service built on Deno KV and Hono framework.

## Features

- 🦕 **Deno Native** - Using Deno runtime with built-in TypeScript support
- 🔥 **Hono Framework** - Lightweight, high-performance web framework
- 💾 **Deno KV** - Built-in key-value storage, no external database needed
- 🔐 **JWT Authentication** - Complete authentication and authorization system
- 🛡️ **RBAC Permissions** - Role-based access control
- 📡 **RESTful API** - Standardized API design

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-deno.git
cd halolight-deno

# Run development server
deno task dev

# Run production server
deno task start
```

## Project Structure

```
halolight-deno/
├── src/
│   ├── routes/       # API routes
│   ├── middleware/   # Middleware
│   ├── services/     # Business logic
│   ├── utils/        # Utility functions
│   └── main.ts       # Entry file
├── deno.json         # Deno configuration
└── README.md
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/login | User login |
| POST | /api/auth/register | User registration |
| GET | /api/users | Get user list |
| GET | /api/users/:id | Get user details |

## Environment Variables

```bash
JWT_SECRET=your-secret-key
DENO_KV_PATH=./data/kv.db
```

## Deployment

Deploy to Deno Deploy:

```bash
deployctl deploy --project=your-project src/main.ts
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-deno)
- [Live Preview](https://halolight-deno.deno.dev)
- [Deno Official Documentation](https://deno.land/manual)
- [Hono Official Documentation](https://hono.dev)
