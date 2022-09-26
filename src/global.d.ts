declare interface Match {
  stream?: Stream
  team1: Team
  team2: Team
  timeslot?: number
  span?: number
  day?: number
}

declare interface Stream {
  id: string
  name: string
  link: string
  span?: number
}
declare interface Streams {
  halo: Stream
  xbox: Stream
  red: Stream
  blue: Stream
}

declare interface Team {
  name: string
  color: string
  region: 'NA' | 'EU' | 'AZ' | 'MX' | null
  image?: string
}

declare interface TeamPool {
  [key: string]: Team
}
declare interface Pools {
  A?: Team[]
  B?: Team[]
  C?: Team[]
  D?: Team[]
}

declare interface ScheduleItem {
  team1?: Team
  team2?: Team
  text?: string
  span?: number
  textClass?: string
}

declare interface ScheduleSlot {
  time: string
  items?: ScheduleItem[]
}

declare interface Schedule {
  title: string
  link: string
  streams: Stream[]
  day1: ScheduleSlot[]
  day2?: ScheduleSlot[]
  day3?: ScheduleSlot[]
  styles?: Partial<Style>
}

declare interface Style {
  bodyStyle: string
  tableStyle: string
  tableHeadStyle: string
  tableHeaderStyle: string
  tableDataStyle: string
  poolHoverStyle: string
  buttonStyle: string
  buttonActiveStyle: string
  cardStyle: string
  footerStyle: string
}

declare interface HcsEvent {
  title: string
  link: string
  timezone: string
  streams: Stream[]
  styles: Partial<Style>
  days: {
    date: string
    text?: string
  }[]
  day1: ScheduleSlot[]
  day2?: ScheduleSlot[]
  day3?: ScheduleSlot[]
  pools?: {
    A?: string[]
    B?: string[]
    C?: string[]
    D?: string[]
  }
  participants?: string[]
  playInTitle?: boolean
}

declare module '@/data/*.yaml' {
  const data: HcsEvent
  export = data
}
declare module '@/data/teams.yaml' {
  const data: TeamPool
  export = data
}
