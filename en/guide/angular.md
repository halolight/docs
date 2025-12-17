# Angular Version

HaloLight Angular version is built on Angular 21 with Signals + Standalone Components + TypeScript.

**Live Preview**: [https://halolight-angular.h7ml.cn/](https://halolight-angular.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-angular](https://github.com/halolight/halolight-angular)

## Features

- 🏗️ **Angular 21** - Latest enterprise framework with Signals + Standalone Components
- ⚡ **NgRx Signals** - Lightweight reactive state management
- 🎨 **Theme System** - 11 skins, light/dark mode, View Transitions
- 🔐 **Authentication** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Permission Control** - RBAC fine-grained permission management
- 📑 **Multi-tabs** - Tab bar management
- ⌘ **Command Palette** - Keyboard shortcuts navigation

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Angular | 21.x | Enterprise framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| spartan/ui | latest | UI component library (Radix-style) |
| NgRx Signals | 21.x | Reactive state management |
| TanStack Query | 5.x | Server state |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Configurable Dashboard** - 9 widgets, drag-and-drop layout, responsive design
- **Multi-tab Navigation** - Browser-style tabs, context menu, state caching
- **Permission System** - RBAC permission control, route guards, permission directives/components
- **Theme System** - 11 skins, light/dark mode, View Transitions
- **Multi-account Switching** - Quick account switching, remember login state
- **Command Palette** - Keyboard shortcuts (⌘K), global search
- **Real-time Notifications** - WebSocket push, notification center

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
│   │   │   ├── dashboard/         # Dashboard components
│   │   │   └── shared/            # Shared components
│   │   ├── services/              # Service layer
│   │   ├── stores/                # NgRx Signals Stores
│   │   ├── guards/                # Route guards
│   │   ├── interceptors/          # HTTP interceptors
│   │   ├── directives/            # Directives
│   │   ├── pipes/                 # Pipes
│   │   ├── lib/                   # Utility library
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

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

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
  demoEmail: 'admin@halolight.h7ml.cn',
  demoPassword: '123456',
  showDemoHint: true,
};
```

### Start Development

```bash
pnpm start
```

Visit http://localhost:4200

### Build for Production

```bash
pnpm build
ng build --configuration production
```

## Demo Account

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Core Functionality

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

### Permission Control

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
<!-- Using directive -->
<button *appPermission="'users:delete'">Delete</button>
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
<!-- Using component -->
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

## Theme System

### Skin Presets

Supports 11 preset skins, switch via the quick settings panel:

| Skin | Primary Color | CSS Variable |
|------|---------------|--------------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Rose | Rose | `--primary: 59.3% 0.214 12.76` |
| Orange | Orange | `--primary: 65.4% 0.194 35.76` |
| Amber | Amber | `--primary: 74.2% 0.167 83.25` |
| Yellow | Yellow | `--primary: 84.5% 0.181 99.58` |
| Lime | Lime | `--primary: 76.5% 0.165 128.35` |
| Teal | Teal | `--primary: 59.8% 0.134 179.61` |
| Cyan | Cyan | `--primary: 68.3% 0.148 192.18` |
| Sky | Sky | `--primary: 68.5% 0.171 227.08` |

### CSS Variables (OKLch)

```css
/* Example variable definitions */
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

### Theme Switching

```ts
// Toggle theme
const uiSettingsStore = inject(UiSettingsStore);
uiSettingsStore.setTheme('dark'); // 'light' | 'dark' | 'system'

// Change skin
uiSettingsStore.setSkin('rose'); // 11 skin presets
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

## Environment Variables

### Configuration Example

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

### Variable Description

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `production` | Production environment | `false` |
| `apiUrl` | API base path | `/api` |
| `useMock` | Use Mock data | `true` |
| `appTitle` | Application title | `Admin Pro` |
| `brandName` | Brand name | `Halolight` |
| `demoEmail` | Demo account email | `admin@halolight.h7ml.cn` |
| `demoPassword` | Demo account password | `123456` |
| `showDemoHint` | Show demo hint | `true` |

### Usage

```ts
import { inject } from '@angular/core';
import { environment } from '../environments/environment';

// Use in components or services
export class ApiService {
  private apiUrl = environment.apiUrl;
  private useMock = environment.useMock;

  // ...
}
```

## Common Commands

```bash
pnpm start          # Start development server
pnpm build          # Production build
pnpm lint           # Lint code
pnpm lint:fix       # Auto fix
pnpm type-check     # Type check
pnpm test           # Run tests
pnpm test:coverage  # Test coverage
```

## Testing

```bash
pnpm test           # Run tests (watch mode)
pnpm test:run       # Single run
pnpm test:coverage  # Coverage report
pnpm test:ui        # Vitest UI
```

### Test Example

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

## Configuration

### Angular Configuration

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

### Tailwind Configuration

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
        // ... more color definitions
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

## Deployment

### Vercel (Recommended)

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

### Other Platforms

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## CI/CD

The project is configured with a complete GitHub Actions CI workflow:

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

## Advanced Features

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

### HTTP Interceptors

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

### Signals Computed Properties

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

## Performance Optimization

### Image Optimization

```ts
// Using NgOptimizedImage
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

### Lazy Loading Components

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

### Preloading Strategy

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

### OnPush Change Detection

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

## FAQ

### Q: How to configure Mock data?

A: Set `useMock: true` in `environment.ts` and define Mock data in the `src/mocks` directory:

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

### Q: How to implement route permission control?

A: Use `permissionGuard` and specify the required permission in the route configuration:

```ts
// app.routes.ts
{
  path: 'users',
  loadComponent: () => import('./pages/admin/users/users.component'),
  data: { permission: 'users:view' },
  canActivate: [authGuard, permissionGuard],
}
```

### Q: How to customize theme colors?

A: Override CSS variables in `styles.css`:

```css
:root {
  --primary: 51.1% 0.262 276.97; /* Custom primary color */
  --primary-foreground: 98% 0 0;
}

.dark {
  --primary: 56.1% 0.287 277.04;
  --primary-foreground: 98% 0 0;
}
```

### Q: How to integrate third-party UI component libraries?

A: spartan/ui is already integrated. To add other components, extend with Angular CDK:

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

## Comparison with Other Versions

| Feature | Angular Version | Next.js | Vue |
|---------|----------------|---------|-----|
| SSR/SSG | ✅ Angular SSR | ✅ | ✅ (Nuxt) |
| State Management | NgRx Signals | Zustand | Pinia |
| Routing | Angular Router | App Router | Vue Router |
| Build Tool | Angular CLI + esbuild | Next.js | Vite |
| Type Safety | TypeScript (enforced) | TypeScript | TypeScript |
| Enterprise Support | Google | Vercel | Community |

## Related Links

- [Live Preview](https://halolight-angular.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-angular)
- [Angular Official Docs](https://angular.dev)
- [spartan/ui Docs](https://www.spartan.ng)
- [NgRx Signals Docs](https://ngrx.io/guide/signals)
- [HaloLight Docs](https://docs.halolight.h7ml.cn)
