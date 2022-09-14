/* eslint-disable vue/max-len */
import { teams } from './teams'
import { Pools, Schedule } from './types'
import getTime from './get-time'

export const day1Date = new Date('2022-09-23')
export const day2Date = new Date('2022-09-24')
export const day3Date = new Date('2022-09-25')
export const TIMEZONE = 'America/New_York'

const time = getTime(TIMEZONE)

export const schedule: Schedule = {
  title: 'HCS Orlando Major',
  link: 'https://halo-esports.fandom.com/wiki/Halo_Championship_Series/2022_Season/Major_Orlando',
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
      time: time('2022-09-23', '10:00'),
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: time('2022-09-23', '10:30'),
      items: [{ text: 'Orlando Pre-Show', span: 4 }],
    },
    {
      time: time('2022-09-23', '11:00'),
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: time('2022-09-23', '12:30'),
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: time('2022-09-23', '14:00'),
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: time('2022-09-23', '15:30'),
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: time('2022-09-23', '17:00'),
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: time('2022-09-23', '18:30'),
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
  ],
  day2: [
    {
      time: time('2022-09-24', '10:00'),
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: time('2022-09-24', '10:30'),
      items: [{ text: 'Kansas City Pre-Show', span: 4 }],
    },
    {
      time: time('2022-09-24', '11:00'),
      items: [
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
      ],
    },
    {
      time: time('2022-09-24', '12:30'),
      items: [
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
      ],
    },
    {
      time: time('2022-09-24', '14:00'),
      items: [
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
      ],
    },
    {
      time: time('2022-09-24', '15:30'),
      items: [
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
        {
          team1: teams.tbd,
          team2: teams.tbd,
        },
      ],
    },
    {
      time: time('2022-09-24', '17:00'),
      items: [
        { text: 'Winners Quarter Finals', span: 2 },
        { text: 'Elimination Round 1', span: 2 },
      ],
    },
    {
      time: time('2022-09-24', '18:30'),
      items: [
        { text: 'Winners Quarter Finals', span: 2 },
        { text: 'Elimination Round 1', span: 2 },
      ],
    },
  ],
  day3: [
    {
      time: time('2022-09-25', '10:00'),
      items: [{ text: 'Broadcast Begins', span: 4 }],
    },
    {
      time: time('2022-09-25', '10:30'),
      items: [{ text: 'Kansas City Pre-Show', span: 4 }],
    },
    {
      time: time('2022-09-25', '11:00'),
      items: [{ text: 'Winners Semi Finals - tbd vs tbd', span: 4 }],
    },
    {
      time: time('2022-09-25', '12:30'),
      items: [{ text: 'Winners Semi Finals - tbd vs tbd', span: 4 }],
    },
    {
      time: time('2022-09-25', '14:00'),
      items: [{ text: 'Elimination Quarter Finals', span: 4 }],
    },
    {
      time: time('2022-09-25', '15:30'),
      items: [{ text: 'Winners Finals', span: 4 }],
    },
    {
      time: time('2022-09-25', '17:00'),
      items: [{ text: 'Elimination Finals', span: 4 }],
    },
    {
      time: time('2022-09-25', '18:30'),
      items: [{ text: 'Grand Finals', span: 4 }],
    },
  ],
}

export const pools: Pools = {
  A: [teams.optic, teams.faze, teams.acend, teams.chiefs],
  B: [teams.g1, teams.nativeRed, teams.quadrant, teams.cintanegra],
  C: [teams.sentinels, teams.g2, teams.navi, teams.cruelty],
  D: [teams.cloud9, teams.eunited, teams.jlingz, teams.ssg],
}
