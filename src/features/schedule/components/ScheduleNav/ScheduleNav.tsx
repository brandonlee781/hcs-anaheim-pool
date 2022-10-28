import { useSpring, animated } from 'react-spring'
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

  const [springs, api] = useSpring(() => ({ from: { x: 8 } }))
  const [sliderWidth, setSliderWidth] = useState(0)

  const moveSlider = useCallback(
    (index: number) => {
      const oldEl = linkRefs.current[current]
      const newEl = linkRefs.current[index]

      if (oldEl && newEl && rowRef.current) {
        const parentLeft = rowRef.current.getBoundingClientRect().left
        const oldLeft = oldEl.getBoundingClientRect().left - parentLeft
        const newLeft = newEl.getBoundingClientRect().left - parentLeft

        api.start({
          config: {
            friction: 20,
            tension: 210,
            clamp: true,
          },
          from: {
            x: oldLeft,
          },
          to: {
            x: newLeft,
          },
        })
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
      <nav className="row-start-2 col-span-2 md:(row-start-1 col-start-2 col-span-1 justify-self-center) overflow-y-hidden">
        <div
          ref={rowRef}
          className="w-full flex flex-row items-start md:(items-center) overflow-y-scroll scrollbar-hide relative"
        >
          {days?.map((d, index) => {
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
          <animated.div
            className={`${styles.slider} h-1 rounded-sm absolute bottom-0 *themeGradient !bg-gradient-to-r`}
            style={{
              width: sliderWidth + 'px',
              ...springs,
            }}
          ></animated.div>
        </div>
      </nav>
      <div className="controls flex flex-nowrap justify-end items-center">
        <button
          className="cursor-pointer w-4 h-4"
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
