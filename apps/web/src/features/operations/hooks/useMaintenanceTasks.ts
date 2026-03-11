// MOCK — reads from static mock file
// TODO: replace mockTasks with Firestore collection('hubos-tasks') read

import { useQuery } from '@tanstack/react-query'
import type { HubOSTask } from '@repo/shared'
import { mockTasks } from '../mock/hubos-tasks.mock'

async function fetchMaintenanceTasks(): Promise<HubOSTask[]> {
  // MOCK — swap this function body for a Firestore getDocs call
  return Promise.resolve(mockTasks)
}

export function useMaintenanceTasks() {
  return useQuery({
    queryKey: ['hubos', 'tasks'],
    queryFn: fetchMaintenanceTasks,
    staleTime: 1000 * 60 * 5,
  })
}
