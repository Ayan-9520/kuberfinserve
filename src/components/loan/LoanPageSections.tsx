import { motion } from 'framer-motion'
import { CheckCircle, Clock, Percent, Calendar, Banknote, FileText } from 'lucide-react'
import type { LoanProduct } from '@/data/loans'
import { APPLICATION_STEPS, getLoanMeta } from '@/data/forms'
import { fadeUp } from '@/animations/variants'

interface LoanPageSectionsProps {
  loan: LoanProduct
}

export function LoanStats({ loan }: LoanPageSectionsProps) {
  const meta = getLoanMeta(loan.slug)
  const stats = [
    { icon: Percent, label: 'Rates from', value: loan.rateFrom },
    { icon: Banknote, label: 'Loan up to', value: meta.maxAmount },
    { icon: Calendar, label: 'Max tenure', value: meta.maxTenure },
    { icon: Clock, label: 'Processing', value: meta.processingTime },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <s.icon className="mb-2 h-6 w-6 text-brand-600" />
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{s.label}</p>
          <p className="mt-1 font-heading text-lg font-bold text-brand-900">{s.value}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function LoanProcessSteps() {
  return (
    <section className="mt-14">
      <h2 className="font-heading text-2xl font-bold text-brand-900">How It Works</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {APPLICATION_STEPS.map((step, i) => (
          <motion.div
            key={step.step}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6"
          >
            <span className="font-heading text-3xl font-bold text-brand-600/30">{step.step}</span>
            <h3 className="mt-2 font-heading text-lg font-bold text-brand-900">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function LoanDetailsContent({ loan }: LoanPageSectionsProps) {
  return (
    <>
      <p className="text-lg leading-relaxed text-gray-600">{loan.description}</p>

      <LoanStats loan={loan} />

      <LoanProcessSteps />

      <h2 className="mt-14 font-heading text-2xl font-bold text-brand-900">Key Features</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {loan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 rounded-xl bg-white p-3 text-gray-700 shadow-sm">
            <CheckCircle className="h-5 w-5 shrink-0 text-brand-600" />
            {f}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-heading text-2xl font-bold text-brand-900">Benefits</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {loan.benefits.map((b) => (
          <li key={b} className="flex items-center gap-2 text-gray-700">
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand-600" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-700" />
            <h3 className="font-heading font-bold text-brand-900">Eligibility</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            {loan.eligibility.map((e) => (
              <li key={e} className="flex gap-2">
                <span className="text-brand-600">✓</span> {e}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-700" />
            <h3 className="font-heading font-bold text-brand-900">Documents Required</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            {loan.documents.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="text-brand-600">✓</span> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-500">
        * Interest rates & approval subject to lender policy, CIBIL score, income verification, and document checks.
      </p>
    </>
  )
}
