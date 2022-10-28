import clsx from 'clsx'
import {
  differenceInMinutes,
  parse,
  startOfHour,
  addHours,
  eachHourOfInterval,
  addMinutes,
  isSameHour,
  isSameDay,
} from 'date-fns'

import { TournamentDay } from '@/features/tournament'

import { ScheduleCalendarBackgroundGrid } from '../ScheduleCalendarBackgroundGrid'
import { ScheduleCalendarCurrentTime } from '../ScheduleCalendarCurrentTime'
import { ScheduleCalendarEvent } from '../ScheduleCalendarEvent'
import { ScheduleCalendarGrid } from '../ScheduleCalendarGrid/ScheduleCalendarGrid'

import styles from './ScheduleCalendar.module.scss'

export const INCREMENT = 30
export const DEFAULT_ITEM_LENGTH = 90 / INCREMENT // 90 minutes dividied by the increment

export const parseTime = (time: string) => parse(time, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date())

export const getPosition = (curr: Date, next: Date, s: Date) => {
  // All times are in 15 minute increments
  // Get the offset from the beginning of the days events
  // And get the length of the event until the next event
  const offset = differenceInMinutes(curr, s)
  const length = differenceInMinutes(curr, next)

  return {
    // eslint-disable-next-line prettier/prettier
    offset: Math.floor((offset / INCREMENT) + 1),
    length: Math.abs(length / INCREMENT),
  }
}

type ScheduleCalendarProps = {
  day: TournamentDay
}

export const ScheduleCalendar = ({ day }: ScheduleCalendarProps) => {
  const { t } = useTranslation()
  const timeslots = useMemo(() => {
    if (!day.events?.length) return []
    const firstEvent = day.events[0]
    const lastEvent = day.events[day.events.length - 1]

    const start = startOfHour(parseTime(firstEvent.time))

    const lastEventEnd = addMinutes(parseTime(lastEvent.time), lastEvent.duration)
    const nextHour = addHours(lastEventEnd, 1)
    const end = isSameHour(lastEventEnd, nextHour) ? startOfHour(nextHour) : lastEventEnd
    const hours = eachHourOfInterval({ start, end })

    const times = [start, ...hours, end].filter(
      (date, i, self) => self.findIndex(d => d.getTime() === date.getTime()) === i
    )
    return times
  }, [day])

  const gridRows = useMemo(() => {
    return getPosition(timeslots[0], timeslots[timeslots.length - 1], timeslots[0]).length
  }, [timeslots])

  const ref = useRef<HTMLDivElement>(null)
  return (
    <div>
      <ScheduleCalendarGrid
        className="shadow-md mb-1"
        rows={1}
        cols={day.streams?.length}
        height={'2.2rem'}
      >
        <div></div>
        {day.streams?.map(stream => (
          <div key={stream.id} className="flex items-center justify-center text-xs">
            <a className="hover:underline" href={stream.link} target="_blank" rel="noreferrer">
              {t('event:stream', { name: stream.name })}
            </a>
          </div>
        ))}
      </ScheduleCalendarGrid>

      <div className={clsx('h-full overflow-scroll scrollbar-hide', styles.calendar)}>
        <div className={clsx('w-full h-full relative mt-4 pb-10')}>
          <ScheduleCalendarBackgroundGrid
            className="mb-25"
            ref={ref}
            timeslots={timeslots}
            rows={gridRows}
            streams={day.streams}
          />

          <ScheduleCalendarGrid
            rows={gridRows}
            cols={day.streams?.length}
            className="absolute top-0 bottom-0 right-0 left-0"
          >
            {day.events?.map((event, i) => {
              const start = parseTime(event.time)
              const end = addMinutes(start, Math.max(event.duration, INCREMENT))
              const { offset, length } = getPosition(start, end, timeslots[0])

              return (
                <ScheduleCalendarEvent
                  key={`event-${i}`}
                  event={event}
                  offset={offset}
                  length={length}
                />
              )
            })}
          </ScheduleCalendarGrid>
          {day.events?.[0]?.time && isSameDay(new Date(day.date), new Date()) && (
            <ScheduleCalendarCurrentTime
              heightRef={ref}
              first={timeslots[0]}
              last={timeslots[timeslots.length - 1]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
