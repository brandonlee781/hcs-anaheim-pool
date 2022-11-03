import clsx from 'clsx'

export type TableHeaderProps = React.HTMLAttributes<HTMLTableCellElement> & {
  span: number
}
export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ span, children }, ref) => {
    return (
      <th
        ref={ref}
        scope="col"
        className={clsx('text-left text-xs font-medium uppercase tracking-wider lg:text-center')}
        colSpan={span}
      >
        {children}
      </th>
    )
  }
)

TableHeader.displayName = 'TableHeader'
