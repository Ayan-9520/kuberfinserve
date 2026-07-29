import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Building2,
  ChartColumn,
  CheckCircle2,
  ClipboardList,
  Coins,
  Cpu,
  Crown,
  FileText,
  Flag,
  Globe,
  GraduationCap,
  Headset,
  Home,
  IdCard,
  Landmark,
  Layers,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Phone,
  Rocket,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Wallet,
  XCircle,
} from 'lucide-react'
import { PartnerApplyForm } from '@/components/partners/PartnerApplyForm'
import { PartnersFaqAccordion } from '@/components/partners/PartnersFaqAccordion'
import { PlatformLogo } from '@/components/PlatformLogo'
import { SITE } from '@/data/site'
import {
  ATTRACTION_POINTS,
  EARN_MORE,
  FINAL_CTA,
  FOOTER_CTA,
  HERO,
  HERO_EARNING,
  HERO_HOOKS,
  JOURNEY,
  KUBERONE,
  MODEL_COMPARE,
  PAGE_JUMPS,
  RANKING_SYSTEM,
  REAL_INCOME,
  SUCCESS,
  SWITCHING,
  TECH_FLOW,
  WHAT_YOU_GET,
  WHY_JOIN_CORE,
  WHY_KUBER,
  LANDING_FAQ,
} from '@/data/partnerLanding'
import { WHATSAPP_DEMO_MESSAGE, WHATSAPP_PARTNER_MESSAGE } from '@/data/partners'
import { cn } from '@/utils/cn'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const iconMap = {
  wallet: Wallet,
  rocket: Rocket,
  crown: Crown,
  cpu: Cpu,
  building: Building2,
  headset: Headset,
  layout: LayoutDashboard,
  message: MessageSquare,
  megaphone: Megaphone,
  sparkles: Sparkles,
  coins: Coins,
  graduation: GraduationCap,
  chart: ChartColumn,
  globe: Globe,
  smartphone: Smartphone,
  id: IdCard,
  clipboard: ClipboardList,
  share: Share2,
  shield: Shield,
  home: Home,
  landmark: Landmark,
  file: FileText,
} as const

const whatsappDemo = `https://wa.me/${SITE.whatsapp}?text=${WHATSAPP_DEMO_MESSAGE}`
const whatsappPartner = `https://wa.me/${SITE.whatsapp}?text=${WHATSAPP_PARTNER_MESSAGE}`
const telHref = `tel:${SITE.phone.replace(/\s/g, '')}`

