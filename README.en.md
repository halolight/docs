# HaloLight Docs

[简体中文](./README.md) | **English**

[![Deploy](https://github.com/halolight/docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/halolight/docs/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646cff.svg?logo=vite)](https://vitepress.dev/)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D18-339933.svg?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.0-f69220.svg?logo=pnpm)](https://pnpm.io/)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fhalolight.docs.h7ml.cn&label=docs)](https://halolight.docs.h7ml.cn/)

HaloLight multi-framework admin dashboard documentation site, built with [VitePress](https://vitepress.dev/), supporting bilingual (Chinese & English).

## Project Relations

- `halolight/docs`: The single source of truth for documentation and specifications, defining cross-framework design, interfaces, and best practices
- `halolight/halolight`: Next.js 14 reference implementation, validating the React path
- `halolight/halolight-vue`: Vue 3.5 reference implementation, validating the Vue path

Specification updates land here first, then sync to corresponding implementation repos to ensure documentation and code consistency.

## Project Overview

HaloLight is an enterprise-grade admin dashboard solution with multi-framework implementations. Reference implementations:

- Next.js 14 ✅ · [Preview](https://halolight.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight)
- Vue 3.5 ✅ · [Preview](https://halolight-vue.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight-vue)

All 14 frontend frameworks, 7 backend APIs, and 8 deployment solutions have been implemented and deployed. See each repo's README for preview URLs.

### Frontend Frameworks

| Framework | Status | Preview | Repo | Docs |
|-----------|--------|---------|------|------|
| 🟦 Next.js 14 | ✅ Deployed | [Preview](https://halolight.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight) | [Guide](https://halolight.docs.h7ml.cn/en/guide/nextjs) |
| ⚛️ React (Vite) | ✅ Deployed | [Preview](https://halolight-react.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-react) | [Guide](https://halolight.docs.h7ml.cn/en/guide/react) |
| 💚 Vue 3.5 | ✅ Deployed | [Preview](https://halolight-vue.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-vue) | [Guide](https://halolight.docs.h7ml.cn/en/guide/vue) |
| 🔺 Angular 21 | ✅ Deployed | [Preview](https://halolight-angular.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-angular) | [Guide](https://halolight.docs.h7ml.cn/en/guide/angular) |
| 🌿 Nuxt 4 | ✅ Deployed | [Preview](https://halolight-nuxt.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-nuxt) | [Guide](https://halolight.docs.h7ml.cn/en/guide/nuxt) |
| 🧡 SvelteKit 2 | ✅ Deployed | [Preview](https://halolight-svelte.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-svelte) | [Guide](https://halolight.docs.h7ml.cn/en/guide/sveltekit) |
| 🪐 Astro 5 | ✅ Deployed | [Preview](https://halolight-astro.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-astro) | [Guide](https://halolight.docs.h7ml.cn/en/guide/astro) |
| 💠 Solid.js | ✅ Deployed | [Preview](https://halolight-solid.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-solid) | [Guide](https://halolight.docs.h7ml.cn/en/guide/solidjs) |
| ⚡ Qwik | ✅ Deployed | [Preview](https://halolight-qwik.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-qwik) | [Guide](https://halolight.docs.h7ml.cn/en/guide/qwik) |
| 🎸 Remix | ✅ Deployed | [Preview](https://halolight-remix.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-remix) | [Guide](https://halolight.docs.h7ml.cn/en/guide/remix) |
| 🪶 Preact | ✅ Deployed | [Preview](https://halolight-preact.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-preact) | [Guide](https://halolight.docs.h7ml.cn/en/guide/preact) |
| 🔥 Lit | ✅ Deployed | [Preview](https://halolight-lit.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-lit) | [Guide](https://halolight.docs.h7ml.cn/en/guide/lit) |
| 🦖 Fresh (Deno) | ✅ Deployed | [Preview](https://halolight-fresh.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-fresh) | [Guide](https://halolight.docs.h7ml.cn/en/guide/fresh) |
| 🦕 Deno | ✅ Deployed | [Preview](https://halolight-deno.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-deno) | [Guide](https://halolight.docs.h7ml.cn/en/guide/deno) |

### Backend APIs

| Backend Tech | Status | Preview | Repo | Docs |
|--------------|--------|---------|------|------|
| 🦜 NestJS 11 | ✅ Deployed | [API Docs](http://halolight-api-nestjs.h7ml.cn/docs) | [GitHub](https://github.com/halolight/halolight-api-nestjs) | [Guide](https://halolight.docs.h7ml.cn/en/guide/api-nestjs) |
| 🐍 Python FastAPI | ✅ Deployed | [API Docs](http://halolight-api-python.h7ml.cn/docs) | [GitHub](https://github.com/halolight/halolight-api-python) | [Guide](https://halolight.docs.h7ml.cn/en/guide/api-python) |
| ☕ Java Spring Boot | ✅ Deployed | [API Docs](http://halolight-api-java.h7ml.cn/swagger-ui.html) | [GitHub](https://github.com/halolight/halolight-api-java) | [Guide](https://halolight.docs.h7ml.cn/en/guide/api-java) |
| 🐹 Go Fiber | ✅ Deployed | [API Docs](http://halolight-api-go.h7ml.cn/swagger) | [GitHub](https://github.com/halolight/halolight-api-go) | [Guide](https://halolight.docs.h7ml.cn/en/guide/api-go) |
| 🟩 Node.js Express | ✅ Deployed | - | [GitHub](https://github.com/halolight/halolight-api-node) | [Guide](https://halolight.docs.h7ml.cn/en/guide/api-node) |
| 🐘 PHP Laravel | ✅ Deployed | - | [GitHub](https://github.com/halolight/halolight-api-php) | [Guide](https://halolight.docs.h7ml.cn/en/guide/api-php) |
| 🍞 Bun + Hono | ✅ Deployed | - | [GitHub](https://github.com/halolight/halolight-api-bun) | [Guide](https://halolight.docs.h7ml.cn/en/guide/api-bun) |

### Middleware / Full-stack

| Project | Status | Description | Repo | Docs |
|---------|--------|-------------|------|------|
| 🔗 tRPC BFF | ✅ Deployed | Type-safe API Gateway | [GitHub](https://github.com/halolight/halolight-bff) | [Guide](https://halolight.docs.h7ml.cn/en/guide/bff) |
| ⚡ Next.js Action | ✅ Deployed | Server Actions full-stack | [GitHub](https://github.com/halolight/halolight-action) | [Guide](https://halolight.docs.h7ml.cn/en/guide/action) |

### Deployment Options

| Platform | Status | Preview | Repo | Docs |
|----------|--------|---------|------|------|
| Cloudflare | Deployed | [Preview](https://halolight-cloudflare.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-cloudflare) | [Guide](https://halolight.docs.h7ml.cn/en/guide/cloudflare) |
| Vercel | Deployed | [Preview](https://halolight-vercel.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-vercel) | [Guide](https://halolight.docs.h7ml.cn/en/guide/vercel) |
| Netlify | Deployed | [Preview](https://halolight-netlify.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-netlify) | [Guide](https://halolight.docs.h7ml.cn/en/guide/netlify) |
| Docker | Deployed | - | [GitHub](https://github.com/halolight/halolight-docker) | [Guide](https://halolight.docs.h7ml.cn/en/guide/docker) |
| Railway | Deployed | [Preview](https://halolight-railway.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-railway) | [Guide](https://halolight.docs.h7ml.cn/en/guide/railway) |
| Fly.io | Deployed | [Preview](https://halolight-fly.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-fly) | [Guide](https://halolight.docs.h7ml.cn/en/guide/fly) |
| Azure | ✅ Deployed | [Preview](https://halolight-azure.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-azure) | [Guide](https://halolight.docs.h7ml.cn/en/guide/azure) |
| AWS | ✅ Deployed | [Preview](https://halolight-aws.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-aws) | [Guide](https://halolight.docs.h7ml.cn/en/guide/aws) |

### Extension Projects

| Project | Status | Description | Repo | Docs |
|---------|--------|-------------|------|------|
| 🎨 UI Components | ✅ Deployed | Stencil Web Components | [GitHub](https://github.com/halolight/halolight-ui) | [Guide](https://halolight.docs.h7ml.cn/en/guide/ui) |
| 🤖 AI Assistant | 🚧 In Development | RAG + Action Execution | [GitHub](https://github.com/halolight/halolight-ai) | [Guide](https://halolight.docs.h7ml.cn/en/guide/ai) |
| ₿ Web3 Integration | 🚧 In Development | Wallet Login + On-chain Data | [GitHub](https://github.com/halolight/halolight-web3) | [Guide](https://halolight.docs.h7ml.cn/en/guide/web3) |

## Core Features

- **Draggable Dashboard** - Customizable layout Dashboard system
- **Permission Control** - RBAC permission management with wildcard support
- **Theme System** - 11 skin presets + light/dark mode
- **Mock Data** - Complete data simulation for development
- **Component Library** - 30+ components based on shadcn/ui

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview build
pnpm preview
```

## Documentation Structure

```
docs/
├── .vitepress/              # VitePress configuration
│   ├── config.ts           # Main config
│   ├── nav.ts              # Navigation config
│   ├── sidebar.ts          # Sidebar config
│   ├── head.ts             # HTML head config
│   └── pwa.ts              # PWA config
├── guide/                   # User guides (Chinese)
├── en/guide/                # User guides (English)
├── development/             # Development docs (Chinese)
├── en/development/          # Development docs (English)
├── public/                  # Static assets
├── index.md                 # Homepage (Chinese)
└── en/index.md              # Homepage (English)
```

## Tech Stack

- [VitePress](https://vitepress.dev/) - Static Site Generator
- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Pagefind](https://pagefind.app/) - Full-text Search
- [Giscus](https://giscus.app/) - Comment System
- [PWA](https://web.dev/progressive-web-apps/) - Progressive Web App

## Contributing

Contributions are welcome! Feel free to submit Issues and Pull Requests.

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## License

[MIT](./LICENSE) © 2025 [h7ml](https://github.com/h7ml) & [HaloLight](https://github.com/halolight)
