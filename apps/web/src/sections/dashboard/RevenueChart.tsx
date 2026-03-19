import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useRevenueChart } from '@/features/dashboard/hooks/useRevenueChart'

export default function RevenueChart() {
  const { data, isLoading } = useRevenueChart()

  return (
    <Card className="flex-[2]">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-sm">Revenue &amp; Occupancy</CardTitle>
        <CardDescription>This week vs forecast</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        {isLoading ? (
          // Skeleton matches the chart's 200px height
          <div className="space-y-3 pt-2">
            <div className="flex gap-2">
              <Skeleton className="h-[160px] flex-1" />
            </div>
            <div className="flex justify-between">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-6" />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data ?? []} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(v: number | string | undefined) =>
                  typeof v === 'number' ? [`$${(v / 1000).toFixed(1)}k`] : ['']
                }
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v: string) => (
                  <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: 11 }}>
                    {v === 'actual' ? 'Actual Revenue' : 'Forecast'}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                fill="url(#aGrad)"
                strokeWidth={2}
                dot={false}
                name="actual"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--muted-foreground))"
                fill="url(#fGrad)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 3"
                name="forecast"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
