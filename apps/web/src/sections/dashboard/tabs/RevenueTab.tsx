import { useRevparForecast } from '@/features/dashboard/hooks/useRevparForecast'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { GlassTooltip } from '@/components/GlassTooltip'
import { Sparkles } from 'lucide-react'

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

export function RevenueTab() {
  const { data = [] } = useRevparForecast()

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            RevPAR Forecast
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Actual vs AI-predicted trend (H1 2026)
          </p>
        </div>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold"
          style={{
            background: 'var(--accent-violet-muted)',
            color: 'var(--accent-violet)',
            border: '1px solid var(--border-ai)',
          }}
        >
          <Sparkles size={11} />
          Confidence 91%
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0" style={{ minHeight: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="rv-gradActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rv-gradForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-violet)" stopOpacity={0.1} />
                <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${v}`}
            />
            <Tooltip content={<GlassTooltip />} />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="var(--accent-cool)"
              strokeWidth={2}
              fill="url(#rv-gradActual)"
              dot={false}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              name="Forecast"
              stroke="var(--accent-violet)"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="url(#rv-gradForecast)"
              dot={false}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stat mini cards */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
        <StatMiniCard label="Forecast Confidence" value="91%" badge="HIGH" />
        <StatMiniCard
          label="Next Demand Peak"
          value="Apr 14–18"
          badge="Spring Conf"
          badgeColor="var(--status-warning)"
        />
      </div>
    </div>
  )
}
