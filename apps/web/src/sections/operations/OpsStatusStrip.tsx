import { Users, BedDouble, Wrench, Zap } from 'lucide-react'

interface OpsStatusStripProps {
  understaffedCount: number
  roomsReady: number
  totalRooms: number
  maintenanceOpen: number
}

export function OpsStatusStrip({
  understaffedCount,
  roomsReady,
  totalRooms,
  maintenanceOpen,
}: OpsStatusStripProps) {
  type ChipStatus = 'error' | 'warning' | 'success'

  const chips: { icon: React.ReactNode; label: string; detail: string; status: ChipStatus }[] = [
    {
      icon: <Users size={12} />,
      label: `${understaffedCount} Understaffed Depts`,
      detail: understaffedCount > 0 ? 'Requires attention' : 'All staffed',
      status: understaffedCount > 0 ? 'error' : 'success',
    },
    {
      icon: <BedDouble size={12} />,
      label: `${roomsReady} / ${totalRooms} Rooms Ready`,
      detail: roomsReady >= totalRooms * 0.8 ? 'On target' : 'Below target',
      status: totalRooms === 0 || roomsReady >= totalRooms * 0.8 ? 'success' : 'warning',
    },
    {
      icon: <Wrench size={12} />,
      label: `${maintenanceOpen} Maintenance Tasks`,
      detail: 'Open',
      status: maintenanceOpen === 0 ? 'success' : maintenanceOpen <= 3 ? 'warning' : 'error',
    },
    {
      icon: <Zap size={12} />,
      label: 'Energy +8% Budget',
      detail: 'This period',
      status: 'warning' as ChipStatus,
    },
  ]

  const dotColor: Record<ChipStatus, string> = {
    error: 'var(--status-error)',
    warning: 'var(--status-warning)',
    success: 'var(--status-success)',
  }

  return (
    <div className="flex items-center gap-3 shrink-0">
      {chips.map((chip, i) => {
        const isError = chip.status === 'error'
        return (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: 'var(--surface-container)',
              border: `1px solid ${isError ? 'rgba(220, 38, 38, 0.20)' : 'var(--border-subtle)'}`,
              color: isError ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >
            <span style={{ color: dotColor[chip.status] }}>{chip.icon}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0${isError ? ' animate-pulse' : ''}`}
              style={{ background: dotColor[chip.status] }}
            />
            <span className="font-medium">{chip.label}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>{chip.detail}</span>
          </div>
        )
      })}
    </div>
  )
}
