# Theme System

This document describes the theme switching and skin preset system for HaloLight.

## Theme Modes

| Mode | Description |
|------|------|
| light | Light theme |
| dark | Dark theme |
| system | Follow system |

## Skin Presets

11 color skins available:

| Skin | Primary | Use Case |
|------|---------|----------|
| default | Blue | General |
| zinc | Gray | Minimalist |
| slate | Blue-gray | Professional |
| stone | Brown-gray | Warm |
| gray | Neutral gray | General |
| neutral | Black & white | Minimal |
| red | Red | Alert |
| rose | Rose | Fashion |
| orange | Orange | Energetic |
| green | Green | Natural |
| blue | Blue | Tech |
| yellow | Yellow | Bright |
| violet | Violet | Elegant |

## CSS Variables

### Color Variable Definition

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

### Skin Variables

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

## Theme Switching Implementation

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

### Theme Switch Animation (Vue)

```ts
async function toggleTheme() {
  if (!document.startViewTransition) {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    return
  }

  await document.startViewTransition(() => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }).ready

  // Circular expand animation
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

### CSS Configuration

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

## Theme Selector Component

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
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Skin Selector

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

## ECharts Theme Adaptation

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
