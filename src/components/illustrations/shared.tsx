import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

/** Consistent premium illustration palette */
export const ILLU = {
  bg: '#071a1f',
  bgLight: '#0d2428',
  card: '#102b2e',
  primary: '#22d3a6',
  accent: '#18c964',
  glow: '#00c389',
  text: '#ffffff',
  muted: '#8b9aab',
  glass: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(34,211,166,0.25)',
  skin: '#e8b896',
  suit: '#0a342c',
  city: '#1a3d42',
} as const

export function IllustrationDefs() {
  return (
    <defs>
      <linearGradient id="illu-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3a6" />
        <stop offset="100%" stopColor="#18c964" />
      </linearGradient>
      <linearGradient id="illu-grad-glow" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00c389" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#22d3a6" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="illu-grad-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a342c" />
        <stop offset="60%" stopColor="#071a1f" />
        <stop offset="100%" stopColor="#053d32" />
      </linearGradient>
      <radialGradient id="illu-radial-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22d3a6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#22d3a6" stopOpacity="0" />
      </radialGradient>
      <filter id="illu-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  )
}

interface GlassPanelProps {
  x: number
  y: number
  w: number
  h: number
  label: string
  rx?: number
  className?: string
  fontSize?: number
}

export function GlassPanel({ x, y, w, h, label, rx = 8, className, fontSize = 9 }: GlassPanelProps) {
  return (
    <g className={className}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill={ILLU.glass}
        stroke={ILLU.glassBorder}
        strokeWidth="1.5"
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ILLU.primary}
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  )
}

/** Compute panel width from label length for readable padding */
export function panelSize(label: string, fontSize = 12) {
  const w = Math.max(Math.round(label.length * fontSize * 0.62 + 28), 72)
  const h = Math.round(fontSize * 2.4 + 12)
  return { w, h }
}

interface IllustrationFrameProps {
  children: ReactNode
  className?: string
  viewBox?: string
  label: string
}

export function IllustrationFrame({
  children,
  className,
  viewBox = '0 0 800 520',
  label,
}: IllustrationFrameProps) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-auto', className)}
      role="img"
      aria-label={label}
    >
      <IllustrationDefs />
      {children}
    </svg>
  )
}

/** Network connection lines between points */
export function NetworkLines({
  points,
  color = ILLU.primary,
  opacity = 0.3,
}: {
  points: { x: number; y: number }[]
  color?: string
  opacity?: number
}) {
  const center = points.reduce(
    (acc, p) => ({ x: acc.x + p.x / points.length, y: acc.y + p.y / points.length }),
    { x: 0, y: 0 },
  )
  return (
    <g opacity={opacity}>
      {points.map((p, i) => (
        <line
          key={i}
          x1={center.x}
          y1={center.y}
          x2={p.x}
          y2={p.y}
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {points.map((p, i) => (
        <circle key={`dot-${i}`} cx={p.x} cy={p.y} r="3" fill={color} />
      ))}
    </g>
  )
}

/** Simple isometric city skyline */
export function CitySkyline({ y = 380 }: { y?: number }) {
  const buildings = [
    { x: 40, w: 50, h: 80 },
    { x: 100, w: 35, h: 110 },
    { x: 145, w: 45, h: 70 },
    { x: 200, w: 30, h: 95 },
    { x: 600, w: 55, h: 90 },
    { x: 665, w: 40, h: 75 },
    { x: 715, w: 50, h: 100 },
  ]
  return (
    <g opacity="0.5">
      {buildings.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={y - b.h}
          width={b.w}
          height={b.h}
          fill={ILLU.city}
          stroke={ILLU.glassBorder}
          strokeWidth="0.5"
        />
      ))}
    </g>
  )
}

/** Stylized person silhouette */
export function PersonSilhouette({
  x,
  y,
  scale = 1,
  color = ILLU.suit,
  accent = ILLU.primary,
}: {
  x: number
  y: number
  scale?: number
  color?: string
  accent?: string
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="0" cy="-28" r="12" fill={ILLU.skin} />
      <path d="M-14 -16 Q0 -8 14 -16 L18 20 Q0 28 -18 20 Z" fill={color} />
      <rect x="-10" y="18" width="8" height="22" rx="3" fill={color} />
      <rect x="2" y="18" width="8" height="22" rx="3" fill={color} />
      <circle cx="0" cy="-28" r="14" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
    </g>
  )
}
