# Getting Started

Choose your preferred frontend framework and match it with a backend API to quickly start with HaloLight.

## 🎯 Choose Your Combination

HaloLight uses a **fully decoupled frontend-backend architecture**, supporting **12 Frontends × 8 Backends = 96 Combinations**.

### Step 1: Choose Frontend Framework (Pick 1 of 12)

| Framework | Use Cases | Characteristics |
|-----------|-----------|-----------------|
| **Next.js / Nuxt** | Multi-tenant SaaS, SEO needs | SSR + Edge rendering friendly |
| **Vue** | Quick delivery for small-medium teams | Lightweight, smooth learning curve |
| **Angular** | Large-scale, long-term projects | Strong typing, clear architecture |
| **SvelteKit / Solid / Qwik** | High interaction, real-time scenarios | Ultimate performance & reactivity |
| **Remix / Preact / Lit** | Progressive enhancement, lightweight | Web Components, small bundle size |
| **Astro** | Content-focused admin panels | Islands architecture, zero JS by default |

### Step 2: Choose Backend API (Pick 1 of 8)

| Backend Tech | Use Cases | Characteristics |
|--------------|-----------|-----------------|
| **NestJS / Express** | Node.js ecosystem teams | High compatibility with frontend TS |
| **FastAPI** | Data/AI-driven applications | Python ecosystem, rapid iteration |
| **Spring Boot** | Enterprise, financial industry | Mature middleware ecosystem |
| **Go Fiber** | High performance, high concurrency | Low resource usage |
| **PHP Laravel** | Traditional web teams | Complete ecosystem, easy to learn |
| **Bun + Hono** | Ultimate performance pursuit | Next-gen runtime |
| **tRPC BFF** | Mobile/Desktop multi-platform | Type sharing, aggregation & simplification |

### Step 3: Recommended Combinations (By Scenario)

<details>
<summary><b>📊 Multi-tenant SaaS / Enterprise Admin</b></summary>

**Recommended**: Next.js + NestJS

**Advantages**:
- SSR + TypeScript end-to-end unification
- Code sharing (types, utilities)
- Mature deployment ecosystem (Vercel + Railway/Fly.io)

</details>

<details>
<summary><b>🤖 Data-Intensive / AI-Driven Apps</b></summary>

**Recommended**: Vue + FastAPI or React + FastAPI

**Advantages**:
- Python data science ecosystem (Pandas, NumPy, scikit-learn)
- Fast API development (auto docs, dependency injection)
- Lightweight frontend, easy chart library integration

</details>

<details>
<summary><b>🏢 Large Enterprise / Long-term Projects</b></summary>

**Recommended**: Angular + Spring Boot

**Advantages**:
- Strong typing, modular architecture
- Mature enterprise middleware (auth, cache, message queue)
- Long-term support and stability

</details>

<details>
<summary><b>⚡ High-Performance Real-time Apps</b></summary>

**Recommended**: SvelteKit + Go Fiber

**Advantages**:
- Frontend compilation optimization, minimal bundle
- Backend high throughput, low latency
- Low resource usage, cost optimization

</details>

<details>
<summary><b>📱 Mobile/Desktop Multi-platform Unified</b></summary>

**Recommended**: Any Frontend + tRPC BFF + Any Backend

**Advantages**:
- BFF aggregates and tailors APIs for multiple platforms
- TypeScript end-to-end type safety
- Reduces frontend complexity

</details>

---

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

## 🚀 Quick Examples

### Option 1: Next.js + NestJS

```bash
# Terminal 1: Start frontend
git clone https://github.com/halolight/halolight.git && cd halolight
pnpm install && pnpm dev
```

```bash
# Terminal 2: Start backend
git clone https://github.com/halolight/halolight-api-nestjs.git && cd halolight-api-nestjs
pnpm install && pnpm dev
```

### Option 2: Vue + FastAPI

```bash
# Terminal 1: Start frontend
git clone https://github.com/halolight/halolight-vue.git && cd halolight-vue
pnpm install && pnpm dev
```

```bash
# Terminal 2: Start backend
git clone https://github.com/halolight/halolight-api-python.git && cd halolight-api-python
pip install -e ".[dev]" && uvicorn app.main:app --reload
```

---

## Next Steps

- [Next.js Version](/en/guide/nextjs) - Deep dive into Next.js implementation
- [Vue Version](/en/guide/vue) - Deep dive into Vue implementation
- [NestJS API](/en/guide/api-nestjs) - NestJS backend development guide
- [Python API](/en/guide/api-python) - FastAPI backend development guide
- [Architecture Combinations](/en/guide/combinations) - View all 96 combinations
- [Development Docs](/en/development/) - View design specifications and contracts
