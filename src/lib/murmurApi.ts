import { getCurrentUser } from './api';
import { supabase } from './supabase';

import { TMurmur } from '../types';

export const getTimeline = async (
  limit = 10,
  offset = 0,
): Promise<(TMurmur & { liked_by_user: boolean })[]> => {
  const user = await getCurrentUser();
  const { data: murmurs, error } = await supabase
    .from('murmurs')
    .select(
      `
      id,
      text,
      like_count,
      created_at,
      users!author_id (id, name, avatar_url)
    `,
    )
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching murmurs:', error.message);
    return [];
  }

  if (!murmurs || murmurs.length === 0) return [];

  const murmurIds = murmurs.filter(m => m.like_count > 0).map(m => m.id);

  let likedMap: Record<string, boolean> = {};
  if (murmurIds.length > 0) {
    const { data: likesData, error: likesError } = await supabase
      .from('likes')
      .select('murmur_id')
      .in('murmur_id', murmurIds)
      .eq('user_id', user?.id);

    if (!likesError && likesData) {
      likedMap = likesData.reduce((acc, like) => {
        acc[like.murmur_id] = true;
        return acc;
      }, {} as Record<string, boolean>);
    }
  }
  return murmurs.map(m => ({
    ...m,
    liked_by_user: likedMap[m.id] ?? false,
  }));
};


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
    .eq('author_id', user?.id)
    .order('created_at', { ascending: false });

  return data;
};
export const getMurmursByUserId = async (userId: string) => {
  const { data } = await supabase
    .from('murmurs')
    .select(
      `
      id,
      text,
      like_count,
      created_at,
      users!author_id (id, name, avatar_url)
    `,)
    .eq('author_id', userId)

    
    .order('created_at', { ascending: false });

  return data;
};



export const deleteMurmur = async (id: string) => {
  await supabase.from('murmurs').delete().eq('id', id);
};
