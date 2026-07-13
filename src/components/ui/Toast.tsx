import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/utils/cn'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = `toast-${++toastCounter}`
    setToasts((prev) => [...prev.slice(-4), { id, message, variant }])
    window.setTimeout(() => dismiss(id), 5000)
  }, [dismiss])

  const value = useMemo(
    () => ({
      showToast,
      showSuccess: (message: string) => showToast(message, 'success'),
      showError: (message: string) => showToast(message, 'error'),
    }),
    [showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className={cn(
                'pointer-events-auto flex items-start gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg',
                toast.variant === 'success' && 'border-green-200 bg-green-50 text-green-900',
                toast.variant === 'error' && 'border-red-200 bg-red-50 text-red-900',
                toast.variant === 'info' && 'border-slate-200 bg-white text-slate-800',
              )}
              role="status"
            >
              {toast.variant === 'success' && (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
              )}
              {toast.variant === 'error' && (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden />
              )}
              <p className="flex-1 leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    return {
      showToast: () => {},
      showSuccess: () => {},
      showError: () => {},
    }
  }
  return ctx
}
