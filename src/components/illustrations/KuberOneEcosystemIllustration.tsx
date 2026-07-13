import { IllustrationFrame, NetworkLines, ILLU, panelSize } from './shared'

const NODE_FONT = 13

const nodes = [
  { x: 400, y: 260, label: 'KuberOne', size: 75, central: true },
  { x: 190, y: 120, label: 'Customers' },
  { x: 610, y: 120, label: 'Partners' },
  { x: 140, y: 300, label: 'Employees' },
  { x: 660, y: 300, label: 'Banks' },
  { x: 250, y: 425, label: 'NBFCs' },
  { x: 550, y: 425, label: 'Insurance' },
]

interface KuberOneEcosystemIllustrationProps {
  className?: string
}

export function KuberOneEcosystemIllustration({ className }: KuberOneEcosystemIllustrationProps) {
  const outerPoints = nodes.filter((n) => !n.central).map((n) => ({ x: n.x, y: n.y }))

  return (
    <IllustrationFrame label="KuberOne AI operating system connecting the financial ecosystem" className={className}>
      <rect width="800" height="520" fill="url(#illu-grad-sky)" />
      <ellipse cx="400" cy="260" rx="280" ry="240" fill="url(#illu-radial-glow)" />

      {/* Orbital rings */}
      <circle cx="400" cy="260" r="120" fill="none" stroke={ILLU.primary} strokeWidth="1" opacity="0.2" strokeDasharray="8 4">
        <animateTransform attributeName="transform" type="rotate" from="0 400 260" to="360 400 260" dur="30s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="260" r="180" fill="none" stroke={ILLU.accent} strokeWidth="0.5" opacity="0.15" strokeDasharray="6 6">
        <animateTransform attributeName="transform" type="rotate" from="360 400 260" to="0 400 260" dur="45s" repeatCount="indefinite" />
      </circle>

      <NetworkLines points={outerPoints} opacity={0.35} />

      {nodes.map((node) => (
        <g key={node.label}>
          {node.central ? (
            <>
              <circle cx={node.x} cy={node.y} r={node.size} fill={ILLU.card} stroke="url(#illu-grad-primary)" strokeWidth="2" filter="url(#illu-glow)" />
              <text x={node.x} y={node.y - 5} textAnchor="middle" fill={ILLU.primary} fontSize="17" fontWeight="800" fontFamily="system-ui, sans-serif">
                KuberOne
              </text>
              <text x={node.x} y={node.y + 14} textAnchor="middle" fill={ILLU.muted} fontSize="11" fontFamily="system-ui, sans-serif">
                AI Operating System
              </text>
            </>
          ) : (
            (() => {
              const { w, h } = panelSize(node.label, NODE_FONT)
              return (
                <>
                  <rect
                    x={node.x - w / 2}
                    y={node.y - h / 2}
                    width={w}
                    height={h}
                    rx={h / 2}
                    fill={ILLU.glass}
                    stroke={ILLU.glassBorder}
                    strokeWidth="1.5"
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={ILLU.primary}
                    fontSize={NODE_FONT}
                    fontWeight="700"
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.label}
                  </text>
                </>
              )
            })()
          )}
        </g>
      ))}

      {/* Data flow particles */}
      {outerPoints.map((p, i) => (
        <circle key={`flow-${i}`} r="3" fill={ILLU.accent}>
          <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={`M${p.x},${p.y} Q400,260 400,260`} />
        </circle>
      ))}

      <rect x={260} y={24} width={280} height={48} rx={24} fill={ILLU.glass} stroke={ILLU.glassBorder} strokeWidth="1" />
      <text x={400} y={54} textAnchor="middle" fill={ILLU.primary} fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif">
        India&apos;s Financial Distribution OS
      </text>
    </IllustrationFrame>
  )
}
