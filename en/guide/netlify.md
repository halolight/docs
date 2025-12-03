# Netlify Deployment

HaloLight Netlify deployment version, optimized for Netlify platform.

## Features

- 🔷 **Netlify Integration** - Native Netlify deployment support
- ⚡ **Global CDN** - Global edge node acceleration
- 🔄 **Automatic CI/CD** - Auto-deploy on Git push
- 📝 **Form Handling** - Built-in form submission processing
- 🔐 **Identity** - Netlify Identity integration
- 🌐 **Functions** - Serverless functions support

## Quick Start

### Method 1: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/halolight/halolight-netlify)

### Method 2: Manual Deploy

```bash
# Clone repository
git clone https://github.com/halolight/halolight-netlify.git
cd halolight-netlify

# Install dependencies
pnpm install

# Local development
pnpm dev

# Build
pnpm build
```

## Configuration File

### netlify.toml

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Environment Variables

Set in Netlify dashboard:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_USE_MOCK=false
```

## Serverless Functions

```typescript
// netlify/functions/hello.ts
import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' }),
  }
}
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-netlify)
- [Live Preview](https://halolight-netlify.netlify.app)
- [Netlify Documentation](https://docs.netlify.com)
