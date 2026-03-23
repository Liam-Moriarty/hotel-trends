import { useState } from 'react'
import type { EnrichedIntegration } from './types'
import { IntegrationHealthView } from './IntegrationHealthView'
import { ArchitectureDiagram } from './components/ArchitectureDiagram'

type Tab = 'health' | 'arch'

const TABS: { value: Tab; label: string }[] = [
  { value: 'health', label: 'Integration Health' },
  { value: 'arch', label: 'Architecture' },
]

export function IntegrationBoardPanel({
  integrations,
  className,
}: {
  integrations: EnrichedIntegration[]
  className?: string
}) {
  const [activeTab, setActiveTab] = useState<Tab>('health')

  return (
    <div
      className={`flex flex-col rounded-xl ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      {/* Tab bar */}
      <div
        className="flex items-end px-5 pt-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        {TABS.map(tab => {
          const isActive = tab.value === activeTab
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="px-4 pb-3 pt-0 text-sm transition-colors"
              style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? '2px solid var(--accent-cool)' : '2px solid transparent',
                marginBottom: -1,
                background: 'transparent',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {activeTab === 'health' ? (
          <IntegrationHealthView integrations={integrations} />
        ) : (
          <div className="flex-1 overflow-y-auto p-5">
            <ArchitectureDiagram />
          </div>
        )}
      </div>
    </div>
  )
}
