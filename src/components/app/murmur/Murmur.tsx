import FastImage from '@d11/react-native-fast-image';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TMurmur } from '../../../types';
import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/api';

type MurmurProps = {
  item: TMurmur & { liked_by_user: boolean };
  currentUserId: string;
};

const Murmur: React.FC<MurmurProps> = ({ item }) => {
  const [liked, setLiked] = useState(item.liked_by_user);
  const [likeCount, setLikeCount] = useState(item.like_count);

  const handleLikeToggle = async () => {
    const user = await getCurrentUser();
    const currentUserId = user?.id;
    if (!currentUserId) return;
    if (liked) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', currentUserId)
        .eq('murmur_id', item.id);

      if (!error) {
        setLiked(false);
        setLikeCount(prev => prev - 1);
      }
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert([{ user_id: currentUserId, murmur_id: item.id }]);

      if (!error) {
        setLiked(true);
        setLikeCount(prev => prev + 1);
      }
    }
  };

  return (
    <View style={styles.murmurItem}>
      <View>
        <FastImage
          source={{
            uri: item?.users?.avatar_url || 'https://i.pravatar.cc/150?img=12',
          }}
          style={styles.avatar}
        />
      </View>
      <View>
        <Text style={styles.name}>{item?.users?.name}</Text>
        <Text>{item.text}</Text>
        <View style={styles.likeWrapper}>
          <Text>{likeCount} Likes</Text>
          <TouchableOpacity
            onPress={handleLikeToggle}
            style={styles.likeButton}
          >
            <Text
              style={[
                styles.like,
                liked && { color: 'red', fontWeight: 'bold' },
              ]}
            >
              {liked ? 'Unlike' : 'Like'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Murmur;

const styles = StyleSheet.create({
  murmurItem: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 8 },
  name: { fontWeight: 'bold' },
  likeButton: { marginLeft: 10 },
  like: { color: 'blue' },
  likeWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
});
