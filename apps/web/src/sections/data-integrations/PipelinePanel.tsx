import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { GlassTooltip } from '@/components/GlassTooltip'
import { throughputData } from '@/mocks'

function DataLakeStat({
  label,
  value,
  badge,
}: {
  label: string
  value: string
  badge?: { text: string; status: 'success' | 'warning' | 'error' }
}) {
  const BADGE_COLORS = {
    success: { bg: 'var(--status-success-bg)', color: 'var(--status-success)' },
    warning: { bg: 'var(--status-warning-bg)', color: 'var(--status-warning)' },
    error: { bg: 'var(--status-error-bg)', color: 'var(--status-error)' },
  }

  return (
    <div
      className="flex flex-col justify-between p-3 rounded-lg"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-widest"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-lg font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
          {value}
        </p>
        {badge && (
          <span
            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
            style={{
              background: BADGE_COLORS[badge.status].bg,
              color: BADGE_COLORS[badge.status].color,
            }}
          >
            {badge.text}
          </span>
        )}
      </div>
    </div>
  )
}

export function PipelinePanel({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl p-4 ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Data Pipeline Throughput
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Records / hour — Today
          </p>
        </div>
        <span
          className="flex items-center gap-1.5 text-[10px] font-bold"
          style={{ color: 'var(--status-success)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--status-success)' }}
          />
          Pipeline Healthy
        </span>
      </div>

      {/* Area chart */}
      <div className="shrink-0" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={throughputData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border-subtle)" horizontal={true} vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v / 1000}k`}
            />
            <Tooltip content={<GlassTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent-cool)"
              strokeWidth={2}
              fill="url(#pipelineGrad)"
              dot={false}
              name="Records/hr"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Cloud Data Lake stats — 2×2 grid */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        <DataLakeStat label="TOTAL INGESTED" value="2.4 TB" />
        <DataLakeStat label="RECORDS TODAY" value="1.2M" />
        <DataLakeStat label="API CALLS / HR" value="48.4K" />
        <DataLakeStat
          label="DATA FRESHNESS"
          value="< 5 min"
          badge={{ text: 'LIVE', status: 'success' }}
        />
      </div>
    </div>
  )
}
