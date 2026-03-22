import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import type { EnrichedIntegration } from './types'
import { CATEGORY_LABELS, CATEGORY_ORDER } from './types'
import { CategoryFilterPills, type FilterId } from './components/CategoryFilterPills'
import { PinnedIssueRow } from './components/PinnedIssueRow'
import { IntegrationRow } from './components/IntegrationRow'
import { IntegrationDetailModal } from './components/IntegrationDetailModal'

export function IntegrationHealthView({ integrations }: { integrations: EnrichedIntegration[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [selected, setSelected] = useState<EnrichedIntegration | null>(null)

  const issues = integrations.filter(i => i.status !== 'healthy')
  const healthy = integrations.filter(i => i.status === 'healthy')

  // Issues are NEVER filtered — always pinned
  const filteredHealthy =
    activeFilter === 'all' ? healthy : healthy.filter(i => i.category === activeFilter)

  // Group healthy integrations by category for the "All" view
  const grouped = filteredHealthy.reduce<Record<string, EnrichedIntegration[]>>((acc, i) => {
    const key = i.category
    if (!acc[key]) acc[key] = []
    acc[key].push(i)
    return acc
  }, {})

  const showGroupHeaders = activeFilter === 'all'

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Category filter pills */}
      <CategoryFilterPills active={activeFilter} onChange={setActiveFilter} />

      {/* Pinned issues — always visible, never filtered */}
      {issues.length > 0 && (
        <div className="px-5 py-3 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={12} style={{ color: 'var(--status-warning)' }} />
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--status-warning)' }}
            >
              Requires Attention ({issues.length})
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {issues.map(i => (
              <PinnedIssueRow key={i.id} integration={i} onSelect={() => setSelected(i)} />
            ))}
          </div>
        </div>
      )}

      {/* Healthy divider */}
      <div className="px-5 shrink-0">
        <div className="flex items-center gap-3 py-2">
          <span
            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
            style={{ color: 'var(--text-ghost)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--status-success)' }}
            />
            Healthy ({filteredHealthy.length})
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
        </div>
      </div>

      {/* Scrollable healthy list — intentional internal scroll */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {showGroupHeaders
          ? CATEGORY_ORDER.map(cat => {
              const items = grouped[cat]
              if (!items?.length) return null
              return (
                <div key={cat}>
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest pt-3 pb-1"
                    style={{ color: 'var(--text-ghost)' }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </p>
                  {items.map(i => (
                    <IntegrationRow key={i.id} integration={i} onSelect={() => setSelected(i)} />
                  ))}
                </div>
              )
            })
          : filteredHealthy.map(i => (
              <IntegrationRow key={i.id} integration={i} onSelect={() => setSelected(i)} />
            ))}
      </div>

      {/* Integration detail modal */}
      {selected && (
        <IntegrationDetailModal integration={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
