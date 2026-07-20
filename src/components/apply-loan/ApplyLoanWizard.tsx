import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Save,
  ShieldCheck,
  TrendingUp,
  Clock,
  IndianRupee,
  BadgeCheck,
} from 'lucide-react'
import { CityInput } from '@/components/ui/CityInput'
import { useToast } from '@/components/ui/Toast'
import type { LeadApplicationData } from '@/components/LeadApplicationForm'
import {
  EMPLOYMENT_TYPES_LEAD,
  TENURE_OPTIONS,
  LOAN_TYPE_OPTIONS,
} from '@/data/forms'
import { DRAFT_STORAGE_KEY, WIZARD_STEPS, WORK_EXPERIENCE_OPTIONS } from '@/data/applyLoanPage'
import { SITE } from '@/data/site'
import { generateLeadId, submitApplyLoanWizard } from '@/utils/leads'
import { cn } from '@/utils/cn'
import type { ApplyLoanWizardData } from '@/components/apply-loan/types'
import { EMPTY_WIZARD } from '@/components/apply-loan/types'
import {
  estimateEligibilityScore,
  getEmiPreview,
  needsPropertyValue,
} from '@/components/apply-loan/applyLoanUtils'

const inputClass =
  'w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15'

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-navy-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  )
}

function toLeadData(data: ApplyLoanWizardData, leadId: string): LeadApplicationData {
  const lines = [`Lead ID: ${leadId}`, 'Channel: apply-loan-wizard-v2']
  if (data.propertyValue.trim()) lines.push(`Property value: ${data.propertyValue.trim()}`)
  return {
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    city: data.city.trim(),
    age: '',
    employmentType: data.employmentType,
    companyName: data.companyName.trim(),
    monthlyIncome: data.monthlyIncome,
    workExperience: data.workExperience,
    loanType: data.loanType,
    loanAmount: data.loanAmount.trim(),
    tenureMonths: data.tenureMonths,
    existingEmi: '',
    purpose: '',
    pan: '',
    message: lines.join('\n'),
    agreeTerms: data.agreeTerms,
  }
}

