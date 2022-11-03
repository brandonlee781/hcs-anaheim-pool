import { format, parse } from 'date-fns'

import { ScheduleTableData } from '../ScheduleTableData'

type ScheduleTableTimeProps = {
  time: string
}
export const ScheduleTableTime = ({ time }: ScheduleTableTimeProps) => {
  const parsedTime = format(parse(time, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()), 'h:mmaaa')
  return (
    <ScheduleTableData>
      <span className="text-lg font-bold md:text-sm md:font-normal">{parsedTime}</span>
    </ScheduleTableData>
  )
}
