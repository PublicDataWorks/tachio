import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { SupabaseContext } from '../SupabaseContext.ts'
import SignIn from '../pages/SignIn.tsx'
import { useNavigate } from 'react-router-dom'

interface PrivateRouteProperties {
  children: ReactNode
}

const PrivateRoute: FC<PrivateRouteProperties> = ({ children }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { session } = useContext(SupabaseContext)!

  useEffect(() => {
    if (!session) {
      navigate('/sign-in')
    }
    // setIsLoading(false)
  }, [session])

  if (isLoading) {
    console.log("adasdsd")
    return <b>Loading...</b>
  }
  return children
}

export default PrivateRoute
