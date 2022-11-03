/* eslint-disable prettier/prettier */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import { Card } from '@/components/Elements/Card'
import { Stream, TournamentEvent } from '@/features/tournament'

import { useTimeslots } from '../../hooks/useTimeslots'
import { parseTime } from '../../utils/parseTime'
import { CalendarEvent } from '../CalendarEvent'
import { CalendarGrid } from '../CalendarGrid'

import AlertIcon from '~icons/mdi/alert-box-outline'

type VariantData = {
  column: number
  row: number
  count: number
}
const ANIMATION_DELAY = 0.6
const variants = {
  enter: ({ column, row, count }: VariantData) => {
    let delay = (column + row + 1) * (ANIMATION_DELAY / count)
    if (column < 0 || row < 0) {
      delay = 0
    }
    return {
      opacity: 0,
      transition: { type: 'spring', delay },
    }
  },
  center: ({ column, row, count }: VariantData) => {
    let delay = (column + row + 1) * (ANIMATION_DELAY / count)
    if (column < 0 || row < 0) {
      delay = 0
    }
    return {
      opacity: 1,
      transition: { type: 'spring', delay },
    }
  },
  exit: {
    opacity: 0,
  }
}

type CalendarEventsProps = {
  events: TournamentEvent[]
  streams: Stream[]
  onExit?: () => void
}
export const CalendarEvents = ({ events, streams }: CalendarEventsProps) => {
  const { t } = useTranslation()
  const { rows, columns, getPosition, gridPosition } = useTimeslots()
  const sortedEvents = events.sort((a, b) => {
    const val = parseTime(a.time).getTime() - parseTime(b.time).getTime()

    if (val > 0) return 1
    if (val < 0) return -1
    const aStreamIdx = streams.findIndex(s => s.id === a.streams?.[0])
    const bStreamIdx = streams.findIndex(s => s.id === b.streams?.[0])
    return aStreamIdx - bStreamIdx
  })

  if (!sortedEvents.length) {
    const gridRow = `2 / span ${rows / 4}`
    const gridColumn = `${(columns / 3) + 1} / span ${(columns / 2)}`

    return (
      <CalendarGrid
        rows={rows}
        cols={columns}
        className={clsx(gridPosition)}
      >
        <Card className="max-w-100 mx-auto" style={{ gridRow, gridColumn }}>
          <AlertIcon className="h-20 w-20 text-yellow-400" />
          { t('table:no-data') }
        </Card>
      </CalendarGrid>
    )
  }

  return (
    <CalendarGrid
      rows={rows}
      cols={columns}
      className={clsx('calendar-events', gridPosition)}
    >
      <AnimatePresence mode="wait">
        {sortedEvents.map((event) => {
          if (!event) return
          const {
            rowStart,
            rowSpan,
            colStart,
            colSpan
          } = getPosition(event, streams)

          return (
            <motion.div
              key={event.id}
              className={clsx('m-1')}
              style={{
                gridRow: `${rowStart} / span ${rowSpan}`,
                gridColumn: `${colStart} / span ${colSpan}`
              }}
              custom={{ column: colStart-colSpan-1, row: (rowStart-rowSpan) / rowSpan, count: sortedEvents.length }}
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

    </CalendarGrid>
  )
}