export function ApplyLoanWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<ApplyLoanWizardData>(EMPTY_WIZARD)
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyLoanWizardData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ leadId: string } | null>(null)
  const [draftSaved, setDraftSaved] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as { data?: ApplyLoanWizardData; step?: number }
      if (parsed.data) setData({ ...EMPTY_WIZARD, ...parsed.data })
      if (parsed.step && parsed.step >= 1 && parsed.step <= 4) setStep(parsed.step)
    } catch {
      /* ignore */
    }
  }, [])

  const persistDraft = useCallback((next: ApplyLoanWizardData, s: number) => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ data: next, step: s, at: Date.now() }))
      setDraftSaved(true)
      const t = window.setTimeout(() => setDraftSaved(false), 2000)
      return () => clearTimeout(t)
    } catch {
      return undefined
    }
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => persistDraft(data, step), 600)
    return () => clearTimeout(t)
  }, [data, step, persistDraft])

  const update = (patch: Partial<ApplyLoanWizardData>) => {
    setData((d) => ({ ...d, ...patch }))
    setErrors((e) => {
      const next = { ...e }
      for (const k of Object.keys(patch) as (keyof ApplyLoanWizardData)[]) {
        delete next[k]
      }
      return next
    })
  }

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof ApplyLoanWizardData, string>> = {}
    if (s === 1) {
      if (!data.fullName.trim()) e.fullName = 'Required'
      if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, '').slice(-10)))
        e.phone = 'Valid 10-digit mobile required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required'
      if (!data.city.trim()) e.city = 'Required'
    }
    if (s === 2) {
      if (!data.employmentType) e.employmentType = 'Required'
      if (!data.monthlyIncome || Number(data.monthlyIncome) < 1)
        e.monthlyIncome = 'Enter monthly income'
      if (!data.companyName.trim()) e.companyName = 'Required'
      if (!data.workExperience) e.workExperience = 'Required'
    }
    if (s === 3) {
      if (!data.loanType) e.loanType = 'Required'
      if (!data.loanAmount.trim()) e.loanAmount = 'Required'
      if (!data.tenureMonths) e.tenureMonths = 'Required'
      if (needsPropertyValue(data.loanType) && !data.propertyValue.trim())
        e.propertyValue = 'Required for this loan type'
    }
    if (s === 4 && !data.agreeTerms) e.agreeTerms = 'Please accept terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goNext = () => {
    if (!validateStep(step)) return
    setStep((s) => Math.min(4, s + 1))
  }

  const goBack = () => setStep((s) => Math.max(1, s - 1))

  const handleSubmit = async () => {
    if (honeypotRef.current?.value) return
    if (!validateStep(4)) return

    const leadId = generateLeadId()
    setSubmitting(true)
    setSubmitError(null)

    const result = await submitApplyLoanWizard(
      toLeadData(data, leadId),
      'apply-loan-wizard',
      { leadId, propertyValue: data.propertyValue.trim() || undefined },
    )

    setSubmitting(false)
    if (result.ok) {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY)
      } catch {
        /* ignore */
      }
      setSuccess({ leadId: result.leadId })
      showSuccess(`Application submitted successfully. Reference: ${result.leadId}`)
      return
    }
    const message = result.error || 'Submission failed. Please call us.'
    setSubmitError(message)
    showError(message)
  }

  const preview = getEmiPreview(data.loanType, data.loanAmount, data.tenureMonths)
  const eligibility = estimateEligibilityScore(
    data.monthlyIncome,
    data.loanAmount,
    data.employmentType,
  )
  const progress = ((step - 1) / (WIZARD_STEPS.length - 1)) * 100

  if (success) {
    const waText = encodeURIComponent(
      `Hi KuberFinserve, I submitted loan application ${success.leadId}. Please assist.`,
    )
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-[24px] border border-brand-100 bg-white p-8 text-center shadow-[0_20px_50px_rgb(15_23_42/0.08)]"
      >
        <CheckCircle2 className="h-16 w-16 text-brand-600" />
        <h3 className="mt-4 font-heading text-2xl font-bold text-navy-900">Application Received</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-600">
          Your reference ID is saved. Our relationship manager will contact you within 24 hours.
        </p>
        <p className="mt-4 rounded-2xl bg-brand-50 px-5 py-3 font-mono text-sm font-bold text-brand-800">
          {success.leadId}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-gradient-btn px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
          >
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy-800"
          >
            Call {SITE.phone}
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <div
      id="apply-wizard"
      className="flex h-full min-h-[28rem] flex-col rounded-[24px] border border-slate-200/80 bg-white shadow-[0_20px_50px_rgb(15_23_42/0.08)]"
    >
      <input ref={honeypotRef} type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="border-b border-slate-100 px-5 py-5 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
              Loan Application
            </p>
            <p className="text-sm text-gray-500">Step {step} of 4 — {WIZARD_STEPS[step - 1]?.label}</p>
          </div>
          <button
            type="button"
            onClick={() => persistDraft(data, step)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-slate-50"
          >
            <Save className="h-3.5 w-3.5" />
            {draftSaved ? 'Saved' : 'Save draft'}
          </button>
        </div>

        <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-700 to-brand-600"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>

        <div className="mt-4 flex justify-between gap-1">
          {WIZARD_STEPS.map((s) => {
            const active = s.id === step
            const done = s.id < step
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => s.id < step && setStep(s.id)}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 text-center transition',
                  s.id <= step ? 'cursor-pointer' : 'cursor-default opacity-50',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition',
                    active && 'bg-brand-700 text-white shadow-md shadow-brand-700/30',
                    done && !active && 'bg-brand-100 text-brand-800',
                    !active && !done && 'bg-slate-100 text-slate-500',
                  )}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                </span>
                <span
                  className={cn(
                    'hidden text-[10px] font-semibold sm:block',
                    active ? 'text-brand-800' : 'text-gray-500',
                  )}
                >
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-6 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name *" error={errors.fullName} className="sm:col-span-2">
                  <input
                    value={data.fullName}
                    onChange={(e) => update({ fullName: e.target.value })}
                    className={cn(inputClass, errors.fullName && 'border-red-400')}
                    placeholder="As per PAN"
                  />
                </Field>
                <Field label="Mobile *" error={errors.phone}>
                  <input
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    className={cn(inputClass, errors.phone && 'border-red-400')}
                    placeholder="10-digit number"
                    inputMode="tel"
                  />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => update({ email: e.target.value })}
                    className={cn(inputClass, errors.email && 'border-red-400')}
                    placeholder="you@email.com"
                  />
                </Field>
                <Field label="City *" error={errors.city} className="sm:col-span-2">
                  <CityInput
                    value={data.city}
                    onChange={(e) => update({ city: e.target.value })}
                    className={cn(inputClass, errors.city && 'border-red-400')}
                    placeholder="Your city"
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Employment Type *" error={errors.employmentType}>
                  <select
                    value={data.employmentType}
                    onChange={(e) => update({ employmentType: e.target.value })}
                    className={cn(inputClass, errors.employmentType && 'border-red-400')}
                  >
                    <option value="">Select</option>
                    {EMPLOYMENT_TYPES_LEAD.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Monthly Income (₹) *" error={errors.monthlyIncome}>
                  <input
                    type="number"
                    value={data.monthlyIncome}
                    onChange={(e) => update({ monthlyIncome: e.target.value })}
                    className={cn(inputClass, errors.monthlyIncome && 'border-red-400')}
                    placeholder="e.g. 75000"
                    min={1}
                    inputMode="numeric"
                  />
                </Field>
                <Field label="Company Name *" error={errors.companyName}>
                  <input
                    value={data.companyName}
                    onChange={(e) => update({ companyName: e.target.value })}
                    className={cn(inputClass, errors.companyName && 'border-red-400')}
                    placeholder="Employer / business name"
                  />
                </Field>
                <Field label="Work Experience *" error={errors.workExperience}>
                  <select
                    value={data.workExperience}
                    onChange={(e) => update({ workExperience: e.target.value })}
                    className={cn(inputClass, errors.workExperience && 'border-red-400')}
                  >
                    <option value="">Select</option>
                    {WORK_EXPERIENCE_OPTIONS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Loan Type *" error={errors.loanType} className="sm:col-span-2">
                    <select
                      value={data.loanType}
                      onChange={(e) => update({ loanType: e.target.value })}
                      className={cn(inputClass, errors.loanType && 'border-red-400')}
                    >
                      <option value="">Select loan</option>
                      {LOAN_TYPE_OPTIONS.filter(
                        (t) => t !== 'Insurance' && t !== 'Credit Card',
                      ).map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Loan Amount *" error={errors.loanAmount}>
                    <input
                      value={data.loanAmount}
                      onChange={(e) => update({ loanAmount: e.target.value })}
                      className={cn(inputClass, errors.loanAmount && 'border-red-400')}
                      placeholder="e.g. 50 Lakh or 5000000"
                    />
                  </Field>
                  <Field label="Tenure *" error={errors.tenureMonths}>
                    <select
                      value={data.tenureMonths}
                      onChange={(e) => update({ tenureMonths: e.target.value })}
                      className={cn(inputClass, errors.tenureMonths && 'border-red-400')}
                    >
                      <option value="">Select tenure</option>
                      {TENURE_OPTIONS.map((t) => (
                        <option key={t.months} value={String(t.months)}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {needsPropertyValue(data.loanType) && (
                    <Field
                      label="Property Value *"
                      error={errors.propertyValue}
                      className="sm:col-span-2"
                    >
                      <input
                        value={data.propertyValue}
                        onChange={(e) => update({ propertyValue: e.target.value })}
                        className={cn(inputClass, errors.propertyValue && 'border-red-400')}
                        placeholder="Estimated property value"
                      />
                    </Field>
                  )}
                </div>

                {(data.loanAmount || data.tenureMonths) && (
                  <div className="grid gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-4 sm:grid-cols-2">
                    <PreviewChip icon={IndianRupee} label="Est. EMI" value={preview.emi} />
                    <PreviewChip icon={TrendingUp} label="Interest range" value={preview.rateRange} />
                    <PreviewChip icon={Clock} label="Approval timeline" value={preview.timeline} />
                    <PreviewChip
                      icon={BadgeCheck}
                      label="Eligibility score"
                      value={`${eligibility}/100`}
                    />
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm">
                  <ReviewRow label="Name" value={data.fullName} />
                  <ReviewRow label="Mobile" value={data.phone} />
                  <ReviewRow label="Email" value={data.email} />
                  <ReviewRow label="City" value={data.city} />
                  <ReviewRow label="Employment" value={data.employmentType} />
                  <ReviewRow label="Income" value={data.monthlyIncome} />
                  <ReviewRow label="Company" value={data.companyName} />
                  <ReviewRow label="Experience" value={data.workExperience} />
                  <ReviewRow label="Loan" value={data.loanType} />
                  <ReviewRow label="Amount" value={data.loanAmount} />
                  <ReviewRow
                    label="Tenure"
                    value={
                      TENURE_OPTIONS.find((t) => String(t.months) === data.tenureMonths)?.label ||
                      data.tenureMonths
                    }
                  />
                  {data.propertyValue && (
                    <ReviewRow label="Property" value={data.propertyValue} />
                  )}
                </div>

                <div className="grid gap-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/60 p-4 sm:grid-cols-2">
                  <PreviewChip icon={IndianRupee} label="Estimated EMI" value={preview.emi} />
                  <PreviewChip icon={TrendingUp} label="Interest Rate Range" value={preview.rateRange} />
                  <PreviewChip icon={Clock} label="Approval Timeline" value={preview.timeline} />
                  <PreviewChip
                    icon={BadgeCheck}
                    label="Eligibility Score"
                    value={`${eligibility}/100`}
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={data.agreeTerms}
                    onChange={(e) => update({ agreeTerms: e.target.checked })}
                    className="mt-0.5 rounded border-gray-300 text-brand-700"
                  />
                  <span>
                    I agree to be contacted by KuberFinserve and partner lenders. I have read the{' '}
                    <a href="/privacy-policy" className="font-medium text-brand-700 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-red-500">{errors.agreeTerms}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {submitError && (
          <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</p>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
              256-bit secure form
            </span>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="ml-auto inline-flex items-center gap-2 rounded-2xl bg-gradient-btn px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-700/25 transition hover:opacity-95"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="ml-auto inline-flex items-center gap-2 rounded-2xl bg-gradient-btn px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function PreviewChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-white/80 p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <p className="font-heading text-sm font-bold text-navy-900">{value}</p>
      </div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200/60 py-2 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-navy-900">{value}</span>
    </div>
  )
}
