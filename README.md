# HaloLight Docs

**[English](./README.en.md)** | 简体中文

[![Deploy](https://github.com/halolight/docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/halolight/docs/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646cff.svg?logo=vite)](https://vitepress.dev/)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D18-339933.svg?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.0-f69220.svg?logo=pnpm)](https://pnpm.io/)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fhalolight.docs.h7ml.cn&label=docs)](https://halolight.docs.h7ml.cn/)

HaloLight 多框架管理后台项目文档站点，基于 [VitePress](https://vitepress.dev/) 构建，支持中英文双语。

## 项目关系

- `halolight/docs`：文档与规范的唯一来源，定义跨框架的设计、接口和最佳实践
- `halolight/halolight`：Next.js 14 参考实现，验证规范的 React 路径
- `halolight/halolight-vue`：Vue 3.5 参考实现，验证规范的 Vue 路径

规范更新优先在本仓库落地，再同步到对应实现仓库，确保文档与代码一致。

## 项目概述

HaloLight 是一套多框架实现的企业级管理后台解决方案。参考实现：

- Next.js 14 ✅ · [预览](https://halolight.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight)
- Vue 3.5 ✅ · [预览](https://halolight-vue.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight-vue)

其余框架 (Angular、Nuxt、SvelteKit、Astro、Solid、Qwik、Remix、Preact、Lit、Fresh) 均已实现并部署，预览地址见各仓库 README。

### 框架版本

| 框架 | 状态 | 预览 | 仓库 | 文档 |
|------|------|------|------|------|
| 🟦 Next.js 14 | ✅ 已部署 | [预览](https://halolight.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight) | [指南](https://halolight.docs.h7ml.cn/guide/nextjs) |
| 💚 Vue 3.5 | ✅ 已部署 | [预览](https://halolight-vue.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-vue) | [指南](https://halolight.docs.h7ml.cn/guide/vue) |
| 🔺 Angular 21 | ✅ 已部署 | [预览](https://halolight-angular.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-angular) | [指南](https://halolight.docs.h7ml.cn/guide/angular) |
| 🌿 Nuxt 4 | ✅ 已部署 | [预览](https://halolight-nuxt.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-nuxt) | [指南](https://halolight.docs.h7ml.cn/guide/nuxt) |
| 🧡 SvelteKit 2 | ✅ 已部署 | [预览](https://halolight-svelte.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-svelte) | [指南](https://halolight.docs.h7ml.cn/guide/sveltekit) |
| 🪐 Astro 5 | ✅ 已部署 | [预览](https://halolight-astro.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-astro) | [指南](https://halolight.docs.h7ml.cn/guide/astro) |
| 💠 Solid.js | ✅ 已部署 | [预览](https://halolight-solid.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-solid) | [指南](https://halolight.docs.h7ml.cn/guide/solidjs) |
| ⚡ Qwik | ✅ 已部署 | [预览](https://halolight-qwik.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-qwik) | [指南](https://halolight.docs.h7ml.cn/guide/qwik) |
| 🎸 Remix | ✅ 已部署 | [预览](https://halolight-remix.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-remix) | [指南](https://halolight.docs.h7ml.cn/guide/remix) |
| 🪶 Preact | ✅ 已部署 | [预览](https://halolight-preact.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-preact) | [指南](https://halolight.docs.h7ml.cn/guide/preact) |
| 🔥 Lit | ✅ 已部署 | [预览](https://halolight-lit.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-lit) | [指南](https://halolight.docs.h7ml.cn/guide/lit) |
| 🦖 Fresh (Deno) | 📦 已归档 | [预览](https://halolight-fresh.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-fresh) | [指南](https://halolight.docs.h7ml.cn/guide/fresh) |

### 后端服务

| 服务 | 状态 | 预览 | 仓库 | 文档 |
|------|------|------|------|------|
| 🦕 Deno + Hono | ✅ 已部署 | [预览](https://halolight-deno.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-deno) | [指南](https://halolight.docs.h7ml.cn/guide/deno) |
| 🐹 Go API | ✅ 已部署 | [预览](https://halolight-api-go.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-api-go) | [指南](https://halolight.docs.h7ml.cn/guide/api-go) |
| 🟩 Node.js API | ✅ 已部署 | [预览](https://halolight-api-node.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-api-node) | [指南](https://halolight.docs.h7ml.cn/guide/api-node) |
| 🛠️ Admin 面板 | 🔒 私有 | [预览](https://halolight-admin.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-admin) | [指南](https://halolight.docs.h7ml.cn/guide/admin) |

### 部署方案

| 平台 | 状态 | 预览 | 仓库 | 文档 |
|------|------|------|------|------|
| ☁️ Cloudflare | ✅ 已部署 | [预览](https://halolight-cloudflare.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-cloudflare) | [指南](https://halolight.docs.h7ml.cn/guide/cloudflare) |
| ▲ Vercel | ✅ 已部署 | [预览](https://halolight-vercel.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-vercel) | [指南](https://halolight.docs.h7ml.cn/guide/vercel) |
| 🔷 Netlify | ✅ 已部署 | [预览](https://halolight-netlify.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-netlify) | [指南](https://halolight.docs.h7ml.cn/guide/netlify) |
| 🐳 Docker | ✅ 已部署 | - | [GitHub](https://github.com/halolight/halolight-docker) | [指南](https://halolight.docs.h7ml.cn/guide/docker) |
| 🚂 Railway | ✅ 已部署 | [预览](https://halolight-railway.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-railway) | [指南](https://halolight.docs.h7ml.cn/guide/railway) |
| ✈️ Fly.io | ✅ 已部署 | [预览](https://halolight-fly.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-fly) | [指南](https://halolight.docs.h7ml.cn/guide/fly) |
| ☁️ Azure | ✅ 已部署 | [预览](https://halolight-azure.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-azure) | [指南](https://halolight.docs.h7ml.cn/guide/azure) |
| 🟠 AWS | ✅ 已部署 | [预览](https://halolight-aws.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-aws) | [指南](https://halolight.docs.h7ml.cn/guide/aws) |

## 核心特性

- **可拖拽仪表盘** - 自定义布局的 Dashboard 系统
- **权限控制** - RBAC 权限管理，支持通配符
- **主题系统** - 11 种皮肤预设 + 明暗模式
- **Mock 数据** - 开发环境完整数据模拟
- **组件库** - 基于 shadcn/ui 30+ 组件

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 文档结构

```
docs/
├── .vitepress/              # VitePress 配置
│   ├── config.ts           # 主配置
│   ├── nav.ts              # 导航栏配置
│   ├── sidebar.ts          # 侧边栏配置
│   ├── head.ts             # HTML head 配置
│   └── pwa.ts              # PWA 配置
├── guide/                   # 使用指南
│   ├── index.md            # 简介
│   ├── getting-started.md  # 快速开始
│   ├── nextjs.md           # 🟦 Next.js
│   ├── vue.md              # 💚 Vue
│   ├── angular.md          # 🔺 Angular
│   ├── nuxt.md             # 🌿 Nuxt
│   ├── sveltekit.md        # 🧡 SvelteKit
│   ├── astro.md            # 🪐 Astro
│   ├── solidjs.md          # 💠 Solid.js
│   ├── qwik.md             # ⚡ Qwik
│   ├── remix.md            # 🎸 Remix
│   ├── preact.md           # 🪶 Preact
│   ├── lit.md              # 🔥 Lit
│   ├── fresh.md            # 🦖 Fresh (Deno)
│   ├── deno.md             # 🦕 Deno + Hono
│   ├── api-go.md           # 🐹 Go API
│   ├── api-node.md         # 🟩 Node.js API
│   ├── admin.md            # 🛠️ Admin 面板
│   ├── cloudflare.md       # ☁️ Cloudflare
│   ├── vercel.md           # ▲ Vercel
│   ├── netlify.md          # 🔷 Netlify
│   ├── docker.md           # 🐳 Docker
│   ├── railway.md          # 🚂 Railway
│   ├── fly.md              # ✈️ Fly.io
│   ├── azure.md            # ☁️ Azure
│   └── aws.md              # 🟠 AWS
├── development/             # 开发文档
│   ├── index.md            # 开发概览
│   ├── architecture.md     # 整体架构
│   ├── components.md       # 组件规范
│   ├── state-management.md # 状态管理
│   ├── api-patterns.md     # API 设计
│   ├── authentication.md   # 认证系统
│   ├── dashboard.md        # 仪表盘
│   ├── theming.md          # 主题系统
│   └── implementation-guide.md # 实现指南
├── public/                  # 静态资源
└── index.md                 # 首页
```

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Pagefind](https://pagefind.app/) - 全文搜索
- [Giscus](https://giscus.app/) - 评论系统
- [PWA](https://web.dev/progressive-web-apps/) - 渐进式 Web 应用

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## License

[MIT](./LICENSE) © 2025 [h7ml](https://github.com/h7ml) & [HaloLight](https://github.com/halolight)
