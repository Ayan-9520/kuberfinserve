import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { EXPERT_CTA } from '@/data/productCommon'
import { SITE } from '@/data/site'

interface ProductExpertCtaProps {
  applyHref?: string
  className?: string
}

export function ProductExpertCta({ applyHref = '#apply-form', className }: ProductExpertCtaProps) {
  return (
    <div
      className={`rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50/80 p-5 md:p-6 ${className ?? ''}`}
    >
      <h3 className="font-heading text-lg font-bold text-brand-900">{EXPERT_CTA.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{EXPERT_CTA.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={applyHref}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
        >
          {EXPERT_CTA.applyLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, '')}`}
          className="inline-flex items-center gap-2 rounded-xl border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
        >
          <Phone className="h-4 w-4" />
          {EXPERT_CTA.talkLabel}
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <MessageCircle className="h-4 w-4" />
          {EXPERT_CTA.callbackLabel}
        </Link>
      </div>
    </div>
  )
}
