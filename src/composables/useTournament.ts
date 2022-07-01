import { format } from 'date-fns'
import { computed } from 'vue'

import { ScheduleItem, streams, teams } from '@/data'
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

export default function (day: RemovableRef<number>) {
  const days = [eventSchedule.day1, eventSchedule.day2, eventSchedule.day3]
  const schedule = computed<ScheduleItem[]>(() => {
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
    teams,
    matches,
    schedule,
    pools,
  }
}
