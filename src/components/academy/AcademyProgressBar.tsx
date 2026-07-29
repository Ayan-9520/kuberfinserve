import { cn } from '@/utils/cn'

export function AcademyProgressBar({
  value,
  className,
  size = 'md',
}: {
  value: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-full bg-brand-100/80',
        size === 'sm' && 'h-1.5',
        size === 'md' && 'h-2.5',
        size === 'lg' && 'h-3.5',
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-500 transition-all duration-700 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
