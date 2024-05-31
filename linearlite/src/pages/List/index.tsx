import TopFilter from '../../components/TopFilter'
import IssueList from './IssueList'
import { Issues, useElectric } from '../../electric'
import { useLiveQuery } from 'electric-sql/react'
import { useFilterState, filterStateToWhere } from '../../utils/filterState'

interface ListProps {
  showSearch?: boolean
  labels?: string[]
}

function List({ showSearch = true, labels }: ListProps) {
  const [filterState] = useFilterState()
  const { db } = useElectric()!
  const where = filterStateToWhere(filterState)
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
  where.project_id = { in: projects?.map(project => project.id) ?? [] }

  const { results } = useLiveQuery(
    db.issues.liveMany({
      orderBy: { [filterState.orderBy]: filterState.orderDirection },
      where
    })
  )
  const issues: Issues[] = results ?? []
  return (
    <div className="flex flex-col flex-grow">
      <TopFilter issues={issues} showSearch={showSearch} />
      <IssueList issues={issues} />
    </div>
  )
}

export default List
