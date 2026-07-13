import { Link } from 'react-router-dom'
import { SITE } from '@/data/site'
import { cn } from '@/utils/cn'

interface BrandLogoProps {
  variant?: 'default' | 'light' | 'icon'
  /** Smaller logo for compact header */
  compact?: boolean
  className?: string
  linkToHome?: boolean
  showName?: boolean
}

/** Light green tint for footer logo on dark background (≈ brand-400) */
const FOOTER_LOGO_FILTER =
  'brightness(0) saturate(100%) invert(91%) sepia(12%) saturate(1800%) hue-rotate(108deg) brightness(1.12)'

const logoSize = {
  default: 'h-[4.25rem] w-[4.25rem] md:h-20 md:w-20',
  compact: 'h-10 w-10 md:h-11 md:w-11',
  light: 'h-12 w-12 lg:h-14 lg:w-14',
  icon: 'h-10 w-10',
} as const

const logoSrc = {
  default: SITE.logoMarkUrl ?? SITE.logoUrl,
  light: SITE.logoLightUrl,
  icon: SITE.logoIconUrl ?? SITE.logoUrl,
} as const

function LogoMark({
  variant,
  compact = false,
  className,
}: {
  variant: keyof typeof logoSrc
  compact?: boolean
  className?: string
}) {
  const sizeKey = compact
    ? 'compact'
    : variant === 'light'
      ? 'light'
      : variant === 'icon'
        ? 'icon'
        : 'default'

  return (
    <img
      src={logoSrc[variant]}
      alt={`${SITE.name} logo`}
      className={cn(
        'shrink-0 object-contain',
        variant === 'light' && 'bg-transparent',
        logoSize[sizeKey],
        className,
      )}
      style={variant === 'light' ? { filter: FOOTER_LOGO_FILTER } : undefined}
      width={sizeKey === 'default' ? 80 : sizeKey === 'compact' ? 44 : sizeKey === 'light' ? 56 : 48}
      height={sizeKey === 'default' ? 80 : sizeKey === 'compact' ? 44 : sizeKey === 'light' ? 56 : 48}
      loading="eager"
      decoding="async"
    />
  )
}

export function BrandLogo({
  variant = 'default',
  compact = false,
  className,
  linkToHome = true,
  showName = false,
}: BrandLogoProps) {
  const markVariant = variant === 'icon' ? 'icon' : variant === 'light' ? 'light' : 'default'

  const name = SITE.name
  const lower = name.toLowerCase()
  const finIndex = lower.indexOf('fin')
  const beforeFin = finIndex >= 0 ? name.slice(0, finIndex) : name
  const fin = finIndex >= 0 ? name.slice(finIndex, finIndex + 3) : ''
  const afterFin = finIndex >= 0 ? name.slice(finIndex + 3) : ''

  const content = (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark variant={markVariant} compact={compact} className={className} />
      {showName && (
        <span className="hidden font-heading text-sm font-bold tracking-tight text-navy-900 sm:block md:text-base">
          {beforeFin}
          {fin && <span style={{ color: '#00c389' }}>{fin}</span>}
          {afterFin}
        </span>
      )}
    </span>
  )

  if (!linkToHome) {
    return (
      <span className="inline-flex items-center gap-3" aria-label={SITE.name}>
        {content}
      </span>
    )
  }

  return (
    <Link to="/" className="flex shrink-0 items-center transition-opacity hover:opacity-90" aria-label={SITE.name}>
      {content}
    </Link>
  )
}
