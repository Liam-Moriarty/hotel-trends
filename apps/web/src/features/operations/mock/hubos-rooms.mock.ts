// MOCK — replace with Firestore read from 'hubos-rooms' collection
// Shape conforms to HubOSRoomSchema in @repo/shared/schemas/hubos

import type { HubOSRoom } from '@repo/shared'

export const mockRooms: HubOSRoom[] = [
  {
    roomNumber: '101',
    floor: 1,
    roomType: 'STD',
    status: 'Clean',
    assignedAttendant: 'Maria Santos',
    guestName: null,
    checkoutTime: null,
    notes: null,
    lastUpdated: '2026-03-11T06:45:00+11:00',
  },
  {
    roomNumber: '102',
    floor: 1,
    roomType: 'STD',
    status: 'InProgress',
    assignedAttendant: 'Maria Santos',
    guestName: 'Chen, Wei',
    checkoutTime: '2026-03-11T11:00:00+11:00',
    notes: 'Guest requested extra towels before departure',
    lastUpdated: '2026-03-11T08:20:00+11:00',
  },
  {
    roomNumber: '203',
    floor: 2,
    roomType: 'DLX',
    status: 'Dirty',
    assignedAttendant: null,
    guestName: null,
    checkoutTime: null,
    notes: null,
    lastUpdated: '2026-03-11T07:00:00+11:00',
  },
  {
    roomNumber: '401',
    floor: 4,
    roomType: 'STE',
    status: 'Blocked',
    assignedAttendant: 'James Tran',
    guestName: null,
    checkoutTime: null,
    notes: 'Maintenance — AC unit fault, awaiting parts',
    lastUpdated: '2026-03-10T15:30:00+11:00',
  },
  {
    roomNumber: '502',
    floor: 5,
    roomType: 'DLX',
    status: 'Inspecting',
    assignedAttendant: 'Priya Nair',
    guestName: 'Okafor, Emeka',
    checkoutTime: null,
    notes: null,
    lastUpdated: '2026-03-11T09:05:00+11:00',
  },
]
