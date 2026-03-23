// ---------------------------------------------------------------------------
// Reads and writes the applied room rate state to Firestore so it persists
// across page refreshes.
//
// Firestore path: hotels/{HOTEL_ID}/appliedRates/current
// Document shape: { appliedRoomTypes: string[] }
//   — appliedRoomTypes is an array of room type labels that have been applied
//     (e.g. ["Standard", "Deluxe"])
// ---------------------------------------------------------------------------
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import { MOCK_APPLIED_RATES } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'
const DOC_PATH = `hotels/${HOTEL_ID}/appliedRates/current`

const AppliedRatesSchema = z.object({
  appliedRoomTypes: z.array(z.string()).default([]),
})

export function useAppliedRates() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['applied-rates', HOTEL_ID],
    queryFn: MOCK
      ? () => Promise.resolve(new Set(MOCK_APPLIED_RATES))
      : async (): Promise<Set<string>> => {
          const snap = await getDoc(doc(db, DOC_PATH))
          if (!snap.exists()) return new Set()
          const parsed = AppliedRatesSchema.safeParse(snap.data())
          if (!parsed.success) return new Set()
          return new Set(parsed.data.appliedRoomTypes)
        },
    staleTime: Infinity,
  })

  const mutation = useMutation({
    mutationFn: MOCK
      ? async () => {}
      : async (appliedRoomTypes: Set<string>) => {
          await setDoc(doc(db, DOC_PATH), { appliedRoomTypes: Array.from(appliedRoomTypes) })
        },
    onSuccess: (_data, appliedRoomTypes) => {
      queryClient.setQueryData(['applied-rates', HOTEL_ID], appliedRoomTypes)
    },
  })

  const toggleRate = (roomType: string) => {
    const current = new Set(query.data ?? [])
    if (current.has(roomType)) current.delete(roomType)
    else current.add(roomType)
    mutation.mutate(current)
  }

  const applyAll = (roomTypes: string[]) => {
    mutation.mutate(new Set(roomTypes))
  }

  return {
    applied: query.data ?? new Set<string>(),
    toggleRate,
    applyAll,
  }
}
