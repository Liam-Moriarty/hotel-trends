import { Card, CardContent } from '@/components/ui/card'

const score = 78
const r = 52,
  cx = 70,
  cy = 70
const circ = 2 * Math.PI * r
const sweep = 270
const dashLen = (sweep / 360) * circ
const filled = (score / 100) * dashLen
const offset = -circ * (90 / 360)

export default function HealthScore() {
  return (
    <Card className="min-w-[200px]">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
          Daily Health Score
        </p>
        <div className="flex justify-center">
          <svg width={140} height={100} viewBox="0 0 140 100">
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={8}
              strokeDasharray={`${dashLen} ${circ}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(135 70 70)"
            />
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={8}
              strokeDasharray={`${filled} ${circ}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(135 70 70)"
            />
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize={28}
              fontWeight={700}
            >
              {score}
            </text>
            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              fill="hsl(var(--primary))"
              fontSize={11}
              fontWeight={600}
            >
              GOOD
            </text>
          </svg>
        </div>
        <div className="flex justify-around mt-2">
          {[
            ['84%', 'OCC'],
            ['$218', 'RATE'],
            ['4.6', 'CSAT'],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="text-sm font-bold text-foreground">{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
