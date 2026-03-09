import {
  throughputData,
  coreSystemsMocks,
  guestCrmMocks,
  distributionMocks,
  fbEventsMocks,
  smartBuildingMocks,
} from '@/mocks'
import { DataPageHeader } from '@/sections/data/DataPageHeader'
import { DataPageStats } from '@/sections/data/DataPageStats'
import { PipelineThroughputSection } from '@/sections/data/PipelineThroughputSection'
import { DataIntegrationsSection } from '@/sections/data/DataIntegrationsSection'
import { DataArchitectureSection } from '@/sections/data/DataArchitectureSection'

export default function DataPage() {
  const healthyCount = [
    ...coreSystemsMocks,
    ...guestCrmMocks,
    ...distributionMocks,
    ...fbEventsMocks,
    ...smartBuildingMocks,
  ].filter(i => i.status === 'healthy').length

  const warningCount = [
    ...coreSystemsMocks,
    ...guestCrmMocks,
    ...distributionMocks,
    ...fbEventsMocks,
    ...smartBuildingMocks,
  ].filter(i => i.status === 'warning').length

  const errorCount = [
    ...coreSystemsMocks,
    ...guestCrmMocks,
    ...distributionMocks,
    ...fbEventsMocks,
    ...smartBuildingMocks,
  ].filter(i => i.status === 'error').length

  return (
    <div className="p-6 space-y-6">
      <DataPageHeader />

      <DataPageStats
        healthyCount={healthyCount}
        warningCount={warningCount}
        errorCount={errorCount}
      />

      <PipelineThroughputSection data={throughputData} />

      <DataIntegrationsSection
        coreSystems={coreSystemsMocks}
        guestCrm={guestCrmMocks}
        distribution={distributionMocks}
        fbEvents={fbEventsMocks}
        smartBuilding={smartBuildingMocks}
      />

      <DataArchitectureSection />
    </div>
  )
}
