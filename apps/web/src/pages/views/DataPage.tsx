import {
  coreSystemsMocks,
  guestCrmMocks,
  distributionMocks,
  fbEventsMocks,
  smartBuildingMocks,
} from '@/mocks'
import type { EnrichedIntegration, IntegrationCategory } from '@/sections/data-integrations/types'
import { DataIntegrationsHeader } from '@/sections/data-integrations/DataIntegrationsHeader'
import { IntegrationsStatusStrip } from '@/sections/data-integrations/IntegrationsStatusStrip'
import { PipelinePanel } from '@/sections/data-integrations/PipelinePanel'
import { IntegrationBoardPanel } from '@/sections/data-integrations/IntegrationBoardPanel'

// Enrich warning/error integrations with issue metadata
const ISSUE_OVERRIDES: Record<
  string,
  { issueType: string; actionLabel: 'Diagnose' | 'Investigate' }
> = {
  pos: { issueType: 'High Latency', actionLabel: 'Investigate' },
  ota: { issueType: 'Timeout', actionLabel: 'Diagnose' },
  fbpos: { issueType: 'High Latency', actionLabel: 'Investigate' },
}

function withCategory(
  arr: typeof coreSystemsMocks,
  category: IntegrationCategory
): EnrichedIntegration[] {
  return arr.map(i => ({
    ...i,
    category,
    ...(ISSUE_OVERRIDES[i.id] ?? {}),
  }))
}

export default function DataPage() {
  const integrations: EnrichedIntegration[] = [
    ...withCategory(coreSystemsMocks, 'core'),
    ...withCategory(guestCrmMocks, 'crm'),
    ...withCategory(distributionMocks, 'distribution'),
    ...withCategory(fbEventsMocks, 'fnb'),
    ...withCategory(smartBuildingMocks, 'building'),
  ]

  const healthyCount = integrations.filter(i => i.status === 'healthy').length
  const warningCount = integrations.filter(i => i.status === 'warning').length
  const errorCount = integrations.filter(i => i.status === 'error').length

  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 overflow-hidden">
        <DataIntegrationsHeader
          healthy={healthyCount}
          warnings={warningCount}
          errors={errorCount}
        />

        <IntegrationsStatusStrip integrations={integrations} />

        {/* Panels row fills all remaining height */}
        <div className="flex gap-4 flex-1 min-h-0 max-h-[72%]">
          <PipelinePanel className="w-[50%] shrink-0" />
          <IntegrationBoardPanel integrations={integrations} className="flex-1 min-w-0" />
        </div>
      </main>
    </div>
  )
}
