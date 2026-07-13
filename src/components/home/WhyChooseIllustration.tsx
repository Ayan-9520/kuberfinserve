import { cn } from '@/utils/cn'

interface WhyChooseIllustrationProps {
  className?: string
}

export function WhyChooseIllustration({ className }: WhyChooseIllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-auto w-full max-w-[420px] object-contain', className)}
      role="img"
      aria-label="Thinking about the right financial choice"
    >
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7fbf9" />
          <stop offset="1" stopColor="#e8f7f1" />
        </linearGradient>
        <linearGradient id="q" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22c55e" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#065f46" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="640" height="480" rx="24" fill="url(#bg)" />
      <ellipse cx="520" cy="110" rx="130" ry="90" fill="#bbf7d0" opacity="0.55" />
      <ellipse cx="140" cy="410" rx="170" ry="85" fill="#99f6e4" opacity="0.35" />

      {/* Ground shadow */}
      <ellipse cx="250" cy="392" rx="160" ry="34" fill="#0f172a" opacity="0.06" />
      <ellipse cx="440" cy="402" rx="120" ry="26" fill="#0f172a" opacity="0.05" />

      {/* Question mark */}
      <g filter="url(#softShadow)">
        <path
          d="M350 120c0-36 29-64 78-64 47 0 76 24 76 62 0 27-14 44-38 60-21 14-33 24-33 46v10h-46v-16c0-34 18-53 40-68 18-12 26-21 26-36 0-17-13-28-32-28-20 0-34 12-36 34h-48z"
          fill="url(#q)"
        />
        <circle cx="410" cy="298" r="26" fill="url(#q)" />
      </g>

      {/* Thinking person (simple 3D-ish) */}
      <g filter="url(#softShadow)">
        <circle cx="210" cy="230" r="34" fill="#f6d7bf" />
        <path d="M178 270c4-22 23-38 44-38s40 16 44 38v10h-88v-10z" fill="#0f766e" opacity="0.95" />
        <path d="M160 280h120v70c0 18-27 34-60 34s-60-16-60-34v-70z" fill="#22c55e" opacity="0.95" />
        <rect x="150" y="306" width="140" height="90" rx="16" fill="#064e3b" opacity="0.95" />
        <path d="M214 258l-20 22" stroke="#0f172a" strokeWidth="10" strokeLinecap="round" opacity="0.12" />
        <path d="M212 258l-18 22" stroke="#f6d7bf" strokeWidth="8" strokeLinecap="round" />
        <path d="M185 296c16 0 30 10 34 24" stroke="#f6d7bf" strokeWidth="10" strokeLinecap="round" />
        <path d="M185 296c16 0 30 10 34 24" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" opacity="0.10" />
      </g>

      {/* Small idea bubbles */}
      <circle cx="268" cy="166" r="10" fill="#22c55e" opacity="0.25" />
      <circle cx="290" cy="144" r="6" fill="#0f766e" opacity="0.22" />
      <circle cx="310" cy="128" r="4" fill="#22c55e" opacity="0.22" />
    </svg>
  )
}
