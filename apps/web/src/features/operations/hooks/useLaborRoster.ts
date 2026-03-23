import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOSRosterEntrySchema } from '@repo/shared'
import type { HubOSRosterEntry } from '@repo/shared'
import { MOCK_LABOR_ROSTER } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

async function fetchLaborRoster(): Promise<HubOSRosterEntry[]> {
  const snap = await getDocs(collection(db, 'hotels', HOTEL_ID, 'hubos-roster'))
  return snap.docs.map(doc => HubOSRosterEntrySchema.parse(doc.data()))
}

export function useLaborRoster() {
  return useQuery({
    queryKey: ['hubos', 'roster'],
    queryFn: MOCK ? () => Promise.resolve(MOCK_LABOR_ROSTER) : fetchLaborRoster,
    staleTime: 1000 * 60 * 15,
  })
}
