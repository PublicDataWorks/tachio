import { Portal } from '../Portal'
import { ReactNode } from 'react'
import { ContextMenuTrigger } from '@firefox-devtools/react-contextmenu'
import { Menu } from './menu'
import { useElectric } from '../../electric.ts'
import { useLiveQuery } from 'electric-sql/react'
import { GrProjects } from 'react-icons/gr'

interface Props {
  id: string
  button: ReactNode
  filterKeyword: boolean
  className?: string
  onSelect: (item: { id: string, name: string }) => void
}

function ProjectMenu({
                       id,
                       button,
                       filterKeyword,
                       className,
                       onSelect
                     }: Props) {
  const { db } = useElectric()!
  const { results: projects } = useLiveQuery(
    db.projects.liveMany({
      orderBy: {
        created_at: 'asc'
      }
    })
  )
  const options = projects?.map(project => {
    return (
      <Menu.Item
        key={project.id}
        onClick={() => onSelect({ id: project.id, name: project.name })}
      >
        <GrProjects size={13} className="mr-3" /> <span className='overflow-hidden'>{project.name}</span>
      </Menu.Item>
    )
  })

  return (
    <>
      <ContextMenuTrigger id={id} holdToDisplay={1}>
        {button}
      </ContextMenuTrigger>

      <Portal>
        <Menu
          id={id}
          size="small"
          filterKeyword={filterKeyword}
          searchPlaceholder="Set priority..."
          className={'w-max ' + className}
        >
          {options}
        </Menu>
      </Portal>
    </>
  )
}

ProjectMenu.defaultProps = {
  filterKeyword: false
}

export default ProjectMenu
