---
layout: home
hero:
  name: HaloLight
  text: 全栈分离管理后台
  tagline: 前后端完全解耦 · 11 个前端 × 8 个后端 = 88 种组合 · 企业级 Admin Dashboard
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 架构说明
      link: /development/architecture
    - theme: alt
      text: GitHub
      link: https://github.com/halolight
features:
  - icon: 🔀
    title: 前后端可组合
    details: 11 个前端框架 × 8 个后端 API，任意搭配共 88 种组合，技术选型不锁定
  - icon: 📊
    title: 可拖拽仪表盘
    details: 基于 Grid Layout 的自定义 Dashboard，支持拖拽、缩放、持久化
  - icon: 🔐
    title: 权限控制
    details: RBAC 权限管理，支持通配符匹配，细粒度页面/按钮级控制
  - icon: 🎭
    title: 主题系统
    details: 11 种皮肤预设 + 明暗模式，支持 View Transitions 动画切换
  - icon: 🧩
    title: shadcn/ui 组件
    details: 基于 shadcn/ui 设计系统，30+ 精美组件开箱即用
  - icon: 🔧
    title: 开发友好
    details: TypeScript 类型安全，Mock.js 数据模拟，完善的开发文档
---

## 🏗️ 架构说明

### 前后端完全分离

- **独立仓库、独立部署**：前端走 CDN/边缘节点，后端独立弹性扩缩容
- **接口契约对齐**：通过 OpenAPI / tRPC / GraphQL Schema 保证前后端协同
- **技术演进不锁定**：更换任意前端或后端实现时，遵守契约即可无痛切换

### 88 种组合可能

**11 个前端框架**：
Next.js · Nuxt · Vue · Angular · SvelteKit · Astro · Solid.js · Qwik · Remix · Preact · Lit

**8 个后端 API**：
NestJS · Node.js (Express) · Python (FastAPI) · Java (Spring Boot) · Go (Fiber) · PHP (Laravel) · Bun + Hono · tRPC BFF

**任意组合 = 11 × 8 = 88 种搭配方案**

### 常见组合示例

| 组合 | 适用场景 | 优势 |
|------|----------|------|
| **Next.js + NestJS** | 多租户 SaaS、企业管理后台 | SSR + TS 统一栈，代码共享 |
| **Vue + FastAPI** | 中小团队快速交付 | 轻量上手、Python 数据生态 |
| **Angular + Spring Boot** | 大型企业、长周期项目 | 强类型、成熟中间件生态 |
| **SvelteKit + Go Fiber** | 高性能实时应用 | 极致性能与低资源占用 |
| **任意前端 + tRPC BFF** | 移动/桌面多端 | 类型共享、聚合与降噪 |

### 解耦优势

- ✅ **团队并行交付**：前后端团队独立开发、独立部署
- ✅ **按需扩展**：前端静态化/SSR，后端微服务化或 Serverless
- ✅ **技术升级灵活**：替换任一侧不影响另一侧
- ✅ **多团队协作**：不同技术栈团队可共享同一套 API
