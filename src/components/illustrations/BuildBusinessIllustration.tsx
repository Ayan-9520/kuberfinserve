import { IllustrationFrame, GlassPanel, PersonSilhouette, ILLU, panelSize } from './shared'

const LABEL_FONT = 12

const screenDefs = [
  { x: 450, y: 40, label: 'CRM' },
  { x: 590, y: 75, label: 'Documents' },
  { x: 455, y: 130, label: 'Banks' },
  { x: 595, y: 175, label: 'Customers' },
  { x: 430, y: 215, label: 'Loan Pipeline' },
  { x: 575, y: 280, label: 'Insurance' },
  { x: 445, y: 355, label: 'Marketing' },
]

const screens = screenDefs.map((s) => {
  const { w, h } = panelSize(s.label, LABEL_FONT)
  return { ...s, w, h }
})

interface BuildBusinessIllustrationProps {
  className?: string
}

export function BuildBusinessIllustration({ className }: BuildBusinessIllustrationProps) {
  return (
    <IllustrationFrame label="Professional building business remotely across India" className={className}>
      <rect width="800" height="520" fill="url(#illu-grad-sky)" />
      <ellipse cx="300" cy="280" rx="180" ry="160" fill="url(#illu-radial-glow)" />

      {/* India map outline (stylized) */}
      <path
        d="M580 120 Q620 180 600 250 Q580 320 540 360 Q500 400 460 380 Q420 360 440 300 Q460 240 500 200 Q540 160 580 120Z"
        fill={ILLU.glass}
        stroke={ILLU.glassBorder}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <text
        x="520"
        y="262"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ILLU.primary}
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        PAN India
      </text>
      {[
        { x: 500, y: 200 },
        { x: 540, y: 280 },
        { x: 480, y: 340 },
        { x: 560, y: 320 },
      ].map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="5" fill={ILLU.accent}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
        </circle>
      ))}

      {/* Professional at laptop */}
      <g transform="translate(220, 300)">
        <ellipse cx="0" cy="70" rx="50" ry="10" fill="#000" opacity="0.25" />
        <PersonSilhouette x={0} y={0} scale={1.3} />
        <rect x="-80" y="45" width="160" height="8" rx="2" fill={ILLU.city} />
        <rect x="-45" y="10" width="90" height="55" rx="4" fill={ILLU.card} stroke={ILLU.glassBorder} strokeWidth="1.5" />
        <rect x="-40" y="15" width="80" height="42" rx="2" fill="#0a2a2e" />
        <text
          x="0"
          y="38"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={ILLU.primary}
          fontSize="10"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          KuberOne
        </text>
        <path d="M-50 65 L50 65 L55 72 L-55 72 Z" fill={ILLU.city} />
      </g>

      {/* Floating screens */}
      {screens.map((s, i) => (
        <g key={s.label}>
          <GlassPanel
            x={s.x}
            y={s.y}
            w={s.w}
            h={s.h}
            label={s.label}
            rx={10}
            fontSize={LABEL_FONT}
          />
          <line
            x1="270"
            y1="280"
            x2={s.x + s.w / 2}
            y2={s.y + s.h / 2}
            stroke={ILLU.primary}
            strokeWidth="0.5"
            opacity="0.2"
            strokeDasharray="3 3"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`0,0; 0,${-4 - i % 3}; 0,0`}
            dur={`${3 + i * 0.4}s`}
            repeatCount="indefinite"
          />
        </g>
      ))}
    </IllustrationFrame>
  )
}
