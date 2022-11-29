import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isBefore } from 'date-fns'

import { Tournament, TournamentDay } from '@/features/tournament'
import { supabase } from '@/lib/supabase'

export type DayPayload = Omit<Partial<TournamentDay>, 'streams'> & { streams: string[] }
type TournamentDayMutation = {
  id: string
  payload: DayPayload
  tournamentId: string
}

export async function updateTournamentDay(id: string, payload: DayPayload) {
  const { data, error } = await supabase
    .from('tournament-day')
    .update(payload)
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data?.[0]
}

export function useUpdateTournamentDay() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: TournamentDayMutation) => updateTournamentDay(id, payload),
    onSuccess(day: TournamentDay, { tournamentId }) {
      const tournament = queryClient.getQueryData<Tournament>(['tournament', tournamentId])

      const oldDays = tournament?.days.filter(d => d.id !== day.id) ?? []

      queryClient.setQueryData(['tournament', tournamentId], {
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
