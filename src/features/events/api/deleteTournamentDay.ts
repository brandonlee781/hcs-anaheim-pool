import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isBefore } from 'date-fns'

import { Tournament, TournamentDay } from '@/features/tournament'
import { supabase } from '@/lib/supabase'

export async function deleteTournamentDay(id: string) {
  const { data, error } = await supabase.from('tournament-day').delete().eq('id', id).select()

  if (error) {
    throw new Error(error.message)
  }

  return data?.[0]
}

export function useDeleteTournamentDay() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string; tournamentId: string }) => deleteTournamentDay(id),
    onSuccess(day: TournamentDay, { tournamentId }) {
      const tournament = queryClient.getQueryData<Tournament>(['tournament', tournamentId])

      const days = tournament?.days.filter(d => d.id !== day.id) ?? []

      queryClient.setQueryData(['tournament', tournamentId], {
        ...tournament,
        days: days.sort((a, b) => {
          const aDate = new Date(a.date)
          const bDate = new Date(b.date)
          if (isBefore(aDate, bDate)) return -1
          if (isBefore(bDate, aDate)) return 1
          return 0
        }),
      })
    },
  })
}
