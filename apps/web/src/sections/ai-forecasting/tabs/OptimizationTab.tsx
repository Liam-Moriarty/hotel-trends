import { useState } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { GlassTooltip } from '@/components/GlassTooltip'
import { clusterData, clusterColors } from '@/mocks'

// Group cluster points by name
type ClusterPoint = { name: string; x: number; y: number; z: number }
const clusterGroups: Record<string, ClusterPoint[]> = {}
;(clusterData as ClusterPoint[]).forEach(point => {
  if (!clusterGroups[point.name]) clusterGroups[point.name] = []
  clusterGroups[point.name].push(point)
})

function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
        <span
          className="text-xs font-semibold tabular-nums"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{ accentColor: 'var(--accent-cool)' }}
      />
    </div>
  )
}

export function OptimizationTab() {
  const [weights, setWeights] = useState({ price: 60, occupancy: 50, cost: 40 })
  const optimizationScore = Math.round((weights.price + weights.occupancy + weights.cost) / 3)

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Left: Optimization Engine */}
      <div
        className="flex flex-col rounded-lg p-5"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="mb-4 shrink-0">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Optimization Engine
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Balance price, occupancy &amp; cost targets
          </p>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <SliderRow
            label="Price Optimization Weight"
            value={weights.price}
            onChange={v => setWeights(w => ({ ...w, price: v }))}
          />
          <SliderRow
            label="Occupancy Priority"
            value={weights.occupancy}
            onChange={v => setWeights(w => ({ ...w, occupancy: v }))}
          />
          <SliderRow
            label="Cost Reduction Target"
            value={weights.cost}
            onChange={v => setWeights(w => ({ ...w, cost: v }))}
          />
        </div>
        {/* Score output */}
        <div
          className="mt-4 p-4 rounded-lg shrink-0"
          style={{
            background: 'var(--surface-container-high)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <p
            className="text-[10px] font-bold tracking-widest uppercase mb-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Optimization Score
          </p>
          <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
            {optimizationScore}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--accent-cool)' }}>
            Weights balanced
          </p>
        </div>
        <button
          className="mt-3 w-full py-2 rounded-full text-sm font-semibold text-white shrink-0"
          style={{ background: 'var(--accent-gradient)' }}
        >
          Apply Optimization Settings
        </button>
      </div>

      {/* Right: Guest Cluster Visualization */}
      <div
        className="flex flex-col rounded-lg p-4"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="mb-3 shrink-0">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Guest Cluster Visualization
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            ML-segmented personas — length of stay vs spend per night
          </p>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis
                dataKey="x"
                name="Nights"
                type="number"
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: 'Nights',
                  position: 'insideBottomRight',
                  offset: -4,
                  fontSize: 10,
                  fill: 'var(--text-muted)',
                }}
              />
              <YAxis
                dataKey="y"
                name="Spend/Night"
                type="number"
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<GlassTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              {Object.entries(clusterGroups).map(([name, points]) => (
                <Scatter
                  key={name}
                  name={name}
                  data={points}
                  fill={(clusterColors as Record<string, string>)[name] ?? 'var(--accent-cool)'}
                  opacity={0.85}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 shrink-0 flex-wrap">
          {Object.entries(clusterColors as Record<string, string>).map(([name, color]) => (
            <div key={name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
