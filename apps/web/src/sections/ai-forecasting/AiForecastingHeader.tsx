function StatPill({
  label,
  value,
  status,
}: {
  label: string
  value: string
  status: 'success' | 'info' | 'neutral'
}) {
  const valueColor =
    status === 'success'
      ? 'var(--status-success)'
      : status === 'info'
        ? 'var(--accent-cool)'
        : 'var(--text-primary)'

  return (
    <div
      className="flex flex-col px-3 py-1.5 rounded-lg"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <p
        className="text-[10px] font-bold tracking-widest uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <p className="text-sm font-semibold tabular-nums" style={{ color: valueColor }}>
        {value}
      </p>
    </div>
  )
}

export default function AiForecastingHeader() {
  return (
    <div className="flex items-start justify-between shrink-0">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          AI &amp; Forecasting
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Machine learning insights, predictive analytics &amp; optimization engine
        </p>
      </div>
      <div className="flex items-center gap-2">
        <StatPill label="MAPE Accuracy" value="3.2%" status="success" />
        <StatPill label="Active Models" value="4" status="info" />
        <StatPill label="Last Updated" value="2m ago" status="neutral" />
      </div>
    </div>
  )
}
