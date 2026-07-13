import { SITE } from '@/data/site'
import { cn } from '@/utils/cn'

interface OfficeMapProps {
  className?: string
  heightClass?: string
}

export function OfficeMap({ className, heightClass = 'min-h-[300px] h-full' }: OfficeMapProps) {
  const query = encodeURIComponent(SITE.address)

  return (
    <iframe
      title={`${SITE.name} office location`}
      src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
      className={cn('w-full border-0', heightClass, className)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
