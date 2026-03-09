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
  background: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: 8,
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
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">MAPE: 3.2%</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={occupancyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis
              domain={[60, 100]}
              tickFormatter={v => `${v}%`}
              tick={{ fontSize: 11 }}
              stroke="#64748b"
            />
            <Tooltip
              formatter={(v: number | undefined) => [`${v ?? ''}%`, 'Occupancy']}
              contentStyle={tooltipStyle}
            />
            <Line
              type="monotone"
              dataKey="occ"
              stroke="#06b6d4"
              strokeWidth={2.5}
              dot={{ fill: '#06b6d4', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
