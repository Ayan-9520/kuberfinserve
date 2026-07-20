import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

const STORAGE_KEY = 'kf_lead_modal_shown'
const VISITOR_SESSION_KEY = 'kf_visitor_interest_session'

export function LeadCaptureModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    // Avoid stacking with visitor interest popup in the same session
    const visitorState = sessionStorage.getItem(VISITOR_SESSION_KEY)
    if (visitorState === 'open' || visitorState === 'closed') return
    const t = window.setTimeout(() => {
      if (sessionStorage.getItem(VISITOR_SESSION_KEY)) return
      setOpen(true)
      sessionStorage.setItem(STORAGE_KEY, '1')
    }, 45000)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-navy-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-0 left-0 right-0 z-[90] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl md:bottom-auto md:left-1/2 md:top-1/2 md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:text-navy-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-heading text-xl font-bold text-navy-900">Get a Free Loan Consultation</h3>
            <p className="mt-1 text-sm text-gray-500">Our expert will call you within 24 hours.</p>
            <div className="mt-4">
              <ContactForm
                source="lead-capture-modal"
                variant="premium"
                title="Quick Enquiry"
                onSuccess={() => setOpen(false)}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
