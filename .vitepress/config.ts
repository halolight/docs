import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { AnnouncementPlugin } from 'vitepress-plugin-announcement'

export default defineConfig({
  title: 'HaloLight',
  description: 'HaloLight 多框架管理后台解决方案文档',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#5b8def' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'HaloLight' }],
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

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 HaloLight',
    },

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
})
