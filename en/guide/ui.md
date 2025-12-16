# Web Components Library

HaloLight UI is a cross-framework Web Components library built with Stencil, featuring built-in Tailwind themes and OKLch color system.

**GitHub**: [https://github.com/halolight/halolight-ui](https://github.com/halolight/halolight-ui)

**npm**: `@halolight/ui`

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Stencil | 4.22.x | Web Components compiler |
| TypeScript | 5.x | Type system |
| Tailwind CSS | 4.0 | Utility-first CSS (build time) |
| Jest | 29.x | Unit testing |
| Puppeteer | 23.x | E2E testing |

## Core Features

- **Cross-framework Compatible**: Based on Web Components standard, works with React, Vue, Angular, Svelte, and any framework
- **OKLch Color Space**: Uses perceptually uniform OKLch color space for theming
- **Shadow DOM Encapsulation**: Complete style isolation, avoiding conflicts
- **TypeScript**: Full type definition support
- **Accessibility**: WCAG 2.1 AA compliant
- **Lightweight**: On-demand loading, tree-shakeable

## Component List

| Component | Tag | Description |
|-----------|-----|-------------|
| Button | `<hl-button>` | Button with multiple variants and sizes |
| Input | `<hl-input>` | Input with validation and error states |
| Select | `<hl-select>` | Dropdown selector |
| Modal | `<hl-modal>` | Modal dialog |
| Card | `<hl-card>` | Card container |
| Table | `<hl-table>` | Data table with sorting and selection |
| Form | `<hl-form>` | Form container with validation |

## Directory Structure

```
halolight-ui/
├── src/
│   ├── components/                # Component source
│   │   ├── hl-button/            # Button component
│   │   │   ├── hl-button.tsx     # Component logic
│   │   │   ├── hl-button.css     # Component styles
│   │   │   ├── readme.md         # Component docs
│   │   │   └── test/             # Component tests
│   │   ├── hl-input/             # Input
│   │   ├── hl-select/            # Select
│   │   ├── hl-modal/             # Modal
│   │   ├── hl-table/             # Table
│   │   ├── hl-card/              # Card
│   │   └── hl-form/              # Form
│   ├── global/                   # Global styles
│   │   └── global.css            # OKLch theme variables
│   ├── utils/                    # Utilities
│   ├── themes/                   # Theme configuration
│   ├── components.d.ts           # Auto-generated type definitions
│   └── index.ts                  # Export entry
├── dist/                         # Build output
├── loader/                       # Runtime loader
├── www/                          # Development preview site
├── stencil.config.ts             # Stencil configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json
└── package.json
```

## Quick Start

### Installation

```bash
npm install @halolight/ui
# or
pnpm add @halolight/ui
```

### Define Custom Elements

Call once in any framework:

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

// Call once at app entry
defineCustomElements();

function App() {
  return (
    <div>
      <hl-button variant="primary">Click Me</hl-button>
    </div>
  );
}
```

**TypeScript Support**:

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

## Component API

### hl-button

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Button variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |

**Events**: `hlClick`

### hl-input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'text' \| 'password' \| 'email' \| 'number'` | `'text'` | Input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `string` | `''` | Error message |

**Events**: `hlChange`, `hlInput`, `hlFocus`, `hlBlur`

## Theme Customization

### Dark Mode

Add `dark` class to parent element to enable dark theme:

```html
<div class="dark">
  <hl-button variant="primary">Dark Mode Button</hl-button>
</div>
```

```javascript
// Dynamic toggle
document.body.classList.toggle('dark');
```

### CSS Variable Override

Define theme variables using OKLch color space:

```css
:root {
  /* Primary color - using OKLch */
  --hl-color-primary: oklch(0.65 0.15 250);
  --hl-color-primary-hover: oklch(0.55 0.18 250);
  --hl-color-primary-light: oklch(0.75 0.12 250);

  /* Semantic colors */
  --hl-color-success: oklch(0.7 0.18 145);
  --hl-color-danger: oklch(0.63 0.26 25);
  --hl-color-warning: oklch(0.78 0.16 75);
  --hl-color-info: oklch(0.73 0.15 195);

  /* Neutral colors */
  --hl-bg-base: oklch(1 0 0);
  --hl-text-primary: oklch(0.2 0 0);
  --hl-border-color: oklch(0.9 0 0);

  /* Border radius and spacing */
  --hl-border-radius: 0.5rem;
  --hl-spacing-md: 1rem;
}

/* Dark mode */
.dark {
  --hl-color-primary: oklch(0.7 0.15 250);
  --hl-bg-base: oklch(0.15 0 0);
  --hl-text-primary: oklch(0.98 0 0);
}
```

### OKLch Color Space

OKLch is a perceptually uniform color space:

- **L (Lightness)**: 0 (black) ~ 1 (white)
- **C (Chroma)**: 0 (gray) ~ 0.4 (vivid)
- **H (Hue)**: 0° ~ 360° (hue wheel)

```css
/* oklch(lightness chroma hue / alpha) */
oklch(0.65 0.15 250)        /* Blue */
oklch(0.7 0.18 145)         /* Green */
oklch(0.63 0.26 25 / 0.8)   /* Semi-transparent red */
```

## Development Guide

### Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Production build
npm run build

# Run tests
npm test

# Generate new component
npm run generate
```

### Creating New Components

1. Use Stencil CLI to generate skeleton:

```bash
npm run generate
# Enter component name (without hl- prefix)
```

2. Implement component logic:

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

### Naming Conventions

- **Component tags**: `hl-{component-name}`
- **CSS classes**: BEM style `.hl-button--primary`
- **Event names**: `hl{EventName}` (camelCase)

## Browser Compatibility

OKLch color space support:

- Chrome 111+
- Safari 15.4+
- Firefox 113+

For older browsers, use PostCSS plugins for fallback conversion.

## Related Projects

- [halolight](https://github.com/halolight/halolight) - Next.js reference implementation
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue reference implementation
- [halolight-angular](https://github.com/halolight/halolight-angular) - Angular implementation
