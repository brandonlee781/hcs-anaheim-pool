import clsx from 'clsx'

const GRID_ITEM_HEIGHT = '2.4rem'

type CalendarGridProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  rows: number
  cols?: number
  height?: string
}
export const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  ({ className, children, rows = 1, cols = 1, height }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('grid', className)}
        style={{
          gridTemplateRows: `repeat(${rows}, ${height || GRID_ITEM_HEIGHT})`,
          gridTemplateColumns: `3rem repeat(${cols}, 1fr)`,
        }}
      >
        {children}
      </div>
    )
  }
)
