import clsx from 'clsx'
import { addMinutes } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'

import { Stream, TournamentEvent, useTournament } from '@/features/tournament'

import { getPosition, INCREMENT, parseTime } from '../Calendar/Calendar'
import { CalendarEvent } from '../CalendarEvent'

type Direction = 'right' | 'left'

const variants = {
  enter: (direction: Direction) => {
    return {
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0,
    }
  },
  center: { x: 0, opacity: 1 },
  exit: (direction: Direction) => {
    return {
      x: direction === 'left' ? '100%' : '-100%',
      opacity: 0,
    }
  },
}

type CalendarEventsProps = {
  events: TournamentEvent[]
  streams: Stream[]
  timeslots: Date[]
  onExit: () => void
}
export const CalendarEvents = ({ events, streams, timeslots, onExit }: CalendarEventsProps) => {
  const { day, previousDay } = useTournament()
  const sortedEvents = events.sort((a, b) => {
    const val = parseTime(a.time).getTime() - parseTime(b.time).getTime()

    if (val > 0) return 1
    if (val < 0) return -1
    const aStreamIdx = streams.findIndex(s => s.id === a.streams?.[0])
    const bStreamIdx = streams.findIndex(s => s.id === b.streams?.[0])
    return aStreamIdx - bStreamIdx
  })

  const direction = day > previousDay ? 'left' : 'right'
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={onExit} custom={direction}>
      {sortedEvents.map((event, index) => {
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
          <motion.div
            key={event.id}
            className={clsx(
              'm-1',
              `row-start-${row}`,
              `row-span-${rowSpan}`,
              `col-start-${col}`,
              `col-span-${colSpan}`
            )}
            custom={direction}
            transition={{ type: 'spring', delay: index * 0.04 }}
            variants={variants}
            initial={'enter'}
            animate={'center'}
            exit={'exit'}
          >
            <CalendarEvent event={event} />
          </motion.div>
        )
      })}
    </AnimatePresence>
  )
}
