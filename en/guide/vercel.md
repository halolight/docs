# Vercel Deployment

HaloLight Vercel deployment version, optimized for Vercel platform with the best Next.js deployment experience.

## Features

- ▲ **Vercel Native** - Official Next.js deployment platform
- ⚡ **Edge Functions** - Edge computing support
- 🌐 **Global Edge Network** - Lightning-fast access experience
- 🔄 **Preview Deployments** - Automatic PR preview environments
- 📊 **Analytics** - Built-in analytics features
- 🔐 **Environment Variables** - Secure environment variable management

## Quick Start

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-vercel)

### Method 2: Manual Deploy

```bash
# Clone repository
git clone https://github.com/halolight/halolight-vercel.git
cd halolight-vercel

# Install dependencies
pnpm install

# Local development
pnpm dev

# Build
pnpm build
```

## Configuration File

### vercel.json

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hkg1", "sin1"],
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

## Environment Variables

Set in Vercel dashboard:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_USE_MOCK=false
DATABASE_URL=postgresql://...
```

## Edge Functions

```typescript
// app/api/edge/route.ts
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ message: 'Hello from Edge!' }), {
    headers: { 'content-type': 'application/json' },
  })
}
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-vercel)
- [Live Preview](https://halolight-vercel.h7ml.cn)
- [Vercel Documentation](https://vercel.com/docs)
