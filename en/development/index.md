# HaloLight Development Documentation

This documentation collection covers the shared patterns and implementation specifications for the HaloLight multi-framework admin dashboard project, guiding the development of each framework version.

## Table of Contents

### Architecture Design
- [Architecture](./architecture) - Overall project architecture and directory structure specifications
- [Components](./components) - UI component library design specifications
- [State Management](./state-management) - State management patterns and best practices

### Feature Modules
- [API Patterns](./api-patterns) - API service layer architecture and data fetching strategies
- [Authentication](./authentication) - User authentication and permission control implementation
- [Dashboard](./dashboard) - Draggable dashboard implementation specifications
- [Theming](./theming) - Theme switching and skin preset system

### Development Guide
- [Implementation Guide](./implementation-guide) - Guide for implementing new framework versions

## Framework Status

All framework versions have been implemented and deployed (preview links available in respective repository READMEs). Reference implementations (for specification validation):

- Next.js 14 · [Preview](https://halolight.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight)
- Vue 3.5 · [Preview](https://halolight-vue.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight-vue)

Other frameworks：Angular · Nuxt · SvelteKit · Astro · Solid.js · Qwik · Remix · Preact · Lit · Fresh (Deno)。

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

## Tech Stack Overview

### Common Tech Stack
- **TypeScript** - Type safety
- **Tailwind CSS** - Style system
- **shadcn/ui** - UI component library (framework-specific versions)
- **Mock.js** - Development environment data simulation
- **ECharts** - Chart visualization

### Framework-Specific Dependencies

| Feature | React/Next.js | Vue 3 | Angular | Svelte |
|---------|---------------|-------|---------|--------|
| State Management | Zustand | Pinia | Signals/RxJS | Svelte Stores |
| Data Fetching | TanStack Query | TanStack Query | RxJS | TanStack Query |
| Routing | Next.js App Router | Vue Router | Angular Router | SvelteKit |
| Forms | React Hook Form | VeeValidate | Reactive Forms | Superforms |
| Drag Layout | react-grid-layout | grid-layout-plus | angular-gridster2 | svelte-grid |
