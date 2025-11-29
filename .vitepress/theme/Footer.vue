<script setup lang="ts">
</script>

<template>
  <div class="custom-footer">
    <div class="footer-content">
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
      </div>
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
    </div>
  </div>
</template>

<style scoped>
.custom-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px;
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
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.25s;
}

.footer-links a:hover {
  color: var(--vp-c-brand-1);
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
</style>
