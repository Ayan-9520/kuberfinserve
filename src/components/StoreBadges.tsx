import {
  downloadMobileApp,
  getCustomerAppDownloadUrl,
  getPartnerAppDownloadUrl,
} from '@/utils/partnerApp'
import { cn } from '@/utils/cn'

type AppTarget = 'customer' | 'partner'

interface StoreBadgesProps {
  target: AppTarget
  className?: string
  size?: 'sm' | 'md'
}

const BADGES = {
  android: {
    src: '/badges/google-play.svg',
    alt: 'Get it on Google Play',
  },
  ios: {
    src: '/badges/app-store.svg',
    alt: 'Download on the App Store',
  },
} as const

export function StoreBadges({ target, className, size = 'md' }: StoreBadgesProps) {
  const height = size === 'sm' ? 'h-9' : 'h-11'
  const androidHref =
    target === 'partner' ? getPartnerAppDownloadUrl('android') : getCustomerAppDownloadUrl('android')
  const iosHref =
    target === 'partner' ? getPartnerAppDownloadUrl('ios') : getCustomerAppDownloadUrl('ios')

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <a
        href={androidHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault()
          downloadMobileApp(target, 'android')
        }}
        className="inline-flex transition-transform hover:scale-[1.03] active:scale-[0.98]"
        aria-label={BADGES.android.alt}
      >
        <img
          src={BADGES.android.src}
          alt={BADGES.android.alt}
          className={cn(height, 'w-auto')}
          width={135}
          height={40}
          loading="lazy"
          decoding="async"
        />
      </a>
      <a
        href={iosHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault()
          downloadMobileApp(target, 'ios')
        }}
        className="inline-flex transition-transform hover:scale-[1.03] active:scale-[0.98]"
        aria-label={BADGES.ios.alt}
      >
        <img
          src={BADGES.ios.src}
          alt={BADGES.ios.alt}
          className={cn(height, 'w-auto')}
          width={135}
          height={40}
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  )
}
