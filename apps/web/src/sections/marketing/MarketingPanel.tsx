import { useState } from 'react'
import { CampaignsAlertsTab } from './tabs/CampaignsAlertsTab'
import { AdPerformanceTab } from './tabs/AdPerformanceTab'
import { ConversionAttributionTab } from './tabs/ConversionAttributionTab'

const TABS = [
  { value: 'campaigns', label: 'Campaigns & Alerts' },
  { value: 'adperf', label: 'Ad Performance' },
  { value: 'conversion', label: 'Conversion & Attribution' },
] as const

type TabValue = (typeof TABS)[number]['value']

export function MarketingPanel({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TabValue>('campaigns')

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
        {activeTab === 'campaigns' && <CampaignsAlertsTab />}
        {activeTab === 'adperf' && <AdPerformanceTab />}
        {activeTab === 'conversion' && <ConversionAttributionTab />}
      </div>
    </div>
  )
}
