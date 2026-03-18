# SOLAR Design System - Component Index

Complete reference for all components in the SOLAR Design System v1.5

## 📊 Dashboard Components (7)

### 1. Header
**File:** `src/components/Header.tsx`  
**Purpose:** Application header with branding and user avatar  
**Features:** Title, subtitle, user profile display

### 2. StatsGrid
**File:** `src/components/StatsGrid.tsx`  
**Purpose:** Grid of metric cards showing key statistics  
**Features:** Icons, values, change indicators, responsive grid  
**Props:** `timeRange: '7d' | '30d' | '90d'`

### 3. ChartCard
**File:** `src/components/ChartCard.tsx`  
**Purpose:** Card with bar chart visualization  
**Features:** Interactive bars, axis labels, summary metrics  
**Props:** `timeRange: '7d' | '30d' | '90d'`

### 4. RecentActivity
**File:** `src/components/RecentActivity.tsx`  
**Purpose:** List of recent activity items  
**Features:** Icons, timestamps, nested items with hover states

### 5. TopContent
**File:** `src/components/TopContent.tsx`  
**Purpose:** Top performing content items  
**Features:** Thumbnails, metrics (views, engagement, revenue), responsive

### 6. Dashboard
**File:** `src/components/Dashboard.tsx`  
**Purpose:** Complete dashboard layout composition  
**Features:** Header, stats, charts, activity - full page layout

### 7. DesignSystem
**File:** `src/components/DesignSystem.tsx`  
**Purpose:** Complete design system showcase  
**Features:** All design tokens, components, patterns demonstrated

---

## ⚡ Energy-Aware Components (5)

### 1. EnergyModeIndicator
**File:** `src/components/EnergyModeIndicator.tsx`  
**Purpose:** Display current energy mode based on grid intensity  
**Modes:** 
- Eco (🌱) - High intensity, minimal features
- Standard (⚡) - Moderate intensity, optimized
- Rich (☀️) - Low intensity, full features

**Props:**
```typescript
{
  mode?: 'eco' | 'standard' | 'rich'
  showDescription?: boolean
  compact?: boolean
}
```

**Usage:**
```tsx
<EnergyModeIndicator showDescription={true} />
<EnergyModeIndicator mode="eco" compact={true} />
```

---

### 2. CarbonFootprint
**File:** `src/components/CarbonFootprint.tsx`  
**Purpose:** Display carbon footprint of page/action in grams CO₂  
**Calculation:** Uses CO2.js methodology  

**Props:**
```typescript
{
  pageSizeKB?: number
  showBreakdown?: boolean
  serverLocation?: string
  compact?: boolean
}
```

**Usage:**
```tsx
<CarbonFootprint pageSizeKB={250} showBreakdown={true} />
<CarbonFootprint compact={true} />
```

**Impact Levels:**
- Excellent: < 0.5g CO₂
- Good: 0.5-1.0g
- Fair: 1.0-2.0g
- High: > 2.0g

---

### 3. ClickToLoadMedia
**File:** `src/components/ClickToLoadMedia.tsx`  
**Purpose:** Lazy-load facade for images/videos with user consent  
**Philosophy:** "Consensual data loading" - no auto-play

**Props:**
```typescript
{
  src: string
  type: 'image' | 'video'
  alt?: string
  thumbnail?: string
  dataSizeKB?: number
  carbonCostGrams?: number
  width?: string
  height?: string
  rounded?: string
}
```

**Usage:**
```tsx
<ClickToLoadMedia
  type="image"
  src="large-image.jpg"
  thumbnail="preview.jpg"
  dataSizeKB={850}
  alt="Description"
/>

<ClickToLoadMedia
  type="video"
  src="video.mp4"
  dataSizeKB={5120}
/>
```

---

### 4. GridStatusBadge
**File:** `src/components/GridStatusBadge.tsx`  
**Purpose:** Real-time grid carbon intensity display (gCO₂/kWh)  
**Integration:** Designed for Electricity Maps API

**Props:**
```typescript
{
  region?: string
  carbonIntensity?: number
  showDetails?: boolean
  compact?: boolean
}
```

**Usage:**
```tsx
<GridStatusBadge region="California, USA" showDetails={true} />
<GridStatusBadge carbonIntensity={180} compact={true} />
```

**Intensity Levels:**
- 🟢 Very Low: < 200 gCO₂/kWh
- 🟡 Low: 200-300
- 🟠 Moderate: 300-400
- 🔴 High: 400-500
- ⛔ Very High: > 500

