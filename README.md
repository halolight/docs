# HaloLight Docs

[![Deploy](https://github.com/halolight/docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/halolight/docs/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646cff.svg?logo=vite)](https://vitepress.dev/)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D18-339933.svg?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.0-f69220.svg?logo=pnpm)](https://pnpm.io/)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fhalolight.docs.h7ml.cn&label=docs)](https://halolight.docs.h7ml.cn/)

HaloLight 多框架管理后台项目文档站点，基于 [VitePress](https://vitepress.dev/) 构建。

## 项目概述

HaloLight 是一套多框架实现的企业级管理后台解决方案，支持：

| 框架 | 状态 | 预览 | 仓库 |
|------|------|------|------|
| Next.js 14 | ✅ 已完成 | [预览](https://halolight.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight) |
| Vue 3.5 | ✅ 已完成 | [预览](https://halolight-vue.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-vue) |
| Angular 21 | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-angular) |
| Nuxt 4 | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-nuxt) |
| SvelteKit 2 | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-svelte) |
| Astro 5 | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-astro) |
| Solid.js | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-solid) |
| Qwik | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-qwik) |
| Remix | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-remix) |
| Preact | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-preact) |
| Lit | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-lit) |
| Fresh (Deno) | 🚧 开发中 | - | [GitHub](https://github.com/halolight/halolight-fresh) |

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
├── .vitepress/           # VitePress 配置
├── guide/                # 使用指南
│   ├── index.md         # 简介
│   └── getting-started.md
├── development/          # 开发文档
│   ├── index.md         # 开发概览
│   ├── architecture.md  # 整体架构
│   ├── components.md    # 组件规范
│   ├── state-management.md # 状态管理
│   ├── api-patterns.md  # API 设计
│   ├── authentication.md # 认证系统
│   ├── dashboard.md     # 仪表盘
│   ├── theming.md       # 主题系统
│   └── implementation-guide.md # 实现指南
├── public/               # 静态资源
└── index.md              # 首页
```

## License

MIT
