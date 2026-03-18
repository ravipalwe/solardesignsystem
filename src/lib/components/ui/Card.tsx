import { forwardRef } from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'default' | 'outlined' | 'ghost'
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Make card interactive (hover/focus states) */
  interactive?: boolean
}

const variantClasses = {
  default: 'bg-background-cardSurface border border-borders-subtle shadow-solar-sm',
  outlined: 'bg-transparent border border-borders-default',
  ghost: 'bg-transparent',
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-8',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', interactive = false, children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-card ${variantClasses[variant]} ${paddingClasses[padding]} ${
          interactive
            ? 'cursor-pointer hover:bg-background-cardSurfaceHover hover:border-borders-default hover:shadow-solar-md transition-all duration-base ease-solar focus-visible:shadow-solar-focus outline-none'
            : ''
        } ${className}`}
        tabIndex={interactive ? 0 : undefined}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div ref={ref} className={`mb-3 ${className}`} {...rest}>
      {children}
    </div>
  ),
)
CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = '', ...rest }, ref) => (
    <h3 ref={ref} className={`text-base font-semibold text-text-primary tracking-tight ${className}`} {...rest}>
      {children}
    </h3>
  ),
)
CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = '', ...rest }, ref) => (
    <p ref={ref} className={`text-sm text-text-secondary mt-1 leading-relaxed ${className}`} {...rest}>
      {children}
    </p>
  ),
)
CardDescription.displayName = 'CardDescription'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  ),
)
CardContent.displayName = 'CardContent'

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div ref={ref} className={`mt-4 pt-4 border-t border-borders-subtle flex items-center gap-3 ${className}`} {...rest}>
      {children}
    </div>
  ),
)
CardFooter.displayName = 'CardFooter'

export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})
