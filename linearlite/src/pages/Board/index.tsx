import TopFilter from '../../components/TopFilter'
import IssueBoard from './IssueBoard'
import { Issues, useElectric } from '../../electric'
import { useLiveQuery } from 'electric-sql/react'
import { useFilterState, filterStateToWhere } from '../../utils/filterState'

function Board() {
  const [filterState] = useFilterState()
  const { db } = useElectric()!
  const { results } = useLiveQuery(
    db.issues.liveMany({
      orderBy: {
        kanbanorder: 'asc',
      },
      where: filterStateToWhere(filterState),
    })
  )
  const issues: Issues[] = results ?? []

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopFilter title="Board" issues={issues} hideSort={true} showProjects={false}/>
      <IssueBoard issues={issues} />
    </div>
  )
}

export default Board
