import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpbodmsamfyaadpulnes.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYm9kbXNhbWZ5YWFkcHVsbmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTEzNzMsImV4cCI6MjA2OTEyNzM3M30.wWaP8pi1HIKW7NtZX1EVPzfqg1qhf0C3pLMJyJkL1YU'
const supabase = createClient(supabaseUrl, supabaseKey)

// Supabase equivalents
const projectFirestore = supabase // use supabase.from('table_name') for database
const projectAuth = supabase.auth
const projectStorage = supabase.storage
const timestamp = () => new Date() // Supabase uses JS Date objects for timestamps

export { projectFirestore, projectAuth, timestamp, projectStorage, supabase }