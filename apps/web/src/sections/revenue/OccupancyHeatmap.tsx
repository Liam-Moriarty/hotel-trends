import { useOccupancyHeatmap } from '@/features/revenue-pricing/hooks/useOccupancyHeatmap'
import { heatmapBg } from '@/utils/occupancy'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function OccupancyHeatmapSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="h-5 w-40 rounded bg-muted animate-pulse" />
        <div className="h-4 w-32 rounded bg-muted animate-pulse mt-1" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-xs text-muted-foreground font-medium">
              {d}
            </div>
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, ri) => (
          <div key={ri} className="grid grid-cols-7 gap-1 mb-1">
            {Array.from({ length: 7 }).map((_, ci) => (
              <div key={ci} className="h-7 rounded bg-muted animate-pulse" />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function OccupancyHeatmap() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const { data: heatmapRows, isLoading, isError } = useOccupancyHeatmap(year, month)

  if (isLoading) return <OccupancyHeatmapSkeleton />

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm">Occupancy Heatmap</CardTitle>
        <CardDescription>
          {MONTHS[month]} {year} – by week &amp; day
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <p className="text-sm" style={{ color: 'var(--status-error)' }}>
            Failed to load occupancy data.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d, i) => (
                <div
                  key={i}
                  className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                >
                  {d}
                </div>
              ))}
            </div>
            {(heatmapRows ?? []).map((row, ri) => (
              <div key={ri} className="grid grid-cols-7 gap-1 mb-1">
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`rounded text-center text-xs py-1.5 font-medium tabular-nums ${heatmapBg(cell.value)}`}
                  >
                    {cell.value ?? ''}
                  </div>
                ))}
              </div>
            ))}
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>Low</span>
              <div className="flex gap-1">
                <div className="w-5 h-3 rounded heatmap-low" />
                <div className="w-5 h-3 rounded heatmap-med" />
                <div className="w-5 h-3 rounded heatmap-med-high" />
                <div className="w-5 h-3 rounded heatmap-high" />
              </div>
              <span>High</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
