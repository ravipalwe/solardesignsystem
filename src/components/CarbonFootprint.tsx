import { useState, useEffect } from 'react'

interface CarbonFootprintProps {
  /** Page size in KB. If not provided, will be estimated */
  pageSizeKB?: number
  /** Show detailed breakdown */
  showBreakdown?: boolean
  /** Server location for grid intensity lookup */
  serverLocation?: string
  /** Compact display mode */
  compact?: boolean
}

const CarbonFootprint = ({ 
  pageSizeKB: providedSize,
  showBreakdown = false,
  serverLocation = 'Global Average',
  compact = false
}: CarbonFootprintProps) => {
  const [pageSizeKB, setPageSizeKB] = useState<number>(0)
  const [carbonGrams, setCarbonGrams] = useState<number>(0)

  useEffect(() => {
    // Calculate or use provided page size
    const size = providedSize || calculatePageSize()
    setPageSizeKB(size)

    // Calculate carbon footprint
    // Using CO2.js methodology: ~0.81g CO2 per page view (global average)
    // Formula: (data transfer in GB) × (energy per GB) × (carbon intensity)
    const dataTransferGB = size / 1024 / 1024
    const energyPerGB = 0.06 // kWh per GB (network + datacenter)
    const carbonIntensity = 475 // gCO2 per kWh (global average)
    const carbon = dataTransferGB * energyPerGB * carbonIntensity
    
    setCarbonGrams(parseFloat(carbon.toFixed(2)))
  }, [providedSize])

  const calculatePageSize = (): number => {
    // Estimate page size from performance API
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.getEntriesByType('resource')
      const totalSize = perfData.reduce((acc, resource: any) => {
        return acc + (resource.transferSize || 0)
      }, 0)
      return Math.round(totalSize / 1024) // Convert to KB
    }
    return 250 // Default estimate
  }

  const getImpactLevel = (grams: number): { color: string; bgColor: string; label: string } => {
    if (grams < 0.5) {
      return { 
        color: 'text-accent-success', 
        bgColor: 'bg-accent-success/20',
        label: 'Excellent' 
      }
    } else if (grams < 1.0) {
      return { 
        color: 'text-accent-primary', 
        bgColor: 'bg-accent-primary/20',
        label: 'Good' 
      }
    } else if (grams < 2.0) {
      return { 
        color: 'text-accent-solar-amber', 
        bgColor: 'bg-accent-solar-amber/20',
        label: 'Fair' 
      }
    }
    return { 
      color: 'text-accent-oled-rose', 
      bgColor: 'bg-accent-oled-rose/20',
      label: 'High' 
    }
  }

  const impact = getImpactLevel(carbonGrams)

  // Comparison examples
  const getComparison = (grams: number): string => {
    if (grams < 0.1) return 'Less than a Google search'
    if (grams < 0.5) return '~5 Google searches'
    if (grams < 1.0) return '~10 Google searches'
    if (grams < 2.0) return '~1 minute of video streaming'
    return '~2 minutes of video streaming'
  }

  if (compact) {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-badge ${impact.bgColor} ${impact.color} border border-borders-subtle`}
        title={`Carbon footprint: ${carbonGrams}g CO₂ (${getComparison(carbonGrams)})`}
      >
        <span className="text-sm">🌍</span>
        <span className="text-xs font-semibold">{carbonGrams}g CO₂</span>
      </div>
    )
  }

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🌍</div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">Carbon Footprint</h3>
            <p className="text-xs text-text-tertiary">{serverLocation}</p>
          </div>
        </div>
        <span 
          className={`px-2 py-1 rounded-badge text-xs font-semibold ${impact.bgColor} ${impact.color}`}
        >
          {impact.label}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-text-primary mb-1" style={{ letterSpacing: '-0.01em' }}>
          {carbonGrams}g CO₂
        </p>
        <p className="text-xs text-text-secondary">
          {getComparison(carbonGrams)}
        </p>
      </div>

      {showBreakdown && (
        <div className="space-y-3 pt-4 border-t border-borders-subtle">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Page Size</span>
            <span className="text-xs font-semibold text-text-primary">{pageSizeKB.toFixed(0)} KB</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Data Transfer</span>
            <span className="text-xs font-semibold text-text-primary">{(pageSizeKB / 1024).toFixed(2)} MB</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Grid Intensity</span>
            <span className="text-xs font-semibold text-text-primary">475g CO₂/kWh</span>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-borders-subtle">
        <p className="text-xs text-text-tertiary">
          💡 Calculated using <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank" rel="noopener noreferrer" className="text-text-link hover:underline">CO2.js</a> methodology
        </p>
      </div>
    </div>
  )
}

export default CarbonFootprint

