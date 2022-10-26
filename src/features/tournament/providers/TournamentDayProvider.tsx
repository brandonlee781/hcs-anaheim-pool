import { Dispatch, SetStateAction } from 'react'

const DAY_KEY = 'hsc-day-val'

type TournamentDayContextData = {
  day: number
  setDay: Dispatch<SetStateAction<number>>
}

export const TournamentDayContext = createContext<TournamentDayContextData>({
  day: 0,
  setDay: () => {},
})
type TournamentDayProviderProps = {
  children: React.ReactNode
}
export const TournamentDayProvider = ({ children }: TournamentDayProviderProps) => {
  const [day, setDay] = useState(parseInt(localStorage.getItem(DAY_KEY) || '0'))

  useEffect(() => {
    localStorage.setItem(DAY_KEY, day.toString())
  }, [day])

  return (
    <TournamentDayContext.Provider value={{ day, setDay }}>
      {children}
    </TournamentDayContext.Provider>
  )
}
