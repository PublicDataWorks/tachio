import { FixedSizeList as List, areEqual } from 'react-window'
import { memo, type CSSProperties } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import ProjectRow from './ProjectRow.tsx'
import { Projects } from '../../generated/client'

export interface ProjectListProps {
  projects: Projects[]
}

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grow">
      <div
        className="flex items-center flex-grow w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-gray-100 h-11 shrink-0"
      >
        <div
          className="flex-1 flex items-center flex-wrap flex-shrink ml-4 overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
          Name
        </div>
        <div
          className="flex-1 flex-wrap flex-shrink ml-8 overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
          Identifier
        </div>
        <div className="flex-shrink-0 hidden w-15 ml-auto font-normal text-gray-500 sm:block whitespace-nowrap">
          Created at
        </div>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={projects.length}
            itemSize={36}
            itemData={projects}
            width={width}
          >
            {VirtualIssueRow}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}

const VirtualIssueRow = memo(
  ({
     data: projects,
     index,
     style
   }: {
    data: Projects[]
    index: number
    style: CSSProperties
  }) => {
    const project = projects[index]
    return <ProjectRow key={`issue-${project.id}`} project={project} style={style} />
  },
  areEqual
)

export default ProjectList
