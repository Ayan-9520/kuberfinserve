import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { SITE } from '@/data/site'
import { MobileAppButtons } from '@/components/MobileAppButtons'
import { PartnersSectionHeading } from '@/components/partners/PartnersSectionHeading'

export function PartnerAppCta() {
  return (
    <section className="pf-section pf-section-surface border-t border-[var(--pf-border)]">
      <div className="container mx-auto px-4">
        <PartnersSectionHeading
          eyebrow="Mobile App"
          title={`Download ${SITE.platformName} Partner App`}
          subtitle="Manage leads, track applications, and grow your business from anywhere."
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-7 max-w-md"
        >
          <div className="pf-form-card rounded-2xl p-6 text-center md:p-7">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--pf-primary)]/15 text-[var(--pf-primary)]">
              <Smartphone className="h-6 w-6" />
            </div>
            <p className="mt-4 font-heading text-base font-bold text-[var(--pf-text)]">
              Partner App
            </p>
            <p className="mt-2 text-sm text-[var(--pf-text-secondary)]">
              Open the app if installed, or download from Play Store / App Store.
            </p>
            <div className="mt-5">
              <MobileAppButtons target="partner" variant="partners" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
