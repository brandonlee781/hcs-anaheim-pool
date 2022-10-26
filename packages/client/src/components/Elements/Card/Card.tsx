import clsx from 'clsx'

import { ThemeContext } from '@/providers/ThemeProvider'

type CardProps = React.HTMLAttributes<HTMLDivElement>
export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className }, ref) => {
  const { theme } = useContext(ThemeContext)
  return (
    <div
      ref={ref}
      className={clsx(
        className,
        'py-2 px-4',
        'flex flex-row flex-nowrap items-center justify-between',
        'rounded-md',
        theme.cardStyle
      )}
    >
      {children}
    </div>
  )
})
