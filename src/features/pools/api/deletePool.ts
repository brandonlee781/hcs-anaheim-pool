import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Tournament } from '@/features/tournament'
import { supabase } from '@/lib/supabase'

import { Pool } from '../types'

export async function deletePool(id: string) {
  const { data, error } = await supabase.from('pools').delete().eq('id', id).select()

  if (error) {
    throw new Error(error.message)
  }

  return data?.[0]
}

export function useDeletePool() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deletePool(id),
    onSuccess(pool: Pool) {
      const tournament = queryClient.getQueryData<Tournament>(['tournament', pool.tournament])

      const updatedPools = tournament?.pools.filter(p => p.id !== pool.id)

      queryClient.setQueryData(['tournament', pool.tournament], {
        ...tournament,
        pools: updatedPools,
      })
    },
  })
}
