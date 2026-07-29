import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/data/site'

export function LeadCta() {
  return (
    <section className="relative overflow-hidden border-y border-brand-100 bg-gradient-to-b from-brand-50/80 via-white to-slate-50 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(13,107,87,0.1),transparent_60%)]" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            Ready to Build Your Financial Business?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Join India&apos;s AI-Powered Financial Distribution Network — technology, training,
            bank access and weekly payouts on KuberOne.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to={SITE.becomePartnerUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition-transform hover:scale-[1.02]"
            >
              Become a Partner
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to={SITE.applyLoanUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-navy-800 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              Explore Loan Solutions
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
