import { MarketingHeader } from '@/sections/marketing/MarketingHeader'
import { MarketingStatusStrip } from '@/sections/marketing/MarketingStatusStrip'
import { MarketingPanel } from '@/sections/marketing/MarketingPanel'

export default function MarketingPage() {
  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 overflow-hidden">
        <MarketingHeader />
        <MarketingStatusStrip />
        <MarketingPanel className="flex-1 min-h-0 max-h-[65%]" />
      </main>
    </div>
  )
}
