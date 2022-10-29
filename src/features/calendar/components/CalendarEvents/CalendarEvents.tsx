import clsx from 'clsx'
import { addMinutes } from 'date-fns'
import { useSprings, animated } from 'react-spring'

import { Stream, TournamentEvent } from '@/features/tournament'

import { getPosition, INCREMENT, parseTime } from '../Calendar/Calendar'
import { CalendarEvent } from '../CalendarEvent'

type CalendarEventsProps = {
  events: TournamentEvent[]
  streams: Stream[]
  timeslots: Date[]
  config: { to?: { x: number }; from?: { x: number } }
}
export const CalendarEvents = ({ events, streams, timeslots, config }: CalendarEventsProps) => {
  const [springs] = useSprings(
    events.length,
    index => ({
      ...config,
      delay: 70 * index,
    }),
    [events, config]
  )

  return (
    <>
      {springs.map((props, index) => {
        const event = events[index]
        if (!event) return
        const start = parseTime(event.time)
        const end = addMinutes(start, Math.max(event.duration, INCREMENT))
        const { offset: row, length: rowSpan } = getPosition(start, end, timeslots[0])
        const colIdx = streams.findIndex(st => event.streams?.includes(st.id))
        let col = 2
        if (colIdx > 0) {
          col += colIdx
        }
        const colSpan = event.streams?.length || 1

        return (
          <animated.div
            key={event.id}
            className={clsx(
              'm-1',
              `row-start-${row}`,
              `row-span-${rowSpan}`,
              `col-start-${col}`,
              `col-span-${colSpan}`
            )}
            style={props}
          >
            <CalendarEvent event={event} />
          </animated.div>
        )
      })}
    </>
  )
}
