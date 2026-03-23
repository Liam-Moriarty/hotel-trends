import { TrendingUp, ChefHat } from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import type { HubOsEnergyReading, HubOsFoodWaste } from '@repo/shared'

const FOOD_WASTE_TARGET = 8

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {dashed ? (
        <div className="w-4 border-t-2 border-dashed" style={{ borderColor: color, height: 0 }} />
      ) : (
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      )}
      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

function EnergyUsageCard({ energyUsage }: { energyUsage: HubOsEnergyReading[] }) {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="flex items-start justify-between mb-3 shrink-0">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Energy Usage vs Optimal
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            kWh by hour — AI-optimized target
          </p>
        </div>
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
          style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning)' }}
        >
          <TrendingUp size={10} />
          +8% over budget
        </span>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={energyUsage} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="opsEnergyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border-subtle)" horizontal={true} vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}kWh`}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                fontSize: 12,
              }}
              formatter={(v: number | undefined, n: string | undefined) => [
                `${v ?? 0} kWh`,
                n === 'actual' ? 'Actual' : 'AI Target',
              ]}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="var(--accent-cool)"
              strokeWidth={2}
              fill="url(#opsEnergyGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="var(--accent-violet)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mt-2 shrink-0">
        <LegendDot color="var(--accent-cool)" label="Actual Usage" />
        <LegendDot color="var(--accent-violet)" label="AI-Optimized Target" dashed />
      </div>
    </div>
  )
}

function FoodWasteCard({ foodWaste }: { foodWaste: HubOsFoodWaste[] }) {
  const avgWaste =
    foodWaste.length > 0 ? foodWaste.reduce((s, d) => s + d.kg, 0) / foodWaste.length : 0
  const avgPct = Math.round(((avgWaste - FOOD_WASTE_TARGET) / FOOD_WASTE_TARGET) * 100)

  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="flex items-start justify-between mb-3 shrink-0">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Food Waste Analytics
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            kg per day vs target ({FOOD_WASTE_TARGET}kg)
          </p>
        </div>
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
          style={{ background: 'var(--status-error-bg)', color: 'var(--status-error)' }}
        >
          <ChefHat size={10} />
          {avgPct > 0 ? `Avg +${avgPct}% over target` : 'On target'}
        </span>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={foodWaste} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-subtle)" horizontal={true} vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}kg`}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                fontSize: 12,
              }}
              formatter={(v: number | undefined) => [`${v ?? 0} kg`, 'Waste']}
            />
            <ReferenceLine
              y={FOOD_WASTE_TARGET}
              stroke="var(--status-success)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Target',
                position: 'right',
                fontSize: 10,
                fill: 'var(--status-success)',
              }}
            />
            <Bar dataKey="kg" radius={[4, 4, 0, 0]}>
              {foodWaste.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.kg > FOOD_WASTE_TARGET ? 'var(--status-error)' : 'var(--status-success)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mt-2 shrink-0">
        <LegendDot color="var(--status-error)" label="Above Target" />
        <LegendDot color="var(--status-success)" label="At/Below Target" />
        <LegendDot color="var(--status-success)" label={`Target (${FOOD_WASTE_TARGET}kg)`} dashed />
      </div>
    </div>
  )
}

interface FacilitiesTabProps {
  energyUsage: HubOsEnergyReading[]
  foodWaste: HubOsFoodWaste[]
}

export function FacilitiesTab({ energyUsage, foodWaste }: FacilitiesTabProps) {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <EnergyUsageCard energyUsage={energyUsage} />
      <FoodWasteCard foodWaste={foodWaste} />
    </div>
  )
}
