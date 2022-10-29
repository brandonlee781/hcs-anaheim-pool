import clsx from 'clsx'
import { addMinutes } from 'date-fns'

import { Card } from '@/components/Elements/Card'
import { HoverTeamContext } from '@/features/teams'
import { TournamentEvent } from '@/features/tournament'

import { formatOptionalMinutes } from '../../utils/formatOptionalMinutes'
import { parseTime } from '../Calendar/Calendar'
import { CalendarMatch } from '../CalendarMatch'

type CalendarEventsProps = {
  event: TournamentEvent
}
export const CalendarEvent = ({ event }: CalendarEventsProps) => {
  const { team } = useContext(HoverTeamContext)
  const getTimeframe = (time: Date, start: boolean) => {
    if (start) {
      return formatOptionalMinutes(time, 'h:mm', 'h')
    }
    return formatOptionalMinutes(time, 'h:mmaaa', 'haaa')
  }

  const eventTime = parseTime(event.time)
  const startTime = getTimeframe(eventTime, true)
  const endTime = getTimeframe(addMinutes(eventTime, event.duration), false)

  return (
    <Card
      className={clsx(
        `!p-0 rounded-tl-none rounded-bl-none flex flex-row flex-nowrap h-full w-full`,
        event.data.textClass
      )}
    >
      <CalendarMatch
        {...event.data}
        timeframe={`${startTime} - ${endTime}`}
        large={event.duration > 15}
        highlight={event.data.teams?.find(i => i.name === team?.name)}
      />
    </Card>
  )
}
