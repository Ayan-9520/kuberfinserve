import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { PARTNERS_FAQ } from '@/data/partners'
import { cn } from '@/utils/cn'

export function PartnersFaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-2xl space-y-2">
      {PARTNERS_FAQ.map((item, i) => (
        <div key={item.q} className="pf-bento-card overflow-hidden rounded-xl">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-[var(--pf-text)] transition-colors hover:text-[var(--pf-primary)]"
          >
            {item.q}
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 text-[var(--pf-primary)] transition-transform',
                open === i && 'rotate-180',
              )}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <p className="border-t border-[var(--pf-border)] px-4 pb-3.5 pt-2 text-xs leading-relaxed text-[var(--pf-text-secondary)] md:text-sm">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
