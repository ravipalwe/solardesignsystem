import { useState, useRef, useCallback, useEffect } from 'react'

export interface TooltipProps {
  /** Tooltip text content */
  content: string
  /** Placement relative to trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Delay before showing (ms) — longer = less GPU wake-ups */
  delay?: number
  /** The trigger element */
  children: React.ReactElement
  /** Optional className for the tooltip */
  className?: string
}

const placementStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const Tooltip = ({
  content,
  placement = 'top',
  delay = 200,
  children,
  className = '',
}: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay)
  }, [delay])

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <div
          role="tooltip"
          className={`absolute z-50 ${placementStyles[placement]} px-2.5 py-1.5 text-xs font-medium text-text-primary bg-background-elevated border border-borders-default rounded-md shadow-solar-md whitespace-nowrap pointer-events-none animate-fadeIn ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip
