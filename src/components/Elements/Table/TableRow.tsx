import clsx from 'clsx'

import styles from './Table.module.css'

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className }, ref) => {
    return (
      <tr ref={ref} className={clsx(styles.tableRow, className)}>
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'
