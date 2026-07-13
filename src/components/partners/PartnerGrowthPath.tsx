import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { PARTNER_LEVELS } from '@/data/partnerHierarchy'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

export function PartnerGrowthPath() {
  return (
    <section id="growth-path" className="pf-section pf-section-dark">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--pf-primary)]">
            Partner Hierarchy
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--pf-text)] md:text-3xl">
            Grow as a Business Owner
          </h2>
          <p className="mt-2 text-sm text-[var(--pf-text-secondary)]">
            Partners don&apos;t just earn — they build businesses, earn recognition, develop leadership
            &amp; create long-term wealth.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          {PARTNER_LEVELS.map((item, i) => (
            <motion.div key={item.level} {...fadeUp} transition={{ delay: i * 0.03 }}>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      i >= PARTNER_LEVELS.length - 2
                        ? 'bg-gradient-to-br from-[var(--pf-primary)] to-[var(--pf-accent)] text-[#071A1F]'
                        : 'bg-[var(--pf-primary)]/15 text-[var(--pf-primary)]'
                    }`}
                  >
                    {i >= PARTNER_LEVELS.length - 2 ? <Star className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  {i < PARTNER_LEVELS.length - 1 && (
                    <div className="my-1 h-6 w-px bg-[var(--pf-border)]" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="font-heading text-sm font-bold text-[var(--pf-text)]">{item.level}</h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.unlocks.map((u) => (
                      <span
                        key={u}
                        className="rounded-full border border-[var(--pf-border)] px-2 py-0.5 text-[9px] text-[var(--pf-text-muted)]"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-4 text-center">
          <ChevronDown className="mx-auto h-5 w-5 animate-bounce text-[var(--pf-primary)]" />
          <p className="mt-2 text-xs text-[var(--pf-text-muted)]">
            Each level unlocks higher recognition, additional opportunities &amp; leadership
            responsibilities
          </p>
        </motion.div>
      </div>
    </section>
  )
}
