import { Team } from '@/features/teams'

let timeout: NodeJS.Timeout

type HoverTeamContextData = {
  team: Team | null
  setTeam: (team: Team | null) => void
}
export const HoverTeamContext = createContext<HoverTeamContextData>({
  team: null,
  setTeam: () => {},
})

type HoverTeamProviderProps = {
  children: React.ReactNode
}
export const HoverTeamProvider = ({ children }: HoverTeamProviderProps) => {
  const [team, setTeamVal] = useState<Team | null>(null)
  const setTeam = (t: Team | null) => {
    setTeamVal(null)

    if (!t && timeout) {
      clearTimeout(timeout)
    }

    if (t && t.name !== team?.name) {
      timeout = setTimeout(() => {
        setTeamVal(t)
      }, 100)
    }
  }
  return <HoverTeamContext.Provider value={{ team, setTeam }}>{children}</HoverTeamContext.Provider>
}
