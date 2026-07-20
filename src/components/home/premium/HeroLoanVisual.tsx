import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Building2, Home, Sparkles, User, Zap, ShieldCheck } from 'lucide-react'

const products = [
  { icon: Home, label: 'Home Loan', amount: '₹25 Cr', tag: 'Popular' },
  { icon: Briefcase, label: 'Business Loan', amount: '₹5 Cr', tag: 'SME' },
  { icon: User, label: 'Personal Loan', amount: '₹50 L', tag: 'Fast' },
  { icon: Building2, label: 'LAP', amount: '₹25 Cr', tag: 'Secure' },
] as const

export function HeroLoanVisual() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % products.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.12 }}
      className="relative mx-auto w-full max-w-[500px]"
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(13,107,87,0.16),transparent_68%)] blur-2xl"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-[2.25rem] border border-dashed border-brand-300/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-[0_28px_80px_-20px_rgba(15,23,42,0.2)] sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(0,195,137,0.12),transparent_55%)]" />

        <div className="relative mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(13,107,87,0.35)',
                  '0 0 0 10px rgba(13,107,87,0)',
                  '0 0 0 0 rgba(13,107,87,0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">
                KuberOne AI
              </p>
              <p className="text-sm font-semibold text-navy-900">Smart Loan Engine</p>
            </div>
          </div>
          <motion.span
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-bold text-brand-800"
          >
            ● Matching
          </motion.span>
        </div>

        <div className="relative mx-auto aspect-square max-h-[300px] w-full max-w-[300px] sm:max-h-[320px]">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-brand-200/70"
              style={{ width: `${55 + ring * 18}%`, height: `${55 + ring * 18}%` }}
              initial={{ x: '-50%', y: '-50%', scale: 0.9, opacity: 0.5 }}
              animate={{ scale: [0.92, 1.05, 0.92], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + ring * 0.6, repeat: Infinity, delay: ring * 0.4 }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center rounded-full border-2 border-brand-200 bg-gradient-to-br from-white to-brand-50 text-navy-900 shadow-[0_12px_40px_rgba(13,107,87,0.25)] sm:h-24 sm:w-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-brand-400/50"
              />
              <Sparkles className="relative h-6 w-6 text-brand-600" />
              <span className="relative mt-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-800">
                AI Match
              </span>
            </div>
          </motion.div>

          {products.map((product, i) => {
            const Icon = product.icon
            const angle = (i / products.length) * 360 - 90
            const rad = (angle * Math.PI) / 180
            const radius = 42
            const x = 50 + radius * Math.cos(rad)
            const y = 50 + radius * Math.sin(rad)
            const isActive = active === i

            return (
              <motion.div
                key={product.label}
                className="absolute z-10 w-[42%] max-w-[130px]"
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.06 : 0.94,
                  x: '-50%',
                  y: '-50%',
                }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
              >
                <motion.div
                  animate={{ y: isActive ? -6 : 0 }}
                  transition={{ duration: 0.5 }}
                  className={`overflow-hidden rounded-xl border p-2.5 shadow-md sm:p-3 ${
                    isActive
                      ? 'border-brand-300 bg-white shadow-brand-500/20'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      isActive
                        ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white'
                        : 'bg-white text-brand-700 ring-1 ring-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p
                    className={`mt-2 font-heading text-[11px] font-bold leading-tight sm:text-xs ${
                      isActive ? 'text-navy-900' : 'text-slate-700'
                    }`}
                  >
                    {product.label}
                  </p>
                  <p
                    className={`text-[10px] font-semibold ${
                      isActive ? 'text-brand-700' : 'text-slate-500'
                    }`}
                  >
                    {product.amount}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <div className="relative mt-2 min-h-[52px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                  {products[active].tag} pick
                </p>
                <p className="text-sm font-semibold text-navy-900">
                  {products[active].label} · Up to {products[active].amount}
                </p>
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="font-bold text-brand-600"
              >
                →
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-3 grid grid-cols-2 gap-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-navy-900">50+</p>
              <p className="text-[9px] uppercase tracking-wider text-slate-500">Lenders</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-navy-900">24 Hrs</p>
              <p className="text-[9px] uppercase tracking-wider text-slate-500">Approval</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
