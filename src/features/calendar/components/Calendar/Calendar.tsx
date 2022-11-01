import clsx from 'clsx'
import ScrollContainer from 'react-indiana-drag-scroll'

import { Stream, TournamentDay } from '@/features/tournament'

import { CalendarGridProvider } from '../../providers/CalendarGridProvider'
import { CalendarBackgroundGrid } from '../CalendarBackgroundGrid'
import { CalendarCurrentTime } from '../CalendarCurrentTime'
import { CalendarEvents } from '../CalendarEvents'
import { CalendarStreamLinks } from '../CalendarStreamLinks'

import styles from './Calendar.module.scss'

// 90 minutes dividied by the increment

type CalendarProps = {
  days: TournamentDay[]
  day: number
}

export const Calendar = ({ days, day }: CalendarProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [streams, setStreams] = useState<Stream[]>([])

  useEffect(() => {
    setStreams(days[day].streams)
  }, [day])

  return (
    <CalendarGridProvider days={days} columns={12}>
      <div className="overflow-hidden">
        <CalendarStreamLinks streams={streams} />

        <ScrollContainer
          className={clsx('h-full w-full relative pt-4 lg:overflow-y-scroll', styles.calendar)}
        >
          <CalendarBackgroundGrid ref={ref} streams={streams} />

          <CalendarEvents events={days[day].events} streams={streams} />

          <CalendarCurrentTime displayDay={days[day]} heightRef={ref} />
        </ScrollContainer>
      </div>
    </CalendarGridProvider>
  )
}
