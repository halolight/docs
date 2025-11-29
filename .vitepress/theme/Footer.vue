<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="custom-footer">
    <div class="footer-content">
      <!-- 主要链接 -->
      <div class="footer-links">
        <a
          href="https://github.com/halolight"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span class="divider">|</span>
        <a
          href="https://halolight.h7ml.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js Demo
        </a>
        <span class="divider">|</span>
        <a
          href="https://halolight-vue.h7ml.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vue Demo
        </a>
        <span class="divider">|</span>
        <a href="/sitemap.xml" target="_blank">
          Sitemap
        </a>
        <span class="divider">|</span>
        <a href="/feed.xml" target="_blank">
          <svg class="rss-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
          RSS
        </a>
      </div>

      <!-- 统计徽章 -->
      <div class="footer-stats">
        <a
          target="_blank"
          title="51la网站统计"
          href="https://v6.51.la/land/L1NaKSoU1jvMh9mE"
        >
          <img
            src="https://sdk.51.la/icon/1-1.png"
            alt="51la网站统计"
            class="stats-badge"
          />
        </a>
      </div>

      <!-- 版权和作者信息 -->
      <div class="footer-copyright">
        <p>
          Released under the
          <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
            MIT License
          </a>
        </p>
        <p>
          Copyright © {{ currentYear }}
          <a href="https://github.com/h7ml" target="_blank" rel="noopener noreferrer">
            h7ml
          </a>
          &amp;
          <a href="https://github.com/halolight" target="_blank" rel="noopener noreferrer">
            HaloLight
          </a>
        </p>
        <p class="author-email">
          <a href="mailto:h7ml@qq.com">h7ml@qq.com</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px 16px;
  text-align: center;
  background: var(--vp-c-bg);
}

.footer-content {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.25s;
}

.footer-links a:hover {
  color: var(--vp-c-brand-1);
}

.rss-icon {
  width: 14px;
  height: 14px;
}

.divider {
  color: var(--vp-c-divider);
}

.footer-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stats-badge {
  height: 20px;
  opacity: 0.8;
  transition: opacity 0.25s;
}

.stats-badge:hover {
  opacity: 1;
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.footer-copyright a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.25s;
}

.footer-copyright a:hover {
  color: var(--vp-c-brand-1);
}

.author-email {
  font-size: 12px;
}

.author-email a {
  color: var(--vp-c-text-3);
}

.author-email a:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .footer-links {
    gap: 6px;
  }

  .footer-links a {
    font-size: 13px;
  }
}
</style>
