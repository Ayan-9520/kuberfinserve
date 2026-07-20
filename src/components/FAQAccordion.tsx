import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: readonly FAQItem[]
  variant?: 'default' | 'premium'
  columns?: 1 | 2
}

export function FAQAccordion({ items, variant = 'default', columns = 1 }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)
  const isPremium = variant === 'premium'

  return (
    <div
      className={cn(
        columns === 2
          ? 'mx-auto grid max-w-5xl gap-3 md:grid-cols-2 md:gap-4'
          : isPremium
            ? 'mx-auto flex max-w-3xl flex-col gap-3'
            : 'mx-auto max-w-3xl space-y-3',
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.q}
            className={cn(
              'overflow-hidden transition-shadow duration-300',
              isPremium
                ? cn(
                    'rounded-2xl border bg-white/90 shadow-[0_8px_30px_rgb(15_41_32/0.06)] backdrop-blur-sm',
                    isOpen
                      ? 'border-brand-200 shadow-[0_16px_40px_rgb(11_93_75/0.12)] ring-1 ring-brand-100'
                      : 'border-slate-200/80 hover:border-brand-200 hover:shadow-md',
                  )
                : 'rounded-2xl border border-gray-100 bg-white shadow-sm',
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className={cn(
                'flex w-full items-center justify-between gap-3 text-left transition-colors',
                isPremium
                  ? 'px-5 py-4 md:px-6 md:py-5'
                  : 'gap-4 px-6 py-4 font-semibold text-brand-900 hover:bg-gray-50',
              )}
            >
              <span className="flex min-w-0 items-start gap-3">
                {isPremium && (
                  <span
                    className={cn(
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                      isOpen ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700',
                    )}
                  >
                    {isOpen ? <Sparkles className="h-3.5 w-3.5" /> : <HelpCircle className="h-3.5 w-3.5" />}
                  </span>
                )}
                <span
                  className={cn(
                    'font-heading text-sm font-semibold leading-snug md:text-[15px]',
                    isPremium ? (isOpen ? 'text-brand-900' : 'text-navy-900') : 'text-brand-900',
                  )}
                >
                  {item.q}
                </span>
              </span>
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
                  isPremium
                    ? isOpen
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-brand-700'
                    : '',
                )}
              >
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    !isPremium && 'h-5 w-5 text-brand-600',
                    isOpen && 'rotate-180',
                  )}
                />
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p
                    className={cn(
                      'leading-relaxed',
                      isPremium
                        ? 'border-t border-brand-50 bg-gradient-to-b from-brand-50/50 to-white px-5 pb-5 pt-3 text-sm text-slate-600 md:px-6 md:pl-[3.75rem]'
                        : 'border-t border-gray-50 px-6 pb-4 pt-2 text-gray-600',
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
