import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed left-0 top-0 z-[100] h-1 bg-gradient-to-r from-brand-800 to-brand-600 transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
