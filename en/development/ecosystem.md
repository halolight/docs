# HaloLight Ecosystem

HaloLight is a multi-framework, multi-platform admin dashboard solution. This document lists all projects and their status.

## Project Overview

### Frontend Framework Implementations

| Project | Framework | Status | Description |
|---------|-----------|--------|-------------|
| [halolight](https://github.com/halolight/halolight) | Next.js 14 + React 18 | ✅ Released | Reference implementation |
| [halolight-vue](https://github.com/halolight/halolight-vue) | Vue 3.5 + Vite | ✅ Released | Vue reference implementation |
| [halolight-angular](https://github.com/halolight/halolight-angular) | Angular 21 | ✅ Released | Angular implementation |
| [halolight-nuxt](https://github.com/halolight/halolight-nuxt) | Nuxt 3 | ✅ Released | Vue SSR version |
| [halolight-svelte](https://github.com/halolight/halolight-svelte) | SvelteKit | ✅ Released | Svelte implementation |
| [halolight-astro](https://github.com/halolight/halolight-astro) | Astro | ✅ Released | Static-first |
| [halolight-solid](https://github.com/halolight/halolight-solid) | SolidJS | ✅ Released | High-performance reactive |
| [halolight-qwik](https://github.com/halolight/halolight-qwik) | Qwik | ✅ Released | Resumable |
| [halolight-remix](https://github.com/halolight/halolight-remix) | Remix | ✅ Released | Full-stack React |
| [halolight-preact](https://github.com/halolight/halolight-preact) | Preact | ✅ Released | Lightweight React |
| [halolight-lit](https://github.com/halolight/halolight-lit) | Lit | ✅ Released | Web Components |
| [halolight-fresh](https://github.com/halolight/halolight-fresh) | Fresh (Deno) | ✅ Released | Deno native |

### Deployment Platforms

| Project | Platform | Status | Features |
|---------|----------|--------|----------|
| [halolight-cloudflare](https://github.com/halolight/halolight-cloudflare) | Cloudflare Pages/Workers | ✅ Released | Edge runtime, Next.js 15 |
| [halolight-vercel](https://github.com/halolight/halolight-vercel) | Vercel | ✅ Released | Edge Functions |
| [halolight-netlify](https://github.com/halolight/halolight-netlify) | Netlify | ✅ Released | Edge Functions |
| [halolight-aws](https://github.com/halolight/halolight-aws) | AWS Amplify | ✅ Released | Lambda@Edge |
| [halolight-azure](https://github.com/halolight/halolight-azure) | Azure Static Web Apps | ✅ Released | Azure Functions |
| [halolight-fly](https://github.com/halolight/halolight-fly) | Fly.io | ✅ Released | Global deployment |
| [halolight-railway](https://github.com/halolight/halolight-railway) | Railway | ✅ Released | One-click deploy |
| [halolight-docker](https://github.com/halolight/halolight-docker) | Docker self-hosted | ✅ Released | Traefik reverse proxy |

### Backend APIs

| Project | Tech Stack | Status | Features |
|---------|------------|--------|----------|
| [halolight-api-node](https://github.com/halolight/halolight-api-node) | Express + Prisma + TypeScript | ✅ Released | Node.js reference implementation |
| [halolight-api-go](https://github.com/halolight/halolight-api-go) | Gin + GORM | ✅ Released | High performance |
| [halolight-api-python](https://github.com/halolight/halolight-api-python) | FastAPI + SQLAlchemy + Alembic | ✅ Released | Python ecosystem |
| [halolight-api-bun](https://github.com/halolight/halolight-api-bun) | Hono + Drizzle ORM | ✅ Released | Bun runtime |
| [halolight-api-java](https://github.com/halolight/halolight-api-java) | Spring Boot 3.4 + JPA | ✅ Released | Enterprise Java |

### Infrastructure

| Project | Purpose | Status | Features |
|---------|---------|--------|----------|
| [halolight-bff](https://github.com/halolight/halolight-bff) | tRPC Gateway | ✅ Released | Type-safe API |
| [halolight-ui](https://github.com/halolight/halolight-ui) | Stencil Web Components | ✅ Released | Cross-framework component library |

### AI & Web3

| Project | Purpose | Status | Features |
|---------|---------|--------|----------|
| [halolight-ai](https://github.com/halolight/halolight-ai) | AI Assistant | ✅ Released | RAG + Action execution |
| [halolight-web3](https://github.com/halolight/halolight-web3) | Web3 Integration | ✅ Released | EVM + Solana + IPFS |

## Tech Stack Comparison

### Frontend Frameworks

```
React family:     Next.js → Remix → Preact
Vue family:       Vue 3.5 → Nuxt 3
Others:           Angular → SvelteKit → SolidJS → Qwik → Lit → Astro → Fresh
```

### Backend Languages

```
Node.js:          Express (Prisma) → Hono (Drizzle)
Go:               Gin (GORM)
Python:           FastAPI (SQLAlchemy)
Java:             Spring Boot (JPA)
```

### Deployment Platforms

```
Edge runtime:     Cloudflare → Vercel → Netlify
Cloud platforms:  AWS Amplify → Azure SWA → Fly.io → Railway
Self-hosted:      Docker + Traefik
```

## Quick Start

### Choose Frontend Framework

```bash
# React (Recommended)
git clone https://github.com/halolight/halolight
cd halolight && pnpm install && pnpm dev

# Vue
git clone https://github.com/halolight/halolight-vue
cd halolight-vue && pnpm install && pnpm dev

# Angular
git clone https://github.com/halolight/halolight-angular
cd halolight-angular && pnpm install && pnpm start
```

### Choose Backend API

```bash
# Node.js (Recommended)
git clone https://github.com/halolight/halolight-api-node
cd halolight-api-node && pnpm install && pnpm dev

# Go
git clone https://github.com/halolight/halolight-api-go
cd halolight-api-go && go run main.go

# Python
git clone https://github.com/halolight/halolight-api-python
cd halolight-api-python && pip install -r requirements.txt && uvicorn main:app --reload

# Java
git clone https://github.com/halolight/halolight-api-java
cd halolight-api-java && mvn spring-boot:run
```

### Choose Deployment Platform

```bash
# Cloudflare (Recommended for edge)
git clone https://github.com/halolight/halolight-cloudflare
cd halolight-cloudflare && pnpm install && pnpm deploy

# Docker (Recommended for self-hosted)
git clone https://github.com/halolight/halolight-docker
cd halolight-docker && docker-compose up -d
```

## Component Library Usage

### Install halolight-ui

```bash
npm install @halolight/ui
```

### Use in HTML

```html
<script type="module" src="https://unpkg.com/@halolight/ui/dist/halolight-ui.esm.js"></script>

<hl-button variant="primary">Click me</hl-button>
<hl-input label="Email" type="email"></hl-input>
<hl-card>
  <h3 slot="header">Card Title</h3>
  <p>Card content</p>
</hl-card>
```

### Use in React

```tsx
import { defineCustomElements } from '@halolight/ui/loader';
defineCustomElements();

function App() {
  return <hl-button variant="primary">Click me</hl-button>;
}
```

### Use in Vue

```vue
<script setup>
import { defineCustomElements } from '@halolight/ui/loader';
defineCustomElements();
</script>

<template>
  <hl-button variant="primary">Click me</hl-button>
</template>
```

## AI Assistant Integration

### Deploy halolight-ai

```bash
git clone https://github.com/halolight/halolight-ai
cd halolight-ai
cp .env.example .env
# Configure OPENAI_API_KEY or other LLM keys
docker-compose up -d
```

### API Calls

```bash
# Send message
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: default" \
  -H "X-User-ID: user1" \
  -d '{"message": "Help me analyze today'\''s data"}'

# Execute action
curl -X POST http://localhost:3000/api/ai/actions/execute \
  -H "Content-Type: application/json" \
  -d '{"action": "query_users", "params": {"role": "admin"}}'
```

## Web3 Integration

### Install Dependencies

```bash
# Core package
npm install @halolight/web3-core

# React components
npm install @halolight/web3-react

# Vue components
npm install @halolight/web3-vue
```

### React Example

```tsx
import { Web3Provider, WalletButton, TokenBalance } from '@halolight/web3-react';

function App() {
  return (
    <Web3Provider>
      <WalletButton />
      <TokenBalance />
    </Web3Provider>
  );
}
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/xxx`
3. Commit changes: `git commit -m 'feat: xxx'`
4. Push branch: `git push origin feature/xxx`
5. Submit Pull Request

## License

All HaloLight projects are licensed under MIT License.
