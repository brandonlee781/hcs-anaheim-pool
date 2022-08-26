/* eslint-disable @typescript-eslint/ban-types */
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
    {
      time: '2022-07-01T10:00:00+0000',
      items: [
        {
          team1: teams.onilneWarriors,
          team2: teams.awobabobs,
          span: 4,
        },
      ],
    },
    {
      time: '2022-07-01T11:30:00+0000',
      items: [
        {
          team1: teams.acend,
          team2: teams.reclaimers,
          span: 4,
        },
      ],
    },
    {
      time: '2022-07-01T13:00:00+0000',
      items: [
        {
          team1: teams.quadrant,
          team2: teams.scorchedHand,
          span: 4,
        },
      ],
    },
    {
      time: '2022-07-01T14:30:00+0000',
      items: [
        {
          team1: teams.navi,
          team2: teams.blackhand,
          span: 4,
        },
      ],
    },
    {
      time: '2022-07-01T16:00:00+0000',
      items: [
        {
          team1: teams.jlingz,
          team2: teams.awobabobs,
          span: 4,
        },
      ],
    },
    {
      time: '2022-07-01T17:30:00+0000',
      items: [
        {
          team1: teams.navi,
          team2: teams.diamondDogs,
          span: 4,
        },
      ],
    },
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
    {
      time: '2022-07-01T10:00:00+0000',
      items: [
        {
          team1: teams.vexed,
          team2: teams.witchblades,
          span: 4,
        },
      ],
    },
    {
      time: '2022-07-01T11:30:00+0000',
      items: [
        {
          team1: teams.quadrant,
          team2: teams.lucendi,
          span: 4,
        },
      ],
    },
    {
      time: '2022-07-01T13:00:00+0000',
      items: [
        {
          team1: teams.navi,
          team2: teams.connecting,
          span: 4,
        },
      ],
    },
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

export const pools: Pools | undefined = {
  A: [teams.acend, teams.vexed, teams.reclaimers, teams.frostbite],
  B: [teams.quadrant, teams.scorchedHand, teams.deathrow, teams.connecting],
  C: [teams.navi, teams.blackhand, teams.diamondDogs, teams.lucendi],
  D: [teams.jlingz, teams.onilneWarriors, teams.awobabobs, teams.witchblades],
}
