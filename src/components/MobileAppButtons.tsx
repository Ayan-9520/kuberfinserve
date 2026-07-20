import { ExternalLink } from 'lucide-react'
import {
  downloadMobileApp,
  getCustomerAppDownloadUrl,
  getPartnerAppDownloadUrl,
  openMobileApp,
} from '@/utils/partnerApp'
import { StoreBadges } from '@/components/StoreBadges'
import { cn } from '@/utils/cn'

type AppTarget = 'customer' | 'partner'
type AppButtonsVariant = 'default' | 'partners' | 'footer' | 'compact'

interface MobileAppButtonsProps {
  target: AppTarget
  variant?: AppButtonsVariant
  className?: string
  showPlatformDownloads?: boolean
}

const labels = {
  customer: {
    name: 'Customer App',
    download: 'Download Customer App',
    open: 'Open Customer App',
  },
  partner: {
    name: 'Partner App',
    download: 'Download Partner App',
    open: 'Open Partner App',
  },
} as const

export function MobileAppButtons({
  target,
  variant = 'default',
  className,
  showPlatformDownloads = true,
}: MobileAppButtonsProps) {
  const copy = labels[target]
  const isPartners = variant === 'partners'
  const isFooter = variant === 'footer'
  const isCompact = variant === 'compact'

  const primaryBtn = isPartners
    ? 'pf-btn-primary'
    : isFooter
      ? 'rounded-lg bg-brand-600/15 px-3 py-2 text-xs font-semibold text-brand-400 transition-colors hover:bg-brand-600/25'
      : 'rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition-transform hover:scale-[1.02]'

  const secondaryBtn = isPartners
    ? 'rounded-xl border border-[var(--pf-border)] bg-[var(--pf-bg)]/60 px-4 py-2.5 text-xs font-semibold text-[var(--pf-text)] transition-colors hover:border-[var(--pf-primary)]/40 hover:text-[var(--pf-primary)]'
    : isFooter
      ? 'rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-brand-500/40 hover:text-brand-400'
      : 'rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-300 hover:text-brand-700'

  return (
    <div
      className={cn(
        isCompact ? 'flex flex-wrap items-center justify-center gap-2' : 'space-y-3',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-wrap gap-2',
          isCompact ? 'justify-center' : isFooter ? 'flex-col' : 'sm:grid sm:grid-cols-2',
        )}
      >
        <button
          type="button"
          onClick={() => downloadMobileApp(target)}
          className={cn(
            'inline-flex items-center justify-center gap-2',
            primaryBtn,
            isFooter && 'w-full',
          )}
        >
          {copy.download}
        </button>
        <button
          type="button"
          onClick={() => openMobileApp(target)}
          className={cn(
            'inline-flex items-center justify-center gap-2',
            secondaryBtn,
            isFooter && 'w-full',
          )}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {copy.open}
        </button>
      </div>

      {showPlatformDownloads && (
        <StoreBadges
          target={target}
          size={isFooter || isCompact ? 'sm' : 'md'}
          className={cn(isFooter ? 'flex-col sm:flex-row' : 'justify-center')}
        />
      )}

      {!isFooter && !isCompact && (
        <p className="text-center text-[10px] text-slate-500">
          App not installed?{' '}
          <a
            href={
              target === 'partner'
                ? getPartnerAppDownloadUrl('android')
                : getCustomerAppDownloadUrl('android')
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            Google Play
          </a>{' '}
          or{' '}
          <a
            href={
              target === 'partner' ? getPartnerAppDownloadUrl('ios') : getCustomerAppDownloadUrl('ios')
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            App Store
          </a>
        </p>
      )}
    </div>
  )
}
