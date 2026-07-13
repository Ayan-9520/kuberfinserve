import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { LOAN_TYPES_FORM } from '@/data/site'
import { CityInput } from '@/components/ui/CityInput'
import { useToast } from '@/components/ui/Toast'
import { submitContact } from '@/utils/leads'
import { cn } from '@/utils/cn'

export interface ContactFormData {
  name: string
  phone: string
  email: string
  city?: string
  employmentType?: string
  loanType: string
  message: string
  _gotcha?: string
}

interface ContactFormProps {
  id?: string
  onSuccess?: () => void
  className?: string
  source?: string
  variant?: 'default' | 'premium'
  title?: string
}

export function ContactForm({
  id,
  onSuccess,
  className,
  source = 'contact-form',
  variant = 'default',
  title = 'Get in touch',
}: ContactFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitOk, setSubmitOk] = useState(false)
  const { showSuccess, showError } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    if (data._gotcha) return
    setSubmitError(null)
    setSubmitOk(false)

    const result = await submitContact(data, source)

    if (!result.ok) {
      const message = result.error ?? 'Could not submit. Please call us.'
      setSubmitError(message)
      showError(message)
      return
    }

    setSubmitOk(true)
    showSuccess('Enquiry saved. Our team will contact you shortly.')
    reset()
    onSuccess?.()
  }

  const inputClassBase =
    'w-full rounded-xl border px-3 py-2.5 text-sm text-brand-900 placeholder:text-gray-400 focus:outline-none focus:ring-1'
  const inputClass =
    variant === 'premium'
      ? `${inputClassBase} border-brand-100 bg-white/70 backdrop-blur focus:border-brand-600 focus:ring-brand-600/20`
      : `${inputClassBase} border-gray-200 bg-white focus:border-brand-600 focus:ring-brand-600/30`

  if (submitOk) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
      >
        <p className="font-heading font-bold text-brand-900">Thank you!</p>
        <p className="mt-1 text-sm text-gray-600">
          Enquiry saved. Our team will contact you shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        variant === 'premium'
          ? 'relative space-y-3 rounded-3xl border border-brand-100 bg-white/80 p-6 shadow-xl ring-1 ring-brand-100/60 backdrop-blur md:p-7'
          : 'relative space-y-3 rounded-2xl border border-gray-100 bg-white p-5 md:p-6',
        className,
      )}
      noValidate
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-heading font-bold text-brand-900">{title}</p>
        {variant === 'premium' && (
          <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-800">
            Fast response
          </span>
        )}
      </div>

      <input
        {...register('_gotcha')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      />

      <div>
        <label className="mb-1 block text-xs text-gray-600">Name *</label>
        <input {...register('name', { required: 'Required' })} className={cn(inputClass, errors.name && 'border-red-400')} />
        {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-600">Mobile *</label>
          <input
            {...register('phone', { required: 'Required', pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid' } })}
            className={cn(inputClass, errors.phone && 'border-red-400')}
            maxLength={10}
          />
          {errors.phone && <p className="mt-0.5 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">City</label>
          <CityInput
            {...register('city', { minLength: { value: 2, message: 'Min 2 characters' } })}
            className={inputClass}
            error={!!errors.city}
          />
          {errors.city && <p className="mt-0.5 text-xs text-red-500">{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Email *</label>
        <input
          type="email"
          {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid' } })}
          className={cn(inputClass, errors.email && 'border-red-400')}
        />
        {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Loan Type *</label>
        <select {...register('loanType', { required: 'Required' })} className={cn(inputClass, errors.loanType && 'border-red-400')}>
          <option value="">Select</option>
          {LOAN_TYPES_FORM.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.loanType && <p className="mt-0.5 text-xs text-red-500">{errors.loanType.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Message</label>
        <textarea {...register('message')} rows={2} className={inputClass} placeholder="Optional" />
      </div>

      {submitError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3 text-sm font-semibold text-white disabled:opacity-70"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? 'Sending…' : 'Submit'}
      </button>
    </form>
  )
}
