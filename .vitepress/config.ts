import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { AnnouncementPlugin } from 'vitepress-plugin-announcement'
import { withPwa } from '@vite-pwa/vitepress'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'

// 拆分的配置模块
import { nav } from './nav'
import { sidebar } from './sidebar'
import { head, SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from './head'
import { pwaOptions } from './pwa'

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

  head,

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
          { type: 'text', content: '支持 12+ 框架版本，欢迎体验。' },
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
            props: { type: 'default' },
          },
        ],
        duration: -1,
        mobileMinify: true,
      }),
    ],
  },

  // PWA 配置
  pwa: pwaOptions,

  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/halolight' },
    ],

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
