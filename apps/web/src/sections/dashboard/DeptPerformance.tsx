import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeptPerformance } from '@/hooks/useDeptPerformance'

export default function DeptPerformance() {
  const { data: depts, isLoading } = useDeptPerformance()

  console.log(depts)

  const avg =
    depts && depts.length > 0
      ? (depts.reduce((s, d) => s + d.score, 0) / depts.length).toFixed(1)
      : null

  return (
    <Card className="flex-1">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-sm">Department Performance</CardTitle>
        <CardDescription>Performance index (0–100)</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        {isLoading ? (
          // Skeleton: 5 dept rows + separator + avg row
          <div className="flex flex-col gap-3.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-6" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
            <Separator className="mt-0.5 mb-0" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3.5">
              {(depts ?? []).map(d => (
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
          </>
        )}
      </CardContent>
    </Card>
  )
}
