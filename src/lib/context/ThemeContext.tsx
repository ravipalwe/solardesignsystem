import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

// ============================================================================
// Types
// ============================================================================

export type SolarTheme = 'dark' | 'light' | 'dim' | 'system'

export interface ThemeTokens {
  bgCanvas: string
  bgSurface: string
  bgSurfaceHover: string
  bgMuted: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textLink: string
  borderSubtle: string
  borderContrast: string
  accentPrimary: string
  accentPrimaryDim: string
  accentAmber: string
  accentRose: string
  accentTeal: string
  accentPurple: string
  accentCyan: string
  accentSuccess: string
}

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: SolarTheme
  storageKey?: string
}

export interface ThemeContextValue {
  theme: SolarTheme
  resolvedTheme: 'dark' | 'light' | 'dim'
  setTheme: (theme: SolarTheme) => void
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ============================================================================
// Provider
// ============================================================================

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'solar-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<SolarTheme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    const stored = localStorage.getItem(storageKey)
    return (stored as SolarTheme) || defaultTheme
  })

  const resolvedTheme = useResolveTheme(theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme)
  }, [resolvedTheme])

  const setTheme = useCallback(
    (next: SolarTheme) => {
      setThemeState(next)
      localStorage.setItem(storageKey, next)
    },
    [storageKey],
  )

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ============================================================================
// Hook
// ============================================================================

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}

// ============================================================================
// Helpers
// ============================================================================

function useResolveTheme(theme: SolarTheme): 'dark' | 'light' | 'dim' {
  const [systemPref, setSystemPref] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemPref(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (theme === 'system') return systemPref
  return theme
}

// ============================================================================
// Custom theme utility
// ============================================================================

export function createTheme(name: string, tokens: ThemeTokens): string {
  const vars = [
    `--solar-bg-canvas: ${tokens.bgCanvas}`,
    `--solar-bg-surface: ${tokens.bgSurface}`,
    `--solar-bg-surface-hover: ${tokens.bgSurfaceHover}`,
    `--solar-bg-muted: ${tokens.bgMuted}`,
    `--solar-text-primary: ${tokens.textPrimary}`,
    `--solar-text-secondary: ${tokens.textSecondary}`,
    `--solar-text-tertiary: ${tokens.textTertiary}`,
    `--solar-text-link: ${tokens.textLink}`,
    `--solar-border-subtle: ${tokens.borderSubtle}`,
    `--solar-border-contrast: ${tokens.borderContrast}`,
    `--solar-accent-primary: ${tokens.accentPrimary}`,
    `--solar-accent-primary-dim: ${tokens.accentPrimaryDim}`,
    `--solar-accent-amber: ${tokens.accentAmber}`,
    `--solar-accent-rose: ${tokens.accentRose}`,
    `--solar-accent-teal: ${tokens.accentTeal}`,
    `--solar-accent-purple: ${tokens.accentPurple}`,
    `--solar-accent-cyan: ${tokens.accentCyan}`,
    `--solar-accent-success: ${tokens.accentSuccess}`,
  ]
  return `[data-theme="${name}"] { ${vars.join('; ')}; }`
}
