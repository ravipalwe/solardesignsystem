import { useEffect, useState, useCallback, createContext, useContext, useRef } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger'

export interface ToastData {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  toasts: ToastData[]
  addToast: (toast: Omit<ToastData, 'id'>) => void
  removeToast: (id: string) => void
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

// ---------------------------------------------------------------------------
// Single Toast
// ---------------------------------------------------------------------------

const variantClasses = {
  default: 'border-borders-default',
  success: 'border-accent-success/30',
  warning: 'border-accent-solar-amber/30',
  danger: 'border-accent-oled-rose/30',
}

const dotColors = {
  default: 'bg-text-tertiary',
  success: 'bg-accent-success',
  warning: 'bg-accent-solar-amber',
  danger: 'bg-accent-oled-rose',
}

function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: (id: string) => void }) {
  const [exiting, setExiting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const dismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => onRemove(toast.id), 180)
  }, [toast.id, onRemove])

  useEffect(() => {
    const duration = toast.duration ?? 4000
    if (duration > 0) {
      timerRef.current = setTimeout(dismiss, duration)
    }
    return () => clearTimeout(timerRef.current)
  }, [toast.duration, dismiss])

  const variant = toast.variant || 'default'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 w-80 px-4 py-3 bg-background-elevated border ${variantClasses[variant]} rounded-lg shadow-solar-lg transition-all duration-base ease-solar ${
        exiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0 animate-slideUp'
      }`}
    >
      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColors[variant]}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-text-secondary">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="flex-shrink-0 p-0.5 rounded text-text-tertiary hover:text-text-primary transition-colors duration-fast outline-none focus-visible:shadow-solar-focus"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

let toastCounter = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastCounter}`
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container — bottom-right, fixed */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-2 pointer-events-auto">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}
