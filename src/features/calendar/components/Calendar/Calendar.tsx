import clsx from 'clsx'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'

import { Stream, TournamentDay } from '@/features/tournament'

import { CalendarGridProvider } from '../../providers/CalendarGridProvider'
import { CalendarBackgroundGrid } from '../CalendarBackgroundGrid'
// import { CalendarCurrentTime } from '../CalendarCurrentTime'
import { CalendarEvents } from '../CalendarEvents'
import { CalendarStreamLinks } from '../CalendarStreamLinks'

import styles from './Calendar.module.css'

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
      <div className="w-screen pr-16 lg:w-full lg:pr-0">
        <CalendarStreamLinks className="hidden lg:grid" streams={streams} />

        <ScrollContainer
          className={clsx('h-full w-full relative pt-4 hide-scrollbar', styles.calendar)}
        >
          <CalendarStreamLinks className="lg:hidden h-7" streams={streams} />
          <CalendarBackgroundGrid ref={ref} streams={streams} />

          <CalendarEvents events={days[day].events} streams={streams} />

          {/* <CalendarCurrentTime displayDay={days[day]} heightRef={ref} /> */}
        </ScrollContainer>
      </div>
    </CalendarGridProvider>
  )
}
