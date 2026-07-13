import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { MobileAppButtons } from '@/components/MobileAppButtons'
import { cn } from '@/utils/cn'

interface CustomerAppCtaProps {
  variant?: 'section' | 'compact'
  className?: string
}

export function CustomerAppCta({ variant = 'section', className }: CustomerAppCtaProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-5 shadow-sm',
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
            <Smartphone className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-bold text-navy-900">Apply via Customer App</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Download or open the KuberFinserve app — your application goes to the same CRM as this
              form.
            </p>
            <div className="mt-3">
              <MobileAppButtons target="customer" variant="compact" showPlatformDownloads={false} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={cn('border-t border-slate-100 bg-slate-50 py-12 md:py-14', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
            <Smartphone className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
            Download Customer App
          </h2>
          <p className="mt-2 text-sm text-gray-600 md:text-base">
            Apply for loans on mobile — same expert team, same CRM, faster on-the-go experience.
          </p>
          <div className="mt-6">
            <MobileAppButtons target="customer" className="mx-auto max-w-md" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
