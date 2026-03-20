import { recommendations } from '@/mocks'
import { Brain, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RecommendationEngine() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4" style={{ color: 'var(--accent-violet)' }} />
          <CardTitle className="text-base">AI Recommendation Engine</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map(r => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-lg border border-border/60 p-3 hover:bg-accent/50 transition-colors cursor-pointer group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{r.title}</span>
                <Badge className={`${r.priorityColor} text-white text-xs py-0`}>{r.priority}</Badge>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs font-semibold tabular-nums ${r.impactColor}`}>
                  {r.impact}
                </span>
                <span className="text-xs text-muted-foreground">· {r.category}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${r.conf}%`,
                      background: 'var(--accent-gradient)',
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                  {r.conf}% conf.
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
