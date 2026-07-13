import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/data/home'

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.floor(eased * value))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  const formatted =
    value >= 1000 ? `${(display / 1000).toFixed(display >= 1000 ? 0 : 1)}k` : display

  return (
    <span ref={ref} className="font-heading text-4xl font-bold text-white md:text-5xl">
      {value >= 10000 ? `${Math.floor(display / 1000)}k` : formatted}
      {suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="bg-gradient-to-r from-brand-900 to-brand-700 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center font-heading text-2xl font-bold text-white md:text-3xl"
        >
          Some Interesting Facts
        </motion.h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-brand-100 md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
