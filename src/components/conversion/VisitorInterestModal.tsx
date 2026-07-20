import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X } from 'lucide-react'
import { submitVisitorInterest } from '@/utils/submitVisitorApi'

/** Set while visitor modal is open/closed — LeadCaptureModal uses this to avoid stacking */
export const VISITOR_SESSION_KEY = 'kf_visitor_interest_session'
const SUBMITTED_KEY = 'kf_visitor_interest_submitted'
const SHOW_DELAY_MS = 3000

function alreadySubmittedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SUBMITTED_KEY) === '1'
  } catch {
    return false
  }
}

function markSubmittedThisSession() {
  try {
    sessionStorage.setItem(SUBMITTED_KEY, '1')
    sessionStorage.setItem(VISITOR_SESSION_KEY, 'closed')
  } catch {
    /* ignore */
  }
}

function forceShowFromQuery(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('visitor') === '1'
  } catch {
    return false
  }
}

function getOrCreateSessionId(): string {
  const key = 'kf_visitor_session_id'
  try {
    const existing = sessionStorage.getItem(key)
    if (existing) return existing
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    sessionStorage.setItem(key, id)
    return id
  } catch {
    return `sess_${Date.now()}`
  }
}

function getUtm(param: string): string | undefined {
  try {
    return new URLSearchParams(window.location.search).get(param) || undefined
  } catch {
    return undefined
  }
}

export function VisitorInterestModal() {
  const [open, setOpen] = useState(false)
  const [city, setCity] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const force = forceShowFromQuery()
    // Every page open / reload shows the popup, unless already submitted in this tab session
    if (!force && alreadySubmittedThisSession()) return

    const delay = force ? 400 : SHOW_DELAY_MS
    const t = window.setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem(VISITOR_SESSION_KEY, 'open')
      } catch {
        /* ignore */
      }
    }, delay)
    return () => window.clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    try {
      // Blocks LeadCapture stacking this tab; reload still re-shows visitor popup
      sessionStorage.setItem(VISITOR_SESSION_KEY, 'closed')
    } catch {
      /* ignore */
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmedCity = city.trim()
    if (trimmedCity.length < 2) {
      setError('Please enter your city')
      return
    }
    setSubmitting(true)
    setError(null)
    const result = await submitVisitorInterest({
      city: trimmedCity,
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      sessionId: getOrCreateSessionId(),
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      utmSource: getUtm('utm_source'),
      utmMedium: getUtm('utm_medium'),
      utmCampaign: getUtm('utm_campaign'),
    })
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error || 'Could not save. Please try again.')
      return
    }
    setDone(true)
    markSubmittedThisSession()
    window.setTimeout(() => setOpen(false), 1400)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-navy-900/50 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-0 left-0 right-0 z-[90] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl md:bottom-auto md:left-1/2 md:top-1/2 md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl"
            role="dialog"
            aria-labelledby="visitor-interest-title"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:text-navy-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <div className="py-6 text-center">
                <p className="font-heading text-lg font-bold text-navy-900">Thanks!</p>
                <p className="mt-1 text-sm text-gray-500">We&apos;ll personalise options for your city.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3 pr-8">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 id="visitor-interest-title" className="font-heading text-xl font-bold text-navy-900">
                      Which city are you checking from?
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Helps us show relevant loan options. Phone or email is optional.
                    </p>
                  </div>
                </div>

                <form className="mt-5 space-y-3" onSubmit={onSubmit}>
                  <div>
                    <label htmlFor="visitor-city" className="mb-1 block text-sm font-medium text-navy-900">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="visitor-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Delhi, Mumbai, Jaipur"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                      autoComplete="address-level2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="visitor-name" className="mb-1 block text-sm font-medium text-navy-900">
                      Name <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="visitor-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                      autoComplete="name"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="visitor-phone" className="mb-1 block text-sm font-medium text-navy-900">
                        Phone <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <input
                        id="visitor-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="visitor-email" className="mb-1 block text-sm font-medium text-navy-900">
                        Email <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <input
                        id="visitor-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
                    >
                      {submitting ? 'Saving…' : 'Continue'}
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-navy-900"
                    >
                      Skip
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
