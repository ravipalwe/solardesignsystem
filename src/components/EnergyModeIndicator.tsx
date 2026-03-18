import { useState, useEffect } from 'react'

type EnergyMode = 'eco' | 'standard' | 'rich'

interface EnergyModeIndicatorProps {
  /** Current energy mode. If not provided, will be detected based on grid intensity */
  mode?: EnergyMode
  /** Show detailed description */
  showDescription?: boolean
  /** Compact mode - icon only */
  compact?: boolean
}

const EnergyModeIndicator = ({ 
  mode: providedMode, 
  showDescription = true,
  compact = false 
}: EnergyModeIndicatorProps) => {
  const [mode, setMode] = useState<EnergyMode>(providedMode || 'standard')

  useEffect(() => {
    if (providedMode) {
      setMode(providedMode)
      return
    }

    // Simulate grid intensity detection
    // In production, this would call an API like electricityMap or CO2.js
    const detectEnergyMode = () => {
      const hour = new Date().getHours()
      // Simple heuristic: peak hours (9-17) = eco, night (22-6) = rich, rest = standard
      if (hour >= 9 && hour <= 17) {
        setMode('eco')
      } else if (hour >= 22 || hour <= 6) {
        setMode('rich')
      } else {
        setMode('standard')
      }
    }

    detectEnergyMode()
  }, [providedMode])

  const modeConfig = {
    eco: {
      icon: '🌱',
      label: 'Eco Mode',
      color: 'text-accent-success',
      bgColor: 'bg-accent-success/20',
      description: 'High grid intensity. Images hidden, animations disabled.',
      borderColor: 'border-accent-success',
    },
    standard: {
      icon: '⚡',
      label: 'Standard Mode',
      color: 'text-accent-solar-amber',
      bgColor: 'bg-accent-solar-amber/20',
      description: 'Moderate grid intensity. Optimized images, CSS animations.',
      borderColor: 'border-accent-solar-amber',
    },
    rich: {
      icon: '☀️',
      label: 'Rich Mode',
      color: 'text-accent-primary',
      bgColor: 'bg-accent-primary/20',
      description: 'Green grid detected. Full experience enabled.',
      borderColor: 'border-accent-primary',
    },
  }

  const config = modeConfig[mode]

  if (compact) {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-badge ${config.bgColor} ${config.color} border ${config.borderColor}`}
        title={`${config.label}: ${config.description}`}
      >
        <span className="text-base">{config.icon}</span>
        <span className="text-xs font-semibold">{config.label}</span>
      </div>
    )
  }

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
      <div className="flex items-start gap-3">
        <div 
          className={`flex items-center justify-center w-10 h-10 rounded-badge ${config.bgColor}`}
        >
          <span className="text-2xl">{config.icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-text-primary">{config.label}</h3>
            <span 
              className={`inline-flex items-center px-2 py-0.5 rounded-badge text-xs font-semibold ${config.bgColor} ${config.color}`}
            >
              Active
            </span>
          </div>
          {showDescription && (
            <p className="text-xs text-text-secondary leading-relaxed">
              {config.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnergyModeIndicator

