import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { Children, isValidElement } from 'react'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { ThemeContext } from '@/providers/ThemeProvider'

type DropdownMenuActivatorProps = {
  children?: React.ReactNode
  label?: string
  buttonClass?: string
  openFn?: () => any
}
const DropdownMenuActivator = ({
  children,
  openFn,
  label,
  buttonClass,
}: DropdownMenuActivatorProps) => {
  const ActivatorDefault = () => {
    return (
      <>
        <span>{label}</span>
        <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </>
    )
  }
  return (
    <button
      className={buttonClass}
      type="button"
      aria-haspopup="true"
      aria-expanded="true"
      onClick={openFn}
    >
      {children || <ActivatorDefault />}
    </button>
  )
}

type DropdownMenuProps = {
  children: React.ReactNode
  className?: string
  activator?: React.ReactElement
  width?: number
  open: boolean
  setOpen?: (val: boolean) => void
  onClickOutside?: () => void
}
export const DropdownMenu = ({
  children,
  width = 120,
  open,
  className,
  setOpen,
}: DropdownMenuProps) => {
  const { theme } = useContext(ThemeContext)

  const wrapperRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(wrapperRef, () => {
    if (setOpen) setOpen(false)
  })

  const activator = Children.toArray(children).find(child => {
    if (isValidElement(child)) {
      return (child.type as unknown as () => void).name === 'DropdownMenuActivator'
    }
  })
  let menu = Children.toArray(children).find(child => {
    if (isValidElement(child)) {
      return (child.type as unknown as () => void).name !== 'DropdownMenuActivator'
    }
  }) as React.ReactElement

  const ref = useRef<HTMLElement>(null)
  if (menu) {
    menu = React.cloneElement(menu, { ...menu.props, ref })
  }

  const variants = {
    open: { height: ref.current?.clientHeight },
    closed: { height: 0 },
  }

  return (
    <div ref={wrapperRef} className={`relative inline-block text-left dropdown ${className}`}>
      <span className="flex items-center justify-center">{activator}</span>
      <motion.div
        animate={open ? 'open' : 'closed'}
        variants={variants}
        className={clsx(
          `dropdown-menu`,
          'absolute right-0 mt-2 origin-top-right divide-y shadow-lg outline-none overflow-hidden',
          theme.tableDataStyle
        )}
        style={{
          width: width + 'px',
        }}
        data-open={open}
        // hidden={!open}
        role="menu"
      >
        {menu}
      </motion.div>
    </div>
  )
}

DropdownMenu.Activator = DropdownMenuActivator
