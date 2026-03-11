/**
 * packages/shared/src/schemas/integrations.ts
 *
 * Zod schemas and TypeScript types for PMS reservation data ingested
 * from the hotel's Property Management System (Opera / OHIP format).
 *
 * Used by:
 *  - apps/functions  → Dataflow ETL pipeline validation
 *  - apps/functions  → tRPC input/output validation
 *  - apps/web        → Mock data conformance (Phase 0)
 *
 * Rules:
 *  - All schemas defined here, never duplicated in apps/
 *  - Zod only — no Yup, Joi, or Valibot
 *  - Every nullable field is explicitly marked .nullable()
 *  - Every optional field (may be absent from payload) is marked .optional()
 */

import { z } from 'zod'

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const ReservationStatusSchema = z.enum([
  'Reserved',
  'CheckedIn',
  'CheckedOut',
  'Cancelled',
  'NoShow',
  'WaitList',
])

export const ReservationIdTypeSchema = z.enum(['Reservation', 'Confirmation', 'External'])

export const RoomTypeSchema = z.enum([
  'STD', // Standard
  'DLX', // Deluxe
  'JNR', // Junior Suite
  'STE', // Suite
  'PSTE', // Presidential Suite
])

export const RoomClassSchema = z.enum(['Standard', 'Junior Suite', 'Suite', 'Presidential'])

export const HousekeepingStatusSchema = z.enum([
  'Clean',
  'Dirty',
  'Inspected',
  'OutOfOrder',
  'OutOfService',
])

export const NameTypeSchema = z.enum(['Primary', 'Accompanying'])

export const MembershipLevelSchema = z.enum(['SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'])

export const PaymentMethodSchema = z.enum([
  'CC', // Credit Card
  'CA', // Cash / Corporate Account
  'BT', // Bank Transfer
])

export const VipCodeSchema = z.enum([
  'CEL', // Celebrity
  'VIP1', // VIP Tier 1
  'VIP2', // VIP Tier 2
])

export const GuaranteeCodeSchema = z.enum([
  'CC', // Credit Card guarantee
  '4PMHOLD', // Hold until 4pm
  'CORPBILL', // Corporate billing
])

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------

/**
 * A single entry in the reservationIdList array.
 * Each reservation can have multiple ID types (internal, confirmation, external OTA).
 */
export const ReservationIdSchema = z.object({
  type: ReservationIdTypeSchema,
  id: z.string().min(1),
})

/**
 * Total amount with currency.
 * Cancelled reservations will have amount: 0.
 */
export const TotalAmountSchema = z.object({
  amount: z.number().nonnegative(),
  currencyCode: z.string().length(3), // ISO 4217 e.g. "AUD", "USD"
})

/**
 * Physical room assignment details.
 * roomNumber and housekeepingRoomStatus are null for cancelled reservations.
 */
export const RoomDetailsSchema = z.object({
  roomType: RoomTypeSchema,
  roomNumber: z.string().nullable(),
  housekeepingRoomStatus: HousekeepingStatusSchema.nullable(),
  roomClass: RoomClassSchema,
})

/**
 * Rate plan attached to the room stay.
 * Determines booking channel and market segment.
 */
export const RatePlanSchema = z.object({
  ratePlanCode: z.string().min(1),
  marketCode: z.string().min(1),
  sourceCode: z.string().min(1),
})

/**
 * Core stay details — dates, amount, room, and rate plan.
 */
export const RoomStaySchema = z.object({
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  expectedArrivalTime: z.string().datetime({ local: true }),
  totalAmount: TotalAmountSchema,
  roomDetails: RoomDetailsSchema,
  ratePlans: z.array(RatePlanSchema).min(1),
})

/**
 * Guest name entry. A booking can have one Primary and optional Accompanying guests.
 */
export const PersonNameSchema = z.object({
  givenName: z.string().min(1),
  surname: z.string().min(1),
  nameType: NameTypeSchema,
})

/**
 * Loyalty membership. Optional — many guests have no membership.
 */
export const MembershipSchema = z.object({
  membershipType: z.string().min(1), // e.g. "OZ"
  membershipLevel: MembershipLevelSchema,
  membershipNumber: z.string().min(1),
})

/**
 * PMS profile ID reference.
 */
export const ProfileIdSchema = z.object({
  type: z.literal('Profile'),
  id: z.string().min(1),
})

/**
 * Guest customer details — name, membership, profile link.
 */
export const CustomerSchema = z.object({
  personName: z.array(PersonNameSchema).min(1),
  membership: z.array(MembershipSchema), // empty array = no membership
  profileIdList: z.array(ProfileIdSchema),
})

export const GuestDetailsSchema = z.object({
  customer: CustomerSchema,
})

/**
 * Group/conference block association.
 * null for individual transient bookings.
 */
