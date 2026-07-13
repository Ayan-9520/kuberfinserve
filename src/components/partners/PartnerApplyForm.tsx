import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, Sparkles } from 'lucide-react'
import { HERO_TRUST_STRIP, PARTNER_BUSINESS_TYPES, INDIAN_STATES } from '@/data/partners'
import { CityInput } from '@/components/ui/CityInput'
import { useToast } from '@/components/ui/Toast'
import { submitPartnerApply, type PartnerApplyFormData } from '@/utils/leads'
import { cn } from '@/utils/cn'

interface PartnerApplyFormProps {
  className?: string
  variant?: 'default' | 'hero'
}

export function PartnerApplyForm({ className, variant = 'default' }: PartnerApplyFormProps) {
  const isHero = variant === 'hero'
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitOk, setSubmitOk] = useState(false)
  const { showSuccess, showError } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerApplyFormData>()

  const inputClass =
    'w-full rounded-lg border border-[var(--pf-border)] bg-[var(--pf-bg)]/80 px-3 py-2 text-sm text-[var(--pf-text)] placeholder:text-[var(--pf-text-muted)] focus:border-[var(--pf-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--pf-primary)]/25'

  const onSubmit = async (data: PartnerApplyFormData) => {
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
    showSuccess('Application submitted. Our verification team will review your application.')
    reset()
  }

  if (submitOk) {
    return (
      <div className={cn('pf-form-card rounded-2xl p-6 text-center md:p-7', className)}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--pf-accent)]/15 text-[var(--pf-accent)]">
          <Sparkles className="h-5 w-5" />
        </div>
        <p className="mt-4 font-heading text-lg font-bold text-[var(--pf-text)]">
          Thank you for registering.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--pf-text-secondary)]">
          Our verification team will review your application.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--pf-text-secondary)]">
          You will receive your Partner ID and Password after approval.
        </p>
      </div>
    )
  }

  return (
    <form
      id="apply"
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'pf-form-card relative space-y-3 rounded-2xl p-5 md:p-6',
        isHero && 'lg:sticky lg:top-28',
        className,
      )}
      noValidate
    >
      <input
        {...register('_gotcha')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-3 border-b border-[var(--pf-border)] pb-3">
        <div>
          <p className="font-heading text-base font-bold text-[var(--pf-text)]">Registration Form</p>
          <p className="mt-0.5 text-xs text-[var(--pf-text-muted)]">Takes 2 minutes · Response in 48 hrs</p>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--pf-primary)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--pf-primary)]">
          Free
        </span>
      </div>

      <div>
        <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">Full Name *</label>
        <input
          {...register('name', { required: 'Required' })}
          placeholder="Your full name"
          className={cn(inputClass, errors.name && 'border-red-400')}
        />
        {errors.name && <p className="mt-0.5 text-[11px] text-red-400">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">Mobile *</label>
          <input
            {...register('phone', {
              required: 'Required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid' },
            })}
            placeholder="10-digit number"
            maxLength={10}
            inputMode="numeric"
            className={cn(inputClass, errors.phone && 'border-red-400')}
          />
          {errors.phone && <p className="mt-0.5 text-[11px] text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">Email *</label>
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
            className={cn(inputClass, errors.email && 'border-red-400')}
          />
          {errors.email && <p className="mt-0.5 text-[11px] text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">City *</label>
          <CityInput
            {...register('city', { required: 'Required', minLength: { value: 2, message: 'Min 2 chars' } })}
            placeholder="Delhi, Noida…"
            className={inputClass}
            error={!!errors.city}
          />
          {errors.city && <p className="mt-0.5 text-[11px] text-red-400">{errors.city.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">State *</label>
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
          {errors.state && <p className="mt-0.5 text-[11px] text-red-400">{errors.state.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">
          Company Name <span className="text-[var(--pf-text-muted)]">(Optional)</span>
        </label>
        <input
          {...register('companyName')}
          placeholder="Your company or firm name"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">Business Type *</label>
          <select
            {...register('businessType', { required: 'Required' })}
            className={cn(inputClass, errors.businessType && 'border-red-400')}
          >
            <option value="">Select</option>
            {PARTNER_BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p className="mt-0.5 text-[11px] text-red-400">{errors.businessType.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]">Experience</label>
          <input
            {...register('experience')}
            placeholder="Years in finance"
            className={inputClass}
          />
        </div>
      </div>

      {submitError && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-[11px] text-red-400">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="pf-btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors disabled:opacity-70"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? 'Submitting…' : 'Submit'}
      </button>

      <p className="text-center text-[10px] leading-relaxed text-[var(--pf-text-muted)]">
        By applying you agree to be contacted about the partner program.
      </p>

      {isHero && (
        <div className="flex flex-wrap justify-center gap-1.5 border-t border-[var(--pf-border)] pt-3">
          {HERO_TRUST_STRIP.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--pf-border)] bg-[var(--pf-bg)]/80 px-2.5 py-0.5 text-[9px] font-medium text-[var(--pf-text-muted)] sm:text-[10px]"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </form>
  )
}
