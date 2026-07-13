import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PREMIUM_STATS } from '@/data/homePremium'

function StatValue({ stat }: { stat: (typeof PREMIUM_STATS)[number] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || typeof stat.numeric !== 'number') return
    const duration = 2000
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.floor(eased * stat.numeric))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, stat.numeric])

  if (typeof stat.value === 'string') {
    return (
      <span ref={ref} className="font-heading text-3xl font-bold text-white md:text-4xl">
        {stat.value}
        <span className="text-brand-400">{stat.suffix}</span>
      </span>
    )
  }

  const formatted =
    stat.numeric >= 1000 ? `${Math.floor(display / 1000)}k` : display

  return (
    <span ref={ref} className="font-heading text-3xl font-bold text-white md:text-4xl">
      {stat.numeric >= 10000 ? `${Math.floor(display / 1000)}k` : formatted}
      <span className="text-brand-400">{stat.suffix}</span>
    </span>
  )
}

export function TrustStrip() {
  return (
    <section className="border-y border-brand-800/30 bg-brand-900 py-12 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {PREMIUM_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <StatValue stat={stat} />
              <p className="mt-2 text-sm text-brand-100/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
