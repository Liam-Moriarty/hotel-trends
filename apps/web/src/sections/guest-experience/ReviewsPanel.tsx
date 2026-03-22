import { useState } from 'react'
import { ArrowUpDown, Star } from 'lucide-react'
import type { HubOSPlatformReview } from '@repo/shared'
import { MOCK_HUBOS_REVIEWS } from '@/mocks/hubos-guest-sentiments.mock'

import googleIcon from './review-icons/google-icon-logo-svgrepo-com.svg'
import tripadvisorIcon from './review-icons/tripadvisor-svgrepo-com.svg'
import bookingIcon from './review-icons/Booking.com_Icon_2022.svg'
import expediaIcon from './review-icons/Expedia_Icon_2022.svg'

// ── Platform configuration ────────────────────────────────────────────────────

type PlatformFilter = 'all' | 'Google' | 'TripAdvisor' | 'Booking.com' | 'Expedia'

const PLATFORMS: {
  id: PlatformFilter
  label: string
  icon: string
  outOf: number
  scoreStatus: 'success' | 'warning' | 'error'
}[] = [
  { id: 'Google', label: 'Google', icon: googleIcon, outOf: 5, scoreStatus: 'error' },
  {
    id: 'TripAdvisor',
    label: 'TripAdvisor',
    icon: tripadvisorIcon,
    outOf: 5,
    scoreStatus: 'error',
  },
  { id: 'Booking.com', label: 'Booking.com', icon: bookingIcon, outOf: 10, scoreStatus: 'warning' },
  { id: 'Expedia', label: 'Expedia', icon: expediaIcon, outOf: 10, scoreStatus: 'success' },
]

const SCORE_COLORS: Record<string, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
}

function getPlatformScore(platform: string, outOf: number): number {
  const reviews = MOCK_HUBOS_REVIEWS.filter(r => r.platform === platform)
  if (!reviews.length) return 0
  const rawAvg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  return Math.round((outOf === 5 ? rawAvg / 2 : rawAvg) * 10) / 10
}

const platformScores: Record<string, number> = {
  Google: getPlatformScore('Google', 5),
  TripAdvisor: getPlatformScore('TripAdvisor', 5),
  'Booking.com': getPlatformScore('Booking.com', 10),
  Expedia: getPlatformScore('Expedia', 10),
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffH = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffH < 1) return 'Just now'
  if (diffH < 24) return `${diffH}h ago`
  return `${Math.floor(diffH / 24)}d ago`
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

// ── StarRating ────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2) // /10 → /5
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className="text-[11px]"
          style={{ color: i <= stars ? 'var(--status-warning)' : 'var(--text-ghost)' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

// ── PlatformPill ──────────────────────────────────────────────────────────────

function PlatformPill({
  label,
  icon,
  count,
  score,
  scoreStatus,
  active,
  onClick,
}: {
  label: string
  icon?: string
  count?: number
  score?: number
  scoreStatus?: 'success' | 'warning' | 'error'
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors border"
      style={{
        background: active ? 'var(--surface-active)' : 'var(--surface-container-high)',
        borderColor: active ? 'var(--border-default)' : 'var(--border-subtle)',
        color: active ? 'var(--text-primary)' : 'var(--text-muted)',
      }}
    >
      {icon ? (
        <img src={icon} alt={label} className="w-3.5 h-3.5 object-contain" />
      ) : (
        <span className="font-bold">{label}</span>
      )}
      {count !== undefined && <span className="tabular-nums">{count}</span>}
      {score !== undefined && scoreStatus && (
        <>
          <Star size={9} />
          <span className="tabular-nums" style={{ color: SCORE_COLORS[scoreStatus] }}>
            {score.toFixed(1)}
          </span>
        </>
      )}
    </button>
  )
}

// ── ReviewCard ────────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: HubOSPlatformReview }) {
  const [expanded, setExpanded] = useState(false)
  const initials = getInitials(review.guestName)

  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: 'var(--surface-container-high)', color: 'var(--text-primary)' }}
          >
            {initials}
          </div>
          <div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {review.guestName}
            </span>
            <span className="text-xs ml-1.5" style={{ color: 'var(--text-muted)' }}>
              via {review.platform}
            </span>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <p
        className={`text-xs mt-1.5 cursor-pointer ${!expanded ? 'line-clamp-3' : ''}`}
        style={{ color: 'var(--text-secondary)' }}
        onClick={() => setExpanded(e => !e)}
      >
        {review.reviewText}
      </p>

      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {review.tags.map(tag => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium border"
              style={{
                background: 'var(--surface-container-high)',
                color: 'var(--text-muted)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-[10px] tabular-nums mt-2" style={{ color: 'var(--text-ghost)' }}>
        {relativeTime(review.reviewDate)}
      </p>
    </div>
  )
}

// ── ReviewsPanel ──────────────────────────────────────────────────────────────

export function ReviewsPanel({ className }: { className?: string }) {
  const [activeFilter, setActiveFilter] = useState<PlatformFilter>('all')
  const [sortOrder, setSortOrder] = useState<'recent' | 'lowest'>('recent')

  const filteredReviews = MOCK_HUBOS_REVIEWS.filter(
    r => activeFilter === 'all' || r.platform === activeFilter
  ).sort((a, b) =>
    sortOrder === 'recent'
      ? new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
      : a.rating - b.rating
  )

  return (
    <div
      className={`flex flex-col rounded-xl ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Guest Reviews
        </p>
        <button
          className="flex items-center gap-1 text-xs transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setSortOrder(s => (s === 'recent' ? 'lowest' : 'recent'))}
        >
          <ArrowUpDown size={11} />
          {sortOrder === 'recent' ? 'Most Recent' : 'Lowest First'}
        </button>
      </div>

      {/* Platform filter pills */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0 flex-wrap"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <PlatformPill
          label="All"
          count={MOCK_HUBOS_REVIEWS.length}
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        />
        {PLATFORMS.map(p => (
          <PlatformPill
            key={p.id}
            label={p.label}
            icon={p.icon}
            score={platformScores[p.id]}
            scoreStatus={p.scoreStatus}
            active={activeFilter === p.id}
            onClick={() => setActiveFilter(p.id)}
          />
        ))}
      </div>

      {/* Review feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredReviews.map((review, idx) => (
          <div
            key={review.reviewId}
            style={{
              borderBottom:
                idx < filteredReviews.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}
