import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { PARTNERS_FAQ } from '@/data/partners'
import { cn } from '@/utils/cn'

type FaqItem = { q: string; a: string }

interface PartnersFaqAccordionProps {
  items?: readonly FaqItem[]
  /** Two-column grid on md+ (default true for partner landing) */
  columns?: 1 | 2
}

export function PartnersFaqAccordion({
  items = PARTNERS_FAQ,
  columns = 1,
}: PartnersFaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div
      className={cn(
        columns === 2
          ? 'mx-auto grid max-w-5xl gap-3 md:grid-cols-2'
          : 'mx-auto flex max-w-2xl flex-col gap-2',
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.q}
          className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-navy-900 transition-colors hover:text-brand-800"
          >
            <span className="leading-snug">{item.q}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 text-brand-600 transition-transform',
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
                <p className="border-t border-brand-50 px-4 pb-3.5 pt-2 text-xs leading-relaxed text-gray-600 md:text-sm">
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
