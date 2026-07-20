import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Users,
  Briefcase,
  User,
  Target,
  Sparkles,
  MessageCircle,
  FolderOpen,
  Wallet,
  GraduationCap,
  Megaphone,
  BarChart3,
  Award,
  Smartphone,
  LineChart,
  IdCard,
  ClipboardList,
} from 'lucide-react'
import { KUBERONE_FEATURES, AI_MODULES } from '@/data/kuberOne'
import { SITE } from '@/data/site'
import { KuberOneEcosystemIllustration } from '@/components/illustrations/KuberOneEcosystemIllustration'
import { PlatformLogo } from '@/components/PlatformLogo'

const featureIcons = {
  users: Users,
  briefcase: Briefcase,
  user: User,
  target: Target,
  sparkles: Sparkles,
  message: MessageCircle,
  folder: FolderOpen,
  wallet: Wallet,
  graduation: GraduationCap,
  megaphone: Megaphone,
  chart: BarChart3,
  'bar-chart': LineChart,
  award: Award,
  smartphone: Smartphone,
  id: IdCard,
  clipboard: ClipboardList,
} as const

export function KuberOneSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-brand-50/40 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(13,107,87,0.08),transparent_55%)]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <span className="inline-flex rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
              <PlatformLogo
                size="lg"
                showName
                nameBelow
                nameClassName="text-navy-900 text-base md:text-lg"
              />
            </span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-800 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by {SITE.platformName}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-navy-900 md:text-4xl lg:text-5xl">
            {SITE.platformTagline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            The technology backbone that empowers financial professionals to build, manage &amp; scale
            their own financial distribution business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.15)]"
        >
          <KuberOneEcosystemIllustration />
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {KUBERONE_FEATURES.map((feature, i) => {
            const Icon = featureIcons[feature.icon]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 8) * 0.03 }}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                  {Icon ? <Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </div>
                <h3 className="mt-3 font-heading text-sm font-bold text-navy-900 sm:mt-4">
                  {feature.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-16px_rgba(15,23,42,0.12)] md:mt-16 md:p-10"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-brand-500/10 blur-3xl" />

          <div className="relative text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-700">AI Modules</p>
            <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
              Intelligence Built Into Every Workflow
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
              Embedded AI across eligibility, CRM, documents &amp; growth — so partners work smarter.
            </p>
          </div>

          <div className="relative mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {AI_MODULES.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.04 }}
                title={mod.description}
                className="group flex min-h-[5.5rem] flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3.5 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-md"
              >
                <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-[10px] font-extrabold tracking-wide text-white shadow-sm">
                  AI
                </span>
                <p className="text-[11px] font-semibold leading-snug text-navy-900 sm:text-xs">
                  {mod.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            to={SITE.partnersUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-transform hover:scale-[1.02]"
          >
            Become a Partner
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
