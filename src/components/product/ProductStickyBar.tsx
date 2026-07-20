import { Phone } from 'lucide-react'
import { SITE } from '@/data/site'

interface ProductStickyBarProps {
  applyHref?: string
  applyLabel?: string
}

export function ProductStickyBar({ applyHref = '#apply-form', applyLabel = 'Apply Now' }: ProductStickyBarProps) {
  const tel = SITE.phone.replace(/\s/g, '')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgb(15_41_32/0.12)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <a
          href={`tel:${tel}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-300 bg-white py-3 text-sm font-semibold text-brand-800"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={applyHref}
          className="inline-flex flex-[1.4] items-center justify-center rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-md"
        >
          {applyLabel}
        </a>
      </div>
    </div>
  )
}
