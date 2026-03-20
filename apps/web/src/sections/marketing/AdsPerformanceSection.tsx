import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { AdsPerformanceDataPoint, FunnelStep } from '@/interface'

interface AdsPerformanceSectionProps {
  adsData: AdsPerformanceDataPoint[]
  funnelSteps: FunnelStep[]
}

export function AdsPerformanceSection({ adsData, funnelSteps }: AdsPerformanceSectionProps) {
  const maxVal = funnelSteps[0]?.value ?? 1

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Ads bar chart */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Google &amp; Meta Ads Performance</CardTitle>
          <CardDescription>Weekly spend vs revenue generated</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={adsData} barCategoryGap="30%">
              <CartesianGrid
                stroke="var(--surface-container-high)"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-muted)' }}
              />
              <YAxis
                tickFormatter={v => `$${v / 1000}k`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-muted)' }}
              />
              <Tooltip
                formatter={(v: number | undefined) => `$${v?.toLocaleString()}`}
                contentStyle={{
                  background: 'var(--surface-glass)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 8,
                  color: 'var(--text-primary)',
                }}
              />
              <Legend />
              <Bar
                dataKey="googleSpend"
                name="Google Spend"
                fill="var(--accent-cool)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="metaSpend"
                name="Meta Spend"
                fill="var(--accent-violet)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="googleRevenue"
                name="Google Revenue"
                fill="var(--accent-cool-muted)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="metaRevenue"
                name="Meta Revenue"
                fill="var(--accent-violet-muted)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Booking funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Website Booking Funnel</CardTitle>
          <CardDescription>This month conversion flow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {funnelSteps.map((step, i) => {
            const pct = Math.round((step.value / maxVal) * 100)
            return (
              <div key={step.label}>
                <div className="flex items-center justify-between">
                  <div
                    className={`${step.color} text-white text-xs font-medium px-3 py-1.5 rounded flex items-center justify-between`}
                    style={{ width: `${pct}%`, minWidth: '60%' }}
                  >
                    <span>{step.label}</span>
                  </div>
                  <span className="text-sm font-semibold ml-2 whitespace-nowrap tabular-nums">
                    {step.value.toLocaleString()}
                  </span>
                </div>
                {step.dropOff && (
                  <p className="text-xs ml-1 mt-0.5" style={{ color: 'var(--status-error)' }}>
                    ▼ {step.dropOff}
                  </p>
                )}
                {!step.dropOff && i === funnelSteps.length - 1 && (
                  <p className="text-xs ml-1 mt-0.5" style={{ color: 'var(--status-success)' }}>
                    Overall conv. rate: 1.95%
                  </p>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
