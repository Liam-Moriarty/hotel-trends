import { useRateTrend } from '@/features/revenue-pricing/hooks/useRateTrend'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Chart uses accent-cool, accent-violet, and the three status colors — no other hues
const LINE_COLORS = {
  STD: 'var(--accent-cool)',
  DLX: 'var(--accent-violet)',
  JNR: 'var(--status-warning)',
  STE: 'var(--status-success)',
  PSTE: 'var(--status-error)',
}

export default function RateTrendChart() {
  const { data, isLoading, isError } = useRateTrend()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Rate Trend by Room Type</CardTitle>
        <CardDescription>4-week forward pricing schedule</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[220px] animate-pulse rounded-md bg-muted" />
        ) : isError ? (
          <div
            className="h-[220px] flex items-center justify-center text-sm"
            style={{ color: 'var(--status-error)' }}
          >
            Failed to load rate trend data.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray=""
                stroke="var(--surface-container-high)"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                tickFormatter={v => `$${v}`}
                axisLine={false}
                tickLine={false}
                stroke="var(--surface-hover)"
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--surface-glass)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 8,
                  fontSize: 12,
                  color: 'var(--text-primary)',
                }}
                formatter={(v: number | undefined) => (v != null ? `$${v}` : '')}
              />
              <Legend
                formatter={(v: string) => (
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{v}</span>
                )}
              />
              {(Object.entries(LINE_COLORS) as [keyof typeof LINE_COLORS, string][]).map(
                ([key, color]) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={
                      key === 'STD'
                        ? 'Standard'
                        : key === 'DLX'
                          ? 'Deluxe'
                          : key === 'JNR'
                            ? 'Junior Suite'
                            : key === 'STE'
                              ? 'Suite'
                              : 'Presidential'
                    }
                    stroke={color}
                    dot={false}
                    strokeWidth={2}
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
