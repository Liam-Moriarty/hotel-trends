import { occupancyColor } from '@/utils/occupancy'

export function OccupancyBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${occupancyColor(pct)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground">{pct}%</span>
    </div>
  )
}
