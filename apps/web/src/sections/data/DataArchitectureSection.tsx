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
            <p
              className="text-sm font-semibold text-center"
              style={{ color: 'var(--status-info)' }}
            >
              Source Systems
            </p>
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
            <p
              className="text-sm font-semibold text-center"
              style={{ color: 'var(--accent-cool)' }}
            >
              Cloud Data Lake
            </p>
            {['Raw Zone', 'Transform', 'Curated'].map(s => (
              <div
                key={s}
                className="rounded px-3 py-1.5 text-sm text-center"
                style={{
                  background: 'var(--status-info-bg)',
                  border: '1px solid var(--accent-cool)',
                  color: 'var(--accent-cool)',
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {/* AI & Analytics */}
          <div className="space-y-2">
            <p
              className="text-sm font-semibold text-center"
              style={{ color: 'var(--status-success)' }}
            >
              AI & Analytics
            </p>
            {['Forecasting', 'ML Models', 'Dashboards'].map(s => (
              <div
                key={s}
                className="rounded px-3 py-1.5 text-sm text-center"
                style={{
                  background: 'var(--status-success-bg)',
                  border: '1px solid var(--status-success)',
                  color: 'var(--status-success)',
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            <p
              className="text-sm font-semibold text-center"
              style={{ color: 'var(--status-warning)' }}
            >
              Distribution
            </p>
            {['Reports', 'Alerts', 'APIs'].map(s => (
              <div
                key={s}
                className="rounded px-3 py-1.5 text-sm text-center"
                style={{
                  background: 'var(--status-warning-bg)',
                  border: '1px solid var(--status-warning)',
                  color: 'var(--status-warning)',
                }}
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
