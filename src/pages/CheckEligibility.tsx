import { Link } from 'react-router-dom'
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { SectionHeading } from '@/components/SectionHeading'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ProductExpertCta } from '@/components/product/ProductExpertCta'
import { ProductStickyBar } from '@/components/product/ProductStickyBar'
import { EligibilityChecker } from '@/components/eligibility/EligibilityChecker'
import {
  ELIGIBILITY_PAGE,
  ELIGIBILITY_FAQS,
  ELIGIBILITY_STEPS,
} from '@/data/eligibilityPage'
import { PRODUCT_DISCLAIMER } from '@/data/productCommon'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/data/jsonLdSchemas'
import { SITE } from '@/data/site'

export function CheckEligibilityPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Check Eligibility', path: '/check-eligibility' },
  ])

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'KuberFinserve Loan Eligibility Calculator',
    description: ELIGIBILITY_PAGE.metaDescription,
    url: 'https://kuberfinserve.com/check-eligibility',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    provider: {
      '@type': 'FinancialService',
      name: SITE.name,
      url: 'https://kuberfinserve.com',
    },
  }

  return (
    <>
      <SeoHead
        title={ELIGIBILITY_PAGE.metaTitle}
        description={ELIGIBILITY_PAGE.metaDescription}
        path="/check-eligibility"
        keywords={ELIGIBILITY_PAGE.keywords}
        image={ELIGIBILITY_PAGE.heroImage}
      />
      <JsonLd data={breadcrumb} id="breadcrumb-eligibility" />
      <JsonLd data={webAppSchema} id="webapp-eligibility" />
      <JsonLd data={buildFaqSchema(ELIGIBILITY_FAQS)} id="faq-eligibility" />

      <div className="pb-20 md:pb-0">
        <section className="relative min-h-[300px] overflow-hidden border-b border-brand-100 md:min-h-[380px]">
          <img
            src={ELIGIBILITY_PAGE.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/50" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-50/80 via-transparent to-white/40" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_20%,rgba(13,107,87,0.14),transparent_55%)]" />

          <div className="container relative mx-auto flex min-h-[300px] flex-col justify-end px-4 pb-10 pt-8 md:min-h-[380px] md:pb-12 md:pt-10">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="transition hover:text-brand-700">Home</Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="font-medium text-brand-700">Check Eligibility</span>
            </nav>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-brand-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-brand-800 shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                  <span>Free · Instant</span>
                  <span className="text-slate-300" aria-hidden>
                    |
                  </span>
                  <span className="font-medium text-slate-600">Subject to eligibility</span>
                </p>
                <h1 className="mt-4 font-heading text-[1.85rem] font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl md:text-[2.6rem]">
                  Check Loan Eligibility
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {ELIGIBILITY_PAGE.description}
                </p>
              </div>

              <div className="grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-3">
                {ELIGIBILITY_STEPS.map((s) => (
                  <div
                    key={s.step}
                    className="relative overflow-hidden rounded-2xl border border-brand-100/80 bg-white/95 px-3 py-3 shadow-md backdrop-blur-sm sm:px-4 sm:py-3.5"
                  >
                    <p className="font-heading text-lg font-bold text-brand-200 sm:text-xl">{s.step}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-snug text-navy-900 sm:text-xs">
                      {s.title}
                    </p>
                    <p className="mt-0.5 hidden text-[10px] leading-snug text-slate-500 sm:block">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-silver-50 py-6 md:py-10">
          <div className="container mx-auto max-w-5xl px-4">
            <EligibilityChecker />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <ProductExpertCta applyHref="/apply-loan" />
        </section>

        <section className="bg-brand-50/40 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-brand-100 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" />
                <div>
                  <h2 className="font-heading text-lg font-bold text-brand-900">
                    How we estimate eligibility
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>• Income & employment multipliers aligned to product norms</li>
                    <li>• FOIR-based EMI headroom after existing obligations</li>
                    <li>• Credit score bands that influence amount & indicative rate</li>
                    <li>• Product caps (amount & tenure) from our loan programmes</li>
                    <li>• Never a sanction letter — banks/NBFCs decide finally</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Clear answers about our eligibility calculator"
            />
            <div className="mt-8">
              <FAQAccordion items={ELIGIBILITY_FAQS} />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs leading-relaxed text-gray-500">
            {PRODUCT_DISCLAIMER}
          </p>
        </section>
      </div>

      <ProductStickyBar applyHref="/apply-loan" applyLabel="Apply Now" />
    </>
  )
}
