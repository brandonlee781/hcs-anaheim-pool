/* eslint-disable @typescript-eslint/ban-types */
import { format } from 'date-fns'
import { computed, ComputedRef } from 'vue'

import { Pools, ScheduleItem, Stream, TeamPool, teams } from '@/data'
import { schedule as eventSchedule, pools, TIMEZONE } from '@/data/melbourne'
import { RemovableRef } from '@vueuse/core'

type UseTournamentResponse = {
  title: string
  link: string
  teams: TeamPool
  streams: Stream[]
  schedule: ComputedRef<ScheduleItem[]>
  pools?: Pools
  timezone: string
}

export default function (day?: RemovableRef<number>): UseTournamentResponse {
  const days = [eventSchedule.day1, eventSchedule.day2, eventSchedule.day3]
  const schedule = computed<ScheduleItem[]>(() => {
    if (!day) return []
    const daySchedule = days[day.value - 1]
    return daySchedule!.map((sched): ScheduleItem => {
      return {
        // time: format(new Date(sched.time), 'h:mmaaa'),
        time: sched.time,
        items: sched.items,
      }
    })
  })
  return {
    title: eventSchedule.title,
    link: eventSchedule.link,
    streams: eventSchedule.streams,
    teams,
    schedule,
    pools: pools && Object.keys(pools).length ? pools : undefined,
    timezone: TIMEZONE || 'UTC',
  }
}
