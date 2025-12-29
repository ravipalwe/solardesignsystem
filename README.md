# Solar Design System

**Planet-first design system for digital experiences** - A comprehensive, energy-efficient design system built for modern web applications. SOLAR combats digital bloat with energy-aware components, design tokens, and carbon budgets baked into the process.

![Solar Design System](https://img.shields.io/badge/version-1.5.0-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

> Created by **Ravi Palwe** - Product Designer with 20+ years of experience crafting accessible, high-performing interfaces. Learn more at [solardesignsystem.org](https://solardesignsystem.org)

## ✨ Features

- 🌑 **Dark-first design** - Optimized for OLED energy savings
- 🌍 **Energy-aware components** - Grid-responsive, carbon-transparent UI elements
- 🎨 **Comprehensive color system** - 7 accent colors with semantic meaning
- 📱 **Fully responsive** - Mobile-first approach
- ♿ **Accessible** - WCAG AA compliant contrast ratios
- ⚡ **Performance-focused** - System fonts, no shadows, minimal rendering
- 🎯 **Type-safe** - Full TypeScript support
- 📚 **Complete component library** - 12 components including 5 energy-aware

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

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

The design system showcase will be displayed, showing all available components and design tokens.

## 📦 Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

```bash
npm run preview
```

Preview the production build locally.

## 🎨 Design Tokens

### Colors

- **Primary (Matcha)**: `#DDEE88` - Primary accent, buttons, highlights
- **Solar Amber**: `#F59E0B` - Warning states
- **OLED Rose**: `#E11D48` - Error states
- **Deep Teal**: `#0D9488` - Info states
- **Cyan**: `#22D3EE` - Views, informational
- **Purple**: `#A78BFA` - Engagement metrics
- **Success**: `#34D399` - Success states

### Typography

Uses system fonts for zero network footprint:
```css
system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
```

### Spacing Scale

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px

## 📚 Components

### Dashboard Components
- ✅ Header
- ✅ StatsGrid (with metric cards)
- ✅ ChartCard
- ✅ RecentActivity
- ✅ TopContent
- ✅ Dashboard (complete layout)
- ✅ DesignSystem (component showcase)

### ⚡ Energy-Aware Components

**Planet-first components that make environmental costs visible:**

- ✅ **EnergyModeIndicator** - Shows current energy mode (Eco/Standard/Rich) based on grid intensity
- ✅ **CarbonFootprint** - Displays page carbon cost in grams CO₂
- ✅ **ClickToLoadMedia** - Lazy-load facade for images/videos (consensual data loading)
- ✅ **GridStatusBadge** - Real-time grid carbon intensity display
- ✅ **DataCostBadge** - Shows environmental & financial cost of data-heavy actions

**📖 Full documentation:** [ENERGY_COMPONENTS.md](./ENERGY_COMPONENTS.md)

## 📖 Documentation

For complete documentation, see:
- **[ENERGY_COMPONENTS.md](./ENERGY_COMPONENTS.md)** - Energy-aware components documentation
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design tokens, colors, typography, and patterns
- **[COMPONENTS.md](./COMPONENTS.md)** - Component index and reference
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions

## 🌍 SOLAR Mission

SOLAR is a response to **digital bloat** - the unnecessary energy consumption of modern web applications. By making environmental costs visible and controllable, SOLAR empowers designers and developers to create sustainable digital experiences.

### Core Principles

1. **Dark Default** - OLED energy savings through pure black backgrounds
2. **System-First Typography** - Zero network footprint for fonts
3. **Grid-Awareness** - Adapt experience based on local energy carbon intensity
4. **Consensual Data** - No auto-play media; users "click-to-pay" the energy cost
5. **Carbon Budgets** - Performance and carbon budgets baked into the process

### Why It Matters

- The internet accounts for ~4% of global greenhouse gas emissions
- A typical website visit produces 0.5-2g CO₂
- Auto-playing videos and large images waste energy on renewable grids
- Users deserve transparency about data and carbon costs

**Learn more:** [solardesignsystem.org](https://solardesignsystem.org)

## 🎯 Usage Example

```tsx
import React from 'react'

const MyComponent = () => {
  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <h2 className="text-lg font-semibold mb-4">Card Title</h2>
      <button className="bg-accent-primary text-black rounded-button px-6 py-2.5 text-sm font-semibold hover:bg-accent-primary-dim transition-colors">
        Click Me
      </button>
    </div>
  )
}
```

## 🏗️ Project Structure

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
├── DESIGN_SYSTEM.md              # Complete documentation
├── SETUP.md                      # Setup instructions
└── README.md                     # This file
```

## 🎨 Design Philosophy

### Dark Default
Interface defaults to dark mode (#000000) for OLED energy savings.

### System Typography
Uses native OS fonts to eliminate HTTP requests and improve performance.

### Minimal Rendering
No shadows used. Depth achieved via border contrast and background color differences.

### Accessibility First
All text meets WCAG AA standards with high contrast ratios.

## 🔧 Customization

All design tokens are defined in `tailwind.config.js`. You can extend or modify colors, spacing, and other tokens as needed.

## 📝 License

This design system is provided as-is for use in your projects.

## 🤝 Contributing

Feel free to use this design system in your projects. If you make improvements, consider sharing them back!

---

**Version**: 1.0.0  
**Built with**: React, TypeScript, Tailwind CSS v3, Vite

