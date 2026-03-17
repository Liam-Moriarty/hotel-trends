// apps/web/src/mocks/hubos-guest-sentiments-adapter.ts
//
// Adapts Hub OS guest sentiment mock data into the shapes
// GuestPage section components expect, matched exactly to
// the interfaces in @/interface.
//
// Import from here in GuestPage.tsx — NOT from mocks/index.ts.
// Partner's mocks/index.ts is untouched intentionally.

import type {
  GuestPlatform,
  SentimentDataPoint,
  SentimentBreakdown,
  TouchpointScore,
  GuestReview,
} from '@/interface'

import {
  MOCK_HUBOS_INCIDENTS,
  MOCK_HUBOS_REVIEWS,
  MOCK_HUBOS_SENTIMENT_TREND,
  MOCK_HUBOS_TOUCHPOINTS,
} from './hubos-guest-sentiments.mock'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Derives a score colour matching partner's convention */
const scoreColor = (score: number): string => {
  if (score >= 8) return '#22c55e' // green
  if (score >= 6) return '#f59e0b' // amber
  return '#ef4444' // red
}

/** Converts an ISO date string to a relative time label e.g. "6h ago" */
const relativeTime = (iso: string): string => {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffH = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffH < 1) return 'Just now'
  if (diffH < 24) return `${diffH}h ago`
  const diffD = Math.floor(diffH / 24)
  return `${diffD}d ago`
}

/** Extracts the first letter of a guest display name e.g. "L. Nguyen" → "L" */
const initial = (name: string): string => name.charAt(0).toUpperCase()

// ─── guestPlatforms → PlatformScoreCards ──────────────────────────────────────
// Normalises ratings to the scale each platform uses:
//   Google / TripAdvisor → /5   (divide Hub OS /10 rating by 2)
//   Booking.com / Expedia / Duve → /10  (keep as-is)

// 4 platforms only — matches PlatformScoreCards lg:grid-cols-4 layout.
// Duve is excluded here as it's an internal feedback tool, not a public
// review platform. Include it if the grid is ever updated to 5 columns.
const PLATFORM_CONFIG: Record<string, { outOf: number; initial: string }> = {
  Google: { outOf: 5, initial: 'G' },
  TripAdvisor: { outOf: 5, initial: 'T' },
  'Booking.com': { outOf: 10, initial: 'B' },
  Expedia: { outOf: 10, initial: 'E' },
}

export const guestPlatforms: GuestPlatform[] = Object.entries(PLATFORM_CONFIG).map(
  ([platform, { outOf, initial: ini }]) => {
    const reviews = MOCK_HUBOS_REVIEWS.filter(r => r.platform === platform)
    const rawAvg = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0
    const score =
      outOf === 5
        ? Math.round((rawAvg / 2) * 10) / 10 // convert /10 → /5
        : Math.round(rawAvg * 10) / 10 // keep /10
    return {
      name: platform,
      initial: ini,
      reviews: `${reviews.length} review${reviews.length !== 1 ? 's' : ''}`,
      score,
      outOf,
    }
  }
)

// ─── guestSentimentTrend → SentimentSection (line/area chart) ─────────────────
// Partner's SentimentDataPoint expects a single score per month.
// We derive a weighted score: (positive×10 + neutral×5 + negative×0) / total

export const guestSentimentTrend: SentimentDataPoint[] = MOCK_HUBOS_SENTIMENT_TREND.map(pt => {
  const total = pt.positive + pt.neutral + pt.negative
  const score = total > 0 ? Math.round(((pt.positive * 10 + pt.neutral * 5) / total) * 10) / 10 : 0
  // "2024-W03" → "W03" — matches the XAxis label width in SentimentSection
  const month = pt.week.split('-')[1]
  return { month, score }
})

// ─── guestSentimentBreakdown → SentimentSection (donut) ───────────────────────

const sentimentCounts = MOCK_HUBOS_INCIDENTS.reduce(
  (acc, inc) => {
    acc[inc.sentiment] = (acc[inc.sentiment] ?? 0) + 1
    return acc
  },
  {} as Record<string, number>
)

const sentimentTotal = Object.values(sentimentCounts).reduce((a, b) => a + b, 0)
const toPct = (key: string) =>
  sentimentTotal > 0 ? Math.round(((sentimentCounts[key] ?? 0) / sentimentTotal) * 100) : 0

export const guestSentimentBreakdown: SentimentBreakdown[] = [
  { label: 'Positive', value: toPct('Positive'), color: '#22c55e' },
  { label: 'Neutral', value: toPct('Neutral'), color: '#eab308' },
  { label: 'Negative', value: toPct('Negative'), color: '#ef4444' },
]

// ─── guestTouchpoints → TouchpointBreakdown ───────────────────────────────────

export const guestTouchpoints: TouchpointScore[] = MOCK_HUBOS_TOUCHPOINTS.map(tp => ({
  label: tp.label,
  score: tp.score,
  color: scoreColor(tp.score),
}))

// ─── guestReviews → RecentReviewsFeed ─────────────────────────────────────────
// Normalises rating to star scale (/5) and derives positive boolean from sentiment

export const guestReviews: GuestReview[] = MOCK_HUBOS_REVIEWS.map(r => ({
  initial: initial(r.guestName),
  name: r.guestName,
  platform: `via ${r.platform}`,
  stars: Math.round(r.rating / 2), // /10 → /5 stars
  text: r.reviewText,
  tags: r.tags,
  time: relativeTime(r.reviewDate),
  positive: r.sentiment === 'Positive',
}))
