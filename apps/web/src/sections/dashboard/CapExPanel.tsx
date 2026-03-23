import { capex } from '@/mocks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function CapExPanel() {
  return (
    <Card className="flex-1">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-sm">CapEx Prioritization</CardTitle>
        <CardDescription>AI-ranked investment priorities</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <div className="flex flex-col gap-4">
          {capex.map((c, i) => (
            <div key={c.name}>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold flex-shrink-0"
                  style={{ background: 'var(--surface-active)', color: 'var(--text-muted)' }}
                >
                  {i + 1}
                </span>
                <span className="text-sm flex-1">{c.name}</span>
                <span
                  className="text-xs font-semibold tabular-nums"
                  style={{ color: 'var(--status-success)' }}
                >
                  {c.roi}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Progress value={c.bar} className="flex-1" />
                <span className="text-xs text-muted-foreground w-6 tabular-nums">{c.score}</span>
                <span className="text-xs text-muted-foreground w-9 text-right tabular-nums">
                  {c.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
