import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Clock,
  GraduationCap,
  Lock,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { LEARNING_LEVELS, CERTIFICATE_TIERS } from '@/data/academy/levels'
import { ACADEMY_SEO } from '@/data/academy/navigation'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const BENEFITS = [
  { icon: Award, title: 'Industry-recognized certificates', description: 'Bronze to Diamond tiers with QR-verified credentials your clients and lenders trust.' },
  { icon: Brain, title: 'AI-powered learning', description: 'Smart quizzes, AI pitch assistant and personalized learning paths adapt to your pace.' },
  { icon: Briefcase, title: 'Earn while you learn', description: 'Start earning commissions from Level 1 itself. No waiting to complete all courses.' },
  { icon: Zap, title: 'CRM & marketing tools', description: 'KuberOne CRM, WhatsApp templates, Meta ad guides and brand-safe creatives included.' },
  { icon: Users, title: 'Community of 500+ partners', description: 'Join a growing network of CAs, advisors, builders and professionals across India.' },
  { icon: Rocket, title: 'Career growth path', description: 'Go from solo closer to desk leader managing a team with structured leadership training.' },
]

const TIER_STYLES: Record<string, { bg: string; border: string; badge: string; glow: string }> = {
  Bronze:   { bg: 'from-amber-950/30 to-amber-900/10', border: 'border-amber-700/40', badge: 'bg-amber-700 text-amber-50', glow: 'shadow-amber-900/20' },
  Silver:   { bg: 'from-slate-800/30 to-slate-700/10', border: 'border-slate-500/40', badge: 'bg-slate-500 text-slate-50', glow: 'shadow-slate-700/20' },
  Gold:     { bg: 'from-yellow-900/30 to-yellow-800/10', border: 'border-yellow-600/40', badge: 'bg-yellow-600 text-yellow-50', glow: 'shadow-yellow-800/20' },
  Platinum: { bg: 'from-teal-900/30 to-teal-800/10', border: 'border-teal-500/40', badge: 'bg-teal-600 text-teal-50', glow: 'shadow-teal-700/20' },
  Diamond:  { bg: 'from-blue-950/30 to-blue-900/10', border: 'border-blue-500/40', badge: 'bg-blue-700 text-blue-50', glow: 'shadow-blue-800/20' },
}

export function PartnerAcademyRedirect() {
  return (
    <>
      <SeoHead
        title={ACADEMY_SEO.title}
        description={ACADEMY_SEO.description}
        path="/partner-academy"
        keywords={ACADEMY_SEO.keywords}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(13,148,136,0.25),transparent)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.div {...fadeUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300">
              <GraduationCap className="h-4 w-4" /> 10 Levels · 5 Certifications · 140+ Videos
            </span>
          </motion.div>
          <motion.h1 {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            KuberOne Partner Academy
          </motion.h1>
          <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mx-auto mt-5 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Master financial distribution. Get certified. Grow your business.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/become-partner" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:shadow-teal-500/40 hover:brightness-110">
              Become a Partner <Rocket className="h-4 w-4" />
            </Link>
            <Link to="/partner-login?intent=academy" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Already a Partner? Login <Sparkles className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Course Preview ── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">10-Level Learning Roadmap</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">From foundation to mastery — a structured path covering every skill a financial partner needs.</p>
          </motion.div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_LEVELS.map((level, i) => {
              const isPreview = i < 2
              return (
                <motion.div
                  key={level.id}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`group relative rounded-2xl border p-5 transition ${
                    isPreview
                      ? 'border-teal-200 bg-white shadow-md hover:shadow-lg'
                      : 'border-slate-200 bg-white/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                      isPreview ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {level.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {isPreview && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Preview Available</span>
                      )}
                      {!isPreview && <Lock className="h-4 w-4 text-slate-400" />}
                    </div>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{level.focus}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{level.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {level.videoCount} lessons</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {level.durationHours}h</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {level.certificate}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Certification Tiers ── */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Certification Tiers</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">Earn industry-recognized credentials as you progress through the academy.</p>
          </motion.div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CERTIFICATE_TIERS.map((ct, i) => {
              const style = TIER_STYLES[ct.tier]
              return (
                <motion.div
                  key={ct.tier}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`rounded-2xl border bg-gradient-to-b p-5 shadow-lg ${style.bg} ${style.border} ${style.glow}`}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" style={{ color: ct.color }} />
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${style.badge}`}>{ct.tier}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{ct.requirement}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why Join ── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why Join the Academy?</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">Everything you need to build a successful financial distribution business.</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 transition hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 py-20 sm:py-24">
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,0.15),transparent)]" />
          <motion.div {...fadeUp} className="relative">
            <Shield className="mx-auto h-10 w-10 text-teal-400" />
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">Ready to start your journey?</h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-slate-300">
              Join 500+ financial professionals building successful businesses with KuberFinserve.
            </p>
            <Link to="/become-partner" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:shadow-teal-500/40 hover:brightness-110">
              Become a Partner <Rocket className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
