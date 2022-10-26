export type Stream = {
  id: string
  name: string
  link: string
  span?: number
}

export type EventItem<T> = {
  teams?: T[]
  text?: string
  span?: number
  textClass?: string
  stream?: string
}

export type TournamentEvent<T> = {
  time: string
  duration: number
  items: EventItem<T>[]
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

export type TournamentDay<T> = {
  id: string
  name: TournamentDayIds
  date: string
  streams?: Stream[]
  events?: TournamentEvent<T>[]
  include?: ('participants' | 'pools')[]
}

export type Participants<T> = {
  id: string
  name: string
  teams: T[]
}

export type Tournament<T = string> = {
  id: string
  title: string
  liquipediaLink?: string
  timezone: string
  days: TournamentDay<T>[]
  pools?: Participants<T>[]
  participants?: Participants<T>
}
