import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { GlassTooltip } from '@/components/GlassTooltip'
import { useRoomRates } from '@/features/revenue-pricing/hooks/useRoomRates'
import { useAppliedRates } from '@/features/revenue-pricing/hooks/useAppliedRates'
import { useOccupancyHeatmap } from '@/features/revenue-pricing/hooks/useOccupancyHeatmap'
import { useRateTrend } from '@/features/revenue-pricing/hooks/useRateTrend'
import { heatmapBg } from '@/utils/occupancy'

// ── Occupancy bar color (per spec: high occ = red = action needed) ────────────

function getOccColor(pct: number): string {
  if (pct >= 85) return 'var(--status-error)'
  if (pct >= 70) return 'var(--status-warning)'
  return 'var(--status-success)'
}

// ── RoomRateOptimizationTable ─────────────────────────────────────────────────

function RoomRateOptimizationTable({ className }: { className?: string }) {
  const { data: roomsData, isLoading, isError } = useRoomRates()
  const { applied, toggleRate } = useAppliedRates()

  const rooms = (roomsData ?? []).map(r => ({ ...r, applied: applied.has(r.type) }))

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      {/* Card header */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Room Rate Optimization
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          AI vs competitor vs current rate comparison
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full px-4 pb-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-lg animate-pulse"
                style={{ background: 'var(--surface-container-high)' }}
              />
            ))}
          </div>
        </div>
      ) : isError ? (
        <p className="px-4 pb-4 text-sm" style={{ color: 'var(--status-error)' }}>
          Failed to load room rates.
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0">
              <tr
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--surface-container-high)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <th className="text-left py-2 px-3 font-bold">Room Type</th>
                <th className="text-right py-2 px-3 font-bold">Current</th>
                <th className="text-right py-2 px-3 font-bold">Comp Avg</th>
                <th className="text-right py-2 px-3 font-bold">AI Rec</th>
                <th className="text-left py-2 px-3 font-bold">Occ</th>
                <th className="text-left py-2 px-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr
                  key={room.type}
                  className="transition-colors cursor-pointer hover:bg-[var(--surface-hover)]"
                >
                  <td className="py-2.5 px-3 font-medium" style={{ color: 'var(--text-primary)' }}>
                    {room.type}
                  </td>
                  <td
                    className="py-2.5 px-3 text-right tabular-nums font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${room.current}
                  </td>
                  <td
                    className="py-2.5 px-3 text-right tabular-nums"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    ${room.compAvg}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span
                        className="tabular-nums font-bold"
                        style={{ color: 'var(--status-success)' }}
                      >
                        ${room.aiRec}
                      </span>
                      <div
                        className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{
                          background: 'var(--status-success-bg)',
                          color: 'var(--status-success)',
                        }}
                      >
                        <TrendingUp size={9} />+{room.delta}
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-16 h-1.5 rounded-full overflow-hidden"
                        style={{ background: 'var(--surface-hover)' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${room.occupancy}%`,
                            background: getOccColor(room.occupancy),
                          }}
                        />
                      </div>
                      <span
                        className="text-xs tabular-nums"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {room.occupancy}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    {room.applied ? (
                      <button
                        className="px-3 py-1 rounded-full text-xs font-medium border transition-colors hover:brightness-95"
                        style={{
                          background: 'var(--surface-container-high)',
                          borderColor: 'var(--border-default)',
                          color: 'var(--text-secondary)',
                        }}
                        onClick={() => toggleRate(room.type)}
                      >
                        Revert
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-colors hover:brightness-95"
                        style={{
                          background:
                            'linear-gradient(135deg, var(--accent-cool), var(--accent-violet))',
                          color: 'white',
                        }}
                        onClick={() => toggleRate(room.type)}
                      >
                        Apply
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ── OccupancyHeatmapCard ──────────────────────────────────────────────────────

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function OccupancyHeatmapCard({ className }: { className?: string }) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const [hoveredCell, setHoveredCell] = useState<{ day: number; value: number } | null>(null)

  const { data: heatmapRows, isLoading, isError } = useOccupancyHeatmap(year, month)

  // Build flat cells with day numbers
  let dayCounter = 0
  const cells = (heatmapRows ?? []).flatMap(row =>
    row.map(cell => {
      if (cell.value !== null) dayCounter++
      return { value: cell.value, day: cell.value !== null ? dayCounter : null }
    })
  )

  return (
    <div
      className={`flex flex-col rounded-lg p-4 ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="shrink-0 mb-3">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Occupancy Heatmap
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {MONTHS[month]} {year} – by week &amp; day
        </p>
      </div>

      {isLoading ? (
        <div className="flex-1 grid grid-cols-7 gap-1 content-start">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="h-7 rounded animate-pulse"
              style={{ background: 'var(--surface-container-high)' }}
            />
          ))}
        </div>
      ) : isError ? (
        <p className="text-sm" style={{ color: 'var(--status-error)' }}>
          Failed to load occupancy data.
        </p>
      ) : (
        <div className="flex-1 min-h-0">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {DAYS.map((d, i) => (
              <div
                key={i}
                className="text-center text-[10px] font-bold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          {(heatmapRows ?? []).map((row, ri) => (
            <div key={ri} className="grid grid-cols-7 gap-1 mb-1">
              {row.map((cell, ci) => {
                const flatIdx = ri * 7 + ci
                const cellData = cells[flatIdx]
                return (
                  <div
                    key={ci}
                    className={`rounded text-center text-xs py-1.5 font-bold tabular-nums cursor-default ${heatmapBg(cell.value)}`}
                    onMouseEnter={() => {
                      if (cellData?.day != null && cell.value !== null) {
                        setHoveredCell({ day: cellData.day, value: cell.value })
                      }
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {cell.value ?? ''}
                  </div>
                )
              })}
            </div>
          ))}

          {/* Tooltip */}
          {hoveredCell && (
            <div
              className="text-xs px-2 py-1 rounded mt-1 text-center"
              style={{
                background: 'var(--surface-glass)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              {MONTHS[month]} {hoveredCell.day} · {hoveredCell.value}% Occupancy
            </div>
          )}

          {/* Legend */}
          <div
            className="flex items-center justify-between mt-2 pt-2"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Low
            </span>
            <div className="flex gap-1">
              <div className="w-4 h-2 rounded-sm heatmap-low" />
              <div className="w-4 h-2 rounded-sm heatmap-med" />
              <div className="w-4 h-2 rounded-sm heatmap-med-high" />
              <div className="w-4 h-2 rounded-sm heatmap-high" />
            </div>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              High
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── RateTrendCompact ──────────────────────────────────────────────────────────

const LINE_COLORS: Record<string, string> = {
  STD: 'var(--accent-cool)',
  DLX: 'var(--status-warning)',
  JNR: 'var(--status-error)',
  STE: 'var(--status-success)',
  PSTE: 'var(--accent-violet)',
}

const LINE_LABELS: Record<string, string> = {
  STD: 'Standard',
  DLX: 'Deluxe',
  JNR: 'Jr. Suite',
  STE: 'Suite',
  PSTE: 'Pres. Suite',
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

function RateTrendCompact({ className }: { className?: string }) {
  const { data, isLoading, isError } = useRateTrend()

  return (
    <div
      className={`flex flex-col rounded-lg p-4 ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="flex items-start justify-between mb-2 shrink-0">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Rate Trend by Room Type
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            4-week forward pricing schedule
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {Object.entries(LINE_LABELS).map(([key, label]) => (
            <LegendDot key={key} color={LINE_COLORS[key]} label={label} />
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div
            className="h-full rounded-lg animate-pulse"
            style={{ background: 'var(--surface-container-high)' }}
          />
        ) : isError ? (
          <p className="text-sm" style={{ color: 'var(--status-error)' }}>
            Failed to load rate trend data.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 2, right: 4, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                interval={3}
              />
              <YAxis
                tick={{ fontSize: 9, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${v}`}
              />
              <Tooltip content={<GlassTooltip />} />
              {Object.entries(LINE_COLORS).map(([key, color]) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={LINE_LABELS[key]}
                  stroke={color}
                  strokeWidth={1.5}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function DynamicPricingTab() {
  return (
    <div className="flex flex-col gap-4 h-full p-5">
      {/* Top row: table + heatmap */}
      <div className="flex gap-4 flex-1 min-h-0">
        <RoomRateOptimizationTable className="flex-1 min-w-0" />
        <OccupancyHeatmapCard className="w-[300px] shrink-0" />
      </div>

      {/* Bottom: rate trend, fixed height */}
      <div className="shrink-0 h-[50%]">
        <RateTrendCompact className="h-full" />
      </div>
    </div>
  )
}
