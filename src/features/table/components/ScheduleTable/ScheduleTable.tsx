import { isBefore } from 'date-fns'

import { Table, Header } from '@/components/Elements/Table'
import { parseTime } from '@/features/calendar'
import type { TournamentDay } from '@/features/tournament'

import { ScheduleTableEvent } from '../ScheduleTableEvent'
import { ScheduleTableTime } from '../ScheduleTableTime'

type ScheduleTableProps = {
  days: TournamentDay[]
  day: number
}
export const ScheduleTable = ({ days, day }: ScheduleTableProps) => {
  const streams = days[day].streams
  const events = days[day].events

  const headers: Header[] = streams.map(stream => ({
    text: stream.name || '',
    link: stream.link || '',
  }))
  headers.unshift({ text: 'timeslot' })

  const timeslots = Array.from(new Set(events.map(ev => ev.time)))

  const rows = timeslots
    .map(time => {
      const rowEvents = events
        .filter(ev => ev.time === time)

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

  return (
    <Table headers={headers} className="mt-2">
      {rows.map(({ time, events: evs }, index) => {
        return (
          <Table.TableRow key={index}>
            <ScheduleTableTime time={time} />
            {evs.map(ev => (
              <ScheduleTableEvent key={ev.id} event={ev} />
            ))}
          </Table.TableRow>
        )
      })}
    </Table>
  )
}
