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
  return kg >= 12 ? '#ef4444' : '#f59e0b'
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
              className="flex items-center gap-1 text-yellow-500 border-yellow-500"
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
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => `${v}kWh`} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number | undefined, n: string | undefined) => [
                  `${v} kWh`,
                  n === 'actual' ? 'Actual' : 'Target',
                ]}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#22c55e"
                fill="url(#energyGrad)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#facc15"
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
              className="flex items-center gap-1 text-red-500 border-red-500"
            >
              <ChefHat className="w-3 h-3" /> Avg +44% over target
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={foodWaste} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => `${v}kg`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number | undefined) => [`${v} kg`, 'Waste']} />
              <ReferenceLine
                y={8}
                stroke="#22c55e"
                strokeDasharray="4 3"
                label={{ value: 'Target', fill: '#22c55e', fontSize: 11 }}
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
