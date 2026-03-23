import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { GlassTooltip } from '@/components/GlassTooltip'
import { occupancyData, labourData } from '@/mocks'

// Build data with confidence bounds
const occWithBounds = occupancyData.map((d: { date: string; occ: number }) => ({
  ...d,
  upper: Math.min(d.occ + 6, 100),
  lower: Math.max(d.occ - 6, 55),
}))

// Build labor data with overtime
const laborWithOvertime = labourData.map((d: { week: string; hours: number }) => ({
  ...d,
  overtime: d.hours > 140 ? Math.round(d.hours * 0.12) : 0,
}))

export function ForecastsTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Left: Occupancy Forecast */}
      <div
        className="flex flex-col rounded-lg p-4"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-start justify-between mb-3 shrink-0">
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Occupancy Forecast
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              With 90% confidence interval
            </p>
          </div>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase"
            style={{
              background: 'var(--status-success-bg)',
              color: 'var(--status-success)',
              border: '1px solid rgba(22,163,74,0.15)',
            }}
          >
            MAPE: 3.2%
          </span>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={occWithBounds} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity={0.04} />
                  <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                domain={[55, 100]}
              />
              <Tooltip content={<GlassTooltip />} />
              <Area
                type="monotone"
                dataKey="upper"
                name="Upper"
                stroke="var(--accent-cool)"
                strokeWidth={1}
                strokeDasharray="3 3"
                fill="url(#confGrad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="occ"
                name="Forecast"
                stroke="var(--accent-cool)"
                strokeWidth={2}
                fill="url(#occGrad)"
                dot={{
                  r: 3,
                  fill: 'var(--surface-container)',
                  stroke: 'var(--accent-cool)',
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="lower"
                name="Lower"
                stroke="var(--accent-cool)"
                strokeWidth={1}
                strokeDasharray="3 3"
                fill="none"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right: Labor Demand Forecast */}
      <div
        className="flex flex-col rounded-lg p-4"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="mb-3 shrink-0">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Labor Demand Forecast
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Staff hours + overtime projection
          </p>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={laborWithOvertime} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<GlassTooltip />} />
              <Bar
                dataKey="hours"
                name="Staff Hours"
                stackId="a"
                fill="var(--accent-cool)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="overtime"
                name="Overtime"
                stackId="a"
                fill="var(--accent-violet)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cool)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Staff Hours
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-violet)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Overtime
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
