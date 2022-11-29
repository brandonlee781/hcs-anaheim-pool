import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Team } from '@/features/teams'
import { EventData, Stream, TournamentResponse } from '@/features/tournament'
import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

type CreateEventPayload = {
  dayId: string
  time: string
  duration: number
  text?: string
  textClass?: string
  teams?: Team[]
  streams?: Stream[]
}

type CreateEventVariables = {
  payload: CreateEventPayload
  tournamentId: string
}

type EventResponse = Omit<definitions['events'], 'data' | 'stream'> & {
  data: EventData<string>
  streams: string[]
}

export async function createEvent(payload: CreateEventPayload): Promise<EventResponse> {
  const pPayload = {
    day: payload.dayId,
    time: payload.time,
    duration: payload.duration,
    streams: payload.streams?.map(s => s.id),
    data: {
      text: payload.text,
      textClass: payload.textClass,
      teams: payload.teams?.map(t => t.id),
    },
  }

  const { data, error } = await supabase.from('events').insert(pPayload).select()

  if (error) {
    throw new Error(error?.message)
  }

  return data?.[0]
}

export function useCreateEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ payload }: CreateEventVariables) => createEvent(payload),
    onSuccess(event, { tournamentId }) {
      const tournament = queryClient.getQueryData<TournamentResponse>(['tournament', tournamentId])
      const day = { ...tournament?.days.find(d => d.id === event.day) }

      const otherDays = tournament?.days.filter(d => d.id !== event.day) ?? []

      if (day) {
        day.events = [...(day.events ?? []), event]
      }

      queryClient.setQueryData(['tournament', tournamentId], {
        ...tournament,
        days: [...otherDays, day],
      })
    },
  })
}
