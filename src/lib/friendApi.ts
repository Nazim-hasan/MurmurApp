import { getCurrentUser } from './api';
import { supabase } from './supabase';

export const fetchFollowedIds = async () => {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('follows')
    .select('followed_id')
    .eq('follower_id', user?.id);

  if (!error && data) {
    const followedIds = data.map((f: any) => f.followed_id);
    return followedIds;
  }
};

export const checkIfFollowing = async (friendId: string) => {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', user?.id)
    .eq('followed_id', friendId)
    .single();
  if (!error && data) {
    return true;
  }
  return false;
};

export const followFriendById = async (friendId: string) => {
  const currentUser = await getCurrentUser();
  const { error: followError } = await supabase
    .from('follows')
    .insert([{ follower_id: currentUser?.id, followed_id: friendId }]);
  return followError;
};

export const unfollowFriendById = async (friendId: string) => {
  const currentUser = await getCurrentUser();
  const { error: unfollowError } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', currentUser?.id)
    .eq('followed_id', friendId);
  return unfollowError;
};
