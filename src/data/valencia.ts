import { teams } from './teams'
import { streams } from './streams'
import { Match, Pools, Schedule } from './types'

export const schedule: Schedule = {
  title: 'HCS Valencia Finals',
  link: 'https://liquipedia.net/halo/Halo_Championship_Series/2021-22/Split_2/Europe/Championship',
  day1: [
    {
      time: '2022-07-01T09:00:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-07-01T09:30:00+0000',
      items: [{ text: 'Pre-Show in Valencia', span: 4 }],
    },
    { time: '2022-07-01T10:00:00+0000', timeslot: 0 },
    { time: '2022-07-01T11:30:00+0000', timeslot: 1 },
    { time: '2022-07-01T13:00:00+0000', timeslot: 2 },
    { time: '2022-07-01T14:30:00+0000', timeslot: 3 },
    { time: '2022-07-01T16:00:00+0000', timeslot: 4 },
    { time: '2022-07-01T17:30:00+0000', timeslot: 5 },
  ],
  day2: [],
  day3: [],
}

const day1Matches: Match[] = [
  {
    stream: streams.halo,
    team1: teams.olw,
    team2: teams.awo,
    timeslot: 0,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.acn,
    team2: teams.rcl,
    timeslot: 1,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.qua,
    team2: teams.scr,
    timeslot: 2,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.navi,
    team2: teams.bhnd,
    timeslot: 3,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.jlingz,
    team2: teams.awo,
    timeslot: 4,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.navi,
    team2: teams.ddog,
    timeslot: 5,
    day: 1,
  },
]

const day2Matches: Match[] = []

export const matches: Match[] = [...day1Matches, ...day2Matches]

export const pools: Pools = {
  A: [teams.acn, teams.vxd, teams.rcl, teams.tbd],
  B: [teams.qua, teams.scr, teams.dth, teams.tbd],
  C: [teams.navi, teams.bhnd, teams.ddog, teams.tbd],
  D: [teams.jlingz, teams.olw, teams.awo, teams.tbd],
}
