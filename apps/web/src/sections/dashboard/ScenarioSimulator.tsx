import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

const BASE_REVPAR = 183

const sliders = [
  { label: 'Occupancy Rate', min: 40, max: 100, fmt: (v: number) => `${v}%`, step: 1 },
  { label: 'ADR Adjustment', min: -50, max: 100, fmt: (v: number) => `$${v}`, step: 1 },
  { label: 'Cost per Room', min: 30, max: 150, fmt: (v: number) => `$${v}`, step: 1 },
]

export default function ScenarioSimulator() {
  const [occ, setOcc] = useState(84)
  const [adr, setAdr] = useState(0)
  const [cpr, setCpr] = useState(62)

  const setters = [setOcc, setAdr, setCpr]
  const values = [occ, adr, cpr]

  const projected = Math.round(BASE_REVPAR * (occ / 84) * (1 + adr / 218) - (cpr - 62) * 0.3)
  const diff = projected - BASE_REVPAR

  return (
    <Card className="flex-1 min-w-[260px]">
      <CardContent className="p-5">
        <p className="font-semibold text-sm mb-5">⊙ Scenario Simulator</p>
        {sliders.map((s, i) => (
          <div key={s.label} className="mb-5">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="text-sm font-semibold">{s.fmt(values[i])}</span>
            </div>
            <Slider
              value={values[i]}
              onValueChange={setters[i]}
              min={s.min}
              max={s.max}
              step={s.step}
            />
          </div>
        ))}
        <div className="rounded-md border bg-muted/40 p-4 mb-3">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1.5">
            Projected RevPAR
          </p>
          <p className="text-3xl font-bold tracking-tight mb-1">${projected}</p>
          <p className={`text-xs font-medium ${diff >= 0 ? 'text-green-600' : 'text-destructive'}`}>
            {diff >= 0 ? '▲' : '▼'} {Math.abs(diff)} vs current baseline
          </p>
        </div>
        <Button className="w-full">Run Full Scenario</Button>
      </CardContent>
    </Card>
  )
}
