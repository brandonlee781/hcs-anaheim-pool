import { Reducer } from 'react'

import { Team } from '@/features/teams'

type HoverTeamContextData = {
  team: Team | null
  clicked: boolean
  setTeam: (team: Team | null, wasClicked?: boolean) => void
}
export const HoverTeamContext = createContext<HoverTeamContextData>({
  clicked: false,
  team: null,
  setTeam: () => {},
})

const actionTypes = {
  hover: 'HOVER',
  clickNoTeam: 'CLICK_NO_TEAM',
  clickDiffTeam: 'CLICK_DIFF_TEAM',
  clickSameTeam: 'CLICK_SAME_TEAM',
  reset: 'RESET',
  keepSame: 'KEEP_SAME_TEAM',
}

type ReducerState = { team: Team | null; clicked: boolean }
type Payload = {
  type: string
  payload: Team | null
}
function hoverTeamReducer(state: ReducerState, action: Payload) {
  switch (action.type) {
    case actionTypes.hover: {
      return { ...state, team: action.payload, clicked: false }
    }
    case actionTypes.clickNoTeam: {
      return { ...state, team: action.payload, clicked: true }
    }
    case actionTypes.clickDiffTeam: {
      return { ...state, team: action.payload, clicked: true }
    }
    case actionTypes.clickSameTeam: {
      return { ...state, clicked: false }
    }
    case actionTypes.keepSame: {
      return { ...state, clicked: true }
    }
    default:
      throw new Error()
  }
}

type HoverTeamProviderProps = {
  children: React.ReactNode
}
export const HoverTeamProvider = ({ children }: HoverTeamProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<ReducerState, Payload>>(hoverTeamReducer, {
    team: null,
    clicked: false,
  })

  const setTeam = (t: Team | null, wasClicked = false) => {
    if (wasClicked) {
      if (!state.clicked && t && t.id === state.team?.id) {
        dispatch({
          type: actionTypes.keepSame,
          payload: t,
        })
        return
      }
      if (!state.team) {
        dispatch({
          type: actionTypes.clickNoTeam,
          payload: t,
        })
        return
      }
      if (t && t.id !== state.team?.id) {
        dispatch({
          type: actionTypes.clickDiffTeam,
          payload: t,
        })
        return
      }
      if (t && t.id === state.team?.id) {
        dispatch({
          type: actionTypes.clickSameTeam,
          payload: t,
        })
        return
      }
    } else {
      if (!state.clicked) {
        dispatch({
          type: actionTypes.hover,
          payload: t,
        })
        return
      }
    }

    // if (!state.clicked && !wasClicked && t?.id !== state.team?.id) {

    //   return
    // }
    // if (!state.clicked && wasClicked && t && t.id === state.team?.id) {
    //   dispatch({
    //     type: actionTypes.keepSame,
    //     payload: t,
    //   })
    //   return
    // }
  }
  return (
    <HoverTeamContext.Provider value={{ ...state, setTeam }}>{children}</HoverTeamContext.Provider>
  )
}
