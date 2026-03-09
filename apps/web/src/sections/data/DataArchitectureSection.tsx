import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DataArchitectureSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Architecture Overview</CardTitle>
        <p className="text-sm text-muted-foreground">Central data lake ingestion flow</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {/* Source Systems */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-center text-blue-500">Source Systems</p>
            {['PMS', 'CRS', 'POS', 'MICE'].map(s => (
              <div
                key={s}
                className="bg-muted rounded px-3 py-1.5 text-sm text-center text-muted-foreground"
              >
                {s}
              </div>
            ))}
          </div>

          {/* Cloud Data Lake */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-center text-cyan-500">Cloud Data Lake</p>
            {['Raw Zone', 'Transform', 'Curated'].map(s => (
              <div
                key={s}
                className="bg-cyan-500/10 border border-cyan-500/30 rounded px-3 py-1.5 text-sm text-center text-cyan-500"
              >
                {s}
              </div>
            ))}
          </div>

          {/* AI & Analytics */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-center text-emerald-500">AI & Analytics</p>
            {['Forecasting', 'ML Models', 'Dashboards'].map(s => (
              <div
                key={s}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded px-3 py-1.5 text-sm text-center text-emerald-500"
              >
                {s}
              </div>
            ))}
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-center text-yellow-500">Distribution</p>
            {['Reports', 'Alerts', 'APIs'].map(s => (
              <div
                key={s}
                className="bg-yellow-500/10 border border-yellow-500/30 rounded px-3 py-1.5 text-sm text-center text-yellow-500"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
