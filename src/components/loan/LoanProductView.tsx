import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Percent,
  Calendar,
  Banknote,
  FileCheck,
  UserCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import type { LoanProduct } from '@/data/loans'
import { APPLICATION_STEPS, getLoanMeta } from '@/data/forms'
import { LeadApplicationForm } from '@/components/LeadApplicationForm'
import { cn } from '@/utils/cn'

interface LoanProductViewProps {
  loan: LoanProduct
  defaultLoanType: string
}

export function LoanProductView({ loan, defaultLoanType }: LoanProductViewProps) {
  const meta = getLoanMeta(loan.slug)

  const stats = [
    { icon: Percent, label: 'Rate from', value: loan.rateFrom, highlight: true },
    { icon: Banknote, label: 'Max amount', value: meta.maxAmount },
    { icon: Calendar, label: 'Tenure', value: meta.maxTenure },
    { icon: Clock, label: 'Processing', value: meta.processingTime },
  ]

  return (
    <div className="bg-gradient-to-b from-brand-50/80 to-white">
      {/* Compact premium hero */}
      <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        {loan.heroImage && (
          <img
            src={loan.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-navy-900/45" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(74,222,128,0.15),_transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-8 md:py-10">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-brand-100">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="text-white/90">Loans</span>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="font-medium text-brand-400">{loan.shortTitle}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100">
                <Sparkles className="h-3.5 w-3.5 text-brand-400" />
                Premium loan assistance
              </span>
              <h1 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]">
                {loan.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-brand-100 md:text-base">
                {loan.description}
              </p>
            </motion.div>
            <motion.a
              href="#apply-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-900 shadow-lg transition-transform hover:scale-[1.02]"
            >
              Apply Now
              <ArrowRight className="h-5 w-5 text-brand-600" />
            </motion.a>
          </div>

          {/* Key stats — visible immediately */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={cn(
                  'rounded-xl border px-4 py-3 backdrop-blur-sm',
                  s.highlight
                    ? 'border-brand-400/40 bg-brand-600/30'
                    : 'border-white/15 bg-white/10',
                )}
              >
                <s.icon className="mb-1.5 h-4 w-4 text-brand-400" />
                <p className="text-[10px] font-medium uppercase tracking-wider text-brand-200">
                  {s.label}
                </p>
                <p className="font-heading text-lg font-bold text-white md:text-xl">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content — compact, all essentials above fold on desktop */}
      <section className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: product essentials */}
          <div className="space-y-6 lg:col-span-7">
            {/* Features — 2x2 compact */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(15_41_32/0.06)] md:p-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-900">
                <CheckCircle2 className="h-5 w-5 text-brand-600" />
                Key Highlights
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {loan.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2.5 rounded-xl bg-brand-50/80 px-3 py-2.5 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility + Documents — side by side */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-brand-800">
                  <UserCheck className="h-4 w-4 text-brand-600" />
                  Eligibility
                </h3>
                <ul className="mt-3 space-y-2">
                  {loan.eligibility.map((e) => (
                    <li key={e} className="flex gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-brand-800">
                  <FileCheck className="h-4 w-4 text-brand-600" />
                  Documents
                </h3>
                <ul className="mt-3 space-y-2">
                  {loan.documents.map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits — inline pills */}
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-5">
              <h3 className="font-heading text-sm font-bold text-brand-900">Why choose us</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {loan.benefits.map((b) => (
                  <span
                    key={b}
                    className="rounded-lg border border-brand-200/60 bg-white px-3 py-1.5 text-xs font-medium text-brand-800"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Process — horizontal compact */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-800">
                Quick process
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {APPLICATION_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="relative rounded-xl border border-brand-50 bg-brand-50/50 px-3 py-3 text-center sm:text-left"
                  >
                    <span className="font-heading text-2xl font-bold text-brand-600/25">{step.step}</span>
                    <p className="mt-1 text-sm font-semibold text-brand-900">{step.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-400">
              * Rates & approval subject to lender, CIBIL, income & document verification.
            </p>
          </div>

          {/* Right: apply form */}
          <div className="lg:col-span-5" id="apply-form">
            <div className="lg:sticky lg:top-24">
              <LeadApplicationForm
                defaultLoanType={defaultLoanType}
                source={`loan-page:${loan.slug}`}
                compact
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
