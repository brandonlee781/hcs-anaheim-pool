import { tournamentRouter } from '@/features/Tournament';
import { router } from '@/trpc'

export const appRouter = router({
  tournament: tournamentRouter
})

export type AppRouter = typeof appRouter;
