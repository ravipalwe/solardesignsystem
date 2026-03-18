/** @type {import('tailwindcss').Config} */

function solarColor(variable) {
  return `rgb(var(${variable}) / <alpha-value>)`
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          appCanvas: solarColor("--solar-bg-canvas"),
          cardSurface: solarColor("--solar-bg-surface"),
          cardSurfaceHover: solarColor("--solar-bg-surface-hover"),
          elevated: solarColor("--solar-bg-elevated"),
          badgeNeutral: solarColor("--solar-bg-muted"),
          overlay: solarColor("--solar-bg-overlay"),
        },
        text: {
          primary: solarColor("--solar-text-primary"),
          secondary: solarColor("--solar-text-secondary"),
          tertiary: solarColor("--solar-text-tertiary"),
          link: solarColor("--solar-text-link"),
          inverse: solarColor("--solar-text-inverse"),
        },
        accent: {
          primary: solarColor("--solar-accent-primary"),
          'primary-hover': solarColor("--solar-accent-primary-hover"),
          'primary-dim': solarColor("--solar-accent-primary-dim"),
          'solar-amber': solarColor("--solar-accent-amber"),
          'oled-rose': solarColor("--solar-accent-rose"),
          'deep-teal': solarColor("--solar-accent-teal"),
          purple: solarColor("--solar-accent-purple"),
          cyan: solarColor("--solar-accent-cyan"),
          success: solarColor("--solar-accent-success"),
        },
        borders: {
          subtle: solarColor("--solar-border-subtle"),
          default: solarColor("--solar-border-default"),
          contrast: solarColor("--solar-border-contrast"),
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],     // 11px
        xs:    ['0.75rem',   { lineHeight: '1.125rem' }],  // 12px
        sm:    ['0.8125rem', { lineHeight: '1.25rem' }],   // 13px
        base:  ['0.875rem',  { lineHeight: '1.375rem' }],  // 14px
        lg:    ['1rem',      { lineHeight: '1.5rem' }],    // 16px
        xl:    ['1.125rem',  { lineHeight: '1.75rem' }],   // 18px
        '2xl': ['1.25rem',   { lineHeight: '1.875rem' }],  // 20px
        '3xl': ['1.5rem',    { lineHeight: '2rem' }],      // 24px
        '4xl': ['2rem',      { lineHeight: '2.5rem' }],    // 32px
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0em',
        wide: '0.02em',
        wider: '0.04em',
      },
      borderRadius: {
        none: '0',
        sm: '6px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        full: '9999px',
        // Semantic aliases
        card: '16px',
        button: '10px',
        input: '10px',
        badge: '6px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      boxShadow: {
        'solar-sm': 'var(--solar-shadow-sm)',
        'solar-md': 'var(--solar-shadow-md)',
        'solar-lg': 'var(--solar-shadow-lg)',
        'solar-focus': 'var(--solar-shadow-focus)',
      },
      transitionDuration: {
        fast: 'var(--solar-transition-fast)',
        base: 'var(--solar-transition-base)',
        slow: 'var(--solar-transition-slow)',
      },
      transitionTimingFunction: {
        solar: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
