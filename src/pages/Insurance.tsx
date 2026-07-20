import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Sparkles,
  Heart,
  Shield,
  Car,
  Home,
  Plane,
  Briefcase,
  CheckCircle2,
  FileCheck,
  Users,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { SectionHeading } from '@/components/SectionHeading'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ProductExpertCta } from '@/components/product/ProductExpertCta'
import { ProductStickyBar } from '@/components/product/ProductStickyBar'
import { InsuranceApplyForm } from '@/components/insurance/InsuranceApplyForm'
import {
  INSURANCE_PAGE,
  INSURANCE_PRODUCTS,
  INSURANCE_WHY,
  INSURANCE_PROCESS,
  INSURANCE_FAQS,
  INSURANCE_DISCLAIMER,
  type InsuranceProduct,
} from '@/data/insurance'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/data/jsonLdSchemas'
import { SITE } from '@/data/site'
import { cn } from '@/utils/cn'

const CATEGORY_ICON: Record<InsuranceProduct['category'], typeof Heart> = {
  Life: Heart,
  Health: Shield,
  Motor: Car,
  Property: Home,
  Travel: Plane,
  Business: Briefcase,
}

export function Insurance() {
  const [selectedId, setSelectedId] = useState(INSURANCE_PRODUCTS[0]!.id)
  const selected = INSURANCE_PRODUCTS.find((p) => p.id === selectedId) ?? INSURANCE_PRODUCTS[0]!

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insurance', path: '/insurance' },
  ])

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Insurance Plans — KuberFinserve',
    description: INSURANCE_PAGE.metaDescription,
    url: 'https://kuberfinserve.com/insurance',
    provider: {
      '@type': 'FinancialService',
      name: SITE.name,
      url: 'https://kuberfinserve.com',
    },
    areaServed: { '@type': 'Country', name: 'India' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Insurance Products',
      itemListElement: INSURANCE_PRODUCTS.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.title, description: p.description },
      })),
    },
  }

  return (
    <>
      <SeoHead
        title={INSURANCE_PAGE.metaTitle}
        description={INSURANCE_PAGE.metaDescription}
        path="/insurance"
        keywords={INSURANCE_PAGE.keywords}
        image={INSURANCE_PAGE.heroImage}
      />
      <JsonLd data={breadcrumb} id="breadcrumb-insurance" />
      <JsonLd data={serviceSchema} id="service-insurance" />
      <JsonLd data={buildFaqSchema(INSURANCE_FAQS)} id="faq-insurance" />

      <div className="pb-20 md:pb-0">
        {/* Hero */}
        <section className="relative min-h-[280px] overflow-hidden border-b border-brand-100 md:min-h-[340px]">
          {INSURANCE_PAGE.heroImage && (
            <img
              src={INSURANCE_PAGE.heroImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/45" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(13,107,87,0.12),transparent_55%)]" />
          <div className="container relative mx-auto flex min-h-[280px] flex-col justify-end px-4 py-10 md:min-h-[340px] md:py-12">
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-brand-700">Home</Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="font-medium text-brand-700">Insurance</span>
            </nav>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-800 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                  Life · Health · Motor · Home · Travel · Business
                </p>
                <h1 className="mt-4 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
                  {INSURANCE_PAGE.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {INSURANCE_PAGE.description}
                </p>
              </div>
              <a
                href="#insurance-quote"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:scale-[1.02]"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {INSURANCE_PROCESS.map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl border border-brand-100 bg-white/95 px-3 py-3 shadow-sm backdrop-blur-sm"
                >
                  <p className="font-heading text-lg font-bold text-brand-200">{s.step}</p>
                  <p className="text-[11px] font-semibold text-navy-900 sm:text-xs">{s.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product chips + details + ONE form */}
        <section id="insurance-quote" className="scroll-mt-28 bg-silver-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-5 flex flex-wrap gap-1.5">
              {INSURANCE_PRODUCTS.map((p) => {
                const Icon = CATEGORY_ICON[p.category]
                const active = p.id === selectedId
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all',
                      active
                        ? 'bg-brand-900 text-white shadow-sm'
                        : 'bg-white text-gray-600 ring-1 ring-slate-200/80 hover:bg-brand-50 hover:text-brand-800',
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {p.shortTitle}
                  </button>
                )
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Details */}
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 lg:col-span-7"
              >
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(15_41_32/0.06)] md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                    {selected.category} Insurance
                  </p>
                  <h2 className="mt-1 font-heading text-2xl font-bold text-brand-900">{selected.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-brand-700">{selected.coverFrom}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{selected.description}</p>

                  <h3 className="mt-6 flex items-center gap-2 text-sm font-bold text-brand-900">
                    <CheckCircle2 className="h-4 w-4 text-brand-600" />
                    Key Highlights
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {selected.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 rounded-xl bg-brand-50/80 px-3 py-2.5 text-sm text-gray-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-800">
                      <Users className="h-4 w-4 text-brand-600" />
                      Who is it for
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {selected.whoFor.map((w) => (
                        <li key={w} className="flex gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-800">
                      <FileCheck className="h-4 w-4 text-brand-600" />
                      Documents
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {selected.documents.map((d) => (
                        <li key={d} className="flex gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-5">
                  <h3 className="text-sm font-bold text-brand-900">Benefits</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.benefits.map((b) => (
                      <span
                        key={b}
                        className="rounded-lg border border-brand-200/60 bg-white px-3 py-1.5 text-xs font-medium text-brand-800"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-gray-400">{selected.claimsNote}</p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-900">
                    <ShieldCheck className="h-5 w-5 text-brand-600" />
                    Why Choose KuberFinserve
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {INSURANCE_WHY.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Single premium form — sticky */}
              <div className="lg:col-span-5">
                <div className="kf-sticky-form">
                  <InsuranceApplyForm
                    key={selected.id}
                    defaultType={selected.title}
                    source={`insurance-page:${selected.id}`}
                    title="Get Free Quote"
                  />
                  <p className="mt-3 text-center text-[11px] text-gray-400">
                    Selected: <span className="font-semibold text-brand-700">{selected.shortTitle}</span>
                    {' · '}Change product above anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <ProductExpertCta applyHref="#insurance-quote" />
        </section>

        <section className="py-14 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading title="Frequently Asked Questions" subtitle="Insurance buying & claims basics" />
            <div className="mt-8">
              <FAQAccordion items={INSURANCE_FAQS} />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs leading-relaxed text-gray-500">
            {INSURANCE_DISCLAIMER}
          </p>
        </section>
      </div>

      <ProductStickyBar applyHref="#insurance-quote" applyLabel="Get Quote" />
    </>
  )
}
