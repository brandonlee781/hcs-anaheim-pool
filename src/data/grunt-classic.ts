/* eslint-disable vue/max-len */
import { teams } from './teams'
import { Schedule } from './types'
import getTime from './get-time'

export const day1Date = new Date('2022-09-23')
export const day2Date = new Date('2022-09-24')
export const day3Date = new Date('2022-09-25')
export const TIMEZONE = 'America/New_York'

const time = getTime(TIMEZONE)

export const schedule: Schedule = {
  title: 'eUnited Grunt Classic',
  link: 'https://liquipedia.net/halo/EUnited/2022/Grunt_Classic/Open_Bracket',
  streams: [
    {
      id: 'eunited',
      name: 'eUnited Stream',
      link: 'https://t.co/f6bCy4vu8y',
      span: 4,
    },
  ],
  styles: {
    bodyStyle: 'bg-gradient-to-br from-red-700 to-blue-700',
  },
  day1: [
    {
      time: time('2022-09-16', '13:45'),
      items: [{ text: 'Pre-Show', span: 4 }],
    },
    {
      time: time('2022-09-16', '14:00'),
      items: [
        {
          team1: teams.eunited,
          team2: teams.acend,
          span: 4,
          text: 'Winners Round 1',
        },
      ],
    },
    {
      time: time('2022-09-16', '15:15'),
      items: [
        {
          span: 2,
          text: 'Winner of:',
          team1: teams.eunited,
          team2: teams.acend,
        },
        {
          span: 2,
          text: 'Winner of:',
          team1: teams.sentinels,
          team2: teams.forbiddenFruit,
        },
      ],
    },
    {
      time: time('2022-09-16', '16:30'),
      items: [
        {
          span: 2,
          text: 'Winner of:',
          team1: teams.faze,
          team2: teams.ssg,
        },
        {
          span: 2,
          text: 'Winner of:',
          team1: teams.cloud9,
          team2: teams.nativeBlack,
        },
      ],
    },
    {
      time: time('2022-09-16', '17:45'),
      items: [{ span: 4, text: 'Elimination Round 3' }],
    },
    {
      time: time('2022-09-16', '19:00'),
      items: [{ span: 4, text: 'Elimination Round 3' }],
    },
  ],
  // day2: [
  //   {
  //     time: time('2022-09-17', '10:00'),
  //     items: [{ text: 'Broadcast Begins', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-17', '10:30'),
  //     items: [{ text: 'Kansas City Pre-Show', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-17', '11:00'),
  //     items: [
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //     ],
  //   },
  //   {
  //     time: time('2022-09-17', '12:30'),
  //     items: [
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //     ],
  //   },
  //   {
  //     time: time('2022-09-17', '14:00'),
  //     items: [
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //     ],
  //   },
  //   {
  //     time: time('2022-09-17', '15:30'),
  //     items: [
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //       {
  //         team1: teams.tbd,
  //         team2: teams.tbd,
  //       },
  //     ],
  //   },
  //   {
  //     time: time('2022-09-17', '17:00'),
  //     items: [
  //       { text: 'Winners Quarter Finals', span: 2 },
  //       { text: 'Elimination Round 1', span: 2 },
  //     ],
  //   },
  //   {
  //     time: time('2022-09-17', '18:30'),
  //     items: [
  //       { text: 'Winners Quarter Finals', span: 2 },
  //       { text: 'Elimination Round 1', span: 2 },
  //     ],
  //   },
  // ],
  // day3: [
  //   {
  //     time: time('2022-09-25', '10:00'),
  //     items: [{ text: 'Broadcast Begins', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-25', '10:30'),
  //     items: [{ text: 'Kansas City Pre-Show', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-25', '11:00'),
  //     items: [{ text: 'Winners Semi Finals - tbd vs tbd', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-25', '12:30'),
  //     items: [{ text: 'Winners Semi Finals - tbd vs tbd', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-25', '14:00'),
  //     items: [{ text: 'Elimination Quarter Finals', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-25', '15:30'),
  //     items: [{ text: 'Winners Finals', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-25', '17:00'),
  //     items: [{ text: 'Elimination Finals', span: 4 }],
  //   },
  //   {
  //     time: time('2022-09-25', '18:30'),
  //     items: [{ text: 'Grand Finals', span: 4 }],
  //   },
  // ],
}

export const pools = undefined

// eslint-disable
export const participants = [
  teams.eunited,
  teams.sentinels,
  teams.optic,
  teams.cloud9,
  teams.ssg,
  teams.g1,
  teams.faze,
  teams.acend,
  teams.navi,
  teams.fnatic,
  teams.complexity,
  teams.nativeRed,
  teams.rebellion,
  teams.tss,
  teams.forbiddenFruit,
  teams.nativeBlack,
]
