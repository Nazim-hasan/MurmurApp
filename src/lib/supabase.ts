import { createClient, processLock } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import { supabaseStorage } from '../storage/supabaseStorage';

const SUPABASE_URL = 'https://daxyjxoujdcbufwwlipo.supabase.co'; //TODO replace
const SUPABASE_ANON_KEY = 'sb_publishable_8b5qtavrQCP6otNmyuwjFA_t0lYrLWk'; //TODO replace

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: supabaseStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  }
);

if (Platform.OS !== "web") {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}
