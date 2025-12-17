# Angular 版本

HaloLight Angular 版本基于 Angular 21 构建，采用 Signals + 独立组件 + TypeScript。

**在线预览**：[https://halolight-angular.h7ml.cn/](https://halolight-angular.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-angular](https://github.com/halolight/halolight-angular)

## 特性

- 🏗️ **Angular 21** - 最新企业级框架，Signals + 独立组件
- ⚡ **NgRx Signals** - 轻量级响应式状态管理
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 📑 **多标签页** - 标签栏管理
- ⌘ **命令面板** - 快捷键导航

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.x | 企业级框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| spartan/ui | latest | UI 组件库（Radix 风格） |
| NgRx Signals | 21.x | 响应式状态管理 |
| TanStack Query | 5.x | 服务端状态 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **可配置仪表盘** - 9 种小部件，拖拽布局，响应式适配
- **多标签导航** - 浏览器式标签，右键菜单，状态缓存
- **权限系统** - RBAC 权限控制，路由守卫，权限指令/组件
- **主题系统** - 11 种皮肤，明暗模式，View Transitions
- **多账户切换** - 快速切换账户，记住登录状态
- **命令面板** - 键盘快捷键 (⌘K)，全局搜索
- **实时通知** - WebSocket 推送，通知中心

## 目录结构

```
halolight-angular/
├── src/
│   ├── app/
│   │   ├── pages/                  # 页面组件
│   │   │   ├── admin/             # 管理后台页面
│   │   │   │   ├── dashboard/     # 仪表盘
│   │   │   │   ├── users/         # 用户管理
│   │   │   │   ├── roles/         # 角色管理
│   │   │   │   ├── permissions/   # 权限管理
│   │   │   │   ├── settings/      # 系统设置
│   │   │   │   └── profile/       # 个人中心
│   │   │   └── auth/              # 认证页面
│   │   │       ├── login/
│   │   │       ├── register/
│   │   │       ├── forgot-password/
│   │   │       └── reset-password/
│   │   ├── components/
│   │   │   ├── ui/                # spartan/ui 组件
│   │   │   ├── layout/            # 布局组件
│   │   │   ├── dashboard/         # 仪表盘组件
│   │   │   └── shared/            # 共享组件
│   │   ├── services/              # 服务层
│   │   ├── stores/                # NgRx Signals Stores
│   │   ├── guards/                # 路由守卫
│   │   ├── interceptors/          # HTTP 拦截器
│   │   ├── directives/            # 指令
│   │   ├── pipes/                 # 管道
│   │   ├── lib/                   # 工具库
│   │   ├── types/                 # 类型定义
│   │   ├── mocks/                 # Mock 数据
│   │   ├── app.routes.ts          # 路由配置
│   │   ├── app.config.ts          # 应用配置
│   │   └── app.component.ts       # 根组件
│   ├── environments/              # 环境配置
│   └── styles.css                 # 全局样式
├── public/                        # 静态资源
├── angular.json
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 安装

```bash
git clone https://github.com/halolight/halolight-angular.git
cd halolight-angular
pnpm install
```

### 环境变量

```bash
cp src/environments/environment.example.ts src/environments/environment.development.ts
```

```ts
// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: '/api',
  useMock: true,
  appTitle: 'Admin Pro',
  brandName: 'Halolight',
  demoEmail: 'admin@halolight.h7ml.cn',
  demoPassword: '123456',
  showDemoHint: true,
};
```

### 启动开发

```bash
pnpm start
```

访问 http://localhost:4200

### 构建生产

```bash
pnpm build
ng build --configuration production
```

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

## 核心功能

### 状态管理 (NgRx Signals)

```ts
// stores/auth.store.ts
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.token() && !!store.user()),
    permissions: computed(() => store.user()?.permissions ?? []),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    async login(credentials: LoginCredentials) {
      patchState(store, { loading: true });
      try {
        const response = await authService.login(credentials);
        patchState(store, {
          user: response.user,
          token: response.token,
          loading: false,
        });
      } catch (error) {
        patchState(store, { loading: false });
        throw error;
      }
    },

    logout() {
      patchState(store, { user: null, token: null });
    },

    hasPermission(permission: string): boolean {
      const permissions = store.permissions();
      return permissions.some(p =>
        p === '*' || p === permission ||
        (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
      );
    },
  }))
);
```

### 数据获取 (TanStack Query)

```ts
// services/users.service.ts
import { Injectable, inject } from '@angular/core';
import { injectQuery, injectMutation, injectQueryClient } from '@tanstack/angular-query-experimental';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private api = inject(ApiService);
  private queryClient = injectQueryClient();

  getUsers(params?: UserQueryParams) {
    return injectQuery(() => ({
      queryKey: ['users', params],
      queryFn: () => this.api.get<UserListResponse>('/users', { params }),
    }));
  }

  createUser() {
    return injectMutation(() => ({
      mutationFn: (data: CreateUserDto) => this.api.post<User>('/users', data),
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    }));
  }
}
```

### 权限控制

```ts
// directives/permission.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { AuthStore } from '../stores/auth.store';

