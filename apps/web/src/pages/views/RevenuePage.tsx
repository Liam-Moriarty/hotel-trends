import { RevenuePricingHeader } from '@/sections/revenue-pricing/RevenuePricingHeader'
import { RevenuePricingStatusStrip } from '@/sections/revenue-pricing/RevenuePricingStatusStrip'
import { RevenuePricingPanel } from '@/sections/revenue-pricing/RevenuePricingPanel'

export default function RevenuePage() {
  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 overflow-hidden">
        <RevenuePricingHeader />
        <RevenuePricingStatusStrip />
        <RevenuePricingPanel className="flex-1 min-h-0 max-h-[80%]" />
      </main>
    </div>
  )
}
