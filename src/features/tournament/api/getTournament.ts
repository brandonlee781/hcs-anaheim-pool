import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

import { EventData, TournamentDayIds } from '../types'

import { getStreams } from './getStreams'

export type TournamentResponse = definitions['tournament'] & {
  days: (Omit<definitions['tournament-day'], 'name' | 'include'> & {
    name: TournamentDayIds
    events: (Omit<definitions['events'], 'data' | 'streams'> & {
      data: EventData<string>
      streams?: string[]
    })[]
    include: string[]
    streams: string[]
  })[]
  pools: (Omit<definitions['pools'], 'teams'> & { teams: string[] })[]
}

export async function getTournament(id?: string) {
  const { data, error } = await supabase
    .from('tournament')
    .select<string, TournamentResponse>(
      `
      id,
      title,
      liquipediaLink,
      timezone,
      location,
      prizePool,
      isOnline,
      startDate,
      endDate,
      days:tournament-day(
        id,
        name,
        date,
        include,
        events (
          id,
          time,
          duration,
          data,
          streams
        ),
        streams
      ),
      pools (
        id,
        key,
        name,
        teams,
        created_at
      )
    `
    )
    .match(id ? { id } : { isPast: false })
    .single()

  const allStreams = Array.from(
    new Set(data?.days.map(d => d.streams).reduce((a, b) => a.concat(b), []) ?? [])
  )

  const streams = await getStreams(allStreams)

  if (error) {
    throw new Error(error.message)
  }

  return {
    ...data,
    days: data.days.map(day => {
      return {
        ...day,
        streams: day.streams
          .map(stream => {
            return streams?.find(s => stream === s?.id)
          })
          .filter(Boolean),
      }
    }),
  }
}
