import { Sparkles } from 'lucide-react'
import type { InventoryItem, SupplierInsight } from '@/interface'

const STATUS_CONFIG: Record<
  InventoryItem['status'],
  { color: string; bg: string; border: string }
> = {
  OK: {
    color: 'var(--status-success)',
    bg: 'var(--status-success-bg)',
    border: 'rgba(22, 163, 74, 0.20)',
  },
  LOW: {
    color: 'var(--status-warning)',
    bg: 'var(--status-warning-bg)',
    border: 'rgba(217, 119, 6, 0.20)',
  },
  CRITICAL: {
    color: 'var(--status-error)',
    bg: 'var(--status-error-bg)',
    border: 'rgba(220, 38, 38, 0.20)',
  },
}

function InventoryRow({ item }: { item: InventoryItem }) {
  const pct = Math.round((item.units / item.max) * 100)
  const cfg = STATUS_CONFIG[item.status]

  return (
    <div
      className="px-3 py-2 rounded-md cursor-pointer transition-colors"
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {item.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
            {item.units} units
          </span>
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {item.status}
          </span>
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full" style={{ background: 'var(--surface-hover)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: cfg.color }} />
      </div>
    </div>
  )
}

function SupplierRow({ supplier }: { supplier: SupplierInsight }) {
  return (
    <div
      className="py-3 px-2 cursor-pointer rounded-md transition-colors"
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {supplier.name}
        </span>
        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--status-success)' }}>
          {supplier.save}
        </span>
      </div>
      <p className="text-xs mt-0.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>
        Current: {supplier.current}
      </p>
      <div className="flex items-center gap-1 mt-1">
        <Sparkles size={10} style={{ color: 'var(--accent-violet)' }} />
        <span className="text-xs font-medium" style={{ color: 'var(--accent-violet)' }}>
          {supplier.tip}
        </span>
      </div>
    </div>
  )
}

interface ProcurementTabProps {
  inventory: InventoryItem[]
  suppliers: SupplierInsight[]
}

export function ProcurementTab({ inventory, suppliers }: ProcurementTabProps) {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Inventory card */}
      <div
        className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
        style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
      >
        <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
          Procurement &amp; Inventory
        </p>
        <div className="flex flex-col gap-1 overflow-y-auto flex-1">
          {inventory.map(item => (
            <InventoryRow key={item.name} item={item} />
          ))}
        </div>
      </div>

      {/* Supplier Insights card — AI violet treatment */}
      <div
        className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
        style={{
          border: '1px solid var(--border-ai)',
          background: `linear-gradient(to bottom, var(--surface-container), var(--accent-violet-muted))`,
        }}
      >
        <div className="flex items-start gap-2 mb-3 shrink-0">
          <Sparkles size={14} style={{ color: 'var(--accent-violet)', marginTop: 1 }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Supplier Renegotiation Insights
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              AI-identified cost reduction opportunities
            </p>
          </div>
        </div>

        <div
          className="flex flex-col flex-1 overflow-y-auto"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {suppliers.map((s, i) => (
            <div key={s.name} style={i > 0 ? { borderTop: '1px solid var(--border-subtle)' } : {}}>
              <SupplierRow supplier={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
