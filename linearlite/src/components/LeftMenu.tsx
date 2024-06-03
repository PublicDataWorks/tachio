import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg'
import { ReactComponent as BacklogIcon } from '../assets/icons/circle-dot.svg'
import classnames from 'classnames'
import { memo, RefObject, useRef, useState, useContext } from 'react'
import { useConnectivityState, useLiveQuery } from 'electric-sql/react'
import { BsPencilSquare as AddIcon } from 'react-icons/bs'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { BsFillGrid3X3GapFill as BoardIcon } from 'react-icons/bs'
import { BsCollectionFill as IssuesIcon } from 'react-icons/bs'
import { MdKeyboardArrowDown as ExpandMore } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import IssueModal from './IssueModal'
import ItemGroup from './ItemGroup'
import ProfileMenu from './ProfileMenu'
import { MenuContext } from '../MainRoutes.tsx'
import { AiOutlineTeam } from 'react-icons/ai'
import { SupabaseContext } from '../SupabaseContext.ts'
import { useElectric } from '../electric.ts'

function LeftMenu() {
  const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showIssueModal, setShowIssueModal] = useState(false)
  const { showMenu, setShowMenu } = useContext(MenuContext)!
  const { status } = useConnectivityState()
  const { session } = useContext(SupabaseContext)
  const { db } = useElectric()!
  const { results: projects } = useLiveQuery(
    db.projects.liveMany({
      orderBy: {
        created_at: 'desc'
      }
    })
  )
  const classes = classnames(
    'absolute z-40 lg:static inset-0 transform duration-300 lg:relative lg:translate-x-0 bg-white flex flex-col flex-shrink-0 w-56 font-sans text-sm text-gray-700 border-r border-gray-100 lg:shadow-none justify-items-start',
    {
      '-translate-x-full ease-out shadow-none': !showMenu,
      'translate-x-0 ease-in shadow-xl': showMenu
    }
  )

  return (
    <>
      <div className={classes} ref={ref}>
        <button
          className="flex-shrink-0 px-5 ml-2 lg:hidden h-14"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MenuIcon className="w-3.5 text-gray-500 hover:text-gray-800" />
        </button>

        {/* Top menu*/}
        <div className="flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3">
          <div className="flex items-center justify-between">
            {/* Project selection */}
            <Link
              className="flex items-center p-2 pr-3 rounded cursor-pointer hover:bg-gray-100"
              to="/"
            >
              <img
                src="/pdw-icon.png"
                className="w-4.5 h-auto mr-2.5 rounded-sm"
              />
              <span className="flex text-sm font-medium">LinearLite</span>
            </Link>

            {/* User avatar  */}
            <div className="relative">
            {/*   <button
                className="flex items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-100"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <Avatar
                  name={session!.user.email!}
                  online={status == 'connected'}
                  showOffline={true}
                />
                <ExpandMore size={13} className="ml-2" />
              </button>*/}
              {/*<ProfileMenu
                isOpen={showProfileMenu}
                onDismiss={() => setShowProfileMenu(false)}
                className="absolute top-10"
              />*/}
            </div>
          </div>

          {/* Create issue btn */}
          <div className="flex">
            <button
              className="inline-flex w-full items-center px-2 py-2 mt-3 bg-white border border-gray-300 rounded hover:bg-gray-100 h-7"
              onClick={() => {
                setShowIssueModal(true)
              }}
            >
              <AddIcon className="mr-2.5 w-3.5 h-3.5" /> New Issue
            </button>
            <Link
              to="/search"
              className="inline-flex ms-2 items-center px-2 py-2 mt-3 bg-white border border-gray-300 rounded hover:bg-gray-100 h-7"
            >
              <SearchIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col flex-shrink flex-grow overflow-y-auto mb-0.5 px-2">
          <ItemGroup title="Projects">
            <Link
              to="/projects"
              className="flex items-center pl-6 rounded cursor-pointer group h-7 hover:bg-gray-100"
            >
              <AiOutlineTeam className="w-3.5 h-3.5 mr-2" />
              <span>All Projects</span>
            </Link>
            {projects?.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="flex items-center pl-6 rounded cursor-pointer h-7 hover:bg-gray-100"
              >
                <span className="w-3.5 h-6 mr-2 inline-block">
                  <span className="block w-2 h-full border-r"></span>
                </span>
                <span>{project.name}</span>
              </Link>
            ))}
          </ItemGroup>

          <ItemGroup title="Boards">
            <Link
              to="/board"
              className="flex items-center pl-6 rounded cursor-pointer group h-7 hover:bg-gray-100"
            >
              <BoardIcon className="w-3.5 h-3.5 mr-2" />
              <span>All Projects</span>
            </Link>
            {projects?.map((project) => (
              <Link
                key={project.id}
                to={`/board?projectId=${project.id}`}
                className="flex items-center pl-6 rounded cursor-pointer h-7 hover:bg-gray-100"
              >
                <span className="w-3.5 h-6 mr-2 inline-block">
                  <span className="block w-2 h-full border-r"></span>
                </span>
                <span>{project.name}</span>
              </Link>
            ))}
          </ItemGroup>

          <ItemGroup title="Your Issues">
            <Link
              to="/"
              className="flex items-center pl-6 rounded cursor-pointer group h-7 hover:bg-gray-100"
            >
              <IssuesIcon className="w-3.5 h-3.5 mr-2" />
              <span>All Issues</span>
            </Link>
            <Link
              to="/?status=todo,in_progress"
              className="flex items-center pl-6 rounded cursor-pointer h-7 hover:bg-gray-100"
            >
              <span className="w-3.5 h-6 mr-2 inline-block">
                <span className="block w-2 h-full border-r"></span>
              </span>
              <span>Active</span>
            </Link>
            <Link
              to="/?status=backlog"
              className="flex items-center pl-6 rounded cursor-pointer h-7 hover:bg-gray-100"
            >
              <BacklogIcon className="w-3.5 h-3.5 mr-2" />
              <span>Backlog</span>
            </Link>
            <Link
              to="/board"
              className="flex items-center pl-6 rounded cursor-pointer h-7 hover:bg-gray-100"
            >
              <BoardIcon className="w-3.5 h-3.5 mr-2" />
              <span>Board</span>
            </Link>
          </ItemGroup>

          {/* extra space */}
          <div className="flex flex-col flex-grow flex-shrink" />
        </div>
      </div>
      {/* Modals */}
      {
        <IssueModal
          isOpen={showIssueModal}
          onDismiss={() => setShowIssueModal(false)}
        />
      }
    </>
  )
}

export default memo(LeftMenu)
