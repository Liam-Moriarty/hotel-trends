import { ComposedChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { CompetitorPromo } from '@/interface'
import { externalOccupancyData, externalCompetitors } from '@/mocks'
import { GlassTooltip } from '@/components/GlassTooltip'

// ── Chart data — derive cityAvg from hotel occupancy (+6.2pp premium) ────────

const chartData = externalOccupancyData.map(d => ({
  month: d.month,
  hotel: d.value,
  cityAvg: Math.round(d.value - 6.2),
}))

// ── Legend dot ────────────────────────────────────────────────────────────────

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {dashed ? (
        <div className="w-4 border-t-2 border-dashed" style={{ borderColor: color, height: 0 }} />
      ) : (
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      )}
      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

// ── MarketStat ────────────────────────────────────────────────────────────────

type StatColor = 'cool' | 'violet' | 'success'

const STAT_COLORS: Record<StatColor, string> = {
  cool: 'var(--accent-cool)',
  violet: 'var(--accent-violet)',
  success: 'var(--status-success)',
}

function MarketStat({ label, value, color }: { label: string; value: string; color: StatColor }) {
  return (
    <div
      className="p-2.5 rounded-lg text-center"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-wide"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <p className="text-base font-bold tabular-nums mt-0.5" style={{ color: STAT_COLORS[color] }}>
        {value}
      </p>
    </div>
  )
}

// ── CitywideOccupancyCard ─────────────────────────────────────────────────────

function CitywideOccupancyCard() {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="mb-3 shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Citywide Occupancy Trends
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Hotel performance vs city average
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="extHotelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}%`}
              domain={[60, 100]}
            />
            <Tooltip content={<GlassTooltip />} />
            <Area
              type="monotone"
              dataKey="hotel"
              stroke="var(--accent-cool)"
              strokeWidth={2}
              fill="url(#extHotelGrad)"
              dot={false}
              name="Your Hotel"
            />
            <Line
              type="monotone"
              dataKey="cityAvg"
              stroke="var(--accent-violet)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              name="City Avg"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-1 shrink-0">
        <LegendDot color="var(--accent-cool)" label="Your Hotel" />
        <LegendDot color="var(--accent-violet)" label="City Average" dashed />
      </div>

      {/* 3-stat summary */}
      <div className="grid grid-cols-3 gap-2 mt-3 shrink-0">
        <MarketStat label="Market Share" value="8.4%" color="cool" />
        <MarketStat label="RevPAR Index" value="112.3" color="violet" />
        <MarketStat label="OCC Premium" value="+6.2pp" color="success" />
      </div>
    </div>
  )
}

// ── CompetitorRow ─────────────────────────────────────────────────────────────

function getCompetitorImpactStyle(impactColor: string) {
  if (impactColor === 'destructive')
    return { bg: 'var(--status-error-bg)', color: 'var(--status-error)' }
  if (impactColor === 'default')
    return { bg: 'var(--status-warning-bg)', color: 'var(--status-warning)' }
  return { bg: 'var(--surface-active)', color: 'var(--text-muted)' }
}

function CompetitorRow({ competitor: c }: { competitor: CompetitorPromo }) {
  const style = getCompetitorImpactStyle(c.impactColor)

  return (
    <div className="py-3 px-2 cursor-pointer transition-colors rounded-md hover:bg-[var(--surface-hover)]">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {c.name}
        </span>
        <span
          className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0"
          style={{ background: style.bg, color: style.color }}
        >
          {c.impact}
        </span>
      </div>
      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent-cool)' }}>
        {c.promo}
      </p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
        {c.period}
      </p>
    </div>
  )
}

// ── CompetitorPromotionsCard ──────────────────────────────────────────────────

function CompetitorPromotionsCard() {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
        Competitor Promotions
      </p>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {externalCompetitors.map((c, idx) => (
          <div
            key={idx}
            style={{
              borderBottom:
                idx < externalCompetitors.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}
          >
            <CompetitorRow competitor={c} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function MarketIntelligenceTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <CitywideOccupancyCard />
      <CompetitorPromotionsCard />
    </div>
  )
}
