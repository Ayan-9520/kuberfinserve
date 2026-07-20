import { motion } from 'framer-motion'

/** Premium vector-style hero visual for partner landing (no stock photos). */
export function PartnerHeroVisual({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className={className}
      aria-hidden
    >
      <svg viewBox="0 0 560 480" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient id="phv-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b5d4b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00c389" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="phv-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00c389" />
            <stop offset="100%" stopColor="#0b5d4b" />
          </linearGradient>
          <linearGradient id="phv-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0fdf9" />
          </linearGradient>
          <filter id="phv-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0b5d4b" floodOpacity="0.18" />
          </filter>
        </defs>

        <rect width="560" height="480" rx="32" fill="url(#phv-bg)" />

        {/* Floating coins */}
        {[
          { cx: 70, cy: 90, r: 14, d: 0 },
          { cx: 490, cy: 70, r: 11, d: 0.4 },
          { cx: 510, cy: 200, r: 9, d: 0.8 },
          { cx: 60, cy: 280, r: 10, d: 1.2 },
        ].map((c) => (
          <motion.g
            key={`${c.cx}-${c.cy}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2 + c.d, repeat: Infinity, ease: 'easeInOut', delay: c.d }}
          >
            <circle cx={c.cx} cy={c.cy} r={c.r} fill="url(#phv-green)" opacity="0.85" />
            <text
              x={c.cx}
              y={c.cy + 4}
              textAnchor="middle"
              fill="#fff"
              fontSize="10"
              fontWeight="700"
              fontFamily="system-ui"
            >
              ₹
            </text>
          </motion.g>
        ))}

        {/* Bank nodes */}
        {[
          { x: 80, y: 150, label: 'Banks' },
          { x: 420, y: 130, label: 'NBFCs' },
          { x: 430, y: 320, label: 'CRM' },
          { x: 70, y: 340, label: 'App' },
        ].map((n, i) => (
          <motion.g
            key={n.label}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35 }}
          >
            <rect
              x={n.x}
              y={n.y}
              width="72"
              height="36"
              rx="10"
              fill="#fff"
              stroke="#bbf7d0"
              strokeWidth="1.5"
              filter="url(#phv-shadow)"
            />
            <text
              x={n.x + 36}
              y={n.y + 23}
              textAnchor="middle"
              fill="#0b5d4b"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui"
            >
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Connection lines to center */}
        <g stroke="#00c389" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45">
          <line x1="152" y1="168" x2="250" y2="230" />
          <line x1="420" y1="148" x2="310" y2="220" />
          <line x1="430" y1="338" x2="310" y2="290" />
          <line x1="142" y1="358" x2="250" y2="300" />
        </g>

        {/* Central consultant card */}
        <g filter="url(#phv-shadow)">
          <rect x="190" y="170" width="180" height="200" rx="24" fill="url(#phv-card)" stroke="#dcfce7" />
          {/* Person */}
          <circle cx="280" cy="230" r="28" fill="#0a342c" />
          <circle cx="280" cy="222" r="12" fill="#e2e8f0" />
          <path d="M255 255c8-16 42-16 50 0v12h-50v-12z" fill="#1e293b" />
          {/* Laptop */}
          <rect x="235" y="275" width="90" height="55" rx="6" fill="#0a342c" />
          <rect x="242" y="281" width="76" height="38" rx="3" fill="url(#phv-green)" opacity="0.9" />
          <text
            x="280"
            y="305"
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontWeight="700"
            fontFamily="system-ui"
          >
            KuberOne
          </text>
          {/* Growth bars */}
          <rect x="250" y="348" width="10" height="14" rx="2" fill="#bbf7d0" />
          <rect x="265" y="342" width="10" height="20" rx="2" fill="#86efac" />
          <rect x="280" y="336" width="10" height="26" rx="2" fill="#4ade80" />
          <rect x="295" y="330" width="10" height="32" rx="2" fill="#00c389" />
        </g>

        {/* Wallet badge */}
        <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
          <rect x="360" y="250" width="100" height="48" rx="14" fill="#0b5d4b" />
          <text x="410" y="270" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="system-ui">
            Commission
          </text>
          <text
            x="410"
            y="288"
            textAnchor="middle"
            fill="#fff"
            fontSize="14"
            fontWeight="800"
            fontFamily="system-ui"
          >
            Wallet
          </text>
        </motion.g>

        {/* WhatsApp automation chip */}
        <motion.g animate={{ y: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
          <rect x="95" y="220" width="88" height="40" rx="12" fill="#fff" stroke="#bbf7d0" />
          <text
            x="139"
            y="245"
            textAnchor="middle"
            fill="#0b5d4b"
            fontSize="10"
            fontWeight="700"
            fontFamily="system-ui"
          >
            WhatsApp AI
          </text>
        </motion.g>

        {/* Shield */}
        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <path
            d="M480 380c0 18-20 32-40 40-20-8-40-22-40-40v-28l40-12 40 12v28z"
            fill="#0b5d4b"
            opacity="0.9"
          />
          <path d="M440 368l8 8 16-16" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </svg>
    </motion.div>
  )
}
