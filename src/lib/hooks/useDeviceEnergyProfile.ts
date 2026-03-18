import { useState, useEffect, useMemo } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type EnergyBudget = 'minimal' | 'low' | 'standard' | 'generous'

export interface BatteryInfo {
  level: number
  charging: boolean
}

export interface NetworkInfo {
  effectiveType: string
  saveData: boolean
  downlink: number
  rtt: number
}

export interface EnergyProfile {
  /** Battery state (null if API unavailable) */
  battery: BatteryInfo | null
  /** Network conditions (null if API unavailable) */
  network: NetworkInfo | null
  /** Approximate device RAM in GB (null if unavailable) */
  deviceMemoryGB: number | null
  /** Logical CPU cores */
  cpuCores: number
  /** User prefers reduced motion */
  prefersReducedMotion: boolean
  /** User prefers dark color scheme */
  prefersDarkMode: boolean
  /** User has enabled Save-Data (or navigator.connection.saveData) */
  prefersReducedData: boolean
  /** Computed energy budget level */
  budget: EnergyBudget
  /** Numeric score 0-100 (higher = more energy available) */
  score: number
  /** Human-readable constraint list */
  constraints: string[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getMediaQuery(query: string): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(query).matches
}

function computeScore(profile: Omit<EnergyProfile, 'budget' | 'score' | 'constraints'>): { score: number; constraints: string[] } {
  let score = 100
  const constraints: string[] = []

  // Battery (30% weight)
  if (profile.battery) {
    if (!profile.battery.charging) {
      if (profile.battery.level < 0.15) {
        score -= 30
        constraints.push('Critical battery (<15%)')
      } else if (profile.battery.level < 0.3) {
        score -= 20
        constraints.push('Low battery (<30%)')
      } else if (profile.battery.level < 0.5) {
        score -= 10
        constraints.push('Moderate battery (<50%)')
      }
    }
  }

  // Network (25% weight)
  if (profile.network) {
    if (profile.network.saveData) {
      score -= 25
      constraints.push('Save-Data enabled')
    } else {
      switch (profile.network.effectiveType) {
        case 'slow-2g':
        case '2g':
          score -= 25
          constraints.push('Very slow connection')
          break
        case '3g':
          score -= 15
          constraints.push('Slow connection (3G)')
          break
      }
    }
  }

  // Device capability (20% weight)
  if (profile.deviceMemoryGB !== null && profile.deviceMemoryGB <= 2) {
    score -= 10
    constraints.push('Low device memory')
  }
  if (profile.cpuCores <= 2) {
    score -= 10
    constraints.push('Low CPU cores')
  }

  // User preferences (15% weight)
  if (profile.prefersReducedMotion) {
    score -= 10
    constraints.push('Prefers reduced motion')
  }
  if (profile.prefersReducedData) {
    score -= 5
    constraints.push('Prefers reduced data')
  }

  return { score: Math.max(0, Math.min(100, score)), constraints }
}

function scoreToBudget(score: number): EnergyBudget {
  if (score >= 80) return 'generous'
  if (score >= 55) return 'standard'
  if (score >= 30) return 'low'
  return 'minimal'
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Fuses multiple browser APIs (Battery, Network Information, Device Memory,
 * prefers-reduced-motion, etc.) into a single reactive energy profile.
 */
export function useDeviceEnergyProfile(): EnergyProfile {
  const [battery, setBattery] = useState<BatteryInfo | null>(null)
  const [network, setNetwork] = useState<NetworkInfo | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    getMediaQuery('(prefers-reduced-motion: reduce)'),
  )
  const [prefersDarkMode, setPrefersDarkMode] = useState(() =>
    getMediaQuery('(prefers-color-scheme: dark)'),
  )

  // Battery API
  useEffect(() => {
    if (typeof navigator === 'undefined') return

    let batteryManager: any = null

    const update = () => {
      if (batteryManager) {
        setBattery({ level: batteryManager.level, charging: batteryManager.charging })
      }
    }

    // navigator.getBattery is not in all browsers
    if ('getBattery' in navigator) {
      ;(navigator as any).getBattery().then((bm: any) => {
        batteryManager = bm
        update()
        bm.addEventListener('levelchange', update)
        bm.addEventListener('chargingchange', update)
      })
    }

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', update)
        batteryManager.removeEventListener('chargingchange', update)
      }
    }
  }, [])

  // Network Information API
  useEffect(() => {
    if (typeof navigator === 'undefined') return

    const conn = (navigator as any).connection
    if (!conn) return

    const update = () => {
      setNetwork({
        effectiveType: conn.effectiveType ?? '4g',
        saveData: conn.saveData ?? false,
        downlink: conn.downlink ?? 10,
        rtt: conn.rtt ?? 50,
      })
    }

    update()
    conn.addEventListener('change', update)
    return () => conn.removeEventListener('change', update)
  }, [])

  // Media queries
  useEffect(() => {
    if (typeof window === 'undefined') return

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const darkMq = window.matchMedia('(prefers-color-scheme: dark)')

    const onMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    const onDark = (e: MediaQueryListEvent) => setPrefersDarkMode(e.matches)

    motionMq.addEventListener('change', onMotion)
    darkMq.addEventListener('change', onDark)

    return () => {
      motionMq.removeEventListener('change', onMotion)
      darkMq.removeEventListener('change', onDark)
    }
  }, [])

  const deviceMemoryGB: number | null =
    typeof navigator !== 'undefined' ? (navigator as any).deviceMemory ?? null : null
  const cpuCores =
    typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 4 : 4

  const prefersReducedData = network?.saveData ?? false

  const profile = useMemo(() => {
    const base = {
      battery,
      network,
      deviceMemoryGB,
      cpuCores,
      prefersReducedMotion,
      prefersDarkMode,
      prefersReducedData,
    }
    const { score, constraints } = computeScore(base)
    return {
      ...base,
      score,
      constraints,
      budget: scoreToBudget(score),
    } as EnergyProfile
  }, [battery, network, deviceMemoryGB, cpuCores, prefersReducedMotion, prefersDarkMode, prefersReducedData])

  return profile
}
