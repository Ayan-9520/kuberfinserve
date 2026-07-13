import { motion } from 'framer-motion'
import { Clock, Phone, ShieldCheck } from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadApplicationForm } from '@/components/LeadApplicationForm'
import { ApplyLoanDocuments } from '@/components/apply-loan/ApplyLoanDocuments'
import { CustomerAppCta } from '@/components/CustomerAppCta'
import { APPLY_FAQ } from '@/data/applyLoanPage'
import { SITE } from '@/data/site'

const TRUST = [
  { icon: ShieldCheck, text: 'Secure & confidential' },
  { icon: Clock, text: 'Callback within 24 hrs' },
] as const

export function ApplyLoan() {
  return (
    <>
      <SeoHead
        title="Apply Loan Online | KuberFinserve"
        description="Apply for home loan, personal loan, business loan & loan against property. Quick online form — expert callback from 50+ lenders."
        path="/apply-loan"
      />

      <section className="min-h-[calc(100vh-8rem)] bg-silver-50 py-5 md:py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              Apply for Loan
            </h1>
            <p className="mt-1.5 text-sm text-gray-600">
              Complete the application form below — our team will call you with the best offers.
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
              className="space-y-6"
            >
              <CustomerAppCta variant="compact" />
              <ApplyLoanDocuments />
            </motion.aside>

            <motion.div
              id="apply-form"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <LeadApplicationForm
                applicationForm
                title="Loan Application Form"
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
    </>
  )
}
