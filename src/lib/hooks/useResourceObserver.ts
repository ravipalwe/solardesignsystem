import { useState, useEffect, useRef } from 'react'
import { calculateCarbonGrams } from './useCarbonCost'

export interface ResourceBreakdown {
  scripts: number
  styles: number
  images: number
  fonts: number
  fetch: number
  other: number
}

export interface ResourceObserverState {
  /** Total bytes transferred */
  totalBytes: number
  /** Total KB transferred */
  totalKB: number
  /** Breakdown by resource type */
  breakdown: ResourceBreakdown
  /** Number of resources loaded */
  resourceCount: number
  /** Estimated carbon footprint in grams */
  carbonGrams: number
  /** Top 5 largest resources */
  largestResources: { name: string; sizeKB: number }[]
  /** Whether the observer is active */
  isObserving: boolean
}

interface Options {
  /** Carbon intensity override (gCO2/kWh). Default: 475 */
  carbonIntensity?: number
  /** Max entries to buffer. Default: 500 */
  maxEntries?: number
}

function getResourceType(entry: PerformanceResourceTiming): keyof ResourceBreakdown {
  const type = entry.initiatorType
  if (type === 'script') return 'scripts'
  if (type === 'css' || type === 'link') return 'styles'
  if (type === 'img' || type === 'image') return 'images'
  if (type === 'font') return 'fonts'
  if (type === 'fetch' || type === 'xmlhttprequest') return 'fetch'
  return 'other'
}

function getShortName(url: string): string {
  try {
    const u = new URL(url)
    const path = u.pathname.split('/').pop() || u.pathname
    return path.length > 40 ? path.substring(0, 37) + '...' : path
  } catch {
    return url.substring(0, 40)
  }
}

/**
 * Continuously tracks page weight using PerformanceObserver.
 * Emits running totals and per-resource breakdowns in real time.
 */
export function useResourceObserver(options: Options = {}): ResourceObserverState {
  const { carbonIntensity = 475, maxEntries = 500 } = options
  const [state, setState] = useState<ResourceObserverState>({
    totalBytes: 0,
    totalKB: 0,
    breakdown: { scripts: 0, styles: 0, images: 0, fonts: 0, fetch: 0, other: 0 },
    resourceCount: 0,
    carbonGrams: 0,
    largestResources: [],
    isObserving: false,
  })

  const allEntries = useRef<{ name: string; size: number }[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return

    // Seed from existing entries
    const existing = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const breakdown: ResourceBreakdown = { scripts: 0, styles: 0, images: 0, fonts: 0, fetch: 0, other: 0 }
    let totalBytes = 0

    existing.forEach((entry) => {
      const size = entry.transferSize || 0
      totalBytes += size
      breakdown[getResourceType(entry)] += size
      allEntries.current.push({ name: entry.name, size })
    })

    const totalKB = totalBytes / 1024
    const top5 = [...allEntries.current]
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)
      .map((e) => ({ name: getShortName(e.name), sizeKB: Math.round(e.size / 1024) }))

    setState({
      totalBytes,
      totalKB,
      breakdown,
      resourceCount: existing.length,
      carbonGrams: calculateCarbonGrams(totalKB, carbonIntensity),
      largestResources: top5,
      isObserving: true,
    })

    // Observe new entries
    const observer = new PerformanceObserver((list) => {
      const newEntries = list.getEntries() as PerformanceResourceTiming[]

      setState((prev) => {
        const updated = { ...prev }
        const updatedBreakdown = { ...prev.breakdown }

        newEntries.forEach((entry) => {
          const size = entry.transferSize || 0
          updated.totalBytes += size
          updatedBreakdown[getResourceType(entry)] += size
          updated.resourceCount++

          if (allEntries.current.length < maxEntries) {
            allEntries.current.push({ name: entry.name, size })
          }
        })

        updated.totalKB = updated.totalBytes / 1024
        updated.breakdown = updatedBreakdown
        updated.carbonGrams = calculateCarbonGrams(updated.totalKB, carbonIntensity)
        updated.largestResources = [...allEntries.current]
          .sort((a, b) => b.size - a.size)
          .slice(0, 5)
          .map((e) => ({ name: getShortName(e.name), sizeKB: Math.round(e.size / 1024) }))

        return updated
      })
    })

    observer.observe({ type: 'resource', buffered: false })

    return () => observer.disconnect()
  }, [carbonIntensity, maxEntries])

  return state
}
