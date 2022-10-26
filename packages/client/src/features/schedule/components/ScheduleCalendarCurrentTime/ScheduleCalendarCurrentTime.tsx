import { differenceInMinutes, getHours, getMinutes, setMinutes } from 'date-fns'
import { setHours } from 'date-fns/esm'
import { RefObject } from 'react'

type CurrentTimeProps = {
  first: Date
  last: Date
  heightRef: RefObject<HTMLDivElement>
}
export const ScheduleCalendarCurrentTime = ({ first, last, heightRef }: CurrentTimeProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [dt, setDt] = useState(new Date())

  // get height of div
  // compare current time to first time
  // get difference and convert to pixels
  // move down as time goes on
  // only update if today = schedule date

  const firstTime = setMinutes(setHours(new Date(), getHours(first)), getMinutes(first))
  const lastTime = setMinutes(setHours(new Date(), getHours(last)), getMinutes(last))

  useEffect(() => {
    const MINUTE = 1000 * 60
    const secTimer = setInterval(() => {
      setDt(new Date())
    }, MINUTE)

    return () => clearInterval(secTimer)
  }, [])

  const [top, setTop] = useState(0)
  useEffect(() => {
    const height = heightRef.current?.clientHeight || 0
    const diff = differenceInMinutes(dt, firstTime)
    const total = differenceInMinutes(lastTime, firstTime)
    console.log(height)

    const minuteToPx = height / total
    const newTop = Math.max(0, Math.min(height, diff * minuteToPx))
    setTop(newTop)
  }, [dt, firstTime, lastTime, heightRef])

  return (
    <div ref={ref} className="absolute top-6 bottom-0 left-0 right-0 pointer-events-none">
      <div className="w-full h-full relative">
        <div
          className="absolute h-1 *themeGradient opacity-60 left-12 right-0"
          style={{ top }}
        ></div>
        <i
          className="absolute *themeGradient left-9 opacity-60 h-4 w-4"
          style={{
            top: top - 6.25,
            clipPath: 'polygon(100% 46%, 0 0, 0 100%)',
          }}
        ></i>
      </div>
    </div>
  )
}
