import { createClient } from '@supabase/supabase-js'

// Supabase
const supabaseUrl = import.meta.env.ELECTRIC_SUPABASE_URL
const anonKey = import.meta.env.ELECTRIC_SUPABASE_ANON_KEY
console.log(supabaseUrl, anonKey)
const supabase = createClient(supabaseUrl, anonKey)
async function getSupabaseJWT() {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) {
    throw new Error('No token')
  }
  return token
}

export { supabase, getSupabaseJWT }
