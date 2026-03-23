import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { RoasChannel, WastedSpendItem } from '@/interface'

interface RoasChannelSectionProps {
  channels: RoasChannel[]
  wastedSpend: WastedSpendItem[]
}

export function RoasChannelSection({ channels, wastedSpend }: RoasChannelSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ROAS by Channel</CardTitle>
        <CardDescription>Return on ad spend · Benchmark 3.0x</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {channels.map(ch => (
          <div key={ch.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{ch.name}</span>
              <div className="flex items-center gap-2">
                {ch.status && (
                  <Badge variant="destructive" className="text-xs">
                    {ch.status}
                  </Badge>
                )}
                <span
                  className="font-bold tabular-nums"
                  style={{
                    color: ch.roas >= 3 ? 'var(--status-success)' : 'var(--status-error)',
                  }}
                >
                  {ch.roas}x
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className={`${ch.color} h-2 rounded-full`} style={{ width: `${ch.pct}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-16 text-right">
                {ch.spend} spend
              </span>
            </div>
          </div>
        ))}

        {/* Wasted spend alert */}
        <div
          className="mt-4 rounded-md border p-3 space-y-1"
          style={{
            borderColor: 'var(--status-warning)',
            background: 'var(--status-warning-bg)',
          }}
        >
          <p className="text-sm font-semibold flex items-center gap-1">⚠️ Wasted Ad Spend Alerts</p>
          {wastedSpend.map(w => (
            <div key={w.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{w.label}</span>
              <span className="font-medium tabular-nums" style={{ color: 'var(--status-error)' }}>
                {w.amount}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
