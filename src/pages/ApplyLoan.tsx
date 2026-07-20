import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadApplicationForm } from '@/components/LeadApplicationForm'
import { ApplyLoanDocuments } from '@/components/apply-loan/ApplyLoanDocuments'
import { CustomerAppCta } from '@/components/CustomerAppCta'
import { ProductStickyBar } from '@/components/product/ProductStickyBar'
import { APPLY_FAQ } from '@/data/applyLoanPage'
import { LOAN_TYPE_OPTIONS } from '@/data/forms'
import { SITE } from '@/data/site'

const TRUST = [
  { icon: ShieldCheck, text: 'Secure & confidential' },
  { icon: Clock, text: 'Callback within 24 hrs' },
] as const

export function ApplyLoan() {
  return (
    <>
      <SeoHead
        title="Apply Online — Loans, Credit Card, Insurance | KuberFinserve"
        description="Global apply for home, personal, business, LAP, car loans, credit cards, insurance & CIBIL assistance. Expert callback from 100+ lending partners."
        path="/apply-loan"
        keywords="apply loan online, global apply, home loan apply, personal loan apply, credit card apply, KuberFinserve"
      />

      <div className="bg-gradient-to-b from-brand-50/60 via-silver-50 to-white pb-20 md:pb-0">
        <section className="py-6 md:py-10">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 md:mb-8"
            >
              <p className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold text-brand-800 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-brand-600" />
                Global Apply · {LOAN_TYPE_OPTIONS.length} products
              </p>
              <h1 className="mt-3 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
                Apply Online
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm text-gray-600">
                Select any product first — loans, credit card, insurance or CIBIL — then fill your
                details. Our advisors will call with suitable options. Subject to eligibility.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
                {TRUST.map(({ icon: Icon, text }) => (
                  <span key={text} className="inline-flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-brand-600" />
                    {text}
                  </span>
                ))}
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-1.5 font-medium text-brand-700 hover:text-brand-900"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {SITE.phone}
                </a>
              </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <motion.aside
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="space-y-5"
              >
                <CustomerAppCta variant="compact" />
                <ApplyLoanDocuments />
                <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    Products covered
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {LOAN_TYPE_OPTIONS.map((p) => (
                      <span
                        key={p}
                        className="rounded-lg bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-800"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-gray-400">
                    Prefer a specific page?{' '}
                    <Link to="/loans/home-loan" className="font-semibold text-brand-700 hover:underline">
                      Browse loans
                    </Link>
                    {' · '}
                    <Link to="/credit-card" className="font-semibold text-brand-700 hover:underline">
                      Cards
                    </Link>
                    {' · '}
                    <Link to="/insurance" className="font-semibold text-brand-700 hover:underline">
                      Insurance
                    </Link>
                  </p>
                </div>
              </motion.aside>

              <motion.div
                id="apply-form"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <LeadApplicationForm
                  applicationForm
                  title="Global Apply"
                  source="apply-loan-page"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white py-12 md:py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-navy-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-8">
              <FAQAccordion items={APPLY_FAQ} />
            </div>
          </div>
        </section>
      </div>

      <ProductStickyBar applyHref="#apply-form" applyLabel="Apply Now" />
    </>
  )
}
