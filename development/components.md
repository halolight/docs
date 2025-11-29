# 组件规范

本文档定义 HaloLight 项目的 UI 组件库规范，基于 shadcn/ui 设计系统。

## 组件库概览

### 基于 shadcn/ui

所有框架版本都使用对应的 shadcn/ui 实现：

| 框架 | 组件库 | 仓库 |
|------|--------|------|
| React/Next.js | shadcn/ui | [shadcn/ui](https://ui.shadcn.com) |
| Vue 3 | shadcn-vue | [shadcn-vue](https://www.shadcn-vue.com) |
| Svelte | shadcn-svelte | [shadcn-svelte](https://www.shadcn-svelte.com) |
| Angular | spartan/ui | [spartan](https://www.spartan.ng) |
| Solid.js | solid-ui | [solid-ui](https://www.solid-ui.com) |

## 必需组件清单

### 基础 UI 组件 (30+)

```
ui/
├── accordion.tsx        # 折叠面板
├── alert-dialog.tsx     # 确认对话框
├── alert.tsx           # 警告提示
├── avatar.tsx          # 头像
├── badge.tsx           # 徽章
├── breadcrumb.tsx      # 面包屑
├── button.tsx          # 按钮
├── calendar.tsx        # 日历
├── card.tsx            # 卡片
├── checkbox.tsx        # 复选框
├── collapsible.tsx     # 可折叠区域
├── command.tsx         # 命令面板
├── data-table.tsx      # 数据表格
├── date-picker.tsx     # 日期选择器
├── dialog.tsx          # 对话框
├── dropdown-menu.tsx   # 下拉菜单
├── form.tsx            # 表单
├── input.tsx           # 输入框
├── label.tsx           # 标签
├── pagination.tsx      # 分页
├── popover.tsx         # 弹出层
├── progress.tsx        # 进度条
├── radio-group.tsx     # 单选组
├── scroll-area.tsx     # 滚动区域
├── select.tsx          # 选择器
├── separator.tsx       # 分隔线
├── sheet.tsx           # 侧边抽屉
├── skeleton.tsx        # 骨架屏
├── slider.tsx          # 滑块
├── switch.tsx          # 开关
├── table.tsx           # 表格
├── tabs.tsx            # 标签页
├── textarea.tsx        # 文本域
├── toast.tsx           # 轻提示
├── tooltip.tsx         # 工具提示
└── sonner.tsx          # Toast 通知
```

### 布局组件

```
layout/
├── AdminLayout.tsx      # 管理后台主布局
├── AuthLayout.tsx       # 认证页面布局
├── Sidebar.tsx          # 侧边栏
├── Header.tsx           # 顶部栏
├── Footer.tsx           # 底部栏
├── Breadcrumb.tsx       # 面包屑导航
├── TabsNav.tsx          # 标签页导航
└── PageContainer.tsx    # 页面容器
```

### 仪表盘组件

```
dashboard/
├── DashboardGrid.tsx    # 可拖拽网格容器
├── WidgetWrapper.tsx    # Widget 包装器
├── StatsWidget.tsx      # 统计数据卡片
├── ChartWidget.tsx      # 图表 Widget
├── TableWidget.tsx      # 表格 Widget
├── CalendarWidget.tsx   # 日历 Widget
├── TasksWidget.tsx      # 任务列表
└── QuickActionsWidget.tsx # 快捷操作
```

### 图表组件

```
charts/
├── LineChart.tsx        # 折线图
├── BarChart.tsx         # 柱状图
├── PieChart.tsx         # 饼图
├── AreaChart.tsx        # 面积图
├── RadarChart.tsx       # 雷达图
└── GaugeChart.tsx       # 仪表盘
```

## 组件设计规范

### 1。Props 接口设计

```tsx
// 基础 Props 结构
interface ComponentProps {
  // 必需属性在前
  children: React.ReactNode

  // 可选属性按字母排序
  className?: string
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'

  // 事件处理函数
  onChange?: (value: T) => void
  onClick?: () => void
}
```

### 2。样式变体

使用 `cva` (class-variance-authority) 定义变体：

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // 基础样式
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}
```

### 3。可访问性 (a11y)

所有组件必须支持：

```tsx
// ARIA 属性
<button
  role="button"
  aria-label={ariaLabel}
  aria-disabled={disabled}
  aria-busy={loading}
>

// 键盘导航
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    onClick?.()
  }
  if (e.key === 'Escape') {
    onClose?.()
  }
}

// 焦点管理
const focusRef = useRef<HTMLElement>(null)
useEffect(() => {
  if (open) {
    focusRef.current?.focus()
  }
}, [open])
```

### 4。响应式设计

```tsx
// Tailwind 断点
const breakpoints = {
  sm: '640px',   // 手机横屏
  md: '768px',   // 平板
  lg: '1024px',  // 小型桌面
  xl: '1280px',  // 桌面
  '2xl': '1536px' // 大屏
}

// 响应式类名示例
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
">
```

## 布局组件规范

### AdminLayout

```tsx
interface AdminLayoutProps {
  children: React.ReactNode
}

// 布局结构
<div className="min-h-screen bg-background">
  <Sidebar />
  <div className="flex flex-col lg:ml-64">
    <Header />
    <main className="flex-1 p-6">
      <PageContainer>
        {children}
      </PageContainer>
    </main>
    <Footer />
  </div>
</div>
```

### Sidebar 状态

```tsx
interface SidebarState {
  collapsed: boolean      // 是否折叠
  mobileOpen: boolean    // 移动端是否展开
  activeMenu: string     // 当前激活菜单
  openMenus: string[]    // 展开的子菜单
}

// 折叠宽度
const SIDEBAR_WIDTH = 256        // 展开时 16rem
const SIDEBAR_COLLAPSED = 64     // 折叠时 4rem
```

### Header 组件

```tsx
interface HeaderProps {
  showBreadcrumb?: boolean
  showSearch?: boolean
  showNotifications?: boolean
  showUserMenu?: boolean
}

// 组成部分
<header className="h-16 border-b bg-background/95 backdrop-blur">
  <div className="flex items-center justify-between px-4 h-full">
    {/* 左侧 */}
    <div className="flex items-center gap-4">
      <SidebarTrigger />
      <Breadcrumb />
    </div>

    {/* 右侧 */}
    <div className="flex items-center gap-2">
      <GlobalSearch />
      <ThemeToggle />
      <NotificationDropdown />
      <UserDropdown />
    </div>
  </div>
</header>
```

## 表单组件规范

### 表单字段结构

```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>邮箱</FormLabel>
      <FormControl>
        <Input placeholder="请输入邮箱" {...field} />
      </FormControl>
      <FormDescription>
        我们不会分享你的邮箱
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### 表单验证

```tsx
// Zod Schema
const formSchema = z.object({
  username: z.string().min(2, '用户名至少2个字符').max(50),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少8个字符'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次密码输入不一致',
  path: ['confirmPassword'],
})
```

## 数据表格规范

### DataTable 功能

```tsx
interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]

  // 分页
  pagination?: boolean
  pageSize?: number

  // 排序
  sorting?: boolean
  defaultSort?: { id: string; desc: boolean }

  // 筛选
  filtering?: boolean
  globalFilter?: boolean

  // 选择
  selection?: boolean
  onSelectionChange?: (rows: T[]) => void

  // 操作
  actions?: (row: T) => React.ReactNode
}
```

### 列定义示例

```tsx
const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: '姓名',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        邮箱
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => (
      <Badge variant={row.getValue('status') === 'active' ? 'default' : 'secondary'}>
        {row.getValue('status')}
      </Badge>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions row={row.original} />,
  },
]
```
