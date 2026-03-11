// MOCK — replace with Firestore read from 'hubos-roster' collection
// Shape conforms to HubOSRosterEntrySchema in @repo/shared/schemas/hubos

import type { HubOSRosterEntry } from '@repo/shared'

export const mockRoster: HubOSRosterEntry[] = [
  {
    department: 'FrontDesk',
    shiftStart: '06:00',
    shiftEnd: '14:00',
    scheduled: 4,
    actual: 4,
    overtimeHours: 0,
    staffingStatus: 'Fully Staffed',
  },
  {
    department: 'Housekeeping',
    shiftStart: '07:00',
    shiftEnd: '15:00',
    scheduled: 18,
    actual: 14,
    overtimeHours: 2,
    staffingStatus: 'Understaffed',
  },
  {
    department: 'FBRestaurant',
    shiftStart: '06:00',
    shiftEnd: '14:00',
    scheduled: 8,
    actual: 8,
    overtimeHours: 1,
    staffingStatus: 'Fully Staffed',
  },
  {
    department: 'FBBar',
    shiftStart: '14:00',
    shiftEnd: '22:00',
    scheduled: 6,
    actual: 5,
    overtimeHours: 0,
    staffingStatus: 'Understaffed',
  },
  {
    department: 'Concierge',
    shiftStart: '07:00',
    shiftEnd: '23:00',
    scheduled: 4,
    actual: 3,
    overtimeHours: 1,
    staffingStatus: 'Understaffed',
  },
]
