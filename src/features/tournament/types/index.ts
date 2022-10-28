import { Team } from '@/features/teams'
import { definitions } from '@/types/database'

export type Stream = definitions['streams']

export type EventItem = {
  teams?: Team[]
  text?: string
  span?: number
  textClass?: string
  stream?: string
}

export type TournamentEvent = Omit<definitions['events'], 'items'> & {
  items: EventItem[]
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

export type TournamentDay = Omit<definitions['tournament-day'], 'name'> & {
  name: TournamentDayIds
  events: TournamentEvent[]
  streams: Stream[]
}

export type Tournament = definitions['tournament'] & {
  days: TournamentDay[]
  pools: (Omit<definitions['pools'], 'teams'> & { teams: Team[] })[]
}
