import { Session, User } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'

type AuthContext = {
  user: User | null
  session: Session | null
}
export const AuthContext = createContext<AuthContext>({ user: null, session: null })

type AuthProviderProps = {
  children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSession(data.session)
        setUser(data.session.user)
      }
    })

    supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession) {
        setSession(newSession)
        setUser(newSession.user)
      }
    })
  }, [])

  return <AuthContext.Provider value={{ user, session }}>{children}</AuthContext.Provider>
}
