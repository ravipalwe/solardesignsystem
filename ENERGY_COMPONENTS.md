# Energy-Aware Components

Planet-first components for the SOLAR Design System that make environmental and data costs visible and controllable.

## 🌍 Overview

These five components embody the SOLAR framework's mission to combat digital bloat by:
- Making energy consumption visible
- Requiring user consent for data transfer
- Adapting to grid carbon intensity
- Displaying carbon and data costs transparently

## 📦 Components

### 1. **EnergyModeIndicator**

Displays the current energy mode (Eco/Standard/Rich) based on grid carbon intensity.

```tsx
// Full display with description
<EnergyModeIndicator showDescription={true} />

// Compact badge
<EnergyModeIndicator mode="eco" compact={true} />

// Auto-detect based on time (or connect to real API)
<EnergyModeIndicator />
```

**Props:**
- `mode?: 'eco' | 'standard' | 'rich'` - Manual override for energy mode
- `showDescription?: boolean` - Show detailed description (default: true)
- `compact?: boolean` - Icon + label only (default: false)

**Energy Modes:**
- **Eco** (🌱): High grid intensity. Images hidden, animations disabled.
- **Standard** (⚡): Moderate intensity. Optimized images, CSS animations only.
- **Rich** (☀️): Green grid detected. Full experience enabled.

---

### 2. **CarbonFootprint**

Shows the carbon footprint of a page or action in grams of CO₂.

```tsx
// Full display with breakdown
<CarbonFootprint 
  pageSizeKB={250} 
  showBreakdown={true}
  serverLocation="Global CDN"
/>

// Compact inline badge
<CarbonFootprint pageSizeKB={150} compact={true} />
```

**Props:**
- `pageSizeKB?: number` - Page size (auto-calculated if not provided)
- `showBreakdown?: boolean` - Show detailed calculation (default: false)
- `serverLocation?: string` - Server location for context (default: "Global Average")
- `compact?: boolean` - Compact badge mode (default: false)

