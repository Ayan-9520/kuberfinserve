import { motion } from 'framer-motion'
import {
  IllustrationFrame,
  GlassPanel,
  NetworkLines,
  CitySkyline,
  PersonSilhouette,
  ILLU,
} from './shared'

const holograms = [
  { x: 120, y: 80, w: 72, h: 36, label: 'Loans' },
  { x: 580, y: 70, w: 72, h: 36, label: 'Insurance' },
  { x: 640, y: 160, w: 72, h: 36, label: 'Credit Cards' },
  { x: 60, y: 170, w: 60, h: 36, label: 'AI' },
  { x: 680, y: 260, w: 60, h: 36, label: 'CRM' },
  { x: 50, y: 280, w: 72, h: 36, label: 'Analytics' },
  { x: 620, y: 340, w: 72, h: 36, label: 'Commission' },
  { x: 100, y: 360, w: 60, h: 36, label: 'Banks' },
  { x: 560, y: 400, w: 60, h: 36, label: 'NBFCs' },
  { x: 200, y: 60, w: 90, h: 36, label: 'Insurance Co.' },
]

const professionals = [
  { x: 180, y: 420, label: 'Loan Advisor' },
  { x: 280, y: 440, label: 'CA' },
  { x: 380, y: 430, label: 'Builder' },
  { x: 480, y: 445, label: 'Insurance' },
  { x: 560, y: 425, label: 'Real Estate' },
  { x: 640, y: 435, label: 'Auto Dealer' },
  { x: 720, y: 420, label: 'Business Owner' },
]

interface HeroPartnerIllustrationProps {
  className?: string
}

export function HeroPartnerIllustration({ className }: HeroPartnerIllustrationProps) {
  const networkPoints = professionals.map((p) => ({ x: p.x, y: p.y - 20 }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={className}
    >
      <IllustrationFrame label="Entrepreneur building financial business with KuberOne" className={className}>
        <rect width="800" height="520" fill="url(#illu-grad-sky)" />
        <ellipse cx="400" cy="260" rx="200" ry="180" fill="url(#illu-radial-glow)" />
        <CitySkyline y={480} />

        {/* Digital network grid */}
        <g opacity="0.15">
          {[...Array(12)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 45} x2="800" y2={i * 45} stroke={ILLU.primary} strokeWidth="0.5" />
          ))}
        </g>

        <NetworkLines points={networkPoints} />

        {/* Holographic dashboards */}
        {holograms.map((h, i) => (
          <motion.g
            key={h.label}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GlassPanel x={h.x} y={h.y} w={h.w} h={h.h} label={h.label} />
          </motion.g>
        ))}

        {/* Central entrepreneur with tablet */}
        <g transform="translate(400, 280)">
          <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <ellipse cx="0" cy="55" rx="35" ry="8" fill="#000" opacity="0.3" />
            <PersonSilhouette x={0} y={0} scale={1.4} color="#0a342c" accent={ILLU.primary} />
            {/* Tablet - KuberOne */}
            <rect x="-28" y="-5" width="56" height="40" rx="6" fill={ILLU.card} stroke="url(#illu-grad-primary)" strokeWidth="2" />
            <text x="0" y="12" textAnchor="middle" fill={ILLU.primary} fontSize="8" fontWeight="700" fontFamily="system-ui">
              KuberOne
            </text>
            <rect x="-20" y="18" width="40" height="3" rx="1" fill={ILLU.primary} opacity="0.6" />
            <rect x="-20" y="24" width="28" height="2" rx="1" fill={ILLU.muted} opacity="0.5" />
            {/* Glow ring */}
            <circle cx="0" cy="-10" r="70" fill="none" stroke={ILLU.primary} strokeWidth="1" opacity="0.2" strokeDasharray="6 4" />
          </motion.g>
        </g>

        {/* Connected professionals */}
        {professionals.map((p) => (
          <g key={p.label}>
            <PersonSilhouette x={p.x} y={p.y} scale={0.7} color="#1a3d42" accent={ILLU.accent} />
            <text x={p.x} y={p.y + 30} textAnchor="middle" fill={ILLU.muted} fontSize="7" fontFamily="system-ui">
              {p.label}
            </text>
            <line x1="400" y1="250" x2={p.x} y2={p.y - 15} stroke={ILLU.primary} strokeWidth="0.5" opacity="0.25" />
          </g>
        ))}
      </IllustrationFrame>
    </motion.div>
  )
}
