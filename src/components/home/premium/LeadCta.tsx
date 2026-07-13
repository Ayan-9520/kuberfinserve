import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { SITE } from '@/data/site'

export function LeadCta() {
  return (
    <section className="bg-fintech-cta py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready To Find Your Perfect Financial Solution?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            AI-powered matching, 50+ lenders &amp; expert guidance — get funded faster with
            KuberFinserve.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to={SITE.applyLoanUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 text-base font-bold text-navy-900 shadow-lg shadow-brand-500/30 transition-transform hover:scale-[1.02]"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to={SITE.partnersUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Become Partner
            </Link>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-500/30 bg-brand-600/10 px-8 py-4 text-base font-semibold text-brand-300 transition-colors hover:bg-brand-600/20"
            >
              <Phone className="h-5 w-5" />
              Book Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
