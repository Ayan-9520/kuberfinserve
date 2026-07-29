import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HERO_TRUST_BADGES } from '@/data/homePremium'
import { SITE } from '@/data/site'
import { HeroLoanVisual } from '@/components/home/premium/HeroLoanVisual'
import { PlatformLogo } from '@/components/PlatformLogo'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-brand-50/25 pb-10 pt-7 md:pb-14 md:pt-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(13,107,87,0.09),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_90%,rgba(0,195,137,0.06),transparent_50%)]" />

      <div className="container relative mx-auto grid items-center gap-8 px-4 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <img
              src={SITE.logoUrl}
              alt={SITE.name}
              className="h-9 w-auto object-contain md:h-10"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 py-1 pl-1 pr-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-800 shadow-sm">
              <span className="inline-flex rounded-md bg-white p-0.5 ring-1 ring-slate-100">
                <PlatformLogo size="sm" nameBelow={false} />
              </span>
              Powered by {SITE.platformName}
            </span>
          </div>

          <h1 className="mt-5 max-w-xl font-heading text-[1.85rem] font-bold leading-[1.18] tracking-tight text-navy-900 sm:text-3xl md:text-[2.15rem] lg:text-[2.35rem]">
            Build your financial business with{' '}
            <span className="bg-gradient-to-r from-brand-800 via-brand-600 to-brand-500 bg-clip-text text-transparent">
              India&apos;s AI distribution network
            </span>
          </h1>

          <p className="mt-3.5 max-w-lg text-sm leading-relaxed text-slate-600 md:text-[0.95rem]">
            For independent professionals, partners, and financial entrepreneurs — trusted
            products, AI matching, training, and a pan-India ecosystem.
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {HERO_TRUST_BADGES.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                {badge}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              to={SITE.becomePartnerUrl}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition-transform hover:scale-[1.02]"
            >
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={`${SITE.becomePartnerUrl}#crm-features`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              Explore KuberOne
            </Link>
          </div>
        </motion.div>

        <HeroLoanVisual />
      </div>
    </section>
  )
}
