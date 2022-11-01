import { format, parse } from 'date-fns'

export const parseTime = (time: string) =>
  parse(
    format(parse(time, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()), 'HH:mm:ss'),
    'HH:mm:ss',
    new Date()
  )
