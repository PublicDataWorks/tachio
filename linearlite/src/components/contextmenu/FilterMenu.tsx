import { Portal } from '../Portal'
import { ReactElement, ReactNode, useState } from 'react'
import { ContextMenuTrigger } from '@firefox-devtools/react-contextmenu'
import { BsCheck2 } from 'react-icons/bs'
import { Menu } from './menu'
import { useFilterState } from '../../utils/filterState'
import { PriorityOptions, StatusOptions } from '../../types/issue'
import { Projects } from '../../generated/client'
import { PiCubeThin } from 'react-icons/pi'
import { useLiveQuery } from 'electric-sql/react'
import { useElectric } from '../../electric.ts'

interface Props {
  id: string
  button: ReactNode
  className?: string,
  projects?: Projects[]
  showProjects: boolean
}

function FilterMenu({ id, button, className, showProjects = true }: Props) {
  const { db } = useElectric()!
  const [filterState, setFilterState] = useFilterState()
  const [keyword, setKeyword] = useState('')
  let projectOptions: ReactElement[] | undefined = undefined
  if (showProjects) {
    const { results: projects } = useLiveQuery(
      db.projects.liveMany()
    )
    projectOptions = projects?.map((project) => {
      return (
        <Menu.Item
          key={project.id}
          onClick={() => handleProjectSelect(project.id)}
        >
          <PiCubeThin className="mr-3" />
          <span>{project.name}</span>
        </Menu.Item>
      )
    })
  }
  // TODO: Fetch only name and id

  let priorities = PriorityOptions
  if (keyword !== '') {
    const normalizedKeyword = keyword.toLowerCase().trim()
    priorities = priorities.filter(
      ([_icon, _priority, label]) =>
        (label as string).toLowerCase().indexOf(normalizedKeyword) !== -1
    )
  }

  let statuses = StatusOptions
  if (keyword !== '') {
    const normalizedKeyword = keyword.toLowerCase().trim()
    statuses = statuses.filter(
      ([_icon, _status, label]) =>
        label.toLowerCase().indexOf(normalizedKeyword) !== -1
    )
  }

  const priorityOptions = priorities.map(([Icon, priority, label], idx) => {
    return (
      <Menu.Item
        key={`priority-${idx}`}
        onClick={() => handlePrioritySelect(priority as string)}
      >
        <Icon className="mr-3" />
        <span>{label}</span>
        {filterState.priority?.includes(priority) && (
          <BsCheck2 className="ml-auto" />
        )}
      </Menu.Item>
    )
  })

  const statusOptions = statuses.map(([Icon, status, label], idx) => {
    return (
      <Menu.Item
        key={`status-${idx}`}
        onClick={() => handleStatusSelect(status as string)}
      >
        <Icon className="mr-3" />
        <span>{label}</span>
        {filterState.status?.includes(status) && (
          <BsCheck2 className="ml-auto" />
        )}
      </Menu.Item>
    )
  })

  const handleProjectSelect = (projectId: string) => {
    setKeyword('')
    setFilterState({
      ...filterState,
      projectId
    })
  }
  const handlePrioritySelect = (priority: string) => {
    setKeyword('')
    const newPriority = filterState.priority || []
    if (newPriority.includes(priority)) {
      newPriority.splice(newPriority.indexOf(priority), 1)
    } else {
      newPriority.push(priority)
    }
    setFilterState({
      ...filterState,
      priority: newPriority
    })
  }

  const handleStatusSelect = (status: string) => {
    setKeyword('')
    const newStatus = filterState.status || []
    if (newStatus.includes(status)) {
      newStatus.splice(newStatus.indexOf(status), 1)
    } else {
      newStatus.push(status)
    }
    setFilterState({
      ...filterState,
      status: newStatus
    })
  }

  return (
    <>
      <ContextMenuTrigger id={id} holdToDisplay={1}>
        {button}
      </ContextMenuTrigger>

      <Portal>
        <Menu
          id={id}
          size="normal"
          filterKeyword={false}
          className={className}
          searchPlaceholder="Filter by..."
          onKeywordChange={(kw) => setKeyword(kw)}
        >
          {priorityOptions && <Menu.Header>Priority</Menu.Header>}
          {priorityOptions}
          {priorityOptions && statusOptions && <Menu.Divider />}
          {statusOptions && <Menu.Header>Status</Menu.Header>}
          {statusOptions}
          {projectOptions && <Menu.Header>Project</Menu.Header>}
          {projectOptions}
        </Menu>
      </Portal>
    </>
  )
}

export default FilterMenu
