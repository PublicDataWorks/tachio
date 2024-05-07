import TopFilter from '../../components/TopFilter'
import IssueList from './IssueList'
import { Issues, useElectric } from '../../electric'
import { useLiveQuery } from 'electric-sql/react'
import { useFilterState, filterStateToWhere } from '../../utils/filterState'
import { useContext } from 'react'
import { SupabaseContext } from '../../SupabaseContext.ts'

function List({ showSearch = true }) {
  const [filterState] = useFilterState()
  const { db } = useElectric()!
  const { session } = useContext(SupabaseContext)
  const where = filterStateToWhere(filterState)
  where.username = session?.user ? session.user.email : undefined
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
