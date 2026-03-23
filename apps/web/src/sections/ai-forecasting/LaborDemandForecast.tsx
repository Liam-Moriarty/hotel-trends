import { labourData } from '@/mocks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const tooltipStyle = {
  background: 'var(--surface-glass)',
  backdropFilter: 'blur(20px)',
  border: '1px solid var(--border-default)',
  borderRadius: 8,
  color: 'var(--text-primary)',
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
            <CartesianGrid
              stroke="var(--surface-container-high)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              stroke="var(--text-muted)"
            />
            <YAxis
              domain={[0, 180]}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              stroke="var(--text-muted)"
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="hours" fill="var(--accent-cool)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
