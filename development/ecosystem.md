# HaloLight 生态系统

HaloLight 是一个多框架、多平台的后台管理系统解决方案。本文档列出所有项目及其状态。

## 项目总览

### 前端框架实现

| 项目 | 框架 | 状态 | 说明 |
|------|------|------|------|
| [halolight](https://github.com/halolight/halolight) | Next.js 14 + React 18 | ✅ 已发布 | 参考实现 |
| [halolight-react](https://github.com/halolight/halolight-react) | React + Vite | ✅ 已发布 | 纯 SPA 版本 |
| [halolight-vue](https://github.com/halolight/halolight-vue) | Vue 3.5 + Vite | ✅ 已发布 | Vue 参考实现 |
| [halolight-angular](https://github.com/halolight/halolight-angular) | Angular 21 | ✅ 已发布 | Angular 实现 |
| [halolight-nuxt](https://github.com/halolight/halolight-nuxt) | Nuxt 3 | ✅ 已发布 | Vue SSR 版本 |
| [halolight-svelte](https://github.com/halolight/halolight-svelte) | SvelteKit | ✅ 已发布 | Svelte 实现 |
| [halolight-astro](https://github.com/halolight/halolight-astro) | Astro | ✅ 已发布 | 静态优先 |
| [halolight-solid](https://github.com/halolight/halolight-solid) | SolidJS | ✅ 已发布 | 高性能响应式 |
| [halolight-qwik](https://github.com/halolight/halolight-qwik) | Qwik | ✅ 已发布 | 可恢复式 |
| [halolight-remix](https://github.com/halolight/halolight-remix) | Remix | ✅ 已发布 | 全栈 React |
| [halolight-preact](https://github.com/halolight/halolight-preact) | Preact | ✅ 已发布 | 轻量级 React |
| [halolight-lit](https://github.com/halolight/halolight-lit) | Lit | ✅ 已发布 | Web Components |
| [halolight-fresh](https://github.com/halolight/halolight-fresh) | Fresh (Deno) | ✅ 已发布 | Deno 原生 |
| [halolight-deno](https://github.com/halolight/halolight-deno) | Fresh (Deno) | ✅ 已发布 | Deno 实现 |

### 部署平台

| 项目 | 平台 | 状态 | 特性 |
|------|------|------|------|
| [halolight-cloudflare](https://github.com/halolight/halolight-cloudflare) | Cloudflare Pages/Workers | ✅ 已发布 | 边缘运行时, Next.js 15 |
| [halolight-vercel](https://github.com/halolight/halolight-vercel) | Vercel | ✅ 已发布 | Edge Functions |
| [halolight-netlify](https://github.com/halolight/halolight-netlify) | Netlify | ✅ 已发布 | Edge Functions |
| [halolight-aws](https://github.com/halolight/halolight-aws) | AWS Amplify | ✅ 已发布 | Lambda@Edge |
| [halolight-azure](https://github.com/halolight/halolight-azure) | Azure Static Web Apps | ✅ 已发布 | Azure Functions |
| [halolight-fly](https://github.com/halolight/halolight-fly) | Fly.io | ✅ 已发布 | 全球部署 |
| [halolight-railway](https://github.com/halolight/halolight-railway) | Railway | ✅ 已发布 | 一键部署 |
| [halolight-docker](https://github.com/halolight/halolight-docker) | Docker 自托管 | ✅ 已发布 | Traefik 反向代理 |

### 后端 API

| 项目 | 技术栈 | 状态 | 特性 |
|------|------|------|------|
| [halolight-api-nestjs](https://github.com/halolight/halolight-api-nestjs) | NestJS + Prisma + TypeScript | ✅ 已发布 | Node.js 企业级 |
| [halolight-api-node](https://github.com/halolight/halolight-api-node) | Express + Prisma + TypeScript | ✅ 已发布 | Node.js 参考实现 |
| [halolight-api-go](https://github.com/halolight/halolight-api-go) | Gin + GORM | ✅ 已发布 | 高性能 |
| [halolight-api-python](https://github.com/halolight/halolight-api-python) | FastAPI + SQLAlchemy + Alembic | ✅ 已发布 | Python 生态 |
| [halolight-api-bun](https://github.com/halolight/halolight-api-bun) | Hono + Drizzle ORM | ✅ 已发布 | Bun 运行时 |
| [halolight-api-java](https://github.com/halolight/halolight-api-java) | Spring Boot 3.4 + JPA | ✅ 已发布 | 企业级 Java |
| [halolight-api-php](https://github.com/halolight/halolight-api-php) | Laravel + Eloquent | ✅ 已发布 | PHP 生态 |

### 基础设施

| 项目 | 用途 | 状态 | 特性 |
|------|------|------|------|
| [halolight-bff](https://github.com/halolight/halolight-bff) | tRPC 网关 | ✅ 已发布 | 类型安全 API |
| [halolight-action](https://github.com/halolight/halolight-action) | Next.js 全栈 | ✅ 已发布 | Server Actions |
| [halolight-ui](https://github.com/halolight/halolight-ui) | Stencil Web Components | ✅ 已发布 | 跨框架组件库 |

### 智能化 & Web3

| 项目 | 用途 | 状态 | 特性 |
|------|------|------|------|
| [halolight-ai](https://github.com/halolight/halolight-ai) | AI 智能助理 | ✅ 已发布 | RAG + 动作执行 |
| [halolight-web3](https://github.com/halolight/halolight-web3) | Web3 集成 | ✅ 已发布 | EVM + Solana + IPFS |

## 技术栈对比

### 前端框架

```
React 系:     Next.js → Remix → Preact → React (Vite)
Vue 系:       Vue 3.5 → Nuxt 3
其他:         Angular → SvelteKit → SolidJS → Qwik → Lit → Astro → Fresh → Deno
```

### 后端语言

```
Node.js:      NestJS (Prisma) → Express (Prisma) → Hono (Drizzle)
Go:           Gin (GORM)
Python:       FastAPI (SQLAlchemy)
Java:         Spring Boot (JPA)
PHP:          Laravel (Eloquent)
```

### 部署平台

```
边缘运行时:    Cloudflare → Vercel → Netlify
云平台:        AWS Amplify → Azure SWA → Fly.io → Railway
自托管:        Docker + Traefik
```

## 快速开始

### 选择前端框架

```bash
# React (推荐)
git clone https://github.com/halolight/halolight
cd halolight && pnpm install && pnpm dev

# Vue
git clone https://github.com/halolight/halolight-vue
cd halolight-vue && pnpm install && pnpm dev

# Angular
git clone https://github.com/halolight/halolight-angular
cd halolight-angular && pnpm install && pnpm start
```

### 选择后端 API

```bash
# Node.js (推荐)
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

### 选择部署平台

```bash
# Cloudflare (推荐边缘)
git clone https://github.com/halolight/halolight-cloudflare
cd halolight-cloudflare && pnpm install && pnpm deploy

# Docker (推荐自托管)
git clone https://github.com/halolight/halolight-docker
cd halolight-docker && docker-compose up -d
```

## 组件库使用

### 安装 halolight-ui

```bash
npm install @halolight/ui
```

### 在 HTML 中使用

```html
<script type="module" src="https://unpkg.com/@halolight/ui/dist/halolight-ui.esm.js"></script>

<hl-button variant="primary">Click me</hl-button>
<hl-input label="Email" type="email"></hl-input>
<hl-card>
  <h3 slot="header">Card Title</h3>
  <p>Card content</p>
</hl-card>
```

### 在 React 中使用

```tsx
import { defineCustomElements } from '@halolight/ui/loader';
defineCustomElements();

function App() {
  return <hl-button variant="primary">Click me</hl-button>;
}
```

### 在 Vue 中使用

```vue
<script setup>
import { defineCustomElements } from '@halolight/ui/loader';
defineCustomElements();
</script>

<template>
  <hl-button variant="primary">Click me</hl-button>
</template>
```

## AI 助理集成

### 部署 halolight-ai

```bash
git clone https://github.com/halolight/halolight-ai
cd halolight-ai
cp .env.example .env
# 配置 OPENAI_API_KEY 或其他 LLM 密钥
docker-compose up -d
```

### API 调用

```bash
# 发送消息
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: default" \
  -H "X-User-ID: user1" \
  -d '{"message": "帮我分析今日数据"}'

# 执行动作
curl -X POST http://localhost:3000/api/ai/actions/execute \
  -H "Content-Type: application/json" \
  -d '{"action": "query_users", "params": {"role": "admin"}}'
```

## Web3 集成

### 安装依赖

```bash
# 核心包
npm install @halolight/web3-core

# React 组件
npm install @halolight/web3-react

# Vue 组件
npm install @halolight/web3-vue
```

### React 示例

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

## 贡献指南

1. Fork 对应仓库
2. 创建功能分支：`git checkout -b feature/xxx`
3. 提交更改：`git commit -m 'feat: xxx'`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

## 许可证

所有 HaloLight 项目均采用 MIT 许可证。
