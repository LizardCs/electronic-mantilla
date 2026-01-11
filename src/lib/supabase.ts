import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan las variables de entorno de Supabase en el archivo .env")
}

// Aquí TypeScript ya sabe que son strings porque pasaron el filtro del IF
export const supabase = createClient(supabaseUrl, supabaseAnonKey)