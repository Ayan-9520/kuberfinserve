import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react'
import { HERO_TRUST_BADGES } from '@/data/homePremium'
import { SITE } from '@/data/site'
import { HeroLoanVisual } from '@/components/home/premium/HeroLoanVisual'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-fintech-hero pb-16 pt-10 md:pb-24 md:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
            Powered by {SITE.platformName}
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            India&apos;s AI Powered
            <span className="mt-2 block text-gradient-fintech">Financial Distribution Platform</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            Helping customers find the right financial solutions while empowering professionals to
            build successful financial businesses remotely.
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {HERO_TRUST_BADGES.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-500" />
                {badge}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={SITE.applyLoanUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-brand-600/30 transition-transform hover:scale-[1.02]"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={SITE.partnersUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Become Partner
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-500/30 bg-brand-600/10 px-6 py-3.5 text-sm font-semibold text-brand-300 transition-colors hover:bg-brand-600/20"
            >
              <Calendar className="h-4 w-4" />
              Book Consultation
            </Link>
          </div>
        </motion.div>

        <HeroLoanVisual />
      </div>
    </section>
  )
}
