const timeZoneName = 'longOffset' as const

const getOffset = (timeZone = 'UTC') => {
  const options: Intl.DateTimeFormatOptions = { timeZone, timeZoneName }
  const dateText = Intl.DateTimeFormat([], options).format(new Date())

  // Scraping the numbers we want from the text
  // The default value '+0' is needed when the timezone is missing the number part.
  // Ex. Africa/Bamako --> GMT
  const timezoneString = dateText.split(' ')[1].slice(3) || '+0'

  return timezoneString
}

export default function getTime(timezone: string) {
  const offset = getOffset(timezone)
  return (date: string, time: string) => `${date}T${time}:00${offset}`
}
