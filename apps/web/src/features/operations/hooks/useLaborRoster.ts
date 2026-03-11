// MOCK — reads from static mock file
// TODO: replace mockRoster with Firestore collection('hubos-roster') read

import { useQuery } from '@tanstack/react-query'
import type { HubOSRosterEntry } from '@repo/shared'
import { mockRoster } from '../mock/hubos-roster.mock'

async function fetchLaborRoster(): Promise<HubOSRosterEntry[]> {
  // MOCK — swap this function body for a Firestore getDocs call
  return Promise.resolve(mockRoster)
}

export function useLaborRoster() {
  return useQuery({
    queryKey: ['hubos', 'roster'],
    queryFn: fetchLaborRoster,
    staleTime: 1000 * 60 * 15,
  })
}