**Calculation:**
Uses [CO2.js methodology](https://www.thegreenwebfoundation.org/co2-js/):
```
Carbon (gCO₂) = (Data Transfer GB) × (Energy per GB) × (Carbon Intensity)
```

---

### 3. **ClickToLoadMedia**

Lazy-load facade for images and videos. Users explicitly consent to data transfer.

```tsx
// Image with click-to-load
<ClickToLoadMedia
  type="image"
  src="https://example.com/large-image.jpg"
  alt="Description"
  thumbnail="https://example.com/tiny-preview.jpg"
  dataSizeKB={850}
  height="250px"
/>

// Video with click-to-load
<ClickToLoadMedia
  type="video"
  src="https://example.com/video.mp4"
  dataSizeKB={5120}
  height="300px"
/>
```

**Props:**
- `src: string` - Media source URL (required)
- `type: 'image' | 'video'` - Media type (required)
- `alt?: string` - Alt text for images
- `thumbnail?: string` - Low-res preview image
- `dataSizeKB?: number` - Estimated data size (default: 500)
- `carbonCostGrams?: number` - Override carbon calculation
- `width?: string` - Custom width (default: "100%")
- `height?: string` - Custom height (default: "300px")
- `rounded?: string` - Border radius class (default: "rounded-input")

**Why?**
- No auto-play = no surprise data consumption
- User pays the energy cost only when they choose
- Aligns with SOLAR's "consensual data" principle

---

### 4. **GridStatusBadge**

Real-time display of grid carbon intensity (gCO₂/kWh).

```tsx
// Full display with details
<GridStatusBadge 
  showDetails={true} 
  region="California, USA" 
/>

// Compact badge
<GridStatusBadge 
  carbonIntensity={180} 
  compact={true} 
/>
```

**Props:**
- `region?: string` - Grid region/location (default: "Global Average")
- `carbonIntensity?: number` - Manual override for intensity (gCO₂/kWh)
- `showDetails?: boolean` - Show detailed info (default: false)
- `compact?: boolean` - Compact badge mode (default: false)

**Intensity Levels:**
- **Very Low** (🟢): < 200 gCO₂/kWh - Grid is very clean
- **Low** (🟡): 200-300 - Grid is relatively clean
- **Moderate** (🟠): 300-400 - Moderate intensity
- **High** (🔴): 400-500 - High intensity, defer heavy tasks
- **Very High** (⛔): > 500 - Very high, eco mode recommended

**Integration:**
Connect to [Electricity Maps API](https://app.electricitymaps.com/) for real-time data.

---

### 5. **DataCostBadge**

Shows environmental and financial costs of data-heavy actions before users commit.

```tsx
// With carbon cost only
<DataCostBadge
  label="Download PDF"
  icon="📄"
  dataSizeKB={450}
  showCarbonCost={true}
  dismissible={true}
/>

// With carbon + financial cost
<DataCostBadge
  label="Stream Video HD"
  icon="🎬"
  dataSizeKB={12800}
  showCarbonCost={true}
  showFinancialCost={true}
  onAcknowledge={() => console.log('User acknowledged')}
/>
```

**Props:**
- `label: string` - Action description (required)
- `dataSizeKB: number` - Data size in KB (required)
- `icon?: string` - Emoji icon (default: "📊")
- `showCarbonCost?: boolean` - Show CO₂ cost (default: true)
- `showFinancialCost?: boolean` - Show $ cost (default: false)
- `costPerMB?: number` - Cost in cents per MB (default: 10)
- `onAcknowledge?: () => void` - Callback when user continues
- `dismissible?: boolean` - Can be dismissed (default: false)

**Use Cases:**
- File downloads
- Video streaming
- High-res image galleries
- Large dataset loads

---

## 🎨 Design Principles

All components follow SOLAR framework principles:

### ✅ Energy Efficient
- CSS-only animations (no JavaScript loops)
- System fonts (zero HTTP requests)
- No shadows (reduced rendering)
- OLED-optimized dark theme

### ✅ Accessible
- WCAG AA compliant contrast ratios
- Semantic HTML
- Keyboard navigation
- Screen reader friendly

### ✅ Performance First
- Zero external dependencies
- Minimal bundle size
- Lazy loading support
- Mobile-first responsive

### ✅ Planet-First
- Carbon cost transparency
- Consensual data loading
- Grid-aware adaptivity
- Energy mode awareness

---

## 🔌 API Integration

### Real-Time Grid Intensity

```tsx
import { useEffect, useState } from 'react'

const useGridIntensity = (region: string) => {
  const [intensity, setIntensity] = useState<number>(475)

  useEffect(() => {
    // Electricity Maps API
    const fetchIntensity = async () => {
      const response = await fetch(
        `https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${region}`,
        { headers: { 'auth-token': 'YOUR_API_KEY' }}
      )
      const data = await response.json()
      setIntensity(data.carbonIntensity)
    }

    fetchIntensity()
    const interval = setInterval(fetchIntensity, 5 * 60 * 1000) // Every 5 min
    
    return () => clearInterval(interval)
  }, [region])

  return intensity
}

// Usage
const intensity = useGridIntensity('US-CA')
<GridStatusBadge carbonIntensity={intensity} />
```

### Page Size Calculation

```tsx
const getPageSize = (): number => {
  if (typeof window !== 'undefined' && window.performance) {
    const resources = window.performance.getEntriesByType('resource')
    const totalBytes = resources.reduce((acc, r: any) => 
      acc + (r.transferSize || 0), 0
    )
    return Math.round(totalBytes / 1024) // Convert to KB
  }
  return 250 // Default estimate
}

<CarbonFootprint pageSizeKB={getPageSize()} />
```

---

## 📊 Carbon Calculation

Using [CO2.js](https://www.thegreenwebfoundation.org/co2-js/) methodology:

```
Data Transfer (GB) = Page Size (KB) ÷ 1024 ÷ 1024
Energy (kWh) = Data Transfer (GB) × 0.06 kWh/GB
Carbon (gCO₂) = Energy (kWh) × Grid Intensity (gCO₂/kWh)
```

**Example:**
- Page size: 250 KB
- Data transfer: 0.000244 GB
- Energy: 0.0000146 kWh
- Carbon (global avg, 475 gCO₂/kWh): **0.007 gCO₂**

---

## 🚀 Usage Example

Complete implementation with all components:

```tsx
import { useState, useEffect } from 'react'
import {
  EnergyModeIndicator,
  CarbonFootprint,
  ClickToLoadMedia,
  GridStatusBadge,
  DataCostBadge
} from './components'

const MyApp = () => {
  const [gridIntensity, setGridIntensity] = useState(475)
  const [energyMode, setEnergyMode] = useState<'eco' | 'standard' | 'rich'>('standard')

  useEffect(() => {
    // Determine energy mode based on grid intensity
    if (gridIntensity > 400) setEnergyMode('eco')
    else if (gridIntensity < 250) setEnergyMode('rich')
    else setEnergyMode('standard')
  }, [gridIntensity])

  return (
    <div>
      {/* Status indicators in header */}
      <header>
        <EnergyModeIndicator mode={energyMode} compact={true} />
        <GridStatusBadge carbonIntensity={gridIntensity} compact={true} />
        <CarbonFootprint compact={true} />
      </header>

      {/* Conditionally load media based on energy mode */}
      {energyMode === 'rich' ? (
        <img src="hero-image.jpg" alt="Hero" />
      ) : (
        <ClickToLoadMedia
          type="image"
          src="hero-image.jpg"
          alt="Hero"
          dataSizeKB={1200}
        />
      )}

      {/* Show data cost for heavy actions */}
      <DataCostBadge
        label="Load Gallery"
        dataSizeKB={8500}
        showCarbonCost={true}
        onAcknowledge={() => loadGallery()}
      />
    </div>
  )
}
```

---

## 🌱 Impact

By implementing these components, you're:

- ✅ **Educating users** about digital carbon footprint
- ✅ **Reducing energy waste** through adaptive loading
- ✅ **Respecting user choice** with consensual data
- ✅ **Leading by example** in sustainable web design

---

## 📚 Resources

- **CO2.js**: https://www.thegreenwebfoundation.org/co2-js/
- **Electricity Maps**: https://app.electricitymaps.com/
- **Website Carbon Calculator**: https://www.websitecarbon.com/
- **Sustainable Web Design**: https://sustainablewebdesign.org/

---

## 📝 License

Part of SOLAR Design System by Ravi Palwe - MIT License

---

**Built with 💚 for a sustainable web**

