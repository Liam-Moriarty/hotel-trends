import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { PlatformScoreCards } from '@/sections/guest/PlatformScoreCards'
import { SentimentSection } from '@/sections/guest/SentimentSection'
import { TouchpointBreakdown } from '@/sections/guest/TouchpointBreakdown'
import { RecentReviewsFeed } from '@/sections/guest/RecentReviewsFeed'

import {
  guestPlatforms,
  guestSentimentTrend,
  guestSentimentBreakdown,
  guestTouchpoints,
  guestReviews,
} from '@/mocks/hubos-guest-sentiments-adapter'

export default function GuestPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Guest Experience</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Real-time sentiment, CRM profiles &amp; service recovery
          </p>
        </div>
        <Button variant="destructive" size="sm" className="flex items-center gap-2">
          <Bell className="w-4 h-4" />1 Negative Alert
        </Button>
      </div>

      {/* Platform score KPI cards */}
      <PlatformScoreCards platforms={guestPlatforms} />

      {/* Sentiment trend + breakdown donut */}
      <SentimentSection trend={guestSentimentTrend} breakdown={guestSentimentBreakdown} />

      {/* Touchpoint bars + recent reviews feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TouchpointBreakdown touchpoints={guestTouchpoints} />
        <RecentReviewsFeed reviews={guestReviews} />
      </div>
    </div>
  )
}
