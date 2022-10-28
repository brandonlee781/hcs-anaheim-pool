import clsx from 'clsx'
import { addMinutes } from 'date-fns'

import { Card } from '@/components/Elements/Card'
import { HoverTeamContext } from '@/features/teams'
import { TournamentEvent } from '@/features/tournament'

import { formatOptionalMinutes } from '../../utils/formatOptionalMinutes'
import { parseTime } from '../ScheduleCalendar/ScheduleCalendar'
import { ScheduleMatch } from '../ScheduleMatch'

type CalendarEventsProps = {
  event: TournamentEvent
  offset: number
  length: number
}
export const ScheduleCalendarEvent = ({ event, offset, length }: CalendarEventsProps) => {
  const { team } = useContext(HoverTeamContext)
  return (
    <>
      {event.items.map((item, index) => {
        let colStart = 2
        if (index > 0) {
          colStart += index
        }

        const getTimeframe = (time: Date, start: boolean) => {
          if (start) {
            return formatOptionalMinutes(time, 'h:mm', 'h')
          }
          return formatOptionalMinutes(time, 'h:mmaaa', 'haaa')
        }

        const eventTime = parseTime(event.time)
        const startTime = getTimeframe(eventTime, true)
        const endTime = getTimeframe(addMinutes(eventTime, event.duration), false)
        if (!item.teams?.length && !item.text) return null
        return (
          <Card
            className={clsx(
              `row-start-${offset}`,
              `row-span-${length}`,
              `col-start-${colStart}`,
              `col-span-${item.span || 1}`,
              `m-1 !p-0 rounded-tl-none rounded-bl-none flex flex-row flex-nowrap`,
              item.textClass
            )}
            key={`${event.time}-${index}`}
          >
            <ScheduleMatch
              {...item}
              timeframe={`${startTime} - ${endTime}`}
              large={event.duration > 15}
              highlight={item.teams?.find(i => i.name === team?.name)}
            />
          </Card>
        )
      })}
    </>
  )
}
