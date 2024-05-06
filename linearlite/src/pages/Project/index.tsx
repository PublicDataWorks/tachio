import { useElectric } from '../../electric'
import { useLiveQuery } from 'electric-sql/react'
import { useFilterState } from '../../utils/filterState'
import TeamTopFilter from '../../components/ProjectTopFilter.tsx'
import { Projects } from '../../generated/client'
import ProjectList from './ProjectList.tsx'

function Project() {
  const [filterState] = useFilterState()
  const { db } = useElectric()!
  const { results } = useLiveQuery(
    db.projects.liveMany({
      orderBy: { [filterState.orderBy]: filterState.orderDirection },
    })
  )
  const projects: Projects[] = results ?? []
  return (
    <div className="flex flex-col flex-grow">
      <TeamTopFilter projects={projects} />
      <ProjectList projects={projects} />
    </div>
  )
}

export default Project
