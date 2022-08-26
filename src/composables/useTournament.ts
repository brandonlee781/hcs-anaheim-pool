/* eslint-disable @typescript-eslint/ban-types */
import { format } from 'date-fns'
import { computed, ComputedRef } from 'vue'

import { Pools, ScheduleItem, streams, TeamPool, teams } from '@/data'
import { schedule as eventSchedule, pools } from '@/data/melbourne'
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
  schedule: ComputedRef<ScheduleItem[]>
  pools?: Pools
}

export default function (day?: RemovableRef<number>): UseTournamentResponse {
  const days = [eventSchedule.day1, eventSchedule.day2, eventSchedule.day3]
  const schedule = computed<ScheduleItem[]>(() => {
    if (!day) return []
    const daySchedule = days[day.value - 1]
    return daySchedule!.map((sched): ScheduleItem => {
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
    schedule,
    pools: pools && Object.keys(pools).length ? pools : undefined,
  }
}
