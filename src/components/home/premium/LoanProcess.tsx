import { motion } from 'framer-motion'
import { LOAN_PROCESS_STEPS } from '@/data/homePremium'

export function LoanProcess() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-700">How It Works</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            Loan Approval Process
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            A clear 5-step journey from application to disbursement.
          </p>
        </div>

        <div className="relative mt-12 md:mt-14">
          <div className="absolute left-0 right-0 top-[2.35rem] hidden h-0.5 bg-gradient-to-r from-brand-100 via-brand-500 to-brand-100 md:block" />

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
            {LOAN_PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-brand-50/40 p-5 text-center shadow-[0_10px_30px_rgb(15_41_32/0.05)]"
              >
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-800 to-brand-600 font-heading text-lg font-bold text-white shadow-lg shadow-brand-600/30 ring-4 ring-white">
                  {step.step}
                </div>
                <h3 className="mt-4 font-heading text-sm font-bold text-navy-900 md:text-base">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-600 md:text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
