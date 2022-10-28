import Translate from 'virtual:icons/mdi/translate'

import { DropdownMenu } from '@/components/Elements/DropdownMenu'
import useOnClickOutside from '@/hooks/useOnClickOutside'

type MenuItemProps = {
  children: React.ReactNode
  active?: boolean
  clickFn: () => void
}
const MenuItem = ({ children, active, clickFn }: MenuItemProps) => {
  return (
    <li
      className={`cursor-pointer hover:dark:bg-gray-600 hover:bg-gray-300 text-center py-2 uppercase ${
        active ? 'bg-purple-600 hover:dark:bg-purple-800' : ''
      }`}
    >
      <button onClick={clickFn} onKeyDown={clickFn}>
        {children}
      </button>
    </li>
  )
}

export const LanguageMenu = () => {
  const [open, setOpen] = useState(false)
  const translateMenu = useRef()
  useOnClickOutside(translateMenu, () => {
    if (open) {
      setOpen(false)
    }
  })

  const { i18n } = useTranslation()

  const setLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <DropdownMenu menuRef={translateMenu} className="ml-4 h-4 w-4 z-100" open={open} width={64}>
      <DropdownMenu.Activator openFn={() => setOpen(!open)}>
        <Translate />
      </DropdownMenu.Activator>
      <ul>
        <MenuItem active={i18n.language === 'en'} clickFn={() => setLang('en')}>
          EN
        </MenuItem>
        <MenuItem active={i18n.language === 'es'} clickFn={() => setLang('es')}>
          ES
        </MenuItem>
        <MenuItem active={i18n.language === 'fr'} clickFn={() => setLang('fr')}>
          FR
        </MenuItem>
      </ul>
    </DropdownMenu>
  )
}
