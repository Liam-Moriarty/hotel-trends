// apps/web/src/mocks/hubos-guest-sentiments.mock.ts
//
// Hub OS guest sentiment mocks — standalone.
// Not imported from mocks/index.ts intentionally.
// Converge with partner's GuestPlatform/GuestReview types
// once page ownership and interface shapes are agreed.
//
// Cross-referenced against:
//   - pms-reservations-mock.json  (reservationId, roomNumber)
//   - hotel-rooms-master.json     (roomNumber, roomType)
// All dates fall within the Jan 2024 reservation window.
//
// MOCK — replace with Firestore reads from:
//   /hotels/SAND01/hubos-guest-incidents
//   /hotels/SAND01/hubos-platform-reviews
// when Hub OS API access is confirmed.

import type {
  HubOSGuestIncident,
  HubOSPlatformReview,
  HubOSSentimentTrendPoint,
  HubOSTouchpointScore,
} from '@repo/shared'

// ─── 7 Incidents ──────────────────────────────────────────────────────────────

export const MOCK_HUBOS_INCIDENTS: HubOSGuestIncident[] = [
  {
    // Res 123702 — Sarah Mitchell, Suite 501, Booking.com, CheckedIn
    incidentId: 'INC-001',
    hotelId: 'SAND01',
    reservationId: '123702',
    roomNumber: '501',
    incidentType: 'Complaint',
    department: 'Housekeeping',
    sentiment: 'Negative',
    status: 'Resolved',
    title: 'Room not serviced by 3pm',
    description:
      'Guest called front desk at 15:05 to report room had not been serviced. Expected turndown by 14:00.',
    reportedAt: '2024-01-08T15:05:00+11:00',
    resolvedAt: '2024-01-08T15:42:00+11:00',
    resolutionMinutes: 37,
    resolutionNote:
      'Housekeeping team dispatched immediately. Room serviced and supervisor apologised in person. Complimentary amenity left.',
    followUpCompleted: true,
    source: 'FrontDesk',
    assignedTo: 'Priya Sharma',
  },
  {
    // Res 123704 — Amelia Hartley, Presidential Suite 701, Corporate, CheckedIn
    incidentId: 'INC-002',
    hotelId: 'SAND01',
    reservationId: '123704',
    roomNumber: '701',
    incidentType: 'Complaint',
    department: 'Maintenance',
    sentiment: 'Negative',
    status: 'InProgress',
    title: 'AC unit making noise overnight',
    description:
      'Guest reported a rattling sound from the HVAC unit starting around midnight. Sleep was disrupted.',
    reportedAt: '2024-01-11T07:15:00+11:00',
    resolvedAt: null,
    resolutionMinutes: null,
    resolutionNote: null,
    followUpCompleted: false,
    source: 'GuestInTouch',
    assignedTo: 'Brad Tran',
  },
  {
    // Res 123707 — Noah Patel, STD 108, Expedia, CheckedIn
    incidentId: 'INC-003',
    hotelId: 'SAND01',
    reservationId: '123707',
    roomNumber: '108',
    incidentType: 'Complaint',
    department: 'WiFi',
    sentiment: 'Negative',
    status: 'Resolved',
    title: 'Wi-Fi dropping in room 108',
    description:
      'Guest could not maintain a stable connection for a video call. Dropped 3 times in 20 minutes.',
    reportedAt: '2024-01-11T18:45:00+11:00',
    resolvedAt: '2024-01-11T19:20:00+11:00',
    resolutionMinutes: 35,
    resolutionNote:
      'IT reset the access point on floor 1. Signal confirmed stable. Guest offered late checkout.',
    followUpCompleted: true,
    source: 'GuestInTouch',
    assignedTo: 'James Cowperthwaite',
  },
  {
    // Res 123710 — Isabella Ferrari, DLX 305, Direct, CheckedIn
    incidentId: 'INC-004',
    hotelId: 'SAND01',
    reservationId: '123710',
    roomNumber: '305',
    incidentType: 'Compliment',
    department: 'FrontDesk',
    sentiment: 'Positive',
    status: 'Resolved',
    title: 'Outstanding check-in experience',
    description:
      'Guest mentioned that the front desk team went above and beyond to ensure an early check-in was ready despite a busy changeover.',
    reportedAt: '2024-01-12T17:30:00+11:00',
    resolvedAt: '2024-01-12T17:30:00+11:00',
    resolutionMinutes: 0,
    resolutionNote:
      'Positive feedback shared with front desk team. Added to staff recognition log.',
    followUpCompleted: true,
    source: 'Duve',
    assignedTo: null,
  },
  {
    // Res 123713 — Oliver Schmidt, JNR 408, Booking.com, CheckedIn
    incidentId: 'INC-005',
    hotelId: 'SAND01',
    reservationId: '123713',
    roomNumber: '408',
    incidentType: 'Request',
    department: 'FoodAndBeverage',
    sentiment: 'Neutral',
    status: 'Resolved',
    title: 'Late room service order',
    description:
      'Guest requested room service at 22:30. Wanted to confirm kitchen was still open and whether the full menu was available.',
    reportedAt: '2024-01-13T22:32:00+11:00',
    resolvedAt: '2024-01-13T22:35:00+11:00',
    resolutionMinutes: 3,
    resolutionNote:
      'Confirmed late menu available until 23:00. Order placed and delivered in 28 minutes.',
    followUpCompleted: true,
    source: 'GuestInTouch',
    assignedTo: 'Maria Reyes',
  },
  {
    // Res 123716 — Lucas Zhao, Presidential Suite 702, Corporate, CheckedIn
    incidentId: 'INC-006',
    hotelId: 'SAND01',
    reservationId: '123716',
    roomNumber: '702',
    incidentType: 'Complaint',
    department: 'Housekeeping',
    sentiment: 'Negative',
    status: 'Escalated',
    title: 'Minibar not restocked on day 2',
    description:
      'Diamond member noted minibar was not restocked after first night despite daily service being part of the Presidential package.',
    reportedAt: '2024-01-15T09:10:00+11:00',
    resolvedAt: null,
    resolutionMinutes: null,
    resolutionNote: null,
    followUpCompleted: false,
    source: 'FrontDesk',
    assignedTo: 'Priya Sharma',
  },
  {
    // Res 123720 — Abigail Tanaka, STE 508, Corporate, CheckedIn
    incidentId: 'INC-007',
    hotelId: 'SAND01',
    reservationId: '123720',
    roomNumber: '508',
    incidentType: 'Suggestion',
    department: 'Concierge',
    sentiment: 'Neutral',
    status: 'Resolved',
    title: 'Request for local restaurant recommendations',
    description:
      'Platinum guest asked for curated dining suggestions near Epping for a business dinner. Happy with the stay overall.',
    reportedAt: '2024-01-15T18:00:00+11:00',
    resolvedAt: '2024-01-15T18:15:00+11:00',
    resolutionMinutes: 15,
    resolutionNote:
      'Concierge provided 3 options with reservations made at Republic Tavern. Guest confirmed.',
    followUpCompleted: true,
    source: 'Duve',
    assignedTo: 'Sofia Mendez',
  },
]

