import { BedDouble, Users, Zap, Wrench } from 'lucide-react'
import { KpiPill } from '@/components/KpiPill'

interface OperationsHeaderProps {
  roomsReady: number
  totalRooms: number
  totalStaffed: number
  totalScheduled: number
  maintenanceOpen: number
}

export function OperationsHeader({
  roomsReady,
  totalRooms,
  totalStaffed,
  totalScheduled,
  maintenanceOpen,
}: OperationsHeaderProps) {
  const roomStatus =
    totalRooms === 0
      ? 'neutral'
      : roomsReady >= totalRooms * 0.8
        ? 'success'
        : roomsReady >= totalRooms * 0.5
          ? 'warning'
          : 'error'

  const staffStatus =
    totalScheduled === 0
      ? 'neutral'
      : totalStaffed >= totalScheduled
        ? 'success'
        : totalStaffed >= totalScheduled * 0.9
          ? 'warning'
          : 'error'

  const maintStatus = maintenanceOpen === 0 ? 'success' : maintenanceOpen <= 3 ? 'warning' : 'error'

  return (
    <div className="flex items-start justify-between shrink-0">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Operations
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Labor, housekeeping, energy, procurement &amp; maintenance
        </p>
      </div>

      <div className="flex items-center gap-2">
        <KpiPill
          icon={<BedDouble size={12} />}
          label="ROOMS READY"
          value={`${roomsReady}/${totalRooms}`}
          status={roomStatus}
        />
        <KpiPill
          icon={<Users size={12} />}
          label="STAFF ON SHIFT"
          value={`${totalStaffed}/${totalScheduled}`}
          status={staffStatus}
        />
        <KpiPill icon={<Zap size={12} />} label="ENERGY VS BUDGET" value="+8%" status="warning" />
        <KpiPill
          icon={<Wrench size={12} />}
          label="MAINT. OPEN"
          value={`${maintenanceOpen} Tasks`}
          status={maintStatus}
        />
      </div>
    </div>
  )
}
