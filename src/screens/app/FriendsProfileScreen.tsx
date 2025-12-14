import FastImage from '@d11/react-native-fast-image';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../../components/common/Container';
import Murmur from '../../components/app/murmur/Murmur';
import { getUserById } from '../../lib/userApi';
import { getMurmursByUserId } from '../../lib/murmurApi';
import { Theme } from '../../theme/Theme';
import { checkIfFollowing, followFriendById, unfollowFriendById } from '../../lib/friendApi';

const FriendsProfileScreen = () => {
  const route = useRoute<any>();
  const friendId = route.params?.friendId;

  const [userDetail, setUserDetail] = useState<any>(null);
  const [murmurs, setMurmurs] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);



  const getUserInfo = async () => {
    const user = await getUserById(friendId);
    const murmurList = await getMurmursByUserId(friendId);
    setUserDetail(user);
    setMurmurs(murmurList);
  };



  useEffect(() => {
    if (friendId) {
      getUserInfo();
      checkIfFollowing(friendId).then((status) => {
        setIsFollowing(status);
      });
    };
  }, [friendId]);


    const handleFollowToggle = async () => {
  
      if (isFollowing) {
        await unfollowFriendById(friendId);
        setIsFollowing(false);
      } else {
        await followFriendById(friendId);
        setIsFollowing(true);
      }
    };


  const renderItem = ({ item }: any) => <Murmur item={item} />;

  return (
    <Container containerStyle={{
      flex: 1,
    }}>
      {/* Cover */}
      <View style={styles.coverContainer}>
        <View style={styles.coverImage} />

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <FastImage
            source={{
              uri:
                userDetail?.avatar_url ||
                'https://i.pravatar.cc/150?img=12',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Text style={styles.nameText}>
          {userDetail?.name || 'Anonymous'}
        </Text>

        <View style={styles.followRow}>
          <View style={styles.followItem}>
            <Text style={styles.followCount}>
              {userDetail?.following_count || 0}
            </Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>

          <View style={styles.followItem}>
            <Text style={styles.followCount}>
              {userDetail?.follower_count || 0}
            </Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
        </View>

        {/* Follow Button (logic-ready) */}
        <TouchableOpacity style={styles.followButton} onPress={handleFollowToggle}>
          <Text style={styles.followButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
        </TouchableOpacity>
      </View>

      {/* Murmurs */}
      <View style={styles.murmurSection}>

        <FlatList
          data={murmurs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {isFollowing ? 'No murmurs yet.' : 'Follow user to see their murmurs.'}
            </Text>
          }
        />
      </View>
    </Container>
  );
};

export default FriendsProfileScreen;


const styles = StyleSheet.create({
  coverContainer: {
    height: 140,
    backgroundColor: '#f0f0f0',
  },
  coverImage: {
    flex: 1,
    backgroundColor: '#cfd8dc',
  },

  avatarWrapper: {
    position: 'absolute',
    bottom: -36,
    left: 20,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },

  profileInfo: {
    paddingTop: 48,
    paddingHorizontal: 20,
  },

  nameText: {
    fontSize: 22,
    fontWeight: '700',
  },

  followRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 32,
  },
  followItem: {
    alignItems: 'center',
  },
  followCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  followLabel: {
    fontSize: 12,
    color: '#666',
  },

  followButton: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
  },
  followButtonText: {
    color: Theme.colors.white,
    fontWeight: '600',
  },

  murmurSection: {
    marginTop: 24,
    paddingHorizontal: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
  },
});
