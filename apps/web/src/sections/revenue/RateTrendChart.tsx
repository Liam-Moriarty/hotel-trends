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

export default function RateTrendChart() {
  const { data, isLoading, isError } = useRateTrend()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Rate Trend by Room Type</CardTitle>
        <CardDescription>4-week forward pricing schedule</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[220px] animate-pulse rounded-md bg-muted" />
        ) : isError ? (
          <div className="h-[220px] flex items-center justify-center text-destructive text-sm">
            Failed to load rate trend data.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={v => `$${v}`}
              />
              <Tooltip formatter={(v: number | undefined) => (v != null ? `$${v}` : '')} />
              <Legend />
              <Line
                type="monotone"
                dataKey="STD"
                name="Standard"
                stroke="#6366f1"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="DLX"
                name="Deluxe"
                stroke="#06b6d4"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="JNR"
                name="Junior Suite"
                stroke="#f97316"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="STE"
                name="Suite"
                stroke="#eab308"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="PSTE"
                name="Presidential"
                stroke="#ec4899"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
