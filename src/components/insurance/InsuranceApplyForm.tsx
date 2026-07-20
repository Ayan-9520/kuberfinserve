import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send, ShieldCheck } from 'lucide-react'
import { CityInput } from '@/components/ui/CityInput'
import { useToast } from '@/components/ui/Toast'
import { submitContact } from '@/utils/leads'
import { INSURANCE_TYPE_OPTIONS } from '@/data/insurance'
import { cn } from '@/utils/cn'

export interface InsuranceApplyData {
  name: string
  phone: string
  email: string
  city: string
  insuranceType: string
  sumInsured: string
  message: string
  agreeTerms: boolean
  _gotcha?: string
}

interface InsuranceApplyFormProps {
  defaultType?: string
  source?: string
  className?: string
  title?: string
}

const SUM_OPTIONS = [
  'Up to ₹5 Lakh',
  '₹5 – ₹10 Lakh',
  '₹10 – ₹25 Lakh',
  '₹25 – ₹50 Lakh',
  '₹50 Lakh – ₹1 Crore',
  'Above ₹1 Crore',
  'Not sure / Advise me',
] as const

export function InsuranceApplyForm({
  defaultType = '',
  source = 'insurance-apply',
  className,
  title = 'Apply for Insurance',
}: InsuranceApplyFormProps) {
  const [submitOk, setSubmitOk] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { showSuccess, showError } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InsuranceApplyData>({
    defaultValues: {
      insuranceType: defaultType,
      sumInsured: '',
      city: '',
      message: '',
      agreeTerms: false,
    },
  })

  useEffect(() => {
    if (defaultType) setValue('insuranceType', defaultType)
  }, [defaultType, setValue])

  const onSubmit = async (data: InsuranceApplyData) => {
    if (data._gotcha) return
    setSubmitError(null)

    const result = await submitContact(
      {
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        city: data.city.trim(),
        loanType: `Insurance — ${data.insuranceType}`,
        message: [
          `Insurance type: ${data.insuranceType}`,
          data.sumInsured ? `Cover / sum insured preference: ${data.sumInsured}` : null,
          data.message?.trim() || null,
        ]
          .filter(Boolean)
          .join('\n'),
      },
      source,
    )

    if (!result.ok) {
      const message = result.error ?? 'Could not submit. Please call us.'
      setSubmitError(message)
      showError(message)
      return
    }

    setSubmitOk(true)
    showSuccess('Application received. Our insurance advisor will contact you shortly.')
    reset({ insuranceType: defaultType || '', sumInsured: '', city: '', message: '', agreeTerms: false })
  }

  const inputClass =
    'w-full rounded-xl border border-brand-100 bg-white px-3 py-2 text-sm text-brand-900 placeholder:text-gray-400 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600/20'

  if (submitOk) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center shadow-sm"
      >
        <ShieldCheck className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-3 font-heading text-lg font-bold text-brand-900">Enquiry submitted</p>
        <p className="mt-1 text-sm text-gray-600">
          Thank you. Your insurance enquiry is saved. An advisor will call you with suitable plan
          options — subject to insurer underwriting. Check your email for confirmation.
        </p>
        <button
          type="button"
          onClick={() => setSubmitOk(false)}
          className="mt-5 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          Submit another enquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'relative overflow-visible rounded-2xl border border-brand-100 bg-white shadow-[0_16px_48px_rgb(15_41_32/0.1)] ring-1 ring-brand-100/40',
        className,
      )}
      noValidate
      id="insurance-apply-form"
    >
      <div className="border-b border-brand-100 bg-gradient-to-r from-brand-50 via-white to-emerald-50/80 px-4 py-3.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-heading text-base font-bold text-navy-900">{title}</h2>
          <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800 ring-1 ring-brand-200">
            Free quote
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 p-4">
        <input
          {...register('_gotcha')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          aria-hidden
        />

        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">Insurance Type *</label>
          <select
            {...register('insuranceType', { required: 'Please select an insurance type' })}
            className={cn(inputClass, errors.insuranceType && 'border-red-400')}
          >
            <option value="">Select insurance product</option>
            {INSURANCE_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.insuranceType && (
            <p className="mt-0.5 text-xs text-red-500">{errors.insuranceType.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">Preferred Cover</label>
          <select {...register('sumInsured')} className={inputClass}>
            <option value="">Select (optional)</option>
            {SUM_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">Full Name *</label>
          <input
            {...register('name', { required: 'Required', minLength: { value: 2, message: 'Too short' } })}
            className={cn(inputClass, errors.name && 'border-red-400')}
            placeholder="As per KYC"
          />
          {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Mobile *</label>
          <input
            {...register('phone', {
              required: 'Required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile' },
            })}
            className={cn(inputClass, errors.phone && 'border-red-400')}
            maxLength={10}
            inputMode="numeric"
            placeholder="10-digit"
          />
          {errors.phone && <p className="mt-0.5 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">City *</label>
          <CityInput
            {...register('city', { required: 'Required', minLength: { value: 2, message: 'Min 2 characters' } })}
            className={cn(inputClass, errors.city && 'border-red-400')}
            error={!!errors.city}
          />
          {errors.city && <p className="mt-0.5 text-xs text-red-500">{errors.city.message}</p>}
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">Email *</label>
          <input
            type="email"
            {...register('email', {
              required: 'Required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            })}
            className={cn(inputClass, errors.email && 'border-red-400')}
            placeholder="you@email.com"
          />
          {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">Requirements (optional)</label>
          <textarea
            {...register('message')}
            rows={2}
            className={inputClass}
            placeholder="e.g. family floater for 4…"
          />
        </div>

        <label className="col-span-2 flex items-start gap-2 text-[11px] leading-snug text-gray-500">
          <input
            type="checkbox"
            {...register('agreeTerms', { required: 'Please accept to continue' })}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-brand-600"
          />
          <span>
            I agree to be contacted regarding insurance options. Premiums subject to insurer
            underwriting.*
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="col-span-2 text-xs text-red-500">{errors.agreeTerms.message}</p>
        )}

        {submitError && (
          <p className="col-span-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="col-span-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3 text-sm font-bold text-white shadow-md disabled:opacity-70"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Submitting…' : 'Get Free Quote'}
        </button>
        <p className="col-span-2 text-center text-[10px] text-gray-400">
          Insurance is a subject matter of solicitation. No guarantee of policy issuance.
        </p>
      </div>
    </form>
  )
}
