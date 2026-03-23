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
                  <stop offset="5%" stopColor="var(--accent-cool)" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="var(--accent-cool)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-violet)" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="var(--accent-violet)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray=""
                stroke="var(--surface-container-high)"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${v / 1000}k`}
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
                  typeof v === 'number' ? [`$${(v / 1000).toFixed(1)}k`] : ['']
                }
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v: string) => (
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    {v === 'actual' ? 'Actual Revenue' : 'Forecast'}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="var(--accent-cool)"
                fill="url(#aGrad)"
                strokeWidth={2}
                dot={false}
                name="actual"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="var(--accent-violet)"
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
