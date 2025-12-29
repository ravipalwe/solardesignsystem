# Solar Design System

A comprehensive, energy-efficient design system built for modern web applications. Solar Design System features a dark theme optimized for OLED displays, system-first typography, and a carefully crafted color palette.

![Solar Design System](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

- 🌑 **Dark-first design** - Optimized for OLED energy savings
- 🎨 **Comprehensive color system** - 7 accent colors with semantic meaning
- 📱 **Fully responsive** - Mobile-first approach
- ♿ **Accessible** - WCAG AA compliant contrast ratios
- ⚡ **Performance-focused** - System fonts, no shadows, minimal rendering
- 🎯 **Type-safe** - Full TypeScript support
- 📚 **Complete component library** - 20+ pre-built components

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

The design system includes:

- ✅ Buttons (Primary, Secondary, Time Range)
- ✅ Input Fields (Text, Search, Textarea)
- ✅ Select/Dropdown
- ✅ Checkbox & Radio Buttons
- ✅ Switch/Toggle
- ✅ Tabs
- ✅ Badges/Tags
- ✅ Alerts/Notifications
- ✅ Progress Bars
- ✅ Slider/Range
- ✅ Dividers
- ✅ Avatars
- ✅ Loading States
- ✅ Empty States
- ✅ Tooltip
- ✅ Modal/Dialog
- ✅ Navigation Items
- ✅ Cards (Stat, Chart, Activity, Content)

## 📖 Documentation

For complete documentation, see **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**

The documentation includes:
- Complete color reference
- Typography guide
- Component examples
- Usage patterns
- Best practices
- Accessibility guidelines

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

