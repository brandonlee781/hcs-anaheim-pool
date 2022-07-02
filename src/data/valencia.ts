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
  day2: [
    {
      time: '2022-07-01T09:00:00+0000',
      items: [{ text: 'Countdown Begins', span: 4 }],
    },
    {
      time: '2022-07-01T09:30:00+0000',
      items: [{ text: 'Valencia Pre-show', span: 4 }],
    },
    { time: '2022-07-01T10:00:00+0000', timeslot: 0 },
    { time: '2022-07-01T11:30:00+0000', timeslot: 1 },
    { time: '2022-07-01T13:00:00+0000', timeslot: 2 },
    {
      time: '2022-07-01T14:30:00+0000',
      items: [{ text: 'Winners Brackets Round 1', span: 4 }],
    },
    {
      time: '2022-07-01T16:00:00+0000',
      items: [{ text: 'Winnners Brackets Round 1', span: 4 }],
    },
    {
      time: '2022-07-01T17:30:00+0000',
      items: [{ text: 'Elimination Bracket Round 2', span: 4 }],
    },
    {
      time: '2022-07-01T19:00:00+0000',
      items: [{ text: 'Elimination Bracket Round 3', span: 4 }],
    },
  ],
  day3: [
    {
      time: '2022-07-01T09:00:00+0000',
      items: [{ text: 'Countdown Begins', span: 4 }],
    },
    {
      time: '2022-07-01T09:30:00+0000',
      items: [{ text: 'Valencia Pre-show', span: 4 }],
    },
    { time: '2022-07-01T10:00:00+0000', items: [{ text: 'TBD', span: 4 }] },
    { time: '2022-07-01T11:30:00+0000', items: [{ text: 'TBD', span: 4 }] },
    { time: '2022-07-01T13:00:00+0000', items: [{ text: 'TBD', span: 4 }] },
    {
      time: '2022-07-01T14:30:00+0000',
      items: [{ text: 'TBD', span: 4 }],
    },
    {
      time: '2022-07-01T16:00:00+0000',
      items: [{ text: 'TBD', span: 4 }],
    },
    {
      time: '2022-07-01T17:30:00+0000',
      items: [{ text: 'TBD', span: 4 }],
    },
    {
      time: '2022-07-01T19:00:00+0000',
      items: [{ text: 'TBD', span: 4 }],
    },
  ],
}

const day1Matches: Match[] = [
  {
    stream: streams.halo,
    team1: teams.onilneWarriors,
    team2: teams.awobabobs,
    timeslot: 0,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.acend,
    team2: teams.reclaimers,
    timeslot: 1,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.quadrant,
    team2: teams.scorchedHand,
    timeslot: 2,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.navi,
    team2: teams.blackhand,
    timeslot: 3,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.jlingz,
    team2: teams.awobabobs,
    timeslot: 4,
    day: 1,
  },
  {
    stream: streams.halo,
    team1: teams.navi,
    team2: teams.diamondDogs,
    timeslot: 5,
    day: 1,
  },
]

const day2Matches: Match[] = [
  {
    stream: streams.halo,
    team1: teams.vexed,
    team2: teams.witchblades,
    timeslot: 0,
    day: 2,
  },
  {
    stream: streams.halo,
    team1: teams.quadrant,
    team2: teams.lucendi,
    timeslot: 1,
    day: 2,
  },
  {
    stream: streams.halo,
    team1: teams.navi,
    team2: teams.connecting,
    timeslot: 2,
    day: 2,
  },
]

export const matches: Match[] = [...day1Matches, ...day2Matches]

export const pools: Pools = {
  A: [teams.acend, teams.vexed, teams.reclaimers, teams.frostbite],
  B: [teams.quadrant, teams.scorchedHand, teams.deathrow, teams.connecting],
  C: [teams.navi, teams.blackhand, teams.diamondDogs, teams.lucendi],
  D: [teams.jlingz, teams.onilneWarriors, teams.awobabobs, teams.witchblades],
}
