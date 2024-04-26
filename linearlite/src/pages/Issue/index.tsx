import {useLiveQuery} from 'electric-sql/react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useRef} from 'react'
import {BsThreeDots, BsTrash3 as DeleteIcon} from 'react-icons/bs'
import {FaExternalLinkAlt as LinkIcon} from 'react-icons/fa'
import {BsXLg as CloseIcon} from 'react-icons/bs'
import PriorityMenu from '../../components/contextmenu/PriorityMenu'
import StatusMenu from '../../components/contextmenu/StatusMenu'
import PriorityIcon from '../../components/PriorityIcon'
import StatusIcon from '../../components/StatusIcon'
import Avatar from '../../components/Avatar'
import {useElectric} from '../../electric'
import {PriorityDisplay, StatusDisplay} from '../../types/issue'
import Editor from '../../components/editor/Editor'
import DeleteModal from './DeleteModal'
import Comments from './Comments'
import debounce from 'lodash.debounce'
import ItemGroup from '../../components/ItemGroup.tsx'
import ExternalUrlMenu from "../../components/ExternalUrlMenu.tsx";
import IssueProjectsMenu from "../../components/IssueProjectsMenu.tsx";
import {GrProjects} from "react-icons/gr";

const debounceTime = 500

function IssuePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { db } = useElectric()!
  const { results: issue } = useLiveQuery(
    db.issues.liveUnique({
      where: { id: id },
      include: { projects: true }
    })
  )
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [dirtyTitle, setDirtyTitle] = useState<string | null>(null)
  const titleIsDirty = useRef(false)
  const [dirtyDescription, setDirtyDescription] = useState<string | null>(null)
  const descriptionIsDirty = useRef(false)
  // External URL that the user clicked on to show the ExternalUrlMenu
  const [showExternalUrlMenu, setExternalUrlMenu] = useState('')
  const [showProjects, setShowProjects] = useState(false)
  if (issue === undefined) {
    return <div className="p-8 w-full text-center">Loading...</div>
  } else if (issue === null) {
    return <div className="p-8 w-full text-center">Issue not found</div>
  }
  // We check if the dirty title or description is the same as the actual title or
  // description, and if so, we can switch back to the non-dirty version
  if (dirtyTitle === issue.title) {
    setDirtyTitle(null)
    titleIsDirty.current = false
  }
  if (dirtyDescription === issue.description) {
    setDirtyDescription(null)
    descriptionIsDirty.current = false
  }

  const handleStatusChange = (status: string) => {
    db.issues.update({
      data: {
        status: status,
        modified: new Date()
      },
      where: {
        id: issue.id
      }
    })
  }

   const handleProjectChange = (projectId: string) => {
    if (issue.projects?.id === projectId) return
    db.issues.update({
      data: {
        project_id: projectId,
        modified: new Date()
      },
      where: {
        id: issue.id
      }
    })
  }

  const handleRemoveExternalUrl = (urlToRemove: string) => {
    if (!issue?.external_urls) return
    // `issue.external_urls` is a string that concatenates a list of URLs, with each URL separated by a semicolon.
    // Remove the URL and an optional trailing semicolon then remove redundant leading semicolons
    const newExternalUrls = issue.external_urls.replace(new RegExp(`${urlToRemove},?`), "").replace(/,$/g, "")
    db.issues.update({
      data: {
        external_urls: newExternalUrls,
        modified: new Date()
      },
      where: {
        id: issue.id
      }
    })
  }
  const handlePriorityChange = (priority: string) => {
    db.issues.update({
      data: {
        priority: priority,
        modified: new Date()
      },
      where: {
        id: issue.id
      }
    })
  }

  const handleTitleChangeDebounced = debounce(async (title: string) => {
    await db.issues.update({
      data: {
        title: title,
        modified: new Date()
      },
      where: {
        id: issue.id
      }
    })
    // We can't set titleIsDirty.current = false here because we haven't yet received
    // the updated issue from the db
  }, debounceTime)

  const handleTitleChange = (title: string) => {
    setDirtyTitle(title)
    titleIsDirty.current = true
    // We debounce the title change so that we don't spam the db with updates
    handleTitleChangeDebounced(title)
  }

  const handleDescriptionChangeDebounced = debounce(
    async (description: string) => {
      await db.issues.update({
        data: {
          description: description,
          modified: new Date()
        },
        where: {
          id: issue.id
        }
      })
      // We can't set descriptionIsDirty.current = false here because we haven't yet received
      // the updated issue from the db
    },
    debounceTime
  )

  const handleDescriptionChange = (description: string) => {
    setDirtyDescription(description)
    descriptionIsDirty.current = true
    // We debounce the description change so that we don't spam the db with updates
    handleDescriptionChangeDebounced(description)
  }

  const handleDelete = () => {
    db.comments.deleteMany({
      where: {
        issue_id: issue.id
      }
    })
    db.issues.delete({
      where: {
        id: issue.id
      }
    })
    handleClose()
  }

  const handleClose = () => {
    if (window.history.length > 2) {
      navigate(-1)
    }
    navigate('/')
  }

  const shortId = () => {
    if (issue.id.includes('-')) {
      return issue.id.slice(issue.id.length - 8)
    } else {
      return issue.id
    }
  }

  const onClickExternalUrl = (e: MouseEvent, url: string) => {
    setExternalUrlMenu(url)
    e.preventDefault()
  }
  return (
    <>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-col">
          <div className="flex justify-between flex-shrink-0 pr-6 border-b border-gray-200 h-14 pl-3 md:pl-5 lg:pl-9">
            <div className="flex items-center">
              <span className="font-semibold me-2">Issue</span>
              <span className="text-gray-500" title={issue.id}>
                {shortId()}
              </span>
            </div>

            <div className="flex items-center">
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setShowDeleteModal(true)}
              >
                <DeleteIcon size={14}/>
              </button>
              <button
                className="ms-2 p-2 rounded hover:bg-gray-100"
                onClick={handleClose}
              >
                <CloseIcon size={14}/>
              </button>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col overflow-auto">issue info</div> */}
        <div className="flex flex-1 p-3 md:p-2 overflow-hidden flex-col md:flex-row">
          <div className="md:block flex md:flex-[1_0_0] min-w-0 md:p-3 md:order-2">
            <div className="max-w-4xl flex flex-row md:flex-col">
              <div className="flex flex-1 mb-3 mr-5 md-mr-0">
                <div className="flex flex-[2_0_0] mr-2 md-mr-0 items-center">
                  Opened by
                </div>
                <div className="flex flex-[3_0_0]">
                  <button
                    className="inline-flex items-center h-6 ps-1.5 pe-2 text-gray-500border-none rounded hover:bg-gray-100">
                    <Avatar name={issue.username}/>
                    <span className="ml-1">{issue.username}</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-1 mb-3 mr-5 md-mr-0">
                <div className="flex flex-[2_0_0] mr-2 md-mr-0 items-center">
                  Status
                </div>
                <div className="flex flex-[3_0_0]">
                  <StatusMenu
                    id={'issue-status-' + issue.id}
                    button={
                      <button
                        className="inline-flex items-center h-6 px-2 text-gray-500border-none rounded hover:bg-gray-100">
                        <StatusIcon status={issue.status} className="mr-1"/>
                        <span>{StatusDisplay[issue.status]}</span>
                      </button>
                    }
                    onSelect={handleStatusChange}
                  />
                </div>
              </div>
              <div className="flex flex-1 mb-3 mr-5 md-mr-0">
                <div className="flex flex-[2_0_0] mr-2 md-mr-0 items-center">
                  Priority
                </div>
                <div className="flex flex-[3_0_0]">
                  <PriorityMenu
                    id={'issue-priority-' + issue.id}
                    button={
                      <button
                        className="inline-flex items-center h-6 px-2 text-gray-500 border-none rounded hover:bg-gray-100 hover:text-gray-700">
                        <PriorityIcon
                          priority={issue.priority}
                          className="mr-1"
                        />
                        <span>{PriorityDisplay[issue.priority]}</span>
                      </button>
                    }
                    onSelect={handlePriorityChange}
                  />
                </div>
              </div>
              <div className="relative">
                <span className="font-light">Projects</span>
                <button className="flex items-center w-full h-8 mt-2 px-2 hover:bg-gray-100" onClick={() => setShowProjects(!showProjects)}>
                  <div className='w-5 mr-2'> <GrProjects size={16}/> </div>
                  <span className='truncate'>{issue.projects?.name} </span>
                </button>
                <IssueProjectsMenu isOpen={showProjects} onDismiss={() => setShowProjects(false)} onChoose={handleProjectChange} className="absolute top-8 right-64"/>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-[3_0_0] md:p-3 border-gray-200 md:border-r min-h-0 min-w-0 overflow-auto">
            <input
              className="w-full px-3 py-1 text-lg font-semibold placeholder-gray-400 border-transparent rounded "
              placeholder="Issue title"
              value={titleIsDirty.current ? dirtyTitle! : issue.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />

            <Editor
              className="prose w-full max-w-full mt-2 font-normal appearance-none min-h-12 p-3 text-md rounded editor"
              value={
                descriptionIsDirty.current
                  ? dirtyDescription || ''
                  : issue.description || ''
              }
              onChange={(val) => handleDescriptionChange(val)}
              placeholder="Add description..."
            />
            {issue.external_urls && (
              <ItemGroup title="Link">
                {issue.external_urls?.split(',').map(url => (
                  <div className="flex relative" key={url}>
                    <Link
                      className="inline-flex w-full items-center px-4 mt-2 h-10 bg-white border border-gray-300 rounded hover:bg-gray-100 justify-between"
                      to={url}
                      target="_blank"
                    >
                      {url}
                      <div className="flex">
                        <LinkIcon className="mr-2.5 w-3.5 h-3.5"/>
                        <BsThreeDots onClick={(e: MouseEvent) => onClickExternalUrl(e, url)}
                                     className="mr-2.5 w-3.5 h-3.5 hover:bg-gray-300"/>
                      </div>
                    </Link>
                    <ExternalUrlMenu
                      isOpen={showExternalUrlMenu === url}
                      onDismiss={() => setExternalUrlMenu('')}
                      onCopy={() => {
                        void navigator.clipboard.writeText(url)
                      }}
                      onRemove={() => handleRemoveExternalUrl(url)}
                      className="absolute top-10 right-1"
                    />
                  </div>
                ))}
              </ItemGroup>
            )}


            <div className="border-t border-gray-200 mt-3 p-3">
              <h2 className="text-md mb-3">Comments</h2>
              <Comments issue={issue}/>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        onDismiss={() => setShowDeleteModal(false)}
        deleteIssue={handleDelete}
      />
    </>
  )
}

export default IssuePage