@Directive({
  selector: '[appPermission]',
  standalone: true,
})
export class PermissionDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private authStore = inject(AuthStore);

  @Input() set appPermission(permission: string) {
    effect(() => {
      const hasPermission = this.authStore.hasPermission(permission);
      this.viewContainer.clear();
      if (hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
```

```html
<!-- 使用指令 -->
<button *appPermission="'users:delete'">删除</button>
```

```ts
// components/permission-guard.component.ts
import { Component, Input, inject, computed } from '@angular/core';
import { AuthStore } from '../../stores/auth.store';

@Component({
  selector: 'app-permission-guard',
  standalone: true,
  template: `
    @if (hasPermission()) {
      <ng-content />
    } @else {
      <ng-content select="[fallback]" />
    }
  `,
})
export class PermissionGuardComponent {
  @Input({ required: true }) permission!: string;

  private authStore = inject(AuthStore);
  hasPermission = computed(() => this.authStore.hasPermission(this.permission));
}
```

```html
<!-- 使用组件 -->
<app-permission-guard permission="users:delete">
  <app-delete-button />
  <span fallback>无权限</span>
</app-permission-guard>
```

### 可拖拽仪表盘

```ts
// components/dashboard/dashboard-grid.component.ts
import { Component, inject, computed } from '@angular/core';
import { GridsterModule, GridsterConfig, GridsterItem } from 'angular-gridster2';
import { DashboardStore } from '../../stores/dashboard.store';

@Component({
  selector: 'app-dashboard-grid',
  standalone: true,
  imports: [GridsterModule, WidgetWrapperComponent],
  template: `
    <gridster [options]="options()">
      @for (widget of widgets(); track widget.id) {
        <gridster-item [item]="widget">
          <app-widget-wrapper [widget]="widget" />
        </gridster-item>
      }
    </gridster>
  `,
})
export class DashboardGridComponent {
  private dashboardStore = inject(DashboardStore);

  widgets = this.dashboardStore.widgets;
  isEditing = this.dashboardStore.isEditing;

  options = computed<GridsterConfig>(() => ({
    gridType: 'fit',
    displayGrid: this.isEditing() ? 'always' : 'none',
    draggable: { enabled: this.isEditing() },
    resizable: { enabled: this.isEditing() },
    pushItems: true,
    minCols: 12,
    maxCols: 12,
    minRows: 4,
    defaultItemCols: 3,
    defaultItemRows: 2,
    itemChangeCallback: (item) => this.dashboardStore.updateWidget(item),
  }));
}
```

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过快捷设置面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿 | `--primary: 64.6% 0.178 142.49` |
| Rose | 玫瑰红 | `--primary: 59.3% 0.214 12.76` |
| Orange | 橙色 | `--primary: 65.4% 0.194 35.76` |
| Amber | 琥珀 | `--primary: 74.2% 0.167 83.25` |
| Yellow | 黄色 | `--primary: 84.5% 0.181 99.58` |
| Lime | 柠檬绿 | `--primary: 76.5% 0.165 128.35` |
| Teal | 青色 | `--primary: 59.8% 0.134 179.61` |
| Cyan | 青蓝 | `--primary: 68.3% 0.148 192.18` |
| Sky | 天蓝 | `--primary: 68.5% 0.171 227.08` |

### CSS 变量 (OKLch)

```css
/* 示例变量定义 */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 98% 0 0;
  --secondary: 96.1% 0.002 286.08;
  --secondary-foreground: 14.9% 0.017 285.75;
  --muted: 96.1% 0.002 286.08;
  --muted-foreground: 55.4% 0.009 285.82;
  --accent: 96.1% 0.002 286.08;
  --accent-foreground: 14.9% 0.017 285.75;
  --border: 92.2% 0.004 285.86;
  --input: 92.2% 0.004 285.86;
  --ring: 51.1% 0.262 276.97;
}

.dark {
  --background: 14.9% 0.017 285.75;
  --foreground: 98% 0 0;
  --primary: 56.1% 0.287 277.04;
  /* ... */
}
```

### 主题切换

```ts
// 切换主题
const uiSettingsStore = inject(UiSettingsStore);
uiSettingsStore.setTheme('dark'); // 'light' | 'dark' | 'system'

// 切换皮肤
uiSettingsStore.setSkin('rose'); // 11 种皮肤预设
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 重定向到 `/dashboard` | - |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户列表 | `users:list` |
| `/users/create` | 创建用户 | `users:create` |
| `/users/:id` | 用户详情 | `users:view` |
| `/users/:id/edit` | 编辑用户 | `users:update` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

## 环境变量

### 配置示例

```ts
// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: '/api',
  useMock: true,
  appTitle: 'Admin Pro',
  brandName: 'Halolight',
  demoEmail: 'admin@halolight.h7ml.cn',
  demoPassword: '123456',
  showDemoHint: true,
};
```

### 变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `production` | 是否生产环境 | `false` |
| `apiUrl` | API 基础路径 | `/api` |
| `useMock` | 是否使用 Mock 数据 | `true` |
| `appTitle` | 应用标题 | `Admin Pro` |
| `brandName` | 品牌名称 | `Halolight` |
| `demoEmail` | 演示账号邮箱 | `admin@halolight.h7ml.cn` |
| `demoPassword` | 演示账号密码 | `123456` |
| `showDemoHint` | 是否显示演示提示 | `true` |

### 使用方式

```ts
import { inject } from '@angular/core';
import { environment } from '../environments/environment';

// 在组件或服务中使用
export class ApiService {
  private apiUrl = environment.apiUrl;
  private useMock = environment.useMock;

  // ...
}
```

## 常用命令

```bash
pnpm start          # 启动开发服务器
pnpm build          # 生产构建
pnpm lint           # 代码检查
pnpm lint:fix       # 自动修复
pnpm type-check     # 类型检查
pnpm test           # 运行测试
pnpm test:coverage  # 测试覆盖率
```

## 测试

```bash
pnpm test           # 运行测试（watch 模式）
pnpm test:run       # 单次运行
pnpm test:coverage  # 覆盖率报告
pnpm test:ui        # Vitest UI 界面
```

### 测试示例

```ts
// auth.store.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthStore } from './auth.store';
import { AuthService } from '../services/auth.service';

describe('AuthStore', () => {
  let store: InstanceType<typeof AuthStore>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout']);

    TestBed.configureTestingModule({
      providers: [
        AuthStore,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    store = TestBed.inject(AuthStore);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should initialize with default state', () => {
    expect(store.user()).toBeNull();
    expect(store.token()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });

  it('should login successfully', async () => {
    const mockResponse = {
      user: { id: '1', email: 'test@example.com', permissions: ['users:view'] },
      token: 'mock-token',
    };
    authService.login.and.returnValue(Promise.resolve(mockResponse));

    await store.login({ email: 'test@example.com', password: '123456' });

    expect(store.user()).toEqual(mockResponse.user);
    expect(store.token()).toBe('mock-token');
    expect(store.isAuthenticated()).toBe(true);
  });

  it('should check permissions correctly', async () => {
    const mockResponse = {
      user: { id: '1', email: 'test@example.com', permissions: ['users:*', 'dashboard:view'] },
      token: 'mock-token',
    };
    authService.login.and.returnValue(Promise.resolve(mockResponse));
    await store.login({ email: 'test@example.com', password: '123456' });

    expect(store.hasPermission('users:view')).toBe(true);
    expect(store.hasPermission('users:delete')).toBe(true);
    expect(store.hasPermission('dashboard:view')).toBe(true);
    expect(store.hasPermission('settings:view')).toBe(false);
  });
});
```

## 配置

### Angular 配置

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideQueryClient } from '@tanstack/angular-query-experimental';
import { QueryClient } from '@tanstack/query-core';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimations(),
    provideQueryClient(new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          gcTime: 1000 * 60 * 10, // 10 minutes
        },
      },
    })),
  ],
};
```

### Tailwind 配置

```js
// tailwind.config.js
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{html,ts}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring))',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        // ... 更多颜色定义
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

