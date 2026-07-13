import { cn } from '@/utils/cn'

interface CreditCardIllustrationProps {
  className?: string
}

export function CreditCardIllustration({ className }: CreditCardIllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full', className)}
      role="img"
      aria-label="Credit card illustration"
    >
      <rect width="640" height="480" fill="#f5faf8" />
      <ellipse cx="100" cy="90" rx="100" ry="65" fill="#d4f5e8" opacity="0.8" />
      <ellipse cx="540" cy="400" rx="120" ry="70" fill="#d4f5e8" opacity="0.55" />

      {/* Back card */}
      <rect
        x="180"
        y="140"
        width="280"
        height="176"
        rx="18"
        fill="#245e4e"
        transform="rotate(-8 320 228)"
      />

      {/* Front card */}
      <rect x="200" y="108" width="280" height="176" rx="18" fill="#29b68d" />
      <rect x="200" y="108" width="280" height="56" rx="18" fill="#245e4e" />
      <rect x="224" y="188" width="48" height="36" rx="6" fill="#fcd9b8" opacity="0.9" />
      <rect x="224" y="240" width="120" height="8" rx="4" fill="#fff" opacity="0.5" />
      <rect x="224" y="256" width="88" height="8" rx="4" fill="#fff" opacity="0.35" />
      <circle cx="432" cy="248" r="18" fill="#fff" opacity="0.25" />
      <circle cx="448" cy="248" r="18" fill="#fff" opacity="0.15" />

      {/* Contactless */}
      <path
        d="M468 168c12 8 12 24 0 32M456 156c24 16 24 48 0 64M444 144c36 24 36 72 0 96"
        stroke="#4fd4a8"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Rewards coin */}
      <circle cx="120" cy="280" r="40" fill="#fff" stroke="#b8e8d8" strokeWidth="2" />
      <circle cx="120" cy="280" r="28" fill="#4fd4a8" opacity="0.4" />
      <text
        x="120"
        y="288"
        textAnchor="middle"
        fill="#245e4e"
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui"
      >
        %
      </text>

      {/* Travel plane */}
      <path
        d="M500 120l28 12-28 12 8-20-8-20 28 12-28 12 8-20z"
        fill="#29b68d"
      />
      <rect x="488" y="168" width="64" height="48" rx="10" fill="#fff" stroke="#b8e8d8" strokeWidth="2" />
      <rect x="500" y="184" width="40" height="6" rx="3" fill="#d4f5e8" />

      {/* Gift box */}
      <rect x="88" y="148" width="72" height="56" rx="8" fill="#fff" stroke="#b8e8d8" strokeWidth="2" />
      <rect x="88" y="168" width="72" height="8" fill="#29b68d" />
      <rect x="118" y="148" width="12" height="56" fill="#4fd4a8" opacity="0.6" />
      <path d="M124 148v-12c0-8-6-12-12-8s-4 12 4 16 8-4 8-4z" fill="#29b68d" />
    </svg>
  )
}
