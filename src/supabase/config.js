import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

// Supabase equivalents
const projectFirestore = supabase // use supabase.from('table_name') for database
const projectAuth = supabase.auth
const projectStorage = supabase.storage
// const timestamp = () => new Date() // Supabase uses JS Date objects for timestamps
const timestamp = (v) => new Date(v).toISOString()
export { projectFirestore, projectAuth, timestamp, projectStorage, supabase }