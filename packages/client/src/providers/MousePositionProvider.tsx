import useMousePosition from '@/hooks/useMousePosition'

export const MousePositionContext = createContext({ x: 0, y: 0 })

type MousePositionProps = {
  children: React.ReactNode
}

export const MousePositionProvider = ({ children }: MousePositionProps) => {
  const { x, y } = useMousePosition()

  return <MousePositionContext.Provider value={{ x, y }}>{children}</MousePositionContext.Provider>
}
