import { Link } from 'react-router-dom'
import { ArrowRight, LogIn, Smartphone } from 'lucide-react'
import { ACADEMY_LOGIN_PATH, openAcademyInPartnerApp } from '@/utils/academyAccess'
import { cn } from '@/utils/cn'

type Props = {
  className?: string
  primaryLabel?: string
  compact?: boolean
}

/**
 * Website CTAs that gate Academy behind Partner (DSA) login / app open.
 * Dashboard and lessons open only inside KuberOne partner app after login.
 */
export function AcademyAccessButtons({
  className,
  primaryLabel = 'Start Learning',
  compact = false,
}: Props) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Link
        to={ACADEMY_LOGIN_PATH}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 font-bold text-white shadow-lg shadow-brand-600/25 hover:brightness-105',
          compact ? 'px-4 py-2.5 text-sm' : 'px-5 py-3 text-sm',
        )}
      >
        <LogIn className="h-4 w-4" />
        {primaryLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <button
        type="button"
        onClick={() => openAcademyInPartnerApp()}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50/90 font-bold text-brand-800 hover:bg-brand-50',
          compact ? 'px-4 py-2.5 text-sm' : 'px-5 py-3 text-sm',
        )}
      >
        <Smartphone className="h-4 w-4" />
        Open in KuberOne App
      </button>
    </div>
  )
}
