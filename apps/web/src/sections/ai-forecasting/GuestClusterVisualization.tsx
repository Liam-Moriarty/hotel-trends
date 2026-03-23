import { clusterData, clusterColors } from '@/mocks'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const GROUPS = ['Business Solo', 'Leisure Family', 'Luxury Couple', 'Conference Group']

function ClusterScatter() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="var(--surface-container-high)" horizontal={true} vertical={false} />
        <XAxis
          dataKey="x"
          name="Avg Stay"
          unit=" nights"
          tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
          stroke="var(--text-muted)"
        />
        <YAxis
          dataKey="y"
          name="Spend/Night"
          tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
          stroke="var(--text-muted)"
        />
        <ZAxis dataKey="z" range={[60, 120]} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            background: 'var(--surface-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-default)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            fontSize: 11,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {GROUPS.map(g => (
          <Scatter
            key={g}
            name={g}
            data={clusterData.filter(d => d.name === g)}
            fill={clusterColors[g]}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default function GuestClusterVisualization() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Guest Cluster Visualization</CardTitle>
        <p className="text-xs text-muted-foreground">
          ML-segmented guest personas — Length of stay vs spend per night
        </p>
      </CardHeader>
      <CardContent>
        <ClusterScatter />
      </CardContent>
    </Card>
  )
}
