---
layout: home
hero:
  name: HaloLight
  text: Full-Stack Decoupled Admin Dashboard
  tagline: Frontend-Backend Separation · 11 Frontends × 8 Backends = 88 Combinations · Enterprise-Grade
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: Architecture
      link: /en/development/architecture
    - theme: alt
      text: GitHub
      link: https://github.com/halolight
features:
  - icon: 🔀
    title: Frontend-Backend Composable
    details: 11 frontend frameworks × 8 backend APIs, freely mix and match for 88 combinations
  - icon: 📊
    title: Draggable Dashboard
    details: Custom Dashboard based on Grid Layout with drag, resize, and persistence support
  - icon: 🔐
    title: Permission Control
    details: RBAC permission management with wildcard matching and fine-grained page/button level control
  - icon: 🎭
    title: Theme System
    details: 11 skin presets + dark/light mode with View Transitions animation switching
  - icon: 🧩
    title: shadcn/ui Components
    details: Based on shadcn/ui design system with 30+ beautiful ready-to-use components
  - icon: 🔧
    title: Developer Friendly
    details: TypeScript type safety, Mock.js data simulation, comprehensive documentation
---

## 🏗️ Architecture Overview

### Full Frontend-Backend Separation

- **Independent Repos & Deployment**: Frontend on CDN/edge, backend with elastic scaling
- **Contract Alignment**: OpenAPI / tRPC / GraphQL Schema ensures frontend-backend coordination
- **Tech Stack Unlocked**: Replace any frontend or backend while maintaining contract compatibility

### 88 Combination Possibilities

**11 Frontend Frameworks**：
Next.js · Nuxt · Vue · Angular · SvelteKit · Astro · Solid.js · Qwik · Remix · Preact · Lit

**8 Backend APIs**：
NestJS · Node.js (Express) · Python (FastAPI) · Java (Spring Boot) · Go (Fiber) · PHP (Laravel) · Bun + Hono · tRPC BFF

**Any Combination = 11 × 8 = 88 Stack Options**

### Common Combination Examples

| Combination | Use Case | Advantages |
|-------------|----------|------------|
| **Next.js + NestJS** | Multi-tenant SaaS, Enterprise Admin | SSR + TS unified stack, code sharing |
| **Vue + FastAPI** | Quick delivery for small teams | Lightweight, Python data ecosystem |
| **Angular + Spring Boot** | Large enterprise, long-term projects | Strong typing, mature middleware |
| **SvelteKit + Go Fiber** | High-performance real-time apps | Ultimate performance, low resources |
| **Any Frontend + tRPC BFF** | Mobile/Desktop multi-platform | Type sharing, aggregation & simplification |

### Decoupling Benefits

- ✅ **Parallel Team Delivery**: Frontend and backend teams develop independently
- ✅ **Scale on Demand**: Frontend static/SSR, backend microservices/serverless
- ✅ **Flexible Tech Upgrades**: Replace either side without affecting the other
- ✅ **Multi-Team Collaboration**: Different tech stack teams share the same API
