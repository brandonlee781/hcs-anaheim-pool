import { format, parse } from 'date-fns'

import { ScheduleTableData } from '../ScheduleTableData'

type ScheduleTableTimeProps = {
  time: string
}
export const ScheduleTableTime = ({ time }: ScheduleTableTimeProps) => {
  const parsedTime = format(parse(time, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()), 'h:mmaaa')
  return (
    <ScheduleTableData>
      <div className="w-full h-full text-lg font-bold text-center md:text-sm md:font-normal">
        {parsedTime}
      </div>
    </ScheduleTableData>
  )
}

export const ScheduleMobileTime = ({ time }: ScheduleTableTimeProps) => {
  const parsedTime = format(parse(time, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()), 'h:mmaaa')
  return <div className="w-full p-4 text-lg font-bold md:text-sm md:font-normal">{parsedTime}</div>
}
