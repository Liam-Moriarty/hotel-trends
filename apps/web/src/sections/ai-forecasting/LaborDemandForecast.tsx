import { labourData } from '@/mocks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const tooltipStyle = {
  background: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: 8,
  fontSize: 12,
}

export default function LaborDemandForecast() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Labor Demand Forecast</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">Staff hours + overtime projection</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={labourData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis domain={[0, 180]} tick={{ fontSize: 11 }} stroke="#64748b" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="hours" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
