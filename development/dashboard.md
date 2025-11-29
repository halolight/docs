# 仪表盘

本文档描述 HaloLight 可拖拽仪表盘的实现规范。

## 技术选型

| 框架 | 拖拽库 |
|------|--------|
| React/Next.js | react-grid-layout |
| Vue 3 | grid-layout-plus |
| Svelte | svelte-grid |
| Angular | angular-gridster2 |

## Widget 类型

| ID | 类型 | 默认尺寸 | 描述 |
|----|------|----------|------|
| stats | 统计卡片 | 3x2 | 数字统计展示 |
| chart-line | 折线图 | 6x4 | 趋势数据 |
| chart-bar | 柱状图 | 6x4 | 对比数据 |
| chart-pie | 饼图 | 4x4 | 占比数据 |
| recent-users | 最近用户 | 4x4 | 用户列表 |
| notifications | 通知 | 4x4 | 消息列表 |
| tasks | 任务 | 4x4 | 待办事项 |
| calendar | 日历 | 4x4 | 日程安排 |
| quick-actions | 快捷操作 | 3x2 | 常用功能 |

## 布局配置

### 响应式断点

```ts
const breakpoints = { lg: 1200, md: 996, sm: 768 }
const cols = { lg: 12, md: 8, sm: 4 }
```

### 布局数据结构

```ts
interface GridLayout {
  i: string      // Widget ID
  x: number      // 列位置 (0-based)
  y: number      // 行位置
  w: number      // 宽度 (列数)
  h: number      // 高度 (行数)
  minW?: number  // 最小宽度
  minH?: number  // 最小高度
  static?: boolean // 是否固定
}
```

### 默认布局

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

## React 实现

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

## Vue 实现

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

## Widget 组件

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

## ECharts 集成

### 主题适配

```ts
const getChartTheme = (isDark: boolean) => ({
  backgroundColor: 'transparent',
  textStyle: { color: isDark ? '#e5e5e5' : '#333' },
  axisLine: { lineStyle: { color: isDark ? '#444' : '#ccc' } },
  splitLine: { lineStyle: { color: isDark ? '#333' : '#eee' } },
})
```

### 响应式尺寸

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

## 编辑模式

### 工具栏

```tsx
function DashboardToolbar() {
  const { isEditing, toggleEditing, resetLayout } = useDashboardStore()

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={toggleEditing}>
        {isEditing ? <Check /> : <Edit />}
        {isEditing ? '完成' : '编辑'}
      </Button>
      {isEditing && (
        <>
          <AddWidgetButton />
          <Button variant="outline" onClick={resetLayout}>
            <RotateCcw /> 重置
          </Button>
        </>
      )}
    </div>
  )
}
```

## 持久化

```ts
// 布局保存到 localStorage
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
