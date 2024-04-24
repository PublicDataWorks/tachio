import { Session } from '@supabase/supabase-js'
import { createContext } from 'react'

interface SupabaseContextObject {
  session: Session | null
}

export const SupabaseContext = createContext<SupabaseContextObject>({ session: null })
