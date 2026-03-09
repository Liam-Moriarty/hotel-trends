import { Badge } from '@/components/ui/badge'
import { Globe } from 'lucide-react'
import {
  externalWeatherDays,
  externalOccupancyData,
  externalEvents,
  externalFlights,
  externalCompetitors,
  externalMacroIndicators,
  externalVisaAlerts,
  externalPublicHolidays,
} from '@/mocks'
import { WeatherOccupancySection } from '@/sections/external-intel/WeatherOccupancySection'
import { EventsFlightSection } from '@/sections/external-intel/EventsFlightSection'
import { MarketIntelligenceSection } from '@/sections/external-intel/MarketIntelligenceSection'

export default function ExternalPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">External Intelligence</h1>
          <p className="text-muted-foreground text-sm">
            Weather, events, flights, competitor activity & macro signals
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5">
          <Globe className="h-3.5 w-3.5" />
          Live External Feeds Active
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
        </Badge>
      </div>

      {/* Sections */}
      <WeatherOccupancySection
        weatherDays={externalWeatherDays}
        occupancyData={externalOccupancyData}
      />

      <EventsFlightSection events={externalEvents} flights={externalFlights} />

      <MarketIntelligenceSection
        competitors={externalCompetitors}
        macroIndicators={externalMacroIndicators}
        visaAlerts={externalVisaAlerts}
        publicHolidays={externalPublicHolidays}
      />
    </div>
  )
}
