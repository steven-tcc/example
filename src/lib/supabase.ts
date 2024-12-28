import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and API key
const SUPABASE_URL = 'https://xxbdbespiihcebolvedr.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YmRiZXNwaWloY2Vib2x2ZWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMTg2NTEsImV4cCI6MjA1MDc5NDY1MX0.r4mz3nXew_obyoYgPH61UaNpwB4NNbzafVjhZPPswGg';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
