import { MapPin } from 'lucide-react'
import type { MacroIndicator, VisaAlert, PublicHoliday } from '@/interface'
import { externalMacroIndicators, externalVisaAlerts, externalPublicHolidays } from '@/mocks'

// ── Business-semantic delta coloring ─────────────────────────────────────────
// Green/red is NOT always correct — applies hospitality-specific interpretation.

function getMacroDeltaColor(indicator: MacroIndicator): string {
  const label = indicator.label.toLowerCase()

  // Declining inflation = good for hospitality costs → success
  if (label.includes('inflation'))
    return indicator.up ? 'var(--status-error)' : 'var(--status-success)'

  // Forex change is ambiguous — always amber (nuanced signal)
  if (label.includes('forex')) return 'var(--status-warning)'

  // All other indicators: up = success, down = error
  return indicator.up ? 'var(--status-success)' : 'var(--status-error)'
}

// ── MacroRow ──────────────────────────────────────────────────────────────────

function MacroRow({ indicator: m }: { indicator: MacroIndicator }) {
  const deltaColor = getMacroDeltaColor(m)

  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {m.label}
      </span>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
          {m.value}
        </span>
        <span className="text-[10px] tabular-nums font-medium" style={{ color: deltaColor }}>
          {m.up ? '▲' : '▼'} {m.change}
        </span>
      </div>
    </div>
  )
}

// ── MacroIndicatorsCard ───────────────────────────────────────────────────────

function MacroIndicatorsCard() {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
        Macroeconomic Indicators
      </p>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {externalMacroIndicators.map((m, idx) => (
          <div
            key={idx}
            style={{
              borderBottom:
                idx < externalMacroIndicators.length - 1
                  ? '1px solid var(--border-subtle)'
                  : 'none',
            }}
          >
            <MacroRow indicator={m} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Visa tag style ────────────────────────────────────────────────────────────

function getVisaTagStyle(tag: string) {
  const lower = tag.toLowerCase()
  if (lower.includes('evisa') || lower.includes('expanded'))
    return { bg: 'var(--status-success-bg)', color: 'var(--status-success)' }
  if (lower.includes('group') || lower.includes('policy'))
    return { bg: 'var(--status-warning-bg)', color: 'var(--status-warning)' }
  if (lower.includes('arrival') || lower.includes('visa on'))
    return { bg: 'var(--accent-cool-muted)', color: 'var(--accent-cool)' }
  return { bg: 'var(--surface-container-high)', color: 'var(--text-muted)' }
}

// ── VisaAlertRow ──────────────────────────────────────────────────────────────

function VisaAlertRow({ alert: v }: { alert: VisaAlert }) {
  const tagStyle = getVisaTagStyle(v.tag)

  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <MapPin size={13} style={{ color: 'var(--accent-cool)', marginTop: 2, flexShrink: 0 }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {v.country}
          </span>
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-bold"
            style={{ background: tagStyle.bg, color: tagStyle.color }}
          >
            {v.tag}
          </span>
        </div>
        <p
          className="text-xs mt-0.5"
          style={{
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {v.desc}
        </p>
      </div>
    </div>
  )
}

// ── VisaPolicyCard ────────────────────────────────────────────────────────────

function VisaPolicyCard() {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
        Visa & Policy Alerts
      </p>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {externalVisaAlerts.map((v, idx) => (
          <VisaAlertRow key={idx} alert={v} />
        ))}

        {/* Public Holidays section */}
        <div className="mt-2 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Public Holidays · Next 30 Days
          </p>
          {(externalPublicHolidays as PublicHoliday[]).map((h, idx) => (
            <div
              key={idx}
              className="flex justify-between py-1.5"
              style={{
                borderBottom:
                  idx < externalPublicHolidays.length - 1
                    ? '1px solid var(--border-subtle)'
                    : 'none',
              }}
            >
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {h.name}
              </span>
              <span
                className="text-xs tabular-nums font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {h.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function MacroPolicyTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <MacroIndicatorsCard />
      <VisaPolicyCard />
    </div>
  )
}
