# Introduction

HaloLight is a multi-framework enterprise-level admin dashboard solution.

## What is HaloLight

HaloLight follows the philosophy of "one design specification, multiple framework implementations", providing developers with a unified Admin Dashboard experience. Whether you use React, Vue, Angular, or other modern frameworks, you'll get consistent functionality and design.

## Core Features

### Draggable Dashboard
Custom Dashboard system based on Grid Layout, supporting:
- Widget drag and drop arrangement
- Responsive layout adaptation
- Layout state persistence

### Permission Control
Complete RBAC permission management system:
- Fine-grained permission control (page/button level)
- Wildcard permission matching (`users:*`, `*`)
- Dynamic menu rendering

### Theme System
Rich visual customization capabilities:
- 11 skin presets
- Light/Dark mode switching
- View Transitions animation effects

### Component Library
Based on shadcn/ui design system:
- 30+ beautiful UI components
- Complete form/table solutions
- Highly customizable

### Frontend-Backend Any Combination
- **88 Combination Options**: 11 frontend frameworks × 8 backend APIs, choose freely based on team tech stack or business scenarios
- **BFF/Gateway Decoupling**: Optional tRPC, GraphQL Gateway for aggregation, authentication & simplification
- **Upgrade Without Lock-in**: Replace any frontend or backend while maintaining contract compatibility
- **Independent Evolution**: Frontend can choose SSR/SSG/SPA, backend can choose monolith/microservices/serverless

## Framework Implementations

All framework versions have been implemented and deployed (preview links available in respective repository READMEs). Current reference implementations:

- Next.js 14：[Preview](https://halolight.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight)
- Vue 3.5：[Preview](https://halolight-vue.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight-vue)

| Framework | Status | Preview | Repository |
|-----------|--------|---------|------------|
| Next.js 14 | ✅ Deployed | [Preview](https://halolight.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight) |
| Vue 3.5 | ✅ Deployed | [Preview](https://halolight-vue.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-vue) |
| Angular 21 | ✅ Deployed | [Preview](https://halolight-angular.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-angular) |
| Nuxt 4 | ✅ Deployed | [Preview](https://halolight-nuxt.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-nuxt) |
| SvelteKit 2 | ✅ Deployed | [Preview](https://halolight-svelte.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-svelte) |
| Astro 5 | ✅ Deployed | [Preview](https://halolight-astro.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-astro) |
| Solid.js | ✅ Deployed | [Preview](https://halolight-solid.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-solid) |
| Qwik | ✅ Deployed | [Preview](https://halolight-qwik.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-qwik) |
| Remix | ✅ Deployed | [Preview](https://halolight-remix.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-remix) |
| Preact | ✅ Deployed | [Preview](https://halolight-preact.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-preact) |
| Lit | ✅ Deployed | [Preview](https://halolight-lit.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-lit) |
| Fresh (Deno) | ✅ Deployed | [Preview](https://halolight-fresh.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-fresh) |

> 💡 **Flexible Combinations**: Frontend mainline supports 11 frameworks, any frontend can combine with 8 backend APIs, forming 88+ combination options.

## Backend API Implementations

| Backend Tech | Status | Preview | Repository |
|--------------|--------|---------|------------|
| NestJS 11 | ✅ Deployed | [API Docs](http://halolight-api-nestjs.h7ml.cn/docs) | [GitHub](https://github.com/halolight/halolight-api-nestjs) |
| Python FastAPI | ✅ Deployed | [API Docs](http://halolight-api-python.h7ml.cn/docs) | [GitHub](https://github.com/halolight/halolight-api-python) |
| Java Spring Boot | ✅ Deployed | [API Docs](http://halolight-api-java.h7ml.cn/swagger-ui.html) | [GitHub](https://github.com/halolight/halolight-api-java) |
| Go Fiber | ✅ Deployed | [API Docs](http://halolight-api-go.h7ml.cn/swagger) | [GitHub](https://github.com/halolight/halolight-api-go) |
| Node.js Express | ✅ Deployed | - | [GitHub](https://github.com/halolight/halolight-api-node) |
| PHP Laravel | ✅ Deployed | - | [GitHub](https://github.com/halolight/halolight-api-php) |
| Bun + Hono | ✅ Deployed | - | [GitHub](https://github.com/halolight/halolight-api-bun) |
| tRPC BFF | ✅ Deployed | - | [GitHub](https://github.com/halolight/halolight-bff) |

## Tech Stack

All framework versions share the following tech stack:

- **TypeScript** - Type safety
- **Tailwind CSS** - Atomic CSS
- **shadcn/ui** - UI component library
- **TanStack Query** - Server state management
- **ECharts** - Chart visualization
- **Mock.js** - Data simulation

## Next Steps

- [Quick Start](/en/guide/getting-started) - Choose a framework version to start
- [Next.js Version](/en/guide/nextjs) - Learn more about Next.js implementation
- [Vue Version](/en/guide/vue) - Learn more about Vue implementation
- [Development Docs](/en/development/) - Learn about shared design specifications
