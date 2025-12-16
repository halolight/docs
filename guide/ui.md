# Web Components 组件库

HaloLight UI 是基于 Stencil 的跨框架 Web Components 组件库，内置 Tailwind 主题与 OKLch 配色系统。

**GitHub**：[https://github.com/halolight/halolight-ui](https://github.com/halolight/halolight-ui)

**npm**：`@halolight/ui`

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Stencil | 4.22.x | Web Components 编译器 |
| TypeScript | 5.x | 类型系统 |
| Tailwind CSS | 4.0 | 工具类 CSS（开发时） |
| Jest | 29.x | 单元测试 |
| Puppeteer | 23.x | E2E 测试 |

## 核心特性

- **跨框架兼容**：基于 Web Components 标准，可在 React、Vue、Angular、Svelte 等任何框架中使用
- **OKLch 色彩空间**：使用感知均匀的 OKLch 色彩空间实现主题系统
- **Shadow DOM 封装**：完全样式隔离，避免样式冲突
- **TypeScript**：完整的类型定义支持
- **无障碍性**：遵循 WCAG 2.1 AA 标准
- **轻量级**：按需加载，Tree-shakeable

## 组件列表

| 组件 | 标签 | 说明 |
|------|------|------|
| Button | `<hl-button>` | 按钮组件，支持多种变体和尺寸 |
| Input | `<hl-input>` | 输入框，支持验证和错误状态 |
| Select | `<hl-select>` | 下拉选择器 |
| Modal | `<hl-modal>` | 弹窗对话框 |
| Card | `<hl-card>` | 卡片容器 |
| Table | `<hl-table>` | 数据表格，支持排序和选择 |
| Form | `<hl-form>` | 表单容器，支持验证 |

## 目录结构

```
halolight-ui/
├── src/
│   ├── components/                # 组件源码
│   │   ├── hl-button/            # 按钮组件
│   │   │   ├── hl-button.tsx     # 组件逻辑
│   │   │   ├── hl-button.css     # 组件样式
│   │   │   ├── readme.md         # 组件文档
│   │   │   └── test/             # 组件测试
│   │   ├── hl-input/             # 输入框
│   │   ├── hl-select/            # 选择器
│   │   ├── hl-modal/             # 弹窗
│   │   ├── hl-table/             # 表格
│   │   ├── hl-card/              # 卡片
│   │   └── hl-form/              # 表单
│   ├── global/                   # 全局样式
│   │   └── global.css            # OKLch 主题变量
│   ├── utils/                    # 工具函数
│   ├── themes/                   # 主题配置
│   ├── components.d.ts           # 自动生成的类型定义
│   └── index.ts                  # 导出入口
├── dist/                         # 构建产物
├── loader/                       # 运行时加载器
├── www/                          # 开发预览站点
├── stencil.config.ts             # Stencil 配置
├── tailwind.config.js            # Tailwind 配置
├── tsconfig.json
└── package.json
```

## 快速开始

### 安装

```bash
npm install @halolight/ui
# 或
pnpm add @halolight/ui
```

### 定义自定义元素

任意框架均需一次性调用：

```typescript
import { defineCustomElements } from '@halolight/ui/loader';
defineCustomElements();
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { defineCustomElements } from 'https://unpkg.com/@halolight/ui/loader/index.js';
    defineCustomElements();
  </script>
</head>
<body>
  <hl-button variant="primary">Click Me</hl-button>
</body>
</html>
```

### React

```tsx
import { defineCustomElements } from '@halolight/ui/loader';

// 在应用入口调用一次
defineCustomElements();

function App() {
  return (
    <div>
      <hl-button variant="primary">Click Me</hl-button>
    </div>
  );
}
```

**TypeScript 类型支持**：

```tsx
// vite-env.d.ts
/// <reference types="@halolight/ui/dist/types/components" />

import { JSX as HaloLightJSX } from '@halolight/ui/dist/types/components';

declare global {
  namespace JSX {
    interface IntrinsicElements extends HaloLightJSX.IntrinsicElements {}
  }
}
```

### Vue 3

```vue
<template>
  <hl-button variant="primary" @hl-click="handleClick">
    Click Me
  </hl-button>
</template>

<script setup lang="ts">
import { defineCustomElements } from '@halolight/ui/loader';

defineCustomElements();

const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { defineCustomElements } from '@halolight/ui/loader';

defineCustomElements();

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<hl-button variant="primary" (hlClick)="handleClick()">
  Click Me
</hl-button>
```

## 组件 API

### hl-button

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | 按钮变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按钮尺寸 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载状态 |

**事件**：`hlClick`

### hl-input

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'text' \| 'password' \| 'email' \| 'number'` | `'text'` | 输入类型 |
| `placeholder` | `string` | `''` | 占位文本 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `error` | `string` | `''` | 错误信息 |

**事件**：`hlChange`、`hlInput`、`hlFocus`、`hlBlur`

## 主题定制

### 暗色模式

在父级元素添加 `dark` 类启用暗色主题：

```html
<div class="dark">
  <hl-button variant="primary">Dark Mode Button</hl-button>
</div>
```

```javascript
// 动态切换
document.body.classList.toggle('dark');
```

### CSS 变量覆盖

使用 OKLch 色彩空间定义主题变量：

```css
:root {
  /* 主色 - 使用 OKLch */
  --hl-color-primary: oklch(0.65 0.15 250);
  --hl-color-primary-hover: oklch(0.55 0.18 250);
  --hl-color-primary-light: oklch(0.75 0.12 250);

  /* 语义色 */
  --hl-color-success: oklch(0.7 0.18 145);
  --hl-color-danger: oklch(0.63 0.26 25);
  --hl-color-warning: oklch(0.78 0.16 75);
  --hl-color-info: oklch(0.73 0.15 195);

  /* 中性色 */
  --hl-bg-base: oklch(1 0 0);
  --hl-text-primary: oklch(0.2 0 0);
  --hl-border-color: oklch(0.9 0 0);

  /* 圆角和间距 */
  --hl-border-radius: 0.5rem;
  --hl-spacing-md: 1rem;
}

/* 暗色模式 */
.dark {
  --hl-color-primary: oklch(0.7 0.15 250);
  --hl-bg-base: oklch(0.15 0 0);
  --hl-text-primary: oklch(0.98 0 0);
}
```

### OKLch 色彩空间说明

OKLch 是基于人类视觉感知的色彩空间：

- **L (Lightness)**：0 (黑) ~ 1 (白)
- **C (Chroma)**：0 (灰) ~ 0.4 (鲜艳)
- **H (Hue)**：0° ~ 360° (色相环)

```css
/* oklch(明度 色度 色相 / 透明度) */
oklch(0.65 0.15 250)        /* 蓝色 */
oklch(0.7 0.18 145)         /* 绿色 */
oklch(0.63 0.26 25 / 0.8)   /* 半透明红色 */
```

## 开发指南

### 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 生产构建
npm run build

# 运行测试
npm test

# 生成新组件
npm run generate
```

### 创建新组件

1. 使用 Stencil CLI 生成骨架：

```bash
npm run generate
# 输入组件名称（不含 hl- 前缀）
```

2. 实现组件逻辑：

```tsx
import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'hl-example',
  styleUrl: 'hl-example.css',
  shadow: true,
})
export class HlExample {
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Event() hlChange: EventEmitter<string>;

  render() {
    return (
      <Host>
        <div class={`hl-example hl-example--${this.size}`}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
```

### 命名约定

- **组件标签**：`hl-{component-name}`
- **CSS 类名**：BEM 风格 `.hl-button--primary`
- **事件名**：`hl{EventName}` (小驼峰)

## 浏览器兼容性

OKLch 色彩空间支持：

- Chrome 111+
- Safari 15.4+
- Firefox 113+

对于旧版浏览器，可使用 PostCSS 插件进行降级转换。

## 相关项目

- [halolight](https://github.com/halolight/halolight) - Next.js 参考实现
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 参考实现
- [halolight-angular](https://github.com/halolight/halolight-angular) - Angular 实现
