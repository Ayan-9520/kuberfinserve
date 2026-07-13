import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Infinity as InfinityIcon,
  LogIn,
  Monitor,
  Receipt,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { SITE } from '@/data/site'
import { JsonLd } from '@/components/JsonLd'
import { SeoHead } from '@/components/SeoHead'
import { PartnerApplyForm } from '@/components/partners/PartnerApplyForm'
import { PartnerBenefitsSection } from '@/components/partners/PartnerBenefitsSection'
import { PartnersFaqAccordion } from '@/components/partners/PartnersFaqAccordion'
import { PartnersSectionHeading } from '@/components/partners/PartnersSectionHeading'
import {
  HERO_BULLETS,
  HOW_IT_WORKS,
  PARTNER_CTA,
  PARTNER_HERO_STATS,
  PARTNERS_FAQ,
  PARTNERS_SEO,
  WHY_CARDS,
} from '@/data/partners'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const whyIcons = {
  home: Home,
  monitor: Monitor,
  zap: Zap,
  receipt: Receipt,
  trending: TrendingUp,
  infinity: InfinityIcon,
} as const

export function BecomePartner() {
  const location = useLocation()
  const seoPath = location.pathname === '/partners' ? '/partners' : PARTNERS_SEO.path

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PARTNERS_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="partners-root overflow-x-hidden">
      <SeoHead
        title={PARTNERS_SEO.title}
        description={PARTNERS_SEO.description}
        path={seoPath}
        keywords={PARTNERS_SEO.keywords}
      />
      <JsonLd
        id="jsonld-become-partner-page"
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: PARTNERS_SEO.title,
          description: PARTNERS_SEO.description,
          url: `https://kuberfinserve.com${seoPath}`,
        }}
      />
      <JsonLd id="jsonld-become-partner-faq" data={faqPageSchema} />

      {/* Hero */}
      <section className="pf-hero-glow pf-grid-bg relative">
        <div className="container mx-auto px-4 pb-8 pt-6 md:pb-10 md:pt-8">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px] lg:gap-10 xl:grid-cols-[1fr_420px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--pf-primary)]/25 bg-[var(--pf-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--pf-primary)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--pf-accent)]" />
                Powered by {SITE.platformName}
              </span>

              <h1 className="mt-4 font-heading text-[2rem] font-extrabold leading-[1.08] tracking-tight text-[var(--pf-text)] sm:text-4xl lg:text-[2.75rem]">
                More Than a Job.
                <span className="block pf-text-gradient">It&apos;s Your Business.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--pf-text-secondary)] md:text-base">
                Build Your Financial Business From Anywhere. Join India&apos;s AI Powered Financial
                Distribution Platform with technology, products, training and operational support.
              </p>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {HERO_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-[var(--pf-text-secondary)] sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--pf-accent)]" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
                {PARTNER_HERO_STATS.map((s) => (
                  <div key={s.label} className="pf-stat-pill rounded-xl px-2 py-2.5 text-center sm:px-3">
                    <p className="font-heading text-base font-bold text-[var(--pf-primary)] sm:text-lg">{s.value}</p>
                    <p className="text-[9px] leading-tight text-[var(--pf-text-muted)] sm:text-[10px]">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="#apply"
                  className="pf-btn-primary inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold"
                >
                  {PARTNER_CTA}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  to={SITE.partnerLoginUrl}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--pf-border)] px-4 py-2 text-xs font-semibold text-[var(--pf-text-secondary)] transition-colors hover:border-[var(--pf-primary)]/40 hover:text-[var(--pf-primary)]"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Partner Login
                </Link>
              </div>
            </motion.div>

            <PartnerApplyForm variant="hero" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <PartnerBenefitsSection />

      {/* Why Join Us */}
      <section id="why-join" className="pf-section pf-section-dark">
        <div className="container mx-auto px-4">
          <PartnersSectionHeading
            eyebrow="Why Join Us"
            title="Build a Real Financial Business"
            subtitle="Not another DSA program — a complete platform to own your growth."
          />
          <div className="mx-auto mt-7 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CARDS.map((card, i) => {
              const Icon = whyIcons[card.icon]
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                  className="pf-bento-card rounded-xl p-5"
                >
                  <div className="pf-icon-box mb-3 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-[var(--pf-text)]">{card.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--pf-text-secondary)] md:text-sm">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="pf-section pf-section-surface">
        <div className="container mx-auto px-4">
          <PartnersSectionHeading
            eyebrow="How It Works"
            title="From Application to Earnings"
            subtitle="A clear path to building your financial distribution business."
          />
          <div className="mx-auto mt-7 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="pf-step-card relative rounded-xl p-5 text-center"
              >
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[var(--pf-primary)]/15 font-heading text-sm font-bold text-[var(--pf-primary)]">
                  {step.step}
                </span>
                <h3 className="mt-3 font-heading text-sm font-bold text-[var(--pf-text)]">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--pf-text-secondary)]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pf-section pf-section-surface">
        <div className="container mx-auto px-4">
          <PartnersSectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about joining KuberFinserve."
          />
          <div className="mt-7">
            <PartnersFaqAccordion />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pf-section border-t border-[var(--pf-border)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-[var(--pf-text)] md:text-3xl">
            Ready to Build Your Financial Business?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--pf-text-secondary)]">
            Join thousands of partners growing with KuberOne — India&apos;s Financial Distribution OS.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#apply"
              className="pf-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
            >
              {PARTNER_CTA}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to={SITE.partnerLoginUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--pf-border)] px-6 py-3 text-sm font-semibold text-[var(--pf-text-secondary)] transition-colors hover:border-[var(--pf-primary)]/40 hover:text-[var(--pf-primary)]"
            >
              <LogIn className="h-4 w-4" />
              Existing Partner? Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
