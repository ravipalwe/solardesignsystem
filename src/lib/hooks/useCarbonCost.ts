import { useState, useEffect } from 'react'
import type { ImpactLevel } from '../types'

interface CarbonCostState {
  /** Estimated page/resource size in KB */
  pageSizeKB: number
  /** Carbon footprint in grams CO₂ */
  carbonGrams: number
  /** Semantic impact level */
  impactLevel: ImpactLevel
  /** Human-readable comparison */
  comparison: string
}

const DEFAULT_CARBON_INTENSITY = 475 // gCO2 per kWh (global average)
const ENERGY_PER_GB = 0.06 // kWh per GB (network + datacenter)

/**
 * Estimate page size using the Performance API.
 * Returns KB.
 */
function estimatePageSize(): number {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      const entries = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      const totalBytes = entries.reduce((sum, entry) => sum + (entry.transferSize || 0), 0)
      return Math.round(totalBytes / 1024)
    } catch {
      // Performance API may not be available in all environments
    }
  }
  return 250 // conservative default
}

/**
 * Calculate carbon footprint from data size.
 */
export function calculateCarbonGrams(sizeKB: number, carbonIntensity = DEFAULT_CARBON_INTENSITY): number {
  const dataTransferGB = sizeKB / 1024 / 1024
  const carbon = dataTransferGB * ENERGY_PER_GB * carbonIntensity
  return parseFloat(carbon.toFixed(2))
}

export function getImpactLevel(grams: number): ImpactLevel {
  if (grams < 0.5) return 'excellent'
  if (grams < 1.0) return 'good'
  if (grams < 2.0) return 'fair'
  return 'high'
}

export function getComparison(grams: number): string {
  if (grams < 0.1) return 'Less than a Google search'
  if (grams < 0.5) return '~5 Google searches'
  if (grams < 1.0) return '~10 Google searches'
  if (grams < 2.0) return '~1 minute of video streaming'
  return '~2 minutes of video streaming'
}

/**
 * Hook that computes the carbon footprint for a given page / resource size.
 *
 * @param pageSizeKB       Fixed size in KB. When omitted the Performance API is used.
 * @param carbonIntensity  gCO2/kWh (default 475).
 */
export function useCarbonCost(
  pageSizeKB?: number,
  carbonIntensity = DEFAULT_CARBON_INTENSITY,
): CarbonCostState {
  const [state, setState] = useState<CarbonCostState>(() => {
    const size = pageSizeKB ?? 250
    const grams = calculateCarbonGrams(size, carbonIntensity)
    return {
      pageSizeKB: size,
      carbonGrams: grams,
      impactLevel: getImpactLevel(grams),
      comparison: getComparison(grams),
    }
  })

  useEffect(() => {
    const size = pageSizeKB ?? estimatePageSize()
    const grams = calculateCarbonGrams(size, carbonIntensity)
    setState({
      pageSizeKB: size,
      carbonGrams: grams,
      impactLevel: getImpactLevel(grams),
      comparison: getComparison(grams),
    })
  }, [pageSizeKB, carbonIntensity])

  return state
}
