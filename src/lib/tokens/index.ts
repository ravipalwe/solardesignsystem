// ============================================================================
// Solar Design System — Design Tokens
// ============================================================================
// These tokens mirror the Tailwind config and can be used programmatically
// (e.g., in JS/TS logic, inline styles, or non-Tailwind contexts).

export const colors = {
  background: {
    appCanvas: '#000000',
    cardSurface: '#121212',
    cardSurfaceHover: '#1A1A1A',
    badgeNeutral: '#262626',
  },
  text: {
    primary: '#E5E5E5',
    secondary: '#A3A3A3',
    tertiary: '#737373',
    link: '#DDEE88',
  },
  accent: {
    primary: '#DDEE88',
    primaryDim: '#BBDD55',
    solarAmber: '#F59E0B',
    oledRose: '#E11D48',
    deepTeal: '#0D9488',
    purple: '#A78BFA',
    cyan: '#22D3EE',
    success: '#34D399',
  },
  borders: {
    subtle: '#262626',
    contrast: '#404040',
  },
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const

export const radii = {
  card: '24px',
  button: '9999px',
  input: '12px',
  badge: '6px',
} as const

export const fontFamily = {
  sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
} as const

export const letterSpacing = {
  tight: '-0.01em',
  wide: '0.05em',
} as const

export const tokens = {
  colors,
  spacing,
  radii,
  fontFamily,
  letterSpacing,
} as const

export default tokens
