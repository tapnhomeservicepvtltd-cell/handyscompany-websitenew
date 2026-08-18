import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ApiError } from '@/services/api/client';
import { Booking, BookingStatus, getMyBookings } from '@/services/api/bookings';

const filters: { label: string; value?: BookingStatus }[] = [
  { label: 'All' },
  { label: 'Upcoming', value: 'CONFIRMED' },
  { label: 'Active', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
];

const statusColors: Record<BookingStatus, string> = {
  PENDING: '#B45309', CONFIRMED: '#2563EB', ASSIGNED: '#7C3AED', IN_PROGRESS: '#0891B2', COMPLETED: '#15803D', CANCELLED: '#DC2626', REFUNDED: '#64748B',
};

export default function BookingsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Booking[]>([]);
  const [status, setStatus] = useState<BookingStatus | undefined>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const response = await getMyBookings(1, status);
      setItems(response.items);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Bookings could not be loaded.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [status]);

  useFocusEffect(useCallback(() => { void load(); }, [load]));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}><Text style={styles.title}>My Bookings</Text><Text style={styles.subtitle}>Manage every service in one place</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((filter) => <Pressable key={filter.label} onPress={() => setStatus(filter.value)} style={[styles.filter, status === filter.value && styles.filterActive]}><Text style={[styles.filterText, status === filter.value && styles.filterTextActive]}>{filter.label}</Text></Pressable>)}
      </ScrollView>
      {loading ? <View style={styles.center}><ActivityIndicator color="#00A651" /><Text style={styles.hint}>Loading your bookings…</Text></View> : error ? <View style={styles.center}><MaterialCommunityIcons name="cloud-alert-outline" size={42} color="#DC2626" /><Text style={styles.error}>{error}</Text><Pressable onPress={() => void load()} style={styles.primary}><Text style={styles.primaryText}>Try again</Text></Pressable></View> : <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void load(true)} />} contentContainerStyle={styles.list}>
        {items.length === 0 ? <View style={styles.center}><MaterialCommunityIcons name="calendar-blank-outline" size={46} color="#94A3B8" /><Text style={styles.emptyTitle}>No bookings found</Text><Text style={styles.hint}>Your booked services will appear here.</Text><Pressable onPress={() => router.replace('/(tabs)' as never)} style={styles.primary}><Text style={styles.primaryText}>Explore services</Text></Pressable></View> : items.map((booking) => <Pressable key={booking.id} onPress={() => router.push(`/bookings/${booking.id}` as never)} style={styles.card}><View style={styles.cardHeader}><Text style={styles.service}>{booking.service.name}</Text><Text style={[styles.status, { color: statusColors[booking.status] }]}>{booking.status.replaceAll('_', ' ')}</Text></View><Text style={styles.address}>{booking.address.addressLine1}, {booking.address.city}</Text><View style={styles.cardFooter}><Text style={styles.date}>{new Date(booking.scheduledAt).toLocaleString()}</Text><Text style={styles.amount}>₹{booking.finalAmount}</Text></View></Pressable>)}
      </ScrollView>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safeArea:{flex:1,backgroundColor:'#F8FAFC'},header:{padding:20,paddingBottom:10},title:{fontSize:25,fontWeight:'800',color:'#0F172A'},subtitle:{fontSize:13,color:'#64748B',marginTop:4},filters:{paddingHorizontal:16,paddingVertical:10,gap:8},filter:{paddingHorizontal:15,paddingVertical:9,borderRadius:20,backgroundColor:'#E2E8F0'},filterActive:{backgroundColor:'#00A651'},filterText:{fontSize:13,fontWeight:'700',color:'#475569'},filterTextActive:{color:'#FFF'},list:{padding:16,gap:12,paddingBottom:36},card:{backgroundColor:'#FFF',borderRadius:16,padding:16,borderWidth:1,borderColor:'#E2E8F0'},cardHeader:{flexDirection:'row',justifyContent:'space-between',gap:10},service:{fontSize:16,fontWeight:'800',color:'#0F172A',flex:1},status:{fontSize:11,fontWeight:'800'},address:{fontSize:13,color:'#64748B',marginTop:8},cardFooter:{flexDirection:'row',justifyContent:'space-between',marginTop:14},date:{fontSize:12,color:'#475569',flex:1},amount:{fontSize:15,fontWeight:'900',color:'#0F172A'},center:{flex:1,alignItems:'center',justifyContent:'center',padding:28,gap:12},hint:{fontSize:13,color:'#64748B',textAlign:'center'},error:{fontSize:14,color:'#991B1B',textAlign:'center'},emptyTitle:{fontSize:17,fontWeight:'800',color:'#0F172A',marginTop:4},primary:{marginTop:6,backgroundColor:'#00A651',paddingHorizontal:18,paddingVertical:11,borderRadius:10},primaryText:{color:'#FFF',fontWeight:'800'} });
