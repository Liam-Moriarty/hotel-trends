import {
  energyUsageData,
  foodWasteKgData,
  operationsInventory,
  supplierInsightsData,
} from '@/mocks'
import { useLaborRoster } from '@/features/operations/hooks/useLaborRoster'
import { useRoomStatus } from '@/features/operations/hooks/useRoomStatus'
import { OperationsHeader } from '@/sections/operations/OperationsHeader'
import { OperationsKpiCards } from '@/sections/operations/OperationsKpiCards'
import { LaborHousekeepingSection } from '@/sections/operations/LaborHousekeepingSection'
import { EnergyWasteSection } from '@/sections/operations/EnergyWasteSection'
import { ProcurementSupplierSection } from '@/sections/operations/ProcurementSupplierSection'

export default function OperationsPage() {
  const { data: rosterData, isLoading: isRosterLoading } = useLaborRoster()
  const { data: roomsData, isLoading: isRoomsLoading } = useRoomStatus()

  if (isRosterLoading || isRoomsLoading) {
    return <div className="p-6 text-muted-foreground">Loading operations data...</div>
  }

  const roster = rosterData ?? []
  const rooms = roomsData ?? []

  const understaffedCount = roster.filter(d => d.staffingStatus === 'Understaffed').length

  return (
    <div className="p-6 space-y-6">
      <OperationsHeader understaffedCount={understaffedCount} />

      <OperationsKpiCards />

      <LaborHousekeepingSection roster={roster} rooms={rooms} />

      <EnergyWasteSection energyUsage={energyUsageData} foodWaste={foodWasteKgData} />

      <ProcurementSupplierSection
        inventory={operationsInventory}
        suppliers={supplierInsightsData}
      />
    </div>
  )
}
