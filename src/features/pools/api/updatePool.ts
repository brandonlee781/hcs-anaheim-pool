import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Tournament } from '@/features/tournament'
import { supabase } from '@/lib/supabase'

import { Pool } from '../types'

export async function updatePool(id: string, payload: Partial<Pool>) {
  const updatedPool = {
    ...payload,
    teams: payload.teams?.map(t => t.id),
  }
  const { data, error } = await supabase.from('pools').update(updatedPool).eq('id', id).select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

type PoolMutation = {
  id: string
  payload: Partial<Pool>
}

export function useUpdatePool() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: PoolMutation) => updatePool(id, payload),
    onSuccess(pools: Pool[]) {
      const [pool] = pools
      const tournament = queryClient.getQueryData<Tournament>(['tournament', pool.tournament])

      // eslint-disable-next-line no-unsafe-optional-chaining
      const oldPools = tournament?.pools?.filter(p => p.id !== pool.id) || []

      queryClient.setQueryData(['tournament', pool.tournament], {
        ...tournament,
        pools: [...oldPools, pool],
      })
    },
  })
}
