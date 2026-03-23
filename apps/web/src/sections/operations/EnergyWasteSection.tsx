import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, ChefHat } from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { EnergyDataPoint, FoodWasteDataPoint } from '@/interface'

interface EnergyWasteSectionProps {
  energyUsage: EnergyDataPoint[]
  foodWaste: FoodWasteDataPoint[]
}

function WasteFillColor(kg: number) {
  return kg >= 12 ? 'var(--status-error)' : 'var(--status-warning)'
}

export function EnergyWasteSection({ energyUsage, foodWaste }: EnergyWasteSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Energy Usage */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Energy Usage vs Optimal</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                kWh by hour — AI-optimized target
              </p>
            </div>
            <Badge
              variant="outline"
              style={{ color: 'var(--status-warning)', borderColor: 'var(--status-warning)' }}
              className="flex items-center gap-1"
            >
              <Zap className="w-3 h-3" /> +8% over budget
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={energyUsage} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-cool)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent-cool)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="var(--surface-container-high)"
                horizontal={true}
                vertical={false}
              />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis
                tickFormatter={v => `${v}kWh`}
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              />
              <Tooltip
                formatter={(v: number | undefined, n: string | undefined) => [
                  `${v} kWh`,
                  n === 'actual' ? 'Actual' : 'Target',
                ]}
                contentStyle={{
                  background: 'var(--surface-glass)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 8,
                  color: 'var(--text-primary)',
                }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="var(--accent-cool)"
                fill="url(#energyGrad)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="var(--accent-violet)"
                fill="none"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Food Waste */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Food Waste Analytics</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">kg per day vs target (8kg)</p>
            </div>
            <Badge
              variant="outline"
              style={{ color: 'var(--status-error)', borderColor: 'var(--status-error)' }}
              className="flex items-center gap-1"
            >
              <ChefHat className="w-3 h-3" /> Avg +44% over target
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={foodWaste} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid
                stroke="var(--surface-container-high)"
                horizontal={true}
                vertical={false}
              />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis
                tickFormatter={v => `${v}kg`}
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              />
              <Tooltip
                formatter={(v: number | undefined) => [`${v} kg`, 'Waste']}
                contentStyle={{
                  background: 'var(--surface-glass)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 8,
                  color: 'var(--text-primary)',
                }}
              />
              <ReferenceLine
                y={8}
                stroke="var(--status-success)"
                strokeDasharray="4 3"
                label={{ value: 'Target', fill: 'var(--status-success)', fontSize: 11 }}
              />
              <Bar dataKey="kg" radius={[4, 4, 0, 0]}>
                {foodWaste.map((entry, i) => (
                  <rect key={i} fill={WasteFillColor(entry.kg)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
