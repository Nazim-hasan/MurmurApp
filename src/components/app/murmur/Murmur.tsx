import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLikeToggle } from '../../../hooks/useLikeToggle';
import { TMurmur } from '../../../types';
import { Theme } from '../../../theme/Theme';
import { useAppSelector } from '../../../hooks/hooks';

type MurmurProps = {
  item: TMurmur;
  currentUserId: string;
};

const Murmur: React.FC<MurmurProps> = ({ item }) => {
  const user = useAppSelector(state => state.auth.user);
  const navigation = useNavigation<any>();
  const { liked, likeCount, toggleLike } = useLikeToggle({
    murmurId: item?.id,
    initialLiked: item?.liked_by_user ?? false,
    initialLikeCount: item?.like_count,
  });

  const handleDetails = () => {
    navigation.navigate('MurmurDetails', {
      murmur: item,
    });
  };

  const handleNavigateToProfile = () => {
    item?.users?.id === user?.id
      ? navigation.navigate('Profile')
      : navigation.navigate('FriendsProfile', {
          friendId: item?.users?.id,
        });
  };

  return (
    <TouchableOpacity style={styles.murmurItem} onPress={handleDetails}>
      <TouchableOpacity onPress={handleNavigateToProfile}>
        <FastImage
          source={{
            uri: item?.users?.avatar_url || 'https://i.pravatar.cc/150?img=12',
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.name} onPress={handleNavigateToProfile}>
          {item?.users?.name}
        </Text>
        <Text>{item?.text}</Text>
        <View style={styles.likeWrapper}>
          <Text>{likeCount} Likes</Text>
          <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
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
    </TouchableOpacity>
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
    width: '90%',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 8 },
  name: { fontWeight: 'bold', padding: 5, paddingLeft: 0 },
  likeButton: { marginLeft: 10 },
  like: { color: Theme.colors.primary },
  likeWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
});
