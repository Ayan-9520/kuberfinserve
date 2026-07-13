import { motion } from 'framer-motion'
import { PARTNER_MARKETING_SLIDES } from '@/data/partnerSlides'

export function PartnersMarketingSlider() {
  const doubled = [...PARTNER_MARKETING_SLIDES, ...PARTNER_MARKETING_SLIDES]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="partners-marketing-marquee relative"
    >
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent sm:w-24" />

      <div className="flex w-max partners-marquee-track gap-4 px-4 sm:gap-5">
        {doubled.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            className="flex h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm sm:h-28 sm:w-44 md:h-32 md:w-48"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
