# Angular 版本

HaloLight Angular 版本基于 Angular 21 构建，采用 Signals + 独立组件 + TypeScript。

**在线预览**：[https://halolight-angular.h7ml.cn/](https://halolight-angular.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-angular](https://github.com/halolight/halolight-angular)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.x | 企业级框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| Angular CDK | 21.x | UI 原语库 |
| spartan/ui | latest | UI 组件库（Radix 风格） |
| TanStack Query | 5.x | 服务端状态 |
| NgRx Signals | 21.x | 响应式状态管理 |
| Zod | 3.x | 数据验证 |
| angular-gridster2 | latest | 拖拽布局 |
| ngx-echarts | latest | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

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
│   │   │   │   ├── admin-layout/
│   │   │   │   ├── auth-layout/
│   │   │   │   ├── sidebar/
│   │   │   │   ├── header/
│   │   │   │   └── footer/
│   │   │   ├── dashboard/         # 仪表盘组件
│   │   │   │   ├── dashboard-grid/
│   │   │   │   ├── widget-wrapper/
│   │   │   │   ├── stats-widget/
│   │   │   │   ├── chart-widget/
│   │   │   │   └── ...
│   │   │   └── shared/            # 共享组件
│   │   ├── services/              # 服务层
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── users.service.ts
│   │   │   └── ...
│   │   ├── stores/                # NgRx Signals Stores
│   │   │   ├── auth.store.ts
│   │   │   ├── ui-settings.store.ts
│   │   │   ├── dashboard.store.ts
│   │   │   └── tabs.store.ts
│   │   ├── guards/                # 路由守卫
│   │   │   ├── auth.guard.ts
│   │   │   └── permission.guard.ts
│   │   ├── interceptors/          # HTTP 拦截器
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   ├── directives/            # 指令
│   │   │   └── permission.directive.ts
│   │   ├── pipes/                 # 管道
│   │   ├── lib/                   # 工具库
│   │   │   ├── utils.ts
│   │   │   └── cn.ts
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
# 或
ng serve
```

访问 http://localhost:4200

### 构建生产

```bash
pnpm build
# 或
ng build --configuration production
```

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

### 权限指令

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
<!-- 使用 -->
<button *appPermission="'users:delete'">删除</button>
```

### 权限组件

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
<!-- 使用 -->
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

### 路由配置

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // 认证路由
  {
    path: '',
    loadComponent: () => import('./components/layout/auth-layout/auth-layout.component'),
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login.component') },
      { path: 'register', loadComponent: () => import('./pages/auth/register/register.component') },
      { path: 'forgot-password', loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component') },
      { path: 'reset-password', loadComponent: () => import('./pages/auth/reset-password/reset-password.component') },
    ],
  },

  // 管理后台路由
  {
    path: '',
    loadComponent: () => import('./components/layout/admin-layout/admin-layout.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component'),
        data: { permission: 'dashboard:view' },
        canActivate: [permissionGuard],
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users.component'),
        data: { permission: 'users:list' },
        canActivate: [permissionGuard],
      },
      // ... 更多路由
    ],
  },
];
```

## UI 组件

基于 spartan/ui (Angular 版 shadcn)，已集成 25+ 组件：

- **表单**：Button，Input，Textarea，Select，Checkbox，RadioGroup，Switch，Slider，DatePicker
- **数据展示**：Table，Card，Badge，Avatar，Progress，Skeleton
- **反馈**：Dialog，Sheet，AlertDialog，Toast，Tooltip，Popover
- **导航**：Tabs，Breadcrumb，Pagination，DropdownMenu，Command
- **布局**：Accordion，Collapsible，ScrollArea，Separator

## 主题配置

```ts
// 切换主题
const uiSettingsStore = inject(UiSettingsStore);
uiSettingsStore.setTheme('dark'); // 'light' | 'dark' | 'system'

// 切换皮肤
uiSettingsStore.setSkin('rose'); // 11 种皮肤预设
```

## 部署

### Vercel

```bash
vercel
```

### Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/halolight-angular/dist/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
    }
}
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

## 与其他版本对比

| 功能 | Angular 版本 | Vue 版本 | Next.js 版本 |
|------|-------------|----------|--------------|
| 状态管理 | NgRx Signals | Pinia | Zustand |
| 数据获取 | TanStack Query | TanStack Query | TanStack Query |
| 表单验证 | Angular Forms + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 拖拽布局 | angular-gridster2 | grid-layout-plus | react-grid-layout |
| 组件库 | spartan/ui | shadcn-vue | shadcn/ui |
| 路由 | Angular Router | Vue Router | Next.js App Router |
| SSR | Angular SSR | Nuxt | 内置支持 |
