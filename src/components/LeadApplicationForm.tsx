import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send, ShieldCheck } from 'lucide-react'
import { CityInput } from '@/components/ui/CityInput'
import { useToast } from '@/components/ui/Toast'
import {
  EMPLOYMENT_TYPES_LEAD,
  INCOME_RANGES,
  TENURE_OPTIONS,
  LOAN_TYPE_OPTIONS,
} from '@/data/forms'
import { WORK_EXPERIENCE_OPTIONS } from '@/data/applyLoanPage'
import { SITE } from '@/data/site'
import { submitLead } from '@/utils/leads'
import { capturePartnerReferralFromUrl } from '@/utils/partnerReferral'
import { cn } from '@/utils/cn'

export interface LeadApplicationData {
  fullName: string
  phone: string
  email: string
  city: string
  age: string
  employmentType: string
  companyName: string
  monthlyIncome: string
  workExperience: string
  loanType: string
  loanAmount: string
  tenureMonths: string
  existingEmi: string
  purpose: string
  pan: string
  message: string
  agreeTerms: boolean
  _gotcha?: string
}

interface LeadApplicationFormProps {
  defaultLoanType?: string
  source?: string
  compact?: boolean
  /** Wider 2-column field layout (apply-loan page) */
  twoColumn?: boolean
  /** Taller inputs & full-height card (apply-loan page) */
  applyPage?: boolean
  /** Full application form with sections (apply-loan page) */
  applicationForm?: boolean
  title?: string
  hideTitle?: boolean
  className?: string
}

function FormSection({
  title,
  description,
  children,
  compact,
}: {
  title: string
  description?: string
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <fieldset
      className={cn(
        'rounded-lg border border-gray-200 bg-gray-50/50',
        compact ? 'p-3' : 'p-4 md:p-5',
      )}
    >
      <legend
        className={cn(
          'px-1 font-heading font-bold text-navy-900',
          compact ? 'text-xs' : 'text-sm md:text-base',
        )}
      >
        {title}
      </legend>
      {description && (
        <p className={cn('text-gray-500', compact ? 'mb-2 mt-0.5 text-[11px]' : 'mb-4 mt-1 text-xs')}>
          {description}
        </p>
      )}
      {!description && <div className={compact ? 'mb-2' : 'mb-3'} />}
      <div className={cn('grid sm:grid-cols-2', compact ? 'gap-2.5' : 'gap-4')}>{children}</div>
    </fieldset>
  )
}

function FormField({
  label,
  error,
  children,
  className,
  compact,
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
  compact?: boolean
}) {
  return (
    <div className={className}>
      <label
        className={cn(
          'block font-medium text-gray-700',
          compact ? 'mb-1 text-xs' : 'mb-1.5 text-sm',
        )}
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-0.5 text-[11px] text-red-600">{error}</p>}
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
      {children}
      {error && <p className="mt-0.5 text-[11px] text-red-500">{error}</p>}
    </div>
  )
}

