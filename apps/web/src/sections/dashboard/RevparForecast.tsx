import { revparData } from '@/mocks'
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

export default function RevparForecast() {
  return (
    <Card className="flex-[2]">
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm">RevPAR Forecast</CardTitle>
            <CardDescription>Actual vs AI-predicted trend (H1 2026)</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full text-[11px]">
            ✦ Confidence 91%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revparData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${v}`}
              domain={[170, 270]}
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
                typeof v === 'number' ? [`$${v}`] : ['']
              }
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 4, fill: 'hsl(var(--primary))' }}
              connectNulls={false}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              dot={false}
              strokeDasharray="6 3"
              connectNulls={false}
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
