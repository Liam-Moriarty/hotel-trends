import { useRevenueChart } from '@/features/dashboard/hooks/useRevenueChart'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { GlassTooltip } from '@/components/GlassTooltip'

// Hardcoded top-2 AI alerts (from mock data)
const TOP_ALERTS = [
  {
    id: 'a1',
    severity: 'urgent' as const,
    title: 'Rate Gap Alert',
    description:
      'Comp set raised rates by 14%. You are underpriced on Suite category — potential $3.2K revenue loss per day.',
    action: 'Apply Pricing →',
  },
  {
    id: 'a2',
    severity: 'warning' as const,
    title: 'Demand Surge Detected',
    description:
      'Local tech conference Apr 14–18 detected. Estimated +38% demand spike. Recommend dynamic pricing.',
    action: 'Create Package →',
  },
]

const SEVERITY_COLORS = {
  urgent: 'var(--status-error)',
  warning: 'var(--status-warning)',
  info: 'var(--status-info)',
  success: 'var(--status-success)',
}
const SEVERITY_BG = {
  urgent: 'var(--status-error-bg)',
  warning: 'var(--status-warning-bg)',
  info: 'var(--status-info-bg)',
  success: 'var(--status-success-bg)',
}

export function OverviewTab({ onViewAiTab }: { onViewAiTab: () => void }) {
  const { data = [] } = useRevenueChart()

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Chart area */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Revenue &amp; Occupancy
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              This week vs forecast
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-0" style={{ minHeight: '180px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 0, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="ov-gradActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ov-gradForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-violet)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${Math.round(Number(v) / 1000)}k`}
              />
              <Tooltip content={<GlassTooltip />} />
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="var(--accent-cool)"
                strokeWidth={2}
                fill="url(#ov-gradActual)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                name="Forecast"
                stroke="var(--accent-violet)"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="url(#ov-gradForecast)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Alerts strip */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            AI Alerts
          </p>
          <button
            className="text-xs hover:underline"
            style={{ color: 'var(--accent-cool)' }}
            onClick={onViewAiTab}
          >
            View all (4) →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {TOP_ALERTS.map(alert => (
            <div
              key={alert.id}
              className="relative p-4 rounded-lg flex flex-col gap-1.5 overflow-hidden"
              style={{
                background: 'var(--surface-container)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Left accent border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg"
                style={{ background: SEVERITY_COLORS[alert.severity] }}
              />
              {/* Severity badge */}
              <span
                className="inline-flex items-center self-start px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                style={{
                  background: SEVERITY_BG[alert.severity],
                  color: SEVERITY_COLORS[alert.severity],
                }}
              >
                {alert.severity}
              </span>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                {alert.title}
              </p>
              <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {alert.description}
              </p>
              <button
                className="text-[11px] font-medium mt-auto self-start hover:underline"
                style={{ color: 'var(--accent-cool)' }}
              >
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
