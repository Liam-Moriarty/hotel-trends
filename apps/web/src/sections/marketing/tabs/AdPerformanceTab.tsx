import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { adsPerformanceData, roasChannels } from '@/mocks'

const BENCHMARK_ROAS = 3.0
const MAX_ROAS = Math.max(...roasChannels.map(c => c.roas))

// ── Legend dot ────────────────────────────────────────────────────────────────

function LegendDot({
  color,
  label,
  opacity = 1,
}: {
  color: string
  label: string
  opacity?: number
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full" style={{ background: color, opacity }} />
      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

// ── Ads Performance Chart Card ────────────────────────────────────────────────

function AdsPerformanceChartCard() {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="mb-3 shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Google &amp; Meta Ads Performance
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Weekly spend vs revenue generated
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adsPerformanceData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-subtle)" horizontal={true} vertical={false} />
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
              tickFormatter={v => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                fontSize: 12,
              }}
              formatter={(v: number | undefined, n: string | undefined) => [
                `$${((v ?? 0) / 1000).toFixed(1)}k`,
                n === 'googleRevenue'
                  ? 'Google Revenue'
                  : n === 'googleSpend'
                    ? 'Google Spend'
                    : n === 'metaRevenue'
                      ? 'Meta Revenue'
                      : 'Meta Spend',
              ]}
            />
            <Bar
              dataKey="googleRevenue"
              fill="var(--accent-cool)"
              fillOpacity={1}
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="googleSpend"
              fill="var(--accent-cool)"
              fillOpacity={0.3}
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="metaRevenue"
              fill="var(--accent-violet)"
              fillOpacity={1}
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="metaSpend"
              fill="var(--accent-violet)"
              fillOpacity={0.3}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-3 mt-2 shrink-0 flex-wrap">
        <LegendDot color="var(--accent-cool)" label="Google Revenue" />
        <LegendDot color="var(--accent-cool)" opacity={0.4} label="Google Spend" />
        <LegendDot color="var(--accent-violet)" label="Meta Revenue" />
        <LegendDot color="var(--accent-violet)" opacity={0.4} label="Meta Spend" />
      </div>
    </div>
  )
}

// ── ROAS Channel Card ─────────────────────────────────────────────────────────

function RoasChannelRow({ channel }: { channel: (typeof roasChannels)[number] }) {
  const aboveBenchmark = channel.roas >= BENCHMARK_ROAS
  const barColor = aboveBenchmark ? 'var(--status-success)' : 'var(--status-error)'
  const fillPct = (channel.roas / MAX_ROAS) * 100

  return (
    <div className="py-2 cursor-pointer">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {channel.name}
        </span>
        <div className="flex items-center gap-2">
          {!aboveBenchmark && (
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
              style={{
                background: 'var(--status-error-bg)',
                color: 'var(--status-error)',
                border: '1px solid rgba(220, 38, 38, 0.20)',
              }}
            >
              Below target
            </span>
          )}
          <span className="text-sm font-bold tabular-nums" style={{ color: barColor }}>
            {channel.roas}x
          </span>
        </div>
      </div>

      <div className="h-1 w-full rounded-full mb-1" style={{ background: 'var(--surface-hover)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${fillPct}%`, background: barColor }}
        />
      </div>

      <span className="text-[10px] tabular-nums" style={{ color: 'var(--text-muted)' }}>
        {channel.spend} spend
      </span>
    </div>
  )
}

function RoasChannelCard() {
  return (
    <div
      className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="mb-3 shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          ROAS by Channel
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Return on ad spend · Benchmark 3.0x
        </p>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto gap-1">
        {roasChannels.map(ch => (
          <RoasChannelRow key={ch.name} channel={ch} />
        ))}
      </div>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function AdPerformanceTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <AdsPerformanceChartCard />
      <RoasChannelCard />
    </div>
  )
}
