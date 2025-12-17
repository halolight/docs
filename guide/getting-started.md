# 快速开始

选择你熟悉的前端框架，并按需搭配后端 API，快速启动 HaloLight。

## 🎯 选择组合方案

HaloLight 采用**前后端完全分离架构**，支持 **12 个前端 × 8 个后端 = 96 种组合**。

### 第一步：选择前端框架 (12 选 1)

| 框架 | 适用场景 | 特点 |
|------|----------|------|
| **Next.js / Nuxt** | 多租户 SaaS、SEO 需求 | SSR + 边缘渲染友好 |
| **Vue** | 中小团队快速交付 | 轻量高效、学习曲线平滑 |
| **Angular** | 大中型、长周期项目 | 强类型、架构清晰 |
| **SvelteKit / Solid / Qwik** | 高交互、实时场景 | 极致性能与响应式体验 |
| **Remix / Preact / Lit** | 渐进增强、轻量化 | Web Components、小体积 |
| **Astro** | 内容为主的管理后台 | Islands 架构、零 JS 默认 |

### 第二步：选择后端 API (8 选 1)

| 后端技术 | 适用场景 | 特点 |
|----------|----------|------|
| **NestJS / Express** | Node 生态团队 | 与前端 TS 契合度高 |
| **FastAPI** | 数据/AI 驱动应用 | Python 生态、快速迭代 |
| **Spring Boot** | 企业级、金融行业 | 成熟中间件生态 |
| **Go Fiber** | 高性能、高并发 | 低资源占用 |
| **PHP Laravel** | 传统 Web 团队 | 生态完善、上手快 |
| **Bun + Hono** | 极致性能追求 | 新一代运行时 |
| **tRPC BFF** | 移动/桌面多端 | 类型共享、聚合与降噪 |

### 第三步：推荐组合 (按场景)

<details>
<summary><b>📊 多租户 SaaS / 企业管理后台</b></summary>

**推荐组合**：Next.js + NestJS

**优势**：
- SSR + TypeScript 端到端统一
- 代码共享 (类型、工具函数)
- 成熟的部署生态 (Vercel + Railway/Fly.io)

</details>

<details>
<summary><b>🤖 数据密集 / AI 驱动应用</b></summary>

**推荐组合**：Vue + FastAPI 或 React + FastAPI

**优势**：
- Python 数据科学生态 (Pandas、NumPy、scikit-learn)
- 快速 API 开发 (自动文档、依赖注入)
- 前端轻量、易于集成图表库

</details>

<details>
<summary><b>🏢 大型企业 / 长周期项目</b></summary>

**推荐组合**：Angular + Spring Boot

**优势**：
- 强类型、模块化架构清晰
- 成熟的企业中间件 (认证、缓存、消息队列)
- 长期支持与稳定性

</details>

<details>
<summary><b>⚡ 高性能实时应用</b></summary>

**推荐组合**：SvelteKit + Go Fiber

**优势**：
- 前端编译优化、极小体积
- 后端高吞吐、低延迟
- 资源占用少，成本优化

</details>

<details>
<summary><b>📱 移动/桌面多端统一</b></summary>

**推荐组合**：任意前端 + tRPC BFF + 任意后端

**优势**：
- BFF 聚合裁剪接口适配多端
- TypeScript 端到端类型安全
- 降低前端复杂度

</details>

---

## 环境要求

- Node.js 18.17 或更高版本
- pnpm 8+ (推荐) / npm / yarn

## Next.js 版本

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight.git
cd halolight

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看效果。

详细文档：[Next.js 版本指南](/guide/nextjs)

## Vue 版本

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-vue.git
cd halolight-vue

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:5173 查看效果。

详细文档：[Vue 版本指南](/guide/vue)

## 默认账号

所有版本使用相同的 Mock 账号：

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |

## 目录结构

```
项目根目录/
├── src/
│   ├── app/              # 页面路由
│   ├── components/       # 组件
│   │   ├── ui/          # shadcn/ui 组件
│   │   ├── layout/      # 布局组件
│   │   └── dashboard/   # 仪表盘组件
│   ├── hooks/           # 自定义 hooks
│   ├── stores/          # 状态管理
│   ├── services/        # API 服务
│   ├── lib/             # 工具库
│   ├── types/           # 类型定义
│   └── mocks/           # Mock 数据
├── public/              # 静态资源
└── package.json
```

## 🚀 快速示例

### 方案 1：Next.js + NestJS

```bash
# 终端 1：启动前端
git clone https://github.com/halolight/halolight.git && cd halolight
pnpm install && pnpm dev
```

```bash
# 终端 2：启动后端
git clone https://github.com/halolight/halolight-api-nestjs.git && cd halolight-api-nestjs
pnpm install && pnpm dev
```

### 方案 2：Vue + FastAPI

```bash
# 终端 1：启动前端
git clone https://github.com/halolight/halolight-vue.git && cd halolight-vue
pnpm install && pnpm dev
```

```bash
# 终端 2：启动后端
git clone https://github.com/halolight/halolight-api-python.git && cd halolight-api-python
pip install -e ".[dev]" && uvicorn app.main:app --reload
```

---

## 下一步

- [Next.js 版本](/guide/nextjs) - 深入了解 Next.js 实现
- [Vue 版本](/guide/vue) - 深入了解 Vue 实现
- [NestJS API](/guide/api-nestjs) - NestJS 后端开发指南
- [Python API](/guide/api-python) - FastAPI 后端开发指南
- [架构组合矩阵](/guide/combinations) - 查看所有 96 种组合
- [开发文档](/development/) - 查看设计规范与接口契约
