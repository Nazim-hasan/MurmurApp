import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../lib/api';

type UseLikeToggleProps = {
  murmurId: string;
  initialLiked: boolean;
  initialLikeCount: number;
};

export const useLikeToggle = ({
  murmurId,
  initialLiked,
  initialLikeCount,
}: UseLikeToggleProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = useCallback(async () => {
    if (loading) return;

    const user = await getCurrentUser();
    const userId = user?.id;
    if (!userId) return;

    setLoading(true);

    // Optimistic UI update
    if (liked) {
      setLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }

    const { error } = liked
      ? await supabase
          .from('likes')
          .delete()
          .eq('user_id', userId)
          .eq('murmur_id', murmurId)
      : await supabase
          .from('likes')
          .insert({ user_id: userId, murmur_id: murmurId });

    // Rollback on failure
    if (error) {
      console.error('Like toggle failed:', error.message);

      if (liked) {
        setLiked(true);
        setLikeCount(prev => prev + 1);
      } else {
        setLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      }
    }

    setLoading(false);
  }, [liked, murmurId, loading]);

  return {
    liked,
    likeCount,
    toggleLike,
    loading,
  };
};
