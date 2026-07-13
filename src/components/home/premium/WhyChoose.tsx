import { motion } from 'framer-motion'
import {
  Sparkles,
  Building2,
  Shield,
  Zap,
  UserCheck,
  FileText,
  Eye,
  Globe,
  Headphones,
} from 'lucide-react'
import { PREMIUM_BENEFITS } from '@/data/homePremium'

const icons = {
  sparkles: Sparkles,
  building: Building2,
  shield: Shield,
  zap: Zap,
  'user-check': UserCheck,
  file: FileText,
  eye: Eye,
  globe: Globe,
  headphones: Headphones,
} as const

export function WhyChoose() {
  return (
    <section className="bg-silver-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Why Kuber Finserve</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            India&apos;s Trusted Financial Distribution Platform
          </h2>
          <p className="mt-3 text-gray-600">
            AI-powered matching, 50+ lending partners &amp; dedicated support — built for trust, speed
            &amp; transparency.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PREMIUM_BENEFITS.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_rgb(15_23_42/0.06)] transition-shadow hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-brand-400 shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-md rounded-2xl border border-brand-200/60 bg-white p-6 text-center shadow-lg"
        >
          <p className="font-heading text-4xl font-bold text-brand-700">4.9★</p>
          <p className="mt-1 text-sm text-gray-600">Rated by thousands of satisfied customers</p>
        </motion.div>
      </div>
    </section>
  )
}
