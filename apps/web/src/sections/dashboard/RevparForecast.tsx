import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useRevparForecast } from '@/features/dashboard/hooks/useRevparForecast'
import { Sparkles } from 'lucide-react'

export default function RevparForecast() {
  const { data, isLoading } = useRevparForecast()

  return (
    <Card className="flex-[2]">
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm">RevPAR Forecast</CardTitle>
            <CardDescription>Actual vs AI-predicted trend (H1 2026)</CardDescription>
          </div>
          <Badge variant="ai" className="rounded-full text-[11px] gap-1">
            <Sparkles className="h-3 w-3" />
            Confidence 91%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        {isLoading ? (
          <div className="space-y-3 pt-2">
            <Skeleton className="h-[160px] w-full" />
            <div className="flex justify-between">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-6" />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data ?? []} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray=""
                stroke="var(--surface-container-high)"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${v}`}
                domain={[170, 270]}
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
                formatter={(v: number | string | undefined) =>
                  typeof v === 'number' ? [`$${v}`] : ['']
                }
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="var(--accent-cool)"
                strokeWidth={2}
                dot={{ r: 3, fill: 'var(--accent-cool)' }}
                activeDot={{ r: 4 }}
                connectNulls={false}
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="var(--accent-violet)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="6 3"
                connectNulls={false}
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
