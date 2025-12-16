import type { DefaultTheme } from 'vitepress'

// 中文指南侧边栏
const zhGuideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '入门',
    collapsed: false,
    items: [
      { text: '📖 简介', link: '/guide/' },
      { text: '🚀 快速开始', link: '/guide/getting-started' },
      { text: '🔀 架构组合指南', link: '/guide/combinations' },
    ],
  },
  {
    text: '框架版本',
    collapsed: true,
    items: [
      { text: '🟦 Next.js', link: '/guide/nextjs' },
      { text: '⚛️ React', link: '/guide/react' },
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
    collapsed: true,
    items: [
      { text: '🦕 Deno + Hono', link: '/guide/deno' },
      { text: '🐹 Go API', link: '/guide/api-go' },
      { text: '🟩 Node.js API', link: '/guide/api-node' },
      { text: '🏗️ NestJS API', link: '/guide/api-nestjs' },
      { text: '🐍 Python FastAPI', link: '/guide/api-python' },
      { text: '☕ Java Spring Boot', link: '/guide/api-java' },
      { text: '🍞 Bun + Hono', link: '/guide/api-bun' },
      { text: '🐘 PHP Laravel', link: '/guide/api-php' },
      { text: '🔗 tRPC BFF', link: '/guide/bff' },
      { text: '🛠️ 超级管理面板', link: '/guide/admin' },
    ],
  },
  {
    text: '扩展功能',
    collapsed: true,
    items: [
      { text: '🤖 AI 智能助理', link: '/guide/ai' },
      { text: '🎨 Web Components', link: '/guide/ui' },
      { text: '🔗 Web3 钱包集成', link: '/guide/web3' },
      { text: '⏰ 签到定时任务', link: '/guide/action' },
    ],
  },
  {
    text: '部署方案',
    collapsed: true,
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

// 中文开发文档侧边栏
const zhDevelopmentSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '开发文档',
    collapsed: false,
    items: [
      { text: '📋 概览', link: '/development/' },
      { text: '🌐 生态系统', link: '/development/ecosystem' },
      { text: '🏗️ 整体架构', link: '/development/architecture' },
      { text: '🧩 组件规范', link: '/development/components' },
      { text: '📦 状态管理', link: '/development/state-management' },
      { text: '🔌 API 设计', link: '/development/api-patterns' },
      { text: '🔐 认证系统', link: '/development/authentication' },
      { text: '📊 仪表盘', link: '/development/dashboard' },
      { text: '🎨 主题系统', link: '/development/theming' },
      { text: '📚 实现指南', link: '/development/implementation-guide' },
    ],
  },
]

// 英文指南侧边栏
const enGuideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: '📖 Introduction', link: '/en/guide/' },
      { text: '🚀 Quick Start', link: '/en/guide/getting-started' },
      { text: '🔀 Architecture Combinations', link: '/en/guide/combinations' },
    ],
  },
  {
    text: 'Framework Versions',
    collapsed: true,
    items: [
      { text: '🟦 Next.js', link: '/en/guide/nextjs' },
      { text: '⚛️ React', link: '/en/guide/react' },
      { text: '💚 Vue', link: '/en/guide/vue' },
      { text: '🔺 Angular', link: '/en/guide/angular' },
      { text: '🌿 Nuxt', link: '/en/guide/nuxt' },
      { text: '🧡 SvelteKit', link: '/en/guide/sveltekit' },
      { text: '🪐 Astro', link: '/en/guide/astro' },
      { text: '💠 Solid.js', link: '/en/guide/solidjs' },
      { text: '⚡ Qwik', link: '/en/guide/qwik' },
      { text: '🎸 Remix', link: '/en/guide/remix' },
      { text: '🪶 Preact', link: '/en/guide/preact' },
      { text: '🔥 Lit', link: '/en/guide/lit' },
      { text: '🦖 Fresh (Deno)', link: '/en/guide/fresh' },
    ],
  },
  {
    text: 'Backend Services',
    collapsed: true,
    items: [
      { text: '🦕 Deno + Hono', link: '/en/guide/deno' },
      { text: '🐹 Go API', link: '/en/guide/api-go' },
      { text: '🟩 Node.js API', link: '/en/guide/api-node' },
      { text: '🏗️ NestJS API', link: '/en/guide/api-nestjs' },
      { text: '🐍 Python FastAPI', link: '/en/guide/api-python' },
      { text: '☕ Java Spring Boot', link: '/en/guide/api-java' },
      { text: '🍞 Bun + Hono', link: '/en/guide/api-bun' },
      { text: '🐘 PHP Laravel', link: '/en/guide/api-php' },
      { text: '🔗 tRPC BFF', link: '/en/guide/bff' },
      { text: '🛠️ Admin Panel', link: '/en/guide/admin' },
    ],
  },
  {
    text: 'Extensions',
    collapsed: true,
    items: [
      { text: '🤖 AI Assistant', link: '/en/guide/ai' },
      { text: '🎨 Web Components', link: '/en/guide/ui' },
      { text: '🔗 Web3 Integration', link: '/en/guide/web3' },
      { text: '⏰ Check-in Scheduler', link: '/en/guide/action' },
    ],
  },
  {
    text: 'Deployment',
    collapsed: true,
    items: [
      { text: '☁️ Cloudflare', link: '/en/guide/cloudflare' },
      { text: '▲ Vercel', link: '/en/guide/vercel' },
      { text: '🔷 Netlify', link: '/en/guide/netlify' },
      { text: '🐳 Docker', link: '/en/guide/docker' },
      { text: '🚂 Railway', link: '/en/guide/railway' },
      { text: '✈️ Fly.io', link: '/en/guide/fly' },
      { text: '☁️ Azure', link: '/en/guide/azure' },
      { text: '🟠 AWS', link: '/en/guide/aws' },
    ],
  },
]

// 英文开发文档侧边栏
const enDevelopmentSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Development',
    collapsed: false,
    items: [
      { text: '📋 Overview', link: '/en/development/' },
      { text: '🌐 Ecosystem', link: '/development/ecosystem' },
      { text: '🏗️ Architecture', link: '/en/development/architecture' },
      { text: '🧩 Components', link: '/en/development/components' },
      { text: '📦 State Management', link: '/en/development/state-management' },
      { text: '🔌 API Patterns', link: '/en/development/api-patterns' },
      { text: '🔐 Authentication', link: '/en/development/authentication' },
      { text: '📊 Dashboard', link: '/en/development/dashboard' },
      { text: '🎨 Theming', link: '/en/development/theming' },
      { text: '📚 Implementation Guide', link: '/en/development/implementation-guide' },
    ],
  },
]

// 中文侧边栏配置
export const zhSidebar: DefaultTheme.Sidebar = {
  '/guide/': zhGuideSidebar,
  '/development/': zhDevelopmentSidebar,
}

// 英文侧边栏配置
export const enSidebar: DefaultTheme.Sidebar = {
  '/en/guide/': enGuideSidebar,
  '/en/development/': enDevelopmentSidebar,
}
