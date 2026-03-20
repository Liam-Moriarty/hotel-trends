import { churnGuests } from '@/mocks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const loyaltyStats = [
  { label: 'Likely to Return', value: '2,841', pct: '62%', color: 'var(--status-success)' },
  { label: 'At-Risk Guests', value: '784', pct: '17%', color: 'var(--status-warning)' },
  { label: 'Likely Churned', value: '412', pct: '9%', color: 'var(--status-error)' },
]

export default function LoyaltyChurnPrediction() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Loyalty vs Churn Prediction</CardTitle>
        <p className="text-xs text-muted-foreground">Guest retention model — next 30 days</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {loyaltyStats.map(s => (
            <div key={s.label} className="rounded-lg border border-border/60 p-3 text-center">
              <p className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="text-sm font-medium tabular-nums" style={{ color: s.color }}>
                {s.pct}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Top at-risk high-value guests:</p>
          <div className="space-y-2">
            {churnGuests.map((g, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-2.5"
              >
                <div
                  className={`h-8 w-8 rounded-full ${g.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {g.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{g.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {g.stays} · {g.ltv}
                  </p>
                </div>
                <span
                  className="text-sm font-semibold shrink-0 tabular-nums"
                  style={{ color: 'var(--status-warning)' }}
                >
                  {g.churn}% churn
                </span>
                <Button size="sm" variant="outline" className="text-xs h-7 px-2 shrink-0">
                  Outreach
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
