import { cn } from '@/utils/cn'

interface InsuranceIllustrationProps {
  className?: string
}

export function InsuranceIllustration({ className }: InsuranceIllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full', className)}
      role="img"
      aria-label="Insurance protection illustration"
    >
      <rect width="640" height="480" fill="#f5faf8" />
      <ellipse cx="520" cy="80" rx="110" ry="70" fill="#d4f5e8" opacity="0.85" />
      <ellipse cx="90" cy="410" rx="130" ry="65" fill="#d4f5e8" opacity="0.55" />

      {/* Umbrella / shield */}
      <path
        d="M320 88c-72 0-120 44-120 96v8h240v-8c0-52-48-96-120-96z"
        fill="#29b68d"
      />
      <path
        d="M200 192h240v16c0 40-54 72-120 72s-120-32-120-72v-16z"
        fill="#245e4e"
      />
      <path d="M320 88v176" stroke="#4fd4a8" strokeWidth="4" strokeLinecap="round" />
      <rect x="308" y="256" width="24" height="56" rx="8" fill="#245e4e" />

      {/* Policy document */}
      <rect x="88" y="120" width="148" height="188" rx="14" fill="#fff" stroke="#b8e8d8" strokeWidth="2" />
      <rect x="108" y="148" width="88" height="10" rx="5" fill="#d4f5e8" />
      <rect x="108" y="172" width="108" height="6" rx="3" fill="#e5e7eb" />
      <rect x="108" y="188" width="96" height="6" rx="3" fill="#e5e7eb" />
      <rect x="108" y="204" width="100" height="6" rx="3" fill="#e5e7eb" />
      <circle cx="152" cy="248" r="22" fill="#29b68d" opacity="0.2" />
      <path
        d="M140 248l8 8 16-18"
        stroke="#245e4e"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Family silhouettes */}
      <circle cx="468" cy="300" r="26" fill="#fcd9b8" />
      <path d="M442 328c0-14 12-26 26-26s26 12 26 26v10H442v-10z" fill="#29b68d" />
      <circle cx="520" cy="318" r="20" fill="#fcd9b8" />
      <path d="M500 338c0-11 9-20 20-20s20 9 20 20v8H500v-8z" fill="#4fd4a8" />
      <circle cx="428" cy="318" r="18" fill="#fcd9b8" />
      <path d="M410 336c0-10 8-18 18-18s18 8 18 18v6H410v-6z" fill="#4fd4a8" />

      {/* Car icon */}
      <rect x="420" y="128" width="120" height="64" rx="12" fill="#fff" stroke="#b8e8d8" strokeWidth="2" />
      <rect x="440" y="152" width="80" height="28" rx="8" fill="#29b68d" opacity="0.35" />
      <circle cx="456" cy="188" r="10" fill="#245e4e" />
      <circle cx="504" cy="188" r="10" fill="#245e4e" />

      {/* Heart badge */}
      <circle cx="560" cy="360" r="28" fill="#29b68d" />
      <path
        d="M560 372c-8-6-14-11-14-17a8 8 0 0114-5 8 8 0 0114 5c0 6-6 11-14 17z"
        fill="#fff"
      />
    </svg>
  )
}
