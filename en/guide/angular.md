# Angular Version

HaloLight Angular version is built on Angular 21 with Signals + Standalone Components + TypeScript.

**Live Preview**: [https://halolight-angular.h7ml.cn/](https://halolight-angular.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-angular](https://github.com/halolight/halolight-angular)

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Angular | 21.x | Enterprise framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| Angular CDK | 21.x | UI primitives library |
| spartan/ui | latest | UI component library (Radix-style) |
| TanStack Query | 5.x | Server state |
| NgRx Signals | 21.x | Reactive state management |
| Zod | 3.x | Data validation |
| angular-gridster2 | latest | Drag-and-drop layout |
| ngx-echarts | latest | Chart visualization |
| Mock.js | 1.x | Data mocking |

## Directory Structure

```
halolight-angular/
├── src/
│   ├── app/
│   │   ├── pages/                  # Page components
│   │   │   ├── admin/             # Admin pages
│   │   │   │   ├── dashboard/     # Dashboard
│   │   │   │   ├── users/         # User management
│   │   │   │   ├── roles/         # Role management
│   │   │   │   ├── permissions/   # Permission management
│   │   │   │   ├── settings/      # System settings
│   │   │   │   └── profile/       # User profile
│   │   │   └── auth/              # Auth pages
│   │   │       ├── login/
│   │   │       ├── register/
│   │   │       ├── forgot-password/
│   │   │       └── reset-password/
│   │   ├── components/
│   │   │   ├── ui/                # spartan/ui components
│   │   │   ├── layout/            # Layout components
│   │   │   │   ├── admin-layout/
│   │   │   │   ├── auth-layout/
│   │   │   │   ├── sidebar/
│   │   │   │   ├── header/
│   │   │   │   └── footer/
│   │   │   ├── dashboard/         # Dashboard components
│   │   │   │   ├── dashboard-grid/
│   │   │   │   ├── widget-wrapper/
│   │   │   │   ├── stats-widget/
│   │   │   │   ├── chart-widget/
│   │   │   │   └── ...
│   │   │   └── shared/            # Shared components
│   │   ├── services/              # Service layer
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── users.service.ts
│   │   │   └── ...
│   │   ├── stores/                # NgRx Signals Stores
│   │   │   ├── auth.store.ts
│   │   │   ├── ui-settings.store.ts
│   │   │   ├── dashboard.store.ts
│   │   │   └── tabs.store.ts
│   │   ├── guards/                # Route guards
│   │   │   ├── auth.guard.ts
│   │   │   └── permission.guard.ts
│   │   ├── interceptors/          # HTTP interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   ├── directives/            # Directives
│   │   │   └── permission.directive.ts
│   │   ├── pipes/                 # Pipes
│   │   ├── lib/                   # Utility library
│   │   │   ├── utils.ts
│   │   │   └── cn.ts
│   │   ├── types/                 # Type definitions
│   │   ├── mocks/                 # Mock data
│   │   ├── app.routes.ts          # Route configuration
│   │   ├── app.config.ts          # App configuration
│   │   └── app.component.ts       # Root component
│   ├── environments/              # Environment configuration
│   └── styles.css                 # Global styles
├── public/                        # Static assets
├── angular.json
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-angular.git
cd halolight-angular
pnpm install
```

### Environment Variables

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
  demoEmail: 'admin@example.com',
  demoPassword: '123456',
  showDemoHint: true,
};
```

### Start Development

```bash
pnpm start
# or
ng serve
```

Visit http://localhost:4200

### Build for Production

```bash
pnpm build
# or
ng build --configuration production
```

## Core Features

### State Management (NgRx Signals)

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

### Data Fetching (TanStack Query)

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

### Permission Directive

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
<!-- Usage -->
<button *appPermission="'users:delete'">Delete</button>
```

### Permission Component

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
<!-- Usage -->
<app-permission-guard permission="users:delete">
  <app-delete-button />
  <span fallback>No permission</span>
</app-permission-guard>
```

### Draggable Dashboard

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

### Route Guards

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

### HTTP Interceptor

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

## Page Routes

| Path | Page | Permission |
|------|------|------------|
| `/` | Redirect to `/dashboard` | - |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot password | Public |
| `/reset-password` | Reset password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/users` | User list | `users:list` |
| `/users/create` | Create user | `users:create` |
| `/users/:id` | User details | `users:view` |
| `/users/:id/edit` | Edit user | `users:update` |
| `/roles` | Role management | `roles:list` |
| `/permissions` | Permission management | `permissions:list` |
| `/settings` | System settings | `settings:view` |
| `/profile` | User profile | Authenticated |

### Route Configuration

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Auth routes
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

  // Admin routes
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
      // ... more routes
    ],
  },
];
```

## UI Components

Based on spartan/ui (Angular version of shadcn), 25+ components integrated:

- **Forms**: Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, DatePicker
- **Data Display**: Table, Card, Badge, Avatar, Progress, Skeleton
- **Feedback**: Dialog, Sheet, AlertDialog, Toast, Tooltip, Popover
- **Navigation**: Tabs, Breadcrumb, Pagination, DropdownMenu, Command
- **Layout**: Accordion, Collapsible, ScrollArea, Separator

## Theme Configuration

```ts
// Toggle theme
const uiSettingsStore = inject(UiSettingsStore);
uiSettingsStore.setTheme('dark'); // 'light' | 'dark' | 'system'

// Change skin
uiSettingsStore.setSkin('rose'); // 11 skin presets
```

## Deployment

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

## Comparison with Other Versions

| Feature | Angular Version | Vue Version | Next.js Version |
|---------|----------------|-------------|-----------------|
| State Management | NgRx Signals | Pinia | Zustand |
| Data Fetching | TanStack Query | TanStack Query | TanStack Query |
| Form Validation | Angular Forms + Zod | VeeValidate + Zod | React Hook Form + Zod |
| Drag-and-Drop | angular-gridster2 | grid-layout-plus | react-grid-layout |
| UI Components | spartan/ui | shadcn-vue | shadcn/ui |
| Routing | Angular Router | Vue Router | Next.js App Router |
| SSR | Angular SSR | Nuxt | Built-in support |
