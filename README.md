# Solar Design System

**Planet-first design system for sustainable digital experiences.**

Dark-first, OLED-friendly components with carbon budgets, energy-aware rendering, and accessibility baked in. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Energy-aware rendering** -- components adapt to device battery level and grid carbon intensity
- **Carbon tracking** -- built-in carbon budget utilities and per-component cost estimation
- **Dark-first design** -- OLED-optimized themes that reduce screen energy consumption
- **Accessible by default** -- WCAG 2.1 AA compliant with semantic markup and keyboard support
- **Tree-shakeable** -- import only what you need with zero side effects
- **TypeScript-first** -- full type definitions for every component, hook, and utility
- **Tailwind CSS integration** -- extends your existing Tailwind config with energy-conscious design tokens

## Installation

```bash
npm install @solar-ds/design-system
```

**Peer dependencies:** `react >= 18.2` and `react-dom >= 18.2`

## Quick Start

```tsx
import { Button, EnergyAwareProvider } from '@solar-ds/design-system'
import '@solar-ds/design-system/styles'

function App() {
  return (
    <EnergyAwareProvider>
      <Button variant="primary">Get Started</Button>
    </EnergyAwareProvider>
  )
}
```

## Components

### Dashboard

- `Header` -- top-level navigation bar with energy mode indicator
- `StatsGrid` -- grid layout for key metric cards
- `ChartCard` -- data visualization container with lazy rendering
- `RecentActivity` -- time-ordered activity feed
- `TopContent` -- featured content highlight section

### Energy-Aware

- `EnergyModeIndicator` -- displays current energy mode (eco, balanced, performance)
- `CarbonFootprint` -- visualizes estimated carbon cost of a page or component
- `ClickToLoadMedia` -- defers media loading until user interaction
- `GridStatusBadge` -- shows real-time electricity grid carbon intensity
- `DataCostBadge` -- displays estimated data transfer cost
- `CarbonBudgetBar` -- progress bar tracking carbon budget consumption
- `AdaptiveImage` -- serves image quality based on device energy profile
- `DeferredContent` -- delays rendering of non-critical content
- `PrintCarbonLabel` -- carbon cost label for print stylesheets
- `SustainabilityScorecard` -- overall sustainability metrics dashboard

### Form

- `Button` -- primary action element with energy-aware variants
- `Input` -- text input with built-in validation
- `Textarea` -- multi-line text input
- `Select` -- dropdown selection control
- `Checkbox` -- binary toggle with label support
- `Radio` -- single-select option within a group
- `Switch` -- on/off toggle control

## Hooks

- **`useDeviceEnergyProfile`** -- returns battery level, charging status, and recommended energy mode
- **`useGridIntensity`** -- fetches real-time carbon intensity of the user's electricity grid
- **`useCarbonCost`** -- estimates the carbon cost of a component or interaction
- **`useVisibilityPause`** -- pauses expensive operations when the tab is not visible
- **`useResourceObserver`** -- monitors network requests and resource consumption
- **`useCarbonBudget`** -- tracks cumulative carbon spend against a configurable budget

## Tailwind Config

Extend your Tailwind configuration with Solar design tokens:

```js
// tailwind.config.js
const solarConfig = require('@solar-ds/design-system/tailwind')

module.exports = {
  presets: [solarConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@solar-ds/design-system/dist/**/*.{js,mjs}',
  ],
}
```

## Development

```bash
npm run dev          # showcase app
npm run storybook    # component explorer
npm run test         # unit tests
npm run build:lib    # library build
```

## License

MIT

---

Created by [Ravi Palwe](https://github.com/ravipalwe) | [GitHub](https://github.com/ravipalwe/solardesignsystem)
