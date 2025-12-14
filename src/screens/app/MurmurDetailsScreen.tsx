import FastImage from '@d11/react-native-fast-image';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../assets/svg/CloseIcon';
import { useLikeToggle } from '../../hooks/useLikeToggle';
import { Theme } from '../../theme/Theme';
import { useAppSelector } from '../../hooks/hooks';

const MurmurDetailsScreen = () => {
  const user = useAppSelector(state => state.auth.user);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const handleClose = () => {
    navigation.goBack();
  };

  const murmur = route.params?.murmur;

  const { liked, likeCount, toggleLike } = useLikeToggle({
    murmurId: murmur?.id,
    initialLiked: murmur?.liked_by_user ?? false,
    initialLikeCount: murmur?.like_count,
  });

    const handleNavigateToProfile = () => {
    navigation.navigate('FriendsProfile', {
      friendId: murmur?.users?.id,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === 'android' ? 30 : 0,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.userInfo} onPress={handleNavigateToProfile}>
          <FastImage
            source={{
              uri:
                murmur?.users?.avatar_url || 'https://i.pravatar.cc/150?img=12',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{murmur?.users?.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClose}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.contentBox}>
        <Text>{murmur?.text}</Text>
      </View>

      <View style={styles.likeWrapper}>
        <Text>{likeCount} Likes</Text>
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Text style={[styles.like, liked && styles.liked]}>
            {liked ? 'Unlike' : 'Like'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MurmurDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  userInfo: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },

  name: {
    fontWeight: 'bold',
  },

  contentBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: Theme.colors.gray500,
    borderRadius: 8,
  },

  likeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 5,
  },

  likeButton: {
    marginLeft: 10,
  },

  like: {
    color: 'blue',
  },

  liked: {
    color: 'red',
    fontWeight: 'bold',
  },
});
