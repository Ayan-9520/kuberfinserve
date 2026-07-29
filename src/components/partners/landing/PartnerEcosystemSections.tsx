import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  Award,
  Bot,
  Download,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import {
  AcademyPersonas,
  AcademyRoadmapPreview,
  AcademyWhyJoin,
} from '@/components/academy/landing/AcademyLandingSections'
import { AcademyAccessButtons } from '@/components/academy/AcademyAccessButtons'
import {
  BOOK_DEMO,
  CRM_FEATURES_PREVIEW,
  DASHBOARD_NAV_PREVIEW,
  ONBOARDING_FUNNEL,
  PARTNER_PLANS,
  PRODUCTS_YOU_OFFER,
  STARTER_KIT,
} from '@/data/partnerEcosystem'
import { CERTIFICATE_TIERS, LEARNING_LEVELS, AI_SUGGESTIONS, CRM_LESSONS, DOWNLOAD_ITEMS, TOOLKIT_ITEMS } from '@/data/academy'
import { SITE } from '@/data/site'
import { ACADEMY_LOGIN_PATH } from '@/utils/academyAccess'

function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}

function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  tone = 'white',
}: {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
  tone?: 'white' | 'muted'
}) {
  return (
    <section
      id={id}
      className={tone === 'muted' ? 'bg-silver-50 py-14 md:py-20' : 'bg-white py-14 md:py-20'}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
          <h2 className="font-heading mt-2 text-2xl font-extrabold text-navy-900 md:text-3xl">{title}</h2>
          <p className="mt-2 text-slate-600">{subtitle}</p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

export function PartnerOnboardingFunnelSection() {
  return (
    <SectionShell
      id="journey-funnel"
      eyebrow={ONBOARDING_FUNNEL.eyebrow}
      title={ONBOARDING_FUNNEL.title}
      subtitle={ONBOARDING_FUNNEL.subtitle}
      tone="muted"
    >
      <ol className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ONBOARDING_FUNNEL.steps.map((step, i) => (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.28) }}
            className="relative rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-800">
              {i + 1}
            </span>
            <p className="font-heading mt-2 text-sm font-bold text-navy-900">{step.label}</p>
            <p className="mt-0.5 text-xs text-slate-500">{step.hint}</p>
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  )
}

export function PartnerPlansSection() {
  return (
    <SectionShell
      id="partner-plans"
      eyebrow={PARTNER_PLANS.eyebrow}
      title={PARTNER_PLANS.title}
      subtitle={PARTNER_PLANS.subtitle}
    >
      <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-3">
        {PARTNER_PLANS.plans.map((plan) => (
          <div
            key={plan.name}
            className={
              'featured' in plan && plan.featured
                ? 'rounded-3xl border-2 border-brand-500 bg-gradient-to-b from-brand-50/80 to-white p-6 shadow-lg shadow-brand-900/10'
                : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
            }
          >
            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-700">{plan.badge}</p>
            <h3 className="font-heading mt-1 text-xl font-extrabold text-navy-900">{plan.name}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">{plan.headline}</p>
            <ul className="mt-4 space-y-2">
              {plan.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-600">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <a
              href="#apply"
              className={
                'featured' in plan && plan.featured
                  ? 'mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-800 to-brand-600 px-4 py-3 text-sm font-bold text-white'
                  : 'mt-6 inline-flex w-full items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-800'
              }
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export function ProductsYouOfferSection() {
  return (
    <SectionShell
      id="products"
      eyebrow={PRODUCTS_YOU_OFFER.eyebrow}
      title={PRODUCTS_YOU_OFFER.title}
      subtitle={PRODUCTS_YOU_OFFER.subtitle}
      tone="muted"
    >
      <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS_YOU_OFFER.items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <h3 className="font-heading text-sm font-bold text-navy-900">{item.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export function CrmFeaturesPreviewSection() {
  return (
    <SectionShell
      id="crm-features"
      eyebrow={CRM_FEATURES_PREVIEW.eyebrow}
      title={CRM_FEATURES_PREVIEW.title}
      subtitle={CRM_FEATURES_PREVIEW.subtitle}
    >
      <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CRM_LESSONS.slice(0, 8).map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-4"
          >
            <h3 className="font-heading text-sm font-bold text-navy-900">{lesson.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{lesson.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        Full CRM opens after Partner Login in the {SITE.platformName} app.
      </p>
    </SectionShell>
  )
}

/** Academy preview block — login required for courses / certs / progress */
export function PartnerAcademyPreviewBlock() {
  return (
    <div id="academy" className="scroll-mt-24">
      <section className="border-y border-brand-100 bg-gradient-to-b from-brand-50/60 to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-md">
              <GraduationCap className="h-6 w-6" />
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              {SITE.platformName} Partner Academy
            </p>
            <h2 className="font-heading mt-2 text-2xl font-extrabold text-navy-900 md:text-3xl">
              Train inside your Partner journey
            </h2>
            <p className="mt-2 text-slate-600">
              Academy is part of Become Partner — not a separate public portal. Courses, certificates and
              learning progress unlock after Partner Login in the KuberOne DSA app.
            </p>
            <AcademyAccessButtons className="mt-6 justify-center" primaryLabel="Login & Start Learning" />
            <p className="mt-3 text-xs text-slate-500">
              New here?{' '}
              <a href="#apply" className="font-semibold text-brand-700 hover:underline">
                Register first
              </a>
              , then return after approval.
            </p>
          </div>
        </div>
      </section>
      <AcademyWhyJoin />
      <AcademyPersonas />
      <AcademyRoadmapPreview />
    </div>
  )
}

export function CertificationProgramSection() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="Certification program"
      title="Earn verified partner certificates"
      subtitle="Bronze to Diamond tiers — unlock after completing Academy levels and quizzes in the app."
      tone="muted"
    >
      <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATE_TIERS.map((c) => (
          <div
            key={c.tier}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            style={{ borderTopColor: c.color, borderTopWidth: 3 }}
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" style={{ color: c.color }} />
              <h3 className="font-heading text-sm font-bold text-navy-900">{c.tier}</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{c.requirement}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to={ACADEMY_LOGIN_PATH}
          className="inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800"
        >
          Login to view certificates <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-2 text-xs text-slate-500">
          {LEARNING_LEVELS.length} learning levels · progress tracked only after login
        </p>
      </div>
    </SectionShell>
  )
}

export function MarketingToolkitPreviewSection() {
  return (
    <SectionShell
      id="marketing-toolkit"
      eyebrow="Marketing toolkit"
      title="Ready creatives for local markets"
      subtitle="WhatsApp templates, festival posts, decks and more — full downloads after Partner Login."
    >
      <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLKIT_ITEMS.slice(0, 6).map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand-700">{item.category}</p>
            <h3 className="font-heading mt-1 text-sm font-bold text-navy-900">{item.title}</h3>
            <p className="mt-1 text-xs text-slate-600">{item.description}</p>
            <p className="mt-2 text-[11px] font-semibold text-slate-400">{item.format}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to={SITE.partnerLoginUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-5 py-3 text-sm font-bold text-brand-800 ring-1 ring-brand-100"
        >
          Login for full toolkit <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionShell>
  )
}

export function AiAssistantPreviewSection() {
  return (
    <SectionShell
      id="ai-assistant"
      eyebrow="AI Assistant"
      title="Partner AI that drafts, not decides"
      subtitle="Pitch lines, FOIR explainers and follow-ups — available in your KuberOne dashboard after login."
      tone="muted"
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-brand-100 bg-white p-6 shadow-md shadow-brand-900/5 md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-white">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-bold text-navy-900">Ask Partner AI</h3>
            <p className="text-xs text-slate-500">Preview prompts — live chat requires login</p>
          </div>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {AI_SUGGESTIONS.slice(0, 6).map((s) => (
            <li
              key={s}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              {s}
            </li>
          ))}
        </ul>
        <Link
          to={SITE.partnerLoginUrl}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700"
        >
          Login to use AI Assistant <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionShell>
  )
}

export function DashboardPreviewSection() {
  return (
    <SectionShell
      id="partner-dashboard"
      eyebrow={DASHBOARD_NAV_PREVIEW.eyebrow}
      title={DASHBOARD_NAV_PREVIEW.title}
      subtitle={DASHBOARD_NAV_PREVIEW.subtitle}
    >
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {DASHBOARD_NAV_PREVIEW.groups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-brand-700" />
              <h3 className="font-heading text-sm font-bold text-navy-900">{group.title}</h3>
            </div>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-xs font-semibold text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to={SITE.partnerLoginUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-800 to-brand-600 px-5 py-3 text-sm font-bold text-white"
        >
          Partner Login
        </Link>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-800"
        >
          Register Now
        </a>
      </div>
    </SectionShell>
  )
}

export function StarterKitSection() {
  const kit = DOWNLOAD_ITEMS.find((d) => d.id === 'dl1')
  return (
    <SectionShell
      id="starter-kit"
      eyebrow={STARTER_KIT.eyebrow}
      title={STARTER_KIT.title}
      subtitle={STARTER_KIT.subtitle}
      tone="muted"
    >
      <div className="mx-auto max-w-2xl rounded-3xl border border-brand-100 bg-white p-6 shadow-lg shadow-brand-900/5 md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <Download className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-bold text-navy-900">
              {kit?.title ?? 'Kuber Partner Starter Kit'}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{kit?.description}</p>
          </div>
        </div>
        <ul className="mt-5 space-y-2">
          {STARTER_KIT.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-slate-600">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waLink(
              `Hi, I want the ${SITE.name} Partner Starter Kit and onboarding details.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-800 to-brand-600 px-5 py-3 text-sm font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            {STARTER_KIT.primaryCta}
          </a>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-bold text-brand-800"
          >
            {STARTER_KIT.secondaryCta}
          </a>
        </div>
      </div>
    </SectionShell>
  )
}

export function BookDemoSection() {
  return (
    <section id="book-demo" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-600 p-8 text-center text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">{BOOK_DEMO.eyebrow}</p>
          <h2 className="font-heading mt-2 text-2xl font-extrabold md:text-3xl">{BOOK_DEMO.title}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/85">{BOOK_DEMO.subtitle}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(
                `Hi, I want a 15-minute demo of ${SITE.platformName} Partner CRM + Academy.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-900"
            >
              <MessageCircle className="h-4 w-4" />
              {BOOK_DEMO.primaryCta}
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur"
            >
              {BOOK_DEMO.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
