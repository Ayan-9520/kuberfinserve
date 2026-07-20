import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ArrowRight, Coins, TrendingUp, PiggyBank } from 'lucide-react'
import { HERO_SLIDES } from '@/data/home'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type HeroSlide = (typeof HERO_SLIDES)[number]

const floatIcons = [
  { Icon: Coins, className: 'right-[18%] top-[18%]', delay: 0 },
  { Icon: TrendingUp, className: 'right-[10%] top-[42%]', delay: 0.3 },
  { Icon: PiggyBank, className: 'right-[22%] bottom-[22%]', delay: 0.6 },
]

function HeroSlideContent({ slide }: { slide: HeroSlide }) {
  const { isActive } = useSwiperSlide()

  return (
    <div
      className={`container relative z-10 mx-auto flex h-full flex-col justify-center px-4 py-24 transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isActive}
    >
      <motion.span
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.4 }}
        className="mb-3 inline-block w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium text-brand-100 backdrop-blur-sm"
      >
        {slide.subtitle}
      </motion.span>
      <motion.h1
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.45, delay: isActive ? 0.05 : 0 }}
        className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
      >
        {slide.title}
      </motion.h1>
      <motion.p
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.45, delay: isActive ? 0.1 : 0 }}
        className="mt-6 max-w-xl text-lg text-gray-200"
      >
        {slide.description}
      </motion.p>
      <motion.div
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.45, delay: isActive ? 0.15 : 0 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Link
          to={slide.ctaLink}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-navy-800 via-navy-700 to-brand-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-navy-900/25 transition-transform hover:scale-[1.02]"
        >
          {slide.cta}
          <ArrowRight className="h-5 w-5" />
        </Link>
        <Link
          to="/check-eligibility"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-8 py-3.5 font-semibold text-white backdrop-blur-sm hover:bg-white/10"
        >
          Check Eligibility
        </Link>
      </motion.div>
    </div>
  )
}

export function HeroSlider() {
  const swiperRef = useRef(null)

  return (
    <section className="relative h-[min(92vh,800px)] w-full overflow-hidden bg-navy-900">
      {floatIcons.map(({ Icon, className, delay }) => (
        <motion.div
          key={className}
          className={`pointer-events-none absolute z-[1] hidden text-white/15 md:block ${className}`}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay }}
        >
          <Icon className="h-12 w-12 lg:h-16 lg:w-16" />
        </motion.div>
      ))}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        watchSlidesProgress
        className="hero-swiper relative z-10 h-full w-full"
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
              <div className="absolute inset-0 bg-navy-900/40" aria-hidden />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                aria-hidden
              />
              <HeroSlideContent slide={slide} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
