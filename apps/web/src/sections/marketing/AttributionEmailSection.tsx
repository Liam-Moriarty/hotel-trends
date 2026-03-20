import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { AttributionDataPoint, AttributionMode, EmailCampaign } from '@/interface'

interface AttributionEmailSectionProps {
  attributionData: AttributionDataPoint[]
  attributionColors: Record<string, string>
  emailCampaigns: EmailCampaign[]
}

export function AttributionEmailSection({
  attributionData,
  attributionColors,
  emailCampaigns,
}: AttributionEmailSectionProps) {
  const [attributionMode, setAttributionMode] = useState<AttributionMode>('Linear')
  const maxAttr = Math.max(...attributionData.map(d => d.value))

  return (
    <div className="space-y-4">
      {/* Attribution Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attribution Analysis</CardTitle>
              <CardDescription>Channel contribution % to bookings</CardDescription>
            </div>
            <div className="flex gap-1">
              {(['First Touch', 'Last Touch', 'Linear'] as AttributionMode[]).map(mode => (
                <Button
                  key={mode}
                  variant={attributionMode === mode ? 'default' : 'ghost'}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setAttributionMode(mode)}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {attributionData.map(d => (
            <div key={d.channel} className="flex items-center gap-3">
              <span className="text-sm w-24 text-right text-muted-foreground shrink-0">
                {d.channel}
              </span>
              <div className="flex-1 bg-muted rounded-full h-4">
                <div
                  className="h-4 rounded-full"
                  style={{
                    width: `${(d.value / maxAttr) * 100}%`,
                    backgroundColor: attributionColors[d.channel],
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8 tabular-nums">{d.value}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Email Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Email Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emailCampaigns.map(c => (
            <div key={c.name} className="rounded-md border p-3 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{c.name}</span>
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: 'var(--status-success)' }}
                >
                  {c.revenue}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>
                  <span className="tabular-nums">{c.sent.toLocaleString()}</span>{' '}
                  <span className="block">Sent</span>
                </span>
                <span>
                  <span className="tabular-nums">{c.opens}</span>{' '}
                  <span className="block">Opens</span>
                </span>
                <span>
                  <span className="tabular-nums">{c.clicks}</span>{' '}
                  <span className="block">Clicks</span>
                </span>
                <span>
                  <span className="tabular-nums">{c.bookings}</span>{' '}
                  <span className="block">Bookings</span>
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
