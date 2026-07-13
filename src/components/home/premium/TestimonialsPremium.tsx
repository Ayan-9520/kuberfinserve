import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star, Play } from 'lucide-react'
import { PREMIUM_TESTIMONIALS } from '@/data/homePremium'
import 'swiper/css'
import 'swiper/css/pagination'

export function TestimonialsPremium() {
  return (
    <section className="bg-silver-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Testimonials</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
          className="!pb-14 mt-12 [&_.swiper-wrapper]:!items-stretch"
        >
          {PREMIUM_TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="!flex !h-auto">
              <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg">
                <div className="relative flex items-center gap-2 bg-navy-900 px-5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/20">
                    <Play className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">Customer Story</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-heading font-bold text-navy-900">{t.name}</p>
                      <p className="text-xs text-gray-500">
                        {t.city} · {t.loanType}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
