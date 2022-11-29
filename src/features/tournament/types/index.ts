import { Pool } from '@/features/pools'
import { Team } from '@/features/teams'
import { definitions } from '@/types/database'

export type Stream = definitions['streams']

export type EventData<T = Team> = {
  teams?: T[]
  text?: string
  span?: number
  textClass?: string
  stream?: string
}

export type TournamentEvent = Omit<definitions['events'], 'data' | 'streams'> & {
  data: EventData
  streams?: string[]
}

export enum TournamentDayIds {
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
  'champ-sunday' = 'champ-sunday',
  'day-1' = 'day-1',
  'day-2' = 'day-2',
  'day-3' = 'day-3',
  'day-4' = 'day-4',
  'play-in' = 'play-in',
}

export type TournamentDay = Omit<definitions['tournament-day'], 'name' | 'include'> & {
  name: TournamentDayIds
  events?: TournamentEvent[]
  streams: Stream[]
  include: string[]
}

export type Tournament = definitions['tournament'] & {
  days: TournamentDay[]
  pools: Pool[]
}

export type TournamentEventResponse = Omit<definitions['events'], 'data' | 'streams'> & {
  data: EventData<string>
  streams?: string[]
}
export type TournamentDayResponse = Omit<definitions['tournament-day'], 'name' | 'include'> & {
  name: TournamentDayIds
  events: TournamentEventResponse[]
  include: string[]
  streams: string[]
}
export type TournamentPoolResponse = Omit<definitions['pools'], 'teams'> & { teams: string[] }
export type TournamentResponse = definitions['tournament'] & {
  days: TournamentDayResponse[]
  pools: TournamentPoolResponse[]
}
