import { useState, useEffect, useCallback } from 'react'
import type { EnergyMode, GridIntensityLevel } from '../types'

interface GridIntensityState {
  /** Current carbon intensity in gCO2/kWh */
  intensity: number
  /** Semantic level derived from the intensity value */
  level: GridIntensityLevel
  /** Suggested energy mode based on grid intensity */
  suggestedMode: EnergyMode
  /** When the intensity was last fetched / updated */
  lastUpdated: Date
  /** True while the initial or refresh fetch is in progress */
  isLoading: boolean
  /** Manually trigger a refresh */
  refresh: () => void
}

const DEFAULT_POLL_INTERVAL = 5 * 60 * 1000 // 5 minutes

/**
 * Determines grid intensity level from a numeric gCO2/kWh value.
 */
export function getIntensityLevel(value: number): GridIntensityLevel {
  if (value < 200) return 'very-low'
  if (value < 300) return 'low'
  if (value < 400) return 'moderate'
  if (value < 500) return 'high'
  return 'very-high'
}

/**
 * Maps a grid intensity level to the suggested energy mode.
 */
export function getSuggestedMode(level: GridIntensityLevel): EnergyMode {
  switch (level) {
    case 'very-low':
    case 'low':
      return 'rich'
    case 'moderate':
      return 'standard'
    case 'high':
    case 'very-high':
      return 'eco'
  }
}

/**
 * Hook that tracks grid carbon intensity.
 *
 * When no `staticIntensity` is provided it falls back to a time-of-day
 * heuristic (as a placeholder for a real Electricity Maps API call).
 *
 * @param staticIntensity  Fixed value — disables polling when set.
 * @param pollInterval     Polling interval in ms (default 5 min). Set 0 to disable.
 */
export function useGridIntensity(
  staticIntensity?: number,
  pollInterval: number = DEFAULT_POLL_INTERVAL,
): GridIntensityState {
  const [intensity, setIntensity] = useState<number>(staticIntensity ?? 475)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(!staticIntensity)

  const fetchIntensity = useCallback(() => {
    // In production, replace this with a real API call:
    //   const res = await fetch(`https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${zone}`)
    const hour = new Date().getHours()
    let mock: number

    if (hour >= 9 && hour <= 17) {
      mock = Math.floor(Math.random() * 200) + 400
    } else if (hour >= 22 || hour <= 6) {
      mock = Math.floor(Math.random() * 150) + 150
    } else {
      mock = Math.floor(Math.random() * 150) + 300
    }

    setIntensity(mock)
    setLastUpdated(new Date())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (staticIntensity !== undefined) {
      setIntensity(staticIntensity)
      setIsLoading(false)
      return
    }

    fetchIntensity()

    if (pollInterval > 0) {
      const id = setInterval(fetchIntensity, pollInterval)
      return () => clearInterval(id)
    }
  }, [staticIntensity, pollInterval, fetchIntensity])

  const level = getIntensityLevel(intensity)

  return {
    intensity,
    level,
    suggestedMode: getSuggestedMode(level),
    lastUpdated,
    isLoading,
    refresh: fetchIntensity,
  }
}
