import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DonutChart } from '@/components/DonutChart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { SentimentBreakdown, SentimentDataPoint } from '@/interface'

interface SentimentSectionProps {
  trend: SentimentDataPoint[]
  breakdown: SentimentBreakdown[]
}

/**
 * Two-column section: a Recharts line chart showing sentiment score trend
 * over 6 months, and a donut chart showing positive / mixed / negative split.
 */
export function SentimentSection({ trend, breakdown }: SentimentSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Trend chart — spans 2/3 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Sentiment Score Trend</CardTitle>
          <p className="text-xs text-muted-foreground">
            Aggregate NLP sentiment score (0–10) over 6 months
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[6, 10]}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4, fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donut breakdown — spans 1/3 */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Breakdown</CardTitle>
          <p className="text-xs text-muted-foreground">All channels · Last 30 days</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <DonutChart data={breakdown} />
          <div className="w-full space-y-1.5">
            {breakdown.map(b => (
              <div key={b.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ background: b.color }}
                  />
                  <span className="text-muted-foreground">{b.label}</span>
                </div>
                <span className="font-semibold" style={{ color: b.color }}>
                  {b.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
