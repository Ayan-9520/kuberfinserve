import { Phone, Mail, Star, ShieldCheck, MapPin } from 'lucide-react'
import { SITE } from '@/data/site'

export function TrustBar() {
  return (
    <div className="sticky top-0 z-[60] hidden border-b border-brand-900/10 bg-gradient-to-r from-navy-950 via-brand-950 to-navy-900 text-[11px] text-white/85 lg:block">
      <div className="mx-auto flex h-7 w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center gap-5">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-brand-400"
          >
            <Phone className="h-3 w-3 text-brand-400" />
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-brand-400"
          >
            <Mail className="h-3 w-3 text-brand-400" />
            {SITE.email}
          </a>
        </div>
        <div className="flex items-center gap-5 font-medium tracking-wide">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
            4.9 Google Rating
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-brand-400" />
            RBI Compliant Partners
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-brand-400" />
            PAN India Service
          </span>
        </div>
      </div>
    </div>
  )
}
