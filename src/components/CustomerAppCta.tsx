import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MobileAppButtons } from '@/components/MobileAppButtons'
import { PlatformLogo } from '@/components/PlatformLogo'
import { SITE } from '@/data/site'
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
          'rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-4 shadow-sm sm:p-5',
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <PlatformLogo size="sm" nameBelow={false} />
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-bold text-navy-900">
              {SITE.platformName} Customer App
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Download or open the app — your application goes to the same CRM as this form.
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
    <section className={cn('border-t border-slate-100 bg-slate-50 py-12 md:py-16', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm md:p-8">
            <div className="mx-auto flex w-fit flex-col items-center gap-2">
              <PlatformLogo
                size="lg"
                showName
                nameBelow
                nameClassName="text-navy-900 text-base"
              />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-700">
                Customer App
              </p>
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              Download Customer App
            </h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              Apply for loans on mobile — same expert team, same CRM, faster on-the-go experience.
            </p>
            <div className="mt-6">
              <MobileAppButtons target="customer" className="mx-auto" />
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-500">
              Prefer the website?{' '}
              <Link to={SITE.applyLoanUrl} className="font-semibold text-brand-700 hover:underline">
                Apply online
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
