import clsx from 'clsx'
import { addMinutes } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'

import { Stream, TournamentEvent, useTournament } from '@/features/tournament'

import { getPosition, INCREMENT, parseTime } from '../Calendar/Calendar'
import { CalendarEvent } from '../CalendarEvent'

type Direction = 'right' | 'left'

type VariantData = {
  direction: Direction
  index: number
}
const variants = {
  enter: ({ direction, index }: VariantData) => {
    return {
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0,
      transition: { type: 'spring', delay: index * 0.04 },
    }
  },
  center: ({ index }: VariantData) => {
    return { x: 0, opacity: 1, transition: { type: 'spring', delay: index * 0.04 } }
  },
  exit: ({ direction }: VariantData) => {
    return {
      x: direction === 'left' ? '100%' : '-100%',
      opacity: 0,
      transition: { type: 'spring' },
    }
  },
}

type CalendarEventsProps = {
  events: TournamentEvent[]
  streams: Stream[]
  timeslots: Date[]
}
export const CalendarEvents = ({ events, streams, timeslots }: CalendarEventsProps) => {
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
    <AnimatePresence initial={false} mode="popLayout" custom={{ direction, index: 0 }}>
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
            custom={{ direction, index }}
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
