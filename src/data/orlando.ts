import { teams } from './teams'
import { streams } from './streams'
import { Match, Pools, Schedule } from './types'

export const day1Date = new Date('2022-09-23')
export const day2Date = new Date('2022-09-24')
export const day3Date = new Date('2022-09-25')

export const schedule: Schedule = {
  title: 'HCS Orlando Major',
  link: 'https://halo-esports.fandom.com/wiki/Halo_Championship_Series/2022_Season/Major_Orlando',
  day1: [
    {
      time: '2022-09-23T17:30:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-09-23T17:40:00+0000',
      items: [{ text: 'Orlando Pre-Show', span: 4 }],
    },
    { time: '2022-09-23T18:00:00+0000', timeslot: 0 },
    { time: '2022-09-23T19:15:00+0000', timeslot: 1 },
    { time: '2022-09-23T20:30:00+0000', timeslot: 2 },
    { time: '2022-09-23T21:45:00+0000', timeslot: 3 },
    { time: '2022-09-23T23:00:00+0000', timeslot: 4 },
    { time: '2022-09-23T00:15:00+0000', timeslot: 5 },
  ],
  // day2: [
  //   {
  //     time: '2022-09-24T17:30:00+0000',
  //     items: [{ text: 'Broadcast Begins', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-24T17:40:00+0000',
  //     items: [{ text: 'Kansas City Pre-Show', span: 4 }],
  //   },
  //   { time: '2022-09-24T18:00:00+0000', timeslot: 0 },
  //   { time: '2022-09-24T19:15:00+0000', timeslot: 1 },
  //   { time: '2022-09-24T20:30:00+0000', timeslot: 2 },
  //   { time: '2022-09-24T21:45:00+0000', timeslot: 3 },
  //   {
  //     time: '2022-09-24T23:00:00+0000',
  //     items: [
  //       { text: 'Winners Quarter Finals', span: 2 },
  //       { text: 'Elimination Round 1', span: 2 },
  //     ],
  //   },
  //   {
  //     time: '2022-09-24T00:15:00+0000',
  //     items: [
  //       { text: 'Winners Quarter Finals', span: 2 },
  //       { text: 'Elimination Round 1', span: 2 },
  //     ],
  //   },
  // ],
  // day3: [
  //   {
  //     time: '2022-09-25T17:30:00+0000',
  //     items: [{ text: 'Broadcast Begins', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-25T17:40:00+0000',
  //     items: [{ text: 'Kansas City Pre-Show', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-25T18:00:00+0000',
  //     items: [{ text: 'Winners Semi Finals - Optic vs eUnited', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-25T19:15:00+0000',
  //     items: [{ text: 'Winners Semi Finals - Cloud9 vs Sentinels', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-25T20:30:00+0000',
  //     items: [{ text: 'Elimination Quarter Finals', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-25T21:45:00+0000',
  //     items: [{ text: 'Winners Finals', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-25T23:00:00+0000',
  //     items: [{ text: 'Elimination Finals', span: 4 }],
  //   },
  //   {
  //     time: '2022-09-25T00:15:00+0000',
  //     items: [{ text: 'Grand Finals', span: 4 }],
  //   },
  // ],
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

export const matches: Match[] = [...day1Matches, ...day2Matches]

export const pools: Pools = {
  A: [teams.cloud9, teams.acend, teams.xset, teams.chiefs, teams.ssg],
  B: [teams.optic, teams.faze, teams.fnatic, teams.navi, teams.complexity],
  C: [teams.eunited, teams.quadrant, teams.g2, teams.cintanegra, teams.g1],
  D: [teams.sentinels, teams.pioneers, teams.knights, teams.jlingz, teams.bbg],
}
