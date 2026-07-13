import { cn } from '@/utils/cn'

interface AboutIllustrationProps {
  className?: string
}

export function AboutIllustration({ className }: AboutIllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full', className)}
      role="img"
      aria-label="Financial advisory illustration"
    >
      <rect width="640" height="480" fill="#f5faf8" />
      <ellipse cx="520" cy="90" rx="120" ry="80" fill="#d4f5e8" opacity="0.9" />
      <ellipse cx="100" cy="400" rx="140" ry="70" fill="#d4f5e8" opacity="0.6" />
      <rect x="72" y="88" width="200" height="140" rx="16" fill="#fff" stroke="#b8e8d8" strokeWidth="2" />
      <rect x="92" y="168" width="28" height="40" rx="6" fill="#29b68d" opacity="0.35" />
      <rect x="128" y="148" width="28" height="60" rx="6" fill="#29b68d" />
      <rect x="164" y="128" width="28" height="80" rx="6" fill="#245e4e" />
      <rect x="200" y="138" width="28" height="70" rx="6" fill="#4fd4a8" />
      <rect x="400" y="72" width="160" height="120" rx="14" fill="#fff" stroke="#b8e8d8" strokeWidth="2" />
      <rect x="420" y="96" width="80" height="8" rx="4" fill="#d4f5e8" />
      <rect x="420" y="116" width="120" height="6" rx="3" fill="#e5e7eb" />
      <rect x="420" y="132" width="100" height="6" rx="3" fill="#e5e7eb" />
      <path d="M522 168l6 6 12-14" stroke="#245e4e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="360" cy="200" r="36" fill="#fcd9b8" />
      <path d="M324 238c0-20 16-36 36-36s36 16 36 36v8H324v-8z" fill="#245e4e" />
      <path d="M312 246h96v52c0 14-22 28-48 28s-48-14-48-28v-52z" fill="#29b68d" />
      <rect x="300" y="268" width="120" height="72" rx="8" fill="#245e4e" />
      <rect x="308" y="276" width="104" height="52" rx="4" fill="#d4f5e8" />
      <circle cx="180" cy="220" r="28" fill="#fcd9b8" />
      <path d="M152 248c0-16 12-28 28-28s28 12 28 28v6H152v-6z" fill="#4fd4a8" />
      <rect x="140" y="254" width="80" height="56" rx="20" fill="#4fd4a8" />
      <circle cx="480" cy="320" r="20" fill="#29b68d" />
      <text x="480" y="326" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700" fontFamily="system-ui">
        ₹
      </text>
    </svg>
  )
}