---

### 5. DataCostBadge
**File:** `src/components/DataCostBadge.tsx`  
**Purpose:** Show environmental & financial cost before data transfer  
**Use Cases:** Downloads, video streaming, large assets

**Props:**
```typescript
{
  label: string
  dataSizeKB: number
  icon?: string
  showCarbonCost?: boolean
  showFinancialCost?: boolean
  costPerMB?: number
  onAcknowledge?: () => void
  dismissible?: boolean
}
```

**Usage:**
```tsx
<DataCostBadge
  label="Download PDF"
  icon="📄"
  dataSizeKB={450}
  showCarbonCost={true}
  dismissible={true}
/>

<DataCostBadge
  label="Stream Video HD"
  icon="🎬"
  dataSizeKB={12800}
  showCarbonCost={true}
  showFinancialCost={true}
  onAcknowledge={() => loadVideo()}
/>
```

---

## 🎨 Design Tokens

All components use consistent design tokens from `tailwind.config.js`:

### Colors
- **Background:** `appCanvas`, `cardSurface`, `cardSurfaceHover`, `badgeNeutral`
- **Text:** `primary`, `secondary`, `tertiary`, `link`
- **Accent:** `primary`, `primary-dim`, `solar-amber`, `oled-rose`, `deep-teal`, `purple`, `cyan`, `success`
- **Borders:** `subtle`, `contrast`

### Typography
- **Font:** System UI stack (zero HTTP requests)
- **Sizes:** 12px (xs), 14px (sm), 18px (lg), 24px (2xl)
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px

### Border Radius
- **card:** 24px
- **button:** 9999px (pill)
- **input:** 12px
- **badge:** 6px

---

## 🚀 Quick Import Reference

```typescript
// Dashboard components
import Header from './components/Header'
import StatsGrid from './components/StatsGrid'
import ChartCard from './components/ChartCard'
import RecentActivity from './components/RecentActivity'
import TopContent from './components/TopContent'
import Dashboard from './components/Dashboard'
import DesignSystem from './components/DesignSystem'

// Energy-aware components
import EnergyModeIndicator from './components/EnergyModeIndicator'
import CarbonFootprint from './components/CarbonFootprint'
import ClickToLoadMedia from './components/ClickToLoadMedia'
import GridStatusBadge from './components/GridStatusBadge'
import DataCostBadge from './components/DataCostBadge'

// Showcase
import EnergyAwareShowcase from './components/EnergyAwareShowcase'
```

---

## 📊 Component Stats

| Category | Count | Purpose |
|----------|-------|---------|
| Dashboard | 7 | Analytics & data visualization |
| Energy-Aware | 5 | Sustainable UX & carbon transparency |
| **Total** | **12** | Complete SOLAR system |

---

## 🎯 Usage Patterns

### Pattern 1: Complete Dashboard
```tsx
import Dashboard from './components/Dashboard'

function App() {
  return <Dashboard />
}
```

### Pattern 2: Energy-Aware App
```tsx
import { EnergyModeIndicator, CarbonFootprint } from './components'

function App() {
  return (
    <div>
      <header>
        <EnergyModeIndicator compact />
        <CarbonFootprint compact />
      </header>
      {/* ... rest of app */}
    </div>
  )
}
```

### Pattern 3: Conditional Loading Based on Energy Mode
```tsx
import { useState } from 'react'
import { EnergyModeIndicator, ClickToLoadMedia } from './components'

function Gallery() {
  const [mode, setMode] = useState<'eco' | 'standard' | 'rich'>('standard')
  
  return (
    <>
      <EnergyModeIndicator mode={mode} />
      
      {mode === 'rich' ? (
        <img src="high-res.jpg" />
      ) : (
        <ClickToLoadMedia type="image" src="high-res.jpg" />
      )}
    </>
  )
}
```

---

## 📚 Further Documentation

- **[README.md](./README.md)** - Project overview & quick start
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design documentation
- **[ENERGY_COMPONENTS.md](./ENERGY_COMPONENTS.md)** - Energy-aware components guide
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide
- **[SETUP.md](./SETUP.md)** - Setup instructions

---

**SOLAR Design System v1.5** - Built with 💚 for a sustainable web  
By Ravi Palwe | [solardesignsystem.org](https://solardesignsystem.org)

