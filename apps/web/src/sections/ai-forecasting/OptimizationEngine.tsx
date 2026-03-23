import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

const sliders = [
  {
    label: 'Price Optimization Weight',
    color: 'var(--accent-violet)',
    sliderClass: '[&_[role=slider]]:bg-[var(--accent-violet)]',
  },
  {
    label: 'Occupancy Priority',
    color: 'var(--status-success)',
    sliderClass: '[&_[role=slider]]:bg-[var(--status-success)]',
  },
  {
    label: 'Cost Reduction Target',
    color: 'var(--status-warning)',
    sliderClass: '[&_[role=slider]]:bg-[var(--status-warning)]',
  },
]

export default function OptimizationEngine() {
  const [priceWeight, setPriceWeight] = useState(60)
  const [occPriority, setOccPriority] = useState(50)
  const [costTarget, setCostTarget] = useState(40)

  const values = [priceWeight, occPriority, costTarget]
  const setters = [setPriceWeight, setOccPriority, setCostTarget]

  const optScore = Math.round((priceWeight + occPriority + costTarget) / 3)
  const balanced =
    Math.abs(priceWeight - occPriority) < 15 && Math.abs(occPriority - costTarget) < 15

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Optimization Engine</CardTitle>
        <p className="text-xs text-muted-foreground">Balance price, occupancy &amp; cost targets</p>
      </CardHeader>
      <CardContent className="space-y-5">
        {sliders.map((s, i) => (
          <div key={s.label} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>{s.label}</span>
              <span className="font-semibold tabular-nums" style={{ color: s.color }}>
                {values[i]}%
              </span>
            </div>
            <Slider
              value={values[i]}
              onValueChange={setters[i]}
              min={0}
              max={100}
              step={1}
              className={s.sliderClass}
            />
          </div>
        ))}
        <div className="rounded-lg border border-border/60 p-4 mt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Optimization Score
          </p>
          <p
            className="text-4xl font-bold tabular-nums mt-1"
            style={{ color: 'var(--accent-violet)' }}
          >
            {optScore}
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: balanced ? 'var(--status-success)' : 'var(--status-warning)' }}
          >
            {balanced ? 'Weights balanced' : 'Adjust weights for balance'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
