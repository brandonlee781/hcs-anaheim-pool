import { defaultStyle } from '@/assets/styles'

export const DARK_MODE_KEY = 'hcs-tourney-dark-mode'
export const STYLE_KEY = 'hcs-tourney-style'

type Theme = typeof defaultStyle
type ThemeContextData = {
  dark: boolean
  toggleDarkMode: () => void
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextData>({
  dark: true,
  toggleDarkMode: () => {},
  theme: defaultStyle,
  setTheme: () => {},
})

type ThemeProviderProps = {
  children: React.ReactNode
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(
    window.localStorage.getItem(DARK_MODE_KEY) === '1' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    window.localStorage.getItem(STYLE_KEY)
      ? JSON.parse(window.localStorage.getItem(STYLE_KEY) || '')
      : defaultStyle
  )

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STYLE_KEY)
    if (JSON.stringify(currentTheme) !== storedTheme) {
      window.localStorage.setItem(STYLE_KEY, JSON.stringify(currentTheme))
    }
    document.body.className = currentTheme.bodyStyle
  }, [currentTheme])
  useEffect(() => {
    window.localStorage.setItem(DARK_MODE_KEY, darkMode ? '1' : '0')
    document.documentElement.className = darkMode ? 'dark' : 'light'
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider
      value={{
        dark: darkMode,
        toggleDarkMode,
        theme: currentTheme,
        setTheme: setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
