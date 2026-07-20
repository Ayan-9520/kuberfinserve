import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HERO_TRUST_BADGES } from '@/data/homePremium'
import { SITE } from '@/data/site'
import { HeroLoanVisual } from '@/components/home/premium/HeroLoanVisual'
import { PlatformLogo } from '@/components/PlatformLogo'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-brand-50/30 pb-16 pt-10 md:pb-24 md:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(13,107,87,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_90%,rgba(0,195,137,0.08),transparent_50%)]" />

      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white py-1.5 pl-1.5 pr-4 text-xs font-semibold uppercase tracking-wider text-brand-800 shadow-sm">
            <span className="inline-flex rounded-lg bg-white p-0.5 ring-1 ring-slate-100">
              <PlatformLogo size="sm" nameBelow={false} />
            </span>
            Powered by {SITE.platformName}
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-navy-900 md:text-5xl lg:text-[3.25rem]">
            India&apos;s AI Powered
            <span className="mt-2 block bg-gradient-to-r from-brand-800 via-brand-600 to-brand-500 bg-clip-text text-transparent">
              Financial Distribution Platform
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Helping customers find the right financial solutions while empowering professionals to
            build successful financial businesses remotely.
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {HERO_TRUST_BADGES.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                {badge}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={SITE.applyLoanUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-transform hover:scale-[1.02]"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={SITE.partnersUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy-800 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              Become Partner
            </Link>
          </div>
        </motion.div>

        <HeroLoanVisual />
      </div>
    </section>
  )
}
