import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCarbonCost, calculateCarbonGrams, getImpactLevel, getComparison } from '../hooks/useCarbonCost'
import { getIntensityLevel, getSuggestedMode } from '../hooks/useGridIntensity'

// ---------------------------------------------------------------------------
// Carbon cost utilities
// ---------------------------------------------------------------------------

describe('calculateCarbonGrams', () => {
  it('returns 0 for 0 KB', () => {
    expect(calculateCarbonGrams(0)).toBe(0)
  })

  it('calculates correctly for 1 MB (1024 KB)', () => {
    const result = calculateCarbonGrams(1024, 475)
    // (1024 / 1024 / 1024) * 0.06 * 475 ≈ 0.03
    expect(result).toBeGreaterThan(0)
    expect(result).toBeLessThan(1)
  })

  it('scales with carbon intensity', () => {
    const low = calculateCarbonGrams(1024, 100)
    const high = calculateCarbonGrams(1024, 800)
    expect(high).toBeGreaterThan(low)
  })
})

describe('getImpactLevel', () => {
  it('returns excellent for <0.5g', () => {
    expect(getImpactLevel(0.3)).toBe('excellent')
  })

  it('returns good for 0.5-1.0g', () => {
    expect(getImpactLevel(0.7)).toBe('good')
  })

  it('returns fair for 1.0-2.0g', () => {
    expect(getImpactLevel(1.5)).toBe('fair')
  })

  it('returns high for >2.0g', () => {
    expect(getImpactLevel(3.0)).toBe('high')
  })
})

describe('getComparison', () => {
  it('returns meaningful comparison strings', () => {
    expect(getComparison(0.05)).toContain('Google search')
    expect(getComparison(0.3)).toContain('Google searches')
    expect(getComparison(1.5)).toContain('video streaming')
  })
})

// ---------------------------------------------------------------------------
// useCarbonCost hook
// ---------------------------------------------------------------------------

describe('useCarbonCost', () => {
  it('returns computed carbon values for given page size', () => {
    const { result } = renderHook(() => useCarbonCost(500))
    expect(result.current.pageSizeKB).toBe(500)
    expect(result.current.carbonGrams).toBeGreaterThan(0)
    expect(result.current.impactLevel).toBeDefined()
    expect(result.current.comparison).toBeDefined()
  })

  it('updates when page size changes', () => {
    const { result, rerender } = renderHook(
      ({ size }) => useCarbonCost(size),
      { initialProps: { size: 100 } },
    )
    const initial = result.current.carbonGrams
    rerender({ size: 5000 })
    expect(result.current.carbonGrams).toBeGreaterThan(initial)
  })
})

// ---------------------------------------------------------------------------
// Grid intensity utilities
// ---------------------------------------------------------------------------

describe('getIntensityLevel', () => {
  it('returns very-low for <200', () => {
    expect(getIntensityLevel(150)).toBe('very-low')
  })

  it('returns low for 200-299', () => {
    expect(getIntensityLevel(250)).toBe('low')
  })

  it('returns moderate for 300-399', () => {
    expect(getIntensityLevel(350)).toBe('moderate')
  })

  it('returns high for 400-499', () => {
    expect(getIntensityLevel(450)).toBe('high')
  })

  it('returns very-high for >=500', () => {
    expect(getIntensityLevel(600)).toBe('very-high')
  })
})

describe('getSuggestedMode', () => {
  it('returns rich for very-low', () => {
    expect(getSuggestedMode('very-low')).toBe('rich')
  })

  it('returns standard for moderate', () => {
    expect(getSuggestedMode('moderate')).toBe('standard')
  })

  it('returns eco for high', () => {
    expect(getSuggestedMode('high')).toBe('eco')
  })
})
