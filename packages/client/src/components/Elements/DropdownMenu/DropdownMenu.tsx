import { Children, isValidElement } from 'react'

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
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
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
  menuRef: React.MutableRefObject<any>
}
export const DropdownMenu = ({
  children,
  width = 120,
  open,
  className,
  menuRef,
}: DropdownMenuProps) => {
  const { theme } = useContext(ThemeContext)

  const activator = Children.toArray(children).find(child => {
    if (isValidElement(child)) {
      return (
        (child.type as unknown as () => void).name === 'DropdownMenuActivator'
      )
    }
  })
  const menu = Children.toArray(children).find(child => {
    if (isValidElement(child)) {
      return (
        (child.type as unknown as () => void).name !== 'DropdownMenuActivator'
      )
    }
  })

  return (
    <div
      ref={menuRef}
      className={`relative inline-block text-left dropdown z-3 ${className}`}
    >
      <span className="flex items-center justify-center">{activator}</span>
      <div
        className={`dropdown-menu z-3 transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 ${
          open ? '' : 'opacity-0 invisible'
        }`}
      >
        <div
          className={`absolute right-0 mt-2 z-3 origin-top-right border divide-y shadow-lg outline-none ${theme.tableDataStyle}`}
          style={{
            width: width + 'px',
          }}
          role="menu"
        >
          {menu}
        </div>
      </div>
    </div>
  )
}

DropdownMenu.Activator = DropdownMenuActivator
