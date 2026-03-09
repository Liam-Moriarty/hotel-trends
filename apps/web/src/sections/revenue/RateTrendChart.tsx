import { rateTrendData } from '@/mocks'
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Rate Trend by Room Type</CardTitle>
        <CardDescription>4-week forward pricing schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={rateTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={v => `$${v}`}
            />
            <Tooltip formatter={(v: number | undefined) => (v != null ? `${v}` : '')} />
            <Legend />
            <Line type="monotone" dataKey="Standard" stroke="#6366f1" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="Deluxe" stroke="#06b6d4" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="Suite" stroke="#eab308" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
