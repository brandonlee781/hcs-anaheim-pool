import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventData, TournamentResponse } from '@/features/tournament'
import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

type EventResponse = Omit<definitions['events'], 'data'> & { data: EventData<string> }

export async function deleteEvent(id: string): Promise<EventResponse> {
  const { data, error } = await supabase.from('events').delete().eq('id', id).select()

  if (error) {
    throw new Error(error.message)
  }

  return data?.[0]
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string; tournamentId: string }) => deleteEvent(id),
    onSuccess: (event, { tournamentId }) => {
      const tournament = queryClient.getQueryData<TournamentResponse>(['tournament', tournamentId])
      const day = { ...tournament?.days.find(d => d.id === event.day) }

      const otherDays = tournament?.days.filter(d => d.id !== event.day) ?? []
      const otherEvents = day?.events?.filter(e => e.id !== event.id) ?? []

      if (day) {
        day.events = otherEvents
      }

      queryClient.setQueryData(['tournament', tournamentId], {
        ...tournament,
        days: [...otherDays, day],
      })
    },
  })
}
