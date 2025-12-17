<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page, frontmatter, site } = useData()
const route = useRoute()

// 从文档中提取信息
const pageTitle = computed(() => {
  // 优先使用 frontmatter.title，否则从 page.title 获取
  return frontmatter.value.title || page.value.title || '文档'
})

const pageDescription = computed(() => {
  // 优先使用 frontmatter.description
  if (frontmatter.value.description) {
    return frontmatter.value.description
  }

  // 从页面内容中提取第一段文字（去除标题后的第一个段落）
  const content = page.value.content || ''
  const lines = content.split('\n')

  // 找到第一个非标题的段落
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('**') && trimmed.length > 20) {
      // 移除 markdown 语法
      return trimmed
        .replace(/\*\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .substring(0, 160)
    }
  }

  return site.value.description || '多框架全栈管理后台'
})

const pageKeywords = computed(() => {
  // 从路径和标题中提取关键词
  const path = route.path
  const keywords: string[] = []

  // 从路径提取
  if (path.includes('/guide/')) {
    keywords.push('教程', '指南', 'guide')
  }
  if (path.includes('/development/')) {
    keywords.push('开发', '架构', 'development', 'architecture')
  }
  if (path.includes('/api-')) {
    keywords.push('API', '后端', 'backend')
  }

  // 从标题提取框架名称
  const title = pageTitle.value.toLowerCase()
  const frameworks = ['next.js', 'vue', 'react', 'angular', 'nuxt', 'svelte', 'astro', 'solid', 'remix', 'qwik', 'preact', 'lit', 'fresh']
  frameworks.forEach(fw => {
    if (title.includes(fw)) {
      keywords.push(fw)
    }
  })

  const backends = ['nestjs', 'fastapi', 'spring boot', 'go', 'php', 'bun', 'deno']
  backends.forEach(be => {
    if (title.includes(be)) {
      keywords.push(be)
    }
  })

  // 通用关键词
  keywords.push('HaloLight', '管理后台', 'Admin Dashboard', 'TypeScript')

  return frontmatter.value.keywords || keywords.join(', ')
})

const fullTitle = computed(() => {
  const brandName = site.value.title || 'HaloLight'
  return `${pageTitle.value} - ${brandName}`
})

const ogImage = computed(() => {
  return frontmatter.value.ogImage ||
    `${site.value.base || ''}images/og-image.png`
})

const canonicalUrl = computed(() => {
  const base = site.value.themeConfig?.siteUrl || 'https://docs.halolight.h7ml.cn'
  return `${base}${route.path}`
})

const isZhCN = computed(() => {
  return !route.path.startsWith('/en/')
})
</script>

<template>
  <component :is="'head'">
    <!-- Basic Meta Tags -->
    <title>{{ fullTitle }}</title>
    <meta name="description" :content="pageDescription" />
    <meta name="keywords" :content="pageKeywords" />

    <!-- Language -->
    <meta name="language" :content="isZhCN ? 'zh-CN' : 'en-US'" />
    <html :lang="isZhCN ? 'zh-CN' : 'en'" />

    <!-- Canonical URL -->
    <link rel="canonical" :href="canonicalUrl" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" :content="canonicalUrl" />
    <meta property="og:title" :content="fullTitle" />
    <meta property="og:description" :content="pageDescription" />
    <meta property="og:image" :content="ogImage" />
    <meta property="og:site_name" content="HaloLight Documentation" />
    <meta property="og:locale" :content="isZhCN ? 'zh_CN' : 'en_US'" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" :content="canonicalUrl" />
    <meta name="twitter:title" :content="fullTitle" />
    <meta name="twitter:description" :content="pageDescription" />
    <meta name="twitter:image" :content="ogImage" />

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="author" content="HaloLight Team" />
    <meta name="generator" :content="`VitePress ${site?.value?.version || ''}`" />

    <!-- Mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="theme-color" content="#646cff" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </component>
</template>
