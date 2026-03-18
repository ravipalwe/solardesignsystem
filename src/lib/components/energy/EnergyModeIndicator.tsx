import { useState, useEffect } from 'react'
import type { EnergyMode, EnergyModeIndicatorProps } from '../../types'

const modeConfig: Record<EnergyMode, {
  icon: string
  label: string
  color: string
  bgColor: string
  borderColor: string
  description: string
}> = {
  eco: {
    icon: '🌱',
    label: 'Eco Mode',
    color: 'text-accent-success',
    bgColor: 'bg-accent-success/20',
    borderColor: 'border-accent-success',
    description: 'High grid intensity. Images hidden, animations disabled.',
  },
  standard: {
    icon: '⚡',
    label: 'Standard Mode',
    color: 'text-accent-solar-amber',
    bgColor: 'bg-accent-solar-amber/20',
    borderColor: 'border-accent-solar-amber',
    description: 'Moderate grid intensity. Optimized images, CSS animations.',
  },
  rich: {
    icon: '☀️',
    label: 'Rich Mode',
    color: 'text-accent-primary',
    bgColor: 'bg-accent-primary/20',
    borderColor: 'border-accent-primary',
    description: 'Green grid detected. Full experience enabled.',
  },
}

const EnergyModeIndicator = ({
  mode: providedMode,
  showDescription = true,
  compact = false,
  className = '',
}: EnergyModeIndicatorProps) => {
  const [mode, setMode] = useState<EnergyMode>(providedMode || 'standard')

  useEffect(() => {
    if (providedMode) {
      setMode(providedMode)
      return
    }

    // Time-of-day heuristic — replace with a real API in production
    const hour = new Date().getHours()
    if (hour >= 9 && hour <= 17) {
      setMode('eco')
    } else if (hour >= 22 || hour <= 6) {
      setMode('rich')
    } else {
      setMode('standard')
    }
  }, [providedMode])

  const config = modeConfig[mode]

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-badge ${config.bgColor} ${config.color} border ${config.borderColor} ${className}`}
        role="status"
        aria-label={`${config.label}: ${config.description}`}
      >
        <span className="text-base" aria-hidden="true">{config.icon}</span>
        <span className="text-xs font-semibold">{config.label}</span>
      </div>
    )
  }

  return (
    <div
      className={`bg-background-cardSurface border border-borders-subtle rounded-card p-4 ${className}`}
      role="status"
      aria-label={`Energy mode: ${config.label}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-badge ${config.bgColor}`}
          aria-hidden="true"
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
