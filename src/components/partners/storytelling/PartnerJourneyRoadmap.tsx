import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PARTNER_JOURNEY_STAGES } from '@/data/partnerStorytelling'
import { JourneyStageIllustration } from '@/components/illustrations/JourneyStageIllustration'
import { PartnersSectionHeading } from '@/components/partners/PartnersSectionHeading'

export function PartnerJourneyRoadmap() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = dir === 'left' ? -320 : 320
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id="growth-path" className="pf-section pf-section-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <PartnersSectionHeading
          eyebrow="Partner Journey"
          title="Your Path From Registration to Legacy"
          subtitle="Every stage unlocks new recognition, opportunities, and leadership responsibilities."
        />

        <div className="relative mt-8">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--pf-border)] bg-[var(--pf-bg-card)] p-2 text-[var(--pf-primary)] shadow-lg md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--pf-border)] bg-[var(--pf-bg-card)] p-2 text-[var(--pf-primary)] shadow-lg md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[var(--pf-border)]"
            style={{ scrollbarWidth: 'thin' }}
          >
            {PARTNER_JOURNEY_STAGES.map((stage, i) => (
              <motion.article
                key={stage.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="w-[260px] shrink-0 snap-center"
              >
                <div className="pf-bento-card flex h-full flex-col overflow-hidden rounded-2xl">
                  <JourneyStageIllustration stageIndex={i} className="rounded-none" />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pf-primary)] text-[10px] font-bold text-[var(--pf-cta-text)]">
                        {i + 1}
                      </span>
                      <h3 className="font-heading text-sm font-bold text-[var(--pf-text)]">{stage.level}</h3>
                    </div>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--pf-text-muted)]">
                      {stage.description}
                    </p>
                    {i < PARTNER_JOURNEY_STAGES.length - 1 && (
                      <div className="mt-3 flex justify-center text-[var(--pf-primary)] opacity-50">
                        ↓
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Progress track */}
          <div className="mx-auto mt-6 h-1 max-w-3xl overflow-hidden rounded-full bg-[var(--pf-border)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--pf-primary)] to-[var(--pf-accent)]"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
