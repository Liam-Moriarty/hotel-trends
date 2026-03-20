import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ThroughputDataPoint } from '@/interface'

interface PipelineThroughputSectionProps {
  data: ThroughputDataPoint[]
}

export function PipelineThroughputSection({ data }: PipelineThroughputSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Data Pipeline Throughput</CardTitle>
            <p className="text-sm text-muted-foreground">
              Records/hour processed across all integrations — Today
            </p>
          </div>
          <Badge
            variant="outline"
            style={{ color: 'var(--status-success)', borderColor: 'var(--status-success)' }}
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Pipeline Healthy
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--surface-container-high)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              stroke="var(--text-muted)"
            />
            <YAxis
              tickFormatter={v => `${v / 1000}k`}
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              stroke="var(--text-muted)"
            />
            <Tooltip
              formatter={(v: number | undefined) => [
                `${v?.toLocaleString()} records/hr`,
                'Throughput',
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
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#throughputGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
