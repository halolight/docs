# Dashboard

This document describes the implementation specification for the HaloLight draggable dashboard.

## Technology Stack

| Framework | Drag Library |
|------|--------|
| React/Next.js | react-grid-layout |
| Vue 3 | grid-layout-plus |
| Svelte | svelte-grid |
| Angular | angular-gridster2 |

## Widget Types

| ID | Type | Default Size | Description |
|----|------|----------|------|
| stats | Stats card | 3x2 | Numeric statistics |
| chart-line | Line chart | 6x4 | Trend data |
| chart-bar | Bar chart | 6x4 | Comparison data |
| chart-pie | Pie chart | 4x4 | Proportion data |
| recent-users | Recent users | 4x4 | User list |
| notifications | Notifications | 4x4 | Message list |
| tasks | Tasks | 4x4 | Todo items |
| calendar | Calendar | 4x4 | Schedule |
| quick-actions | Quick actions | 3x2 | Common functions |

## Layout Configuration

### Responsive Breakpoints

```ts
const breakpoints = { lg: 1200, md: 996, sm: 768 }
const cols = { lg: 12, md: 8, sm: 4 }
```

### Layout Data Structure

```ts
interface GridLayout {
  i: string      // Widget ID
  x: number      // Column position (0-based)
  y: number      // Row position
  w: number      // Width (columns)
  h: number      // Height (rows)
  minW?: number  // Minimum width
  minH?: number  // Minimum height
  static?: boolean // Is static
}
```

### Default Layout

```ts
const defaultLayouts = {
  lg: [
    { i: 'stats-1', x: 0, y: 0, w: 3, h: 2 },
    { i: 'stats-2', x: 3, y: 0, w: 3, h: 2 },
    { i: 'stats-3', x: 6, y: 0, w: 3, h: 2 },
    { i: 'stats-4', x: 9, y: 0, w: 3, h: 2 },
    { i: 'chart-line', x: 0, y: 2, w: 8, h: 4 },
    { i: 'chart-pie', x: 8, y: 2, w: 4, h: 4 },
    { i: 'recent-users', x: 0, y: 6, w: 4, h: 4 },
    { i: 'tasks', x: 4, y: 6, w: 4, h: 4 },
    { i: 'notifications', x: 8, y: 6, w: 4, h: 4 },
  ],
}
```

## React Implementation

```tsx
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

function Dashboard() {
  const { layouts, updateLayout, isEditing } = useDashboardStore()

  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 8, sm: 4 }}
      rowHeight={80}
      isDraggable={isEditing}
      isResizable={isEditing}
      onLayoutChange={(layout, allLayouts) => {
        updateLayout(allLayouts)
      }}
    >
      {widgets.map((widget) => (
        <div key={widget.id}>
          <WidgetWrapper widget={widget} />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
```

## Vue Implementation

```vue
<template>
  <GridLayout
    v-model:layout="layout"
    :col-num="12"
    :row-height="80"
    :is-draggable="isEditing"
    :is-resizable="isEditing"
  >
    <GridItem
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
    >
      <WidgetWrapper :widget="getWidget(item.i)" />
    </GridItem>
  </GridLayout>
</template>

<script setup>
import { GridLayout, GridItem } from 'grid-layout-plus'
</script>
```

## Widget Components

### WidgetWrapper

```tsx
interface WidgetWrapperProps {
  widget: WidgetConfig
  onRemove?: () => void
}

function WidgetWrapper({ widget, onRemove }: WidgetWrapperProps) {
  const { isEditing } = useDashboardStore()

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between py-2">
        <CardTitle className="text-sm">{widget.title}</CardTitle>
        {isEditing && (
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <WidgetContent type={widget.type} settings={widget.settings} />
      </CardContent>
    </Card>
  )
}
```

### StatsWidget

```tsx
function StatsWidget({ title, value, change, icon: Icon }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className={cn('text-xs', change > 0 ? 'text-green-500' : 'text-red-500')}>
          {change > 0 ? '+' : ''}{change}%
        </p>
      </div>
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
  )
}
```

## ECharts Integration

### Theme Adaptation

```ts
const getChartTheme = (isDark: boolean) => ({
  backgroundColor: 'transparent',
  textStyle: { color: isDark ? '#e5e5e5' : '#333' },
  axisLine: { lineStyle: { color: isDark ? '#444' : '#ccc' } },
  splitLine: { lineStyle: { color: isDark ? '#333' : '#eee' } },
})
```

### Responsive Sizing

```tsx
function ChartWidget({ option }) {
  const chartRef = useRef<EChartsInstance>()

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      chartRef.current?.resize()
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return <ReactECharts ref={chartRef} option={option} />
}
```

## Edit Mode

### Toolbar

```tsx
function DashboardToolbar() {
  const { isEditing, toggleEditing, resetLayout } = useDashboardStore()

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={toggleEditing}>
        {isEditing ? <Check /> : <Edit />}
        {isEditing ? 'Done' : 'Edit'}
      </Button>
      {isEditing && (
        <>
          <AddWidgetButton />
          <Button variant="outline" onClick={resetLayout}>
            <RotateCcw /> Reset
          </Button>
        </>
      )}
    </div>
  )
}
```

## Persistence

```ts
// Save layout to localStorage
const useDashboardStore = create(
  persist(
    (set) => ({
      layouts: defaultLayouts,
      updateLayout: (layouts) => set({ layouts }),
    }),
    { name: 'dashboard-layout' }
  )
)
```
