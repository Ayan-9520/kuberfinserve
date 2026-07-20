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
  Car,
  BookOpen,
} from 'lucide-react'
import { PREMIUM_QUICK_LINKS, PREMIUM_SERVICES } from '@/data/homePremium'
import { cn } from '@/utils/cn'

const icons = {
  home: Home,
  briefcase: Briefcase,
  building: Building2,
  user: User,
  card: CreditCard,
  shield: Shield,
  trending: TrendingUp,
  car: Car,
  book: BookOpen,
} as const

export function ServicesGrid() {
  return (
    <section id="loans" className="scroll-mt-28 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
            Our Products
          </p>
          <h2 className="mt-1.5 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
            Complete Financial Solutions
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Loans, insurance & cards — pick a product and jump to what you need.
          </p>
        </div>

        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2">
          {PREMIUM_QUICK_LINKS.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {PREMIUM_SERVICES.map((service, i) => {
            const Icon = icons[service.icon]
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.03 }}
                className="group flex flex-col rounded-xl border border-slate-200/80 bg-white p-3 shadow-[0_4px_20px_rgb(15_23_42/0.04)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md sm:p-3.5"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border',
                      service.accent,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={service.path}
                      className="font-heading text-[13px] font-bold leading-snug text-navy-900 hover:text-brand-800 sm:text-sm"
                    >
                      {service.title}
                    </Link>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-gray-500 sm:text-[11px]">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 mt-auto flex flex-nowrap items-center gap-1 border-t border-slate-100 pt-2">
                  {service.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      className={cn(
                        'inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition',
                        link.label === 'Apply'
                          ? 'bg-brand-600 text-white hover:bg-brand-700'
                          : 'bg-slate-50 text-brand-800 hover:bg-brand-50',
                      )}
                    >
                      {link.label}
                      {link.label === 'Apply' && <ArrowRight className="h-2.5 w-2.5" />}
                    </Link>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
