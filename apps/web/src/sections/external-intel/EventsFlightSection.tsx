import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, PlaneLanding } from 'lucide-react'
import type { LocalEvent, FlightArrival } from '@/interface'

interface EventsFlightSectionProps {
  events: LocalEvent[]
  flights: FlightArrival[]
}

export function EventsFlightSection({ events, flights }: EventsFlightSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Local Events Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="h-4 w-4" />
            Local Events Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((e, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
              <div className="text-center min-w-[40px]">
                <p className="text-xs text-muted-foreground">{e.month}</p>
                <p className="text-sm font-bold">{e.dateRange}</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold">{e.name}</p>
                <p className="text-xs text-muted-foreground">{e.venue}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {e.tags.map(t => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                  <Badge variant={e.impactColor} className="text-xs">
                    {e.impact}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Flight Arrival Tracker */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <PlaneLanding className="h-4 w-4" />
              Flight Arrival Tracker
            </CardTitle>
            <span className="text-xs text-muted-foreground">Today · International</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {flights.map((f, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-bold tabular-nums">{f.time}</p>
                <p className="text-sm">{f.origin}</p>
                <p className="text-xs text-muted-foreground">
                  {f.flight} · <span className="tabular-nums">{f.pax}</span> pax
                </p>
              </div>
              <span className={`text-xs font-semibold ${f.statusColor}`}>{f.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
