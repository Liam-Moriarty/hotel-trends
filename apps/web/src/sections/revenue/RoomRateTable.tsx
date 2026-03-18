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
        <CardTitle className="text-base">Room Rate Optimization</CardTitle>
        <CardDescription>AI vs competitor vs current rate comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
              <th className="text-left pb-3 font-medium">Room Type</th>
              <th className="text-left pb-3 font-medium">Current Rate</th>
              <th className="text-left pb-3 font-medium">Comp Set Avg</th>
              <th className="text-left pb-3 font-medium">AI Recommended</th>
              <th className="text-left pb-3 font-medium">Occupancy</th>
              <th className="text-left pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3">
                  <Skeleton className="h-4 w-28" />
                </td>
                <td className="py-3">
                  <Skeleton className="h-4 w-14" />
                </td>
                <td className="py-3">
                  <Skeleton className="h-4 w-14" />
                </td>
                <td className="py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="py-3">
                  <Skeleton className="h-3 w-24 rounded-full" />
                </td>
                <td className="py-3">
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
        <CardTitle className="text-base">Room Rate Optimization</CardTitle>
        <CardDescription>AI vs competitor vs current rate comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
              <th className="text-left pb-3 font-medium">Room Type</th>
              <th className="text-left pb-3 font-medium">Current Rate</th>
              <th className="text-left pb-3 font-medium">Comp Set Avg</th>
              <th className="text-left pb-3 font-medium">AI Recommended</th>
              <th className="text-left pb-3 font-medium">Occupancy</th>
              <th className="text-left pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <tr key={room.type} className="border-b border-border last:border-0">
                <td className="py-3 font-medium">{room.type}</td>
                <td className="py-3 font-bold">${room.current}</td>
                <td className="py-3 text-muted-foreground">${room.compAvg}</td>
                <td className="py-3">
                  <span className="text-green-400 font-semibold">${room.aiRec}</span>
                  <Badge
                    variant="secondary"
                    className="ml-2 text-green-400 bg-green-400/10 text-xs"
                  >
                    +{room.delta}
                  </Badge>
                </td>
                <td className="py-3">
                  <OccupancyBar pct={room.occupancy} />
                </td>
                <td className="py-3">
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
