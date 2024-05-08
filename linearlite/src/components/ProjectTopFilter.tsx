import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg'
import { useState, useContext } from 'react'
import { BsSortUp } from 'react-icons/bs'
import { MenuContext } from '../MainRoutes.tsx'
import { Projects } from '../generated/client'
import ProjectViewOptionMenu from './ProjectViewOptionMenu.tsx'

interface Props {
  projects: Projects[]
  hideSort?: boolean
  title?: string
}

export default function ({
  projects,
  hideSort,
  title = 'Teams',
}: Props) {
  const [showViewOption, setShowViewOption] = useState(false)
  const { showMenu, setShowMenu } = useContext(MenuContext)!

  return (
    <>
      <div className="flex justify-between flex-shrink-0 pl-2 pr-6 border-b border-gray-200 h-14 lg:pl-9">
        {/* left section */}
        <div className="flex items-center">
          <button
            className="flex-shrink-0 h-full px-5 lg:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon className="w-3.5 text-gray-500 hover:text-gray-800" />
          </button>

          <div className="p-1 font-semibold me-1">{title}</div>
          <span>{projects.length}</span>
        </div>

        <div className="flex items-center">
          {!hideSort && (
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setShowViewOption(true)}
            >
              <BsSortUp size="16" className="inline" />
            </button>
          )}
        </div>
      </div>

      <ProjectViewOptionMenu
        isOpen={showViewOption}
        onDismiss={() => setShowViewOption(false)}
      />
    </>
  )
}
