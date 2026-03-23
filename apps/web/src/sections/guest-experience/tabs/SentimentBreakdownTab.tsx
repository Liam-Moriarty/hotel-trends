const negativeThemes = ['Wi-Fi', 'Room Temperature', 'Check-in Wait', 'Noise Level']

// ── SentimentStackedBar ───────────────────────────────────────────────────────

function SentimentStackedBar({
  negative,
  neutral,
  positive,
}: {
  negative: number
  neutral: number
  positive: number
}) {
  return (
    <div>
      <div className="flex h-8 rounded-lg overflow-hidden">
        <div style={{ width: `${negative}%`, background: 'var(--status-error)' }} />
        <div style={{ width: `${neutral}%`, background: 'var(--status-warning)' }} />
        <div style={{ flex: 1, background: 'var(--status-success)' }} />
      </div>
      <div className="flex justify-between mt-1.5">
        <span
          className="text-[10px] font-bold tabular-nums"
          style={{ color: 'var(--status-error)' }}
        >
          {negative}% Negative
        </span>
        <span
          className="text-[10px] font-bold tabular-nums"
          style={{ color: 'var(--status-warning)' }}
        >
          {neutral}% Neutral
        </span>
        <span
          className="text-[10px] font-bold tabular-nums"
          style={{ color: 'var(--status-success)' }}
        >
          {positive}% Positive
        </span>
      </div>
    </div>
  )
}

// ── SentimentBreakdownCard ────────────────────────────────────────────────────

type BreakdownStatus = 'success' | 'warning' | 'error' | 'neutral'

const STATUS_COLORS: Record<BreakdownStatus, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
  neutral: 'var(--text-muted)',
}

const LEFT_BORDER_COLORS: Record<BreakdownStatus, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
  neutral: 'var(--border-subtle)',
}

function SentimentBreakdownCard({
  label,
  pct,
  count,
  delta,
  status,
  deltaIsRising = false,
}: {
  label: string
  pct: number
  count: number
  delta: string
  status: BreakdownStatus
  deltaIsRising?: boolean
}) {
  const deltaColor = deltaIsRising ? 'var(--status-error)' : STATUS_COLORS[status]

  return (
    <div
      className="p-3 rounded-lg"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `3px solid ${LEFT_BORDER_COLORS[status]}`,
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-widest"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <p className="text-2xl font-bold tabular-nums" style={{ color: STATUS_COLORS[status] }}>
        {pct}%
      </p>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {count} reviews
      </p>
      <p className="text-[10px] font-semibold mt-0.5" style={{ color: deltaColor }}>
        {delta}
      </p>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function SentimentBreakdownTab() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="shrink-0">
        <SentimentStackedBar negative={57} neutral={29} positive={14} />
      </div>

      <div className="grid grid-cols-3 gap-3 shrink-0">
        <SentimentBreakdownCard
          label="Positive"
          pct={14}
          count={40}
          delta="+2pp"
          status="success"
        />
        <SentimentBreakdownCard label="Neutral" pct={29} count={82} delta="flat" status="neutral" />
        <SentimentBreakdownCard
          label="Negative"
          pct={57}
          count={162}
          delta="+8pp ⚠"
          status="error"
          deltaIsRising
        />
      </div>

      <div className="shrink-0">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: 'var(--text-muted)' }}
        >
          Top Negative Themes
        </p>
        <div className="flex flex-wrap gap-2">
          {negativeThemes.map(theme => (
            <span
              key={theme}
              className="px-2 py-1 rounded-md text-xs font-medium cursor-pointer hover:brightness-95 transition"
              style={{
                background: 'var(--status-error-bg)',
                color: 'var(--status-error)',
                border: '1px solid rgba(220, 38, 38, 0.20)',
              }}
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
