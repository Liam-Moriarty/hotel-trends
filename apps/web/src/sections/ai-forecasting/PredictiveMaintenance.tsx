import { maintenanceAlerts } from '@/mocks'
import { RingIndicator } from '@/components/RingIndicator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PredictiveMaintenance() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Predictive Maintenance Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {maintenanceAlerts.map((m, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
            <RingIndicator pct={m.pct} color={m.color} size={44} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.eta}</p>
            </div>
            <div className="text-right shrink-0">
              <p
                className="font-semibold text-sm tabular-nums"
                style={{ color: 'var(--status-warning)' }}
              >
                {m.cost}
              </p>
              <p className="text-xs text-muted-foreground">est. repair</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
