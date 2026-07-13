import { motion } from 'framer-motion'
import { CareerPathIllustration } from '@/components/illustrations/CareerPathIllustration'
import { PartnersSectionHeading } from '@/components/partners/PartnersSectionHeading'

export function DesignCareerSection() {
  return (
    <section id="design-career" className="pf-section pf-section-dark">
      <div className="container mx-auto px-4">
        <PartnersSectionHeading
          eyebrow="Design Your Career"
          title="Design Your Career. Build Your Future."
          subtitle="Choose your own journey — whether you're a financial professional, fresh graduate, or strategic partner."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <CareerPathIllustration />
        </motion.div>

        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-[var(--pf-text-muted)]">
          One Platform. Unlimited Career Paths. Your journey is unique — KuberOne adapts to your
          ambitions.
        </p>
      </div>
    </section>
  )
}
