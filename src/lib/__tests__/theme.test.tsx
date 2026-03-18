import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme, createTheme } from '../context/ThemeContext'

function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('dim')}>Dim</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to dark theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(screen.getByTestId('resolved').textContent).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('respects defaultTheme prop', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('switches theme on setTheme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByText('Light'))
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(screen.getByTestId('resolved').textContent).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('persists theme to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByText('Dim'))
    expect(localStorage.getItem('solar-theme')).toBe('dim')
  })

  it('restores theme from localStorage', () => {
    localStorage.setItem('solar-theme', 'light')
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('uses custom storageKey', () => {
    render(
      <ThemeProvider storageKey="my-theme">
        <ThemeConsumer />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByText('Light'))
    expect(localStorage.getItem('my-theme')).toBe('light')
  })

  it('resolves system theme based on media query', () => {
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('system')
    // jsdom defaults to no match → light
    expect(screen.getByTestId('resolved').textContent).toBe('light')
  })

  it('throws when useTheme used outside provider', () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within a ThemeProvider',
    )
  })
})

describe('createTheme', () => {
  it('generates valid CSS string', () => {
    const css = createTheme('ocean', {
      bgCanvas: '10 20 40',
      bgSurface: '20 30 50',
      bgSurfaceHover: '30 40 60',
      bgMuted: '40 50 70',
      textPrimary: '220 230 240',
      textSecondary: '160 170 180',
      textTertiary: '100 110 120',
      textLink: '80 180 255',
      borderSubtle: '40 50 70',
      borderContrast: '70 80 100',
      accentPrimary: '80 180 255',
      accentPrimaryDim: '60 150 220',
      accentAmber: '245 158 11',
      accentRose: '225 29 72',
      accentTeal: '13 148 136',
      accentPurple: '167 139 250',
      accentCyan: '34 211 238',
      accentSuccess: '52 211 153',
    })
    expect(css).toContain('[data-theme="ocean"]')
    expect(css).toContain('--solar-bg-canvas: 10 20 40')
    expect(css).toContain('--solar-accent-primary: 80 180 255')
  })
})
