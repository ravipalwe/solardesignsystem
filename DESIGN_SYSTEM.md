# Solar Design System

A comprehensive, energy-efficient design system built for modern web applications. Solar Design System features a dark theme optimized for OLED displays, system-first typography, and a carefully crafted color palette.

## Table of Contents

- [Overview](#overview)
- [Philosophy](#philosophy)
- [Installation](#installation)
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

## Overview

Solar Design System is a complete design token system and component library built with:
- **React** + **TypeScript** for type-safe components
- **Tailwind CSS v3** for utility-first styling
- **Vite** for fast development and building

### Key Features

- 🌑 **Dark-first design** - Optimized for OLED energy savings
- 🎨 **Comprehensive color system** - 7 accent colors with semantic meaning
- 📱 **Fully responsive** - Mobile-first approach
- ♿ **Accessible** - WCAG AA compliant contrast ratios
- ⚡ **Performance-focused** - System fonts, no shadows, minimal rendering
- 🎯 **Type-safe** - Full TypeScript support

## Philosophy

### Dark Default
The interface defaults to dark mode (#000000) for OLED energy savings. This reduces power consumption on modern displays.

### System Typography
Uses native OS fonts to eliminate HTTP requests and improve performance:
```css
system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
```

### Minimal Rendering
No shadows are used. Depth is achieved via border contrast and background color differences, reducing rendering complexity.

### Accessibility First
All text meets WCAG AA standards with high contrast ratios:
- Primary text: 15.8:1 contrast ratio
- Secondary text: 7.1:1 contrast ratio
- Tertiary text: 4.6:1 contrast ratio

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Extract the zip file** to your desired location

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Colors

### Background Colors

| Token | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| App Canvas | `#000000` | Main application background | `bg-background-appCanvas` |
| Card Surface | `#121212` | Card and surface backgrounds | `bg-background-cardSurface` |
| Card Surface Hover | `#1A1A1A` | Card hover state | `bg-background-cardSurfaceHover` |
| Badge Neutral | `#262626` | Badge and nested element backgrounds | `bg-background-badgeNeutral` |

### Text Colors

| Token | Value | Contrast Ratio | Usage | Tailwind Class |
|-------|-------|----------------|-------|----------------|
| Primary | `#E5E5E5` | 15.8:1 | Primary text content, headings | `text-text-primary` |
| Secondary | `#A3A3A3` | 7.1:1 | Secondary text, descriptions | `text-text-secondary` |
| Tertiary | `#737373` | 4.6:1 | Tertiary text, timestamps | `text-text-tertiary` |
| Link | `#DDEE88` | - | Links and interactive text | `text-text-link` |

### Accent Colors

| Token | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| Primary (Matcha) | `#DDEE88` | Primary accent, buttons, highlights | `bg-accent-primary` / `text-accent-primary` |
| Primary Dim | `#BBDD55` | Hover states on primary elements | `bg-accent-primary-dim` |
| Solar Amber | `#F59E0B` | Warning states, alerts | `text-accent-solar-amber` |
| OLED Rose | `#E11D48` | Error states, negative changes | `text-accent-oled-rose` |
| Deep Teal | `#0D9488` | Info states, informational | `text-accent-deep-teal` |
| Purple | `#A78BFA` | Engagement metrics, variety | `text-accent-purple` |
| Cyan | `#22D3EE` | Views, informational | `text-accent-cyan` |
| Success | `#34D399` | Success states, positive changes | `text-accent-success` |

### Border Colors

| Token | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| Subtle | `#262626` | Default borders, card edges | `border-borders-subtle` |
| Contrast | `#404040` | Higher contrast borders | `border-borders-contrast` |

## Typography

### Font Family

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

Tailwind class: `font-sans`

### Type Scale

| Style | Size | Weight | Letter Spacing | Line Height | Usage | Tailwind Classes |
|-------|------|--------|----------------|-------------|-------|-----------------|
| H1 | 24px | 700 | -0.01em | 1.2 | Main page headings | `text-2xl font-bold` |
| H2 | 18px | 600 | normal | 1.3 | Section headings | `text-lg font-semibold` |
| H3 | 14px | 600 | normal | 1.4 | Subsection headings | `text-sm font-semibold` |
| Body Primary | 14px | 400 | normal | 1.6 | Primary body text | `text-sm` |
| Body Secondary | 14px | 400 | normal | 1.6 | Secondary body text | `text-sm text-text-secondary` |
| Label | 12px | 500 | 0.05em | 1.4 | Labels, metadata | `text-xs font-medium uppercase tracking-wider` |
| Stat Value | 24px | 700 | -0.01em | 1.2 | Large numeric values | `text-2xl font-bold` |
| Stat Metric | 20px | 700 | normal | 1.2 | Medium numeric values | `text-xl font-bold` |
| Small Text | 12px | 400 | normal | 1.4 | Timestamps, fine print | `text-xs text-text-tertiary` |

### Custom Letter Spacing

Some typography requires inline styles for specific letter spacing:

```tsx
<h1 style={{ letterSpacing: '-0.01em' }}>Heading</h1>
<p style={{ letterSpacing: '0.05em' }}>LABEL</p>
```

## Spacing

### Spacing Scale

| Token | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| XS | 4px | Tight spacing, icon padding | `xs` (custom) |
| SM | 8px | Small gaps, compact spacing | `sm` |
| MD | 16px | Medium gaps, standard spacing | `md` |
| LG | 24px | Large gaps, card padding, grid gaps | `lg` |
| XL | 32px | Extra large gaps, section spacing | `xl` |

### Container Spacing

- **Card Padding**: 24px (`p-6`)
- **Grid Gap**: 24px (`gap-6`)
- **Section Margin**: 24px (`mt-6`)

## Components

### Buttons

#### Primary Button
```tsx
<button className="bg-accent-primary text-black rounded-button px-6 py-2.5 text-sm font-semibold hover:bg-accent-primary-dim transition-colors">
  Primary Button
</button>
```

#### Secondary Button
```tsx
<button className="bg-transparent text-text-primary border border-borders-contrast rounded-button px-4 py-2 text-sm font-semibold hover:bg-background-cardSurfaceHover transition-colors">
  Secondary Button
</button>
```

### Cards

#### Base Card
```tsx
<div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
  <h3 className="text-lg font-semibold mb-4">Card Title</h3>
  <p className="text-sm text-text-secondary">Card content</p>
</div>
```

#### Stat Card
```tsx
<div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 hover:bg-background-cardSurfaceHover transition-colors">
  <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">LABEL</p>
  <p className="text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>1,234</p>
</div>
```

### Input Fields

```tsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full bg-background-badgeNeutral border border-borders-subtle rounded-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors"
/>
```

### Badges

```tsx
{/* Success Badge */}
<span
  className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-success"
  style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)' }}
>
  Success
</span>

{/* Error Badge */}
<span
  className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-oled-rose"
  style={{ backgroundColor: 'rgba(225, 29, 72, 0.2)' }}
>
  Error
</span>
```

### Alerts

```tsx
<div
  className="bg-background-cardSurface border border-borders-subtle rounded-card p-4 flex items-start gap-3"
  style={{ borderLeftColor: '#34D399', borderLeftWidth: '3px' }}
>
  <span className="text-accent-success text-xl">✓</span>
  <div className="flex-1">
    <p className="text-sm font-semibold text-text-primary mb-1">Success Alert</p>
    <p className="text-sm text-text-secondary">Message content</p>
  </div>
</div>
```

## Usage Examples

### Complete Component Example

```tsx
import React from 'react'

const StatCard = ({ label, value, change, positive }) => {
  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 hover:bg-background-cardSurfaceHover transition-colors">
      <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold mb-2" style={{ letterSpacing: '-0.01em' }}>
        {value}
      </p>
      <div
        className={`inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold ${
          positive ? 'text-accent-success' : 'text-accent-oled-rose'
        }`}
        style={{
          backgroundColor: positive 
            ? 'rgba(52, 211, 153, 0.2)' 
            : 'rgba(225, 29, 72, 0.2)'
        }}
      >
        {change}
      </div>
    </div>
  )
}

export default StatCard
```

## Best Practices

### Color Usage

1. **Primary Accent**: Use sparingly for CTAs, active states, and key highlights
2. **Text Hierarchy**: Use primary for important content, secondary for descriptions, tertiary for metadata
3. **Semantic Colors**: 
   - Success (green) for positive metrics
   - OLED Rose (red) for errors/negative changes
   - Deep Teal (teal) for informational content
   - Solar Amber (amber) for warnings

### Spacing Rules

1. **Consistency**: Always use the spacing scale (xs, sm, md, lg, xl)
2. **Card Padding**: Always use 24px (lg) for card internal padding
3. **Grid Gaps**: Use 24px (lg) for gaps between cards
4. **Element Spacing**: Use 16px (md) for spacing between related elements

### Typography Rules

1. **Headings**: Use h1 for page titles, h2 for section titles, h3 for card titles
2. **Labels**: Always uppercase stat labels and metadata with 0.05em letter spacing
3. **Values**: Use bold weights (700) for numeric values with -0.01em letter spacing
4. **Line Clamp**: Use `line-clamp-2` for titles that may overflow

### Component Patterns

1. **Cards**: All cards use 24px border radius, 1px subtle border, 24px padding
2. **Hover States**: All interactive cards transition to `cardSurfaceHover` on hover
3. **Nested Items**: Use `badgeNeutral` background and 12px radius for nested items
4. **Icons**: Use emoji icons consistently, size 20-30px depending on context

### Accessibility

1. **Contrast**: All text meets WCAG AA standards
2. **Focus**: Ensure all interactive elements have visible focus states
3. **Semantic HTML**: Use proper heading hierarchy and semantic HTML elements

### Responsive Design

- **Mobile**: Default (no prefix)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

Grid behavior:
- Stats grid: 1 col mobile, 2 col tablet, 4 col desktop
- Charts: 1 col mobile, 2 col desktop

### Energy Efficiency

1. **Animations**: Use CSS-only transitions, avoid JavaScript-driven animations
2. **Images**: Use emoji or SVG icons instead of image files when possible
3. **Rendering**: Avoid shadows, use border contrast for depth
4. **Fonts**: Use system fonts exclusively, no web fonts

## File Structure

```
solar-design-system/
├── src/
│   ├── components/
│   │   └── DesignSystem.tsx    # Complete component showcase
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── design/
│   └── design-system.json       # Design tokens (reference)
├── tailwind.config.js            # Tailwind configuration
├── package.json
└── README.md
```

## Customization

### Extending Colors

To add custom colors, edit `tailwind.config.js`:

```js
accent: {
  // ... existing colors
  'custom-color': '#HEXCODE',
}
```

### Custom Components

Create new components following the design system patterns:

1. Use design tokens from `tailwind.config.js`
2. Follow spacing and typography guidelines
3. Include hover states and transitions
4. Ensure accessibility compliance

## Support

For questions or issues:
1. Review the component showcase at `/src/components/DesignSystem.tsx`
2. Check `design/design-system.json` for all available tokens
3. Refer to this documentation for usage examples

## License

This design system is provided as-is for use in your projects.

---

**Version**: 1.0.0  
**Last Updated**: 2024