## 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-angular)

```bash
vercel
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t halolight-angular .
docker run -p 3000:80 halolight-angular
```

### 其他平台

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## CI/CD

项目配置了完整的 GitHub Actions CI 工作流：

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm audit --audit-level=high
```

## 高级功能

### 路由守卫

```ts
// guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    router.navigate(['/login'], { queryParams: { redirect: state.url } });
    return false;
  }

  return true;
};

// guards/permission.guard.ts
export const permissionGuard: CanActivateFn = (route) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const permission = route.data['permission'] as string;

  if (permission && !authStore.hasPermission(permission)) {
    router.navigate(['/403']);
    return false;
  }

  return true;
};
```

### HTTP 拦截器

```ts
// interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../stores/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const token = authStore.token();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};

// interceptors/error.interceptor.ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authStore.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
```

### Signals 计算属性

```ts
// stores/ui-settings.store.ts
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

interface UiSettingsState {
  theme: 'light' | 'dark' | 'system';
  skin: string;
  sidebarCollapsed: boolean;
}

const initialState: UiSettingsState = {
  theme: 'system',
  skin: 'default',
  sidebarCollapsed: false,
};

export const UiSettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    effectiveTheme: computed(() => {
      if (store.theme() === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return store.theme();
    }),
    isDarkMode: computed(() => store.effectiveTheme() === 'dark'),
  })),
  withMethods((store) => ({
    setTheme(theme: 'light' | 'dark' | 'system') {
      patchState(store, { theme });
      document.documentElement.classList.toggle('dark', store.isDarkMode());
    },
    setSkin(skin: string) {
      patchState(store, { skin });
      document.documentElement.setAttribute('data-theme', skin);
    },
    toggleSidebar() {
      patchState(store, { sidebarCollapsed: !store.sidebarCollapsed() });
    },
  }))
);
```

## 性能优化

### 图片优化

```ts
// 使用 NgOptimizedImage
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: `
    <img
      ngSrc="/assets/images/hero.jpg"
      width="1200"
      height="600"
      priority
      alt="Hero image"
    />
  `,
})
export class HeroComponent {}
```

### 懒加载组件

```ts
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/admin/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/admin/users/users.routes')
      .then(m => m.USERS_ROUTES),
  },
];
```

### 预加载策略

```ts
// app.config.ts
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
  ],
};
```

### OnPush 变更检测

```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (user of users(); track user.id) {
      <app-user-card [user]="user" />
    }
  `,
})
export class UserListComponent {
  users = signal<User[]>([]);
}
```

