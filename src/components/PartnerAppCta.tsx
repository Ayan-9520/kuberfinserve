import { motion } from 'framer-motion'
import { SITE } from '@/data/site'
import { MobileAppButtons } from '@/components/MobileAppButtons'
import { PartnersSectionHeading } from '@/components/partners/PartnersSectionHeading'
import { PlatformLogo } from '@/components/PlatformLogo'

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
          <div className="pf-form-card rounded-2xl p-6 text-center md:p-8">
            <div className="mx-auto flex w-fit flex-col items-center gap-2">
              <PlatformLogo size="lg" showName nameBelow nameClassName="text-[var(--pf-text)] text-lg" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--pf-primary)]">
                Partner App
              </p>
            </div>
            <p className="mt-5 text-sm text-[var(--pf-text-secondary)]">
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
