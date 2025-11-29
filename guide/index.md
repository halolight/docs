# 简介

HaloLight 是一套多框架实现的企业级管理后台解决方案。

## 什么是 HaloLight

HaloLight 采用 “一套设计规范，多框架实现” 的理念，为开发者提供统一的 Admin Dashboard 体验。无论你使用 React、Vue、Angular 还是其他现代框架，都能获得一致的功能和设计。

## 核心特性

### 可拖拽仪表盘
基于 Grid Layout 的自定义 Dashboard 系统，支持：
- Widget 拖拽排列
- 响应式布局适配
- 布局状态持久化

### 权限控制
完整的 RBAC 权限管理系统：
- 细粒度权限控制 (页面级/按钮级)
- 通配符权限匹配 (`users:*`，`*`)
- 动态菜单渲染

### 主题系统
丰富的视觉定制能力：
- 11 种皮肤预设
- 明/暗模式切换
- View Transitions 动画效果

### 组件库
基于 shadcn/ui 设计系统：
- 30+ 精美 UI 组件
- 完整的表单/表格解决方案
- 高度可定制

## 框架实现

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

## 技术栈

所有框架版本共享以下技术栈：

- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS
- **shadcn/ui** - UI 组件库
- **TanStack Query** - 服务端状态管理
- **ECharts** - 图表可视化
- **Mock.js** - 数据模拟

## 下一步

- [快速开始](/guide/getting-started) - 选择一个框架版本开始
- [Next.js 版本](/guide/nextjs) - 详细了解 Next.js 实现
- [Vue 版本](/guide/vue) - 详细了解 Vue 实现
- [开发文档](/development/) - 了解共有设计规范
