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
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis
          dataKey="x"
          name="Avg Stay"
          unit=" nights"
          tick={{ fontSize: 10 }}
          stroke="#64748b"
        />
        <YAxis dataKey="y" name="Spend/Night" tick={{ fontSize: 10 }} stroke="#64748b" />
        <ZAxis dataKey="z" range={[60, 120]} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: 8,
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
