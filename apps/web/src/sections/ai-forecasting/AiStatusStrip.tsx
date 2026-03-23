import { Activity, Zap, Wrench, Sparkles } from 'lucide-react'
import { anomalies, maintenanceAlerts, recommendations } from '@/mocks'

export default function AiStatusStrip() {
  const activeAnomalies = anomalies.filter(a => !a.resolved).length
  const criticalMaint = maintenanceAlerts.filter(m => m.pct >= 75).length
  const pendingRecs = recommendations.length

  const chips = [
    {
      icon: <Activity size={12} />,
      label: 'Forecasting',
      detail: 'Models Active',
      status: 'success' as const,
    },
    {
      icon: <Zap size={12} />,
      label: `${activeAnomalies} Anomalies`,
      detail: 'Active',
      status: 'warning' as const,
    },
    {
      icon: <Wrench size={12} />,
      label: `${criticalMaint} Maintenance`,
      detail: 'Critical',
      status: 'error' as const,
    },
    {
      icon: <Sparkles size={12} />,
      label: `${pendingRecs} Recommendations`,
      detail: 'Pending',
      status: 'info' as const,
    },
  ]

  const dotColor = {
    success: 'var(--status-success)',
    warning: 'var(--status-warning)',
    error: 'var(--status-error)',
    info: 'var(--status-info)',
  }

  return (
    <div className="flex items-center gap-3 h-[40px] shrink-0">
      {chips.map(chip => (
        <div
          key={chip.label}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: 'var(--surface-container)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${chip.status === 'error' ? 'animate-pulse' : ''}`}
            style={{ background: dotColor[chip.status] }}
          />
          <span style={{ color: dotColor[chip.status] }}>{chip.icon}</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {chip.label}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>· {chip.detail}</span>
        </div>
      ))}
    </div>
  )
}
