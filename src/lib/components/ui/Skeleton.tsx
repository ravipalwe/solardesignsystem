import { forwardRef } from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width (CSS value) */
  width?: string
  /** Height (CSS value) */
  height?: string
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular'
  /** Disable animation (energy-saving: no animation in eco mode) */
  animate?: boolean
}

const shapeClasses = {
  text: 'rounded-md',
  circular: 'rounded-full',
  rectangular: 'rounded-lg',
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, variant = 'text', animate = true, className = '', style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={`bg-background-badgeNeutral ${shapeClasses[variant]} ${animate ? 'animate-pulse' : ''} ${className}`}
        style={{
          width: width || '100%',
          height: height || (variant === 'text' ? '1em' : undefined),
          ...style,
        }}
        {...rest}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'

export default Skeleton
