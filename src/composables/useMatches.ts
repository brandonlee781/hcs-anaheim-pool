import { teams, Team } from '@/composables/useTeam'

export type Stream = { id: string; name: string; link: string; }
export type Streams = {
  halo: Stream;
  xbox: Stream;
  red: Stream;
  blue: Stream;
}
export const streams: Streams = {
  halo: {
    id: 'halo',
    name: 'A Stream (Halo)',
    link: 'https://www.twitch.tv/halo',
  },
  xbox: {
    id: 'xbox',
    name: 'B Stream (Xbox)',
    link: 'https://www.twitch.tv/xbox',
  },
  red: {
    id: 'red',
    name: 'C Stream (HCS_Red)',
    link: 'https://www.twitch.tv/hcs_red',
  },
  blue: {
    id: 'blue',
    name: 'D Stream (HCS_Blue)',
    link: 'https://www.twitch.tv/hcs_blue',
  },
}

export type Match = {
  stream: Stream;
  team1: Team;
  team2: Team;
  timeslot: number;
  day?: number,
}

const day1Matches = [
  // a stream
  {
    stream: streams.halo,
    team1: teams.c9,
    team2: teams.acn,
    timeslot: 0,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.faze,
    team2: teams.navi,
    timeslot: 1,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.xset,
    team2: teams.acn,
    timeslot: 2,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.eu,
    team2: teams.g2,
    timeslot: 3,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.sen,
    team2: teams.kcp,
    timeslot: 4,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.og,
    team2: teams.faze,
    timeslot: 5,
    day: 1,
  },
  // b stream
  {
    stream: streams.xbox,
    team1: teams.sen,
    team2: teams.kni,
    timeslot: 0,
    day: 1,
  },

  {
    stream: streams.xbox,
    team1: teams.og,
    team2: teams.fnatic,
    timeslot: 1,
    day: 1,
  },
  {
    stream: streams.xbox,
    team1: teams.kcp,
    team2: teams.kni,
    timeslot: 2,
    day: 1,
  },
  {
    stream: streams.xbox,
    team1: teams.faze,
    team2: teams.fnatic,
    timeslot: 3,
    day: 1,
  },
  {
    stream: streams.xbox,
    team1: teams.acn,
    team2: teams.cfs,
    timeslot: 4,
    day: 1,
  },
  {
    stream: streams.xbox,
    team1: teams.eu,
    team2: teams.qua,
    timeslot: 5,
    day: 1,
  },
  // c stream
  {
    stream: streams.red,
    team1: teams.xset,
    team2: teams.cfs,
    timeslot: 0,
    day: 1,
  },

  {
    stream: streams.red,
    team1: teams.g2,
    team2: teams.qua,
    timeslot: 1,
    day: 1,
  },
  {
    stream: streams.red,
    team1: teams.c9,
    team2: teams.cfs,
    timeslot: 2,
    day: 1,
  },
  {
    stream: streams.red,
    team1: teams.og,
    team2: teams.navi,
    timeslot: 3,
    day: 1,
  },
  {
    stream: streams.red,
    team1: teams.c9,
    team2: teams.xset,
    timeslot: 4,
    day: 1,
  },
  {
    stream: streams.red,
    team1: teams.navi,
    team2: teams.fnatic,
    timeslot: 5,
    day: 1,
  },
  // d stream
  {
    stream: streams.blue,
    team1: teams.kcp,
    team2: teams.jlingz,
    timeslot: 0,
    day: 1,
    
  },
  {
    stream: streams.blue,
    team1: teams.eu,
    team2: teams.cru,
    timeslot: 1,
    day: 1,
  },
  {
    stream: streams.blue,
    team1: teams.sen,
    team2: teams.jlingz,
    timeslot: 2,
    day: 1,
  },
  {
    stream: streams.blue,
    team1: teams.qua,
    team2: teams.cru,
    timeslot: 3,
    day: 1,
  },
  {
    stream: streams.blue,
    team1: teams.jlingz,
    team2: teams.kni,
    timeslot: 4,
    day: 1,
  },
  {
    stream: streams.blue,
    team1: teams.g2,
    team2: teams.cru,
    timeslot: 5,
    day: 1,
  },
]

const day2Matches = [
  // a stream
  {
    stream: streams.halo,
    team1: teams.qua,
    team2: teams.g1,
    timeslot: 0,
    day: 2,
  },
  {
    stream: streams.halo,
    team1: teams.fnatic,
    team2: teams.comp,
    timeslot: 1,
    day: 2,
  },
  {
    stream: streams.halo,
    team1: teams.cfs,
    team2: teams.ssg,
    timeslot: 2,
    day: 2,
  },
  {
    stream: streams.halo,
    team1: teams.kcp,
    team2: teams.bbg,
    timeslot: 3,
    day: 2,
  },
  // b stream
  {
    stream: streams.xbox,
    team1: teams.og,
    team2: teams.comp,
    timeslot: 0,
    day: 2,
  },
  {
    stream: streams.xbox,
    team1: teams.g2,
    team2: teams.g1,
    timeslot: 1,
    day: 2,
  },
  {
    stream: streams.xbox,
    team1: teams.cru,
    team2: teams.g1,
    timeslot: 2,
    day: 2,
  },
  {
    stream: streams.xbox,
    team1: teams.faze,
    team2: teams.comp,
    timeslot: 3,
    day: 2,
  },
  // c stream
  {
    stream: streams.red,
    team1: teams.xset,
    team2: teams.ssg,
    timeslot: 0,
    day: 2,
  },
  {
    stream: streams.red,
    team1: teams.acn,
    team2: teams.ssg,
    timeslot: 1,
    day: 2,
  },
  {
    stream: streams.red,
    team1: teams.navi,
    team2: teams.comp,
    timeslot: 2,
    day: 2,
  },
  {
    stream: streams.red,
    team1: teams.c9,
    team2: teams.ssg,
    timeslot: 3,
    day: 2,
  },
  // d stream
  {
    stream: streams.blue,
    team1: teams.jlingz,
    team2: teams.bbg,
    timeslot: 0,
    day: 2,
  },
  {
    stream: streams.blue,
    team1: teams.sen,
    team2: teams.bbg,
    timeslot: 1,
    day: 2,
  },
  {
    stream: streams.blue,
    team1: teams.kni,
    team2: teams.bbg,
    timeslot: 2,
    day: 2,
  },
  {
    stream: streams.blue,
    team1: teams.eu,
    team2: teams.g1,
    timeslot: 3,
    day: 2,
  },
]

const matches: Match[] = [
  ...day1Matches,
  ...day2Matches,
]

export default function useMatches() {
  return {
    matches,
    streams
  }
}