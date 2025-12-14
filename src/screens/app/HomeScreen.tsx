import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Murmur from '../../components/app/murmur/Murmur';
import Container from '../../components/common/Container';
import { getTimeline } from '../../lib/murmurApi';
import { TMurmur } from '../../types';


export default function HomeScreen() {
  const [timeline, setTimeline] = useState<TMurmur[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    loadTimeline();
  }, []);

  const loadTimeline = async () => {
    setLoading(true);
    try {
      const data = await getTimeline(10, 0);
      setTimeline(data);
    } catch (err: any) {
      console.log('Error fetching murmurs:', err.message);
    }
    setLoading(false);
  };

  const renderItem = ({ item }: { item: TMurmur }) => <Murmur item={item} />;

  return (
    <>
      <Container
        containerStyle={{
          flex: 1,
        }}
      >
        {loading && timeline?.length === 0 ? (
          <ActivityIndicator style={{ marginTop: 50 }} size="large" />
        ) : (
          <FlatList
            data={timeline}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={loadTimeline}
            style={{ flex: 1 }}
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text>No murmurs yet.</Text>
              </View>
            }
          />
        )}
      </Container>

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateMurmur')}
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
});
