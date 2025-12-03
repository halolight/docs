# Node.js Backend API

HaloLight Node.js backend API, an enterprise-grade backend service built on NestJS/Fastify framework.

## Features

- 🟩 **Node.js** - JavaScript/TypeScript runtime
- 🏗️ **NestJS/Fastify** - Optional enterprise-grade frameworks
- 🔐 **JWT Authentication** - Complete authentication and authorization system
- 🛡️ **RBAC Permissions** - Role-based access control
- 📊 **GraphQL** - Flexible query language support
- 🔷 **Prisma ORM** - Type-safe database access
- 📡 **RESTful API** - Standardized API design

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-node.git
cd halolight-api-node

# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Run development server
pnpm dev

# Build production version
pnpm build
```

## Project Structure

```
halolight-api-node/
├── src/
│   ├── modules/      # Feature modules
│   │   ├── auth/     # Authentication module
│   │   ├── users/    # Users module
│   │   └── ...
│   ├── common/       # Common modules
│   ├── config/       # Configuration
│   └── main.ts       # Entry file
├── prisma/
│   └── schema.prisma # Database schema
└── package.json
```

## API Endpoints

### REST API

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/login | User login |
| POST | /api/auth/register | User registration |
| GET | /api/users | Get user list |
| GET | /api/users/:id | Get user details |

### GraphQL

```graphql
query {
  users {
    id
    name
    email
  }
}

mutation {
  createUser(input: { name: "John", email: "john@example.com" }) {
    id
    name
  }
}
```

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/halolight"

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Application
PORT=3000
NODE_ENV=development
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-api-node)
- [API Documentation](https://halolight-api-node.h7ml.cn/api)
- [GraphQL Playground](https://halolight-api-node.h7ml.cn/graphql)
