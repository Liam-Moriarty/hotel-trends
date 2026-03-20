import { useState } from 'react'
import { useSnapshotKpis } from '@/features/dashboard/hooks/useSnapshotKpis'

export function SimulatorTab() {
  const { data: kpisData } = useSnapshotKpis()
  const revparKpi = kpisData?.kpis.find(k => k.label === 'RevPAR')
  const baseRevpar = revparKpi ? Number(String(revparKpi.value).replace(/[^0-9.]/g, '')) : 201

  const [occupancy, setOccupancy] = useState(81)
  const [adrAdj, setAdrAdj] = useState(0)
  const [costPerRoom, setCostPerRoom] = useState(62)

  // Simple RevPAR formula: RevPAR = ADR × (occupancy/100)
  // ADR base ≈ baseRevpar / (81/100)
  const baseAdr = Math.round(baseRevpar / 0.81)
  const adjAdr = baseAdr + adrAdj
  const projectedRevpar = Math.round(adjAdr * (occupancy / 100))
  const delta = projectedRevpar - baseRevpar

  return (
    <div className="flex flex-col gap-4 h-full">
      <p className="text-sm font-semibold shrink-0" style={{ color: 'var(--text-primary)' }}>
        Scenario Simulator
      </p>

      {/* Sliders */}
      <div className="flex flex-col gap-5 flex-1">
        {/* Occupancy */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Occupancy Rate
            </label>
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: 'var(--text-primary)' }}
            >
              {occupancy}%
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={100}
            step={1}
            value={occupancy}
            onChange={e => setOccupancy(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: 'var(--accent-cool)' }}
          />
        </div>

        {/* ADR Adjustment */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              ADR Adjustment
            </label>
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: 'var(--text-primary)' }}
            >
              {adrAdj >= 0 ? '+' : ''}${adrAdj}
            </span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            step={5}
            value={adrAdj}
            onChange={e => setAdrAdj(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: 'var(--accent-cool)' }}
          />
        </div>

        {/* Cost per room */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Cost per Room
            </label>
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: 'var(--text-primary)' }}
            >
              ${costPerRoom}
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={120}
            step={2}
            value={costPerRoom}
            onChange={e => setCostPerRoom(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: 'var(--accent-cool)' }}
          />
        </div>
      </div>

      {/* Projected output */}
      <div
        className="rounded-lg p-4 shrink-0"
        style={{
          background: 'var(--surface-container-high)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <p
          className="text-[10px] font-bold tracking-widest uppercase mb-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Projected RevPAR
        </p>
        <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
          ${projectedRevpar}
        </p>
        <p
          className="text-xs font-medium mt-1"
          style={{ color: delta >= 0 ? 'var(--status-success)' : 'var(--status-error)' }}
        >
          {delta >= 0 ? '▲' : '▼'} ${Math.abs(delta)} vs current baseline
        </p>
      </div>

      {/* CTA button */}
      <button
        className="w-full py-2.5 rounded-full text-sm font-semibold text-white shrink-0"
        style={{ background: 'var(--accent-gradient)' }}
      >
        Run Full Scenario
      </button>
    </div>
  )
}
