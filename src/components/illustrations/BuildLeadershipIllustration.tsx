import { IllustrationFrame, PersonSilhouette, NetworkLines, ILLU, panelSize } from './shared'

const LABEL_FONT = 13
const BADGE_FONT = 11

const mapLevels = [
  { x: 520, y: 120, label: 'City', r: 34 },
  { x: 585, y: 200, label: 'Regional', r: 50 },
  { x: 500, y: 285, label: 'State', r: 66 },
  { x: 565, y: 385, label: 'National', r: 82 },
]

const mentees = [
  { x: 200, y: 380 },
  { x: 280, y: 420 },
  { x: 360, y: 390 },
  { x: 440, y: 410 },
]

function InfoPanel({
  x,
  y,
  label,
  fontSize = LABEL_FONT,
  fill = 'rgba(13,107,87,0.08)',
  stroke = 'rgba(13,107,87,0.25)',
  textFill = '#0d6b57',
}: {
  x: number
  y: number
  label: string
  fontSize?: number
  fill?: string
  stroke?: string
  textFill?: string
}) {
  const { w, h } = panelSize(label, fontSize)
  const cx = x + w / 2
  const cy = y + h / 2

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textFill}
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  )
}

interface BuildLeadershipIllustrationProps {
  className?: string
}

export function BuildLeadershipIllustration({ className }: BuildLeadershipIllustrationProps) {
  const cityPartner = panelSize('City Partner', BADGE_FONT)

  return (
    <IllustrationFrame label="City Partner mentoring professionals with network expansion" className={className}>
      <rect width="800" height="520" fill="#f0fdf9" />
      <ellipse cx="550" cy="260" rx="200" ry="200" fill="#dcfce7" opacity="0.5" />

      {/* Digital map expansion rings */}
      {mapLevels.map((level, i) => (
        <g key={level.label} opacity={0.35 + i * 0.12}>
          <circle
            cx={level.x}
            cy={level.y}
            r={level.r}
            fill="none"
            stroke={ILLU.primary}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          >
            <animate
              attributeName="r"
              values={`${level.r};${level.r + 8};${level.r}`}
              dur="4s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
            />
          </circle>
          <text
            x={level.x}
            y={level.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#0d6b57"
            fontSize={LABEL_FONT}
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            {level.label}
          </text>
        </g>
      ))}

      {/* City Partner leader */}
      <g transform="translate(300, 260)">
        <circle cx="0" cy="-50" r="55" fill="none" stroke={ILLU.primary} strokeWidth="2" opacity="0.3" />
        <PersonSilhouette x={0} y={0} scale={1.5} color="#0b5d4b" accent={ILLU.glow} />
        <rect
          x={-cityPartner.w / 2}
          y={-75 - cityPartner.h / 2 + 8}
          width={cityPartner.w}
          height={cityPartner.h}
          rx={cityPartner.h / 2}
          fill="url(#illu-grad-primary)"
        />
        <text
          x="0"
          y={-67}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#071a1f"
          fontSize={BADGE_FONT}
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          City Partner
        </text>
      </g>

      <NetworkLines points={mentees.map((m) => ({ x: m.x, y: m.y - 20 }))} color="#0d6b57" opacity={0.4} />

      {/* Mentees */}
      {mentees.map((m, i) => (
        <g key={i}>
          <PersonSilhouette x={m.x} y={m.y} scale={0.85} color="#1e293b" />
          <line x1="300" y1="220" x2={m.x} y2={m.y - 15} stroke="#0d6b57" strokeWidth="1" opacity="0.3" />
        </g>
      ))}

      {/* Info panels */}
      <InfoPanel x={40} y={88} label="Team Growth" />
      <InfoPanel x={615} y={55} label="AI Network" />
    </IllustrationFrame>
  )
}
