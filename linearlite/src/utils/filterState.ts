import { useSearchParams } from 'react-router-dom'

interface FilterState {
  orderBy: string
  orderDirection: 'asc' | 'desc'
  status?: string[]
  priority?: string[]
  query?: string
  projectId?: string
}

export function useFilterState(): [
  FilterState,
  (state: Partial<FilterState>) => void
] {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderBy = searchParams.get('orderBy') ?? 'created_at'
  const orderDirection =
    (searchParams.get('orderDirection') as 'asc' | 'desc') ?? 'desc'
  const status = searchParams
    .getAll('status')
    .map((status) => status.toLocaleLowerCase().split(','))
    .flat()
  const priority = searchParams
    .getAll('priority')
    .map((status) => status.toLocaleLowerCase().split(','))
    .flat()
  const query = searchParams.get('query')
  const projectId = searchParams.get('projectId') ?? undefined

  const state = {
    orderBy,
    orderDirection,
    status,
    priority,
    projectId,
    query: query || undefined,
  }

  const setState = (state: Partial<FilterState>) => {
    const { orderBy, orderDirection, status, priority, projectId, query } = state
    setSearchParams((searchParams) => {
      if (orderBy) {
        searchParams.set('orderBy', orderBy)
      } else {
        searchParams.delete('orderBy')
      }
      if (orderDirection) {
        searchParams.set('orderDirection', orderDirection)
      } else {
        searchParams.delete('orderDirection')
      }
      if (status && status.length > 0) {
        searchParams.set('status', status.join(','))
      } else {
        searchParams.delete('status')
      }
      if (priority && priority.length > 0) {
        searchParams.set('priority', priority.join(','))
      } else {
        searchParams.delete('priority')
      }
      if (projectId) {
        searchParams.set('projectId', projectId)
      } else {
        searchParams.delete('projectId')
      }
      if (query) {
        searchParams.set('query', query)
      } else {
        searchParams.delete('query')
      }
      return searchParams
    })
  }

  return [state, setState]
}

interface FilterStateWhere {
  status?: { in: string[] }
  priority?: { in: string[] }
  title?: { contains: string }
  project_id?: string | { in: string[] }
  projects?: { missive_label_id: { in: string[] } }
  username?: string
  OR?: [{ title: { contains: string } }, { description: { contains: string } }]
}

export function filterStateToWhere(filterState: FilterState) {
  const { status, priority, projectId, query } = filterState
  const where: FilterStateWhere = {}
  if (status && status.length > 0) {
    where.status = { in: status }
  }
  if (priority && priority.length > 0) {
    where.priority = { in: priority }
  }
  if (projectId) {
    where.project_id = projectId
  }
  if (query) {
    where.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
    ]
  }
  return where
}
