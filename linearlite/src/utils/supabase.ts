import { createClient } from '@supabase/supabase-js'

// Supabase
const supabaseUrl = import.meta.env.ELECTRIC_SUPABASE_URL
const anonKey = import.meta.env.ELECTRIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, anonKey)
export { supabase }
