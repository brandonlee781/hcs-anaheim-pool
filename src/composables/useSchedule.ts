import { format } from 'date-fns'
import { computed, ComputedRef } from 'vue'
import useMatches, { Match, streams } from './useMatches'
import { Team, teams } from './useTeam';

export type ScheduleItem = {
  time: string;
  items?: { text: string, span: number; highlights?: Team[] }[]
  matches?: Match[]
}

const day1 = [
  { time: new Date('2022-01-01T17:30:00+0000'), items: [{text: 'Broadcast Begins', span: 4}] },
  { time: new Date('2022-01-01T17:40:00+0000'), items: [{text: 'Kansas City Pre-Show', span: 4}] },
  { time: new Date('2022-01-01T18:00:00+0000'), timeslot: 0 },
  { time: new Date('2022-02-11T19:15:00+0000'), timeslot: 1 },
  { time: new Date('2022-02-11T20:30:00+0000'), timeslot: 2 },
  { time: new Date('2022-02-11T21:45:00+0000'), timeslot: 3 },
  { time: new Date('2022-03-11T23:00:00+0000'), timeslot: 4 },
  { time: new Date('2022-03-11T00:15:00+0000'), timeslot: 5 },
  { time: new Date('2022-03-11T01:30:00+0000'), items: [{text: 'HCS All-Star Showdown', span: 4}] },
]

const day2 = [
  { time: new Date('2022-01-01T17:30:00+0000'), items: [{text: 'Broadcast Begins', span: 4}] },
  { time: new Date('2022-01-01T17:40:00+0000'), items: [{text: 'Kansas City Pre-Show', span: 4}] },
  { time: new Date('2022-02-11T18:00:00+0000'), timeslot: 0 },
  { time: new Date('2022-02-11T19:15:00+0000'), timeslot: 1 },
  { time: new Date('2022-02-11T20:30:00+0000'), timeslot: 2 },
  { time: new Date('2022-02-11T21:45:00+0000'), timeslot: 3 },
  { 
    time: new Date('2022-03-11T23:00:00+0000'),
    items: [
      {
        text: 'Winners Quarter Finals - ACEND vs Optic Gaming',
        span: 2,
        highlights: [teams.og, teams.acn]
      }, 
      { text: 'Elimination Round 1', span: 2 },
    ]
  },
  { 
    time: new Date('2022-03-11T00:15:00+0000'), 
    items: [
      { text: 'Winners Quarter Finals', span: 2 },
      { text: 'Elimination Round 1', span: 2 }
    ]
  },
]

const noMatches = [
  {
    stream: streams.halo,
    team1: { name: 'TBD', region: null, color: '' },
    team2: { name: 'TBD', region: null, color: '' },
    timeslot: 0,
  },
  {
    stream: streams.xbox,
    team1: { name: 'TBD', region: null, color: '' },
    team2: { name: 'TBD', region: null, color: '' },
    timeslot: 0,
  },
  {
    stream: streams.red,
    team1: { name: 'TBD', region: null, color: '' },
    team2: { name: 'TBD', region: null, color: '' },
    timeslot: 0,
  },
  {
    stream: streams.blue,
    team1: { name: 'TBD', region: null, color: '' },
    team2: { name: 'TBD', region: null, color: '' },
    timeslot: 0,
  },
]

export default function useSchedule(day: ComputedRef<number>) {
  const {matches} = useMatches()

  const schedule = computed<ScheduleItem[]>(() => {
    const daySchedule = day.value === 1 ? day1 : day2
    return daySchedule.map((sched): ScheduleItem => {
      if (!sched.items) {
        const timeMatches = matches.filter(match => match.day === day.value && match.timeslot === sched.timeslot)

        if (!timeMatches.length) {
          return {
            time: format(sched.time, 'h:mmaaa'),
            matches: noMatches
          }
        }

        return {
          time: format(sched.time, 'h:mmaaa'),
          matches: [
            timeMatches.find(m => m.stream.id === 'halo')!,
            timeMatches.find(m => m.stream.id === 'xbox')!,
            timeMatches.find(m => m.stream.id === 'red')!,
            timeMatches.find(m => m.stream.id === 'blue')!
          ],
        }
      }
      return {
        time: format(sched.time, 'h:mmaaa'),
        items: sched.items,
      }
    })
  })

  return {
    schedule
  }
}