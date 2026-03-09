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
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-[11px] font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm flex-1">{c.name}</span>
                <span className="text-xs font-semibold text-green-600">{c.roi}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Progress value={c.bar} className="flex-1" />
                <span className="text-xs text-muted-foreground w-6">{c.score}</span>
                <span className="text-xs text-muted-foreground w-9 text-right">{c.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
