# HaloLight 开发文档

本文档集合了 HaloLight 多框架管理后台项目的共有模式和实现规范，用于指导各框架版本的开发。

## 文档目录

### 架构设计
- [整体架构](./architecture) - 项目整体架构和目录结构规范
- [组件规范](./components) - UI 组件库设计规范
- [状态管理](./state-management) - 状态管理模式和最佳实践

### 功能模块
- [API 层设计](./api-patterns) - API 服务层架构和数据获取策略
- [认证系统](./authentication) - 用户认证和权限控制实现
- [仪表盘](./dashboard) - 可拖拽仪表盘实现规范
- [主题系统](./theming) - 主题切换和皮肤预设系统

### 开发指南
- [实现指南](./implementation-guide) - 新框架版本实现指南

## 已完成实现

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

## 技术栈概览

### 通用技术栈
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式系统
- **shadcn/ui** - UI 组件库 (各框架对应版本)
- **Mock.js** - 开发环境数据模拟
- **ECharts** - 图表可视化

### 框架特定依赖

| 功能 | React/Next.js | Vue 3 | Angular | Svelte |
|------|---------------|-------|---------|--------|
| 状态管理 | Zustand | Pinia | Signals/RxJS | Svelte Stores |
| 数据获取 | TanStack Query | TanStack Query | RxJS | TanStack Query |
| 路由 | Next.js App Router | Vue Router | Angular Router | SvelteKit |
| 表单 | React Hook Form | VeeValidate | Reactive Forms | Superforms |
| 拖拽布局 | react-grid-layout | grid-layout-plus | angular-gridster2 | svelte-grid |
