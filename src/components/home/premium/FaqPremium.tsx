import { Link } from 'react-router-dom'
import { FAQAccordion } from '@/components/FAQAccordion'
import { PREMIUM_FAQ } from '@/data/homePremium'

export function FaqPremium() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-silver-50 via-white to-brand-50/40 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-700">FAQ</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Everything you need to know about loans &amp; our process.
          </p>
        </div>

        <div className="mx-auto mt-10 md:mt-12">
          <FAQAccordion items={PREMIUM_FAQ} variant="premium" columns={2} />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Want to build your own financial business?{' '}
          <Link to="/become-partner" className="font-semibold text-brand-700 hover:text-brand-900">
            Become a Kuber Partner →
          </Link>
        </p>
      </div>
    </section>
  )
}
