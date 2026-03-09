import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { TouchpointScore } from '@/interface'

interface TouchpointBreakdownProps {
  touchpoints: TouchpointScore[]
}

/**
 * Horizontal bar chart (pure CSS) showing NLP sentiment scores per service
 * touchpoint (Check-in, Room Quality, F&B, etc.) out of 10.
 */
export function TouchpointBreakdown({ touchpoints }: TouchpointBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment by Touchpoint</CardTitle>
        <p className="text-xs text-muted-foreground">Score out of 10</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {touchpoints.map(t => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-28 shrink-0 text-right">
              {t.label}
            </span>
            <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(t.score / 10) * 100}%`,
                  background: t.color,
                }}
              />
            </div>
            <span className="text-sm font-medium w-6 text-right">{t.score}</span>
          </div>
        ))}
        <div className="flex justify-between text-xs text-muted-foreground pt-1 pl-32">
          <span>0</span>
          <span>3</span>
          <span>6</span>
          <span>10</span>
        </div>
      </CardContent>
    </Card>
  )
}
