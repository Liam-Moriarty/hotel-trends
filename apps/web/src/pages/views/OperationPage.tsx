import { operationsInventory, supplierInsightsData } from '@/mocks'
import { useLaborRoster } from '@/features/operations/hooks/useLaborRoster'
import { useRoomStatus } from '@/features/operations/hooks/useRoomStatus'
import { useMaintenanceTasks } from '@/features/operations/hooks/useMaintenanceTasks'
import { useHubOsEnergy } from '@/features/operations/hooks/useHubOsEnergy'
import { useHubOsFoodWaste } from '@/features/operations/hooks/useHubOsFoodWaste'
import { OperationsHeader } from '@/sections/operations/OperationsHeader'
import { OpsStatusStrip } from '@/sections/operations/OpsStatusStrip'
import { OperationsPanel } from '@/sections/operations/OperationsPanel'
import { OperationsPageSkeleton } from '@/sections/operations/OperationsPageSkeleton'

// MOCK: hardcoded to the seeded date — replace with dynamic date when live
const ENERGY_DATE = '2024-01-15'
const FOOD_WASTE_FROM = '2024-01-15'
const FOOD_WASTE_TO = '2024-01-21'

export default function OperationsPage() {
  const { data: rosterData, isLoading: isRosterLoading } = useLaborRoster()
  const { data: roomsData, isLoading: isRoomsLoading } = useRoomStatus()
  const { data: tasksData, isLoading: isTasksLoading } = useMaintenanceTasks()
  const { data: energyData, isLoading: isEnergyLoading } = useHubOsEnergy(ENERGY_DATE)
  const { data: foodWasteData, isLoading: isFoodWasteLoading } = useHubOsFoodWaste(
    FOOD_WASTE_FROM,
    FOOD_WASTE_TO
  )

  if (
    isRosterLoading ||
    isRoomsLoading ||
    isTasksLoading ||
    isEnergyLoading ||
    isFoodWasteLoading
  ) {
    return <OperationsPageSkeleton />
  }

  const roster = rosterData ?? []
  const rooms = roomsData ?? []
  const tasks = tasksData ?? []
  const energyUsage = energyData ?? []
  const foodWaste = foodWasteData ?? []

  const understaffedCount = roster.filter(d => d.staffingStatus === 'Understaffed').length
  const roomsReady = rooms.filter(r => r.status === 'Clean').length
  const maintenanceOpen = tasks.filter(t => t.status === 'Open' || t.status === 'InProgress').length
  const totalStaffed = roster.reduce((s, d) => s + d.actual, 0)
  const totalScheduled = roster.reduce((s, d) => s + d.scheduled, 0)

  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 overflow-hidden">
        <OperationsHeader
          roomsReady={roomsReady}
          totalRooms={rooms.length}
          totalStaffed={totalStaffed}
          totalScheduled={totalScheduled}
          maintenanceOpen={maintenanceOpen}
        />
        <OpsStatusStrip
          understaffedCount={understaffedCount}
          roomsReady={roomsReady}
          totalRooms={rooms.length}
          maintenanceOpen={maintenanceOpen}
        />
        <OperationsPanel
          className="flex-1 min-h-0 max-h-[65%]"
          roster={roster}
          rooms={rooms}
          energyUsage={energyUsage}
          foodWaste={foodWaste}
          inventory={operationsInventory}
          suppliers={supplierInsightsData}
        />
      </main>
    </div>
  )
}
