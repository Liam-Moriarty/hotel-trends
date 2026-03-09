import { depts } from '@/mocks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const avg = (depts.reduce((s, d) => s + d.score, 0) / depts.length).toFixed(1)

export default function DeptPerformance() {
  return (
    <Card className="flex-1">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-sm">Department Performance</CardTitle>
        <CardDescription>Performance index (0–100)</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <div className="flex flex-col gap-3.5">
          {depts.map(d => (
            <div key={d.name}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-muted-foreground">{d.name}</span>
                <span className="text-sm font-semibold text-foreground">{d.score}</span>
              </div>
              <Progress value={d.score} />
            </div>
          ))}
        </div>
        <Separator className="mt-4 mb-3" />
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Overall Avg</span>
          <span className="text-sm font-semibold">{avg} / 100</span>
        </div>
      </CardContent>
    </Card>
  )
}
