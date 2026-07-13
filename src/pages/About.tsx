import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Target,
  Eye,
  Filter,
  Gauge,
  Users,
  ThumbsUp,
  ArrowRight,
  CheckCircle2,
  Building2,
  Handshake,
} from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { CTASection } from '@/components/CTASection'
import { ABOUT_TEXT, SITE } from '@/data/site'
import { WHY_CHOOSE, HOME_HERO_POINTS } from '@/data/home'
import {
  ABOUT_STATS,
  ABOUT_MISSION,
  ABOUT_VISION,
  ABOUT_QUOTE,
  ABOUT_HERO_SUBTITLE,
} from '@/data/about'
import { AboutIllustration } from '@/components/about/AboutIllustration'
import { fadeUp, staggerContainer } from '@/animations/variants'
import { Button } from '@/components/ui/Button'

const whyIcons = {
  filter: Filter,
  gauge: Gauge,
  users: Users,
  'thumbs-up': ThumbsUp,
} as const

export function About() {
  return (
    <>
      <SeoHead
        title="About Us | KuberFinserve"
        description="Learn about KuberFinserve - authorized channel partners helping Indian consumers with personal finance products."
        path="/about-us"
      />

      <div className="bg-gradient-to-b from-brand-50/80 to-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-navy-900/55" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(74,222,128,0.12),_transparent_55%)]" />
          <div className="container relative mx-auto px-4 pb-12 pt-24 md:pb-16 md:pt-28">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100">
                <Handshake className="h-3.5 w-3.5 text-brand-400" />
                Trusted financial partner
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]">
                About {SITE.name}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-100 md:text-base">
                {ABOUT_HERO_SUBTITLE}
              </p>
              <Link
                to="/contact-us"
                className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg transition-transform hover:scale-[1.02]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {ABOUT_STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="font-heading text-lg font-bold text-white md:text-xl">{stat.value}</p>
                  <p className="text-[11px] text-brand-100 md:text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  Who we are
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-brand-900 md:text-3xl">
                  A sincere & transparent financial partner
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{ABOUT_TEXT}</p>
                <ul className="mt-6 space-y-2.5">
                  {HOME_HERO_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      {point}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-6 rounded-xl border-l-4 border-brand-600 bg-brand-50/80 px-4 py-3 text-sm italic text-brand-900/90">
                  &ldquo;{ABOUT_QUOTE}&rdquo;
                </blockquote>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/apply-loan" size="sm">
                    Apply for Loan
                  </Button>
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-100/60 shadow-xl shadow-brand-900/10">
                  <AboutIllustration className="aspect-[4/3] max-h-[360px] object-contain p-4 md:p-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-lg md:-bottom-6 md:-left-6 md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-heading text-xl font-bold text-brand-900">Delhi HQ</p>
                      <p className="text-xs text-gray-500">Pan-India assistance</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-y border-brand-100/80 bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center md:mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Our purpose</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-brand-900 md:text-3xl">
                Mission & Vision
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.article
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/50 p-6 shadow-md transition-shadow hover:shadow-xl md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/25">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-900">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{ABOUT_MISSION}</p>
              </motion.article>
              <motion.article
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="group rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/50 p-6 shadow-md transition-shadow hover:shadow-xl md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white shadow-md shadow-brand-900/20">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-900">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{ABOUT_VISION}</p>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Why trust */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Why choose us</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-brand-900 md:text-3xl">
                Why trust {SITE.name}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                Transparent broking with personalized offers and expert guidance.
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {WHY_CHOOSE.map((item) => {
                const Icon = whyIcons[item.icon]
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-brand-900">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">{item.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      </div>

      <CTASection
        title="Ready to find the right financial product?"
        subtitle="Let our experts compare lenders and guide you from application to disbursal."
      />
    </>
  )
}
