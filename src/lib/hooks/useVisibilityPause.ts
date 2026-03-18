import { useState, useEffect, useCallback, useRef } from 'react'

export interface VisibilityPauseOptions {
  /** Pause when tab is hidden (default: true) */
  pauseOnHidden?: boolean
  /** Pause when user is idle (default: false) */
  pauseOnIdle?: boolean
  /** Idle timeout in ms (default: 60000) */
  idleTimeoutMs?: number
  /** Callback when paused */
  onPause?: () => void
  /** Callback when resumed */
  onResume?: () => void
}

export interface VisibilityPauseState {
  /** True when tab is visible and user is active */
  isActive: boolean
  /** True when paused (inverse of isActive) */
  isPaused: boolean
  /** Reason for current state */
  reason: 'visible' | 'hidden' | 'idle' | null
  /** Creates a setInterval that auto-pauses when inactive. Returns cleanup fn. */
  createInterval: (callback: () => void, ms: number) => () => void
}

/**
 * Pauses expensive operations when the tab is hidden or user is idle.
 * Returns a boolean and a wrapper for setInterval that auto-pauses.
 */
export function useVisibilityPause(options: VisibilityPauseOptions = {}): VisibilityPauseState {
  const {
    pauseOnHidden = true,
    pauseOnIdle = false,
    idleTimeoutMs = 60_000,
    onPause,
    onResume,
  } = options

  const [isHidden, setIsHidden] = useState(() =>
    typeof document !== 'undefined' ? document.visibilityState === 'hidden' : false,
  )
  const [isIdle, setIsIdle] = useState(false)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const intervalsRef = useRef<Map<number, { callback: () => void; ms: number; id: ReturnType<typeof setInterval> | null }>>(new Map())
  const nextIdRef = useRef(0)

  // Visibility change
  useEffect(() => {
    if (!pauseOnHidden || typeof document === 'undefined') return

    const handler = () => setIsHidden(document.visibilityState === 'hidden')
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [pauseOnHidden])

  // Idle detection
  useEffect(() => {
    if (!pauseOnIdle || typeof window === 'undefined') return

    const resetIdle = () => {
      setIsIdle(false)
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => setIsIdle(true), idleTimeoutMs)
    }

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'pointerdown']
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }))
    resetIdle()

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle))
      clearTimeout(idleTimerRef.current)
    }
  }, [pauseOnIdle, idleTimeoutMs])

  const isPaused = (pauseOnHidden && isHidden) || (pauseOnIdle && isIdle)
  const isActive = !isPaused

  const reason: VisibilityPauseState['reason'] = isHidden
    ? 'hidden'
    : isIdle
      ? 'idle'
      : 'visible'

  // Callbacks
  const prevActive = useRef(isActive)
  useEffect(() => {
    if (prevActive.current !== isActive) {
      if (isActive) onResume?.()
      else onPause?.()
      prevActive.current = isActive
    }
  }, [isActive, onPause, onResume])

  // Manage intervals — pause/resume based on active state
  useEffect(() => {
    intervalsRef.current.forEach((entry) => {
      if (isActive && entry.id === null) {
        entry.id = setInterval(entry.callback, entry.ms)
      } else if (!isActive && entry.id !== null) {
        clearInterval(entry.id)
        entry.id = null
      }
    })
  }, [isActive])

  const createInterval = useCallback(
    (callback: () => void, ms: number) => {
      const key = nextIdRef.current++
      const entry = { callback, ms, id: isActive ? setInterval(callback, ms) : null }
      intervalsRef.current.set(key, entry)

      return () => {
        const e = intervalsRef.current.get(key)
        if (e?.id !== null) clearInterval(e!.id!)
        intervalsRef.current.delete(key)
      }
    },
    [isActive],
  )

  return { isActive, isPaused, reason, createInterval }
}
