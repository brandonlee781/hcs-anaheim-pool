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

import { Team } from '@/features/teams'
import { TournamentDay } from '@/features/tournament'

import { formatOptionalMinutes } from '../../utils/formatOptionalMinutes'
import { ScheduleCalendarCurrentTime } from '../ScheduleCalendarCurrentTime/ScheduleCalendarCurrentTime'
import { ScheduleCalendarEvent } from '../ScheduleCalendarEvent'

import styles from './ScheduleCalendar.module.css'

const GRID_ITEM_HEIGHT = '2.4rem'
const INCREMENT = 30
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

type CalendarGridProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  rows: number
  cols?: number
  height?: string
}
const ScheduleCalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  ({ className, children, rows = 1, cols = 1, height }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('grid', className)}
        style={{
          gridTemplateRows: `repeat(${rows}, ${height || GRID_ITEM_HEIGHT})`,
          gridTemplateColumns: `3rem repeat(${cols}, 1fr)`,
        }}
      >
        {children}
      </div>
    )
  }
)

type ScheduleCalendarProps = {
  day: TournamentDay<Team>
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
    <div className={clsx('h-full overflow-scroll scrollbar-hide', styles.calendar)}>
      <div className={clsx('w-full h-full relative')}>
        <ScheduleCalendarGrid rows={1} cols={day.streams?.length} height={'1.5rem'}>
          <div></div>
          {day.streams?.map(stream => (
            <div key={stream.id} className="flex items-center justify-center text-xs h-6">
              <a className="hover:underline" href={stream.link} target="_blank" rel="noreferrer">
                {t('event:stream', { name: stream.name })}
              </a>
            </div>
          ))}
        </ScheduleCalendarGrid>
        <ScheduleCalendarGrid ref={ref} rows={gridRows} cols={day.streams?.length} className="mb-8">
          {timeslots.map((time, index) => {
            const nextTime = timeslots[index + 1]

            const next = nextTime ?? timeslots[timeslots.length - 1]
            const { offset, length } = getPosition(time, next, timeslots[0])
            return (
              <Fragment key={index}>
                <div
                  className={clsx(
                    'w-full flex col-start-1 relative',
                    `row-start-${offset}`,
                    `row-span-${nextTime ? length : 60 / INCREMENT}`
                  )}
                  key={`timeslot-time-${index}`}
                >
                  <span className="absolute right-1 -top-2 w-12 text-right text-xs font-bold text-gray-300">
                    {formatOptionalMinutes(time, '', 'h aa')}
                  </span>
                </div>
                {day.streams?.map((stream, i) => (
                  <div
                    className={clsx(
                      'w-full flex',
                      `row-start-${offset}`,
                      `row-span-${nextTime ? length : 60 / INCREMENT}`,
                      'border-gray-600 border-1',
                      index > 0 && 'border-t-0',
                      i > 0 && 'border-l-0'
                    )}
                    key={`timeslot-lines-${i}`}
                  ></div>
                ))}
              </Fragment>
            )
          })}
        </ScheduleCalendarGrid>
        <ScheduleCalendarGrid
          rows={gridRows}
          cols={day.streams?.length}
          className="absolute top-6 bottom-0 right-0 left-0"
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
  )
}
