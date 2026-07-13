import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { CAREER_PATHS } from '@/data/partnerStorytelling'

interface CareerPathIllustrationProps {
  className?: string
}

export function CareerPathIllustration({ className }: CareerPathIllustrationProps) {
  const [active, setActive] = useState(0)
  const path = CAREER_PATHS[active]

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-4 flex flex-wrap gap-2">
        {CAREER_PATHS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-semibold transition-all',
              active === i
                ? 'bg-[var(--pf-primary)] text-[var(--pf-cta-text)] shadow-lg shadow-[var(--pf-primary)]/20'
                : 'border border-[var(--pf-border)] text-[var(--pf-text-secondary)] hover:border-[var(--pf-primary)]/40',
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 600 280" fill="none" className="w-full h-auto" role="img" aria-label="Interactive career roadmap">
        <defs>
          <linearGradient id="career-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3a6" />
            <stop offset="100%" stopColor="#18c964" />
          </linearGradient>
        </defs>
        <rect width="600" height="280" rx="16" fill="#102b2e" stroke="rgba(34,211,166,0.2)" strokeWidth="1" />

        {path.steps.map((step, i) => {
          const x = 60 + (i / Math.max(path.steps.length - 1, 1)) * 480
          const y = 140
          const isLast = i === path.steps.length - 1

          return (
            <g key={step}>
              {i > 0 && (
                <line
                  x1={60 + ((i - 1) / Math.max(path.steps.length - 1, 1)) * 480 + 20}
                  y1={y}
                  x2={x - 20}
                  y2={y}
                  stroke="url(#career-grad)"
                  strokeWidth="2"
                  opacity="0.8"
                />
              )}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.12 }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isLast ? 22 : 18}
                  fill={isLast ? 'url(#career-grad)' : 'rgba(34,211,166,0.15)'}
                  stroke="#22d3a6"
                  strokeWidth={isLast ? 2 : 1}
                />
                <text x={x} y={y + 4} textAnchor="middle" fill={isLast ? '#071a1f' : '#22d3a6'} fontSize="8" fontWeight="700" fontFamily="system-ui">
                  {i + 1}
                </text>
                <text x={x} y={y + 45} textAnchor="middle" fill="#c7d2d9" fontSize="7" fontWeight="500" fontFamily="system-ui">
                  {step.length > 18 ? `${step.slice(0, 16)}…` : step}
                </text>
              </motion.g>
            </g>
          )
        })}

        <text x="300" y="30" textAnchor="middle" fill="#22d3a6" fontSize="10" fontWeight="700" fontFamily="system-ui">
          One Platform · Unlimited Career Paths
        </text>
      </svg>
    </div>
  )
}
