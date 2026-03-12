import { z } from 'zod'
import { router, protectedProcedure } from '../trpc.js'
import { ragQuery } from '../../services/rag.js'

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
