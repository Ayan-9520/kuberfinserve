import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: readonly FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => (
        <div
          key={item.q}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-brand-900 hover:bg-gray-50"
          >
            {item.q}
            <ChevronDown
              className={cn('h-5 w-5 shrink-0 text-brand-600 transition-transform', open === i && 'rotate-180')}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="border-t border-gray-50 px-6 pb-4 pt-2 text-gray-600 leading-relaxed">
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
