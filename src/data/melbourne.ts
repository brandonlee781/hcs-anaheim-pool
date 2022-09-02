/* eslint-disable vue/max-len */
/* eslint-disable @typescript-eslint/ban-types */
import { teams } from './teams'
import { default as time } from './get-time'
import { Pools, Schedule } from './types'

const getTime = time('Australia/ACT')

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
      time: getTime('2022-09-02', '10:00'),
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: getTime('2022-09-02', '10:30'),
      items: [{ text: 'Pre-Show in Melbourne', span: 4 }],
    },
    {
      time: getTime('2022-09-02', '11:00'),
      items: [
        {
          team1: teams.chiefs,
          team2: teams.mindfreak,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-02', '12:30'),
      items: [
        {
          team1: teams.divineMind,
          team2: teams.direWolves,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-02', '14:00'),
      items: [
        {
          team1: teams.mindfreak,
          team2: teams.immunity,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-02', '15:30'),
      items: [
        {
          team1: teams.divineMind,
          team2: teams.kitbash,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-02', '17:00'),
      items: [
        {
          team1: teams.chiefs,
          team2: teams.immunity,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-02', '18:30'),
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
      time: getTime('2022-09-03', '10:00'),
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: getTime('2022-09-03', '10:30'),
      items: [{ text: 'Pre-Show in Melbourne', span: 4 }],
    },
    {
      time: getTime('2022-09-03', '11:00'),
      items: [
        {
          team1: teams.direWolves,
          team2: teams.vertex,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-03', '12:30'),
      items: [
        {
          team1: teams.immunity,
          team2: teams.bandits,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-03', '14:00'),
      items: [
        {
          team1: teams.kitbash,
          team2: teams.vertex,
          span: 4,
        },
      ],
    },
    {
      time: getTime('2022-09-03', '15:30'),
      items: [{ text: 'Winners Quarterfinals', span: 4 }],
    },
    {
      time: getTime('2022-09-03', '17:00'),
      items: [{ text: 'Winners Quarterfinals', span: 4 }],
    },
    {
      time: getTime('2022-09-03', '18:30'),
      items: [{ text: 'Winners Semifinals', span: 4 }],
    },
    {
      time: getTime('2022-09-03', '20:00'),
      items: [{ text: 'Winners Semifinals', span: 4 }],
    },
  ],
  day3: [
    {
      time: getTime('2022-09-04', '10:00'),
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: getTime('2022-09-04', '10:30'),
      items: [{ text: 'Pre-Show in Melbourne', span: 4 }],
    },
    { time: getTime('2022-09-04', '11:00'), items: [{ text: 'TBD', span: 4 }] },
    { time: getTime('2022-09-04', '12:30'), items: [{ text: 'TBD', span: 4 }] },
    { time: getTime('2022-09-04', '14:00'), items: [{ text: 'TBD', span: 4 }] },
    {
      time: getTime('2022-09-04', '15:30'),
      items: [{ text: 'TBD', span: 4 }],
    },
    {
      time: getTime('2022-09-04', '17:00'),
      items: [{ text: 'TBD', span: 4 }],
    },
    {
      time: getTime('2022-09-04', '18:30'),
      items: [{ text: 'TBD', span: 4 }],
    },
  ],
}

export const pools: Pools = {
  A: [teams.divineMind, teams.direWolves, teams.kitbash, teams.vertex],
  B: [teams.chiefs, teams.mindfreak, teams.immunity, teams.bandits],
}
