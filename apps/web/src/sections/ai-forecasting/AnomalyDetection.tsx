import { anomalies } from '@/mocks'
import { Activity, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnomalyDetection() {
  const activeCount = anomalies.filter(a => !a.resolved).length
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-red-400" />
            <CardTitle className="text-base">Anomaly Detection</CardTitle>
          </div>
          <Badge variant="destructive">{activeCount} Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {anomalies.map(a => (
          <div
            key={a.id}
            className={`flex items-start gap-3 rounded-lg p-3 ${a.bg} border border-border/40`}
          >
            <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${a.color}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{a.title}</span>
                <span className={`text-sm font-semibold ${a.color}`}>{a.delta}</span>
                {a.resolved && (
                  <Badge
                    variant="outline"
                    className="text-green-400 border-green-500/40 text-xs py-0"
                  >
                    ✓ Resolved
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{a.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
