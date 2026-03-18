import { useState, useEffect, useRef, useCallback } from 'react'
import { useDeviceEnergyProfile } from '../../hooks/useDeviceEnergyProfile'

export interface DeferredContentProps {
  children: React.ReactNode
  /** Placeholder shown before content loads */
  placeholder?: React.ReactNode
  /** When to load the content */
  loadWhen?: 'visible' | 'idle' | 'interaction' | 'favorable'
  /** Estimated data size in KB (for carbon budget accounting) */
  estimatedSizeKB?: number
  /** Force-load after this many ms regardless of condition (default: 0 = no timeout) */
  timeout?: number
  /** Callback when content loads */
  onLoad?: () => void
  /** Optional className */
  className?: string
}

const DeferredContent = ({
  children,
  placeholder,
  loadWhen = 'visible',
  estimatedSizeKB,
  timeout = 0,
  onLoad,
  className = '',
}: DeferredContentProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const profile = useDeviceEnergyProfile()

  const load = useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true)
      onLoad?.()
    }
  }, [isLoaded, onLoad])

  // Timeout fallback
  useEffect(() => {
    if (timeout > 0 && !isLoaded) {
      const timer = setTimeout(load, timeout)
      return () => clearTimeout(timer)
    }
  }, [timeout, isLoaded, load])

  // Strategy: 'visible' — IntersectionObserver
  useEffect(() => {
    if (loadWhen !== 'visible' || isLoaded || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load()
          observer.disconnect()
        }
      },
      { rootMargin: '100px' },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [loadWhen, isLoaded, load])

  // Strategy: 'idle' — requestIdleCallback
  useEffect(() => {
    if (loadWhen !== 'idle' || isLoaded) return

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(load)
      return () => (window as any).cancelIdleCallback(id)
    } else {
      // Fallback: load after a short delay
      const timer = setTimeout(load, 200)
      return () => clearTimeout(timer)
    }
  }, [loadWhen, isLoaded, load])

  // Strategy: 'favorable' — wait until energy profile allows
  useEffect(() => {
    if (loadWhen !== 'favorable' || isLoaded) return

    if (profile.budget === 'generous' || profile.budget === 'standard') {
      load()
    }
  }, [loadWhen, isLoaded, profile.budget, load])

  // Strategy: 'interaction' is handled via click below

  if (isLoaded) {
    return <div className={className}>{children}</div>
  }

  const defaultPlaceholder = (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 text-center">
      <p className="text-xs text-text-tertiary mb-1">Content deferred to save energy</p>
      {estimatedSizeKB && (
        <p className="text-xs text-text-secondary">~{estimatedSizeKB} KB</p>
      )}
      {loadWhen === 'interaction' && (
        <button
          type="button"
          onClick={load}
          className="mt-3 bg-accent-primary text-black rounded-button px-4 py-1.5 text-xs font-semibold hover:bg-accent-primary-dim transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-appCanvas"
        >
          Load content
        </button>
      )}
    </div>
  )

  return (
    <div
      ref={containerRef}
      className={className}
      onClick={loadWhen === 'interaction' ? load : undefined}
      role={loadWhen === 'interaction' ? 'button' : undefined}
      tabIndex={loadWhen === 'interaction' ? 0 : undefined}
      onKeyDown={
        loadWhen === 'interaction'
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') load() }
          : undefined
      }
    >
      {placeholder ?? defaultPlaceholder}
    </div>
  )
}

export default DeferredContent
