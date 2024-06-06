import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { cssTransition, ToastContainer } from 'react-toastify'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { dbName, DEBUG, ElectricProvider, initElectric } from './electric.ts'
import LeftMenu from './components/LeftMenu.tsx'
import { Electric } from './generated/client'
import List from './pages/List'
import Board from './pages/Board'
import Issue from './pages/Issue'
import { SupabaseContext } from './SupabaseContext.ts'
import Project from './pages/Project'
import { arraysEqualUnordered } from './utils/array.ts'
import debounce from 'lodash.debounce'

interface MenuContextInterface {
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

export const MenuContext = createContext(null as MenuContextInterface | null)

const slideUp = cssTransition({
  enter: 'animate__animated animate__slideInUp',
  exit: 'animate__animated animate__slideOutDown'
})

function deleteDB() {
  console.log('Deleting DB as schema doesn\'t match server\'s')
  const DBDeleteRequest = window.indexedDB.deleteDatabase(dbName)
  DBDeleteRequest.onsuccess = function() {
    console.log('Database deleted successfully')
  }
  // the indexedDB cannot be deleted if the database connection is still open,
  // so we need to reload the page to close any open connections.
  // On reload, the database will be recreated.
  window.location.reload()
}

interface MainRoutesProps {
  onElectricLoaded: () => void
}

export const MainRoutes = ({ onElectricLoaded }: MainRoutesProps) => {
  const [electric, setElectric] = useState<Electric>()
  const [showMenu, setShowMenu] = useState(false)
  const { session } = useContext(SupabaseContext)
  const [labels, setLabels] = useState<string[] | undefined>(undefined)
  const labelsRef = useRef(labels)
  useEffect(() => {
    labelsRef.current = labels
  }, [labels])

  const handleConversationChange = debounce((ids: string[]) => {
    Missive.fetchConversations(ids).then(conversations => {
      if (conversations.length !== 1) {
        // Select multiple tabs, that means user is not reading the conversation
        return
      }
      let newLabels = conversations[0].labels?.map(label => label.id) ?? []
      if (!labelsRef.current || !arraysEqualUnordered(newLabels, labelsRef.current)) {
        setLabels(newLabels)
      }
    })
  }, 300)

  useEffect(() => {
    Missive.on('change:conversations', handleConversationChange)
    const init = async () => {
      try {
        const client = await initElectric(session!)
        setElectric(client)
        const { synced } = await client.db.issues.sync({
          include: {
            projects: {
              include: {
                orgs: {
                  include: {
                    emails: true,
                    slack_channels: true
                  }
                }
              }
            }
          }
        })
        await synced
        const timeToSync = performance.now()
        if (DEBUG) {
          console.log(`Synced in ${timeToSync}ms from page load`)
        }
      } catch (error) {
        if (
          (error as Error).message.startsWith(
            'Local schema doesn\'t match server\'s'
          )
        ) {
          deleteDB()
        }
        throw error
      }
      onElectricLoaded()
    }

    void init()
  }, [])

  if (electric === undefined) {
    return null
  }
  const router = (
    <Routes>
      <Route path="/" element={<List labels={labels} />} />
      <Route path="/projects/:id" element={<Project />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/search" element={<List showSearch={true} />} />
      <Route path="/board" element={<Board labels={labels} />} />
      <Route path="/issue/:id" element={<Issue />} />
    </Routes>
  )

  return (
    <ElectricProvider db={electric}>
      <MenuContext.Provider value={{ showMenu, setShowMenu }}>
        <BrowserRouter>
          <div className="flex w-full h-screen overflow-y-hidden dark:bg-black-color">
            <LeftMenu />
            {router}
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            transition={slideUp}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </MenuContext.Provider>
    </ElectricProvider>
  )
}
