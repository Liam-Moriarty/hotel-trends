import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOSTaskSchema } from '@repo/shared'
import type { HubOSTask } from '@repo/shared'
import { MOCK_MAINTENANCE_TASKS } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

async function fetchMaintenanceTasks(): Promise<HubOSTask[]> {
  const snap = await getDocs(collection(db, 'hotels', HOTEL_ID, 'hubos-tasks'))
  return snap.docs.map(doc => HubOSTaskSchema.parse(doc.data()))
}

export function useMaintenanceTasks() {
  return useQuery({
    queryKey: ['hubos', 'tasks'],
    queryFn: MOCK ? () => Promise.resolve(MOCK_MAINTENANCE_TASKS) : fetchMaintenanceTasks,
    staleTime: 1000 * 60 * 5,
  })
}
