import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOSRoomSchema } from '@repo/shared'
import type { HubOSRoom } from '@repo/shared'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string

async function fetchRoomStatus(): Promise<HubOSRoom[]> {
  const snap = await getDocs(collection(db, 'hotels', HOTEL_ID, 'hubos-rooms'))
  return snap.docs.map(doc => HubOSRoomSchema.parse(doc.data()))
}

export function useRoomStatus() {
  return useQuery({
    queryKey: ['hubos', 'rooms'],
    queryFn: fetchRoomStatus,
    staleTime: 1000 * 60 * 2,
  })
}
