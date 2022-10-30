const DAY_KEY = 'hsc-day-val'

type TournamentDayContextData = {
  day: number
  previousDay: number
  setDay: (val: number) => void
}

export const TournamentDayContext = createContext<TournamentDayContextData>({
  day: 0,
  previousDay: 0,
  setDay: () => {},
})
type TournamentDayProviderProps = {
  children: React.ReactNode
}
export const TournamentDayProvider = ({ children }: TournamentDayProviderProps) => {
  const [day, setDay] = useState(parseInt(localStorage.getItem(DAY_KEY) || '0'))
  const [previousDay, setPreviousDay] = useState(0)

  const setDayVal = (d: number) => {
    setPreviousDay(day)
    setDay(d)
  }

  useEffect(() => {
    localStorage.setItem(DAY_KEY, day.toString())
  }, [day])

  return (
    <TournamentDayContext.Provider value={{ day, previousDay, setDay: setDayVal }}>
      {children}
    </TournamentDayContext.Provider>
  )
}
