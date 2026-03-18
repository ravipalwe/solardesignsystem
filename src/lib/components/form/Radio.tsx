export interface RadioOption {
  value: string
  label: string
  helperText?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  /** Group label */
  label?: string
  /** Group name attribute */
  name: string
  /** Available options */
  options: RadioOption[]
  /** Currently selected value */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Layout direction */
  direction?: 'vertical' | 'horizontal'
  /** Optional className */
  className?: string
}

const RadioGroup = ({ label, name, options, value, onChange, direction = 'vertical', className = '' }: RadioGroupProps) => {
  return (
    <fieldset className={className} role="radiogroup" aria-label={label}>
      {label && (
        <legend
          className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-3"
          style={{ letterSpacing: '0.05em' }}
        >
          {label}
        </legend>
      )}
      <div className={`${direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-3'}`}>
        {options.map((opt) => (
          <div key={opt.value} className="flex items-start gap-3">
            <input
              type="radio"
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
              disabled={opt.disabled}
              className="mt-0.5 w-4 h-4 bg-background-badgeNeutral border border-borders-subtle text-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-appCanvas cursor-pointer accent-accent-primary"
            />
            <div>
              <label
                htmlFor={`${name}-${opt.value}`}
                className={`text-sm cursor-pointer ${opt.disabled ? 'text-text-tertiary' : 'text-text-primary'}`}
              >
                {opt.label}
              </label>
              {opt.helperText && (
                <p className="text-xs text-text-tertiary mt-0.5">{opt.helperText}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default RadioGroup
