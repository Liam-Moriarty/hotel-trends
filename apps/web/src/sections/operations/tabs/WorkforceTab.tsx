import type { HubOSRosterEntry, HubOSRoom, RoomStatus } from '@repo/shared'

const DEPT_LABELS: Record<string, string> = {
  FrontDesk: 'Front Desk',
  Housekeeping: 'Housekeeping',
  FBRestaurant: 'F&B Restaurant',
  FBBar: 'F&B Bar',
  SpaWellness: 'Spa & Wellness',
  Maintenance: 'Maintenance',
  Concierge: 'Concierge',
}

const HK_COLORS: Record<RoomStatus, string> = {
  Clean: 'var(--status-success)',
  Dirty: 'var(--status-warning)',
  InProgress: 'var(--status-info)',
  Inspecting: 'var(--accent-violet)',
  Blocked: 'var(--status-error)',
}

const HK_BG: Record<RoomStatus, string> = {
  Clean: 'var(--status-success-bg)',
  Dirty: 'var(--status-warning-bg)',
  InProgress: 'var(--status-info-bg)',
  Inspecting: 'var(--accent-violet-muted)',
  Blocked: 'var(--status-error-bg)',
}

const HK_STATUS_LABELS: Record<RoomStatus, string> = {
  Clean: 'CLEAN',
  Dirty: 'DIRTY',
  InProgress: 'IN PROG',
  Inspecting: 'INSP',
  Blocked: 'BLOCKED',
}

function ShiftStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1 rounded-md"
      style={{ background: 'var(--surface-container-high)' }}
    >
      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
      <span className="text-xs font-semibold tabular-nums" style={{ color }}>
        {value}
      </span>
    </div>
  )
}

function LaborRosterCard({ roster }: { roster: HubOSRosterEntry[] }) {
  const totalActual = roster.reduce((s, d) => s + d.actual, 0)
  const totalScheduled = roster.reduce((s, d) => s + d.scheduled, 0)
  const overtimeDepts = roster.filter(
    d => d.overtimeHours > 0 || d.staffingStatus === 'Overstaffed'
  ).length
  const understaffedDepts = roster.filter(d => d.staffingStatus === 'Understaffed').length

  return (
    <div
      className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="flex items-center justify-between mb-3 shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Labor Roster Dashboard
        </p>
        <span className="text-[10px] tabular-nums" style={{ color: 'var(--text-muted)' }}>
          Today
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3 shrink-0 flex-wrap">
        <ShiftStat
          label="On Shift"
          value={`${totalActual}/${totalScheduled}`}
          color="var(--status-success)"
        />
        <ShiftStat
          label="Overtime"
          value={`${overtimeDepts} depts`}
          color="var(--status-warning)"
        />
        <ShiftStat
          label="Understaffed"
          value={`${understaffedDepts} depts`}
          color="var(--status-error)"
        />
      </div>

      <div className="flex flex-col gap-0.5 overflow-y-auto flex-1">
        {roster.map((dept, i) => {
          const isUnderstaffed = dept.staffingStatus === 'Understaffed'
          const hasOT = dept.overtimeHours > 0
          const dotColor = isUnderstaffed
            ? 'var(--status-error)'
            : hasOT || dept.staffingStatus === 'Overstaffed'
              ? 'var(--status-warning)'
              : 'var(--status-success)'

          return (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors"
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0${isUnderstaffed ? ' animate-pulse' : ''}`}
                style={{ background: dotColor }}
              />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {DEPT_LABELS[dept.department] ?? dept.department}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {dept.shiftStart}–{dept.shiftEnd}
              </span>
              {isUnderstaffed && (
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{
                    background: 'var(--status-error-bg)',
                    color: 'var(--status-error)',
                    border: '1px solid rgba(220, 38, 38, 0.20)',
                  }}
                >
                  Understaffed
                </span>
              )}
              <div className="ml-auto flex items-center gap-2">
                <span
                  className="text-xs font-semibold tabular-nums"
                  style={{
                    color: isUnderstaffed
                      ? 'var(--status-error)'
                      : hasOT
                        ? 'var(--status-warning)'
                        : 'var(--text-primary)',
                  }}
                >
                  {dept.actual} / {dept.scheduled}
                </span>
                {hasOT && (
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: 'var(--status-warning)' }}
                  >
                    +{dept.overtimeHours}h OT
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function HousekeepingTrackerCard({ rooms }: { rooms: HubOSRoom[] }) {
  const statusCounts = rooms.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1
      return acc
    },
    {} as Partial<Record<RoomStatus, number>>
  )

  const statusItems: { status: RoomStatus; label: string }[] = [
    { status: 'Clean', label: 'CLEAN' },
    { status: 'Dirty', label: 'DIRTY' },
    { status: 'InProgress', label: 'IN PROG' },
    { status: 'Inspecting', label: 'INSP' },
    { status: 'Blocked', label: 'BLOCKED' },
  ]

  return (
    <div
      className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
        Housekeeping Task Tracker
      </p>

      <div className="flex items-center gap-3 mb-3 shrink-0 flex-wrap">
        {statusItems.map(({ status, label }) => (
          <div key={status} className="flex items-center gap-1 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: HK_COLORS[status] }} />
            <span style={{ color: 'var(--text-muted)' }}>{label}</span>
            <span className="font-bold tabular-nums" style={{ color: HK_COLORS[status] }}>
              {statusCounts[status] ?? 0}
            </span>
          </div>
        ))}
      </div>

      <div
        className="grid gap-2 overflow-y-auto flex-1 content-start"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {rooms.map(room => (
          <div
            key={room.roomNumber}
            className="flex flex-col items-center justify-center rounded-md cursor-pointer transition-all"
            style={{
              border: `1px solid ${HK_COLORS[room.status]}`,
              background: HK_BG[room.status],
              height: '64px',
            }}
          >
            <span
              className="text-sm font-bold tabular-nums"
              style={{ color: 'var(--text-primary)' }}
            >
              {room.roomNumber}
            </span>
            <span
              className="text-[10px] font-bold uppercase"
              style={{ color: HK_COLORS[room.status] }}
            >
              {HK_STATUS_LABELS[room.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface WorkforceTabProps {
  roster: HubOSRosterEntry[]
  rooms: HubOSRoom[]
}

export function WorkforceTab({ roster, rooms }: WorkforceTabProps) {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <LaborRosterCard roster={roster} />
      <HousekeepingTrackerCard rooms={rooms} />
    </div>
  )
}
