import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setTimeline, appendTimeline, incrementLike, decrementLike } from '../store/slices/murmursSlice';

import { supabase } from '../lib/supabase';
import { getTimeline, toggleLike } from '../lib/murmurApi';
import Container from '../components/common/Container';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const timeline = useSelector((state: RootState) => state.murmurs.timeline);
  const page = useSelector((state: RootState) => state.murmurs.page);
  const hasMore = useSelector((state: RootState) => state.murmurs.hasMore);

  const [loading, setLoading] = useState(false);

  // Fetch followed users
  const [followedIds, setFollowedIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFollowed() {
      const { data, error } = await supabase
        .from('follows')
        .select('followed_id')
        .eq('follower_id', (await supabase.auth.getUser()).data.user?.id);

      if (!error && data) {
        setFollowedIds(data.map((f: any) => f.followed_id));
      }
    }
    fetchFollowed();
  }, []);

  // Fetch first page
  useEffect(() => {
    // if (followedIds.length === 0) return;

    loadTimeline(0);
  }, []);

  const loadTimeline = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await getTimeline(pageNumber, 10, followedIds);
      console.log('data', data)
      if (pageNumber === 0) {
        dispatch(setTimeline(data));
      } else {
        dispatch(appendTimeline(data));
      }
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const handleLike = async (murmurId: string) => {
    try {
      const liked = await toggleLike(murmurId);
      if (liked) dispatch(incrementLike(murmurId));
      else dispatch(decrementLike(murmurId));
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.author_name || 'Unknown'}</Text>
      <Text>{item.text}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <Text>{item.like_count} Likes</Text>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={{ marginLeft: 10 }}>
          <Text style={{ color: 'blue' }}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const EmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text>No murmurs to display.</Text>
        <Text>Follow users to see their murmurs here.</Text>
      </View>
    );
  }

  const ListHeaderComponent = () => (
    <TouchableOpacity style={{ padding: 10, backgroundColor: '#eeeeeeff', marginBottom: 10, borderWidth: 1, borderColor: '#ccc' }}>
      <Text>Add new murmur</Text>
    </TouchableOpacity>
  )

  return (
    <Container>
      
        <FlatList
          data={timeline}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          // onEndReached={() => {
          //   if (hasMore && !loading) loadTimeline(page + 1);
          // }}
          ListHeaderComponent={ListHeaderComponent}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          ListEmptyComponent={EmptyComponent}
        />
      
    </Container>
  );
}
