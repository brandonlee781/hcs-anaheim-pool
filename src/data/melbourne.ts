/* eslint-disable vue/max-len */
/* eslint-disable @typescript-eslint/ban-types */
import { teams } from './teams'
import { Pools, Schedule } from './types'

export const schedule: Schedule = {
  title: 'HCS Melbourne Finals',
  link: 'https://liquipedia.net/halo/Halo_Championship_Series/2021-22/Split_2/Oceania/Championship',
  streams: [
    {
      id: 'halo',
      name: 'A Stream (Halo)',
      link: 'https://www.twitch.tv/halo',
    },
    {
      id: 'hcs',
      name: 'B Stream (HCS)',
      link: 'https://www.twitch.tv/hcs',
    },
  ],
  day1: [
    {
      time: '2022-09-01T00:00:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-09-01T00:30:00+0000',
      items: [{ text: 'Pre-Show in Melbourne', span: 4 }],
    },
    {
      time: '2022-09-02T01:00:00+0000',
      items: [
        {
          team1: teams.chiefs,
          team2: teams.mindfreak,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-02T02:30:00+0000',
      items: [
        {
          team1: teams.divineMind,
          team2: teams.direWolves,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-02T04:00:00+0000',
      items: [
        {
          team1: teams.mindfreak,
          team2: teams.immunity,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-02T05:30:00+0000',
      items: [
        {
          team1: teams.divineMind,
          team2: teams.kitbash,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-02T07:00:00+0000',
      items: [
        {
          team1: teams.chiefs,
          team2: teams.immunity,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-02T08:30:00+0000',
      items: [
        {
          team1: teams.direWolves,
          team2: teams.kitbash,
          span: 4,
        },
      ],
    },
  ],
  day2: [
    {
      time: '2022-09-02T00:00:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-09-03T00:30:00+0000',
      items: [{ text: 'Pre-Show in Melbourne', span: 4 }],
    },
    {
      time: '2022-09-03T01:00:00+0000',
      items: [
        {
          team1: teams.direWolves,
          team2: teams.vertex,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-03T02:30:00+0000',
      items: [
        {
          team1: teams.immunity,
          team2: teams.bandits,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-03T04:00:00+0000',
      items: [
        {
          team1: teams.kitbash,
          team2: teams.vertex,
          span: 4,
        },
      ],
    },
    {
      time: '2022-09-03T05:30:00+0000',
      items: [{ text: 'Winners Quarterfinals', span: 4 }],
    },
    {
      time: '2022-09-03T07:00:00+0000',
      items: [{ text: 'Winners Quarterfinals', span: 4 }],
    },
    {
      time: '2022-09-03T08:30:00+0000',
      items: [{ text: 'Winners Semifinals', span: 4 }],
    },
    {
      time: '2022-09-03T10:00:00+0000',
      items: [{ text: 'Winners Semifinals', span: 4 }],
    },
  ],
  day3: [
    {
      time: '2022-09-04T00:00:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-09-04T00:30:00+0000',
      items: [{ text: 'Pre-Show in Melbourne', span: 4 }],
    },
    { time: '2022-09-04T01:00:00+0000', items: [{ text: 'TBD', span: 4 }] },
    { time: '2022-09-04T02:30:00+0000', items: [{ text: 'TBD', span: 4 }] },
    { time: '2022-09-04T04:00:00+0000', items: [{ text: 'TBD', span: 4 }] },
    {
      time: '2022-09-04T05:30:00+0000',
      items: [{ text: 'TBD', span: 4 }],
    },
    {
      time: '2022-09-04T07:00:00+0000',
      items: [{ text: 'TBD', span: 4 }],
    },
    {
      time: '2022-09-04T08:30:00+0000',
      items: [{ text: 'TBD', span: 4 }],
    },
  ],
}

export const pools: Pools = {
  A: [teams.divineMind, teams.direWolves, teams.kitbash, teams.vertex],
  B: [teams.chiefs, teams.mindfreak, teams.immunity, teams.bandits],
}
