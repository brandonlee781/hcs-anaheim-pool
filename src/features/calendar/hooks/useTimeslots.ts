import { differenceInMinutes } from 'date-fns'

import { Stream, TournamentEvent } from '@/features/tournament'

import { CalendarGridContext } from '../providers/CalendarGridProvider'
import { parseTime } from '../utils/parseTime'

export const INCREMENT = 30
export const DEFAULT_ITEM_LENGTH = 90 / INCREMENT

const getRow = (timeStart: Date, duration: number, startDate: Date) => {
  const rowStart = differenceInMinutes(timeStart, startDate) / INCREMENT
  const rowSpan = duration / INCREMENT
  return {
    rowStart: Math.floor(rowStart + 1), // rows are 1 indexed
    rowSpan: Math.ceil(Math.abs(rowSpan)),
  }
}

const getPosition = (
  event: TournamentEvent,
  columns: number,
  streams: Stream[],
  startDate: Date
) => {
  // All times are in 15 minute increments
  // Get the offset from the beginning of the days events
  // And get the length of the event until the next event
  const { rowStart, rowSpan } = getRow(parseTime(event.time), event.duration, startDate)

  const streamWidth = columns / streams.length
  const colIdx = streams.findIndex(st => event.streams?.includes(st.id))
  let colStart = 2 // first column is for the time

  if (colIdx > 0) {
    colStart += colIdx * streamWidth
  }

  return {
    rowStart,
    rowSpan,
    colStart,
    colSpan: (event.streams?.length || 1) * streamWidth,
  }
}

export function useTimeslots() {
  const { hours, columns, gridPosition } = useContext(CalendarGridContext)

  const rows = Math.abs(differenceInMinutes(hours[0], hours[hours.length - 1]) / INCREMENT)

  // const uniqueStreams = _.uniqBy(
  //   days.map(d => d.streams).reduce((a, b) => a.concat(b), []),
  //   'id'
  // )

  return {
    timeslots: hours,
    rows,
    columns,
    getPosition: (event: TournamentEvent, streams: Stream[]) =>
      getPosition(event, columns, streams, hours[0]),
    getRow: (timeStart: Date, duration: number) => getRow(timeStart, duration, hours[0]),
    gridPosition,
  }
}
