import clsx from 'clsx'

import { ThemeContext } from '@/providers/ThemeProvider'

type CardProps = React.HTMLAttributes<HTMLDivElement>
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, style, onClick, onKeyDown }, ref) => {
    const { theme } = useContext(ThemeContext)
    return (
      <div
        role={onClick ? 'button' : 'article'}
        ref={ref}
        className={clsx(
          'py-2 px-4',
          'flex flex-row flex-nowrap items-center justify-between',
          'rounded-md',
          className,
          theme.cardStyle
        )}
        style={style}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
