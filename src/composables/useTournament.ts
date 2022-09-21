import { computed, ComputedRef, onMounted, Ref, ref } from 'vue'
import { RemovableRef } from '@vueuse/core'
import { defaultStyle } from '@/assets/styles'

import teams from '@/data/teams.yaml'
import eventData from '@/data/orlando.event.yaml'

const getOffset = (timeZone = 'UTC') => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    timeZoneName: 'longOffset' as const,
  }
  const dateText = Intl.DateTimeFormat([], options).format(new Date())

  // Scraping the numbers we want from the text
  // The default value '+0' is needed when the timezone is missing the number part.
  // Ex. Africa/Bamako --> GMT
  const timezoneString = dateText.split(' ')[1].slice(3) || '+0'

  return timezoneString
}

function getTime(timezone: string) {
  const offset = getOffset(timezone)
  return (date: string, time: string) => `${date}T${time}:00${offset}`
}

type UseTournamentResponse = {
  event: Ref<HcsEvent>
  schedule: ComputedRef<ScheduleSlot[]>
  pools?: ComputedRef<Pools>
  participants?: ComputedRef<Team[]>
  styles: ComputedRef<Style>
  teams: TeamPool
}

export default function (day?: RemovableRef<number>): UseTournamentResponse {
  const event = ref<HcsEvent>({
    title: '',
    link: '',
    timezone: 'UTC',
    styles: {},
    streams: [],
    days: [],
    day1: [],
  })

  onMounted(() => {
    event.value = eventData as HcsEvent
  })

  const schedule = computed<ScheduleSlot[]>(() => {
    if (!day || day.value - 1 > event.value.days.length) return []

    const timeFn = getTime(event.value?.timezone)
    const days = [
      event.value?.day1,
      event.value?.day2,
      event.value?.day3,
    ].filter(Boolean)
    const daySchedule = days[day.value - 1]

    if (!daySchedule) return []
    return daySchedule.map((sched: any) => {
      const d = event.value?.days[day.value - 1] ?? '2022-01-01'
      const time = timeFn(d, sched.time)
      return {
        ...sched,
        time,
        items: sched.items.map((item: any) => {
          return {
            ...item,
            team1: item?.team1 ? teams[item.team1] : null,
            team2: item?.team2 ? teams[item.team2] : null,
          }
        }),
      }
    })
  })

  const participants = computed(() => {
    return event.value?.participants?.map((p: string) => teams[p]) ?? []
  })

  const pools = computed(() => {
    const getTeam = (t: string): Team => teams[t]
    const p = {
      A: event.value.pools?.A?.map(getTeam) ?? [],
      B: event.value.pools?.B?.map(getTeam) ?? [],
      C: event.value.pools?.C?.map(getTeam) ?? [],
      D: event.value.pools?.D?.map(getTeam) ?? [],
    }
    return p
  })

  const styles = computed<Style>(() => {
    return {
      ...defaultStyle,
      ...event.value?.styles,
    }
  })

  return {
    event,
    schedule,
    participants,
    pools,
    teams,
    styles,
  }
}
