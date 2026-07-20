import { Phone, Mail, Star, ShieldCheck, MapPin } from 'lucide-react'
import { SITE } from '@/data/site'

export function TrustBar() {
  return (
    <div className="sticky top-0 z-[60] hidden border-b border-brand-100 bg-white/95 text-xs text-slate-600 shadow-sm backdrop-blur-md lg:block">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-1.5">
        <div className="flex items-center gap-5">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-brand-700"
          >
            <Phone className="h-3.5 w-3.5 text-brand-600" />
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-brand-700"
          >
            <Mail className="h-3.5 w-3.5 text-brand-600" />
            {SITE.email}
          </a>
        </div>
        <div className="flex items-center gap-5 font-medium">
          <span className="flex items-center gap-1.5 text-amber-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            4.9 Google Rating
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
            RBI Compliant Partners
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-600" />
            PAN India Service
          </span>
        </div>
      </div>
    </div>
  )
}
