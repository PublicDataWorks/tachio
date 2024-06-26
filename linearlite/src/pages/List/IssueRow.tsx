import type { CSSProperties } from 'react'
import PriorityMenu from '../../components/contextmenu/PriorityMenu'
import StatusMenu from '../../components/contextmenu/StatusMenu'
import PriorityIcon from '../../components/PriorityIcon'
import StatusIcon from '../../components/StatusIcon'
import Avatar from '../../components/Avatar'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Issues, useElectric } from '../../electric'
import { formatDate } from '../../utils/date'

interface Props {
  issue: Issues
  style: CSSProperties
}

function IssueRow({ issue, style }: Props) {
  const { db } = useElectric()!
  const navigate = useNavigate()

  const handleChangeStatus = (status: string) => {
    db.issues.update({
      data: {
        status: status,
        updated_at: new Date(),
      },
      where: {
        id: issue.id,
      },
    })
  }

  const handleChangePriority = (priority: string) => {
    db.issues.update({
      data: {
        priority: priority,
        updated_at: new Date(),
      },
      where: {
        id: issue.id,
      },
    })
  }

  return (
    <div
      key={issue.id}
      className="flex items-center flex-grow w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 dark:border-border-color hover:bg-gray-100 dark:hover:bg-hover-bg-color h-11 shrink-0"
      id={issue.id}
      onClick={() => navigate(`/issue/${issue.id}`)}
      style={style}
    >
      <div className="flex-shrink-0 ml-4">
        <PriorityMenu
          id={'r-priority-' + issue.id}
          button={<PriorityIcon priority={issue.priority} />}
          onSelect={handleChangePriority}
          className={'dark:bg-context-bg-color border dark:border-context-border-color'}
        />
      </div>
      <div className="flex-shrink-0 ml-3">
        <StatusMenu
          id={'r-status-' + issue.id}
          button={<StatusIcon status={issue.status} />}
          onSelect={handleChangeStatus}
        />
      </div>
      <div className="flex-wrap flex-shrink ml-3 overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
        {issue.title.slice(0, 3000) || ''}
      </div>
      <div className="flex-shrink-0 hidden w-15 ml-auto font-normal text-gray-500 sm:block whitespace-nowrap">
        {formatDate(issue.created_at)}
      </div>
      <div className="flex-shrink-0 hidden ml-4 font-normal text-gray-500 sm:block w-15 md:block">
        <Avatar name={issue.username} />
      </div>
    </div>
  )
}

export default memo(IssueRow)