## 常见问题

### Q：如何配置 Mock 数据？

A：在 `environment.ts` 中设置 `useMock: true`，并在 `src/mocks` 目录下定义 Mock 数据：

```ts
// mocks/users.mock.ts
import Mock from 'mockjs';

Mock.mock('/api/users', 'get', {
  'data|10-20': [{
    'id|+1': 1,
    'name': '@cname',
    'email': '@email',
    'avatar': '@image(100x100)',
    'role': '@pick(["admin", "user", "guest"])',
    'status': '@pick(["active", "inactive"])',
    'createdAt': '@datetime',
  }],
  total: '@integer(10, 100)',
});
```

### Q：如何实现路由权限控制？

A：使用 `permissionGuard` 并在路由配置中指定所需权限：

```ts
// app.routes.ts
{
  path: 'users',
  loadComponent: () => import('./pages/admin/users/users.component'),
  data: { permission: 'users:view' },
  canActivate: [authGuard, permissionGuard],
}
```

### Q：如何自定义主题颜色？

A：在 `styles.css` 中覆盖 CSS 变量：

```css
:root {
  --primary: 51.1% 0.262 276.97; /* 自定义主色调 */
  --primary-foreground: 98% 0 0;
}

.dark {
  --primary: 56.1% 0.287 277.04;
  --primary-foreground: 98% 0 0;
}
```

### Q：如何集成第三方 UI 组件库？

A：spartan/ui 已集成，如需添加其他组件，可通过 Angular CDK 扩展：

```ts
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  imports: [CdkDrag, CdkDropList],
  template: `
    <div cdkDropList (cdkDropListDropped)="drop($event)">
      @for (item of items(); track item.id) {
        <div cdkDrag>{{ item.name }}</div>
      }
    </div>
  `,
})
export class DraggableListComponent {}
```

## 与其他版本对比

| 特性 | Angular 版本 | Next.js | Vue |
|------|-------------|---------|-----|
| SSR/SSG | ✅ Angular SSR | ✅ | ✅ (Nuxt) |
| 状态管理 | NgRx Signals | Zustand | Pinia |
| 路由 | Angular Router | App Router | Vue Router |
| 构建工具 | Angular CLI + esbuild | Next.js | Vite |
| 类型安全 | TypeScript (强制) | TypeScript | TypeScript |
| 企业支持 | Google | Vercel | 社区 |

## 相关链接

- [在线预览](https://halolight-angular.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-angular)
- [Angular 官方文档](https://angular.dev)
- [spartan/ui 文档](https://www.spartan.ng)
- [NgRx Signals 文档](https://ngrx.io/guide/signals)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
