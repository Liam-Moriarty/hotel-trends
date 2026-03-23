import type { RoomRate } from '@/interface'
import { OccupancyBar } from '@/components/OccupancyBar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  rooms: RoomRate[]
  onApply: (idx: number) => void
}

export function RoomRateTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Room Rate Optimization</CardTitle>
        <CardDescription>AI vs competitor vs current rate comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)', background: 'var(--surface-container-high)' }}
            >
              <th className="text-left pb-3 pt-2 px-2 font-bold">Room Type</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Current Rate</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Comp Set Avg</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">AI Recommended</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Occupancy</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-28" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-14" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-14" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-3 w-24 rounded-full" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-8 w-16 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default function RoomRateTable({ rooms, onApply }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Room Rate Optimization</CardTitle>
        <CardDescription>AI vs competitor vs current rate comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-[11px] font-bold uppercase tracking-widest border-b border-border"
              style={{ color: 'var(--text-muted)', background: 'var(--surface-container-high)' }}
            >
              <th className="text-left pb-3 pt-2 px-2 font-bold">Room Type</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Current Rate</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Comp Set Avg</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">AI Recommended</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Occupancy</th>
              <th className="text-left pb-3 pt-2 px-2 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <tr
                key={room.type}
                className="border-b border-border last:border-0 hover:bg-accent transition-colors"
              >
                <td className="py-3 px-2 font-medium">{room.type}</td>
                <td className="py-3 px-2 font-bold tabular-nums">${room.current}</td>
                <td className="py-3 px-2 text-muted-foreground tabular-nums">${room.compAvg}</td>
                <td className="py-3 px-2">
                  <span
                    className="font-semibold tabular-nums"
                    style={{ color: 'var(--status-success)' }}
                  >
                    ${room.aiRec}
                  </span>
                  <Badge variant="success" className="ml-2 text-xs">
                    +{room.delta}
                  </Badge>
                </td>
                <td className="py-3 px-2">
                  <OccupancyBar pct={room.occupancy} />
                </td>
                <td className="py-3 px-2">
                  <Button
                    size="sm"
                    variant={room.applied ? 'secondary' : 'default'}
                    onClick={() => onApply(i)}
                  >
                    {room.applied ? 'Revert' : 'Apply'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
