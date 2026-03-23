interface KpiCardProps {
  label: string
  value: string
  trend?: { value: string; dir: 'up' | 'down' | 'neutral' }
  variant?: 'default' | 'health'
  healthStatus?: 'good' | 'warning' | 'critical'
  className?: string
  // legacy props (kept for compatibility, mapped internally):
  sub?: string
}

export function KpiCard({
  label,
  value,
  trend,
  variant = 'default',
  healthStatus = 'good',
  className = '',
  sub,
}: KpiCardProps) {
  // Legacy: if no trend but has sub, parse sub as trend display
  const trendDisplay = trend ?? (sub ? { value: sub, dir: 'neutral' as const } : undefined)

  const trendColors = {
    up: { bg: 'var(--status-success-bg)', color: 'var(--status-success)' },
    down: { bg: 'var(--status-error-bg)', color: 'var(--status-error)' },
    neutral: { bg: 'var(--surface-container-high)', color: 'var(--text-muted)' },
  }

  const healthColors = {
    good: { color: 'var(--status-success)', bg: 'var(--status-success-bg)' },
    warning: { color: 'var(--status-warning)', bg: 'var(--status-warning-bg)' },
    critical: { color: 'var(--status-error)', bg: 'var(--status-error-bg)' },
  }

  return (
    <div
      className={`h-[88px] p-4 rounded-lg flex flex-col justify-between ${className}`}
      style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
    >
      {/* Top row: label + trend badge */}
      <div className="flex items-center justify-between gap-2">
        <p
          className="text-[10px] font-bold tracking-widest uppercase truncate"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        {variant !== 'health' && trendDisplay && (
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold tabular-nums shrink-0"
            style={{
              background: trendColors[trendDisplay.dir].bg,
              color: trendColors[trendDisplay.dir].color,
            }}
          >
            {trendDisplay.dir === 'up' ? '↑' : trendDisplay.dir === 'down' ? '↓' : ''}{' '}
            {trendDisplay.value}
          </span>
        )}
      </div>

      {/* Bottom row: value + health badge */}
      <div className="flex items-end justify-between gap-2">
        <p
          className="text-3xl font-semibold tabular-nums leading-none"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}
        </p>
        {variant === 'health' && (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide shrink-0"
            style={{
              background: healthColors[healthStatus].bg,
              color: healthColors[healthStatus].color,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: healthColors[healthStatus].color }}
            />
            {healthStatus}
          </span>
        )}
      </div>
    </div>
  )
}

// Keep legacy export for existing usages
export function KpiSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-[88px] p-4 rounded-lg animate-pulse ${className}`}
      style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="h-2 rounded w-16 mb-3" style={{ background: 'var(--surface-hover)' }} />
      <div className="h-8 rounded w-20" style={{ background: 'var(--surface-hover)' }} />
    </div>
  )
}
