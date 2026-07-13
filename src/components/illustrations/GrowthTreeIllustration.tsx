import { IllustrationFrame, ILLU } from './shared'
import { GROWTH_TREE_STEPS } from '@/data/partnerStorytelling'

interface GrowthTreeIllustrationProps {
  className?: string
}

export function GrowthTreeIllustration({ className }: GrowthTreeIllustrationProps) {
  const trunkY = 420
  const stepCount = GROWTH_TREE_STEPS.length

  return (
    <IllustrationFrame label="Business growth tree from learning to long-term success" className={className} viewBox="0 0 600 520">
      <rect width="600" height="520" fill="url(#illu-grad-sky)" />
      <ellipse cx="300" cy="400" rx="200" ry="80" fill="url(#illu-radial-glow)" />

      {/* Tree trunk */}
      <path d="M280 420 Q290 300 300 180 Q310 300 320 420 Z" fill="#0b5d4b" opacity="0.8" />
      <path d="M285 420 Q295 320 300 220 Q305 320 315 420 Z" fill="#0d6b57" opacity="0.5" />

      {/* Branches with steps */}
      {GROWTH_TREE_STEPS.map((step, i) => {
        const angle = -60 + (i / (stepCount - 1)) * 120
        const rad = (angle * Math.PI) / 180
        const dist = 80 + i * 28
        const cx = 300 + Math.sin(rad) * dist
        const cy = 380 - Math.cos(rad) * dist * 0.8 - i * 15
        const side = i % 2 === 0 ? -1 : 1

        return (
          <g key={step.label}>
            <line x1="300" y1={trunkY - 40 - i * 25} x2={cx} y2={cy} stroke={ILLU.primary} strokeWidth="2" opacity="0.4" />
            <circle cx={cx} cy={cy} r="34" fill={ILLU.card} stroke="url(#illu-grad-primary)" strokeWidth="1.5" />
            <text x={cx} y={cy - 6} textAnchor="middle" fill={ILLU.primary} fontSize="9" fontWeight="700" fontFamily="system-ui">
              {step.label}
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill={ILLU.muted} fontSize="7" fontFamily="system-ui">
              {step.description.split(' ').slice(0, 3).join(' ')}
            </text>
            {/* Leaf accents */}
            <ellipse cx={cx + side * 35} cy={cy - 15} rx="15" ry="8" fill={ILLU.accent} opacity="0.3" transform={`rotate(${angle})`} />
          </g>
        )
      })}

      {/* Roots - foundation */}
      <text x="300" y="490" textAnchor="middle" fill={ILLU.muted} fontSize="11" fontFamily="system-ui">
        Greater capability → Greater opportunities
      </text>
    </IllustrationFrame>
  )
}
