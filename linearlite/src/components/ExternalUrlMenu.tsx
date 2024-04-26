import { Transition } from '@headlessui/react'
import { useRef } from 'react'
import classnames from 'classnames'
import { useClickOutside } from '../hooks/useClickOutside'
import {BsLink45Deg, BsTrash2Fill} from "react-icons/bs";

interface Props {
  isOpen: boolean
  onDismiss: () => void
  onCopy: () => void
  onRemove: () => void
  className?: string
}
export default function ExternalUrlMenu({
  isOpen,
  className,
  onDismiss,
  onCopy,
  onRemove
}: Props) {
  const classes = classnames(
    'select-none w-32 shadow-modal z-50 flex flex-col bg-white font-normal rounded text-gray-800',
    className
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
        <button
          className="flex items-center h-8 px-3 hover:bg-gray-100"
          onClick={() => {
            onCopy()
            onDismiss?.()
          }}
        >
          <BsLink45Deg size={16} className="mr-2" />
          Copy link
        </button>
        <hr />
        <button
          className="flex items-center h-8 px-3 hover:bg-gray-100"
          onClick={() => {
            onRemove()
            onDismiss?.()
          }}
        >
          <BsTrash2Fill size={16} className="mr-2" />
          Remove ...
        </button>
      </Transition>
    </div>
  )
}
