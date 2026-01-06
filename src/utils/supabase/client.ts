import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for browser-side operations (Client Components)
 * Uses environment variables for configuration
 * Handles cookies automatically for session management
 */
export function createClient() {
  // Try both possible variable names for the anon key
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    const missing = []
    if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
    if (!supabaseAnonKey) {
      missing.push('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    
    console.error('Missing Supabase environment variables:', missing)
    console.error('Please create a .env.local file in the project root with:')
    console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key')
    
    throw new Error(
      `Missing Supabase environment variables: ${missing.join(', ')}. ` +
      `Please create a .env.local file in the project root. See .env.local.example for reference.`
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

