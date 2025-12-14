import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Container from '../../components/common/Container';
import { useAppSelector } from '../../hooks/hooks';
import { signOut } from '../../lib/api';
import { deleteMurmur, getMyMurmurs } from '../../lib/murmurApi';
import { getUserById } from '../../lib/userApi';
import { logout } from '../../store/slices/authSlice';
import { resetMurmurList } from '../../store/slices/murmursSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const authUser = useAppSelector(state => state.auth.user);

  const [userInfo, setUserInfo] = useState<any>(null);
  const [murmurs, setMurmurs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserInfo();
    loadMyMurmurs();
  }, []);

  const fetchUserInfo = async () => {
    if (!authUser?.id) return;
    const data = await getUserById(authUser.id);
    setUserInfo(data);
  };

  const loadMyMurmurs = async () => {
    setLoading(true);
    const data = await getMyMurmurs();
    setMurmurs(data ?? []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Murmur',
      'Are you sure you want to delete this murmur?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteMurmur(id);
            setMurmurs(prev => prev.filter(m => m.id !== id));
          },
        },
      ],
    );
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
    dispatch(resetMurmurList());
  };

  const renderMurmur = ({ item }: any) => (
    <View style={styles.murmurItem}>
      <Text style={styles.murmurText}>{item.text}</Text>

      <View style={styles.murmurFooter}>
        <View style={styles.likeBadge}>
          <Text style={styles.likeText}>❤️ {item.like_count}</Text>
        </View>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.profileHeader}>
      <View style={styles.coverContainer}>
        <View style={styles.coverImage} />
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar} />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.nameText}>{userInfo?.name || 'Anonymous'}</Text>
        <Text style={styles.emailText}>{authUser?.email}</Text>

        <View style={styles.followRow}>
          <View>
            <Text style={styles.followCount}>
              {userInfo?.following_count || 0}
            </Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>
          <View>
            <Text style={styles.followCount}>
              {userInfo?.follower_count || 0}
            </Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Container containerStyle={{ flex: 1 }}>
      <FlatList
        data={murmurs}
        keyExtractor={item => item.id}
        renderItem={renderMurmur}
        refreshing={loading}
        onRefresh={loadMyMurmurs}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No murmurs yet</Text>
        }
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    marginBottom: 20,
  },
  coverContainer: {
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  coverImage: {
    flex: 1,
    backgroundColor: '#cfd8dc',
  },

  avatarWrapper: {
    position: 'absolute',
    bottom: -30,
    left: 10,
  },
  avatar: {
    height: 72,
    width: 72,
    borderRadius: 36,
    backgroundColor: '#90a4ae',
    borderWidth: 3,
    borderColor: '#fff',
  },

  profileInfo: {
    paddingTop: 44,
    paddingHorizontal: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
  },
  emailText: {
    color: '#666',
    marginTop: 2,
  },

  followRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 32,
  },
  followCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  followLabel: {
    fontSize: 12,
    color: '#666',
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
  },

  murmurItem: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  murmurText: {
    fontSize: 15,
    lineHeight: 20,
  },
  murmurFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  likeBadge: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  likeText: {
    fontSize: 12,
    color: '#555',
  },
  deleteText: {
    fontSize: 12,
    color: '#e53935',
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },

  logoutBtn: {
    margin: 20,
    marginBottom: 0,
    padding: 14,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
