import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { GlassTooltip } from '@/components/GlassTooltip'
import { guestSentimentTrend } from '@/mocks/hubos-guest-sentiments-adapter'

// Rename month → week for chart XAxis label
const trendData = guestSentimentTrend.map(d => ({ week: d.month, score: d.score }))

const scores = trendData.map(d => d.score)
const currentScore = scores[scores.length - 1]
const highScore = Math.max(...scores)
const lowScore = Math.min(...scores)

// ── SentimentStat ─────────────────────────────────────────────────────────────

type StatColor = 'success' | 'warning' | 'error'

const STAT_COLORS: Record<StatColor, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
}

function SentimentStat({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: StatColor
}) {
  return (
    <div
      className="p-3 rounded-lg text-center"
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
      <p className="text-xl font-bold tabular-nums mt-1" style={{ color: STAT_COLORS[color] }}>
        {value}
      </p>
    </div>
  )
}

// ── Tab export ─────────────────────────────────────────────────────────────────

export function SentimentTrendTab() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 8, right: 40, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[5, 10]}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine
              y={8}
              stroke="var(--status-success)"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{
                value: 'Target 8.0',
                position: 'right',
                fontSize: 9,
                fill: 'var(--status-success)',
              }}
            />
            <Tooltip content={<GlassTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="var(--accent-cool)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: 'var(--surface-container)',
                stroke: 'var(--accent-cool)',
                strokeWidth: 2,
              }}
              activeDot={{ r: 6 }}
              name="Sentiment"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 shrink-0">
        <SentimentStat label="CURRENT SCORE" value={currentScore.toFixed(1)} color="warning" />
        <SentimentStat label="6-WEEK HIGH" value={highScore.toFixed(1)} color="success" />
        <SentimentStat label="6-WEEK LOW" value={lowScore.toFixed(1)} color="error" />
      </div>
    </div>
  )
}
