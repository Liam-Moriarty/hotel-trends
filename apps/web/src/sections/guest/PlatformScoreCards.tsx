import { Card, CardContent } from '@/components/ui/card'
import { StarRating } from '@/components/StarRating'
import type { GuestPlatform } from '@/interface'

interface PlatformScoreCardsProps {
  platforms: GuestPlatform[]
}

/**
 * Renders one KPI-style card per review platform, showing the aggregate
 * score and a normalised star rating.
 */
export function PlatformScoreCards({ platforms }: PlatformScoreCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {platforms.map(p => (
        <Card key={p.name}>
          <CardContent className="pt-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center font-bold text-sm">
                {p.initial}
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.reviews}</p>
              </div>
            </div>
            <p className="text-3xl font-bold tabular-nums">{p.score}</p>
            <StarRating score={p.score} outOf={p.outOf} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
