import TopFilter from '../../components/TopFilter'
import { Issues, useElectric } from '../../electric'
import { useLiveQuery } from 'electric-sql/react'
import { useFilterState, filterStateToWhere } from '../../utils/filterState'
import IssueList from '../List/IssueList.tsx'
import { useParams } from 'react-router-dom'

interface ProjectProps {
  showSearch?: boolean
  projectId?: string
}

function Project({ showSearch }: ProjectProps) {
  const [filterState] = useFilterState()
  const { db } = useElectric()!
  const { id } = useParams()
  const where = filterStateToWhere(filterState)
  where.project_id = id
  const { results } = useLiveQuery(
    db.issues.liveMany({
      orderBy: { [filterState.orderBy]: filterState.orderDirection },
      where
    })
  )
  const issues: Issues[] = results ?? []

  return (
    <div className="flex flex-col flex-grow">
      <TopFilter issues={issues} showSearch={showSearch} showProjects={false} />
      <IssueList issues={issues} />
    </div>
  )
}

Project.defaultProps = {
  showSearch: true,
}

export default Project
