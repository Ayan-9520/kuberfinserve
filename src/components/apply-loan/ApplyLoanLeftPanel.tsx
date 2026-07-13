import { motion } from 'framer-motion'
import { Check, Quote, Star, Sparkles } from 'lucide-react'
import {
  APPLY_BANK_LOGOS,
  APPLY_BENEFITS,
  APPLY_LEFT_METRICS,
  APPLY_REVIEW,
} from '@/data/applyLoanPage'

export function ApplyLoanLeftPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-navy-950 via-brand-900 to-navy-900 p-6 text-white shadow-[0_24px_60px_rgb(11_93_75/0.25)] md:p-8"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-500/15 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-200">
          <Sparkles className="h-3.5 w-3.5" />
          Premium Assistance
        </span>

        <h2 className="mt-4 font-heading text-2xl font-bold leading-tight md:text-[1.65rem]">
          Get Loan Approval Faster
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          Compare offers from 50+ banks and NBFCs with expert assistance.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {APPLY_LEFT_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-2xl border border-white/12 bg-white/10 px-3 py-3 backdrop-blur-md"
            >
              <p className="font-heading text-lg font-bold text-brand-300">{m.value}</p>
              <p className="text-[11px] text-white/65">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
          Partner Banks &amp; NBFCs
        </p>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {APPLY_BANK_LOGOS.map((bank) => (
            <div
              key={bank.name}
              title={bank.name}
              className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white p-1.5 shadow-sm"
            >
              <img
                src={bank.logo}
                alt={bank.name}
                className="max-h-7 w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-2.5">
          {APPLY_BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-sm text-white/90">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/30 text-brand-300">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 rounded-[20px] border border-white/12 bg-white/10 p-4 backdrop-blur-lg"
        >
          <Quote className="h-5 w-5 text-brand-400/80" />
          <p className="mt-2 text-sm font-medium leading-relaxed text-white/95">
            &ldquo;{APPLY_REVIEW.quote}&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3">
            <img
              src={APPLY_REVIEW.image}
              alt={APPLY_REVIEW.name}
              className="h-11 w-11 rounded-full border-2 border-brand-500/40 object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{APPLY_REVIEW.name}</p>
              <p className="text-xs text-white/60">{APPLY_REVIEW.city}</p>
              <div className="mt-0.5 flex gap-0.5">
                {Array.from({ length: APPLY_REVIEW.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
