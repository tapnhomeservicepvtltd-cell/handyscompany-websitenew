import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { 
  ActivityIndicator, 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  RefreshControl,
  Image
} from 'react-native';

import { ApiError, apiRequest } from '@/services/api/client';
import { ServiceSearchResult } from '@/services/api/services';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { getServiceThumbnail } from '@/constants/serviceThumbnails';

export default function SearchScreen() {
  const router = useRouter();
  const { q = '' } = useLocalSearchParams<{ q?: string }>();
  
  const [query, setQuery] = useState(q);
  const [items, setItems] = useState<ServiceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const performSearch = async (searchQuery: string, pageNum = 1, isRefresh = false, isLoadMore = false) => {
    if (!searchQuery.trim()) {
      setItems([]);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    if (isRefresh) setRefreshing(true);
    else if (isLoadMore) setLoadingMore(true);
    else setLoading(true);
    
    if (!isLoadMore) setError(null);

    try {
      const response = await apiRequest<{ items: ServiceSearchResult[], meta?: { total: number } }>(
        `/api/v1/services?search=${encodeURIComponent(searchQuery.trim())}&page=${pageNum}&limit=15`, 
        { 
          authenticated: false, 
          signal: abortControllerRef.current.signal 
        }
      );
      
      const newItems = response.items || [];
      if (isLoadMore) {
        setItems(prev => [...prev, ...newItems]);
      } else {
        setItems(newItems);
      }
      
      const total = response.meta?.total || 0;
      const currentCount = isLoadMore ? items.length + newItems.length : newItems.length;
      setHasMore(newItems.length > 0 && currentCount < total);
      setPage(pageNum);
    } catch (caught: any) {
      if (caught.name === 'AbortError') return; // Ignore aborts
      
      if (!isLoadMore) {
        setError(caught instanceof ApiError ? caught.message : 'Search could not be completed.');
      }
    } finally {
      if (isRefresh) setRefreshing(false);
      else if (isLoadMore) setLoadingMore(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      const handler = setTimeout(() => {
        void performSearch(query, 1);
      }, 300);
      return () => clearTimeout(handler);
    } else {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      setItems([]);
      setError(null);
      setLoading(false);
    }
  }, [query]);

  const onRefresh = () => {
    if (query.trim()) {
      void performSearch(query, 1, true);
    }
  };

  const onLoadMore = () => {
    if (!loading && !loadingMore && !refreshing && hasMore && query.trim()) {
      void performSearch(query, page + 1, false, true);
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isCloseToBottom) {
      onLoadMore();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={25} color="#0F172A" />
        </Pressable>
        <Text style={styles.title}>Search services</Text>
        <View style={{ width: 25 }} />
      </View>
      <View style={styles.search}>
        <MaterialCommunityIcons name="magnify" size={21} color="#94A3B8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => void performSearch(query, 1)}
          returnKeyType="search"
          autoFocus
          placeholder="Search service"
          style={styles.input}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={20} color="#CBD5E1" />
          </Pressable>
        )}
      </View>
      {loading ? (
        <ScrollView contentContainerStyle={styles.results}>
          {[1, 2, 3, 4, 5].map(i => (
            <View key={i} style={[styles.card, { padding: 16 }]}>
               <Skeleton width={40} height={40} borderRadius={20} />
               <View style={{ flex: 1, marginLeft: 12 }}>
                 <Skeleton width={120} height={16} style={{ marginBottom: 6 }} />
                 <Skeleton width={80} height={12} />
               </View>
               <Skeleton width={50} height={20} />
            </View>
          ))}
        </ScrollView>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Pressable onPress={() => void performSearch(query, 1)} style={styles.primary}>
            <Text style={styles.primaryText}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView 
          contentContainerStyle={styles.results}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00A651" />
          }
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          {items.length ? (
            <>
              {items.map((item) => {
                const thumb = getServiceThumbnail(item.slug, item.category?.slug);
                const source = typeof thumb === 'string' ? { uri: thumb } : thumb;
                return (
                <Pressable key={item.id} onPress={() => router.push(`/service/${item.slug}` as never)} style={styles.card}>
                  <Image 
                    source={source} 
                    style={styles.thumbnail} 
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.category}>{item.category?.name || 'Service'} · {item.durationMin} min</Text>
                  </View>
                  <Text style={styles.price}>₹{item.basePrice}</Text>
                </Pressable>
                );
              })}
              {loadingMore && (
                <View style={{ padding: 16, alignItems: 'center' }}>
                  <ActivityIndicator color="#00A651" />
                </View>
              )}
            </>
          ) : query.trim() ? (
            <EmptyState 
              icon="search-outline" 
              title="No services found" 
              subtitle={`We couldn't find anything matching "${query}". Try different keywords.`} 
            />
          ) : (
            <EmptyState 
              icon="color-wand-outline" 
              title="What are you looking for?" 
              subtitle="Search for services like tap repair, fan repair, or home cleaning." 
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { height: 58, backgroundColor: '#FFF', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#E2E8F0' },
  title: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  search: { height: 52, margin: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 9 },
  input: { flex: 1, fontSize: 15, color: '#0F172A' },
  results: { padding: 16, gap: 10, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumbnail: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EAF9F0' },
  name: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  category: { fontSize: 12, color: '#64748B', marginTop: 3 },
  price: { fontSize: 15, fontWeight: '900', color: '#0F172A' },
  center: { alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12, flex: 1 },
  error: { color: '#991B1B', textAlign: 'center', fontSize: 15, fontWeight: '500' },
  primary: { backgroundColor: '#00A651', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  primaryText: { color: '#FFF', fontWeight: '800' }
});
