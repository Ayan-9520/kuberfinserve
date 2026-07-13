import { IllustrationFrame, PersonSilhouette, ILLU } from './shared'

interface JourneyStageIllustrationProps {
  stageIndex: number
  className?: string
}

/** Compact mini-illustration for each partner journey stage */
export function JourneyStageIllustration({ stageIndex, className }: JourneyStageIllustrationProps) {
  const idx = stageIndex % 12

  return (
    <IllustrationFrame
      label={`Partner journey stage ${stageIndex + 1}`}
      viewBox="0 0 200 140"
      className={className}
    >
      <rect width="200" height="140" rx="12" fill="url(#illu-grad-sky)" />
      <ellipse cx="100" cy="90" rx="60" ry="40" fill="url(#illu-radial-glow)" />

      {idx === 0 && (
        <>
          <rect x="60" y="40" width="80" height="55" rx="6" fill={ILLU.card} stroke={ILLU.glassBorder} strokeWidth="1" />
          <text x="100" y="62" textAnchor="middle" fill={ILLU.primary} fontSize="6" fontWeight="600" fontFamily="system-ui">
            Register
          </text>
          <rect x="70" y="70" width="60" height="6" rx="2" fill={ILLU.primary} opacity="0.5" />
          <PersonSilhouette x={100} y={105} scale={0.5} />
        </>
      )}

      {idx === 1 && (
        <>
          <rect x="55" y="35" width="90" height="65" rx="8" fill={ILLU.card} stroke={ILLU.primary} strokeWidth="1" />
          <text x="100" y="55" textAnchor="middle" fill={ILLU.primary} fontSize="7" fontWeight="700" fontFamily="system-ui">
            CERTIFIED
          </text>
          <text x="100" y="68" textAnchor="middle" fill={ILLU.muted} fontSize="5" fontFamily="system-ui">
            Kuber Academy
          </text>
          <path d="M85 80 L95 90 L115 72" stroke={ILLU.accent} strokeWidth="2" fill="none" />
        </>
      )}

      {idx === 2 && (
        <>
          <PersonSilhouette x={70} y={85} scale={0.55} />
          <PersonSilhouette x={130} y={90} scale={0.45} color="#334155" />
          <rect x="95" y="50" width="50" height="30" rx="4" fill={ILLU.glass} stroke={ILLU.glassBorder} strokeWidth="0.5" />
          <text x="120" y="68" textAnchor="middle" fill={ILLU.accent} fontSize="6" fontWeight="600" fontFamily="system-ui">
            1st Deal ✓
          </text>
        </>
      )}

      {idx === 3 && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={60 + i * 28} cy={75} r="8" fill={ILLU.glass} stroke={ILLU.primary} strokeWidth="0.5" />
          ))}
          <rect x="50" y="95" width="100" height="25" rx="4" fill={ILLU.card} stroke={ILLU.glassBorder} strokeWidth="0.5" />
          <text x="100" y="111" textAnchor="middle" fill={ILLU.muted} fontSize="5" fontFamily="system-ui">
            Growing Portfolio
          </text>
        </>
      )}

      {idx === 4 && (
        <>
          <PersonSilhouette x={100} y={70} scale={0.6} color="#0b5d4b" />
          <PersonSilhouette x={60} y={95} scale={0.4} />
          <PersonSilhouette x={100} y={100} scale={0.4} />
          <PersonSilhouette x={140} y={95} scale={0.4} />
        </>
      )}

      {idx === 5 && (
        <>
          <rect x="40" y="45" width="45" height="35" rx="4" fill={ILLU.glass} stroke={ILLU.glassBorder} strokeWidth="0.5" />
          <rect x="95" y="45" width="45" height="35" rx="4" fill={ILLU.glass} stroke={ILLU.glassBorder} strokeWidth="0.5" />
          <rect x="150" y="45" width="45" height="35" rx="4" fill={ILLU.glass} stroke={ILLU.glassBorder} strokeWidth="0.5" />
          <text x="62" y="65" textAnchor="middle" fill={ILLU.primary} fontSize="5" fontFamily="system-ui">Loans</text>
          <text x="117" y="65" textAnchor="middle" fill={ILLU.primary} fontSize="5" fontFamily="system-ui">Insurance</text>
          <text x="172" y="65" textAnchor="middle" fill={ILLU.primary} fontSize="5" fontFamily="system-ui">Cards</text>
        </>
      )}

      {idx === 6 && (
        <>
          <circle cx="100" cy="65" r="35" fill="none" stroke={ILLU.primary} strokeWidth="1" strokeDasharray="3 3" />
          <rect x="75" y="50" width="50" height="35" rx="4" fill={ILLU.card} stroke={ILLU.primary} strokeWidth="1" />
          <text x="100" y="72" textAnchor="middle" fill={ILLU.primary} fontSize="5" fontWeight="600" fontFamily="system-ui">
            City Ops
          </text>
          <text x="100" y="115" textAnchor="middle" fill={ILLU.muted} fontSize="5" fontFamily="system-ui">
            AI Dashboard
          </text>
        </>
      )}

      {idx === 7 && (
        <>
          {[
            { x: 70, y: 60 },
            { x: 100, y: 50 },
            { x: 130, y: 60 },
            { x: 85, y: 85 },
            { x: 115, y: 85 },
          ].map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="6" fill={ILLU.accent} opacity="0.6" />
          ))}
          <text x="100" y="110" textAnchor="middle" fill={ILLU.muted} fontSize="5" fontFamily="system-ui">
            Multi-City
          </text>
        </>
      )}

      {idx === 8 && (
        <>
          <path d="M60 90 Q100 40 140 90" fill="none" stroke={ILLU.primary} strokeWidth="1.5" />
          <circle cx="100" cy="55" r="12" fill={ILLU.card} stroke={ILLU.primary} strokeWidth="1" />
          <text x="100" y="59" textAnchor="middle" fill={ILLU.primary} fontSize="6" fontWeight="700" fontFamily="system-ui">
            IN
          </text>
        </>
      )}

      {idx === 9 && (
        <>
          <rect x="50" y="40" width="100" height="60" rx="6" fill={ILLU.card} stroke={ILLU.glassBorder} strokeWidth="1" />
          <text x="100" y="58" textAnchor="middle" fill={ILLU.primary} fontSize="6" fontWeight="700" fontFamily="system-ui">
            National Strategy
          </text>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={60 + i * 30} y="68" width="22" height="20" rx="2" fill={ILLU.glass} />
          ))}
        </>
      )}

      {idx === 10 && (
        <>
          <ellipse cx="100" cy="75" rx="55" ry="30" fill={ILLU.glass} stroke={ILLU.glassBorder} strokeWidth="1" />
          {[60, 85, 100, 115, 140].map((x, i) => (
            <circle key={i} cx={x} cy={68} r="6" fill={ILLU.primary} opacity="0.5" />
          ))}
          <text x="100" y="95" textAnchor="middle" fill={ILLU.muted} fontSize="5" fontFamily="system-ui">
            Executive Council
          </text>
        </>
      )}

      {idx === 11 && (
        <>
          <rect x="40" y="35" width="120" height="70" rx="8" fill="url(#illu-grad-primary)" opacity="0.9" />
          <text x="100" y="58" textAnchor="middle" fill="#071a1f" fontSize="7" fontWeight="800" fontFamily="system-ui">
            Chairman&apos;s Circle
          </text>
          <text x="100" y="72" textAnchor="middle" fill="#071a1f" fontSize="5" fontFamily="system-ui" opacity="0.8">
            Leadership Summit
          </text>
          <text x="100" y="90" textAnchor="middle" fill="#fbbf24" fontSize="14">
            ★ ★ ★
          </text>
        </>
      )}
    </IllustrationFrame>
  )
}
