import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckSquare, Clock, Zap, Wrench } from 'lucide-react'
import type { HubOSRoom, HubOSRosterEntry, HubOSTask } from '@repo/shared'

interface OperationsKpiCardsProps {
  rooms: HubOSRoom[]
  roster: HubOSRosterEntry[]
  tasks: HubOSTask[]
}

export function OperationsKpiCards({ rooms, roster, tasks }: OperationsKpiCardsProps) {
  const readyRooms = rooms.filter(r => r.status === 'Clean').length
  const totalRooms = rooms.length
  const roomProgress = totalRooms > 0 ? (readyRooms / totalRooms) * 100 : 0

  const scheduledStaff = roster.reduce((sum, r) => sum + r.scheduled, 0)
  const actualStaff = roster.reduce((sum, r) => sum + r.actual, 0)
  const staffProgress = scheduledStaff > 0 ? (actualStaff / scheduledStaff) * 100 : 0

  const openTasks = tasks.filter(t => t.status === 'Open' || t.status === 'InProgress').length
  const taskProgress = tasks.length > 0 ? (openTasks / tasks.length) * 100 : 0

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Rooms Ready</p>
            <CheckSquare className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2 tabular-nums">
            {readyRooms}/{totalRooms}
          </p>
          <Progress value={roomProgress} className="mt-3 h-1.5" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Staff On Shift</p>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2 tabular-nums">
            {actualStaff}/{scheduledStaff}
          </p>
          <Progress value={staffProgress} className="mt-3 h-1.5" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Energy vs Budget</p>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2 tabular-nums">+8%</p>
          <Progress value={58} className="mt-3 h-1.5" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Maintenance Open</p>
            <Wrench className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2 tabular-nums">
            {openTasks} {openTasks === 1 ? 'Task' : 'Tasks'}
          </p>
          <Progress value={taskProgress} className="mt-3 h-1.5 [&>div]:bg-[var(--status-error)]" />
        </CardContent>
      </Card>
    </div>
  )
}
