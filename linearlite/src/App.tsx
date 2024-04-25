import 'animate.css/animate.min.css'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Session } from '@supabase/supabase-js'

import { SupabaseContext } from './SupabaseContext.ts'
import { MainRoutes } from './MainRoutes.tsx'
import SignIn from './pages/SignIn.tsx'
import { supabase } from './utils/supabase.ts'


const App = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [_loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession) {
        // if (!session) {
        //   setLoading(true)
        // }
        setTimeout(() => {
          // There is an issue with clock drift and the JWT being invalid
          // this is a hackey workaround for now
          setSession(newSession)
        }, 1500)
      } else {
        setSession(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])


  return (
    <SupabaseContext.Provider
      value={{ session }}
    >
      {session ? (
        <MainRoutes onElectricLoaded={() => setLoading(false)} />
      ) : (
        <SignIn />
      )}
    </SupabaseContext.Provider>
  )
}

export default App
