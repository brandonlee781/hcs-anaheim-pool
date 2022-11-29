import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventData, Stream, TournamentEvent, TournamentResponse } from '@/features/tournament'
import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

export type EventPayload = Omit<Partial<TournamentEvent>, 'streams' | 'data'> & {
  streams: Stream[]
} & TournamentEvent['data']

type EventResponse = Omit<definitions['events'], 'data'> & { data: EventData<string> }

export async function updateEvent(id: string, payload: EventPayload): Promise<EventResponse> {
  const pPayload = {
    time: payload.time,
    duration: payload.duration,
    streams: payload.streams.map(s => s.id),
    data: {
      text: payload.text,
      textClass: payload.textClass,
      teams: payload.teams?.map(t => t.id),
    },
  }
  const { data, error } = await supabase.from('events').update(pPayload).eq('id', id).select()

  if (error) {
    throw new Error(error.message)
  }

  return data?.[0]
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EventPayload; tournamentId: string }) =>
      updateEvent(id, payload),
    onSuccess: (event, { tournamentId }) => {
      const tournament = queryClient.getQueryData<TournamentResponse>(['tournament', tournamentId])
      const day = { ...tournament?.days.find(d => d.id === event.day) }

      const otherDays = tournament?.days.filter(d => d.id !== event.day) ?? []
      const otherEvents = day?.events?.filter(e => e.id !== event.id) ?? []

      if (day) {
        day.events = [...otherEvents, event]
      }

      queryClient.setQueryData(['tournament', tournamentId], {
        ...tournament,
        days: [...otherDays, day],
      })
    },
  })
}
