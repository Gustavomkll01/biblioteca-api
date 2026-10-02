import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Configure as variáveis do Supabase no arquivo .env.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)