import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLikeToggle } from '../../../hooks/useLikeToggle';
import { TMurmur } from '../../../types';
import { Theme } from '../../../theme/Theme';

type MurmurProps = {
  item: TMurmur & { liked_by_user: boolean };
  currentUserId: string;
};

const Murmur: React.FC<MurmurProps> = ({ item }) => {
  const navigation = useNavigation();
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
    navigation.navigate('FriendsProfile', {
      friendId: item?.users.id,
    });
  }

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
        <Text style={styles.name}
        onPress={handleNavigateToProfile}>{item?.users?.name}</Text>
        <Text
        >{item?.text}</Text>
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
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 8 },
  name: { fontWeight: 'bold', padding: 5,paddingLeft: 0 },
  likeButton: { marginLeft: 10 },
  like: { color: Theme.colors.primary },
  likeWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
});
