import { supabase } from "./supabase";


export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, username, avatar_url, follower_count, following_count, created_at')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
