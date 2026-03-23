import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Zap } from 'lucide-react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import type { WeatherDay, OccupancyData } from '@/interface'

interface WeatherOccupancySectionProps {
  weatherDays: WeatherDay[]
  occupancyData: OccupancyData[]
}

export function WeatherOccupancySection({
  weatherDays,
  occupancyData,
}: WeatherOccupancySectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 7-Day Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Cloud className="h-4 w-4" />
            7-Day Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-4xl font-bold tabular-nums">22°C</p>
              <p className="text-muted-foreground text-sm">Today · Sunny · City Center</p>
            </div>
            <Badge variant="outline">Good for Travel</Badge>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weatherDays.map(d => (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <p className="text-xs text-muted-foreground">{d.day}</p>
                <span className="text-xl">{d.icon}</span>
                <p className="text-xs font-medium tabular-nums">{d.high}°</p>
                <p className="text-xs text-muted-foreground tabular-nums">{d.low}°</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border p-3 space-y-1">
            <p className="text-sm font-medium flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" style={{ color: 'var(--status-warning)' }} />
              AI Weather Package Alert
            </p>
            <p className="text-xs text-muted-foreground">
              Rain forecast Sat–Sun. Recommend promoting indoor packages (Spa, Cinema, F&B).
              Expected +18% upsell conversion.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Citywide Occupancy Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Citywide Occupancy Trends</CardTitle>
          <p className="text-sm text-muted-foreground">Hotel performance vs city average</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={occupancyData}>
              <defs>
                <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-cool)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent-cool)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <YAxis
                domain={[0, 100]}
                tickFormatter={v => `${v}%`}
                tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              />
              <Tooltip
                formatter={v => `${v}%`}
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
                dataKey="value"
                stroke="var(--accent-cool)"
                fill="url(#occGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border p-3 text-center">
              <p className="text-xl font-bold tabular-nums" style={{ color: 'var(--status-info)' }}>
                8.4%
              </p>
              <p className="text-xs text-muted-foreground">Market Share</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p
                className="text-xl font-bold tabular-nums"
                style={{ color: 'var(--status-success)' }}
              >
                112.3
              </p>
              <p className="text-xs text-muted-foreground">RevPAR Index</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-xl font-bold tabular-nums" style={{ color: 'var(--status-info)' }}>
                +6.2pp
              </p>
              <p className="text-xs text-muted-foreground">OCC Premium</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
