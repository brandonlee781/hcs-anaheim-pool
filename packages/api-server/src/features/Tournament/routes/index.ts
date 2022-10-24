import { router, publicProcedure } from '@/trpc'
import { z } from 'zod'
import {
  getTournament
} from '../resolvers'

export const tournamentRouter = router({
  getTournament: publicProcedure
    .input(z.string())
    .query(({ input }) => getTournament(input))
})
export type TournamentRouter = typeof tournamentRouter