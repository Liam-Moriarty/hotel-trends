import { heatmapRows } from '@/mocks'
import { heatmapBg } from '@/utils/occupancy'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function OccupancyHeatmap() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Occupancy Heatmap</CardTitle>
        <CardDescription>March 2026 – by week &amp; day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-xs text-muted-foreground font-medium">
              {d}
            </div>
          ))}
        </div>
        {heatmapRows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-7 gap-1 mb-1">
            {row.map((cell, ci) => (
              <div
                key={ci}
                className={`rounded text-center text-xs py-1.5 font-medium ${heatmapBg(cell.value)}`}
              >
                {cell.value ?? ''}
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-5 h-3 rounded bg-slate-700" />
            <div className="w-5 h-3 rounded bg-indigo-400" />
            <div className="w-5 h-3 rounded bg-indigo-600" />
          </div>
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  )
}
