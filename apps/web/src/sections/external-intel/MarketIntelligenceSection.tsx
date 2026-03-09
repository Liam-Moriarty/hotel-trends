import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react'
import type { CompetitorPromo, MacroIndicator, VisaAlert, PublicHoliday } from '@/interface'

interface MarketIntelligenceSectionProps {
  competitors: CompetitorPromo[]
  macroIndicators: MacroIndicator[]
  visaAlerts: VisaAlert[]
  publicHolidays: PublicHoliday[]
}

export function MarketIntelligenceSection({
  competitors,
  macroIndicators,
  visaAlerts,
  publicHolidays,
}: MarketIntelligenceSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Competitor Promotions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Competitor Promotions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {competitors.map((c, i) => (
            <div key={i} className="rounded-lg border p-3 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{c.name}</p>
                <Badge variant={c.impactColor} className="text-xs">
                  {c.impact}
                </Badge>
              </div>
              <p className="text-sm text-blue-600 font-medium">{c.promo}</p>
              <p className="text-xs text-muted-foreground">{c.period}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Macroeconomic Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Macroeconomic Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {macroIndicators.map((m, i) => (
            <div key={i}>
              <div className="flex items-center justify-between py-1">
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <div className="text-right">
                  <p className="text-sm font-bold">{m.value}</p>
                  <p
                    className={`text-xs flex items-center justify-end gap-0.5 ${m.up ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {m.up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {m.change}
                  </p>
                </div>
              </div>
              {i < macroIndicators.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Visa & Policy Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visa & Policy Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {visaAlerts.map((v, i) => (
            <div key={i} className="rounded-lg border p-3 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <MapPin className="h-3.5 w-3.5 text-green-600" />
                <p className="text-sm font-semibold">{v.country}</p>
                <Badge variant={v.tagColor} className="text-xs">
                  {v.tag}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{v.desc}</p>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center gap-2">
              🌐 Public Holidays — Next 30 days
            </p>
            {publicHolidays.map((h, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{h.name}</p>
                <p className="text-xs font-medium">{h.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
