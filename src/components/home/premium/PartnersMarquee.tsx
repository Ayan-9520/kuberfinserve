import { PARTNER_BANKS } from '@/data/homePremium'

export function PartnersMarquee() {
  const doubled = [...PARTNER_BANKS, ...PARTNER_BANKS]

  return (
    <section className="overflow-hidden bg-silver-50 py-14 md:py-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          Trusted Banking Partners
        </p>
        <h2 className="mt-2 text-center font-heading text-2xl font-bold text-navy-900 md:text-3xl">
          50+ Banks &amp; NBFCs On One Platform
        </h2>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-silver-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-silver-50 to-transparent" />

        <div className="flex w-max marquee-track gap-10 px-6">
          {doubled.map((bank, i) => (
            <div
              key={`${bank.name}-${i}`}
              className="flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm"
            >
              <img
                src={bank.logo}
                alt={bank.name}
                className="max-h-10 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
