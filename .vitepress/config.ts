import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { AnnouncementPlugin } from 'vitepress-plugin-announcement'
import { withPwa } from '@vite-pwa/vitepress'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'

const SITE_URL = 'https://halolight.docs.h7ml.cn'
const SITE_TITLE = 'HaloLight'
const SITE_DESCRIPTION = 'HaloLight 多框架管理后台解决方案文档 - 一套设计规范，多框架实现的企业级 Admin Dashboard，支持 Next.js、Vue、Angular 等 12 种框架'
const SITE_KEYWORDS = 'HaloLight,Admin,Dashboard,管理后台,Next.js,Vue,React,Angular,TypeScript,Tailwind CSS,shadcn/ui,企业级,多框架'

// 通过环境变量设置 base，默认为 '/'，GitHub Pages 部署时设置为 '/halolight/'
const BASE_URL = process.env.VITEPRESS_BASE || '/'

// RSS 配置
const rssOptions: RSSOptions = {
  title: SITE_TITLE,
  baseUrl: SITE_URL,
  copyright: `Copyright © ${new Date().getFullYear()} h7ml & HaloLight`,
  description: SITE_DESCRIPTION,
  language: 'zh-CN',
  author: {
    name: 'h7ml',
    email: 'h7ml@qq.com',
    link: 'https://github.com/h7ml',
  },
  icon: true,
  filename: 'feed.xml',
}

export default withPwa(defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  lang: 'zh-CN',
  base: BASE_URL,
  lastUpdated: true,
  ignoreDeadLinks: true,
  cleanUrls: true,

  // Sitemap 配置
  sitemap: {
    hostname: SITE_URL,
    lastmodDateOnly: false,
  },

  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],

    // SEO Meta Tags
    ['meta', { name: 'keywords', content: SITE_KEYWORDS }],
    ['meta', { name: 'author', content: 'HaloLight Team' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:title', content: SITE_TITLE }],
    ['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/og-image.png` }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: SITE_TITLE }],
    ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }],

    // Theme Color
    ['meta', { name: 'theme-color', content: '#5b8def' }],
    ['meta', { name: 'msapplication-TileColor', content: '#5b8def' }],

    // PWA
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: SITE_TITLE }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],

    // RSS
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'HaloLight RSS Feed', href: '/feed.xml' }],

    // Canonical
    ['link', { rel: 'canonical', href: SITE_URL }],

    // 51.la 统计
    ['script', { charset: 'UTF-8', id: 'LA_COLLECT', src: '//sdk.51.la/js-sdk-pro.min.js?id=L1NaKSoU1jvMh9mE&ck=L1NaKSoU1jvMh9mE&autoTrack=true&hashMode=true&screenRecord=true' }],

    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XMS590XWNN' }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-XMS590XWNN');`],
  ],

  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(tabsMarkdownPlugin)
      md.use(groupIconMdPlugin)
    },
  },

  vite: {
    plugins: [
      groupIconVitePlugin(),
      RssPlugin(rssOptions),
      pagefindPlugin({
        btnPlaceholder: '搜索文档',
        placeholder: '搜索文档',
        emptyText: '没有找到相关结果',
        heading: '共找到 {{searchResult}} 条结果',
        customSearchQuery(input: string) {
          return input
            .replace(/[\u4E00-\u9FA5]/g, ' $& ')
            .replace(/\s+/g, ' ')
            .trim()
        },
      }),
      AnnouncementPlugin({
        title: '欢迎',
        body: [
          { type: 'text', content: 'HaloLight 多框架管理后台文档已上线!' },
          {
            type: 'text',
            content: 'Next.js 和 Vue 版本已完成开发，欢迎体验。',
          },
        ],
        footer: [
          {
            type: 'button',
            content: '在线预览',
            link: 'https://halolight.h7ml.cn/',
          },
          {
            type: 'button',
            content: 'GitHub',
            link: 'https://github.com/halolight',
            props: {
              type: 'default',
            },
          },
        ],
        duration: -1,
        mobileMinify: true,
      }),
    ],
  },

  // PWA 配置
  pwa: {
    mode: 'production',
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'logo.svg', 'apple-touch-icon.png'],
    manifest: {
      name: 'HaloLight Docs',
      short_name: 'HaloLight',
      description: SITE_DESCRIPTION,
      theme_color: '#5b8def',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      // 排除 HTML 文件，避免缓存导致部署后不更新
      globPatterns: ['**/*.{css,js,svg,png,ico,txt,woff2}'],
      // HTML 使用 NetworkFirst 策略，优先获取最新版本
      navigateFallback: undefined,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '开发', link: '/development/' },
      {
        text: '预览',
        items: [
          { text: 'Next.js 版本', link: 'https://halolight.h7ml.cn/' },
          { text: 'Vue 版本', link: 'https://halolight-vue.h7ml.cn/' },
          { text: 'Angular 版本', link: 'https://halolight-angular.h7ml.cn/' },
          { text: 'Nuxt 版本', link: 'https://halolight-nuxt.h7ml.cn/' },
          { text: 'SvelteKit 版本', link: 'https://halolight-svelte.h7ml.cn/' },
          { text: 'Astro 版本', link: 'https://halolight-astro.h7ml.cn/' },
          { text: 'Solid.js 版本', link: 'https://halolight-solidjs.h7ml.cn/' },
          { text: 'Qwik 版本', link: 'https://halolight-qwik.h7ml.cn/' },
          { text: 'Remix 版本', link: 'https://halolight-remix.h7ml.cn/' },
          { text: 'Preact 版本', link: 'https://halolight-preact.h7ml.cn/' },
          { text: 'Lit 版本', link: 'https://halolight-lit.h7ml.cn/' },
          { text: 'Fresh (Deno) 版本', link: 'https://halolight-fresh.h7ml.cn/' },
          { text: 'Cloudflare 版本', link: 'https://halolight-cloudflare.h7ml.cn/' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
        {
          text: '框架版本',
          items: [
            { text: 'Next.js 版本', link: '/guide/nextjs' },
            { text: 'Vue 版本', link: '/guide/vue' },
            { text: 'Angular 版本', link: '/guide/angular' },
            { text: 'Nuxt 版本', link: '/guide/nuxt' },
            { text: 'SvelteKit 版本', link: '/guide/sveltekit' },
            { text: 'Astro 版本', link: '/guide/astro' },
            { text: 'Solid.js 版本', link: '/guide/solidjs' },
            { text: 'Qwik 版本', link: '/guide/qwik' },
            { text: 'Remix 版本', link: '/guide/remix' },
            { text: 'Preact 版本', link: '/guide/preact' },
            { text: 'Lit 版本', link: '/guide/lit' },
            { text: 'Fresh (Deno) 版本', link: '/guide/fresh' },
          ],
        },
        {
          text: '部署方案',
          items: [
            { text: 'Cloudflare 版本', link: '/guide/cloudflare' },
          ],
        },
      ],
      '/development/': [
        {
          text: '开发文档',
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
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/halolight' },
    ],

    // 使用自定义 Footer.vue 组件，不需要默认 footer

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    editLink: {
      pattern: 'https://github.com/halolight/docs/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
}))
