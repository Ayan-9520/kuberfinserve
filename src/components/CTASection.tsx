import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/animations/variants'

interface CTASectionProps {
  title?: string
  subtitle?: string
}

export function CTASection({
  title = 'Ready to fulfill your financial needs?',
  subtitle = 'Allow us to find you suitable lenders for your profile. Apply today.',
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/50 to-silver-100 py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-200/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-8 h-64 w-64 rounded-full bg-brand-400/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-navy-700/5 blur-3xl"
        aria-hidden
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container relative mx-auto px-4"
      >
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-8 text-center shadow-[0_20px_70px_rgba(6,95,70,0.1)] ring-1 ring-brand-100/60 backdrop-blur-sm md:p-12 lg:p-14">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-navy-700"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-brand-100 to-transparent opacity-80"
            aria-hidden
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-800">
            <Sparkles className="h-3.5 w-3.5 text-brand-600" aria-hidden />
            Trusted financial partner
          </span>

          <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-navy-900 md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/apply-loan" size="lg" className="gap-2 shadow-lg shadow-brand-600/20">
              Apply Loan
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/contact-us" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Quick eligibility check · No hidden charges · Expert guidance
          </p>
        </div>
      </motion.div>
    </section>
  )
}
