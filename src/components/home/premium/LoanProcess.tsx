import { motion } from 'framer-motion'
import { LOAN_PROCESS_STEPS } from '@/data/homePremium'

export function LoanProcess() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">How It Works</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            Loan Approval Process
          </h2>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-600 to-brand-200 md:block" />

          <div className="grid gap-8 md:grid-cols-5">
            {LOAN_PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-600 font-heading text-xl font-bold text-white shadow-lg shadow-brand-600/25">
                  {step.step}
                </div>
                <h3 className="mt-4 font-heading font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
