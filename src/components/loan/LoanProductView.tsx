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
  Calculator,
  Receipt,
  Shield,
} from 'lucide-react'
import type { LoanProduct } from '@/data/loans'
import { getRelatedLoans } from '@/data/loans'
import { APPLICATION_STEPS, getLoanMeta } from '@/data/forms'
import { LeadApplicationForm } from '@/components/LeadApplicationForm'
import { FAQAccordion } from '@/components/FAQAccordion'
import { LoanCard } from '@/components/LoanCard'
import { ProductExpertCta } from '@/components/product/ProductExpertCta'
import { ProductStickyBar } from '@/components/product/ProductStickyBar'
import {
  PRODUCT_DISCLAIMER,
  SUBJECT_TO_ELIGIBILITY,
  WHY_CHOOSE_KUBER,
  COMMON_CHARGES,
  DOCUMENT_GROUPS,
} from '@/data/productCommon'
import { PRODUCT_FAQS } from '@/data/productFaqs'
import { cn } from '@/utils/cn'

interface LoanProductViewProps {
  loan: LoanProduct
  defaultLoanType: string
}

export function LoanProductView({ loan, defaultLoanType }: LoanProductViewProps) {
  const meta = getLoanMeta(loan.slug)
  const faqs = PRODUCT_FAQS[loan.slug] ?? []
  const related = getRelatedLoans(loan.slug, 4)

  const stats = [
    { icon: Percent, label: 'Interest Rate — Starting From', value: loan.rateFrom, highlight: true },
    {
      icon: Banknote,
      label: loan.amountLabel ? `${loan.amountLabel} — Up To` : 'Maximum Loan — Up To',
      value: meta.maxAmount,
    },
    { icon: Calendar, label: 'Tenure — Up To', value: meta.maxTenure },
    { icon: Clock, label: 'Processing', value: meta.processingTime },
  ]

  return (
    <div className="bg-gradient-to-b from-brand-50/80 to-white pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative min-h-[320px] overflow-hidden border-b border-brand-100 bg-gradient-to-b from-slate-100 via-white to-brand-50/50 md:min-h-[380px]">
        {loan.heroImage && (
          <img
            src={loan.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/35" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(13,107,87,0.08),_transparent_50%)]" />
        <div className="container relative mx-auto flex min-h-[320px] flex-col justify-end px-4 py-8 md:min-h-[380px] md:py-10">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-700">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <Link to="/#loans" className="hover:text-brand-700">Loans</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="font-medium text-brand-700">{loan.shortTitle}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-brand-600" />
                100+ lending partners · {SUBJECT_TO_ELIGIBILITY}
              </span>
              <h1 className="mt-3 font-heading text-3xl font-bold text-navy-900 md:text-4xl lg:text-[2.75rem]">
                {loan.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                {loan.description}
              </p>
            </motion.div>
            <motion.a
              href="#apply-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/20 transition-transform hover:scale-[1.02]"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={cn(
                  'rounded-xl border px-4 py-3 shadow-sm',
                  s.highlight
                    ? 'border-brand-200 bg-brand-50'
                    : 'border-brand-100 bg-white/90',
                )}
              >
                <s.icon className="mb-1.5 h-4 w-4 text-brand-600" />
                <p className="text-[10px] font-medium uppercase tracking-wider text-brand-700">
                  {s.label}
                </p>
                <p className="font-heading text-lg font-bold text-navy-900 md:text-xl">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-7">
            {/* Key Highlights */}
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

            <ProductExpertCta />

            {/* Benefits */}
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-5 md:p-6">
              <h2 className="font-heading text-lg font-bold text-brand-900">Benefits</h2>
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

            {/* Eligibility + Documents */}
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
                {loan.minIncome && (
                  <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-800">
                    Minimum income: {loan.minIncome}
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-brand-800">
                  <FileCheck className="h-4 w-4 text-brand-600" />
                  Documents Required
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

            {/* Common document reference */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-800">
                Standard Document Checklist
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {Object.entries(DOCUMENT_GROUPS).map(([key, docs]) => (
                  <div key={key}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {docs.map((doc) => (
                        <li key={doc} className="flex gap-2">
                          <span className="text-brand-500">•</span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Interest rate note */}
            <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
              <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-brand-900">
                <Percent className="h-4 w-4 text-brand-600" />
                Interest Rate
              </h3>
              <p className="mt-2 text-2xl font-bold text-brand-800">{loan.rateFrom}</p>
              <p className="mt-2 text-sm text-gray-600">
                Rates are indicative and linked to lender benchmarks (RLLR / MCLR / repo-linked). Final rate is
                offered based on your profile, credit score and lender policy. {SUBJECT_TO_ELIGIBILITY}.
              </p>
            </div>

            {/* Charges */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-brand-800">
                <Receipt className="h-4 w-4 text-brand-600" />
                Charges & Fees (Indicative)
              </h3>
              <ul className="mt-3 space-y-2">
                {COMMON_CHARGES.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <ProductExpertCta />

            {/* Why KuberFinserve */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-900">
                <Shield className="h-5 w-5 text-brand-600" />
                Why Choose KuberFinserve
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {WHY_CHOOSE_KUBER.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-800">
                Application Process
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

            {/* EMI Calculator CTA */}
            <Link
              to="/emi-calculator"
              className="flex items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-600 to-brand-700 p-5 text-white shadow-md transition hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Calculator className="h-8 w-8 text-brand-200" />
                <div>
                  <p className="font-heading font-bold">Plan Your EMI</p>
                  <p className="text-sm text-brand-100">
                    Calculate monthly instalment, total interest & tenure — free tool
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>

            {/* FAQs */}
            {faqs.length > 0 && (
              <div>
                <h2 className="mb-4 font-heading text-xl font-bold text-brand-900">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion items={faqs} />
              </div>
            )}

            {/* Related products */}
            {related.length > 0 && (
              <div>
                <h2 className="mb-4 font-heading text-xl font-bold text-brand-900">Related Products</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <LoanCard
                      key={r.slug}
                      slug={r.slug}
                      title={r.shortTitle}
                      description={r.description.slice(0, 90) + '…'}
                      rateFrom={r.rateFrom}
                      path={`/loans/${r.slug}`}
                      features={r.features.slice(0, 3)}
                    />
                  ))}
                </div>
              </div>
            )}

            <ProductExpertCta />

            {/* Disclaimer */}
            <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs leading-relaxed text-gray-500">
              {PRODUCT_DISCLAIMER}
            </p>
          </div>

          {/* Apply form sidebar — sticky without nested scroll */}
          <div className="lg:col-span-5" id="apply-form">
            <div className="kf-sticky-form">
              <LeadApplicationForm
                defaultLoanType={defaultLoanType}
                source={`loan-page:${loan.slug}`}
                compact
              />
            </div>
          </div>
        </div>
      </section>

      <ProductStickyBar />
    </div>
  )
}
