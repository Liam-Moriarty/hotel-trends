// packages/shared/src/schemas/hubos-guest-sentiments.ts

import { z } from 'zod'

// ─── Enums ────────────────────────────────────────────────────────────────────

export const HubOSIncidentTypeSchema = z.enum(['Complaint', 'Compliment', 'Suggestion', 'Request'])

export const HubOSIncidentStatusSchema = z.enum(['Open', 'InProgress', 'Resolved', 'Escalated'])

export const HubOSDepartmentSchema = z.enum([
  'FoodAndBeverage',
  'Housekeeping',
  'Maintenance',
  'FrontDesk',
  'WiFi',
  'Concierge',
  'Parking',
  'Spa',
])

export const HubOSSentimentSchema = z.enum(['Positive', 'Neutral', 'Negative'])

// ─── Core incident record (Hub OS "Guest Experience" module) ──────────────────

export const HubOSGuestIncidentSchema = z.object({
  incidentId: z.string(),
  hotelId: z.string(),

  // Guest linkage — join on reservationId to cross-reference PMS data
  reservationId: z.string().nullable(),
  roomNumber: z.string().nullable(), // join key to hubos-rooms / hotel-rooms-master

  incidentType: HubOSIncidentTypeSchema,
  department: HubOSDepartmentSchema,
  sentiment: HubOSSentimentSchema,
  status: HubOSIncidentStatusSchema,

  title: z.string(), // short label, e.g. "Noisy AC unit"
  description: z.string(), // full guest-reported text

  // Resolution tracking
  reportedAt: z.string(), // ISO 8601
  resolvedAt: z.string().nullable(),
  resolutionMinutes: z.number().nullable(), // null until resolved
  resolutionNote: z.string().nullable(),

  // Follow-up before checkout (Hub OS "Timely Guest Follow-Up" feature)
  followUpCompleted: z.boolean(),

  // Source of feedback
  source: z.enum(['GuestInTouch', 'FrontDesk', 'Duve', 'Manual']),

  // Staff member who handled it
  assignedTo: z.string().nullable(),
})

// ─── Platform review record (Google, TripAdvisor, OTA, Duve) ─────────────────
// Feeds guestPlatforms and guestReviews

export const HubOSPlatformReviewSchema = z.object({
  reviewId: z.string(),
  hotelId: z.string(),
  platform: z.enum(['Google', 'TripAdvisor', 'Booking.com', 'Expedia', 'Duve']),

  // Nullable — not all OTA reviews link back to a reservation
  reservationId: z.string().nullable(),
  roomNumber: z.string().nullable(),

  rating: z.number().min(1).max(10), // normalised to /10 across platforms
  sentiment: HubOSSentimentSchema,
  reviewText: z.string(),
  guestName: z.string(), // display name only — no PII beyond what's public
  reviewDate: z.string(), // ISO 8601

  // Which touchpoints the review mentions — feeds TouchpointBreakdown
  mentionedTouchpoints: z.array(HubOSDepartmentSchema),

  // Hub OS parsed tags from NLP (or manual tagging)
  tags: z.array(z.string()),

  // Whether a response has been sent (Trust Index integration point)
  responded: z.boolean(),
})

// ─── Sentiment trend point (weekly rollup) ───────────────────────────────────
// Feeds guestSentimentTrend chart

export const HubOSSentimentTrendPointSchema = z.object({
  week: z.string(), // e.g. "2024-W03" — ISO week
  positive: z.number(), // count
  neutral: z.number(),
  negative: z.number(),
  totalIncidents: z.number(),
  avgResolutionMinutes: z.number().nullable(),
})

// ─── Touchpoint score (department-level rollup) ───────────────────────────────
// Feeds TouchpointBreakdown bars

export const HubOSTouchpointScoreSchema = z.object({
  department: HubOSDepartmentSchema,
  label: z.string(), // display name, e.g. "Food & Beverage"
  score: z.number().min(0).max(10), // weighted sentiment score
  totalMentions: z.number(),
  positiveCount: z.number(),
  negativeCount: z.number(),
  trend: z.enum(['Up', 'Down', 'Stable']),
})

// ─── Exported types ────────────────────────────────────────────────────────────

export type HubOSGuestIncident = z.infer<typeof HubOSGuestIncidentSchema>
export type HubOSPlatformReview = z.infer<typeof HubOSPlatformReviewSchema>
export type HubOSSentimentTrendPoint = z.infer<typeof HubOSSentimentTrendPointSchema>
export type HubOSTouchpointScore = z.infer<typeof HubOSTouchpointScoreSchema>
