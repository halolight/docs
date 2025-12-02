import type { DefaultTheme } from 'vitepress'

// 指南侧边栏
const guideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '入门',
    collapsed: false,
    items: [
      { text: '简介', link: '/guide/' },
      { text: '快速开始', link: '/guide/getting-started' },
    ],
  },
  {
    text: '框架版本',
    collapsed: false,
    items: [
      { text: '🟦 Next.js', link: '/guide/nextjs' },
      { text: '💚 Vue', link: '/guide/vue' },
      { text: '🔺 Angular', link: '/guide/angular' },
      { text: '🌿 Nuxt', link: '/guide/nuxt' },
      { text: '🧡 SvelteKit', link: '/guide/sveltekit' },
      { text: '🪐 Astro', link: '/guide/astro' },
      { text: '💠 Solid.js', link: '/guide/solidjs' },
      { text: '⚡ Qwik', link: '/guide/qwik' },
      { text: '🎸 Remix', link: '/guide/remix' },
      { text: '🪶 Preact', link: '/guide/preact' },
      { text: '🔥 Lit', link: '/guide/lit' },
      { text: '🦖 Fresh (Deno)', link: '/guide/fresh' },
    ],
  },
  {
    text: '后端服务',
    collapsed: false,
    items: [
      { text: '🦕 Deno + Hono', link: '/guide/deno' },
      { text: '🐹 Go API', link: '/guide/api-go' },
      { text: '🟩 Node.js API', link: '/guide/api-node' },
      { text: '🛠️ 超级管理面板', link: '/guide/admin' },
    ],
  },
  {
    text: '部署方案',
    collapsed: false,
    items: [
      { text: '☁️ Cloudflare', link: '/guide/cloudflare' },
      { text: '▲ Vercel', link: '/guide/vercel' },
      { text: '🔷 Netlify', link: '/guide/netlify' },
      { text: '🐳 Docker', link: '/guide/docker' },
      { text: '🚂 Railway', link: '/guide/railway' },
      { text: '✈️ Fly.io', link: '/guide/fly' },
      { text: '☁️ Azure', link: '/guide/azure' },
      { text: '🟠 AWS', link: '/guide/aws' },
    ],
  },
]

// 开发文档侧边栏
const developmentSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '开发文档',
    collapsed: false,
    items: [
      { text: '概览', link: '/development/' },
      { text: '整体架构', link: '/development/architecture' },
      { text: '组件规范', link: '/development/components' },
      { text: '状态管理', link: '/development/state-management' },
      { text: 'API 设计', link: '/development/api-patterns' },
      { text: '认证系统', link: '/development/authentication' },
      { text: '仪表盘', link: '/development/dashboard' },
      { text: '主题系统', link: '/development/theming' },
      { text: '实现指南', link: '/development/implementation-guide' },
    ],
  },
]

// 侧边栏配置
export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': guideSidebar,
  '/development/': developmentSidebar,
}
