import { operationsInventory, supplierInsightsData } from '@/mocks'
import { useLaborRoster } from '@/features/operations/hooks/useLaborRoster'
import { useRoomStatus } from '@/features/operations/hooks/useRoomStatus'
import { useMaintenanceTasks } from '@/features/operations/hooks/useMaintenanceTasks'
import { useHubOsEnergy } from '@/features/operations/hooks/useHubOsEnergy'
import { useHubOsFoodWaste } from '@/features/operations/hooks/useHubOsFoodWaste'
import { OperationsHeader } from '@/sections/operations/OperationsHeader'
import { OperationsKpiCards } from '@/sections/operations/OperationsKpiCards'
import { LaborHousekeepingSection } from '@/sections/operations/LaborHousekeepingSection'
import { EnergyWasteSection } from '@/sections/operations/EnergyWasteSection'
import { ProcurementSupplierSection } from '@/sections/operations/ProcurementSupplierSection'
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

  return (
    <div className="p-6 space-y-6">
      <OperationsHeader understaffedCount={understaffedCount} />

      <OperationsKpiCards roster={roster} rooms={rooms} tasks={tasks} />

      <LaborHousekeepingSection roster={roster} rooms={rooms} />

      <EnergyWasteSection energyUsage={energyUsage} foodWaste={foodWaste} />

      <ProcurementSupplierSection
        inventory={operationsInventory}
        suppliers={supplierInsightsData}
      />
    </div>
  )
}
