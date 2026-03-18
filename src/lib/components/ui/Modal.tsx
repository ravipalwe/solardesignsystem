import { useEffect, useRef, useCallback } from 'react'

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean
  /** Called when the modal should close */
  onClose: () => void
  /** Modal title */
  title?: string
  /** Modal description */
  description?: string
  /** Modal content */
  children: React.ReactNode
  /** Footer content (actions) */
  footer?: React.ReactNode
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Optional className */
  className?: string
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

const Modal = ({ open, onClose, title, description, children, footer, size = 'md', className = '' }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const onCancel = (e: Event) => {
      e.preventDefault()
      handleClose()
    }

    dialog.addEventListener('cancel', onCancel)
    return () => dialog.removeEventListener('cancel', onCancel)
  }, [handleClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      handleClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={`backdrop:bg-black/70 bg-transparent p-0 m-auto outline-none open:flex open:items-center open:justify-center ${className}`}
      style={{ maxWidth: 'none', maxHeight: 'none', width: '100vw', height: '100vh' }}
    >
      <div className={`relative w-full ${sizeClasses[size]} mx-4 bg-background-cardSurface border border-borders-subtle rounded-xl shadow-solar-lg animate-slideUp`}>
        {/* Header */}
        {(title || description) && (
          <div className="px-6 pt-6 pb-0">
            {title && (
              <h2 className="text-lg font-semibold text-text-primary tracking-tight pr-8">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-0 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-md text-text-tertiary hover:text-text-primary transition-colors duration-fast outline-none focus-visible:shadow-solar-focus"
          aria-label="Close"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </dialog>
  )
}

Modal.displayName = 'Modal'

export default Modal
