import clsx from 'clsx'

const GRID_ITEM_HEIGHT = '2.4rem'

type CalendarGridProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  rows: number
  cols?: number
  height?: string
  leadingWidth?: string
}
export const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  ({ className, children, rows = 1, cols = 1, height, leadingWidth = '3rem' }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('grid w-full min-w-[800px] lg:min-w-full', className)}
        style={{
          gridTemplateRows: `repeat(${rows}, ${height || GRID_ITEM_HEIGHT})`,
          gridTemplateColumns: `${leadingWidth} repeat(${cols}, 1fr)`,
        }}
      >
        {children}
      </div>
    )
  }
)

CalendarGrid.displayName = 'CalendarGrid'
