# Component Specification

This document defines the UI component library specification for the HaloLight project, based on the shadcn/ui design system.

## Component Library Overview

### Based on shadcn/ui

All framework versions use the corresponding shadcn/ui implementation:

| Framework | Component Library | Repository |
|------|--------|------|
| React/Next.js | shadcn/ui | [shadcn/ui](https://ui.shadcn.com) |
| Vue 3 | shadcn-vue | [shadcn-vue](https://www.shadcn-vue.com) |
| Svelte | shadcn-svelte | [shadcn-svelte](https://www.shadcn-svelte.com) |
| Angular | spartan/ui | [spartan](https://www.spartan.ng) |
| Solid.js | solid-ui | [solid-ui](https://www.solid-ui.com) |

## Required Component Checklist

### Basic UI Components (30+)

```
ui/
├── accordion.tsx        # Accordion
├── alert-dialog.tsx     # Alert dialog
├── alert.tsx           # Alert
├── avatar.tsx          # Avatar
├── badge.tsx           # Badge
├── breadcrumb.tsx      # Breadcrumb
├── button.tsx          # Button
├── calendar.tsx        # Calendar
├── card.tsx            # Card
├── checkbox.tsx        # Checkbox
├── collapsible.tsx     # Collapsible
├── command.tsx         # Command palette
├── data-table.tsx      # Data table
├── date-picker.tsx     # Date picker
├── dialog.tsx          # Dialog
├── dropdown-menu.tsx   # Dropdown menu
├── form.tsx            # Form
├── input.tsx           # Input
├── label.tsx           # Label
├── pagination.tsx      # Pagination
├── popover.tsx         # Popover
├── progress.tsx        # Progress
├── radio-group.tsx     # Radio group
├── scroll-area.tsx     # Scroll area
├── select.tsx          # Select
├── separator.tsx       # Separator
├── sheet.tsx           # Sheet
├── skeleton.tsx        # Skeleton
├── slider.tsx          # Slider
├── switch.tsx          # Switch
├── table.tsx           # Table
├── tabs.tsx            # Tabs
├── textarea.tsx        # Textarea
├── toast.tsx           # Toast
├── tooltip.tsx         # Tooltip
└── sonner.tsx          # Toast notification
```

### Layout Components

```
layout/
├── AdminLayout.tsx      # Admin main layout
├── AuthLayout.tsx       # Auth page layout
├── Sidebar.tsx          # Sidebar
├── Header.tsx           # Header
├── Footer.tsx           # Footer
├── Breadcrumb.tsx       # Breadcrumb navigation
├── TabsNav.tsx          # Tabs navigation
└── PageContainer.tsx    # Page container
```

### Dashboard Components

```
dashboard/
├── DashboardGrid.tsx    # Draggable grid container
├── WidgetWrapper.tsx    # Widget wrapper
├── StatsWidget.tsx      # Stats card
├── ChartWidget.tsx      # Chart widget
├── TableWidget.tsx      # Table widget
├── CalendarWidget.tsx   # Calendar widget
├── TasksWidget.tsx      # Task list
└── QuickActionsWidget.tsx # Quick actions
```

### Chart Components

```
charts/
├── LineChart.tsx        # Line chart
├── BarChart.tsx         # Bar chart
├── PieChart.tsx         # Pie chart
├── AreaChart.tsx        # Area chart
├── RadarChart.tsx       # Radar chart
└── GaugeChart.tsx       # Gauge
```

## Component Design Specification

### 1. Props Interface Design

```tsx
// Basic Props structure
interface ComponentProps {
  // Required props first
  children: React.ReactNode

  // Optional props in alphabetical order
  className?: string
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'

  // Event handlers
  onChange?: (value: T) => void
  onClick?: () => void
}
```

### 2. Style Variants

Use `cva` (class-variance-authority) to define variants:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // Base styles
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

### 3. Accessibility (a11y)

All components must support:

```tsx
// ARIA attributes
<button
  role="button"
  aria-label={ariaLabel}
  aria-disabled={disabled}
  aria-busy={loading}
>

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    onClick?.()
  }
  if (e.key === 'Escape') {
    onClose?.()
  }
}

// Focus management
const focusRef = useRef<HTMLElement>(null)
useEffect(() => {
  if (open) {
    focusRef.current?.focus()
  }
}, [open])
```

### 4. Responsive Design

```tsx
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Small desktop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large screen
}

// Responsive class example
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
">
```

## Layout Component Specification

### AdminLayout

```tsx
interface AdminLayoutProps {
  children: React.ReactNode
}

// Layout structure
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

### Sidebar State

```tsx
interface SidebarState {
  collapsed: boolean      // Is collapsed
  mobileOpen: boolean    // Mobile open state
  activeMenu: string     // Current active menu
  openMenus: string[]    // Expanded submenus
}

// Collapse widths
const SIDEBAR_WIDTH = 256        // Expanded 16rem
const SIDEBAR_COLLAPSED = 64     // Collapsed 4rem
```

### Header Component

```tsx
interface HeaderProps {
  showBreadcrumb?: boolean
  showSearch?: boolean
  showNotifications?: boolean
  showUserMenu?: boolean
}

// Component parts
<header className="h-16 border-b bg-background/95 backdrop-blur">
  <div className="flex items-center justify-between px-4 h-full">
    {/* Left side */}
    <div className="flex items-center gap-4">
      <SidebarTrigger />
      <Breadcrumb />
    </div>

    {/* Right side */}
    <div className="flex items-center gap-2">
      <GlobalSearch />
      <ThemeToggle />
      <NotificationDropdown />
      <UserDropdown />
    </div>
  </div>
</header>
```

## Form Component Specification

### Form Field Structure

```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="Enter email" {...field} />
      </FormControl>
      <FormDescription>
        We won't share your email
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Form Validation

```tsx
// Zod Schema
const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
```

## Data Table Specification

### DataTable Features

```tsx
interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]

  // Pagination
  pagination?: boolean
  pageSize?: number

  // Sorting
  sorting?: boolean
  defaultSort?: { id: string; desc: boolean }

  // Filtering
  filtering?: boolean
  globalFilter?: boolean

  // Selection
  selection?: boolean
  onSelectionChange?: (rows: T[]) => void

  // Actions
  actions?: (row: T) => React.ReactNode
}
```

### Column Definition Example

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
    header: 'Name',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
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
