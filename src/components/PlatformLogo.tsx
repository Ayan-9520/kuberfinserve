import { SITE } from '@/data/site'
import { cn } from '@/utils/cn'

interface PlatformLogoProps {
  /** Visual size preset */
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Show "KuberOne" wordmark */
  showName?: boolean
  /** Place wordmark under the mark (default: beside) */
  nameBelow?: boolean
  nameClassName?: string
}

const sizes = {
  sm: 'h-9 w-9',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
} as const

/**
 * Canonical KuberOne (K1) mark — transparent BG, green outline + K1.
 * Use on Partner Login, Partner/Customer App CTAs, KuberOne sections.
 */
export function PlatformLogo({
  size = 'md',
  className,
  showName = false,
  nameBelow = true,
  nameClassName,
}: PlatformLogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        nameBelow ? 'flex-col gap-1.5' : 'flex-row gap-2.5',
        className,
      )}
    >
      <img
        src={SITE.platformLogoUrl}
        alt={`${SITE.platformName} logo`}
        className={cn('shrink-0 object-contain', sizes[size])}
        width={size === 'lg' ? 64 : size === 'md' ? 48 : 36}
        height={size === 'lg' ? 64 : size === 'md' ? 48 : 36}
        loading="eager"
        decoding="async"
      />
      {showName && (
        <span
          className={cn(
            'font-heading font-bold tracking-tight text-[var(--pf-text,theme(colors.navy.900))]',
            nameBelow ? 'text-base' : 'text-sm',
            nameClassName,
          )}
        >
          {SITE.platformName}
        </span>
      )}
    </span>
  )
}
