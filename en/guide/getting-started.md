# Quick Start

Choose your preferred framework version to quickly start HaloLight.

## Requirements

- Node.js 18.17 or higher
- pnpm 8+ (recommended) / npm / yarn

## Next.js Version

```bash
# Clone repository
git clone https://github.com/halolight/halolight.git
cd halolight

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit http://localhost:3000 to see the result.

Detailed documentation: [Next.js Version Guide](/en/guide/nextjs)

## Vue Version

```bash
# Clone repository
git clone https://github.com/halolight/halolight-vue.git
cd halolight-vue

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit http://localhost:5173 to see the result.

Detailed documentation: [Vue Version Guide](/en/guide/vue)

## Default Credentials

All versions use the same Mock credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@halolight.h7ml.cn | 123456 |

## Directory Structure

```
project-root/
├── src/
│   ├── app/              # Page routes
│   ├── components/       # Components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── layout/      # Layout components
│   │   └── dashboard/   # Dashboard components
│   ├── hooks/           # Custom hooks
│   ├── stores/          # State management
│   ├── services/        # API services
│   ├── lib/             # Utility library
│   ├── types/           # Type definitions
│   └── mocks/           # Mock data
├── public/              # Static assets
└── package.json
```

## Next Steps

- [Next.js Version](/en/guide/nextjs) - Deep dive into Next.js implementation
- [Vue Version](/en/guide/vue) - Deep dive into Vue implementation
- [Development Docs](/en/development/) - View design specifications
