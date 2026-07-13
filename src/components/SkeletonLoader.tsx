import { cn } from '@/utils/cn'

interface SkeletonLoaderProps {
  className?: string
  lines?: number
}

export function SkeletonLoader({ className, lines = 3 }: SkeletonLoaderProps) {
  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] shimmer"
          style={{ width: `${100 - i * 12}%` }}
        />
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto mb-8 h-12 w-2/3 max-w-md rounded-xl bg-gray-200 animate-pulse" />
      <SkeletonLoader lines={5} />
    </div>
  )
}
