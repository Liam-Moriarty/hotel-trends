// MOCK — reads from static mock file
// TODO: replace mockRooms with Firestore collection('hubos-rooms') read

import { useQuery } from '@tanstack/react-query'
import type { HubOSRoom } from '@repo/shared'
import { mockRooms } from '../mock/hubos-rooms.mock'

async function fetchRoomStatus(): Promise<HubOSRoom[]> {
  // MOCK — swap this function body for a Firestore getDocs call
  return Promise.resolve(mockRooms)
}

export function useRoomStatus() {
  return useQuery({
    queryKey: ['hubos', 'rooms'],
    queryFn: fetchRoomStatus,
    staleTime: 1000 * 60 * 2,
  })
}
