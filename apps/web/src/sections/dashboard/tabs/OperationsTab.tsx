import { capex } from '@/mocks'

function StatMiniCard({
  label,
  value,
  badge,
  badgeColor,
}: {
  label: string
  value: string
  badge?: string
  badgeColor?: string
}) {
  return (
    <div
      className="h-[64px] px-4 py-3 rounded-lg flex items-center justify-between"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div>
        <p
          className="text-[10px] font-bold tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        <p className="text-xl font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
          {value}
        </p>
      </div>
      {badge && (
        <span
          className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full"
          style={{
            color: badgeColor ?? 'var(--status-success)',
            background: badgeColor ? `${badgeColor}18` : 'var(--status-success-bg)',
          }}
        >
          {badge}
        </span>
      )}
    </div>
  )
}

export function OperationsTab() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          CapEx Prioritization
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          AI-ranked investment priorities
        </p>
      </div>

      {/* CapEx list */}
      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto">
        {capex.map((c, i) => (
          <div key={c.name} className="flex flex-col gap-1.5">
            {/* Row 1: rank + name + ROI */}
            <div className="flex items-center gap-2.5">
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold shrink-0 tabular-nums"
                style={{ background: 'var(--surface-active)', color: 'var(--text-muted)' }}
              >
                {i + 1}
              </span>
              <span className="text-xs flex-1 font-medium" style={{ color: 'var(--text-primary)' }}>
                {c.name}
              </span>
              <span
                className="text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-full shrink-0"
                style={{
                  color: 'var(--status-success)',
                  background: 'var(--status-success-bg)',
                }}
              >
                {c.roi}
              </span>
            </div>
            {/* Row 2: progress bar + score + budget */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex-1 h-1.5 rounded-full"
                style={{ background: 'var(--surface-hover)' }}
              >
                <div
                  className="h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${c.bar}%`, background: 'var(--accent-cool)' }}
                />
              </div>
              <span
                className="text-xs tabular-nums w-6 text-right shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                {c.score}
              </span>
              <span
                className="text-xs tabular-nums w-10 text-right shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                {c.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stat mini cards */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
        <StatMiniCard
          label="Energy Savings"
          value="$1.24K"
          badge="THIS WEEK"
          badgeColor="var(--status-success)"
        />
        <StatMiniCard
          label="Open Work Orders"
          value="7"
          badge="3 URGENT"
          badgeColor="var(--status-warning)"
        />
      </div>
    </div>
  )
}
