import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { SITE } from '@/data/site'

const STORAGE_KEY = 'kf_exit_intent_shown'

export function ExitIntentModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 8 && !sessionStorage.getItem(STORAGE_KEY)) {
        setOpen(true)
        sessionStorage.setItem(STORAGE_KEY, '1')
      }
    }

    document.addEventListener('mouseout', onLeave)
    return () => document.removeEventListener('mouseout', onLeave)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-navy-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[90] w-[min(420px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-gradient-to-br from-navy-900 to-brand-900 p-8 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <Sparkles className="h-8 w-8 text-brand-400" />
            <h3 className="mt-4 font-heading text-2xl font-bold">Fast Loan Apply</h3>
            <p className="mt-2 text-sm text-slate-300">
              Compare 50+ lenders free. Apply in minutes — our experts find the lowest EMI for you.
            </p>
            <Link
              to={SITE.applyLoanUrl}
              onClick={() => setOpen(false)}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-500 py-3.5 font-bold text-navy-900"
            >
              Fast Loan Apply
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
