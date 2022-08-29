/* eslint-disable vue/max-len */
import { teams } from './teams'
import { Pools, Schedule } from './types'

export const day1Date = new Date('2022-09-23')
export const day2Date = new Date('2022-09-24')
export const day3Date = new Date('2022-09-25')

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
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: '2022-09-23T19:15:00+0000',
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: '2022-09-23T20:30:00+0000',
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: '2022-09-23T21:45:00+0000',
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: '2022-09-23T23:00:00+0000',
      items: [
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
        { team1: teams.tbd, team2: teams.tbd },
      ],
    },
    {
      time: '2022-09-23T00:15:00+0000',
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
      time: '2022-09-24T19:15:00+0000',
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
      time: '2022-09-24T20:30:00+0000',
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
      time: '2022-09-24T21:45:00+0000',
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
      items: [{ text: 'Winners Semi Finals - tbd vs tbd', span: 4 }],
    },
    {
      time: '2022-09-25T19:15:00+0000',
      items: [{ text: 'Winners Semi Finals - tbd vs tbd', span: 4 }],
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
  A: [teams.acend, teams.divineMind, teams.navi, teams.g2, teams.tbd],
  B: [teams.ssg, teams.cloud9, teams.pioneers, teams.jlingz, teams.tbd],
  C: [teams.optic, teams.quadrant, teams.eunited, teams.noteam, teams.tbd],
  D: [teams.sentinels, teams.g1, teams.faze, teams.cintanegra, teams.tbd],
}
