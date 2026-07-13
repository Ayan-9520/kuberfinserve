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
} from 'lucide-react'
import { KUBERONE_FEATURES, AI_MODULES } from '@/data/kuberOne'
import { SITE } from '@/data/site'
import { KuberOneEcosystemIllustration } from '@/components/illustrations/KuberOneEcosystemIllustration'

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
} as const

export function KuberOneSection() {
  return (
    <section className="relative overflow-hidden bg-fintech-hero py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by {SITE.platformName}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {SITE.platformTagline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            The technology backbone that empowers financial professionals to build, manage &amp; scale
            their own financial distribution business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-brand-600/10"
        >
          <KuberOneEcosystemIllustration />
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {KUBERONE_FEATURES.map((feature, i) => {
            const Icon = featureIcons[feature.icon]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-brand-500/30 hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400 transition-colors group-hover:bg-brand-600/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-sm font-bold text-white">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">AI Modules</p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-white md:text-3xl">
              Intelligence Built Into Every Workflow
            </h3>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {AI_MODULES.map((mod, i) => (
              <motion.span
                key={mod.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                title={mod.description}
                className="cursor-default rounded-full border border-brand-500/20 bg-brand-600/10 px-4 py-2 text-xs font-medium text-brand-300 transition-colors hover:border-brand-500/40 hover:bg-brand-600/20"
              >
                {mod.title}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to={SITE.partnersUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-brand-600/30 transition-transform hover:scale-[1.02]"
          >
            Become a Partner
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
