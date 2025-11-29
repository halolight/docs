<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <div class="giscus-container">
    <Giscus
      repo="halolight/docs"
      repo-id="R_kgDOOCOzJg"
      category="Announcements"
      category-id="DIC_kwDOOCOzJs4CmLGI"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'dark' : 'light'"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.giscus-container {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
