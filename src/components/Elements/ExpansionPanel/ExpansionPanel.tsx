/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import Chevron from '~icons/mdi/chevron-down'

const ExpansionPanelTitle = ({
  title,
  open,
  onClick,
}: {
  title: string
  open: boolean
  onClick: () => void
}) => (
  <div
    role="button"
    tabIndex={0}
    className="flex w-full border-b border-gray-200"
    onClick={onClick}
  >
    <div className="p-1 px-3 appearance-none outline-none w-full text-gray-800 dark:text-gray-50 bg-transparent">
      {title}
    </div>
    <div className="w-8 border-l flex items-center justify-center border-gray-200 text-gray-600 dark:text-gray-50 outline-none focus:outline-none ml-auto">
      <Chevron className={clsx('tansition duration-200', open && 'transform -rotate-180')} />
    </div>
  </div>
)

type ExpansionPanelProps = {
  title: string
  children: React.ReactNode
}
export const ExpansionPanel = ({ title, children }: ExpansionPanelProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="max-w-full">
      <div className="my-2 bg-gray-50 dark:bg-gray-700 flex flex-col border border-gray-200 rounded">
        <ExpansionPanelTitle title={title} open={open} onClick={() => setOpen(!open)} />
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
