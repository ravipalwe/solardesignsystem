import { forwardRef } from 'react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  helperText?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, className = '', id, ...rest }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={`flex items-start gap-2.5 ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className="mt-0.5 w-4 h-4 rounded bg-background-cardSurface border border-borders-default text-accent-primary focus-visible:shadow-solar-focus outline-none cursor-pointer accent-[rgb(var(--solar-accent-primary))] transition-colors duration-fast"
          {...rest}
        />
        <div>
          <label htmlFor={checkboxId} className="text-sm text-text-primary cursor-pointer select-none">
            {label}
          </label>
          {helperText && (
            <p className="text-xs text-text-tertiary mt-0.5">{helperText}</p>
          )}
        </div>
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
