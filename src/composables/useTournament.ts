import { computed, ComputedRef, onMounted, Ref, ref } from 'vue'
import { RemovableRef, useStorage } from '@vueuse/core'
import { defaultStyle } from '@/assets/styles'

import teams from '@/data/teams.yaml'
import eventData from '@/data/seattle.event.yaml'
import { useI18n } from 'vue-i18n'

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
  day: RemovableRef<number>
  event: Ref<HcsEvent>
  schedule: ComputedRef<ScheduleSlot[]>
  pools?: ComputedRef<Pools>
  participants?: ComputedRef<{ team: Team; eliminated: boolean }[]>
  styles: ComputedRef<Style>
  teams: TeamPool
}
const day = useStorage('hsc-day-val', 0)

export default function (): UseTournamentResponse {
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

  const { t } = useI18n()

  const getTeam = (key: string): Team | null => {
    if (!key) return null
    if (key === 'open') {
      return {
        ...teams.open,
        name: t('event.open-team'),
      }
    }
    return teams[key] ?? null
  }

  const schedule = computed<ScheduleSlot[]>(() => {
    if (day.value > event.value.days.length) return []

    const timeFn = getTime(event.value?.timezone)
    const days = [event.value?.day1, event.value?.day2, event.value?.day3]
    const daySchedule = days[day.value]

    if (!daySchedule)
      return [
        {
          time: timeFn(event.value?.days[day.value].date, '00:00'),
          items: [
            {
              text: t('table.no-data'),
              span: 4,
              textClass: 'text-lg font-bold',
            },
          ],
        },
      ]
    return daySchedule.map((sched: any) => {
      const d = event.value?.days[day.value].date ?? '2022-01-01'
      const time = timeFn(d, sched.time)
      return {
        ...sched,
        time,
        items: sched.items.map((item: any) => {
          return {
            ...item,
            team1: getTeam(item?.team1),
            team2: getTeam(item?.team2),
            team3: getTeam(item?.team3),
            team4: getTeam(item?.team4),
          }
        }),
      }
    })
  })

  const participants = computed(() => {
    return (
      event.value?.participants?.map(p => ({
        team: teams[p.team],
        eliminated: p.eliminated || false,
      })) ?? []
    )
  })

  const pools = computed(() => {
    const p = {
      A: event.value.pools?.A?.map(getTeam).filter(Boolean) ?? [],
      B: event.value.pools?.B?.map(getTeam).filter(Boolean) ?? [],
      C: event.value.pools?.C?.map(getTeam).filter(Boolean) ?? [],
      D: event.value.pools?.D?.map(getTeam).filter(Boolean) ?? [],
    }
    return p as Pools
  })

  const styles = computed<Style>(() => {
    return {
      ...defaultStyle,
      ...event.value?.styles,
    }
  })

  return {
    day,
    event,
    schedule,
    participants,
    pools,
    teams,
    styles,
  }
}
