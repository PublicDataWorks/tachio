import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg'
import { useState, useContext } from 'react'
import { BsSortUp, BsPlus, BsX, BsSearch as SearchIcon } from 'react-icons/bs'
import { useLiveQuery } from 'electric-sql/react'
import ViewOptionMenu from './ViewOptionMenu'
import { Issues, useElectric } from '../electric'
import FilterMenu from './contextmenu/FilterMenu'
import { useFilterState } from '../utils/filterState'
import { PriorityDisplay, StatusDisplay } from '../types/issue'
import { MenuContext } from '../MainRoutes.tsx'

interface Props {
  issues: Issues[]
  hideSort?: boolean
  showSearch?: boolean
  title?: string
  showProjects: boolean
}

export default function TopFilter({
                                    issues,
                                    hideSort,
                                    showSearch,
                                    showProjects,
                                    title
                                  }: Props) {
  const { db } = useElectric()!
  const [filterState, setFilterState] = useFilterState()
  const [showViewOption, setShowViewOption] = useState(false)
  const { showMenu, setShowMenu } = useContext(MenuContext)!
  const [searchQuery, setSearchQuery] = useState('')

  // We don't yet have a DAL for counts, so we use raw SQL
  const totalIssuesCount: number =
    useLiveQuery(db.liveRawQuery({ sql: 'SELECT COUNT(*) FROM issue' }))
      .results?.[0]?.['COUNT(*)'] ?? 0

  const filteredIssuesCount = issues.length

  const handleSearchInner = (query: string) => {
    setFilterState({
      ...filterState,
      query: query
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    handleSearchInner(query)
  }

  const eqStatuses = (statuses: string[]) => {
    const statusSet = new Set(statuses)
    return (
      filterState.status?.length === statusSet.size &&
      filterState.status.every((x) => statusSet.has(x))
    )
  }

  if (filterState.status?.length) {
    if (eqStatuses(['backlog'])) {
      title = 'Backlog'
    } else if (eqStatuses(['todo', 'in_progress'])) {
      title = 'Active'
    }
  }

  return (
    <>
      <div className="flex justify-between flex-shrink-0 pl-2 pr-6 border-b border-gray-200 h-14 lg:pl-9 dark:text-almost-white-color dark:border-border-color">
        {/* left section */}
        <div className="flex items-center">
          <button
            className="flex-shrink-0 h-full px-5 lg:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon className="w-3.5 text-gray-500 hover:text-gray-800" />
          </button>
          <div className="p-1 font-semibold me-1">{title}</div>
          <span>
            {filteredIssuesCount}
            {filteredIssuesCount !== totalIssuesCount
              ? ` of ${totalIssuesCount}`
              : ''}
          </span>
          <FilterMenu
            button={
              <button
                className="px-2 py-0.5 ml-3 border border-gray-300 border-dashed rounded text-gray-500 hover:border-gray-400 hover:text-gray-800 dark:hover:border-white dark:hover:text-white flex items-center dark:text-almost-white-color">
                <BsPlus className="inline" size="16" />
                Filter
              </button>
            }
            showProjects={showProjects}
            id={'filter-menu'}
            className={'dark:bg-context-bg-color'}
          />
        </div>

        <div className="flex items-center">
          {!hideSort && (
            <button
              className="p-2 rounded"
              onClick={() => setShowViewOption(true)}
            >
              <BsSortUp size="16" className="inline dark:hover:fill-white" />
            </button>
          )}
        </div>
      </div>

      {(!!filterState.status?.length || !!filterState.priority?.length) && (
        <div className="flex flex-shrink-0 pl-2 pr-6 border-b border-gray-200 dark:border-border-color lg:pl-9 py-2">
          {!!filterState.priority?.length && (
            <div className="flex pr-4 space-x-[1px]">
              <span className="px-1 bg-gray-300 rounded-l">Priority is</span>
              <span className="px-1 bg-gray-300 ">
                {filterState.priority
                  ?.map((priority) => PriorityDisplay[priority])
                  .join(', ')}
              </span>
              <span
                className="px-1 bg-gray-300 rounded-r cursor-pointer flex items-center"
                onClick={() => {
                  setFilterState({
                    ...filterState,
                    priority: undefined
                  })
                }}
              >
                <BsX size={16} />
              </span>
            </div>
          )}
          {!!filterState.status?.length && (
            <div className="flex pr-4 space-x-[1px]">
              <span className="px-1 bg-gray-300 rounded-l">Status is</span>
              <span className="px-1 bg-gray-300 ">
                {filterState.status
                  ?.map((status) => StatusDisplay[status])
                  .join(', ')}
              </span>
              <span
                className="px-1 bg-gray-300 rounded-r cursor-pointer flex items-center"
                onClick={() => {
                  setFilterState({
                    ...filterState,
                    status: undefined
                  })
                }}
              >
                <BsX size={16} />
              </span>
            </div>
          )}
        </div>
      )}

      {showSearch && (
        <div
          className="flex items-center justify-between flex-shrink-0 pl-2 pr-6 border-b border-gray-200 lg:pl-9 py-2 dark:border-border-color">
          <SearchIcon className="w-3.5 h-3.5 ms-3 absolute dark:fill-white" />
          <input
            type="search"
            className="w-full bg-gray-100 border-0 rounded px-2 py-1.5 ps-9 dark:text-almost-white-color dark:bg-transparent dark:border-none"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}

      <ViewOptionMenu
        isOpen={showViewOption}
        onDismiss={() => setShowViewOption(false)}
      />
    </>
  )
}

TopFilter.defaultProps = {
  showProjects: true,
  title: 'All issues'
}
