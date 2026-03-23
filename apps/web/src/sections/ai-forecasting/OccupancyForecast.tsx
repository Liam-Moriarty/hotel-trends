import { occupancyData } from '@/mocks'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const tooltipStyle = {
  background: 'var(--surface-glass)',
  backdropFilter: 'blur(20px)',
  border: '1px solid var(--border-default)',
  borderRadius: 8,
  color: 'var(--text-primary)',
  fontSize: 12,
}

export default function OccupancyForecast() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Occupancy Forecast</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">With 90% confidence interval</p>
          </div>
          <Badge
            style={{
              background: 'var(--status-info-bg)',
              color: 'var(--accent-cool)',
              borderColor: 'var(--accent-cool)',
            }}
            variant="outline"
          >
            MAPE: 3.2%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={occupancyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              stroke="var(--surface-container-high)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              stroke="var(--text-muted)"
            />
            <YAxis
              domain={[60, 100]}
              tickFormatter={v => `${v}%`}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              stroke="var(--text-muted)"
            />
            <Tooltip
              formatter={(v: number | undefined) => [`${v ?? ''}%`, 'Occupancy']}
              contentStyle={tooltipStyle}
            />
            <Line
              type="monotone"
              dataKey="occ"
              stroke="var(--accent-cool)"
              strokeWidth={2.5}
              dot={{ fill: 'var(--accent-cool)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
