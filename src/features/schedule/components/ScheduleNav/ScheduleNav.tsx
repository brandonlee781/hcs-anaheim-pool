import { isBefore } from 'date-fns'
import { motion } from 'framer-motion'
import DarkMode from 'virtual:icons/mdi/theme-light-dark'

import { Card } from '@/components/Elements/Card'
import { LanguageMenu } from '@/components/Elements/LanguageMenu'
import { TournamentDay } from '@/features/tournament'
import { ThemeContext } from '@/providers/ThemeProvider'

import styles from './ScheduleNav.module.css'

type ScheduleNavProps = {
  days: TournamentDay[]
  current: number
  setDay: (num: number) => void
}

export const ScheduleNav = ({ days, current, setDay }: ScheduleNavProps) => {
  const { t, i18n } = useTranslation()

  const rowRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const { toggleDarkMode } = useContext(ThemeContext)

  const [sliderWidth, setSliderWidth] = useState(0)
  const [sliderX, setSliderX] = useState(8)

  const moveSlider = useCallback(
    (index: number) => {
      const newEl = linkRefs.current[index]

      if (newEl && rowRef.current) {
        const parentLeft = rowRef.current.getBoundingClientRect().left
        const newLeft = newEl.getBoundingClientRect().left - parentLeft
        setSliderX(newLeft)
      }
    },
    [linkRefs, rowRef]
  )

  const clickDay = (newIndex: number) => {
    setDay(newIndex)
    moveSlider(newIndex)
  }

  useEffect(() => {
    const el = linkRefs.current[current]
    const width = el ? el.clientWidth : 88
    setSliderWidth(width)
    moveSlider(current)
  }, [linkRefs, current, i18n.language, moveSlider])

  return (
    <Card className="h-12">
      <nav className="row-start-2 col-span-2 md:row-start-1 md:col-start-2 md:col-span-1 md:justify-self-center overflow-y-hidden">
        <div
          ref={rowRef}
          className="w-full flex flex-row items-start md:items-center overflow-x-scroll scrollbar-hide relative"
        >
          {days
            ?.sort((a, b) => {
              const aDate = new Date(a.date)
              const bDate = new Date(b.date)
              if (isBefore(aDate, bDate)) return -1
              if (isBefore(bDate, aDate)) return 1
              return 0
            })
            ?.map((d, index) => {
              return (
                <a
                  key={index}
                  ref={el => (linkRefs.current[index] = el || null)}
                  className={`cursor-pointer p-2 mx-2 whitespace-nowrap text-center rounded-md hover:opacity-80 ${
                    current === index ? 'active bg-red' : ''
                  }`}
                  role="button"
                  tabIndex={index}
                  onClick={() => clickDay(index)}
                  onKeyDown={() => clickDay(index)}
                >
                  {t(`days:${d.name}`)}
                </a>
              )
            })}
          <motion.div
            initial={{ x: 8 }}
            animate={{ x: sliderX, transition: { duration: 0.3 } }}
            className={`${styles.slider} h-1 rounded-sm absolute bottom-0 themeGradient !bg-gradient-to-r`}
            style={{
              width: sliderWidth + 'px',
            }}
          ></motion.div>
        </div>
      </nav>
      <div className="controls z-50 fixed top-4 right-8 md:relative md:top-0 md:right-0 flex flex-nowrap justify-end items-center">
        <button
          className="md:top-0 md:right-0 cursor-pointer w-4 h-4"
          onClick={() => toggleDarkMode()}
          onKeyDown={() => toggleDarkMode()}
        >
          <DarkMode />
        </button>
        <LanguageMenu />
      </div>
    </Card>
  )
}
