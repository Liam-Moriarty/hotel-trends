import {
  energyUsageData,
  foodWasteKgData,
  operationsInventory,
  supplierInsightsData,
} from '@/mocks'
import { useLaborRoster } from '@/features/operations/hooks/useLaborRoster'
import { useRoomStatus } from '@/features/operations/hooks/useRoomStatus'
import { useMaintenanceTasks } from '@/features/operations/hooks/useMaintenanceTasks'
import { OperationsHeader } from '@/sections/operations/OperationsHeader'
import { OperationsKpiCards } from '@/sections/operations/OperationsKpiCards'
import { LaborHousekeepingSection } from '@/sections/operations/LaborHousekeepingSection'
import { EnergyWasteSection } from '@/sections/operations/EnergyWasteSection'
import { ProcurementSupplierSection } from '@/sections/operations/ProcurementSupplierSection'

export default function OperationsPage() {
  const { data: rosterData, isLoading: isRosterLoading } = useLaborRoster()
  const { data: roomsData, isLoading: isRoomsLoading } = useRoomStatus()
  const { data: tasksData, isLoading: isTasksLoading } = useMaintenanceTasks()

  if (isRosterLoading || isRoomsLoading || isTasksLoading) {
    return <div className="p-6 text-muted-foreground">Loading operations data...</div>
  }

  const roster = rosterData ?? []
  const rooms = roomsData ?? []
  const tasks = tasksData ?? []

  const understaffedCount = roster.filter(d => d.staffingStatus === 'Understaffed').length

  return (
    <div className="p-6 space-y-6">
      <OperationsHeader understaffedCount={understaffedCount} />

      <OperationsKpiCards roster={roster} rooms={rooms} tasks={tasks} />

      <LaborHousekeepingSection roster={roster} rooms={rooms} />

      <EnergyWasteSection energyUsage={energyUsageData} foodWaste={foodWasteKgData} />

      <ProcurementSupplierSection
        inventory={operationsInventory}
        suppliers={supplierInsightsData}
      />
    </div>
  )
}