export function LeadApplicationForm({
  defaultLoanType = '',
  source = 'website',
  compact = false,
  twoColumn = false,
  applyPage = false,
  applicationForm = false,
  title,
  hideTitle = false,
  className,
}: LeadApplicationFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitWarning, setSubmitWarning] = useState<string | null>(null)
  const [submitOk, setSubmitOk] = useState(false)
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    capturePartnerReferralFromUrl()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadApplicationData>({
    defaultValues: {
      loanType: defaultLoanType,
      agreeTerms: false,
      companyName: '',
      workExperience: '',
      message: '',
    },
  })

  const onSubmit = async (data: LeadApplicationData) => {
    if (data._gotcha) return
    setSubmitError(null)
    setSubmitWarning(null)
    setSubmitOk(false)
    const result = await submitLead(data, source)
    if (!result.ok) {
      const message = result.error ?? 'Could not submit. Please call us.'
      setSubmitError(message)
      showError(message)
      return
    }
    setSubmitWarning(result.warning ?? null)
    setSubmitOk(true)
    showSuccess('Application submitted. Our team will contact you shortly.')
    reset({
      loanType: defaultLoanType,
      agreeTerms: false,
      companyName: '',
      workExperience: '',
      message: '',
    })
  }

  const inputClass = cn(
    'w-full rounded-md border bg-white text-brand-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20',
    applicationForm
      ? 'border-gray-300 px-2.5 py-2 text-sm'
      : applyPage
        ? 'border-slate-200 px-4 py-3 text-base'
        : 'border-gray-200 px-3 py-2.5 text-sm',
  )

  const span2 = 'sm:col-span-2'

  if (submitOk) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('rounded-2xl border border-green-200 bg-green-50 p-6 text-center', className)}
      >
        <ShieldCheck className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-3 font-heading font-bold text-brand-900">Thank you!</p>
        <p className="mt-1 text-sm text-gray-600">
          Application saved. Our team will call you within 24 hours.
        </p>
        {submitWarning && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">{submitWarning}</p>
        )}
      </motion.div>
    )
  }

  /* ——— Application form: apply-loan page (sectioned, full fields) ——— */
  if (applicationForm) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgb(15_23_42/0.08)]',
          className,
        )}
        noValidate
      >
        <div className="border-b border-gray-200 bg-brand-50/60 px-4 py-3 md:px-6">
          <h2 className="font-heading text-lg font-bold text-navy-900">
            {title ?? 'Loan Application Form'}
          </h2>
          <p className="mt-0.5 text-xs text-gray-600">All fields marked * are mandatory</p>
        </div>

        <div className="space-y-3 px-4 py-4 md:px-6">
          <FormSection title="1. Personal Details" compact>
            <FormField label="Full Name *" error={errors.fullName?.message} className={span2} compact>
              <input
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Enter at least 2 characters' },
                })}
                className={cn(inputClass, errors.fullName && 'border-red-500')}
                placeholder="Enter full name"
                autoComplete="name"
              />
            </FormField>
            <FormField label="Mobile Number *" error={errors.phone?.message} compact>
              <input
                {...register('phone', {
                  required: 'Mobile number is required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile' },
                })}
                className={cn(inputClass, errors.phone && 'border-red-500')}
                placeholder="10-digit mobile"
                maxLength={10}
                inputMode="tel"
                autoComplete="tel"
              />
            </FormField>
            <FormField label="Email Address *" error={errors.email?.message} compact>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter valid email' },
                })}
                className={cn(inputClass, errors.email && 'border-red-500')}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </FormField>
            <FormField label="City *" error={errors.city?.message} compact>
              <CityInput
                {...register('city', {
                  required: 'City is required',
                  minLength: { value: 2, message: 'Enter city name' },
                })}
                className={inputClass}
                error={!!errors.city}
                placeholder="Enter city"
              />
            </FormField>
          </FormSection>

          <FormSection title="2. Employment Details" compact>
            <FormField label="Employment Type *" error={errors.employmentType?.message} compact>
              <select
                {...register('employmentType', { required: 'Select employment type' })}
                className={cn(inputClass, errors.employmentType && 'border-red-500')}
              >
                <option value="">— Select —</option>
                {EMPLOYMENT_TYPES_LEAD.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Monthly Income *" error={errors.monthlyIncome?.message} compact>
              <select
                {...register('monthlyIncome', { required: 'Select income range' })}
                className={cn(inputClass, errors.monthlyIncome && 'border-red-500')}
              >
                <option value="">— Select —</option>
                {INCOME_RANGES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Company / Business Name *" error={errors.companyName?.message} compact>
              <input
                {...register('companyName', { required: 'Company name is required' })}
                className={cn(inputClass, errors.companyName && 'border-red-500')}
                placeholder="Employer or business name"
              />
            </FormField>
            <FormField label="Work Experience *" error={errors.workExperience?.message} compact>
              <select
                {...register('workExperience', { required: 'Select experience' })}
                className={cn(inputClass, errors.workExperience && 'border-red-500')}
              >
                <option value="">— Select —</option>
                {WORK_EXPERIENCE_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </FormField>
          </FormSection>

          <FormSection title="3. Loan Details" compact>
            <FormField label="Loan Type *" error={errors.loanType?.message} className={span2} compact>
              <select
                {...register('loanType', { required: 'Select loan type' })}
                className={cn(inputClass, errors.loanType && 'border-red-500')}
              >
                <option value="">— Select loan type —</option>
                {LOAN_TYPE_OPTIONS.filter((t) => t !== 'Insurance' && t !== 'Credit Card').map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ),
                )}
              </select>
            </FormField>
            <FormField label="Loan Amount Required (₹) *" error={errors.loanAmount?.message} compact>
              <input
                type="number"
                {...register('loanAmount', {
                  required: 'Loan amount is required',
                  min: { value: 10000, message: 'Minimum amount is ₹10,000' },
                })}
                className={cn(inputClass, errors.loanAmount && 'border-red-500')}
                placeholder="e.g. 2500000"
                min={10000}
              />
            </FormField>
            <FormField label="Preferred Tenure *" error={errors.tenureMonths?.message} compact>
              <select
                {...register('tenureMonths', { required: 'Select tenure' })}
                className={cn(inputClass, errors.tenureMonths && 'border-red-500')}
              >
                <option value="">— Select tenure —</option>
                {TENURE_OPTIONS.map((t) => (
                  <option key={t.months} value={String(t.months)}>
                    {t.label}
                  </option>
                ))}
              </select>
            </FormField>
          </FormSection>

          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <label className="flex items-start gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                {...register('agreeTerms', { required: 'You must accept terms to submit' })}
                className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-brand-700"
              />
              <span>
                I authorize {SITE.name} to contact me regarding my loan application. I accept the{' '}
                <a href="/privacy-policy" className="font-medium text-brand-700 underline">
                  Privacy Policy
                </a>
                . *
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="mt-2 text-xs text-red-600">{errors.agreeTerms.message}</p>
            )}
          </div>

          <input
            {...register('_gotcha')}
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
            aria-hidden
          />

          {submitError && (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-2 border-t border-gray-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-gray-500">
              <ShieldCheck className="mr-1 inline h-3 w-3 text-brand-600" />
              Confidential &amp; secure
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-md bg-brand-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-900 disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Submitting Application…' : 'Submit Application'}
            </button>
          </div>
        </div>
      </form>
    )
  }

  /* ——— Compact: loan pages & apply-loan page ——— */
  if (compact) {
    const fieldWrap = cn(
      twoColumn ? 'grid sm:grid-cols-2' : 'space-y-3',
      applyPage ? 'flex-1 gap-4 md:gap-5' : twoColumn ? 'gap-3' : '',
    )
    const spanFull = twoColumn ? 'sm:col-span-2' : ''

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'relative flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgb(15_23_42/0.08)]',
          applyPage ? 'min-h-[34rem] p-6 md:min-h-[36rem] md:p-8' : 'p-5 md:p-6',
          className,
        )}
        noValidate
      >
        {!hideTitle && (
          <p className="mb-4 font-heading text-lg font-bold text-navy-900 md:text-xl">
            {title ?? 'Quick Apply'}
          </p>
        )}

        {defaultLoanType && (
          <>
            <input type="hidden" {...register('loanType', { required: true })} />
            <p className="mb-3 rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-800">
              {defaultLoanType}
            </p>
          </>
        )}

        <div className={fieldWrap}>
          <div className={spanFull}>
            <Field label="Full Name *" error={errors.fullName?.message}>
              <input
                {...register('fullName', { required: 'Required', minLength: { value: 2, message: 'Min 2 chars' } })}
                className={cn(inputClass, errors.fullName && 'border-red-400')}
                placeholder="As per PAN / Aadhaar"
              />
            </Field>
          </div>

          <Field label="Mobile *" error={errors.phone?.message}>
              <input
                {...register('phone', {
                  required: 'Required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid' },
                })}
                className={cn(inputClass, errors.phone && 'border-red-400')}
                placeholder="10-digit"
                maxLength={10}
              />
            </Field>
            <Field label="City *" error={errors.city?.message}>
              <CityInput
                {...register('city', {
                  required: 'Required',
                  minLength: { value: 2, message: 'Min 2 characters' },
                })}
                className={inputClass}
                error={!!errors.city}
              />
            </Field>

          <Field label="Email *" error={errors.email?.message}>
            <input
              type="email"
              {...register('email', {
                required: 'Required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid' },
              })}
              className={cn(inputClass, errors.email && 'border-red-400')}
              placeholder="you@email.com"
            />
          </Field>

          <Field label="Employment *" error={errors.employmentType?.message}>
              <select
                {...register('employmentType', { required: 'Required' })}
                className={cn(inputClass, errors.employmentType && 'border-red-400')}
              >
                <option value="">Type</option>
                {EMPLOYMENT_TYPES_LEAD.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </Field>
            <Field label="Income *" error={errors.monthlyIncome?.message}>
              <select
                {...register('monthlyIncome', { required: 'Required' })}
                className={cn(inputClass, errors.monthlyIncome && 'border-red-400')}
              >
                <option value="">Income</option>
                {INCOME_RANGES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </Field>

          {!defaultLoanType && (
            <Field label="Loan Type *" error={errors.loanType?.message}>
              <select
                {...register('loanType', { required: 'Required' })}
                className={cn(inputClass, errors.loanType && 'border-red-400')}
              >
                <option value="">Select loan</option>
                {LOAN_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          )}

          <Field label="Loan Amount (₹) *" error={errors.loanAmount?.message}>
              <input
                type="number"
                {...register('loanAmount', {
                  required: 'Required',
                  min: { value: 10000, message: 'Min ₹10K' },
                })}
                className={cn(inputClass, errors.loanAmount && 'border-red-400')}
                placeholder="Amount"
                min={10000}
              />
            </Field>
            <Field label="Tenure *" error={errors.tenureMonths?.message}>
              <select
                {...register('tenureMonths', { required: 'Required' })}
                className={cn(inputClass, errors.tenureMonths && 'border-red-400')}
              >
                <option value="">Tenure</option>
                {TENURE_OPTIONS.map((t) => (
                  <option key={t.months} value={String(t.months)}>{t.label}</option>
                ))}
              </select>
            </Field>
        </div>

        <label className={cn('mt-4 flex items-start gap-2 text-[11px] text-gray-500', spanFull)}>
          <input
            type="checkbox"
            {...register('agreeTerms', { required: 'Required' })}
            className="mt-0.5 h-3.5 w-3.5 rounded text-brand-600"
          />
          I agree to be contacted by {SITE.name}.*
        </label>
        {errors.agreeTerms && (
          <p className={cn('text-[11px] text-red-500', spanFull)}>{errors.agreeTerms.message}</p>
        )}

        <input
          {...register('_gotcha')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          aria-hidden
        />

        {submitError && (
          <p className={cn('mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600', spanFull)}>
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 font-bold text-white shadow-md shadow-brand-700/20 disabled:opacity-70',
            applyPage ? 'mt-auto py-4 text-base' : 'mt-4 py-3.5 text-sm',
            spanFull,
          )}
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>
    )
  }

  /* ——— Full: apply-loan page (still clean, not too long) ——— */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('relative rounded-2xl border border-gray-100 bg-white p-5 shadow-lg', className)}
      noValidate
    >
      <h2 className="font-heading text-lg font-bold text-brand-900">Apply for Loan</h2>
      <p className="mt-0.5 mb-4 text-xs text-gray-500">Fill basic details below.</p>

      <div className="space-y-3">
        <Field label="Full Name *" error={errors.fullName?.message}>
          <input
            {...register('fullName', { required: 'Required', minLength: 2 })}
            className={cn(inputClass, errors.fullName && 'border-red-400')}
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Mobile *" error={errors.phone?.message}>
            <input
              {...register('phone', {
                required: 'Required',
                pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid mobile' },
              })}
              className={cn(inputClass, errors.phone && 'border-red-400')}
              maxLength={10}
            />
          </Field>
          <Field label="Email *" error={errors.email?.message}>
            <input
              type="email"
              {...register('email', { required: 'Required', pattern: /^\S+@\S+\.\S+$/ })}
              className={cn(inputClass, errors.email && 'border-red-400')}
            />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="City *" error={errors.city?.message}>
            <CityInput
              {...register('city', {
                required: 'Required',
                minLength: { value: 2, message: 'Min 2 characters' },
              })}
              className={inputClass}
              error={!!errors.city}
            />
          </Field>
          <Field label="Employment *" error={errors.employmentType?.message}>
            <select
              {...register('employmentType', { required: 'Required' })}
              className={cn(inputClass, errors.employmentType && 'border-red-400')}
            >
              <option value="">Select</option>
              {EMPLOYMENT_TYPES_LEAD.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Monthly Income *" error={errors.monthlyIncome?.message}>
          <select
            {...register('monthlyIncome', { required: 'Required' })}
            className={cn(inputClass, errors.monthlyIncome && 'border-red-400')}
          >
            <option value="">Select income</option>
            {INCOME_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field label="Loan Type *" error={errors.loanType?.message}>
          <select
            {...register('loanType', { required: 'Required' })}
            className={cn(inputClass, errors.loanType && 'border-red-400')}
          >
            <option value="">Select loan</option>
            {LOAN_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Loan Amount (₹) *" error={errors.loanAmount?.message}>
            <input
              type="number"
              {...register('loanAmount', { required: 'Required', min: 10000 })}
              className={cn(inputClass, errors.loanAmount && 'border-red-400')}
              min={10000}
            />
          </Field>
          <Field label="Tenure *" error={errors.tenureMonths?.message}>
            <select
              {...register('tenureMonths', { required: 'Required' })}
              className={cn(inputClass, errors.tenureMonths && 'border-red-400')}
            >
              <option value="">Select</option>
              {TENURE_OPTIONS.map((t) => (
                <option key={t.months} value={String(t.months)}>{t.label}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-gray-500">
        <input type="checkbox" {...register('agreeTerms', { required: 'Required' })} className="mt-0.5" />
        I agree to be contacted by {SITE.name} regarding my loan enquiry.*
      </label>
      {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms.message}</p>}

      <input
        {...register('_gotcha')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      />

      {submitError && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3.5 font-semibold text-white disabled:opacity-70"
      >
        <Send className="h-5 w-5" />
        {isSubmitting ? 'Sending…' : 'Submit Application'}
      </button>
    </form>
  )
}
