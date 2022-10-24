import AppLogo from 'virtual:icons/hcs-icons/halo-calendar'
import Calendar from 'virtual:icons/mdi/calendar-outline'
import Rewind from 'virtual:icons/mdi/rewind-outline'
import Bracket from 'virtual:icons/mdi/tournament'

type SidebarItemProps = {
  children: React.ReactNode
  icon: React.ReactElement
  twoRows?: boolean
}
const SidebarItem = ({ children, icon, twoRows }: SidebarItemProps) => {
  let textClass =
    'font-bold uppercase text-lg pl-2 w-0 overflow-hidden group-hover:w-auto'
  if (twoRows) {
    textClass =
      'ml-2 uppercase font-bold leading-none w-0 overflow-hidden group-hover:w-auto'
  }
  return (
    <div className="flex flex-row pl-5 items-center mb-8 overflow-hidden">
      {icon}
      <div className={textClass}>{children}</div>
    </div>
  )
}

export const Sidebar = () => {
  return (
    <div className="app-sidebar hidden md:flex md:flex-shrink-0 w-24 dark:bg-gray-800 bg-gray-300 z-index-5 group hover:(bg-gray-200 dark:bg-gray-700 w-56) transition-all">
      <div className="flex flex-col w-full py-8 overflow-visible">
        <div className="flex items-center pl-8">
          <AppLogo height="32" width="32" className="min-h-8 min-w-8" />
          <div className="ml-2 uppercase font-semi-bold leading-none w-0 overflow-hidden group-hover:w-auto">
            <span>Tournament</span>
            <br />
            <span>Schedule</span>
          </div>
        </div>
        <div className="border-b-1 border-b-light-800 h-[1px] w-12 mt-8 mb-12 ml-6 opacity-50 group-hover:w-42"></div>
        <nav className="flex flex-col overflow-y-auto px-2 h-full">
          <SidebarItem icon={<Calendar className="min-h-9 min-w-9" />}>
            Schedule
          </SidebarItem>

          <SidebarItem icon={<Bracket className="min-h-9 min-w-9" />}>
            Brackets
          </SidebarItem>

          <SidebarItem icon={<Rewind className="min-h-9 min-w-9" />} twoRows>
            <span>Past</span>
            <br />
            <span>Events</span>
          </SidebarItem>
        </nav>
      </div>
    </div>
  )
}
