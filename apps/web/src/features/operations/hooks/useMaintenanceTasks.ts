import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOSTaskSchema } from '@repo/shared'
import type { HubOSTask } from '@repo/shared'

const HOTEL_ID = 'SAND01'

async function fetchMaintenanceTasks(): Promise<HubOSTask[]> {
  const snap = await getDocs(collection(db, 'hotels', HOTEL_ID, 'hubos-tasks'))
  return snap.docs.map(doc => HubOSTaskSchema.parse(doc.data()))
}

export function useMaintenanceTasks() {
  return useQuery({
    queryKey: ['hubos', 'tasks'],
    queryFn: fetchMaintenanceTasks,
    staleTime: 1000 * 60 * 5,
  })
}
