import { FAQAccordion } from '@/components/FAQAccordion'
import { PREMIUM_FAQ } from '@/data/homePremium'

export function FaqPremium() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">FAQ</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600">Everything you need to know about loans &amp; our process.</p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={PREMIUM_FAQ} />
        </div>
      </div>
    </section>
  )
}