// ─── 7 Platform Reviews ───────────────────────────────────────────────────────

export const MOCK_HUBOS_REVIEWS: HubOSPlatformReview[] = [
  {
    reviewId: 'REV-001',
    hotelId: 'SAND01',
    platform: 'Google',
    reservationId: '123705', // Liam Nguyen, DLX 302, CheckedOut
    roomNumber: '302',
    rating: 9,
    sentiment: 'Positive',
    reviewText:
      'Fantastic stay. Room was spotless and the bed was incredibly comfortable. Staff at check-in were warm and efficient. Would absolutely return.',
    guestName: 'L. Nguyen',
    reviewDate: '2024-01-08T11:00:00+11:00',
    mentionedTouchpoints: ['FrontDesk', 'Housekeeping'],
    tags: ['cleanliness', 'comfort', 'staff'],
    responded: true,
  },
  {
    reviewId: 'REV-002',
    hotelId: 'SAND01',
    platform: 'TripAdvisor',
    reservationId: '123712', // Charlotte Dubois, JNR 401, CheckedOut
    roomNumber: '401',
    rating: 7,
    sentiment: 'Positive',
    reviewText:
      'Beautiful property and great location. The junior suite was well appointed. One minor issue — the shower pressure was low. Breakfast was excellent.',
    guestName: 'Charlotte D.',
    reviewDate: '2024-01-07T09:30:00+11:00',
    mentionedTouchpoints: ['Housekeeping', 'FoodAndBeverage', 'Maintenance'],
    tags: ['breakfast', 'room quality', 'shower pressure'],
    responded: true,
  },
  {
    reviewId: 'REV-003',
    hotelId: 'SAND01',
    platform: 'Booking.com',
    reservationId: '123721', // Sebastian Murphy, STD 112, CheckedOut
    roomNumber: '112',
    rating: 5,
    sentiment: 'Neutral',
    reviewText:
      'Average stay. Room was clean but compact. Wi-Fi was inconsistent at times. Staff were polite but seemed understaffed during peak check-in hours.',
    guestName: 'S. Murphy',
    reviewDate: '2024-01-12T14:00:00+11:00',
    mentionedTouchpoints: ['WiFi', 'FrontDesk', 'Housekeeping'],
    tags: ['wifi', 'staffing', 'room size'],
    responded: false,
  },
  {
    reviewId: 'REV-004',
    hotelId: 'SAND01',
    platform: 'Expedia',
    reservationId: '123715', // Mia Anderson, STD 115, CheckedOut
    roomNumber: '115',
    rating: 8,
    sentiment: 'Positive',
    reviewText:
      'Great value for the price. The room was comfortable and quiet. Parking was easy with the automated system. Will book again for my next Melbourne trip.',
    guestName: 'Mia A.',
    reviewDate: '2024-01-05T16:00:00+11:00',
    mentionedTouchpoints: ['Parking', 'Housekeeping'],
    tags: ['value', 'parking', 'quiet'],
    responded: true,
  },
  {
    reviewId: 'REV-005',
    hotelId: 'SAND01',
    platform: 'Google',
    reservationId: '123725', // Ryan O'Brien, DLX 310, CheckedOut
    roomNumber: '310',
    rating: 3,
    sentiment: 'Negative',
    reviewText:
      'Disappointed. The room had a musty smell and the minibar was not stocked as advertised. Raised it with staff but felt like it fell on deaf ears.',
    guestName: 'Ryan O.',
    reviewDate: '2024-01-14T10:00:00+11:00',
    mentionedTouchpoints: ['Housekeeping', 'FoodAndBeverage', 'FrontDesk'],
    tags: ['cleanliness', 'minibar', 'staff responsiveness'],
    responded: true,
  },
  {
    reviewId: 'REV-006',
    hotelId: 'SAND01',
    platform: 'Duve',
    reservationId: '123734', // Nathaniel Osei, STE 515, CheckedOut
    roomNumber: '515',
    rating: 9,
    sentiment: 'Positive',
    reviewText:
      'Excellent in every way. The suite was stunning and the concierge team arranged everything perfectly for our anniversary dinner at the Tavern. Highly recommend.',
    guestName: 'Nathaniel O.',
    reviewDate: '2024-01-17T12:00:00+11:00',
    mentionedTouchpoints: ['Concierge', 'FoodAndBeverage'],
    tags: ['suite quality', 'concierge', 'anniversary'],
    responded: true,
  },
  {
    reviewId: 'REV-007',
    hotelId: 'SAND01',
    platform: 'TripAdvisor',
    reservationId: '123743', // Kieran Walsh, STD 230, CheckedOut
    roomNumber: '230',
    rating: 6,
    sentiment: 'Neutral',
    reviewText:
      'Solid business hotel. Room was functional and clean. Nothing remarkable but no complaints either. The digital check-in through the app was a nice touch.',
    guestName: 'K. Walsh',
    reviewDate: '2024-01-17T08:00:00+11:00',
    mentionedTouchpoints: ['FrontDesk', 'Housekeeping'],
    tags: ['business travel', 'digital check-in', 'functional'],
    responded: false,
  },
]

