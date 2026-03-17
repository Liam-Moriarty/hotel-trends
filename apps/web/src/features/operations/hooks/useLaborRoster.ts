import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOSRosterEntrySchema } from '@repo/shared'
import type { HubOSRosterEntry } from '@repo/shared'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string

async function fetchLaborRoster(): Promise<HubOSRosterEntry[]> {
  const snap = await getDocs(collection(db, 'hotels', HOTEL_ID, 'hubos-roster'))
  return snap.docs.map(doc => HubOSRosterEntrySchema.parse(doc.data()))
}

export function useLaborRoster() {
  return useQuery({
    queryKey: ['hubos', 'roster'],
    queryFn: fetchLaborRoster,
    staleTime: 1000 * 60 * 15,
  })
}
