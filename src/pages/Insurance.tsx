import { motion } from 'framer-motion'
import { Shield, Heart, Car, Home, Sparkles, ShieldCheck } from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { SectionHeading } from '@/components/SectionHeading'
import { ContactForm } from '@/components/ContactForm'
import { CTASection } from '@/components/CTASection'
import { INSURANCE_HERO_SUBTITLE } from '@/data/insurance'

const products = [
  { icon: Heart, title: 'Life Insurance', desc: 'Term plans, ULIPs, and endowment policies for family security.' },
  { icon: Car, title: 'Motor Insurance', desc: 'Comprehensive and third-party coverage for cars and bikes.' },
  { icon: Home, title: 'Home Insurance', desc: 'Protect your property and contents against unforeseen events.' },
  { icon: Shield, title: 'Health Insurance', desc: 'Individual and family floater plans from top insurers.' },
]

export function Insurance() {
  return (
    <>
      <SeoHead
        title="Insurance | KuberFinserve"
        description="Life and general insurance products. Compare policies and get expert guidance."
        path="/insurance"
      />

      <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=85"
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
                Life & general insurance
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]">
                Insurance
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-100 md:text-base">
                {INSURANCE_HERO_SUBTITLE}
              </p>
              <a
                href="#insurance-quote"
                className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg transition-transform hover:scale-[1.02]"
              >
                Get Free Quote
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Life & General Insurance"
            subtitle="We provide both life insurance as well as general insurance products."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <p.icon className="mb-4 h-10 w-10 text-brand-600" />
                <h3 className="font-heading font-bold text-brand-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="insurance-quote" className="scroll-mt-28 bg-brand-50 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                title="Get Insurance Quote"
                subtitle="Share your details and we’ll connect you with the right policy options from trusted insurers."
                align="left"
              />
              <div className="mt-8 rounded-3xl border border-brand-100 bg-white/70 p-8 shadow-[0_18px_60px_rgba(36,94,78,0.10)] ring-1 ring-brand-100/60 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-brand-900">Premium support</p>
                    <p className="text-sm text-gray-600">Life • Health • Motor • Home</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                    Compare plans & premium benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                    Transparent guidance from experts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                    Quick turnaround on quotes
                  </li>
                </ul>
              </div>
            </div>

            <ContactForm variant="premium" title="Get in touch" source="insurance-quote" />
          </div>
        </div>
      </section>

      <CTASection title="Protect what matters most" />
    </>
  )
}
