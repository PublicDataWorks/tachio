import TopFilter from '../../components/TopFilter'
import IssueBoard from './IssueBoard'
import { Issues, useElectric } from '../../electric'
import { useLiveQuery } from 'electric-sql/react'
import { useFilterState, filterStateToWhere } from '../../utils/filterState'

interface BoardProps {
  labels?: string[]
}

function Board({ labels }: BoardProps) {
  const [filterState] = useFilterState()
  const { db } = useElectric()!
  const { results: projects } = useLiveQuery(
    db.projects.liveMany({
      select: {
        id: true
      },
      where: {
        missive_label_id: labels ? { in: labels } : undefined
      }
    })
  )
  const where = filterStateToWhere(filterState)
  where.project_id = { in: projects?.map(project => project.id) ?? [] }
  const { results } = useLiveQuery(
    db.issues.liveMany({
      orderBy: {
        kanbanorder: 'asc'
      },
      where
    })
  )
  const issues: Issues[] = results ?? []
  console.log(results)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopFilter title="Board" issues={issues} hideSort={true} showProjects={false} />
      <IssueBoard issues={issues} />
    </div>
  )
}

export default Board
