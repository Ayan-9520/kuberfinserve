import { motion } from 'framer-motion'
import { GrowthTreeIllustration } from '@/components/illustrations/GrowthTreeIllustration'
import { GROWTH_TREE_STEPS } from '@/data/partnerStorytelling'
import { PartnersSectionHeading } from '@/components/partners/PartnersSectionHeading'

export function GrowthPotentialSection() {
  return (
    <section id="growth-potential" className="pf-section pf-section-white">
      <div className="container mx-auto px-4">
        <PartnersSectionHeading
          variant="light"
          eyebrow="Your Growth Potential"
          title="Your Growth Depends on You"
          subtitle="Your growth depends on your effort, skills, business development and customer relationships — not fixed guarantees."
        />

        <div className="mx-auto mt-8 grid max-w-5xl items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-[#e2e8f0] shadow-xl"
          >
            <GrowthTreeIllustration />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {GROWTH_TREE_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0d9488] text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  {i < GROWTH_TREE_STEPS.length - 1 && (
                    <div className="my-1 h-5 w-px bg-[#e2e8f0]" />
                  )}
                </div>
                <div className="pb-1">
                  <p className="font-heading text-base font-bold text-[#0f172a]">{step.label}</p>
                  <p className="text-sm text-[#64748b]">{step.description}</p>
                </div>
              </div>
            ))}
            <p className="mt-4 rounded-xl border border-[#0d9488]/20 bg-[#f0fdf9] p-5 text-sm leading-relaxed text-[#64748b]">
              <strong className="text-[#0d9488]">Note:</strong> Earnings are not guaranteed. Greater
              capability, consistent effort, and business development unlock greater earning
              opportunities over time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
