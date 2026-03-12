import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { ragQuery } from '../../services/rag'

export const dashboardRouter = router({
  ask: protectedProcedure
    .input(
      z.object({
        hotelId: z.string(),
        question: z.string().min(1).max(500),
      })
    )
    .mutation(({ input }) => {
      return ragQuery(input.hotelId, input.question)
    }),
})
