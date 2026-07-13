import { IllustrationFrame, PersonSilhouette } from './shared'

interface BuildLegacyIllustrationProps {
  className?: string
}

export function BuildLegacyIllustration({ className }: BuildLegacyIllustrationProps) {
  const community = [
    { x: 120, y: 400 },
    { x: 180, y: 420 },
    { x: 240, y: 395 },
    { x: 560, y: 405 },
    { x: 620, y: 425 },
    { x: 680, y: 400 },
    { x: 300, y: 430 },
    { x: 500, y: 435 },
  ]

  return (
    <IllustrationFrame label="Senior leader mentoring professionals at recognition ceremony" className={className}>
      <rect width="800" height="520" fill="#f0fdf9" />
      <ellipse cx="400" cy="200" rx="300" ry="120" fill="#dcfce7" opacity="0.6" />

      {/* Stage / recognition platform */}
      <rect x="200" y="280" width="400" height="20" rx="4" fill="#0b5d4b" opacity="0.3" />
      <rect x="250" y="200" width="300" height="80" rx="8" fill="url(#illu-grad-primary)" opacity="0.9" />
      <text x="400" y="235" textAnchor="middle" fill="#071a1f" fontSize="12" fontWeight="800" fontFamily="system-ui">
        Chairman&apos;s Circle
      </text>
      <text x="400" y="262" textAnchor="middle" dominantBaseline="middle" fill="#071a1f" fontSize="10" fontWeight="600" fontFamily="system-ui" opacity="0.85">
        Annual Leadership Summit
      </text>

      {/* Trophy */}
      <g transform="translate(400, 160)">
        <path d="M-15 0 L-10 -25 L10 -25 L15 0 Z" fill="#fbbf24" />
        <rect x="-8" y="0" width="16" height="12" rx="2" fill="#d97706" />
        <ellipse cx="0" cy="-25" rx="12" ry="6" fill="#fbbf24" />
      </g>

      {/* Senior leader mentoring */}
      <g transform="translate(400, 310)">
        <PersonSilhouette x={0} y={0} scale={1.4} color="#0b5d4b" accent="#fbbf24" />
        <rect x="-54" y="-96" width="108" height="24" rx="12" fill="#fbbf24" />
        <text
          x="0"
          y="-84"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#071a1f"
          fontSize="10"
          fontWeight="800"
          fontFamily="system-ui"
        >
          Hall of Fame
        </text>
      </g>

      {/* Young professionals being mentored */}
      <PersonSilhouette x={300} y={360} scale={0.9} color="#1e293b" />
      <PersonSilhouette x={500} y={360} scale={0.9} color="#1e293b" />
      <line x1="400" y1="280" x2="300" y2="340" stroke="#0d6b57" strokeWidth="1" opacity="0.4" />
      <line x1="400" y1="280" x2="500" y2="340" stroke="#0d6b57" strokeWidth="1" opacity="0.4" />

      {/* Large partner community */}
      {community.map((p, i) => (
        <PersonSilhouette key={i} x={p.x} y={p.y} scale={0.55} color="#334155" accent="#0d6b57" />
      ))}

      {/* Award ceremony lights */}
      {[150, 300, 450, 600, 750].map((x, i) => (
        <line key={i} x1={x} y1="0" x2={x} y2="120" stroke="#22d3a6" strokeWidth="1" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
        </line>
      ))}

      <text x="400" y="490" textAnchor="middle" dominantBaseline="middle" fill="#0d6b57" fontSize="13" fontWeight="700" fontFamily="system-ui" opacity="0.7">
        People Developed · Businesses Created · Customers Served
      </text>
    </IllustrationFrame>
  )
}
