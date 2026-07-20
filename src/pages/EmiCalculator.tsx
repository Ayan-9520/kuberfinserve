import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { SectionHeading } from '@/components/SectionHeading'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ProductExpertCta } from '@/components/product/ProductExpertCta'
import { ProductStickyBar } from '@/components/product/ProductStickyBar'
import { EmiCalculatorTool } from '@/components/emi/EmiCalculatorTool'
import { EMI_FAQ } from '@/data/emiPage'
import { PRODUCT_DISCLAIMER } from '@/data/productCommon'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/data/jsonLdSchemas'
import { SITE } from '@/data/site'

export function EmiCalculatorPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
  ])

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'KuberFinserve EMI Calculator',
    description:
      'Free EMI calculator with product-wise rates for home, personal, business and more loans.',
    url: 'https://kuberfinserve.com/emi-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    provider: { '@type': 'FinancialService', name: SITE.name, url: 'https://kuberfinserve.com' },
  }

  return (
    <>
      <SeoHead
        title="EMI Calculator — Home, Personal, Business & More | KuberFinserve"
        description="Free EMI calculator with product-wise rates starting from 7.10% p.a.* Plan EMI for home, personal, business, LAP, car & education loans. Subject to eligibility."
        path="/emi-calculator"
        keywords="EMI calculator, home loan EMI, personal loan EMI, business loan EMI, loan against property EMI, car loan EMI calculator, KuberFinserve"
      />
      <JsonLd data={breadcrumb} id="breadcrumb-emi" />
      <JsonLd data={webAppSchema} id="webapp-emi" />
      <JsonLd data={buildFaqSchema(EMI_FAQ)} id="faq-emi" />

      <div className="bg-gradient-to-b from-brand-50/70 via-silver-50 to-white pb-20 md:pb-0">
        <section className="py-6 md:py-10">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-6 text-center md:mb-8">
              <h1 className="font-heading text-2xl font-bold text-navy-900 md:text-3xl">
                EMI Calculator
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                Product-wise rates · Instant EMI · Subject to eligibility
              </p>
            </div>
            <EmiCalculatorTool showSchedule />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <ProductExpertCta applyHref="/apply-loan" />
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="How our EMI calculator works"
            />
            <div className="mt-8">
              <FAQAccordion items={EMI_FAQ} />
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
