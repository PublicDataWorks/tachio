import { Transition } from '@headlessui/react'
import { useClickOutside } from '../hooks/useClickOutside'
import React, { useRef } from 'react'
import Select from './Select'
import { useFilterState } from '../utils/filterState'

interface Props {
  isOpen: boolean
  onDismiss?: () => void
}
export default function ({ isOpen, onDismiss }: Props) {
  const ref = useRef(null)
  const [filterState, setFilterState] = useFilterState()

  useClickOutside(ref, () => {
    if (isOpen && onDismiss) onDismiss()
  })

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState({
      ...filterState,
      orderBy: e.target.value,
    })
  }

  const handleOrderDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterState({
      ...filterState,
      orderDirection: e.target.value as 'asc' | 'desc',
    })
  }

  return (
    <div ref={ref}>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition easy-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="fixed right-0 z-30 flex flex-col bg-white rounded-lg shadow-modal top-12 w-70 dark:bg-context-bg-color dark:text-almost-white-color"
      >
        <div className="font-medium border-b border-gray-200 px-4.5 py-2 dark:border-context-border-color">
          View Options
        </div>

        <div className="px-4.5 py-2 flex flex-col border-b border-gray-200 dark:border-context-border-color">
          <div className="flex items-center mt-1 min-h-8">
            <span className="text-gray-500 dark:text-almost-white-color">Ordering</span>
            <div className="flex ml-auto">
              <Select
                value={filterState.orderBy}
                onChange={handleOrderByChange}
              >
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="created_at">Created</option>
                <option value="updated_at">Updated</option>
              </Select>
            </div>
            <div className="flex ml-1">
              <Select
                value={filterState.orderDirection}
                onChange={handleOrderDirectionChange}
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </Select>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}
