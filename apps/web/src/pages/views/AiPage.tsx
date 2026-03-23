import AiForecastingHeader from '@/sections/ai-forecasting/AiForecastingHeader'
import AiStatusStrip from '@/sections/ai-forecasting/AiStatusStrip'
import { AiForecastingPanel } from '@/sections/ai-forecasting/AiForecastingPanel'

export default function AiPage() {
  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 max-h-[75%] overflow-hidden">
        <AiForecastingHeader />
        <AiStatusStrip />
        <AiForecastingPanel className="flex-1 min-h-0" />
      </main>
    </div>
  )
}
