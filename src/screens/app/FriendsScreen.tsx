import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../../components/common/Container';
import { useAppSelector } from '../../hooks/hooks';
import {
  fetchFollowedIds,
  followFriendById,
  getAllRecentUsers,
  unfollowFriendById,
} from '../../lib/friendApi';

type User = {
  id: string;
  name: string;
  avatar_url?: string;
  follower_count?: number;
  following_count?: number;
};

const FriendsScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [followIds, setFollowIds] = useState<string[]>([]);

  const currentUser = useAppSelector(state => state.auth.user);

  useEffect(() => {
    fetchUsers();
    getFollowerIds();
  }, []);

  const getFollowerIds = async () => {
    const ids = await fetchFollowedIds(currentUser?.id);
    setFollowIds(ids || []);
  };

  const fetchUsers = async () => {
    setLoading(true);


    const data = await getAllRecentUsers(currentUser);
    if (data) setUsers(data);



    setLoading(false);
  };

  const handleFollowToggle = async (userId: string) => {
    const isFollowing = followIds.includes(userId);

    if (isFollowing) {
      const unfollowError = await unfollowFriendById(userId);

      if (!unfollowError) {
        setFollowIds(prev => prev.filter(id => id !== userId));
        fetchUsers();
      }
    } else {
      const followError = await followFriendById(userId);

      if (!followError) {
        setFollowIds(prev => [...prev, userId]);
        fetchUsers();
      }
    }
  };

  const renderItem = ({ item }: { item: User }) => {
    const isFollowing = followIds.includes(item.id);

    return (
      <View style={styles.userItem}>
        <Image
          source={{
            uri: item.avatar_url || 'https://i.pravatar.cc/150?img=12',
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subText}>
            Followers: {item.follower_count || 0} | Following:{' '}
            {item.following_count || 0}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            isFollowing ? styles.unfollowBtn : styles.followBtn,
          ]}
          onPress={() => handleFollowToggle(item.id)}
        >
          <Text style={styles.buttonText}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading)
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  return (
    <Container>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text>No users found.</Text>}
      />
    </Container>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  followBtn: {
    backgroundColor: '#1DA1F2',
  },
  unfollowBtn: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
