import { motion } from 'framer-motion'
import { SITE } from '@/data/site'
import { KuberOneEcosystemIllustration } from '@/components/illustrations/KuberOneEcosystemIllustration'

export function TechnologyStorySection() {
  return (
    <section id="technology" className="pf-section pf-section-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--pf-primary)]">
              Technology
            </p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold text-[var(--pf-text)] md:text-4xl">
              Powered by {SITE.platformName}
            </h2>
            <p className="mt-2 font-heading text-lg text-[var(--pf-primary)] md:text-xl">
              {SITE.platformTagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--pf-text-secondary)] md:text-base">
              The AI operating system connecting customers, partners, employees, banks, NBFCs, and
              insurance companies — all through one futuristic digital ecosystem.
            </p>
            <blockquote className="mt-6 border-l-4 border-[var(--pf-primary)] pl-4 font-heading text-base font-bold italic text-[var(--pf-primary)] md:text-lg">
              Build Your Financial Business From Anywhere.
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--pf-border)] shadow-2xl shadow-black/30">
              <KuberOneEcosystemIllustration />
            </div>
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[var(--pf-primary)]/20 opacity-40 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
