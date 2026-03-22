import { useState } from 'react'
import type { HubOSRosterEntry, HubOSRoom } from '@repo/shared'
import type { HubOsEnergyReading, HubOsFoodWaste } from '@repo/shared'
import type { InventoryItem, SupplierInsight } from '@/interface'
import { WorkforceTab } from './tabs/WorkforceTab'
import { FacilitiesTab } from './tabs/FacilitiesTab'
import { ProcurementTab } from './tabs/ProcurementTab'

const TABS = [
  { value: 'workforce', label: 'Workforce' },
  { value: 'facilities', label: 'Facilities & Energy' },
  { value: 'procurement', label: 'Procurement' },
] as const

type TabValue = (typeof TABS)[number]['value']

interface OperationsPanelProps {
  className?: string
  roster: HubOSRosterEntry[]
  rooms: HubOSRoom[]
  energyUsage: HubOsEnergyReading[]
  foodWaste: HubOsFoodWaste[]
  inventory: InventoryItem[]
  suppliers: SupplierInsight[]
}

export function OperationsPanel({
  className = '',
  roster,
  rooms,
  energyUsage,
  foodWaste,
  inventory,
  suppliers,
}: OperationsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabValue>('workforce')

  return (
    <div
      className={`flex flex-col rounded-xl ${className}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      {/* Tab bar */}
      <div
        className="flex px-5 pt-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="px-4 pb-3 pt-0 text-sm transition-colors"
              style={{
                borderBottom: `2px solid ${isActive ? 'var(--accent-cool)' : 'transparent'}`,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 p-5 overflow-hidden">
        {activeTab === 'workforce' && <WorkforceTab roster={roster} rooms={rooms} />}
        {activeTab === 'facilities' && (
          <FacilitiesTab energyUsage={energyUsage} foodWaste={foodWaste} />
        )}
        {activeTab === 'procurement' && (
          <ProcurementTab inventory={inventory} suppliers={suppliers} />
        )}
      </div>
    </div>
  )
}
