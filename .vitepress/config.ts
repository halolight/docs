import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { withPwa } from '@vite-pwa/vitepress'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'

// Configuration modules
import { zhNav, enNav } from './nav'
import { zhSidebar, enSidebar } from './sidebar'
import { head, zhHead, enHead, SITE_URL, SITE_TITLE, SITE_CONTENT } from './head'
import { pwaOptions } from './pwa'

// Base URL from env, defaults to '/', set to '/halolight/' for GitHub Pages
const BASE_URL = process.env.VITEPRESS_BASE || '/'

// RSS Configuration
const rssOptions: RSSOptions = {
  title: SITE_TITLE,
  baseUrl: SITE_URL,
  copyright: `Copyright © ${new Date().getFullYear()} h7ml & HaloLight`,
  description: SITE_CONTENT.zh.description,
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
  description: SITE_CONTENT.zh.description,
  base: BASE_URL,
  lastUpdated: true,
  ignoreDeadLinks: true,
  cleanUrls: true,

  // i18n Configuration
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: SITE_TITLE,
      description: SITE_CONTENT.zh.description,
      head: zhHead,
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
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
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'HaloLight',
      description: SITE_CONTENT.en.description,
      head: enHead,
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        outline: {
          label: 'On this page',
          level: [2, 3],
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'short',
          },
        },
        editLink: {
          pattern: 'https://github.com/halolight/docs/edit/main/:path',
          text: 'Edit this page on GitHub',
        },
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
      },
    },
  },

  // Sitemap Configuration
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
    ],
  },

  // PWA Configuration
  pwa: pwaOptions,

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/halolight' },
    ],
  },
}))
