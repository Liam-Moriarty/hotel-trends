import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RosterDept, RoomTask, RoomTaskStatus } from '@/interface'

interface LaborHousekeepingSectionProps {
  roster: RosterDept[]
  roomTasks: RoomTask[]
}

function RoomStatusDot({ status }: { status: RoomTaskStatus }) {
  const colors: Record<RoomTaskStatus, string> = {
    Clean: 'bg-green-500',
    'In Progress': 'bg-blue-500',
    Inspecting: 'bg-cyan-400',
    Dirty: 'bg-yellow-500',
    Blocked: 'bg-red-500',
  }
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[status]}`} />
}

function RoomStatusText({ status }: { status: RoomTaskStatus }) {
  const colors: Record<RoomTaskStatus, string> = {
    Clean: 'text-green-500',
    'In Progress': 'text-blue-400',
    Inspecting: 'text-cyan-400',
    Dirty: 'text-yellow-500',
    Blocked: 'text-red-500',
  }
  return <span className={`text-xs font-medium ${colors[status]}`}>{status}</span>
}

export function LaborHousekeepingSection({ roster, roomTasks }: LaborHousekeepingSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Labor Roster Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Labor Roster Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {roster.map(dept => (
            <div
              key={dept.name}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{dept.name}</span>
                  {dept.status === 'understaffed' && (
                    <Badge
                      variant="outline"
                      className="text-yellow-500 border-yellow-500 text-xs px-1.5 py-0"
                    >
                      UNDERSTAFFED
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{dept.shift}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold text-sm ${dept.staffed < dept.required ? 'text-yellow-500' : 'text-green-500'}`}
                >
                  {dept.staffed}
                </span>
                <span className="text-sm text-muted-foreground">/ {dept.required}</span>
                {dept.overtime && (
                  <Badge variant="destructive" className="text-xs px-1.5 py-0">
                    {dept.overtime}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Housekeeping Task Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Housekeeping Task Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
            {(['Clean', 'In Progress', 'Inspecting', 'Dirty', 'Blocked'] as RoomTaskStatus[]).map(
              s => (
                <span key={s} className="flex items-center gap-1">
                  <RoomStatusDot status={s} /> {s}
                </span>
              )
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {roomTasks.map(t => (
              <div key={t.room} className="rounded-md border p-2 text-center">
                <p
                  className={`text-sm font-bold ${
                    t.status === 'Clean'
                      ? 'text-green-500'
                      : t.status === 'In Progress'
                        ? 'text-blue-400'
                        : t.status === 'Inspecting'
                          ? 'text-cyan-400'
                          : t.status === 'Dirty'
                            ? 'text-yellow-500'
                            : 'text-red-500'
                  }`}
                >
                  {t.room}
                </p>
                <RoomStatusText status={t.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
