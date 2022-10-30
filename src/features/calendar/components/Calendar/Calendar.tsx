import clsx from 'clsx'
import {
  differenceInMinutes,
  parse,
  startOfHour,
  addHours,
  eachHourOfInterval,
  format,
  addSeconds,
} from 'date-fns'
import { endOfHour } from 'date-fns/esm'
import ScrollContainer from 'react-indiana-drag-scroll'

import { Stream, TournamentDay } from '@/features/tournament'
import { usePrevious } from '@/hooks/usePrevious'

import { CalendarBackgroundGrid } from '../CalendarBackgroundGrid'
import { CalendarCurrentTime } from '../CalendarCurrentTime'
import { CalendarEvents } from '../CalendarEvents'
import { CalendarGrid } from '../CalendarGrid'

import styles from './Calendar.module.scss'

export const INCREMENT = 30
export const DEFAULT_ITEM_LENGTH = 90 / INCREMENT // 90 minutes dividied by the increment

export const parseTime = (time: string) =>
  parse(
    format(parse(time, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()), 'HH:mm:ss'),
    'HH:mm:ss',
    new Date()
  )

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

type CalendarProps = {
  days: TournamentDay[]
  day: number
}

export const Calendar = ({ days, day }: CalendarProps) => {
  const { t } = useTranslation()

  const timeslots = useMemo(() => {
    if (!days.length) return []
    const timeArray = days
      .map(d => d.events)
      .reduce((a, b) => a.concat(b), [])
      .map(e => e.time)
      .sort()
      .map(i => {
        return i && parseTime(i)
      })
      .filter(Boolean)
    const uniqueTimes = timeArray
      .filter((date, i, self) => self.findIndex(d => d.getTime() === date.getTime()) === i)
      .sort()

    const firstTime = uniqueTimes[0]
    const lastTime = uniqueTimes[uniqueTimes.length - 1]

    const firstEvent = parse(format(firstTime, 'HH:mm:ss'), 'HH:mm:ss', new Date())
    const lastEvent = parse(format(lastTime, 'HH:mm:ss'), 'HH:mm:ss', new Date())

    const start = startOfHour(firstEvent)
    const end = addHours(addSeconds(endOfHour(lastEvent), 1), 1)

    return eachHourOfInterval({ start, end })
  }, [day])

  const gridRows = useMemo(() => {
    return getPosition(timeslots[0], timeslots[timeslots.length - 1], timeslots[0]).length
  }, [timeslots])

  const ref = useRef<HTMLDivElement>(null)

  const [currentDayId, setCurrentDayId] = useState('')
  const [streams, setStreams] = useState<Stream[]>([])
  const previousDay = usePrevious(day)
  const [config, setConfig] = useState<{ to?: { x: number }; from?: { x: number } }>({
    from: { x: -1200 },
    to: { x: 0 },
  })

  useEffect(() => {
    if ((previousDay || 0) < day) {
      setConfig({
        from: { x: 1000 },
        to: { x: 0 },
      })
    } else {
      setConfig({
        from: { x: -1200 },
        to: { x: 0 },
      })
    }
    setCurrentDayId(days[day].id)
    setStreams(days[day].streams)
  }, [days, day])

  return (
    <div className="overflow-hidden">
      <CalendarGrid className="shadow-md mb-1" rows={1} cols={streams?.length} height={'2.2rem'}>
        <div></div>
        {streams?.map(stream => (
          <div key={stream.id} className="flex items-center justify-center text-xs">
            <a className="hover:underline" href={stream.link} target="_blank" rel="noreferrer">
              {t('event:stream', { name: stream.name })}
            </a>
          </div>
        ))}
      </CalendarGrid>

      <ScrollContainer className={clsx('h-full lg:overflow-scroll', styles.calendar)}>
        <div className={clsx('w-full h-full relative mt-4 lg:pb-10')}>
          <CalendarBackgroundGrid
            ref={ref}
            timeslots={timeslots}
            rows={gridRows}
            streams={streams}
          />

          <CalendarGrid
            rows={gridRows}
            cols={streams.length}
            className="absolute top-0 bottom-0 right-0 left-0"
          >
            {days.map(d => {
              if (currentDayId === d.id) {
                const events = d.events.sort((a, b) => {
                  const val = parseTime(a.time).getTime() - parseTime(b.time).getTime()

                  if (val > 0) return 1
                  if (val < 0) return -1
                  const aStreamIdx = streams.findIndex(s => s.id === a.streams?.[0])
                  const bStreamIdx = streams.findIndex(s => s.id === b.streams?.[0])
                  return aStreamIdx - bStreamIdx
                })
                return (
                  <CalendarEvents
                    key={d.id}
                    events={events}
                    timeslots={timeslots}
                    streams={streams}
                    config={config}
                  />
                )
              }
            })}
          </CalendarGrid>
          {days[day].events?.[0]?.time && (
            <CalendarCurrentTime
              heightRef={ref}
              first={timeslots[0]}
              last={timeslots[timeslots.length - 1]}
            />
          )}
        </div>
      </ScrollContainer>
    </div>
  )
}
