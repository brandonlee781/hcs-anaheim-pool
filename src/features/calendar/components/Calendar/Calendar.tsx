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
import { motion } from 'framer-motion'
import ScrollContainer from 'react-indiana-drag-scroll'

import { Stream, TournamentDay } from '@/features/tournament'

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

  const [streams, setStreams] = useState<Stream[]>([])

  useEffect(() => {
    setStreams(days[day].streams)
  }, [])

  const onExit = () => {
    setStreams(days[day].streams)
  }

  return (
    <div className="overflow-hidden">
      <CalendarGrid className="shadow-md mb-1" rows={1} cols={streams?.length} height={'2.2rem'}>
        <div></div>
        {streams?.map(stream => (
          <motion.div
            layout
            transition={{ type: 'spring', damping: 20 }}
            key={stream.id}
            className="flex items-center justify-center text-xs"
          >
            <a className="hover:underline" href={stream.link} target="_blank" rel="noreferrer">
              {t('event:stream', { name: stream.name })}
            </a>
          </motion.div>
        ))}
      </CalendarGrid>

      <ScrollContainer
        className={clsx('h-full lg:overflow-scroll scrollbar-hide', styles.calendar)}
      >
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
            <CalendarEvents
              events={days[day].events}
              timeslots={timeslots}
              streams={streams}
              onExit={onExit}
            />
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
