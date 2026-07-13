import { IllustrationFrame, ILLU, panelSize } from './shared'

const LABEL_FONT = 12
const VALUE_FONT = 11
const SMALL_FONT = 11

const metrics = [
  { label: 'Monthly Earnings', x: 95, y: 58, value: '↑ 24%' },
  { label: 'Lifetime Earnings', x: 270, y: 52, value: '↑ 156%' },
  { label: 'Business Growth', x: 455, y: 62, value: '↑ 89%' },
  { label: 'Rewards', x: 620, y: 55, value: '12 Badges' },
]

const incomeSources = ['Home Loans', 'LAP', 'Insurance', 'Credit Cards', 'Business Loans']

function MetricCard({
  x,
  y,
  label,
  value,
}: {
  x: number
  y: number
  label: string
  value: string
}) {
  const labelSize = panelSize(label, LABEL_FONT)
  const cardW = Math.max(labelSize.w, panelSize(value, VALUE_FONT).w + 8)
  const cardH = labelSize.h + 22

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={cardW}
        height={cardH}
        rx={12}
        fill={ILLU.glass}
        stroke={ILLU.glassBorder}
        strokeWidth="1.5"
      />
      <text
        x={x + cardW / 2}
        y={y + labelSize.h / 2 + 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ILLU.primary}
        fontSize={LABEL_FONT}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
      <text
        x={x + cardW / 2}
        y={y + cardH - 12}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ILLU.accent}
        fontSize={VALUE_FONT}
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        {value}
      </text>
    </g>
  )
}

function IncomePill({ x, y, label }: { x: number; y: number; label: string }) {
  const { w, h } = panelSize(label, SMALL_FONT)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={ILLU.glass} stroke={ILLU.glassBorder} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ILLU.primary}
        fontSize={SMALL_FONT}
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  )
}

interface BuildWealthIllustrationProps {
  className?: string
}

export function BuildWealthIllustration({ className }: BuildWealthIllustrationProps) {
  const chartBars = [80, 120, 160, 200, 260, 310, 360]
  const payoutsSize = panelSize('✓ Transparent Payouts', SMALL_FONT)

  let incomeX = 110
  const incomePositions = incomeSources.map((src) => {
    const { w } = panelSize(src, SMALL_FONT)
    const pos = { x: incomeX, y: 188, label: src, w }
    incomeX += w + 10
    return pos
  })

  return (
    <IllustrationFrame label="Financial dashboard showing business growth and multiple income streams" className={className}>
      <rect width="800" height="520" fill="url(#illu-grad-sky)" />
      <ellipse cx="400" cy="300" rx="250" ry="200" fill="url(#illu-radial-glow)" />

      {/* Main dashboard */}
      <rect x="70" y="90" width="660" height="380" rx="16" fill={ILLU.card} stroke={ILLU.glassBorder} strokeWidth="1.5" />
      <text x="110" y="128" fill={ILLU.text} fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif">
        Business Dashboard
      </text>
      <text x="110" y="150" fill={ILLU.muted} fontSize="11" fontFamily="system-ui, sans-serif">
        Powered by KuberOne
      </text>

      {/* Metric cards */}
      {metrics.map((m) => (
        <MetricCard key={m.label} x={m.x} y={m.y} label={m.label} value={m.value} />
      ))}

      {/* Income source pills */}
      {incomePositions.map((src) => (
        <IncomePill key={src.label} x={src.x} y={src.y} label={src.label} />
      ))}

      {/* Growth chart */}
      <g transform="translate(110, 250)">
        {chartBars.map((h, i) => (
          <rect
            key={i}
            x={i * 52}
            y={200 - h}
            width="38"
            height={h}
            rx="4"
            fill="url(#illu-grad-primary)"
            opacity={0.5 + i * 0.07}
          />
        ))}
        <text
          x="180"
          y="230"
          textAnchor="middle"
          fill={ILLU.primary}
          fontSize="12"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          Business Growth
        </text>
      </g>

      {/* Achievement badges */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${490 + i * 48}, 370)`}>
          <circle r="20" fill={ILLU.glass} stroke={ILLU.primary} strokeWidth="1.5" />
          <text y="5" textAnchor="middle" fill={ILLU.primary} fontSize="14">
            ★
          </text>
        </g>
      ))}
      <text
        x="580"
        y="425"
        textAnchor="middle"
        fill={ILLU.muted}
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Achievement Badges
      </text>

      {/* Transparent payouts */}
      <rect
        x={110}
        y={448}
        width={payoutsSize.w}
        height={payoutsSize.h}
        rx={payoutsSize.h / 2}
        fill="rgba(34,211,166,0.15)"
        stroke={ILLU.primary}
        strokeWidth="1.5"
      />
      <text
        x={110 + payoutsSize.w / 2}
        y={448 + payoutsSize.h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ILLU.primary}
        fontSize={SMALL_FONT}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        ✓ Transparent Payouts
      </text>
    </IllustrationFrame>
  )
}
