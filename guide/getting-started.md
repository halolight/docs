# 快速开始

选择你熟悉的框架版本，快速启动 HaloLight。

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

## 下一步

- [Next.js 版本](/guide/nextjs) - 深入了解 Next.js 实现
- [Vue 版本](/guide/vue) - 深入了解 Vue 实现
- [开发文档](/development/) - 查看设计规范
