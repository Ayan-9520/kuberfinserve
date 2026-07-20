import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Target,
  Eye,
  Filter,
  Gauge,
  Users,
  ThumbsUp,
  ArrowRight,
  CheckCircle2,
  Building2,
  Handshake,
  ChevronRight,
  Sparkles,
  MapPin,
  Phone,
} from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { CTASection } from '@/components/CTASection'
import { ProductExpertCta } from '@/components/product/ProductExpertCta'
import { ProductStickyBar } from '@/components/product/ProductStickyBar'
import { ABOUT_TEXT, SITE } from '@/data/site'
import { WHY_CHOOSE, HOME_HERO_POINTS } from '@/data/home'
import {
  ABOUT_STATS,
  ABOUT_MISSION,
  ABOUT_VISION,
  ABOUT_QUOTE,
  ABOUT_HERO_SUBTITLE,
} from '@/data/about'
import { AboutIllustration } from '@/components/about/AboutIllustration'
import { fadeUp, staggerContainer } from '@/animations/variants'
import { buildBreadcrumbSchema } from '@/data/jsonLdSchemas'

const whyIcons = {
  filter: Filter,
  gauge: Gauge,
  users: Users,
  'thumbs-up': ThumbsUp,
} as const

export function About() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
  ])

  const orgSnippet = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE.name}`,
    description: ABOUT_HERO_SUBTITLE,
    url: 'https://kuberfinserve.com/about-us',
    mainEntity: {
      '@type': 'FinancialService',
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
      address: SITE.address,
    },
  }

  return (
    <>
      <SeoHead
        title={`About Us | ${SITE.name} — AI-Powered Financial Distribution`}
        description="Learn about KuberFinserve — authorized channel partners helping Indian consumers compare loans, insurance & credit products with transparent expert guidance."
        path="/about-us"
        keywords="about KuberFinserve, loan broker Delhi, financial distribution India, KuberOne platform"
      />
      <JsonLd data={breadcrumb} id="breadcrumb-about" />
      <JsonLd data={orgSnippet} id="about-page-schema" />

      <div className="bg-silver-50 pb-20 md:pb-0">
        {/* Premium hero */}
        <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-b from-slate-50 via-white to-brand-50/40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(13,107,87,0.1),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_90%,rgba(0,195,137,0.08),transparent_50%)]" />
          <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" aria-hidden />

          <div className="container relative mx-auto px-4 py-10 md:py-12">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="transition hover:text-brand-700">Home</Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="font-medium text-brand-700">About Us</span>
            </nav>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-800 shadow-sm">
                  <Handshake className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                  Trusted financial partner
                </p>
                <h1 className="mt-4 font-heading text-[1.85rem] font-bold leading-tight text-navy-900 sm:text-4xl md:text-[2.6rem]">
                  About {SITE.name}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {ABOUT_HERO_SUBTITLE}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:scale-[1.02]"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/become-partner"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 shadow-sm hover:border-brand-300 hover:bg-brand-50"
                  >
                    Become Partner
                  </Link>
                </div>
              </div>

              <div className="relative w-full max-w-lg">
                <div className="overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-emerald-50 shadow-[0_20px_50px_rgb(15_41_32/0.12)]">
                  <AboutIllustration className="aspect-[5/3] w-full object-contain p-3 sm:p-5" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ABOUT_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-brand-100 bg-white px-3 py-2.5 shadow-sm"
                    >
                      <p className="font-heading text-base font-bold text-brand-700 sm:text-lg">{stat.value}</p>
                      <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  Who we are
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-brand-900 md:text-3xl">
                  A sincere & transparent financial partner
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{ABOUT_TEXT}</p>
                <ul className="mt-6 space-y-2.5">
                  {HOME_HERO_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      {point}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-6 rounded-2xl border border-brand-100 bg-white px-5 py-4 text-sm italic text-brand-900/90 shadow-sm">
                  <span className="mb-2 block h-1 w-10 rounded-full bg-brand-600" />
                  &ldquo;{ABOUT_QUOTE}&rdquo;
                </blockquote>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/apply-loan"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md"
                  >
                    Apply for Loan
                  </Link>
                  <Link
                    to="/check-eligibility"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
                  >
                    Check Eligibility
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-100/60 shadow-[0_20px_60px_rgb(15_41_32/0.1)]">
                  <AboutIllustration className="aspect-[4/3] max-h-[360px] object-contain p-4 md:p-6" />
                </div>
                <div className="absolute -bottom-4 -left-2 rounded-2xl border border-brand-100 bg-white p-4 shadow-lg sm:-left-4 md:-bottom-6 md:-left-6 md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-heading text-lg font-bold text-brand-900 md:text-xl">Delhi HQ</p>
                      <p className="text-xs text-gray-500">Pan-India assistance</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-y border-brand-100/80 bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center md:mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">Our purpose</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-brand-900 md:text-3xl">
                Mission & Vision
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/60 p-6 shadow-[0_12px_40px_rgb(15_41_32/0.06)] md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-600/25">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-900">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{ABOUT_MISSION}</p>
              </motion.article>
              <motion.article
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-navy-50/40 p-6 shadow-[0_12px_40px_rgb(15_41_32/0.06)] md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-white shadow-md">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-900">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{ABOUT_VISION}</p>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Why trust */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">Why choose us</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-brand-900 md:text-3xl">
                Why trust {SITE.name}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                Transparent broking with personalized offers and expert guidance.
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {WHY_CHOOSE.map((item) => {
                const Icon = whyIcons[item.icon]
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-brand-900">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">{item.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Contact strip */}
        <section className="container mx-auto px-4 pb-8">
          <div className="overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-white via-brand-50/60 to-slate-50 p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">Visit / Call</p>
                <h2 className="mt-1 font-heading text-xl font-bold text-navy-900 md:text-2xl">We&apos;re here to help</h2>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {SITE.address}
                  </p>
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-navy-900">
                    <Phone className="h-4 w-4 text-brand-600" />
                    {SITE.phone}
                  </a>
                </div>
              </div>
              <Link
                to="/contact-us"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-10">
          <ProductExpertCta applyHref="/apply-loan" />
        </section>
      </div>

      <CTASection
        title="Ready to find the right financial product?"
        subtitle="Let our experts compare lenders and guide you from application to disbursal."
      />
      <ProductStickyBar applyHref="/apply-loan" applyLabel="Apply Now" />
    </>
  )
}
