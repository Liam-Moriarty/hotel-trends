const STATUS_COLORS: Record<string, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
  neutral: 'var(--text-primary)',
}

export interface KpiPillProps {
  icon: React.ReactNode
  label: string
  value: string
  /** Colors the icon and value (Operations-style status pill) */
  status?: 'success' | 'warning' | 'error' | 'neutral'
  /** Optional trend indicator (Marketing-style) */
  trend?: string
  trendDir?: 'up' | 'down'
  /**
   * Semantic meaning of the trend — independent of direction.
   * e.g. spend rising = warning even though arrow is ↑
   */
  trendSemantic?: 'success' | 'warning' | 'error' | 'neutral'
}

export function KpiPill({
  icon,
  label,
  value,
  status = 'neutral',
  trend,
  trendDir,
  trendSemantic = 'neutral',
}: KpiPillProps) {
  const valueColor = STATUS_COLORS[status]
  const trendColor = STATUS_COLORS[trendSemantic]

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
      style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
    >
      <span style={{ color: valueColor }}>{icon}</span>
      <div>
        <p
          className="text-[10px] font-bold tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold tabular-nums" style={{ color: valueColor }}>
            {value}
          </p>
          {trend && (
            <span className="text-[10px] font-semibold tabular-nums" style={{ color: trendColor }}>
              {trendDir === 'up' ? '↑' : trendDir === 'down' ? '↓' : ''}
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
