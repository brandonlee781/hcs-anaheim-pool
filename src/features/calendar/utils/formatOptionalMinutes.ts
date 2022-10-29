import { differenceInMinutes, format, startOfHour } from 'date-fns'

export const formatOptionalMinutes = (time: Date, withMinutes = 'h:mm', withoutMinutes = 'h') => {
  const hasMinutes = differenceInMinutes(time, startOfHour(time)) !== 0
  if (hasMinutes && !withMinutes.length) return ''
  return format(time, hasMinutes ? withMinutes : withoutMinutes)
}
