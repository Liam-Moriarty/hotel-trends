import { GuestExperienceHeader } from '@/sections/guest-experience/GuestExperienceHeader'
import { GuestExperienceStatusStrip } from '@/sections/guest-experience/GuestExperienceStatusStrip'
import { SentimentHub } from '@/sections/guest-experience/SentimentHub'
import { ReviewsPanel } from '@/sections/guest-experience/ReviewsPanel'

export default function GuestPage() {
  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 max-h-[85%] overflow-hidden">
        <GuestExperienceHeader />
        <GuestExperienceStatusStrip />
        <div className="flex gap-4 flex-1 min-h-0">
          <SentimentHub className="flex-1 min-w-0 min-h-0" />
          <ReviewsPanel className="w-[420px] shrink-0 min-h-0" />
        </div>
      </main>
    </div>
  )
}
