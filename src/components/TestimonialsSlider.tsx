import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/data/home'
import 'swiper/css'
import 'swiper/css/pagination'

export function TestimonialsSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="testimonials-swiper !pb-12 [&_.swiper-wrapper]:!items-stretch"
    >
      {TESTIMONIALS.map((t) => (
        <SwiperSlide key={t.name} className="!flex !h-auto">
          <article className="glass group flex h-full min-h-[17.5rem] w-full flex-col rounded-2xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(31_61_52/0.06)] transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(31_61_52/0.10)] md:min-h-[18.5rem]">
            <Quote className="mb-4 h-8 w-8 shrink-0 text-brand-400" />
            <p className="flex-1 leading-relaxed text-gray-700">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-auto border-t border-gray-100 pt-4">
              <p className="font-heading font-bold text-brand-900">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </footer>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
