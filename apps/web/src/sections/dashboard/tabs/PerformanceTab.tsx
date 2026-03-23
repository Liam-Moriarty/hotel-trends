import { useSnapshotKpis } from '@/features/dashboard/hooks/useSnapshotKpis'
import { useDeptPerformance } from '@/features/dashboard/hooks/useDeptPerformance'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

export function PerformanceTab() {
  const { data: kpisData } = useSnapshotKpis()
  const { data: depts = [] } = useDeptPerformance()

  const score = kpisData?.healthScore ?? 84
  const healthStatus = score >= 75 ? 'good' : score >= 50 ? 'warning' : 'critical'
  const ringColor =
    healthStatus === 'good'
      ? 'var(--status-success)'
      : healthStatus === 'warning'
        ? 'var(--status-warning)'
        : 'var(--status-error)'

  const avg =
    depts.length > 0
      ? Math.round((depts.reduce((s, d) => s + d.score, 0) / depts.length) * 10) / 10
      : 0

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Health Score ring */}
      <div className="shrink-0">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          Health Score
        </p>
        <div className="flex items-center gap-5">
          <div className="relative w-[120px] h-[120px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius={44}
                outerRadius={56}
                startAngle={210}
                endAngle={-30}
                data={[{ value: score, fill: ringColor }]}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={4}
                  background={{ fill: 'var(--surface-hover)' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ color: 'var(--text-primary)' }}
              >
                {score}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Overall score
            </p>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide mt-1"
              style={{ background: `${ringColor}18`, color: ringColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: ringColor }}
              />
              {healthStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Dept Performance */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <p
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            Department Performance
          </p>
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            Performance index (0–100)
          </p>
        </div>
        <div
          className="flex-1 min-h-0 flex flex-col justify-between"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {depts.map(dept => (
            <div
              key={dept.name}
              className="flex items-center gap-3 py-2"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
              <span className="text-xs w-16 shrink-0" style={{ color: 'var(--text-secondary)' }}>
                {dept.name}
              </span>
              <div
                className="flex-1 h-1 rounded-full"
                style={{ background: 'var(--surface-hover)' }}
              >
                <div
                  className="h-1 rounded-full transition-all duration-700"
                  style={{ width: `${dept.score}%`, background: 'var(--accent-cool)' }}
                />
              </div>
              <span
                className="text-xs font-semibold tabular-nums w-6 text-right"
                style={{ color: 'var(--text-primary)' }}
              >
                {dept.score}
              </span>
            </div>
          ))}
        </div>
        {/* Overall avg */}
        <div className="flex items-center gap-3 pt-2 mt-1">
          <span
            className="text-xs font-semibold w-16 shrink-0"
            style={{ color: 'var(--text-primary)' }}
          >
            Avg
          </span>
          <div className="flex-1 h-1 rounded-full" style={{ background: 'var(--surface-hover)' }}>
            <div
              className="h-1 rounded-full"
              style={{ width: `${avg}%`, background: 'var(--accent-violet)' }}
            />
          </div>
          <span
            className="text-xs font-bold tabular-nums w-6 text-right"
            style={{ color: 'var(--text-primary)' }}
          >
            {avg}
          </span>
        </div>
      </div>
    </div>
  )
}
