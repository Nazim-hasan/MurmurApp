import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Murmur from '../../components/app/murmur/Murmur';
import Container from '../../components/common/Container';
import { getTimeline } from '../../lib/murmurApi';
import { Theme } from '../../theme/Theme';
import { TMurmur } from '../../types';

const LIMIT = 10;

export default function HomeScreen() {
  const [timeline, setTimeline] = useState<TMurmur[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    loadTimeline(0, true);
  }, []);

  const loadTimeline = async (pageNumber: number, reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);

    try {
      const offset = pageNumber * LIMIT;
      const data = await getTimeline(LIMIT, offset);

      setTimeline(prev =>
        reset ? data : [...prev, ...data],
      );

      setHasMore(data.length === LIMIT);
      setPage(pageNumber);
    } catch (err: any) {
      console.log('Error fetching murmurs:', err.message);
    }

    setLoading(false);
    if (reset) setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    loadTimeline(0, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadTimeline(page + 1);
    }
  };

  const renderItem = ({ item }: { item: TMurmur }) => (
    <Murmur item={item} />
  );

  const navigateToFriends = () => {
    navigation.navigate('Friends' as never);
  };

  const handleCreate = () => {
    navigation.navigate('CreateMurmur' as never);
  }

  return (
    <>
      <Container containerStyle={{ flex: 1 }}>
        {loading && timeline.length === 0 ? (
          <ActivityIndicator style={{ marginTop: 50 }} size="large" />
        ) : (
          <FlatList
            data={timeline}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && timeline.length > 0 ? (
                <ActivityIndicator style={{ marginVertical: 16 }} />
              ) : null
            }
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text>No murmurs yet.</Text>
                <Text>
                  Follow{' '}
                  <Text
                    onPress={navigateToFriends}
                    style={styles.friendLink}
                  >
                    friends
                  </Text>{' '}
                  to see their murmurs here.
                </Text>
              </View>
            }
          />
        )}
      </Container>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreate}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </>
  );
}


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  friendLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: Theme.colors.primary,
    lineHeight: 20,
  },
});
