import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Play,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { LeadCta } from '@/components/home/premium/LeadCta'
import { PartnersMarquee } from '@/components/home/premium/PartnersMarquee'
import { CASE_STUDIES, GOOGLE_REVIEWS, TRUST_METRICS } from '@/data/successStoriesPage'

export function SuccessStoriesPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const story = CASE_STUDIES[activeIndex]

  return (
    <>
      <SeoHead
        title="Success Stories | Loan Approvals & Customer Journeys | KuberFinserve"
        description="Real KuberFinserve success stories — home loans, business loans, loan against property & personal loans approved in 24 hours to 5 days. Read timelines, results & reviews."
        path="/success-stories"
        keywords="loan success stories India, home loan approved fast, business loan case study, KuberFinserve reviews"
      />

      <section className="relative overflow-hidden bg-fintech-hero pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
              <Sparkles className="h-3.5 w-3.5" />
              Case Studies
            </span>
            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
              Real Stories. Real Results.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Families and businesses across India secured funding faster with expert guidance,
              transparent process &amp; trusted lender partnerships.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/apply-loan"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-brand-600/30 transition-transform hover:scale-[1.02]"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#featured-story"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
              >
                Read Case Studies
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-brand-900/10 bg-fintech-cta py-10 text-white md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {TRUST_METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-heading text-2xl font-bold text-brand-400 md:text-3xl">{m.value}</p>
                <p className="mt-1 text-sm text-slate-300">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Highlights
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              Approved Loans Across India
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CASE_STUDIES.map((s, i) => (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className={`overflow-hidden rounded-2xl border text-left transition-all ${
                  activeIndex === i
                    ? 'border-brand-500 ring-2 ring-brand-500/30 shadow-lg'
                    : 'border-slate-200/80 bg-white shadow-sm hover:border-brand-200'
                }`}
              >
                <div className="bg-gradient-to-br from-brand-900 to-navy-900 p-5 text-white">
                  <p className="font-heading text-2xl font-bold text-brand-400">{s.amount}</p>
                  <p className="mt-1 text-sm font-semibold">{s.product}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-200">
                    <Clock className="h-3.5 w-3.5" />
                    {s.approvalTime}
                  </p>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <img
                    src={s.image}
                    alt={s.customer}
                    className="h-11 w-11 rounded-full border-2 border-brand-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-navy-900">{s.customer}</p>
                    <p className="text-xs text-gray-500">{s.city}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-story" className="scroll-mt-28 bg-silver-50 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Featured Case Study
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              {story.amount} {story.product} Approved
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mt-12 grid gap-10 lg:grid-cols-2"
            >
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg md:p-8">
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-6">
                  <img
                    src={story.image}
                    alt={story.customer}
                    className="h-24 w-24 rounded-full ring-4 ring-brand-100"
                  />
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-navy-900">{story.customer}</h3>
                    <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm text-gray-600 sm:justify-start">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-brand-600" />
                        {story.city}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4 text-brand-600" />
                        {story.approvalTime}
                      </span>
                    </div>
                    <p className="mt-4 font-heading text-3xl font-bold text-brand-700">{story.amount}</p>
                    <p className="text-sm font-medium text-gray-500">{story.product}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <JourneyCard
                    icon={AlertCircle}
                    label="Before"
                    text={story.before}
                    variant="before"
                  />
                  <JourneyCard
                    icon={TrendingUp}
                    label="After"
                    text={story.after}
                    variant="after"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <StoryBlock icon={AlertCircle} title="Problem" text={story.problem} tone="amber" />
                  <StoryBlock icon={Lightbulb} title="Solution" text={story.solution} tone="brand" />
                  <StoryBlock icon={CheckCircle2} title="Result" text={story.result} tone="green" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg">
                  <h4 className="font-heading font-bold text-navy-900">Story Timeline</h4>
                  <ol className="relative mt-6 space-y-0 border-l-2 border-brand-200 pl-6">
                    {story.timeline.map((t) => (
                      <li key={t.step} className="relative pb-8 last:pb-0">
                        <span className="absolute -left-[1.6rem] top-1 flex h-3 w-3 rounded-full bg-brand-600 ring-4 ring-white" />
                        <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
                          {t.step}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-700">{t.event}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-brand-400">
                    <Play className="h-7 w-7 fill-current" />
                  </div>
                  <h4 className="mt-4 font-heading font-bold text-navy-900">Video Testimonials</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Hear directly from customers about their approval journey.
                  </p>
                  <Link
                    to="/contact-us"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
                  >
                    Request video links
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Reviews
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              Google Reviews
            </h2>
            <p className="mt-3 text-sm text-gray-600">What our customers say after disbursement</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {GOOGLE_REVIEWS.map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-sm font-bold text-navy-900">{r.name}</p>
                  <p className="text-xs text-gray-500">
                    {r.city} · {r.date}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <PartnersMarquee />
      <LeadCta />
    </>
  )
}

function JourneyCard({
  icon: Icon,
  label,
  text,
  variant,
}: {
  icon: typeof AlertCircle
  label: string
  text: string
  variant: 'before' | 'after'
}) {
  const styles =
    variant === 'before'
      ? 'border-amber-200 bg-amber-50/60 text-amber-900'
      : 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
  return (
    <div className={`rounded-xl border p-4 ${styles}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 opacity-80" />
        <p className="text-xs font-bold uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed opacity-90">{text}</p>
    </div>
  )
}

function StoryBlock({
  icon: Icon,
  title,
  text,
  tone,
}: {
  icon: typeof AlertCircle
  title: string
  text: string
  tone: 'amber' | 'brand' | 'green'
}) {
  const border = {
    amber: 'border-amber-100 bg-amber-50/40',
    brand: 'border-brand-100 bg-brand-50/40',
    green: 'border-emerald-100 bg-emerald-50/40',
  }[tone]
  const iconColor = {
    amber: 'text-amber-600',
    brand: 'text-brand-700',
    green: 'text-emerald-600',
  }[tone]

  return (
    <div className={`rounded-xl border p-4 ${border}`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{text}</p>
    </div>
  )
}
