import { Link } from 'react-router-dom'
import {
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Gauge,
  TrendingUp,
  ShieldAlert,
  FileSearch,
  ArrowRight,
  Shield,
} from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { SectionHeading } from '@/components/SectionHeading'
import { ContactForm } from '@/components/ContactForm'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ProductExpertCta } from '@/components/product/ProductExpertCta'
import { ProductStickyBar } from '@/components/product/ProductStickyBar'
import { LoanCard } from '@/components/LoanCard'
import { LOAN_CARDS } from '@/data/loans'
import {
  CIBIL_PAGE,
  CIBIL_SCORE_BANDS,
  CIBIL_HIGHLIGHTS,
  CIBIL_FACTORS,
  CIBIL_IMPROVE_TIPS,
  CIBIL_PROCESS,
  CIBIL_WHY,
  CIBIL_DISCLAIMER,
  CIBIL_FAQS,
} from '@/data/cibil'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/data/jsonLdSchemas'
import { SITE } from '@/data/site'
import { cn } from '@/utils/cn'

export function CibilPage() {
  const related = LOAN_CARDS.slice(0, 4)
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'CIBIL Score Assistance', path: '/cibil' },
  ])

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: CIBIL_PAGE.title,
    description: CIBIL_PAGE.metaDescription,
    url: 'https://kuberfinserve.com/cibil',
    provider: {
      '@type': 'FinancialService',
      name: SITE.name,
      url: 'https://kuberfinserve.com',
    },
    areaServed: { '@type': 'Country', name: 'India' },
  }

  return (
    <>
      <SeoHead
        title={CIBIL_PAGE.metaTitle}
        description={CIBIL_PAGE.metaDescription}
        path="/cibil"
        keywords={CIBIL_PAGE.keywords}
        image={CIBIL_PAGE.heroImage}
      />
      <JsonLd data={breadcrumb} id="breadcrumb-cibil" />
      <JsonLd data={serviceSchema} id="service-cibil" />
      <JsonLd data={buildFaqSchema(CIBIL_FAQS)} id="faq-cibil" />

      <div className="pb-20 md:pb-0">
        <section className="relative min-h-[320px] overflow-hidden border-b border-brand-100 md:min-h-[400px]">
          <img
            src={CIBIL_PAGE.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/45" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-50/70 via-transparent to-white/30" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_15%,rgba(13,107,87,0.12),transparent_50%)]" />

          <div className="container relative mx-auto flex min-h-[320px] flex-col justify-end px-4 py-10 md:min-h-[400px] md:py-12">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="transition hover:text-brand-700">Home</Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="font-medium text-brand-700">{CIBIL_PAGE.shortTitle}</span>
            </nav>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-brand-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-brand-800 shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                  <span>Credit Health</span>
                  <span className="text-slate-300" aria-hidden>|</span>
                  <span className="font-medium text-slate-600">Subject to eligibility</span>
                </p>
                <h1 className="mt-4 font-heading text-[1.85rem] font-bold leading-tight text-navy-900 sm:text-4xl md:text-[2.6rem]">
                  {CIBIL_PAGE.title}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {CIBIL_PAGE.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#cibil-apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:scale-[1.02]"
                  >
                    Get Expert Help
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/check-eligibility"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-5 py-3 text-sm font-semibold text-navy-800 shadow-sm backdrop-blur-sm hover:border-brand-300 hover:bg-brand-50"
                  >
                    Check Eligibility
                  </Link>
                </div>
              </div>

              <div className="grid w-full max-w-md grid-cols-3 gap-2">
                {CIBIL_PROCESS.map((step) => (
                  <div
                    key={step.step}
                    className="rounded-xl border border-brand-100/80 bg-white/95 px-3 py-3 shadow-md backdrop-blur-sm"
                  >
                    <p className="font-heading text-lg font-bold text-brand-200">{step.step}</p>
                    <p className="text-[11px] font-semibold leading-snug text-navy-900">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main: content + sticky form */}
        <section id="cibil-apply" className="scroll-mt-28 bg-silver-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="space-y-5 lg:col-span-7">
                {/* Highlights */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(15_41_32/0.06)] md:p-6">
                  <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-900">
                    <CheckCircle2 className="h-5 w-5 text-brand-600" />
                    Key Highlights
                  </h2>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {CIBIL_HIGHLIGHTS.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-brand-50/80 px-3 py-2.5 text-sm text-gray-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score bands */}
                <div id="score-bands" className="scroll-mt-28">
                  <h2 className="mb-3 font-heading text-lg font-bold text-brand-900">
                    CIBIL Score Ranges
                  </h2>
                  <p className="mb-4 text-sm text-gray-500">
                    Indicative bands used by lenders. Cut-offs vary by bank, NBFC and product.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CIBIL_SCORE_BANDS.map((band) => (
                      <article
                        key={band.range}
                        className={cn('rounded-2xl border p-4 shadow-sm', band.color)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Gauge className="h-4 w-4 opacity-70" />
                            <p className="font-heading font-bold">{band.label}</p>
                          </div>
                          <p className="font-heading text-lg font-bold">{band.range}</p>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed opacity-90 sm:text-sm">{band.desc}</p>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Factors */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
                  <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-900">
                    <FileSearch className="h-5 w-5 text-brand-600" />
                    What Affects Your Score?
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {CIBIL_FACTORS.map((f) => (
                      <div key={f.title} className="rounded-xl border border-brand-50 bg-brand-50/40 p-3.5">
                        <p className="text-sm font-bold text-brand-900">{f.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-600">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips + process */}
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-brand-700">
                      <TrendingUp className="h-4 w-4" />
                      <p className="text-[11px] font-semibold uppercase tracking-wide">Improvement Tips</p>
                    </div>
                    <h3 className="mt-2 font-heading text-base font-bold text-brand-900">
                      Strengthen Your Profile
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {CIBIL_IMPROVE_TIPS.slice(0, 6).map((tip) => (
                        <li key={tip} className="flex gap-2 text-xs text-gray-600 sm:text-sm">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 font-heading text-base font-bold text-brand-900">
                      <ShieldAlert className="h-4 w-4 text-brand-600" />
                      Assistance Process
                    </h3>
                    <div className="mt-4 space-y-3">
                      {CIBIL_PROCESS.map((step) => (
                        <div
                          key={step.step}
                          className="flex gap-3 rounded-xl border border-brand-50 bg-brand-50/50 px-3 py-3"
                        >
                          <span className="font-heading text-xl font-bold text-brand-600/30">{step.step}</span>
                          <div>
                            <p className="text-sm font-semibold text-brand-900">{step.title}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-900">
                    <Shield className="h-5 w-5 text-brand-600" />
                    Why Choose KuberFinserve
                  </h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {CIBIL_WHY.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Single sticky form */}
              <div className="lg:col-span-5">
                <div className="kf-sticky-form">
                  <ContactForm
                    variant="premium"
                    title="Request CIBIL Assistance"
                    source="cibil-assistance"
                    defaultLoanType="CIBIL Assistance"
                  />
                  <p className="mt-3 text-center text-[11px] text-gray-400">
                    No score guarantee · Advisory only · Subject to bureau & lender norms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <ProductExpertCta applyHref="#cibil-apply" />
        </section>

        <section className="py-14 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Credit scores, eligibility and our assistance model"
            />
            <div className="mt-8">
              <FAQAccordion items={CIBIL_FAQS} />
            </div>
          </div>
        </section>

        <section className="bg-brand-50/40 py-14 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Explore Loan Products"
              subtitle="Once your profile is loan-ready, compare offers across our products"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((loan) => (
                <LoanCard key={loan.slug} {...loan} features={loan.features.slice(0, 3)} />
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs leading-relaxed text-gray-500">
            {CIBIL_DISCLAIMER}
          </p>
        </section>
      </div>

      <ProductStickyBar applyHref="#cibil-apply" applyLabel="Get Help" />
    </>
  )
}
