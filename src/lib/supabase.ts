/**
 * Supabase client — placeholder for future integration.
 * Currently unused; DB operations use local SQLite via db.ts.
 * When Supabase is configured, add NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  // Dynamic import to avoid bundling @supabase/supabase-js when not configured
  return null;
}

export { supabaseUrl, supabaseAnonKey };
