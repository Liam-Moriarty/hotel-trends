import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { GuestReview } from '@/interface'

interface RecentReviewsFeedProps {
  reviews: GuestReview[]
}

/**
 * Scrollable card listing the most recent guest reviews pulled from all
 * connected review platforms, with inline star ratings and topic tags.
 */
export function RecentReviewsFeed({ reviews }: RecentReviewsFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {reviews.map((r, i) => (
          <div key={i} className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                  {r.initial}
                </div>
                <div>
                  <span className="text-sm font-semibold">{r.name}</span>
                  <span className="text-xs text-muted-foreground ml-1">{r.platform}</span>
                </div>
              </div>
              <div className="flex gap-0.5 text-yellow-400 text-sm">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={idx < r.stars ? 'text-yellow-400' : 'text-muted-foreground'}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{r.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {r.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{r.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
