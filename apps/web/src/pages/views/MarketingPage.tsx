import {
  marketingKpis,
  adsPerformanceData,
  marketingFunnelSteps,
  roasChannels,
  wastedSpend,
  attributionData,
  attributionColors,
  emailCampaigns,
} from '@/mocks'
import { MarketingKpiCards } from '@/sections/marketing/MarketingKpiCards'
import { AdsPerformanceSection } from '@/sections/marketing/AdsPerformanceSection'
import { RoasChannelSection } from '@/sections/marketing/RoasChannelSection'
import { AttributionEmailSection } from '@/sections/marketing/AttributionEmailSection'

export default function MarketingPage() {
  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <MarketingKpiCards kpis={marketingKpis} />

      {/* Ads Performance + Funnel */}
      <AdsPerformanceSection adsData={adsPerformanceData} funnelSteps={marketingFunnelSteps} />

      {/* ROAS + Attribution & Email */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RoasChannelSection channels={roasChannels} wastedSpend={wastedSpend} />
        <AttributionEmailSection
          attributionData={attributionData}
          attributionColors={attributionColors}
          emailCampaigns={emailCampaigns}
        />
      </div>
    </div>
  )
}
