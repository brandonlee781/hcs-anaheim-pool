import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isBefore } from 'date-fns'

import { Tournament, TournamentDay } from '@/features/tournament'
import { supabase } from '@/lib/supabase'

export async function createTournamentDay(name: string, tournamentId: string) {
  const { data, error } = await supabase
    .from('tournament-day')
    .insert({
      name,
      date: new Date().toDateString(),
      streams: [],
      include: [],
      tournament: tournamentId,
    })
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data?.[0]
}

export function useCreateTournamentDay() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, tournamentId }: { name: string; tournamentId: string }) =>
      createTournamentDay(name, tournamentId),
    onSuccess(day: TournamentDay) {
      const tournament = queryClient.getQueryData<Tournament>(['tournament'])

      const oldDays = tournament?.days ?? []

      queryClient.setQueryData(['tournament'], {
        ...tournament,
        days: [...oldDays, day].sort((a, b) => {
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
