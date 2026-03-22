import { XCircle, AlertTriangle } from 'lucide-react'
import type { IntegrationCategory } from '../types'

export type FilterId = 'all' | IntegrationCategory

const CATEGORIES: {
  id: FilterId
  label: string
  count: number
  hasError?: boolean
  hasWarning?: boolean
}[] = [
  { id: 'all', label: 'All', count: 15 },
  { id: 'core', label: 'Core Systems', count: 4 },
  { id: 'crm', label: 'Guest & CRM', count: 3 },
  { id: 'distribution', label: 'Distribution', count: 3, hasError: true },
  { id: 'fnb', label: 'F&B & Events', count: 2, hasWarning: true },
  { id: 'building', label: 'Smart Building', count: 3 },
]

export function CategoryFilterPills({
  active,
  onChange,
}: {
  active: FilterId
  onChange: (id: FilterId) => void
}) {
  return (
    <div
      className="flex items-center gap-2 px-5 py-3 flex-wrap shrink-0"
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      {CATEGORIES.map(cat => {
        const isActive = cat.id === active
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors"
            style={
              isActive
                ? {
                    background: 'var(--surface-active)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }
                : {
                    background: 'var(--surface-container-high)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                  }
            }
          >
            {cat.label}
            <span style={{ color: 'var(--text-ghost)' }}>({cat.count})</span>
            {cat.hasError && (
              <XCircle size={10} style={{ color: 'var(--status-error)', marginLeft: 2 }} />
            )}
            {cat.hasWarning && (
              <AlertTriangle size={10} style={{ color: 'var(--status-warning)', marginLeft: 2 }} />
            )}
          </button>
        )
      })}
    </div>
  )
}
