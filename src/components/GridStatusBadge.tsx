import { useState, useEffect } from 'react'

interface GridStatusBadgeProps {
  /** Grid location/region */
  region?: string
  /** Manual override for carbon intensity (gCO2/kWh) */
  carbonIntensity?: number
  /** Show detailed information */
  showDetails?: boolean
  /** Compact mode */
  compact?: boolean
}

const GridStatusBadge = ({
  region = 'Global Average',
  carbonIntensity: providedIntensity,
  showDetails = false,
  compact = false,
}: GridStatusBadgeProps) => {
  const [intensity, setIntensity] = useState<number>(providedIntensity || 475)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    if (providedIntensity) {
      setIntensity(providedIntensity)
      return
    }

    // Simulate grid intensity API call
    // In production, this would use electricityMap API or similar
    const fetchGridIntensity = () => {
      // Mock: Vary intensity based on time of day
      const hour = new Date().getHours()
      let mockIntensity: number

      if (hour >= 9 && hour <= 17) {
        // Peak hours - higher intensity
        mockIntensity = Math.floor(Math.random() * 200) + 400 // 400-600
      } else if (hour >= 22 || hour <= 6) {
        // Night - lower intensity (more renewables)
        mockIntensity = Math.floor(Math.random() * 150) + 150 // 150-300
      } else {
        // Moderate
        mockIntensity = Math.floor(Math.random() * 150) + 300 // 300-450
      }

      setIntensity(mockIntensity)
      setLastUpdated(new Date())
    }

    fetchGridIntensity()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchGridIntensity, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [providedIntensity])

  const getIntensityLevel = (value: number): {
    level: string
    color: string
    bgColor: string
    icon: string
    message: string
  } => {
    if (value < 200) {
      return {
        level: 'Very Low',
        color: 'text-accent-success',
        bgColor: 'bg-accent-success/20',
        icon: '🟢',
        message: 'Grid is very clean! Great time to use energy.',
      }
    } else if (value < 300) {
      return {
        level: 'Low',
        color: 'text-accent-deep-teal',
        bgColor: 'bg-accent-deep-teal/20',
        icon: '🟡',
        message: 'Grid is relatively clean.',
      }
    } else if (value < 400) {
      return {
        level: 'Moderate',
        color: 'text-accent-solar-amber',
        bgColor: 'bg-accent-solar-amber/20',
        icon: '🟠',
        message: 'Moderate grid intensity.',
      }
    } else if (value < 500) {
      return {
        level: 'High',
        color: 'text-accent-oled-rose',
        bgColor: 'bg-accent-oled-rose/20',
        icon: '🔴',
        message: 'Grid intensity is high. Consider deferring heavy tasks.',
      }
    }
    return {
      level: 'Very High',
      color: 'text-accent-oled-rose',
      bgColor: 'bg-accent-oled-rose/20',
      icon: '⛔',
      message: 'Grid intensity is very high. Eco mode recommended.',
    }
  }

  const status = getIntensityLevel(intensity)

  const formatLastUpdated = (date: Date): string => {
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes === 1) return '1 minute ago'
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours === 1) return '1 hour ago'
    return `${diffHours} hours ago`
  }

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-badge ${status.bgColor} ${status.color} border border-borders-subtle`}
        title={`${region}: ${intensity}g CO₂/kWh - ${status.message}`}
      >
        <span className="text-sm">{status.icon}</span>
        <span className="text-xs font-semibold">{intensity}g CO₂/kWh</span>
      </div>
    )
  }

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-badge ${status.bgColor}`}>
            <span className="text-2xl">{status.icon}</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">Grid Status</h3>
            <p className="text-xs text-text-tertiary">{region}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-badge text-xs font-semibold ${status.bgColor} ${status.color}`}>
          {status.level}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-text-primary mb-1" style={{ letterSpacing: '-0.01em' }}>
          {intensity}
          <span className="text-sm font-normal text-text-secondary ml-1">gCO₂/kWh</span>
        </p>
        <p className="text-xs text-text-secondary">{status.message}</p>
      </div>

      {showDetails && (
        <div className="space-y-2 pt-4 border-t border-borders-subtle">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Last Updated</span>
            <span className="text-xs font-semibold text-text-primary">
              {formatLastUpdated(lastUpdated)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Region</span>
            <span className="text-xs font-semibold text-text-primary">{region}</span>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-borders-subtle">
        <p className="text-xs text-text-tertiary">
          📊 Data from <a href="https://app.electricitymaps.com/" target="_blank" rel="noopener noreferrer" className="text-text-link hover:underline">Electricity Maps</a>
        </p>
      </div>
    </div>
  )
}

export default GridStatusBadge

