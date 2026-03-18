import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { EnergyMode } from '../types'
import { useDeviceEnergyProfile, type EnergyProfile, type EnergyBudget } from '../hooks/useDeviceEnergyProfile'
import { useVisibilityPause, type VisibilityPauseState } from '../hooks/useVisibilityPause'
import { useCarbonBudget, type CarbonBudgetState } from '../hooks/useCarbonBudget'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface EnergyContextValue {
  /** Current energy mode */
  mode: EnergyMode
  /** Full device energy profile */
  profile: EnergyProfile
  /** Carbon budget tracking state */
  budget: CarbonBudgetState
  /** Whether the tab is visible and user is active */
  isActive: boolean
  /** Visibility pause state */
  visibility: VisibilityPauseState
  /** Override the energy mode manually */
  setMode: (mode: EnergyMode) => void
}

const EnergyContext = createContext<EnergyContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface EnergyAwareProviderProps {
  children: React.ReactNode
  /** Manual mode override. When set, auto-detection is disabled. */
  mode?: EnergyMode
  /** Auto-detect mode from device signals (default: true) */
  autoMode?: boolean
  /** Page carbon budget in grams (default: 1.0) */
  carbonBudgetGrams?: number
  /** Callback when mode changes */
  onModeChange?: (mode: EnergyMode, reason: string) => void
  /** Callback when budget is exceeded */
  onBudgetExceeded?: (usage: number) => void
}

function budgetToMode(budget: EnergyBudget): EnergyMode {
  switch (budget) {
    case 'generous':
      return 'rich'
    case 'standard':
      return 'standard'
    case 'low':
    case 'minimal':
      return 'eco'
  }
}

export const EnergyAwareProvider = ({
  children,
  mode: providedMode,
  autoMode = true,
  carbonBudgetGrams = 1.0,
  onModeChange,
  onBudgetExceeded,
}: EnergyAwareProviderProps) => {
  const profile = useDeviceEnergyProfile()
  const visibility = useVisibilityPause({ pauseOnHidden: true })
  const carbonBudget = useCarbonBudget({
    budgetGrams: carbonBudgetGrams,
    onExceeded: (used) => onBudgetExceeded?.(used),
  })

  const autoDetectedMode = budgetToMode(profile.budget)
  const [manualMode, setManualMode] = useState<EnergyMode | null>(providedMode ?? null)

  // Sync provided mode prop
  useEffect(() => {
    if (providedMode) setManualMode(providedMode)
  }, [providedMode])

  const mode: EnergyMode = manualMode ?? (autoMode ? autoDetectedMode : 'standard')

  // Fire mode change callback
  const prevMode = useMemo(() => ({ current: mode }), [])
  useEffect(() => {
    if (mode !== prevMode.current) {
      const reason = manualMode ? 'manual' : 'auto-detected'
      onModeChange?.(mode, reason)
      prevMode.current = mode
    }
  }, [mode, manualMode, onModeChange, prevMode])

  const setMode = (m: EnergyMode) => setManualMode(m)

  const value: EnergyContextValue = {
    mode,
    profile,
    budget: carbonBudget,
    isActive: visibility.isActive,
    visibility,
    setMode,
  }

  return <EnergyContext.Provider value={value}>{children}</EnergyContext.Provider>
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the energy context from any child component.
 * Must be used within an `<EnergyAwareProvider>`.
 */
export function useEnergyContext(): EnergyContextValue {
  const ctx = useContext(EnergyContext)
  if (!ctx) {
    throw new Error('useEnergyContext must be used within an <EnergyAwareProvider>')
  }
  return ctx
}
