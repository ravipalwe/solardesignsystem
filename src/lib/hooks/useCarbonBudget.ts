import { useState, useEffect, useRef } from 'react'
import { calculateCarbonGrams } from './useCarbonCost'

export type BudgetStatus = 'under' | 'warning' | 'exceeded'

export interface CarbonBudgetState {
  /** Carbon consumed so far (grams) */
  usedGrams: number
  /** Data consumed so far (KB) */
  usedKB: number
  /** Budget limit in grams */
  budgetGrams: number
  /** Budget limit in KB */
  budgetKB: number
  /** Percentage of budget consumed (can exceed 100) */
  percentUsed: number
  /** Current status */
  status: BudgetStatus
  /** Remaining budget */
  remaining: { grams: number; kb: number }
}

export interface CarbonBudgetOptions {
  /** Budget in grams CO₂ (default: 1.0) */
  budgetGrams?: number
  /** Alternative: set budget in KB */
  budgetKB?: number
  /** Callback at 80% usage */
  onWarning?: (used: number, budget: number) => void
  /** Callback at 100% usage */
  onExceeded?: (used: number, budget: number) => void
  /** Carbon intensity override (gCO₂/kWh). Default: 475 */
  carbonIntensity?: number
}

const WARNING_THRESHOLD = 0.8
const DEFAULT_BUDGET_GRAMS = 1.0

/**
 * Inversely calculate KB from grams using the CO2.js formula.
 */
function gramsToKB(grams: number, carbonIntensity: number): number {
  // grams = (KB / 1024 / 1024) * 0.06 * carbonIntensity
  // KB = grams * 1024 * 1024 / (0.06 * carbonIntensity)
  return (grams * 1024 * 1024) / (0.06 * carbonIntensity)
}

/**
 * Tracks page resource consumption against a defined carbon/data budget.
 * Fires warning at 80% and exceeded at 100%.
 */
export function useCarbonBudget(options: CarbonBudgetOptions = {}): CarbonBudgetState {
  const { carbonIntensity = 475, onWarning, onExceeded } = options

  const budgetGrams = options.budgetGrams ?? (options.budgetKB
    ? calculateCarbonGrams(options.budgetKB, carbonIntensity)
    : DEFAULT_BUDGET_GRAMS)

  const budgetKB = options.budgetKB ?? gramsToKB(budgetGrams, carbonIntensity)

  const [usedKB, setUsedKB] = useState(0)
  const firedWarning = useRef(false)
  const firedExceeded = useRef(false)

  // Track resources via PerformanceObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return

    // Seed from existing entries
    const existing = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    let totalBytes = existing.reduce((sum, e) => sum + (e.transferSize || 0), 0)
    setUsedKB(totalBytes / 1024)

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[]
      const newBytes = entries.reduce((sum, e) => sum + (e.transferSize || 0), 0)
      totalBytes += newBytes
      setUsedKB(totalBytes / 1024)
    })

    observer.observe({ type: 'resource', buffered: false })
    return () => observer.disconnect()
  }, [])

  const usedGrams = calculateCarbonGrams(usedKB, carbonIntensity)
  const percentUsed = budgetGrams > 0 ? (usedGrams / budgetGrams) * 100 : 0

  let status: BudgetStatus = 'under'
  if (percentUsed >= 100) status = 'exceeded'
  else if (percentUsed >= WARNING_THRESHOLD * 100) status = 'warning'

  // Fire callbacks
  useEffect(() => {
    if (status === 'warning' && !firedWarning.current) {
      firedWarning.current = true
      onWarning?.(usedGrams, budgetGrams)
    }
    if (status === 'exceeded' && !firedExceeded.current) {
      firedExceeded.current = true
      onExceeded?.(usedGrams, budgetGrams)
    }
  }, [status, usedGrams, budgetGrams, onWarning, onExceeded])

  return {
    usedGrams,
    usedKB,
    budgetGrams,
    budgetKB,
    percentUsed,
    status,
    remaining: {
      grams: Math.max(0, budgetGrams - usedGrams),
      kb: Math.max(0, budgetKB - usedKB),
    },
  }
}
