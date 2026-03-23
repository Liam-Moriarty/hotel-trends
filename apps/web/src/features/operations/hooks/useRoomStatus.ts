import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOSRoomSchema } from '@repo/shared'
import type { HubOSRoom } from '@repo/shared'
import { MOCK_ROOM_STATUS } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

async function fetchRoomStatus(): Promise<HubOSRoom[]> {
  const snap = await getDocs(collection(db, 'hotels', HOTEL_ID, 'hubos-rooms'))
  return snap.docs.map(doc => HubOSRoomSchema.parse(doc.data()))
}

export function useRoomStatus() {
  return useQuery({
    queryKey: ['hubos', 'rooms'],
    queryFn: MOCK ? () => Promise.resolve(MOCK_ROOM_STATUS) : fetchRoomStatus,
    staleTime: 1000 * 60 * 2,
  })
}
