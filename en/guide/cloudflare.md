# Cloudflare Version

HaloLight Cloudflare version is built on Next.js 15 App Router + React 19, using `@opennextjs/cloudflare` adapter for Cloudflare Workers/Pages edge runtime, enabling global low-latency access.

**Live Preview**: [https://halolight-cloudflare.h7ml.cn/](https://halolight-cloudflare.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-cloudflare](https://github.com/halolight/halolight-cloudflare)

## Differences from Original

| Feature | Original (Next.js) | Cloudflare Version |
|---------|-------------------|-------------------|
| Next.js | 14.x | 15.5.x |
| React | 18.x | 19.x |
| Runtime | Node.js (Vercel) | Cloudflare Workers (Edge) |
| Deployment Platform | Vercel / Docker | Cloudflare Pages |
| Development Tools | webpack | Turbopack |
| Deployment Command | `pnpm build && pnpm start` | `pnpm deploy` |
| SSR Location | Server/Serverless | Global edge nodes |
| Cold Start | Platform-dependent | < 50ms |

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 15.5.x | React full-stack framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| @opennextjs/cloudflare | 1.x | Cloudflare adapter layer |
| Wrangler | 4.x | Cloudflare CLI |
| shadcn/ui | latest | UI component library |
| Zustand | 5.x | State management |
| TanStack Query | 5.x | Server state |
| Vitest | 4.x | Unit testing |
| Mock.js | 1.x | Data mocking |

## Directory Structure

```
halolight-cloudflare/
├── src/
│   ├── app/                      # App Router pages
│   │   ├── (dashboard)/          # Dashboard route group
│   │   ├── (auth)/               # Auth route group
│   │   ├── (legal)/              # Legal terms route group
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/               # Layout components
│   │   └── dashboard/            # Dashboard components
│   ├── hooks/                    # React Hooks
│   ├── stores/                   # Zustand Stores
│   ├── lib/                      # Utilities
│   ├── mock/                     # Mock data
│   ├── providers/                # Context Providers
│   ├── config/                   # Configuration files
│   └── __tests__/                # Unit tests
├── public/                       # Static assets
├── .github/workflows/            # GitHub Actions CI
├── .open-next/                   # OpenNext build output (auto-generated)
├── coverage/                     # Test coverage (auto-generated)
├── cloudflare-env.d.ts           # Cloudflare environment types
├── vitest.config.ts              # Vitest test configuration
├── open-next.config.ts           # OpenNext configuration
├── wrangler.jsonc                # Wrangler configuration
├── next.config.ts                # Next.js configuration
└── package.json
```

## Quick Start

### Requirements

- Node.js >= 18
- pnpm >= 8
- Wrangler CLI (requires Cloudflare login)

### Installation

```bash
git clone https://github.com/halolight/halolight-cloudflare.git
cd halolight-cloudflare
pnpm install
```

### Environment Variables

```bash
cp .dev.vars.example .dev.vars
```

```bash
# .dev.vars example
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_MOCK=true
NEXT_PUBLIC_APP_TITLE=HaloLight
NEXT_PUBLIC_BRAND_NAME=HaloLight
NEXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NEXT_PUBLIC_DEMO_PASSWORD=Admin@123
```

### Start Development

```bash
pnpm dev
```

Visit http://localhost:3000

### Local Preview (Edge Environment)

```bash
pnpm preview
```

Simulates Cloudflare Workers environment to detect Edge Runtime compatibility issues.

### Deploy to Cloudflare

```bash
wrangler login   # Login required for first time
pnpm deploy      # Build and deploy
```

## Common Scripts

```bash
pnpm dev          # Start development server (Turbopack, Node.js environment)
pnpm build        # Next.js production build
pnpm preview      # Local preview of Cloudflare environment
pnpm deploy       # Deploy to Cloudflare
pnpm upload       # Upload only without deployment
pnpm lint         # ESLint check
pnpm type-check   # TypeScript type check
pnpm test         # Run unit tests (watch mode)
pnpm test:run     # Run unit tests (single run)
pnpm test:coverage # Run tests and generate coverage report
pnpm cf-typegen   # Generate Cloudflare environment types
```

## Edge Runtime Constraints

Cloudflare Workers is an edge runtime, some Node.js APIs are unavailable:

**Unavailable APIs**:
- `fs` - File system operations
- `child_process` - Child processes
- `net`, `dgram` - Native network sockets
- `crypto.createCipher` and other legacy crypto APIs

**Partially Available** (via nodejs_compat):
- `Buffer` - Binary data processing
- `process.env` - Environment variables
- `crypto` partial APIs - such as `randomUUID()`

::: warning Note
When using `@opennextjs/cloudflare`, the entire application automatically runs in edge environment, no need to manually declare `export const runtime = 'edge'`.
:::

## Cloudflare Services Integration

### Available Services

| Service | Purpose | Description |
|---------|---------|-------------|
| KV | Key-value storage | Globally distributed cache |
| D1 | SQLite database | Edge SQL database |
| R2 | Object storage | S3-compatible storage |
| Queues | Message queues | Async task processing |
| Durable Objects | Stateful objects | Real-time collaboration |
| Workers AI | AI inference | Edge AI models |

### Usage Example

```ts
import { getRequestContext } from '@opennextjs/cloudflare';

export async function GET() {
  const { env } = getRequestContext();
  const value = await env.MY_KV.get('key');
  return Response.json({ value });
}
```

### Configure KV Storage

```jsonc
// wrangler.jsonc
{
  "kv_namespaces": [
    { "binding": "MY_KV", "id": "xxx" }
  ]
}
```

### Configure D1 Database

```jsonc
// wrangler.jsonc
{
  "d1_databases": [
    { "binding": "MY_DB", "database_id": "xxx" }
  ]
}
```

## SSR/SSG/ISR Support

| Rendering Mode | Support Status | Description |
|----------------|----------------|-------------|
| SSR | ✅ Supported | Each request renders at the edge |
| SSG | ✅ Supported | Static pages generated at build time |
| ISR | ⚠️ Partial | Requires R2 cache configuration |

### Enable ISR

```ts
// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

## CI/CD

Project has complete GitHub Actions CI workflow configured:

| Job | Description |
|-----|-------------|
| **lint** | ESLint + TypeScript type check |
| **test** | Vitest unit tests + Codecov coverage |
| **build** | OpenNext Cloudflare production build |
| **security** | Dependency security audit |
| **dependency-review** | PR dependency change review |

### Deployment Workflow Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
```

## Deployment Architecture

```
User Request → Cloudflare CDN → Workers (Edge) → KV/D1/R2/External API
                ↓
          300+ global nodes
          Nearby response < 50ms
```

## Quota Limits

| Limit | Free Tier | Paid Tier |
|-------|-----------|-----------|
| Worker script size | 1MB (compressed) | 10MB |
| CPU time | 10-50ms | Seconds |
| Memory | 128MB | 128MB |
| Subrequests | 50 | 1000 |
| Request duration | 30s | 30s |

::: tip Reference
For actual limits, check [Cloudflare official documentation](https://developers.cloudflare.com/workers/platform/limits/).
:::

## Version Rollback

Cloudflare Pages retains deployment history, supporting the following rollback methods:

1. **Dashboard Rollback**:
   - Cloudflare Dashboard → Workers & Pages → Project → Deployments
   - Select historical version → "Rollback to this deployment"

2. **Redeploy Specific Commit**:
   ```bash
   git checkout <commit-hash>
   pnpm deploy
   ```

## Common Issues

### "Cannot find module 'fs'" Error

Edge Runtime doesn't support Node.js built-in modules. Use Web APIs instead or ensure the code only runs on the client side.

### Build Size Too Large

- Check if dependencies have Node.js-specific code
- Use dynamic imports to split code
- Remove unused dependencies

### Slow Cold Start

- Reduce Worker script size
- Use Smart Placement for nearby deployment
- Warm up critical paths

## Related Links

- [Live Preview (Cloudflare)](https://halolight-cloudflare.h7ml.cn)
- [Live Preview (Original Vercel)](https://halolight.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-cloudflare)
- [OpenNext Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
