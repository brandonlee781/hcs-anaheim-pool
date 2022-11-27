import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Tournament } from '@/features/tournament'
import { supabase } from '@/lib/supabase'

import { Pool } from '../types'

export async function createPool(tournamentId: string) {
  const { data, error } = await supabase.from('pools').insert({ tournament: tournamentId }).select()
  if (error) {
    throw new Error(error.message)
  }

  return data?.[0]
}

export function useCreatePool() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ tournamentId }: { tournamentId: string }) => createPool(tournamentId),
    onSuccess(pool: Pool[]) {
      const tournament = queryClient.getQueryData<Tournament>(['tournament'])

      const oldPools = tournament?.pools || []

      queryClient.setQueryData(['tournament'], {
        ...tournament,
        pools: [...oldPools, pool],
      })
    },
  })
}
