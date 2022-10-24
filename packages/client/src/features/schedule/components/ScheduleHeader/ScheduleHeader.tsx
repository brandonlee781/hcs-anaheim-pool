import { TournamentDay } from 'api-server/src/features/Tournament'
import { useSpring, animated } from 'react-spring'
import DarkMode from 'virtual:icons/mdi/theme-light-dark'

import { LanguageMenu } from '@/components/Elements/LanguageMenu'
import { Team } from '@/features/teams'
import { useTournament } from '@/features/tournament'
import { ThemeContext } from '@/providers/ThemeProvider'

import styles from './ScheduleHeader.module.css'

type ScheduleHeaderProps = {
  days: TournamentDay<Team>[]
}

export const ScheduleHeader = ({ days }: ScheduleHeaderProps) => {
  const { t, i18n } = useTranslation()

  const rowRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const { theme, toggleDarkMode } = useContext(ThemeContext)
  const { tournament, day, setDay } = useTournament()

  const [springs, api] = useSpring(() => ({ from: { x: 8 } }))
  const [sliderWidth, setSliderWidth] = useState(0)

  useEffect(() => {
    const el = linkRefs.current[day]
    const width = el ? el.clientWidth : 88
    setSliderWidth(width)
  }, [tournament, linkRefs, day, i18n.language])

  const clickDay = (newIndex: number) => {
    setDay(newIndex)

    const oldEl = linkRefs.current[day]
    const newEl = linkRefs.current[newIndex]

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
  }

  return (
    <div
      className={`header-bar py-2 px-4 h-12 w-full flex flex-row flex-nowrap items-center justify-between rounded-md ${theme.cardStyle} ${theme.tableHeadStyle}`}
    >
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
                className={`cursor-pointer p-2 mx-2 whitespace-nowrap text-center rounded-md ${
                  theme.buttonStyle
                } ${day === index ? 'active bg-red' : ''}`}
                role="button"
                tabIndex={index}
                onClick={() => clickDay(index)}
                onKeyDown={() => clickDay(index)}
              >
                {t(`days:${d.id}`)}
              </a>
            )
          })}
          <animated.div
            className={`${styles.slider} h-1 rounded-sm absolute bg-purple-600 bottom-0`}
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
    </div>
  )
}
