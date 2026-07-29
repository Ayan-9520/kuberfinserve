import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, KeyRound, LogIn, Send, Sparkles } from 'lucide-react'
import { HERO_TRUST_STRIP, PARTNER_BUSINESS_TYPES, INDIAN_STATES } from '@/data/partners'
import { SITE } from '@/data/site'
import { CityInput } from '@/components/ui/CityInput'
import { useToast } from '@/components/ui/Toast'
import { submitPartnerApply, type PartnerApplyFormData } from '@/utils/leads'
import { cn } from '@/utils/cn'

interface PartnerApplyFormProps {
  className?: string
  variant?: 'default' | 'hero'
}

const STEPS = [
  { id: 1, label: 'Contact', fields: ['name', 'phone', 'email'] as const },
  { id: 2, label: 'Location', fields: ['city', 'state'] as const },
  { id: 3, label: 'Business', fields: ['businessType'] as const },
] as const

export function PartnerApplyForm({ className, variant = 'default' }: PartnerApplyFormProps) {
  const isHero = variant === 'hero'
  const [step, setStep] = useState(0)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitOk, setSubmitOk] = useState(false)
  const [applicationId, setApplicationId] = useState<number | null>(null)
  const [partnerCode, setPartnerCode] = useState<string | null>(null)
  const { showSuccess, showError } = useToast()
  const phoneAdvanceLock = useRef(false)
  const locationAdvanceLock = useRef(false)
  /** After Back, block auto-advance until user edits fields or clicks Continue */
  const suppressAutoAdvance = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PartnerApplyFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      companyName: '',
      businessType: '',
      experience: '',
    },
  })

  const phone = watch('phone')
  const nameVal = watch('name')
  const emailVal = watch('email')
  const businessType = watch('businessType')
  const stateVal = watch('state')
  const cityVal = watch('city')

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-gray-400 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/15'

  // Re-enable auto-advance when user edits fields on the current step
  useEffect(() => {
    if (step === 0) suppressAutoAdvance.current = false
  }, [phone, nameVal, emailVal])

  useEffect(() => {
    if (step === 1) suppressAutoAdvance.current = false
  }, [cityVal, stateVal])

  /** Auto-advance step 1 → 2 when phone hits 10 valid digits + other contact fields ok */
  useEffect(() => {
    if (step !== 0 || suppressAutoAdvance.current || phoneAdvanceLock.current) return
    const digits = (phone || '').replace(/\D/g, '')
    if (digits.length !== 10 || !/^[6-9]\d{9}$/.test(digits)) return

    const run = async () => {
      if (suppressAutoAdvance.current) return
      const ok = await trigger(['name', 'phone', 'email'])
      if (!ok) return
      phoneAdvanceLock.current = true
      setStep(1)
    }
    void run()
  }, [phone, nameVal, emailVal, step, trigger])

  /** Auto-advance step 2 → 3 when state selected and city filled */
  useEffect(() => {
    if (step !== 1 || suppressAutoAdvance.current || locationAdvanceLock.current) return
    if (!stateVal || !cityVal || cityVal.trim().length < 2) return

    const run = async () => {
      if (suppressAutoAdvance.current) return
      const ok = await trigger(['city', 'state'])
      if (!ok) return
      locationAdvanceLock.current = true
      setStep(2)
    }
    const t = window.setTimeout(() => void run(), 350)
    return () => window.clearTimeout(t)
  }, [stateVal, cityVal, step, trigger])

  const goNext = async () => {
    const fields = STEPS[step].fields
    const ok = await trigger([...fields])
    if (!ok) return
    suppressAutoAdvance.current = false
    if (step === 0) phoneAdvanceLock.current = true
    if (step === 1) locationAdvanceLock.current = true
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setSubmitError(null)
    // Stop auto-advance from instantly pushing forward again
    suppressAutoAdvance.current = true
    phoneAdvanceLock.current = false
    locationAdvanceLock.current = false
    setStep((s) => Math.max(s - 1, 0))
  }

  const onFinalSubmit = async (data: PartnerApplyFormData) => {
    if (data._gotcha) return

    setSubmitError(null)
    const result = await submitPartnerApply(data, 'partners-landing-form')

    if (!result.ok) {
      const message = result.error ?? 'Could not submit. Please WhatsApp us.'
      setSubmitError(message)
      showError(message)
      return
    }

    setSubmitOk(true)
    setApplicationId(result.id ?? null)
    setPartnerCode(result.partnerCode ?? null)
    showSuccess(
      result.message ||
        (result.partnerCode
          ? `Registration successful (${result.partnerCode}). Our team will contact you within 48 hours.`
          : 'Registration successful. Our team will contact you within 48 hours.'),
    )
    reset()
    setStep(0)
    phoneAdvanceLock.current = false
    locationAdvanceLock.current = false
  }

  if (submitOk) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-brand-50/40 p-6 text-left shadow-xl sm:p-7',
          className,
        )}
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="mt-4 font-heading text-lg font-bold text-navy-900">Registration successful</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Your partner application has been received
            {applicationId ? (
              <>
                {' '}
                (reference <strong>#{applicationId}</strong>)
              </>
            ) : null}
            {partnerCode ? (
              <>
                {' '}
                · Partner Code <strong>{partnerCode}</strong>
              </>
            ) : null}
            . Our team will contact you within <strong>48 hours</strong> with next steps, training
            access, and approval status. Login will be available only after approval.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-brand-100 bg-white/90 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-navy-900">
            <KeyRound className="h-4 w-4 text-brand-600" />
            What happens next
          </div>
          <ol className="space-y-2.5 text-[13px] leading-snug text-gray-600">
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                1
              </span>
              <span>
                Within <strong>48 hours</strong>, our verification team reviews your application and
                emails you the next steps.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                2
              </span>
              <span>
                After approval, open <strong>Partner Login</strong> and request an OTP using your
                registered mobile, email, or Partner Code.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                3
              </span>
              <span>
                Verify the OTP to access the {SITE.platformName} Partner App or dashboard. Login is
                blocked until approval.
              </span>
            </li>
          </ol>
        </div>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <Link
            to={SITE.partnerLoginUrl}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-brand-600/25 hover:brightness-105"
          >
            <LogIn className="h-4 w-4" />
            Go to Partner Login
          </Link>
          <button
            type="button"
            onClick={() => {
              setSubmitOk(false)
              setApplicationId(null)
              setPartnerCode(null)
            }}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-700 hover:bg-slate-50"
          >
            Submit another
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-gray-500">
          Keep your Partner Code handy. Our team responds within 48 hours.
        </p>
      </motion.div>
    )
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <form
      id={isHero ? 'apply' : undefined}
      onSubmit={(e) => {
        e.preventDefault()
        if (step < STEPS.length - 1) {
          void goNext()
          return
        }
        void handleSubmit(onFinalSubmit)()
      }}
      className={cn(
        'relative overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgb(15_41_32/0.18)]',
        isHero
          ? 'border border-slate-200/90 ring-1 ring-brand-100/80'
          : 'border border-slate-200/90 ring-1 ring-brand-100/60',
        isHero && 'kf-sticky-form',
        className,
      )}
      noValidate
    >
      {/* Premium header — flush with card top */}
      <div className="border-b border-brand-100 bg-gradient-to-r from-brand-50 via-white to-emerald-50/80 px-5 py-4">
        <div>
          <p className="font-heading text-base font-bold text-navy-900">Partner Registration</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Step {step + 1} of {STEPS.length} · {STEPS[step].label} · Takes about 2 minutes
          </p>
        </div>

        {/* Progress */}
        <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-brand-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                if (i < step) {
                  suppressAutoAdvance.current = true
                  setStep(i)
                }
              }}
              className={cn(
                'flex flex-1 items-center justify-center gap-1 rounded-lg py-1 text-[10px] font-semibold transition',
                i === step && 'bg-brand-100 text-brand-900',
                i < step && 'text-brand-700 hover:bg-brand-50',
                i > step && 'text-slate-400',
              )}
            >
              {i < step ? <Check className="h-3 w-3" /> : <span>{s.id}</span>}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-5 md:p-6">
        <input
          {...register('_gotcha')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          aria-hidden
        />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-contact"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-3.5"
            >
              <p className="text-xs font-medium text-gray-500">
                Your contact details — we&apos;ll move ahead automatically when ready.
              </p>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">Full Name *</label>
                <input
                  {...register('name', {
                    required: 'Required',
                    minLength: { value: 2, message: 'Min 2 chars' },
                  })}
                  placeholder="As per PAN / Aadhaar"
                  autoComplete="name"
                  className={cn(inputClass, errors.name && 'border-red-400')}
                />
                {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">Mobile *</label>
                <input
                  {...register('phone', {
                    required: 'Required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Valid 10-digit mobile' },
                  })}
                  placeholder="10-digit mobile"
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                  className={cn(inputClass, errors.phone && 'border-red-400')}
                />
                {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone.message}</p>}
                <p className="mt-1 text-[10px] text-gray-400">After 10 digits, next step opens automatically.</p>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">Email *</label>
                <input
                  {...register('email', {
                    required: 'Required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email',
                    },
                  })}
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  className={cn(inputClass, errors.email && 'border-red-400')}
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-location"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-3.5"
            >
              <p className="text-xs font-medium text-gray-500">
                Where do you operate? Select city &amp; state to continue.
              </p>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">City *</label>
                <CityInput
                  {...register('city', {
                    required: 'Required',
                    minLength: { value: 2, message: 'Min 2 chars' },
                  })}
                  placeholder="Delhi, Noida, Mumbai…"
                  className={inputClass}
                  error={!!errors.city}
                />
                {errors.city && <p className="mt-1 text-[11px] text-red-500">{errors.city.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">State *</label>
                <select
                  {...register('state', { required: 'Required' })}
                  className={cn(inputClass, errors.state && 'border-red-400')}
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-[11px] text-red-500">{errors.state.message}</p>}
              </div>
              <p className="rounded-xl bg-brand-50 px-3 py-2 text-[11px] text-brand-800">
                Hi {getValues('name')?.split(' ')[0] || 'there'} — almost done. Next: business profile.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-business"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-3.5"
            >
              <p className="text-xs font-medium text-gray-500">
                Tell us about your business — then submit your partner application.
              </p>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">
                  Company Name <span className="font-normal text-gray-400">(Optional)</span>
                </label>
                <input
                  {...register('companyName')}
                  placeholder="Firm / company name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">Business Type *</label>
                <select
                  {...register('businessType', { required: 'Required' })}
                  className={cn(inputClass, errors.businessType && 'border-red-400')}
                >
                  <option value="">Select your profile</option>
                  {PARTNER_BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.businessType.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">Experience</label>
                <input
                  {...register('experience')}
                  placeholder="Years in finance / sales"
                  className={inputClass}
                />
              </div>
              {businessType && (
                <p className="rounded-xl border border-brand-100 bg-brand-50/70 px-3 py-2 text-[11px] text-brand-900">
                  Selected: <strong>{businessType}</strong> — ready to submit.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {submitError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600">
            {submitError}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => void goNext()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3 text-sm font-bold text-white shadow-md shadow-brand-600/25 hover:brightness-105"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3 text-sm font-bold text-white shadow-md shadow-brand-600/25 hover:brightness-105 disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Submitting…' : 'Become a Kuber Partner'}
            </button>
          )}
        </div>

        <p className="text-center text-[10px] leading-relaxed text-gray-400">
          By continuing you agree to be contacted about the partner program.
        </p>

        {isHero && (
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
            {HERO_TRUST_STRIP.map((item) => (
              <span
                key={item}
                className="rounded-xl border border-brand-100 bg-brand-50/70 px-2.5 py-1.5 text-center text-[10px] font-semibold text-brand-800"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}
