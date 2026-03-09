import {
  rosterData,
  operationsRoomTasks,
  energyUsageData,
  foodWasteKgData,
  operationsInventory,
  supplierInsightsData,
} from '@/mocks'
import { OperationsHeader } from '@/sections/operations/OperationsHeader'
import { OperationsKpiCards } from '@/sections/operations/OperationsKpiCards'
import { LaborHousekeepingSection } from '@/sections/operations/LaborHousekeepingSection'
import { EnergyWasteSection } from '@/sections/operations/EnergyWasteSection'
import { ProcurementSupplierSection } from '@/sections/operations/ProcurementSupplierSection'

export default function OperationsPage() {
  const understaffedCount = rosterData.filter(d => d.status === 'understaffed').length

  return (
    <div className="p-6 space-y-6">
      <OperationsHeader understaffedCount={understaffedCount} />

      <OperationsKpiCards />

      <LaborHousekeepingSection roster={rosterData} roomTasks={operationsRoomTasks} />

      <EnergyWasteSection energyUsage={energyUsageData} foodWaste={foodWasteKgData} />

      <ProcurementSupplierSection
        inventory={operationsInventory}
        suppliers={supplierInsightsData}
      />
    </div>
  )
}
