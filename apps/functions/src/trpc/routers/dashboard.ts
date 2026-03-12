import { z } from 'zod'
import { router, protectedProcedure } from '../trpc.js'
import { ragQuery } from '../../services/rag.js'
import { ChatMessageSchema } from '@repo/shared'

export const dashboardRouter = router({
  ask: protectedProcedure
    .input(
      z.object({
        hotelId: z.string(),
        question: z.string().min(1).max(500),
        history: z.array(ChatMessageSchema).optional(),
      })
    )
    .mutation(({ input }) => {
      return ragQuery(input.hotelId, input.question, input.history)
    }),
})
