import { format } from 'date-fns'
import { computed, ComputedRef } from 'vue'

import { Match, Pools, ScheduleItem, streams, TeamPool, teams } from '@/data'
import { matches, schedule as eventSchedule, pools } from '@/data/valencia'
import { RemovableRef } from '@vueuse/core'

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

type UseTournamentResponse = {
  title: string
  link: string
  teams: TeamPool
  matches: Match[]
  schedule: ComputedRef<ScheduleItem[]>
  pools: Pools
}

export default function (day?: RemovableRef<number>): UseTournamentResponse {
  const days = [eventSchedule.day1, eventSchedule.day2, eventSchedule.day3]
  const schedule = computed<ScheduleItem[]>(() => {
    if (!day) return []
    const daySchedule = days[day.value - 1]
    return daySchedule.map((sched): ScheduleItem => {
      if (!sched.items) {
        const timeMatches = matches.filter(
          match => match.day === day.value && match.timeslot === sched.timeslot
        )

        if (!timeMatches.length) {
          return {
            time: format(new Date(sched.time), 'h:mmaaa'),
            matches: noMatches,
          }
        }

        return {
          time: format(new Date(sched.time), 'h:mmaaa'),
          matches: [
            timeMatches.find(m => m.stream.id === 'halo')!,
            timeMatches.find(m => m.stream.id === 'xbox')!,
            timeMatches.find(m => m.stream.id === 'red')!,
            timeMatches.find(m => m.stream.id === 'blue')!,
          ],
        }
      }
      return {
        time: format(new Date(sched.time), 'h:mmaaa'),
        items: sched.items,
      }
    })
  })
  return {
    title: eventSchedule.title,
    link: eventSchedule.link,
    teams,
    matches,
    schedule,
    pools,
  }
}