function SectionHead({
  eyebrow,
  title,
  subtitle,
  light,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p
          className={cn(
            'text-[11px] font-bold uppercase tracking-[0.16em]',
            light ? 'text-brand-300' : 'text-brand-700',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-2 font-heading text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl',
          light ? 'text-white' : 'text-navy-900',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-sm md:text-base', light ? 'text-slate-300' : 'text-gray-600')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/** Sticky jump links — keep key sections visible while scrolling */
export function PartnerJumpNav() {
  return (
    <div className="sticky top-[4.5rem] z-30 border-b border-brand-100/80 bg-white/95 backdrop-blur-md lg:top-[5.25rem]">
      <div className="container mx-auto flex gap-1 overflow-x-auto px-4 py-2.5 scrollbar-none">
        {PAGE_JUMPS.map((j) => (
          <a
            key={j.href}
            href={j.href}
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
              j.href === '#apply'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-brand-50 text-brand-800 hover:bg-brand-100',
            )}
          >
            {j.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/** Mobile sticky convert bar */
export function PartnerStickyConvertBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-200 bg-white/95 px-3 py-2.5 shadow-[0_-8px_30px_rgb(15_41_32/0.12)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={telHref}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-200 py-3 text-sm font-semibold text-brand-800"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href="#apply"
          className="inline-flex flex-[1.6] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3 text-sm font-bold text-white shadow-md"
        >
          Become Partner
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

/**
 * ABOVE THE FOLD: headline hooks + form on the right.
 * Visitors see value + can register without scrolling.
 */
export function PartnerLandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-brand-50/40 text-navy-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(13,107,87,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="container relative mx-auto px-4 pb-10 pt-6 md:pb-14 md:pt-10">
        <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Form first on mobile so registration is above the fold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="order-1 lg:order-2 lg:pt-2"
          >
            <PartnerApplyForm variant="hero" />
            <p className="mt-3 text-center text-[11px] text-slate-500">
              Or call{' '}
              <a href={telHref} className="font-semibold text-brand-700 hover:text-brand-900">
                {SITE.phone}
              </a>
            </p>
          </motion.div>

          {/* Left: attraction copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-800 shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
              {HERO.eyebrow}
            </span>

            <h1 className="mt-4 font-heading text-[1.65rem] font-extrabold leading-[1.12] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.65rem]">
              {HERO.title}
            </h1>

            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-heading text-base font-bold text-brand-700 sm:text-lg">
              {HERO.subtitleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>

            <p className="mt-3 max-w-xl text-base font-semibold text-navy-900 md:text-lg">{HERO.tagline}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:text-[15px]">{HERO.lead}</p>

            {/* Earning hook */}
            <div className="mt-5 max-w-lg rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-white px-4 py-3.5 shadow-sm ring-1 ring-brand-100 sm:px-5 sm:py-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                {HERO_EARNING.label}
              </p>
              <p className="mt-1 font-heading text-xl font-extrabold text-navy-900 sm:text-3xl">
                {HERO_EARNING.headline}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-slate-600">{HERO_EARNING.detail}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 hover:from-brand-800 hover:to-brand-600"
              >
                {HERO.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to={`${SITE.partnerLoginUrl}?intent=academy`}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-bold text-brand-800 shadow-sm hover:bg-brand-100"
              >
                Login & Start Academy
              </Link>
              <a
                href={whatsappPartner}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 shadow-sm hover:border-brand-300 hover:bg-brand-50"
              >
                {HERO.secondaryCta}
              </a>
              <a
                href={whatsappDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-brand-700 hover:text-brand-900 sm:inline-flex"
              >
                {HERO.demoCta}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Hook stats row */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 md:mt-10 md:grid-cols-4">
          {HERO_HOOKS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <p className="font-heading text-lg font-extrabold text-brand-700 sm:text-2xl">{h.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-navy-900 sm:text-sm">{h.label}</p>
              <p className="mt-0.5 hidden text-[10px] text-slate-500 sm:block">{h.hint}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Why join — short attraction cards right after hero */
export function AttractionStripSection() {
  return (
    <section className="border-b border-brand-100 bg-white py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">Why partners join</p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              Clear reasons. Visible outcomes.
            </h2>
          </div>
          <a href="#apply" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900">
            Start registration
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ATTRACTION_POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-sm font-bold text-navy-900">{p.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Compact earnings preview — don’t bury the money story */
export function EarningsHookSection() {
  return (
    <section id="earnings-hook" className="bg-silver-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHead
          title="What partners care about most"
          subtitle="Same effort as a job — but you keep more of the value you create."
        />
        <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-red-600">Corporate employee</p>
            <p className="mt-2 font-heading text-3xl font-extrabold text-red-700">2X – 3X</p>
            <p className="mt-1 text-sm text-gray-500">Typical growth on salary over a career*</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {[
                'Growth tied to salary slabs',
                'Company owns the business',
                'Limited lender / product access',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white shadow-lg"
          >
            <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
              Recommended
            </span>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-200">Kuber Partner</p>
            <p className="mt-2 font-heading text-3xl font-extrabold text-brand-300">Up to 100%</p>
            <p className="mt-1 text-sm text-brand-100/90">
              Of your deal potential — platform cut typically only 20%–25%*
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-50">
              {[
                'You keep the majority share',
                'You own the business',
                '50+ lenders + KuberOne tech',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#apply"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-900"
            >
              I want this model
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        <p className="mt-4 text-center text-[11px] text-gray-400">
          *Indicative comparison for education. Corporate growth &amp; partner share vary by role,
          product, performance and partner agreement. Not a guaranteed income or payout promise.
        </p>
      </div>
    </section>
  )
}

export function WhySwitchingSection() {
  return (
    <section id="why-switch" className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead title={SWITCHING.title} />
        <div className="mx-auto mt-10 grid max-w-5xl items-stretch gap-5 md:grid-cols-2">
          <motion.div
            {...fadeUp}
            className="flex h-full flex-col rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <h3 className="font-heading text-lg font-bold text-red-800">{SWITCHING.corporate.title}</h3>
            </div>
            <ul className="mt-5 flex flex-1 flex-col space-y-3">
              {SWITCHING.corporate.points.map((p) => (
                <li
                  key={p}
                  className="flex min-h-[2.75rem] items-center gap-2 rounded-xl bg-white/80 px-3 py-2.5 text-sm text-red-900/80"
                >
                  <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.08 }}
            className="flex h-full flex-col rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-md ring-1 ring-brand-100/60 md:p-8"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand-600" />
              <h3 className="font-heading text-lg font-bold text-brand-900">{SWITCHING.partner.title}</h3>
            </div>
            <ul className="mt-5 flex flex-1 flex-col space-y-3">
              {SWITCHING.partner.points.map((p) => (
                <li
                  key={p}
                  className="flex min-h-[2.75rem] items-center gap-2 rounded-xl bg-white/90 px-3 py-2.5 text-sm font-medium text-brand-900"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 px-6 py-3 text-sm font-bold text-white shadow-md"
          >
            {SWITCHING.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function ModelComparisonSection() {
  const corporateSteps = MODEL_COMPARE.corporate.overheads
  const partnerSteps = MODEL_COMPARE.partner.flow

  return (
    <section id="model-compare" className="bg-silver-50 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead title={MODEL_COMPARE.title} subtitle={MODEL_COMPARE.subtitle} />
        <div className="mx-auto mt-10 grid max-w-6xl items-stretch gap-6 lg:grid-cols-2">
          {/* Corporate — same card shell as partner */}
          <motion.div
            {...fadeUp}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-red-200/80 bg-white shadow-[0_16px_48px_rgb(127_29_29/0.08)]"
          >
            <div className="min-h-[5.5rem] bg-gradient-to-r from-red-700 to-red-600 px-6 py-4 text-white">
              <h3 className="font-heading text-lg font-bold">{MODEL_COMPARE.corporate.title}</h3>
              <p className="mt-1 text-xs text-red-100/90">{MODEL_COMPARE.corporate.tagline}</p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
                {MODEL_COMPARE.payoutLabel}
              </p>
              <p className="mt-1 font-heading text-3xl font-extrabold text-navy-900">
                {MODEL_COMPARE.payoutAmount}
              </p>

              <div className="mt-5 flex flex-1 flex-col">
                {corporateSteps.map((step, i) => (
                  <div key={step} className="flex flex-col">
                    <div className="flex min-h-[2.75rem] items-center justify-between rounded-xl border border-red-100 bg-red-50/60 px-3 py-2.5 text-sm font-medium text-red-900/85">
                      <span>{step}</span>
                      <span className="text-xs font-bold text-red-500">−</span>
                    </div>
                    {i < corporateSteps.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="h-3.5 w-3.5 text-red-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase text-red-700">
                  {MODEL_COMPARE.corporate.takeHomeLabel}
                </p>
                <p className="mt-1 font-heading text-2xl font-extrabold text-red-800">
                  {MODEL_COMPARE.corporate.takeHome}
                </p>
              </div>
              <p className="mt-3 min-h-[2.5rem] text-center text-xs leading-relaxed text-red-700/80">
                {MODEL_COMPARE.corporate.note}
              </p>
            </div>
          </motion.div>

          {/* Partner — identical layout structure */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.08 }}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-[0_16px_48px_rgb(11_93_75/0.12)]"
          >
            <div className="min-h-[5.5rem] bg-gradient-to-r from-brand-800 to-brand-600 px-6 py-4 text-white">
              <h3 className="font-heading text-lg font-bold">{MODEL_COMPARE.partner.title}</h3>
              <p className="mt-1 text-xs text-brand-100/90">{MODEL_COMPARE.partner.tagline}</p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                {MODEL_COMPARE.payoutLabel}
              </p>
              <p className="mt-1 font-heading text-3xl font-extrabold text-navy-900">
                {MODEL_COMPARE.payoutAmount}
              </p>

              <div className="mt-5 flex flex-1 flex-col">
                {partnerSteps.map((step, i) => (
                  <div key={step} className="flex flex-col">
                    <div className="flex min-h-[2.75rem] items-center justify-between rounded-xl border border-brand-100 bg-brand-50/70 px-3 py-2.5 text-sm font-semibold text-brand-900">
                      <span>{step}</span>
                      <span className="text-xs font-bold text-brand-600">
                        {i < partnerSteps.length - 1 ? '↓' : '✓'}
                      </span>
                    </div>
                    {i < partnerSteps.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="h-3.5 w-3.5 text-brand-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-center text-white shadow-md">
                <p className="text-xs font-semibold uppercase text-brand-100">
                  {MODEL_COMPARE.partner.takeHomeLabel}
                </p>
                <p className="mt-1 font-heading text-2xl font-extrabold">
                  {MODEL_COMPARE.partner.takeHome}
                </p>
              </div>
              <p className="mt-3 min-h-[2.5rem] text-center text-xs leading-relaxed text-brand-800">
                {MODEL_COMPARE.partner.note}
              </p>
            </div>
          </motion.div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] text-gray-400">
          {MODEL_COMPARE.disclaimer}
        </p>
        <div className="mt-6 text-center">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white"
          >
            Become Partner — keep more of every payout
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function WhyKuberSection() {
  // Skip the six pillars already shown via WHY_JOIN_CORE
  const featured = WHY_KUBER.items.slice(6, 18)
  const rest = WHY_KUBER.items.slice(18)

  return (
    <section id="why-kuber" className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead title={WHY_KUBER.title} subtitle={WHY_KUBER.subtitle} />

        {/* Poster “Why Join” six pillars with descriptions */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_JOIN_CORE.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/50 p-5 shadow-sm"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </motion.div>
            )
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs font-semibold uppercase tracking-wider text-brand-700">
          Plus full KuberOne toolkit
        </p>
        <div className="mx-auto mt-4 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {featured.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ delay: (i % 8) * 0.03 }}
                className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-brand-50/40 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-heading text-xs font-bold leading-snug text-navy-900 sm:text-sm">
                  {item.title}
                </p>
              </motion.div>
            )
          })}
        </div>
        {rest.length > 0 && (
          <div className="mx-auto mt-4 flex max-w-6xl flex-wrap justify-center gap-2">
            {rest.map((item) => (
              <span
                key={item.title}
                className="rounded-full border border-brand-100 bg-brand-50/60 px-3 py-1 text-[11px] font-semibold text-brand-800"
              >
                {item.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function RealIncomeSection() {
  return (
    <section
      id="real-income"
      className="relative overflow-hidden border-y border-brand-100 bg-gradient-to-b from-slate-50 via-white to-brand-50/40 py-14 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(13,107,87,0.1),transparent_45%)]" />
      <div className="container relative mx-auto px-4">
        <SectionHead title={REAL_INCOME.title} />
        <motion.div
          {...fadeUp}
          className="mx-auto mt-8 max-w-2xl rounded-3xl border border-brand-100 bg-white p-6 text-center shadow-sm md:p-8"
        >
          <p className="text-sm text-slate-600">
            {REAL_INCOME.scenario}{' '}
            <span className="font-heading text-xl font-bold text-navy-900">{REAL_INCOME.deal}</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">{REAL_INCOME.payoutRate}</p>
          <p className="mt-4 text-xs uppercase tracking-wide text-brand-700">{REAL_INCOME.grossLabel}</p>
          <p className="font-heading text-4xl font-extrabold text-brand-700 md:text-5xl">{REAL_INCOME.gross}</p>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-red-200 bg-red-50/80 p-6 shadow-sm"
          >
            <h3 className="font-heading text-lg font-bold text-red-800">{REAL_INCOME.employee.title}</h3>
            <p className="mt-3 text-xs uppercase tracking-wide text-red-600/80">
              {REAL_INCOME.employee.incomeLabel}
            </p>
            <p className="mt-1 font-heading text-2xl font-extrabold text-red-900">
              {REAL_INCOME.employee.income}
            </p>
            <ul className="mt-4 space-y-2">
              {REAL_INCOME.employee.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-red-800/80">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.08 }}
            className="relative rounded-3xl border border-brand-200 bg-gradient-to-br from-white to-brand-50 p-6 shadow-md shadow-brand-900/5"
          >
            <span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
              {REAL_INCOME.partner.badge}
            </span>
            <h3 className="font-heading text-lg font-bold text-navy-900">{REAL_INCOME.partner.title}</h3>
            <p className="mt-3 text-xs uppercase tracking-wide text-brand-700">
              {REAL_INCOME.partner.incomeLabel}
            </p>
            <p className="mt-1 font-heading text-2xl font-extrabold text-brand-700">
              {REAL_INCOME.partner.income}
            </p>
            <p className="mt-1 text-xs text-slate-500">{REAL_INCOME.partner.basedOn}</p>
            <ul className="mt-4 space-y-2">
              {REAL_INCOME.partner.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <p className="mt-8 text-center font-heading text-lg font-bold text-brand-800 md:text-xl">
          {REAL_INCOME.banner}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[11px] text-slate-500">{REAL_INCOME.disclaimer}</p>
      </div>
    </section>
  )
}

export function WhyEarnMoreSection() {
  return (
    <section id="earn-more" className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <SectionHead title={EARN_MORE.title} subtitle={EARN_MORE.subtitle} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {EARN_MORE.points.map((p, i) => (
                <motion.div
                  key={p}
                  {...fadeUp}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm font-medium text-navy-900"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                  {p}
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            {...fadeUp}
            className="mx-auto flex h-56 w-56 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-50 shadow-inner ring-8 ring-brand-50"
          >
            <Trophy className="h-16 w-16 text-brand-600" />
            <p className="mt-3 text-center font-heading text-sm font-bold text-brand-900">
              Partner
              <br />
              Advantage
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function JourneyTimelineSection() {
  return (
    <section id="journey" className="bg-silver-50 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead title={JOURNEY.title} subtitle={JOURNEY.subtitle} />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.steps.map((step, i) => (
            <motion.div
              key={step.month}
              {...fadeUp}
              transition={{ delay: i * 0.06 }}
              className="relative rounded-3xl border border-brand-100 bg-white p-5 shadow-sm"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-brand-600">{step.month}</p>
              <h3 className="mt-1 font-heading text-lg font-bold text-navy-900">{step.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                {step.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const rankTone: Record<(typeof RANKING_SYSTEM.ranks)[number]['tone'], string> = {
  bronze: 'from-amber-700 to-amber-500',
  silver: 'from-slate-500 to-slate-400',
  gold: 'from-amber-500 to-yellow-400',
  platinum: 'from-brand-700 to-brand-500',
  diamond: 'from-brand-800 via-brand-600 to-cyan-500',
}

const badgeIconMap = {
  trophy: Trophy,
  flag: Flag,
  layers: Layers,
  shield: Shield,
  star: Star,
  crown: Crown,
} as const

export function RankingRewardsSection() {
  return (
    <section
      id="ranking"
      className="relative overflow-hidden border-y border-brand-100 bg-gradient-to-b from-white via-slate-50 to-brand-50/50 py-14 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,107,87,0.08),_transparent_55%)]" />
      <div className="container relative mx-auto px-4">
        <SectionHead
          eyebrow={RANKING_SYSTEM.eyebrow}
          title={RANKING_SYSTEM.title}
          subtitle={RANKING_SYSTEM.subtitle}
        />

        <motion.div
          {...fadeUp}
          className="mx-auto mt-8 flex max-w-xl flex-col items-center rounded-3xl border border-brand-100 bg-white px-6 py-5 text-center shadow-sm"
        >
          <p className="font-heading text-4xl font-extrabold tracking-tight text-brand-700 md:text-5xl">
            {RANKING_SYSTEM.maxBonusLabel}
          </p>
          <p className="mt-1 text-sm text-slate-600">{RANKING_SYSTEM.maxBonusHint}</p>
          <p className="mt-3 text-xs font-semibold text-brand-700">{RANKING_SYSTEM.stackNote}</p>
        </motion.div>

        {/* Achievement ranks */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {RANKING_SYSTEM.ranks.map((rank, i) => (
            <motion.div
              key={rank.name}
              {...fadeUp}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm"
            >
              <div
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white',
                  rankTone[rank.tone],
                )}
              >
                <Flag className="h-3 w-3" />
                {rank.name}
              </div>
              <p className="mt-3 text-xs font-semibold text-brand-700">{rank.flag}</p>
              <p className="mt-1 text-sm font-medium text-navy-900">{rank.criteria}</p>
              <p className="mt-2 text-xs text-slate-500">{rank.perk}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges & bonuses */}
        <div className="mx-auto mt-12 max-w-6xl">
          <h3 className="text-center font-heading text-xl font-bold text-navy-900 md:text-2xl">
            Badges &amp; Flags — Earn Extra Bonus
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            Unlock achievements on KuberOne. Each badge adds bonus % — stack them up to the 10% cap.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {RANKING_SYSTEM.badges.map((badge, i) => {
              const Icon = badgeIconMap[badge.icon]
              return (
                <motion.div
                  key={badge.name}
                  {...fadeUp}
                  transition={{ delay: i * 0.04 }}
                  className="flex gap-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-4 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-heading text-sm font-bold text-navy-900">{badge.name}</h4>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                        {badge.bonus}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{badge.how}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* How it works */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RANKING_SYSTEM.howItWorks.map((step, i) => (
            <motion.div
              key={step}
              {...fadeUp}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-brand-100 bg-white px-4 py-4 text-center shadow-sm"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-2 text-xs font-medium leading-snug text-slate-700">{step}</p>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-slate-500">
          {RANKING_SYSTEM.disclaimer}
        </p>
      </div>
    </section>
  )
}

export function KuberOnePlatformSection() {
  return (
    <section id="kuberone" className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex justify-center">
          <PlatformLogo size="lg" showName nameBelow />
        </div>
        <SectionHead eyebrow={KUBERONE.eyebrow} title={KUBERONE.title} subtitle={KUBERONE.subtitle} />
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {KUBERONE.features.map((f, i) => (
            <motion.div
              key={f}
              {...fadeUp}
              transition={{ delay: (i % 6) * 0.04 }}
              className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-silver-50 p-4 text-center shadow-sm hover:border-brand-200 hover:shadow-md"
            >
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="font-heading text-[11px] font-bold leading-snug text-navy-900 sm:text-xs">{f}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to={SITE.partnerLoginUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Explore partner login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function TechWorkflowSection() {
  return (
    <section id="technology" className="bg-silver-50 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead title={TECH_FLOW.title} subtitle={TECH_FLOW.subtitle} />
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2 md:gap-3">
          {TECH_FLOW.steps.map((step, i) => (
            <motion.div
              key={step}
              {...fadeUp}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2"
            >
              <div className="rounded-2xl border border-brand-100 bg-white px-3 py-2.5 text-center shadow-sm sm:px-4">
                <span className="mb-1 block text-[10px] font-bold text-brand-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="whitespace-nowrap font-heading text-xs font-bold text-navy-900 sm:text-sm">
                  {step}
                </p>
              </div>
              {i < TECH_FLOW.steps.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-400 sm:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PartnerSuccessSection() {
  return (
    <section id="success" className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead title={SUCCESS.title} subtitle={SUCCESS.subtitle} />
        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
          {SUCCESS.stories.map((s, i) => (
            <motion.div
              key={s.name}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/50 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-heading text-sm font-bold text-white">
                  {s.initials}
                </div>
                <div>
                  <p className="font-heading font-bold text-navy-900">{s.name}</p>
                  <p className="text-xs text-gray-500">
                    {s.role} · {s.city}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: s.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <p className="text-[10px] text-gray-400">Business</p>
                  <p className="font-heading text-sm font-bold text-navy-900">{s.monthlyBusiness}</p>
                </div>
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <p className="text-[10px] text-gray-400">Income</p>
                  <p className="font-heading text-sm font-bold text-brand-700">{s.income}</p>
                </div>
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <p className="text-[10px] text-gray-400">Growth</p>
                  <p className="font-heading text-sm font-bold text-brand-600">{s.growth}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-gray-400">{SUCCESS.note}</p>
      </div>
    </section>
  )
}

export function PartnerFaqSection() {
  return (
    <section id="faq" className="bg-silver-50 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before becoming a Kuber Partner."
        />
        <div className="mx-auto mt-8">
          <PartnersFaqAccordion items={LANDING_FAQ} columns={2} />
        </div>
      </div>
    </section>
  )
}

/** Second apply block near the end — catch converters who scrolled */
export function BottomApplySection() {
  return (
    <section id="apply-bottom" className="bg-white py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">Ready when you are</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              Still exploring? Register anyway — we&apos;ll guide you.
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Share your details. Our team responds within 48 hours with next steps, training access,
              and KuberOne onboarding.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                'No obligation to start full-time',
                'Transparent payouts on KuberOne wallet',
                'Dedicated partner support after approval',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <PartnerApplyForm />
        </div>
      </div>
    </section>
  )
}

export function FinalCtaSection() {
  return (
    <>
      <section className="relative overflow-hidden border-y border-brand-100 bg-gradient-to-b from-brand-50/80 via-white to-slate-50 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(13,107,87,0.1),transparent_55%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl lg:text-5xl">
              {FINAL_CTA.title}
              <span className="mt-2 block bg-gradient-to-r from-brand-800 via-brand-600 to-brand-500 bg-clip-text text-transparent">
                {FINAL_CTA.highlight}
              </span>
            </h2>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-2 text-left sm:grid-cols-2">
              {WHAT_YOU_GET.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25"
              >
                {FINAL_CTA.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy-800 shadow-sm hover:border-brand-300 hover:bg-brand-50"
              >
                {FINAL_CTA.secondaryCta}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-brand-50/60 py-10 pb-24 md:pb-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-heading text-xl font-bold text-navy-900 md:text-2xl">{FOOTER_CTA.title}</h3>
          <p className="mt-2 text-sm font-semibold text-brand-800">{FOOTER_CTA.subtitle}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <a href={telHref} className="inline-flex items-center gap-2 font-semibold text-brand-800 hover:underline">
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <span className="hidden text-gray-300 sm:inline">|</span>
            <a
              href={SITE.appBaseUrl}
              className="font-semibold text-brand-800 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {FOOTER_CTA.website}
            </a>
          </div>
          <a
            href="#apply"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white"
          >
            Become A Kuber Partner
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  )
}
