interface EmiPieChartProps {
  principal: number
  interest: number
  size?: number
}

export function EmiPieChart({ principal, interest, size = 140 }: EmiPieChartProps) {
  const total = principal + interest
  const principalPct = total > 0 ? (principal / total) * 100 : 50
  const r = size / 2
  const circumference = 2 * Math.PI * (r - 8)
  const principalLen = (principalPct / 100) * circumference
  const interestLen = circumference - principalLen

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={r}
          cy={r}
          r={r - 8}
          fill="none"
          stroke="rgb(251 191 36)"
          strokeWidth={16}
          strokeDasharray={`${interestLen} ${circumference}`}
          strokeDashoffset={0}
        />
        <circle
          cx={r}
          cy={r}
          r={r - 8}
          fill="none"
          stroke="rgb(0 195 137)"
          strokeWidth={16}
          strokeDasharray={`${principalLen} ${circumference}`}
          strokeDashoffset={-interestLen}
        />
      </svg>
      <div className="flex gap-4 text-[10px] font-medium text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          Principal {principalPct.toFixed(0)}%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Interest {(100 - principalPct).toFixed(0)}%
        </span>
      </div>
    </div>
  )
}
