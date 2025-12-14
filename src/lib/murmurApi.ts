import { getCurrentUser } from './api';
import { supabase } from './supabase';

export async function getTimeline(page = 0, pageSize = 10, followedIds: string[] = []) {
  // Fetch murmurs from followed users
  const from = page * pageSize;
  const to = (page + 1) * pageSize - 1;

  let query = supabase
    .from('murmurs')
    .select('id, text, author_id, like_count, created_at')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (followedIds.length > 0) {
    query = query.in('author_id', followedIds);
  }

  const { data, error } = await query;
  console.log('query', query)
  console.log(data)
  if (error) throw error;

  // Map user names
  return data.map((m: any) => ({
    ...m,
    author_name: m.users?.name,
  }));
}

export async function toggleLike(murmurId: string) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) throw new Error('Not authenticated');

  const { data: existingLike } = await supabase
    .from('likes')
    .select('*')
    .match({ user_id: user.id, murmur_id: murmurId })
    .single();

  if (existingLike) {
    await supabase.from('likes').delete().match({ user_id: user.id, murmur_id: murmurId });
    return false; // unliked
  } else {
    await supabase.from('likes').insert({ user_id: user.id, murmur_id: murmurId });
    return true; // liked
  }
}


export const createMurmur = async (text: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('murmurs')
    .insert({
      text,
      author_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};


export const getMyMurmurs = async () => {
  const user = await getCurrentUser();
  const { data } = await supabase
    .from('murmurs')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return data;
};

export const deleteMurmur = async (id: string) => {
  await supabase.from('murmurs').delete().eq('id', id);
};
