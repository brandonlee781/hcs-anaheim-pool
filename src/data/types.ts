export type Match = {
  stream: Stream
  team1: Team
  team2: Team
  timeslot: number
  day?: number
}

export type Stream = { id: string; name: string; link: string }
export type Streams = {
  halo: Stream
  xbox: Stream
  red: Stream
  blue: Stream
}

export type Team = {
  name: string
  color: string
  region: 'NA' | 'EU' | 'AZ' | 'MX' | null
  image?: string
}

export type TeamPool = { [key: string]: Team }
export type Pools = {
  A: Team[]
  B: Team[]
  C: Team[]
  D: Team[]
}

export type ScheduleItem = {
  time: string
  items?: { text: string; span: number; highlights?: Team[] }[]
  matches?: Match[]
}
