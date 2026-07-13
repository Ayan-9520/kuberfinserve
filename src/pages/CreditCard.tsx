import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Gift, Plane, Percent, Sparkles, ShieldCheck } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { SeoHead } from '@/components/SeoHead'
import { SectionHeading } from '@/components/SectionHeading'
import { ContactForm } from '@/components/ContactForm'
import { CTASection } from '@/components/CTASection'
import { CREDIT_CARD_HERO_SUBTITLE } from '@/data/creditCard'

const perks = [
  { icon: Gift, title: 'Rewards & Cashback', desc: 'Earn points on every spend with partner bank cards.' },
  { icon: Plane, title: 'Travel Benefits', desc: 'Lounge access, air miles, and travel insurance on select cards.' },
  { icon: Percent, title: 'Low Interest Options', desc: 'Compare APR and EMI conversion from multiple issuers.' },
  { icon: CreditCard, title: 'Quick Approval', desc: 'Easy documentation and fast approval for eligible profiles.' },
]

export function CreditCardPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [hash])

  return (
    <>
      <SeoHead
        title="Credit Card | KuberFinserve"
        description="Credit cards from different banks with easy documentation and quick approval."
        path="/credit-card"
      />

      <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-navy-900/55" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(74,222,128,0.14),_transparent_50%)]" />
        <div className="container relative mx-auto px-4 pb-12 pt-24 md:pb-16 md:pt-28">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100">
                <Sparkles className="h-3.5 w-3.5 text-brand-400" />
                Top bank partners
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]">
                Credit Card
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-100 md:text-base">
                {CREDIT_CARD_HERO_SUBTITLE}
              </p>
              <a
                href="#credit-card-apply"
                className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg transition-transform hover:scale-[1.02]"
              >
                Apply Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Find Your Perfect Card"
            subtitle="Compare offers from HDFC, ICICI, SBI, Axis and more through our broking network."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <p.icon className="mb-3 h-8 w-8 text-brand-600" />
                <h3 className="font-heading font-bold text-brand-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="credit-card-apply" className="scroll-mt-28 bg-brand-50 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                title="Apply for Credit Card"
                subtitle="Share your details and we’ll help you choose the right card based on your profile and spending needs."
                align="left"
              />
              <div className="mt-8 rounded-3xl border border-brand-100 bg-white/70 p-8 shadow-[0_18px_60px_rgba(36,94,78,0.10)] ring-1 ring-brand-100/60 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-brand-900">Premium assistance</p>
                    <p className="text-sm text-gray-600">Rewards • Cashback • Travel</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                    Best-fit card recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                    Quick documentation guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                    Faster approvals for eligible profiles
                  </li>
                </ul>
              </div>
            </div>

            <ContactForm variant="premium" title="Get in touch" source="credit-card-apply" />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
