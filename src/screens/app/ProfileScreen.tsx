import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Container from '../../components/common/Container';
import { useAppSelector } from '../../hooks/hooks';
import { signOut } from '../../lib/api';
import { logout } from '../../store/slices/authSlice';
import { deleteMurmur, getMyMurmurs } from '../../lib/murmurApi';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.auth.user);

  const [murmurs, setMurmurs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMyMurmurs();
  }, []);

  const loadMyMurmurs = async () => {
    setLoading(true);
    const data = await getMyMurmurs();
    setMurmurs(data ?? []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Murmur', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMurmur(id);
          setMurmurs(prev => prev.filter(m => m.id !== id));
        },
      },
    ]);
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
  };

  const renderMurmur = ({ item }) => (
    <View style={styles.murmurItem}>
      <Text style={styles.murmurText}>{item.text}</Text>

      <View style={styles.murmurFooter}>
        <Text style={styles.likeText}>❤️ {item.like_count}</Text>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <Container>
      {/* USER INFO */}
      <View style={styles.profileHeader}>
        <Text style={styles.nameText}>
          {user?.name || 'Anonymous'}
        </Text>
        <Text style={styles.emailText}>{user?.email}</Text>

        <View style={styles.followRow}>
          <Text>Following: 0</Text>
          <Text>Followers: 0</Text>
        </View>
      </View>

      {/* MY MURMURS */}
      <Text style={styles.sectionTitle}>My Murmurs</Text>

      <FlatList
        data={murmurs}
        keyExtractor={item => item.id}
        renderItem={renderMurmur}
        refreshing={loading}
        onRefresh={loadMyMurmurs}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No murmurs yet</Text>
        }
      />

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emailText: {
    color: '#666',
    marginTop: 4,
  },
  followRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '60%',
  },
  sectionTitle: {
    marginVertical: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  murmurItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginBottom: 10,
  },
  murmurText: {
    fontSize: 14,
  },
  murmurFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  likeText: {
    color: '#666',
  },
  deleteText: {
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  logoutBtn: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
