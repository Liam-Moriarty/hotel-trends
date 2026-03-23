import { X, Sparkles } from 'lucide-react'
import { useRoomRates } from '@/features/revenue-pricing/hooks/useRoomRates'
import { useAppliedRates } from '@/features/revenue-pricing/hooks/useAppliedRates'

export function ApplyAiRatesModal({ onClose }: { onClose: () => void }) {
  const { data: roomsData } = useRoomRates()
  const { applied, applyAll } = useAppliedRates()

  // Rooms with a pending AI recommendation (not yet applied)
  const pending = (roomsData ?? []).filter(r => !applied.has(r.type))
  const estImpact = pending.reduce((sum, r) => sum + r.delta, 0) * 7 // weekly est.

  const handleApply = () => {
    applyAll((roomsData ?? []).map(r => r.type))
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--scrim)' }}
      onClick={onClose}
    >
      <div
        className="relative w-[480px] rounded-2xl p-6"
        style={{
          background: 'var(--surface-glass)',
          backdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.24)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Sparkles size={15} style={{ color: 'var(--accent-cool)' }} />
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Apply AI Rate Recommendations
            </p>
          </div>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--text-ghost)' }}
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          {pending.length} room{pending.length !== 1 ? 's' : ''} across{' '}
          {Math.min(pending.length, 3)} categories
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className="p-3 rounded-lg text-center"
            style={{
              background: 'var(--surface-container-high)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Rooms Affected
            </p>
            <p
              className="text-2xl font-bold tabular-nums mt-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {pending.length}
            </p>
          </div>
          <div
            className="p-3 rounded-lg text-center"
            style={{
              background: 'var(--surface-container-high)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Est. Revenue Impact
            </p>
            <p
              className="text-xl font-bold tabular-nums mt-0.5"
              style={{ color: 'var(--status-success)' }}
            >
              +${estImpact.toLocaleString()} / wk
            </p>
          </div>
        </div>

        {/* Changes list */}
        {pending.length > 0 && (
          <>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Changes
            </p>
            <div
              className="rounded-lg overflow-hidden mb-5"
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              {pending.map((r, idx) => (
                <div
                  key={r.type}
                  className="flex items-center justify-between px-3 py-2 text-xs"
                  style={{
                    background: 'var(--surface-container-high)',
                    borderBottom:
                      idx < pending.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {r.type}
                  </span>
                  <span className="tabular-nums" style={{ color: 'var(--text-muted)' }}>
                    ${r.current} → ${r.aiRec}
                  </span>
                  <span
                    className="tabular-nums font-semibold"
                    style={{ color: 'var(--status-success)' }}
                  >
                    (+${r.delta})
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:brightness-95"
            style={{
              background: 'var(--surface-container-high)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:brightness-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent-cool), var(--accent-violet))',
              color: 'white',
            }}
            onClick={handleApply}
          >
            <Sparkles size={11} />
            Apply All Rates
          </button>
        </div>
      </div>
    </div>
  )
}
