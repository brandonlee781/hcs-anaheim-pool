/* eslint-disable vue/max-len */
import { teams } from './teams'
import { Pools, Schedule } from './types'

export const day1Date = new Date('2022-09-23')
export const day2Date = new Date('2022-09-24')
export const day3Date = new Date('2022-09-25')

export const schedule: Schedule = {
  title: 'HCS Kansas City Major',
  link: 'https://halo-esports.fandom.com/wiki/Halo_Championship_Series/2022_Season/Major_Kansas_City',
  streams: [
    {
      id: 'halo',
      name: 'A Stream (Halo)',
      link: 'https://www.twitch.tv/halo',
    },
    {
      id: 'xbox',
      name: 'B Stream (Xbox)',
      link: 'https://www.twitch.tv/xbox',
    },
    {
      id: 'red',
      name: 'C Stream (HCS_Red)',
      link: 'https://www.twitch.tv/hcs_red',
    },
    {
      id: 'blue',
      name: 'D Stream (HCS_Blue)',
      link: 'https://www.twitch.tv/hcs_blue',
    },
  ],
  day1: [
    {
      time: '2022-09-23T17:30:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-09-23T17:40:00+0000',
      items: [{ text: 'Orlando Pre-Show', span: 4 }],
    },
    {
      time: '2022-09-23T18:00:00+0000',
      items: [
        { team1: teams.cloud9, team2: teams.acend },
        { team1: teams.sentinels, team2: teams.knights },
        { team1: teams.xset, team2: teams.chiefs },
        { team1: teams.pioneers, team2: teams.jlingz },
      ],
    },
    {
      time: '2022-09-23T19:15:00+0000',
      items: [
        { team1: teams.faze, team2: teams.navi },
        { team1: teams.optic, team2: teams.fnatic },
        { team1: teams.g2, team2: teams.quadrant },
        { team1: teams.eunited, team2: teams.cruelty },
      ],
    },
    {
      time: '2022-09-23T20:30:00+0000',
      items: [
        { team1: teams.xset, team2: teams.acend },
        { team1: teams.pioneers, team2: teams.knights },
        { team1: teams.cloud9, team2: teams.chiefs },
        { team1: teams.sentinels, team2: teams.jlingz },
      ],
    },
    {
      time: '2022-09-23T21:45:00+0000',
      items: [
        { team1: teams.eunited, team2: teams.g2 },
        { team1: teams.faze, team2: teams.fnatic },
        { team1: teams.optic, team2: teams.navi },
        { team1: teams.quadrant, team2: teams.cruelty },
      ],
    },
    {
      time: '2022-09-23T23:00:00+0000',
      items: [
        { team1: teams.sentinels, team2: teams.pioneers },
        { team1: teams.acend, team2: teams.chiefs },
        { team1: teams.cloud9, team2: teams.xset },
        { team1: teams.jlingz, team2: teams.knights },
      ],
    },
    {
      time: '2022-09-23T00:15:00+0000',
      items: [
        { team1: teams.optic, team2: teams.faze },
        { team1: teams.eunited, team2: teams.quadrant },
        { team1: teams.navi, team2: teams.fnatic },
        { team1: teams.g2, team2: teams.cruelty },
      ],
    },
  ],
  day2: [
    {
      time: '2022-09-24T17:30:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-09-24T17:40:00+0000',
      items: [{ text: 'Kansas City Pre-Show', span: 4 }],
    },
    {
      time: '2022-09-24T18:00:00+0000',
      items: [
        {
          team1: teams.quadrant,
          team2: teams.g1,
        },
        {
          team1: teams.optic,
          team2: teams.complexity,
        },
        {
          team1: teams.xset,
          team2: teams.ssg,
        },
        {
          team1: teams.jlingz,
          team2: teams.bbg,
        },
      ],
    },
    {
      time: '2022-09-24T19:15:00+0000',
      items: [
        {
          team1: teams.fnatic,
          team2: teams.complexity,
        },
        {
          team1: teams.g2,
          team2: teams.g1,
        },
        {
          team1: teams.acend,
          team2: teams.ssg,
        },
        {
          team1: teams.sentinels,
          team2: teams.bbg,
        },
      ],
    },
    {
      time: '2022-09-24T20:30:00+0000',
      items: [
        {
          team1: teams.chiefs,
          team2: teams.ssg,
        },
        {
          team1: teams.cruelty,
          team2: teams.g1,
        },
        {
          team1: teams.navi,
          team2: teams.complexity,
        },
        {
          team1: teams.knights,
          team2: teams.bbg,
        },
      ],
    },
    {
      time: '2022-09-24T21:45:00+0000',
      items: [
        {
          team1: teams.pioneers,
          team2: teams.bbg,
        },
        {
          team1: teams.faze,
          team2: teams.complexity,
        },
        {
          team1: teams.cloud9,
          team2: teams.ssg,
        },
        {
          team1: teams.eunited,
          team2: teams.g1,
        },
      ],
    },
    {
      time: '2022-09-24T23:00:00+0000',
      items: [
        { text: 'Winners Quarter Finals', span: 2 },
        { text: 'Elimination Round 1', span: 2 },
      ],
    },
    {
      time: '2022-09-24T00:15:00+0000',
      items: [
        { text: 'Winners Quarter Finals', span: 2 },
        { text: 'Elimination Round 1', span: 2 },
      ],
    },
  ],
  day3: [
    {
      time: '2022-09-25T17:30:00+0000',
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: '2022-09-25T17:40:00+0000',
      items: [{ text: 'Kansas City Pre-Show', span: 4 }],
    },
    {
      time: '2022-09-25T18:00:00+0000',
      items: [{ text: 'Winners Semi Finals - Optic vs eUnited', span: 4 }],
    },
    {
      time: '2022-09-25T19:15:00+0000',
      items: [{ text: 'Winners Semi Finals - Cloud9 vs Sentinels', span: 4 }],
    },
    {
      time: '2022-09-25T20:30:00+0000',
      items: [{ text: 'Elimination Quarter Finals', span: 4 }],
    },
    {
      time: '2022-09-25T21:45:00+0000',
      items: [{ text: 'Winners Finals', span: 4 }],
    },
    {
      time: '2022-09-25T23:00:00+0000',
      items: [{ text: 'Elimination Finals', span: 4 }],
    },
    {
      time: '2022-09-25T00:15:00+0000',
      items: [{ text: 'Grand Finals', span: 4 }],
    },
  ],
}

export const pools: Pools = {
  A: [teams.cloud9, teams.acend, teams.xset, teams.chiefs, teams.ssg],
  B: [teams.optic, teams.faze, teams.fnatic, teams.navi, teams.complexity],
  C: [teams.eunited, teams.quadrant, teams.g2, teams.cruelty, teams.g1],
  D: [teams.sentinels, teams.pioneers, teams.knights, teams.jlingz, teams.bbg],
}
