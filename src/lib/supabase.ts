import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://daxyjxoujdcbufwwlipo.supabase.co'; //TODO replace
const SUPABASE_ANON_KEY = 'sb_publishable_8b5qtavrQCP6otNmyuwjFA_t0lYrLWk'; //TODO replace

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
