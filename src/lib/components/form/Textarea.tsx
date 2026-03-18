import { forwardRef } from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, className = '', id, ...rest }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const errorId = error ? `${textareaId}-error` : undefined

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full bg-background-cardSurface border ${
            error ? 'border-accent-oled-rose/60' : 'border-borders-default'
          } rounded-input px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-all duration-base ease-solar outline-none focus-visible:border-accent-primary focus-visible:shadow-solar-focus ${
            error ? 'focus-visible:border-accent-oled-rose focus-visible:shadow-[0_0_0_2px_rgb(244_63_94/0.2)]' : ''
          } resize-y min-h-[80px]`}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...rest}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-accent-oled-rose" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-text-tertiary">{helperText}</p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
