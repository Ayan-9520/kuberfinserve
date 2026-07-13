import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Home,
  Briefcase,
  Building2,
  User,
  CreditCard,
  Shield,
  TrendingUp,
  RefreshCw,
  Plus,
  Calculator,
  Gauge,
  BookOpen,
} from 'lucide-react'
import { PREMIUM_SERVICES } from '@/data/homePremium'

const icons = {
  home: Home,
  briefcase: Briefcase,
  building: Building2,
  user: User,
  card: CreditCard,
  shield: Shield,
  trending: TrendingUp,
  refresh: RefreshCw,
  plus: Plus,
  calculator: Calculator,
  gauge: Gauge,
  book: BookOpen,
} as const

export function ServicesGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Our Products</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            Complete Financial Solutions
          </h2>
          <p className="mt-3 text-gray-600">
            Loans, insurance, credit cards &amp; financial tools — expert-guided, AI-powered &amp;
            transparent.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PREMIUM_SERVICES.map((service, i) => {
            const Icon = icons[service.icon]
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br ${service.gradient} p-5 shadow-[0_8px_30px_rgb(15_23_42/0.06)] transition-shadow hover:shadow-xl`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900 text-brand-400 shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-2">
                  {service.description}
                </p>
                <Link
                  to={service.path}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-all group-hover:gap-3"
                >
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
