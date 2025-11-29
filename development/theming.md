# 主题系统

本文档描述 HaloLight 的主题切换和皮肤预设系统。

## 主题模式

| 模式 | 描述 |
|------|------|
| light | 浅色主题 |
| dark | 深色主题 |
| system | 跟随系统 |

## 皮肤预设

共 11 种颜色皮肤：

| 皮肤 | Primary | 适用场景 |
|------|---------|----------|
| default | 蓝色 | 通用 |
| zinc | 灰色 | 简约 |
| slate | 蓝灰 | 专业 |
| stone | 棕灰 | 温暖 |
| gray | 中性灰 | 通用 |
| neutral | 黑白 | 极简 |
| red | 红色 | 警示 |
| rose | 玫红 | 时尚 |
| orange | 橙色 | 活力 |
| green | 绿色 | 自然 |
| blue | 蓝色 | 科技 |
| yellow | 黄色 | 明亮 |
| violet | 紫色 | 优雅 |

## CSS 变量

### 颜色变量定义

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### 皮肤变量

```css
[data-skin="rose"] {
  --primary: 346.8 77.2% 49.8%;
  --primary-foreground: 355.7 100% 97.3%;
}

[data-skin="green"] {
  --primary: 142.1 76.2% 36.3%;
  --primary-foreground: 355.7 100% 97.3%;
}
```

## 主题切换实现

### React Context

```tsx
interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system'
  skin: SkinPreset
  setTheme: (theme: string) => void
  setSkin: (skin: SkinPreset) => void
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('system')
  const [skin, setSkin] = useState<SkinPreset>('default')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    root.setAttribute('data-skin', skin)
  }, [theme, skin])

  return (
    <ThemeContext.Provider value={{ theme, skin, setTheme, setSkin }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### Vue Composable

```ts
export function useTheme() {
  const theme = ref<'light' | 'dark' | 'system'>('system')
  const skin = ref<SkinPreset>('default')

  const actualTheme = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme.value
  })

  watch([theme, skin], () => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(actualTheme.value)
    document.documentElement.setAttribute('data-skin', skin.value)
  }, { immediate: true })

  return { theme, skin, actualTheme }
}
```

## View Transitions API

### 主题切换动画 (Vue)

```ts
async function toggleTheme() {
  if (!document.startViewTransition) {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    return
  }

  await document.startViewTransition(() => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }).ready

  // 圆形展开动画
  const { clientX, clientY } = event
  const radius = Math.hypot(
    Math.max(clientX, window.innerWidth - clientX),
    Math.max(clientY, window.innerHeight - clientY)
  )

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`,
      ],
    },
    {
      duration: 500,
      easing: 'ease-in-out',
      pseudoElement: '::view-transition-new(root)',
    }
  )
}
```

### CSS 配置

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}
```

## 主题选择器组件

```tsx
function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" /> 浅色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" /> 深色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" /> 系统
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## 皮肤选择器

```tsx
function SkinSelector() {
  const { skin, setSkin } = useTheme()

  const skins: SkinPreset[] = [
    'default', 'zinc', 'slate', 'stone', 'gray',
    'neutral', 'red', 'rose', 'orange', 'green',
    'blue', 'yellow', 'violet'
  ]

  return (
    <div className="grid grid-cols-5 gap-2">
      {skins.map((s) => (
        <button
          key={s}
          onClick={() => setSkin(s)}
          className={cn(
            'h-8 w-8 rounded-full border-2',
            skin === s ? 'border-primary' : 'border-transparent'
          )}
          style={{ backgroundColor: `hsl(var(--skin-${s}))` }}
        />
      ))}
    </div>
  )
}
```

## ECharts 主题适配

```ts
const echartTheme = computed(() => ({
  backgroundColor: 'transparent',
  textStyle: {
    color: actualTheme.value === 'dark' ? '#e5e5e5' : '#333',
  },
  title: {
    textStyle: {
      color: actualTheme.value === 'dark' ? '#fff' : '#333',
    },
  },
  legend: {
    textStyle: {
      color: actualTheme.value === 'dark' ? '#e5e5e5' : '#333',
    },
  },
  xAxis: {
    axisLine: { lineStyle: { color: actualTheme.value === 'dark' ? '#444' : '#ccc' } },
    splitLine: { lineStyle: { color: actualTheme.value === 'dark' ? '#333' : '#eee' } },
  },
  yAxis: {
    axisLine: { lineStyle: { color: actualTheme.value === 'dark' ? '#444' : '#ccc' } },
    splitLine: { lineStyle: { color: actualTheme.value === 'dark' ? '#333' : '#eee' } },
  },
}))
```
