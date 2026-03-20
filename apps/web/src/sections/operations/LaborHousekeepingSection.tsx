import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { HubOSRosterEntry, HubOSRoom, RoomStatus } from '@repo/shared'

interface LaborHousekeepingSectionProps {
  roster: HubOSRosterEntry[]
  rooms: HubOSRoom[]
}

const roomStatusColors: Record<RoomStatus, string> = {
  Clean: 'var(--status-success)',
  InProgress: 'var(--status-info)',
  Inspecting: 'var(--status-info)',
  Dirty: 'var(--status-warning)',
  Blocked: 'var(--status-error)',
}

function RoomStatusDot({ status }: { status: RoomStatus }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full"
      style={{ background: roomStatusColors[status] }}
    />
  )
}

function RoomStatusText({ status }: { status: RoomStatus }) {
  return (
    <span className="text-xs font-medium" style={{ color: roomStatusColors[status] }}>
      {status}
    </span>
  )
}

export function LaborHousekeepingSection({ roster, rooms }: LaborHousekeepingSectionProps) {
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
              key={dept.department}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{dept.department}</span>
                  {dept.staffingStatus === 'Understaffed' && (
                    <Badge
                      variant="outline"
                      style={{
                        color: 'var(--status-warning)',
                        borderColor: 'var(--status-warning)',
                      }}
                      className="text-xs px-1.5 py-0"
                    >
                      UNDERSTAFFED
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{`${dept.shiftStart} - ${dept.shiftEnd}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="font-bold text-sm tabular-nums"
                  style={{
                    color:
                      dept.actual < dept.scheduled
                        ? 'var(--status-warning)'
                        : 'var(--status-success)',
                  }}
                >
                  {dept.actual}
                </span>
                <span className="text-sm text-muted-foreground tabular-nums">
                  / {dept.scheduled}
                </span>
                {dept.overtimeHours > 0 && (
                  <Badge variant="destructive" className="text-xs px-1.5 py-0">
                    +{dept.overtimeHours} OT
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
            {(['Clean', 'InProgress', 'Inspecting', 'Dirty', 'Blocked'] as RoomStatus[]).map(s => (
              <span key={s} className="flex items-center gap-1">
                <RoomStatusDot status={s} /> {s}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {rooms.map(t => (
              <div key={t.roomNumber} className="rounded-md border p-2 text-center">
                <p
                  className="text-sm font-bold tabular-nums"
                  style={{ color: roomStatusColors[t.status] }}
                >
                  {t.roomNumber}
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
