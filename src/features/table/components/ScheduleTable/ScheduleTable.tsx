import { isBefore } from 'date-fns'
import _ from 'lodash'
import { useWindowSize } from 'react-use'

import { Table, Header } from '@/components/Elements/Table'
import { parseTime } from '@/features/calendar'
import type { TournamentDay } from '@/features/tournament'

import { ScheduleTableEvent, ScheduleMobileEvent } from '../ScheduleTableEvent'
import { ScheduleMobileTime, ScheduleTableTime } from '../ScheduleTableTime'

type ScheduleTableProps = {
  days: TournamentDay[]
  day: number
}
export const ScheduleTable = ({ days, day }: ScheduleTableProps) => {
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  const streams = days[day].streams
  const events = days[day].events

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [width])

  const headers: Header[] = streams.map(stream => ({
    text: stream.name || '',
    link: stream.link || '',
  }))
  headers.unshift({ text: 'timeslot' })

  const timeslots = Array.from(new Set(events?.map(ev => ev.time)))

  const rows = timeslots
    .map(time => {
      const rowEvents = events
        ?.filter(ev => ev.time === time)
        .map(ev => {
          const matchingStreams = streams.filter(s => ev.streams?.includes(s.id || ''))
          return {
            ...ev,
            span: matchingStreams.length,
          }
        })
      return {
        time,
        events: rowEvents,
      }
    })
    .sort((a, b) => {
      const aTime = parseTime(a.time)
      const bTime = parseTime(b.time)
      if (isBefore(aTime, bTime)) return -1
      if (!isBefore(aTime, bTime)) return 1
      return 0
    })

  if (isMobile) {
    return (
      <div className="mt-4">
        {rows.map(({ time, events: evs }, index) => {
          return (
            <div
              key={index}
              className="border-b-2 border-t mb-2 bg-slate-200 dark:bg-gray-900 border-slate-800 dark:border-gray-50 divide-y"
            >
              <ScheduleMobileTime time={time} />
              {evs?.map(event => (
                <ScheduleMobileEvent key={event.id} event={event} />
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Table headers={headers} className="mt-2">
      {rows.map(({ time, events: evs }, index) => {
        return (
          <Table.TableRow key={index}>
            <ScheduleTableTime time={time} />
            {streams.map(stream => {
              const streamEvent = evs?.find(e => e.streams?.[0] === stream.id)
              if (streamEvent) {
                return <ScheduleTableEvent key={streamEvent.id} event={streamEvent} />
              }
            })}
          </Table.TableRow>
        )
      })}
    </Table>
  )
}
