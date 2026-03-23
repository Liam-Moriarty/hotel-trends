import { ExternalIntelligenceHeader } from '@/sections/external-intelligence/ExternalIntelligenceHeader'
import { WeatherHeroStrip } from '@/sections/external-intelligence/WeatherHeroStrip'
import { ExternalIntelligencePanel } from '@/sections/external-intelligence/ExternalIntelligencePanel'

export default function ExternalPage() {
  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 overflow-hidden">
        <ExternalIntelligenceHeader />
        <WeatherHeroStrip />
        <ExternalIntelligencePanel className="flex-1 min-h-0 max-h-[65%]" />
      </main>
    </div>
  )
}
