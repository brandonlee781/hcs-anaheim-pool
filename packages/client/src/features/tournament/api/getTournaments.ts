import { supabase } from '@/lib/supabase'

import { EventItem, Stream, TournamentDayIds } from '../types'

type TournamentResponse = {
  id: string
  title: string
  liquipediaLink?: string
  timezone?: string
  isPast: boolean
  days: {
    id: string
    name: TournamentDayIds
    date: string
    include: ('participants' | 'pools')[]
    events: {
      id: string
      time: string
      duration: number
      items: EventItem<string>[]
    }[]
    streams: { streams: Stream[] }[]
  }[]
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
      days:tournament-day(
        id,
        name,
        date,
        include,
        events (
          id,
          time,
          duration,
          items
        ),
        streams:tournament-day-to-streams(
          streams (
            id,
            name,
            link
          )
        )
      )
    `
    )
    .match(id ? { id } : { isPast: false })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return {
    ...data,
    days: data.days.map(day => {
      return {
        ...day,
        streams: day.streams.map(s => s.streams).reduce((a, b) => a.concat(b), []),
      }
    }),
  }
}
