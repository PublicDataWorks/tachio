import {Transition} from '@headlessui/react'
import {useRef} from 'react'
import classnames from 'classnames'
import {useClickOutside} from '../hooks/useClickOutside'
import {useLiveQuery} from "electric-sql/react";
import {useElectric} from "../electric.ts";
import {GrProjects} from "react-icons/gr";

interface Props {
  isOpen: boolean
  onDismiss: () => void
  onChoose: (projectId: string) => void
  className?: string
}

export default function IssueProjectsMenu({
                                            isOpen,
                                            className,
                                            onDismiss,
                                            onChoose,
                                          }: Props) {
  const classes = classnames(
    'select-none shadow-modal z-50 flex flex-col bg-white font-normal rounded text-gray-800 max-w-lg',
    className
  )
  const { db } = useElectric()!
  const { results: projects } = useLiveQuery(
    db.projects.liveMany({
      orderBy: {
        created_at: 'asc',
      },
    })
  )
  const ref = useRef(null)

  useClickOutside(ref, () => {
    if (isOpen && onDismiss) {
      onDismiss()
    }
  })

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
        className={classes}
      >
        {projects?.map((project) => (
          <button
            key={project.id}
            className="flex items-center h-8 px-3 max-w-lg hover:bg-gray-100"
            onClick={() => {
              onChoose(project.id)
              onDismiss()
            }}
          >
            <div className='w-5 mr-2'><GrProjects size={16}/></div>
            <span className='truncate'>{project.name} </span>
          </button>
        ))}
      </Transition>
    </div>
  )
}
