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

### 前后端任意组合
- **88 种组合方案**：11 个前端框架 × 8 个后端 API，根据团队技术栈或业务场景自由选择
- **BFF/网关解耦**：可选 tRPC、GraphQL Gateway 做聚合、鉴权与降噪
- **升级不锁栈**：更换任意前端或后端实现时，遵守接口契约即可无痛切换
- **独立演进**：前端可选 SSR/SSG/SPA，后端可选单体/微服务/Serverless

## 框架实现

全部框架版本均已实现并部署 (预览地址见各自仓库 README)。当前作为规范基准的参考实现：

- Next.js 14：[预览](https://halolight.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight)
- Vue 3.5：[预览](https://halolight-vue.h7ml.cn/) · [GitHub](https://github.com/halolight/halolight-vue)

| 框架 | 状态 | 预览 | 仓库 |
|------|------|------|------|
| Next.js 14 | ✅ 已部署 | [预览](https://halolight.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight) |
| Vue 3.5 | ✅ 已部署 | [预览](https://halolight-vue.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-vue) |
| Angular 21 | ✅ 已部署 | [预览](https://halolight-angular.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-angular) |
| Nuxt 4 | ✅ 已部署 | [预览](https://halolight-nuxt.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-nuxt) |
| SvelteKit 2 | ✅ 已部署 | [预览](https://halolight-svelte.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-svelte) |
| Astro 5 | ✅ 已部署 | [预览](https://halolight-astro.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-astro) |
| Solid.js | ✅ 已部署 | [预览](https://halolight-solid.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-solid) |
| Qwik | ✅ 已部署 | [预览](https://halolight-qwik.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-qwik) |
| Remix | ✅ 已部署 | [预览](https://halolight-remix.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-remix) |
| Preact | ✅ 已部署 | [预览](https://halolight-preact.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-preact) |
| Lit | ✅ 已部署 | [预览](https://halolight-lit.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-lit) |
| Fresh (Deno) | ✅ 已部署 | [预览](https://halolight-fresh.h7ml.cn/) | [GitHub](https://github.com/halolight/halolight-fresh) |

> 💡 **灵活组合**：前端主线支持 11 个框架，任意前端均可与 8 个后端 API 组合，形成 88+ 种搭配方案。

## 后端 API 实现

| 后端技术 | 状态 | 预览 | 仓库 |
|----------|------|------|------|
| NestJS 11 | ✅ 已部署 | [API Docs](http://halolight-api-nestjs.h7ml.cn/docs) | [GitHub](https://github.com/halolight/halolight-api-nestjs) |
| Python FastAPI | ✅ 已部署 | [API Docs](http://halolight-api-python.h7ml.cn/docs) | [GitHub](https://github.com/halolight/halolight-api-python) |
| Java Spring Boot | ✅ 已部署 | [API Docs](http://halolight-api-java.h7ml.cn/swagger-ui.html) | [GitHub](https://github.com/halolight/halolight-api-java) |
| Go Fiber | ✅ 已部署 | [API Docs](http://halolight-api-go.h7ml.cn/swagger) | [GitHub](https://github.com/halolight/halolight-api-go) |
| Node.js Express | ✅ 已部署 | - | [GitHub](https://github.com/halolight/halolight-api-node) |
| PHP Laravel | ✅ 已部署 | - | [GitHub](https://github.com/halolight/halolight-api-php) |
| Bun + Hono | ✅ 已部署 | - | [GitHub](https://github.com/halolight/halolight-api-bun) |
| tRPC BFF | ✅ 已部署 | - | [GitHub](https://github.com/halolight/halolight-bff) |

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