// ─── Sentiment trend (6 weeks, Jan 2024) ─────────────────────────────────────

export const MOCK_HUBOS_SENTIMENT_TREND: HubOSSentimentTrendPoint[] = [
  {
    week: '2024-W01',
    positive: 3,
    neutral: 1,
    negative: 1,
    totalIncidents: 5,
    avgResolutionMinutes: 28,
  },
  {
    week: '2024-W02',
    positive: 4,
    neutral: 2,
    negative: 2,
    totalIncidents: 8,
    avgResolutionMinutes: 31,
  },
  {
    week: '2024-W03',
    positive: 5,
    neutral: 1,
    negative: 3,
    totalIncidents: 9,
    avgResolutionMinutes: 42,
  },
  {
    week: '2024-W04',
    positive: 6,
    neutral: 2,
    negative: 1,
    totalIncidents: 9,
    avgResolutionMinutes: 22,
  },
  {
    week: '2024-W05',
    positive: 4,
    neutral: 3,
    negative: 2,
    totalIncidents: 9,
    avgResolutionMinutes: 35,
  },
  {
    week: '2024-W06',
    positive: 7,
    neutral: 1,
    negative: 1,
    totalIncidents: 9,
    avgResolutionMinutes: 18,
  },
]

// ─── Touchpoint scores (department rollup) ────────────────────────────────────

export const MOCK_HUBOS_TOUCHPOINTS: HubOSTouchpointScore[] = [
  {
    department: 'FrontDesk',
    label: 'Front Desk',
    score: 8.4,
    totalMentions: 12,
    positiveCount: 9,
    negativeCount: 2,
    trend: 'Up',
  },
  {
    department: 'Housekeeping',
    label: 'Housekeeping',
    score: 6.9,
    totalMentions: 18,
    positiveCount: 10,
    negativeCount: 5,
    trend: 'Down',
  },
  {
    department: 'FoodAndBeverage',
    label: 'Food & Beverage',
    score: 8.1,
    totalMentions: 10,
    positiveCount: 8,
    negativeCount: 1,
    trend: 'Stable',
  },
  {
    department: 'WiFi',
    label: 'Wi-Fi',
    score: 5.5,
    totalMentions: 8,
    positiveCount: 3,
    negativeCount: 4,
    trend: 'Down',
  },
  {
    department: 'Concierge',
    label: 'Concierge',
    score: 9.0,
    totalMentions: 6,
    positiveCount: 6,
    negativeCount: 0,
    trend: 'Up',
  },
  {
    department: 'Maintenance',
    label: 'Maintenance',
    score: 6.2,
    totalMentions: 7,
    positiveCount: 3,
    negativeCount: 3,
    trend: 'Stable',
  },
  {
    department: 'Parking',
    label: 'Parking',
    score: 8.7,
    totalMentions: 4,
    positiveCount: 4,
    negativeCount: 0,
    trend: 'Up',
  },
]
