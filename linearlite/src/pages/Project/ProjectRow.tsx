import type { CSSProperties } from 'react'
import { memo } from 'react'
import { formatDate } from '../../utils/date'
import { Projects } from '../../generated/client'
import { PiCubeThin } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

interface Props {
  project: Projects,
  style: CSSProperties
}

function ProjectRow({ project, style }: Props) {
  const navigate = useNavigate()

  return (
    <div
      key={project.id}
      className="flex items-center flex-grow w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-gray-100 h-11 shrink-0"
      onClick={() => navigate(`/?projectId=${project.id}`)}
      style={style}
    >
      <div
        className="flex-1 flex items-center flex-wrap flex-shrink ml-3 overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
        <PiCubeThin className="mr-2" /> {project.name.slice(0, 3000) || ''}
      </div>
      <div className="flex-1 flex-wrap flex-shrink ml-3 overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
        {project.shortname || ''}
      </div>
      <div className="flex-shrink-0 hidden w-15 ml-auto font-normal text-gray-500 sm:block whitespace-nowrap">
        {formatDate(project.created_at)}
      </div>
    </div>
  )
}

export default memo(ProjectRow)
