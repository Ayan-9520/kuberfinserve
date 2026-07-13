import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wallet, Shield, CreditCard, Filter, Gauge, Users, ThumbsUp, ArrowRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { LoanCard } from '@/components/LoanCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TestimonialsSlider } from '@/components/TestimonialsSlider'
import { PartnerLogos } from '@/components/PartnerLogos'
import { StatsCounter } from '@/components/StatsCounter'
import { CTASection } from '@/components/CTASection'
import { ContactForm } from '@/components/ContactForm'
import { ABOUT_TEXT } from '@/data/site'
import { SERVICES, WHY_CHOOSE, WHY_CHOOSE_INTRO, FAQ_ITEMS, HOME_HERO_POINTS } from '@/data/home'
import { LOAN_CARDS } from '@/data/loans'
import { fadeUp, staggerContainer } from '@/animations/variants'
import { Button } from '@/components/ui/Button'
import { AboutIllustration } from '@/components/about/AboutIllustration'
import { WhyChooseIllustration } from '@/components/home/WhyChooseIllustration'

const serviceIcons = { wallet: Wallet, shield: Shield, 'credit-card': CreditCard }
const whyIcons = {
  filter: Filter,
  gauge: Gauge,
  users: Users,
  'thumbs-up': ThumbsUp,
} as const

export function AboutSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeading
              eyebrow="About KuberFinserve"
              title="A Sincere & Transparent Financial Partner"
              subtitle="Access to money shouldn't hold you back — we're here to serve you."
              align="left"
            />
            <ul className="mb-6 space-y-3">
              {HOME_HERO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mb-6 text-gray-600 leading-relaxed">{ABOUT_TEXT}</p>
            <p className="mb-8 italic text-gray-500 border-l-4 border-brand-600 pl-4">
              &ldquo;Making distribution more efficient for traditional banks and insurers, and enabling the creation of new financial products.&rdquo;
            </p>
            <Button to="/about-us">Read More About Us</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-100/60 shadow-2xl shadow-brand-900/10">
              <AboutIllustration className="aspect-[4/3] w-full object-contain p-4 md:p-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-brand-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm">
              <p className="text-3xl font-bold text-brand-600">10K+</p>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section className="bg-brand-50 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Services" subtitle="Quick loans, insurance & credit cards with easy approvals." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {SERVICES.map((s) => {
            const Icon = serviceIcons[s.icon as keyof typeof serviceIcons]
            return (
              <motion.article
                key={s.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(31_61_52/0.08)] transition-shadow hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-900 to-brand-600 text-white">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-900">{s.title}</h3>
                <p className="mt-3 text-gray-600">{s.description}</p>
                <Link
                  to={s.path}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-600 group-hover:gap-3 transition-all"
                >
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function LoansSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Loan Categories"
          subtitle="Compare and apply for the right loan product for your needs."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LOAN_CARDS.map((loan) => (
            <LoanCard key={loan.slug} {...loan} features={loan.features} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyChooseSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left: title, intro, illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="font-heading text-2xl font-bold text-brand-900 md:text-3xl lg:text-[2rem]">
              Why KuberFinserve is Best
            </h2>
            {WHY_CHOOSE_INTRO.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 text-sm leading-relaxed text-gray-600 md:text-[15px]">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 md:mt-10">
              <WhyChooseIllustration className="mx-auto lg:mx-0" />
            </div>
          </motion.div>

          {/* Right: icon list (reference layout) */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-10 md:gap-12 lg:pt-4"
          >
            {WHY_CHOOSE.map((item) => {
              const Icon = whyIcons[item.icon]
              return (
                <motion.li
                  key={item.title}
                  variants={fadeUp}
                  className="flex gap-5 sm:gap-6"
                >
                  <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border-2 border-brand-600 text-brand-600 sm:h-20 sm:w-20">
                    <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.75} />
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="font-heading text-lg font-bold text-brand-900 md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export function PartnersSection() {
  return <PartnerLogos />
}

export function TestimonialsSection() {
  return (
    <section className="bg-brand-50 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="What Our Customers Say" />
        <TestimonialsSlider />
      </div>
    </section>
  )
}

export function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Frequently Asked Questions" />
        <FAQAccordion items={FAQ_ITEMS} />
      </div>
    </section>
  )
}

export function ConnectSection() {
  return (
    <section id="connect" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Let's Connect"
              subtitle="Fill the form and our team will reach out shortly."
              align="left"
            />
            <div className="mt-8 max-w-md rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-100/60 p-8 shadow-[0_18px_60px_rgba(36,94,78,0.10)]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-brand-900">Talk to an Expert</p>
                  <p className="text-sm text-gray-600">Loans • Insurance • Credit Card</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                  Quick eligibility check
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                  Best offers from trusted partners
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-600" />
                  Assistance across India
                </li>
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export function HomePageExtras() {
  return (
    <>
      <StatsCounter />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <ConnectSection />
      <CTASection />
    </>
  )
}