export const BlockInfoSchema = z.object({
  blockCode: z.string().min(1),
  blockId: z.string().min(1),
})

// ---------------------------------------------------------------------------
// Root reservation schema
// ---------------------------------------------------------------------------

export const ReservationSchema = z.object({
  reservationIdList: z.array(ReservationIdSchema).min(1),
  reservationStatus: ReservationStatusSchema,
  roomStay: RoomStaySchema,
  guestDetails: GuestDetailsSchema,
  paymentMethod: PaymentMethodSchema,
  guaranteeCode: GuaranteeCodeSchema,
  vipCode: VipCodeSchema.nullable().optional(), // null or absent = not a VIP
  createdBy: z.string().min(1),
  externalReference: z.string().min(1),
  blockInfo: BlockInfoSchema.nullable().optional(), // null or absent = transient booking
})

/**
 * Top-level PMS response envelope.
 * Matches the raw payload shape returned by the PMS API or CSV export.
 */
export const PmsReservationsPayloadSchema = z.object({
  reservations: z.object({
    hotelId: z.string().min(1),
    reservationInfo: z.array(ReservationSchema).min(1),
    totalResults: z.number().int().nonnegative(),
  }),
})

// ---------------------------------------------------------------------------
// TypeScript types (inferred from schemas — never manually defined)
// ---------------------------------------------------------------------------

export type ReservationStatus = z.infer<typeof ReservationStatusSchema>
export type ReservationIdType = z.infer<typeof ReservationIdTypeSchema>
export type RoomType = z.infer<typeof RoomTypeSchema>
export type RoomClass = z.infer<typeof RoomClassSchema>
export type HousekeepingStatus = z.infer<typeof HousekeepingStatusSchema>
export type NameType = z.infer<typeof NameTypeSchema>
export type MembershipLevel = z.infer<typeof MembershipLevelSchema>
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export type VipCode = z.infer<typeof VipCodeSchema>
export type GuaranteeCode = z.infer<typeof GuaranteeCodeSchema>

export type ReservationId = z.infer<typeof ReservationIdSchema>
export type TotalAmount = z.infer<typeof TotalAmountSchema>
export type RoomDetails = z.infer<typeof RoomDetailsSchema>
export type RatePlan = z.infer<typeof RatePlanSchema>
export type RoomStay = z.infer<typeof RoomStaySchema>
export type PersonName = z.infer<typeof PersonNameSchema>
export type Membership = z.infer<typeof MembershipSchema>
export type ProfileId = z.infer<typeof ProfileIdSchema>
export type Customer = z.infer<typeof CustomerSchema>
export type GuestDetails = z.infer<typeof GuestDetailsSchema>
export type BlockInfo = z.infer<typeof BlockInfoSchema>
export type Reservation = z.infer<typeof ReservationSchema>
export type PmsReservationsPayload = z.infer<typeof PmsReservationsPayloadSchema>

// ---------------------------------------------------------------------------
// Utility: safe parse helper (use in Dataflow ETL + tRPC procedures)
// ---------------------------------------------------------------------------

/**
 * Safely parses a raw PMS payload.
 * Returns typed data on success, or throws a formatted ZodError on failure.
 *
 * Usage in Dataflow ETL:
 *   const payload = parsePmsPayload(rawJson);
 *   payload.reservations.reservationInfo.forEach(r => { ... });
 *
 * Usage in tRPC router:
 *   const payload = parsePmsPayload(input);
 */
export function parsePmsPayload(raw: unknown): PmsReservationsPayload {
  const result = PmsReservationsPayloadSchema.safeParse(raw)

  if (!result.success) {
    const formatted = result.error.errors
      .map(e => `  [${e.path.join('.')}] ${e.message}`)
      .join('\n')
    throw new Error(`PMS payload validation failed:\n${formatted}`)
  }

  return result.data
}

/**
 * Extracts a specific ID type from a reservation's reservationIdList.
 * Returns undefined if that ID type is not present.
 *
 * Usage:
 *   const confirmationId = getReservationId(reservation, "Confirmation");
 */
export function getReservationId(
  reservation: Reservation,
  type: ReservationIdType
): string | undefined {
  return reservation.reservationIdList.find(id => id.type === type)?.id
}

/**
 * Returns the primary guest name from a reservation.
 */
export function getPrimaryGuest(reservation: Reservation): PersonName | undefined {
  return reservation.guestDetails.customer.personName.find(n => n.nameType === 'Primary')
}

/**
 * Returns true if this reservation is linked to a group/conference block.
 */
export function isBlockReservation(reservation: Reservation): boolean {
  return reservation.blockInfo != null
}

/**
 * Returns the length of stay in nights.
 */
export function getLengthOfStay(reservation: Reservation): number {
  const arrival = new Date(reservation.roomStay.arrivalDate)
  const departure = new Date(reservation.roomStay.departureDate)
  return Math.round((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24))
}
