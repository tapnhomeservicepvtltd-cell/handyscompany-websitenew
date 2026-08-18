import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ApiError } from '@/services/api/client';
import { Booking, cancelBooking, getBooking } from '@/services/api/bookings';

const cancellable = new Set(['PENDING', 'CONFIRMED', 'ASSIGNED']);
const reschedulable = new Set(['PENDING', 'CONFIRMED']);

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!id) return;
    setLoading(true); setError(null);
    try { setBooking(await getBooking(id)); }
    catch (caught) { setError(caught instanceof ApiError ? caught.message : 'Booking details could not be loaded.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, [id]);

  const cancel = () => Alert.alert('Cancel booking?', 'This action cannot be undone.', [
    { text: 'Keep booking', style: 'cancel' },
    { text: 'Cancel booking', style: 'destructive', onPress: () => void cancelBookingRequest() },
  ]);

  const cancelBookingRequest = async () => {
    if (!booking) return;
    setCancelling(true);
    try { setBooking(await cancelBooking(booking.id, 'Cancelled by customer')); }
    catch (caught) { Alert.alert('Unable to cancel', caught instanceof ApiError ? caught.message : 'Please try again.'); }
    finally { setCancelling(false); }
  };

  if (loading) return <SafeAreaView style={styles.center}><ActivityIndicator color="#00A651" /></SafeAreaView>;
  if (error || !booking) return <SafeAreaView style={styles.center}><MaterialCommunityIcons name="alert-circle-outline" size={42} color="#DC2626" /><Text style={styles.error}>{error ?? 'Booking not found.'}</Text><Pressable onPress={() => void load()} style={styles.primary}><Text style={styles.primaryText}>Try again</Text></Pressable></SafeAreaView>;

  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.header}><Pressable onPress={() => router.back()} hitSlop={10}><MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" /></Pressable><Text style={styles.title}>Booking details</Text><View style={styles.spacer} /></View>
    <View style={styles.hero}><Text style={styles.heroStatus}>{booking.status.replaceAll('_', ' ')}</Text><Text style={styles.bookingNumber}>#{booking.bookingNumber}</Text></View>
    <Section title="Service"><Row icon="tools" label={booking.service.name} /><Row icon="calendar-clock" label={new Date(booking.scheduledAt).toLocaleString()} /><Row icon="map-marker-outline" label={`${booking.address.addressLine1}, ${booking.address.city}`} /></Section>
    <Section title="Payment"><View style={styles.amountRow}><Text style={styles.muted}>Total payable</Text><Text style={styles.amount}>₹{booking.finalAmount}</Text></View></Section>
    {booking.statusHistory?.length ? <Section title="Booking timeline">{booking.statusHistory.map((entry) => <View key={entry.id} style={styles.timeline}><View style={styles.dot} /><View style={styles.timelineText}><Text style={styles.timelineTitle}>{entry.status.replaceAll('_', ' ')}</Text>{entry.note ? <Text style={styles.muted}>{entry.note}</Text> : null}<Text style={styles.timestamp}>{new Date(entry.createdAt).toLocaleString()}</Text></View></View>)}</Section> : null}
    {booking.paymentStatus !== 'PAID' && booking.status !== 'CANCELLED' ? <Pressable onPress={() => router.push(`/payments/${booking.id}` as never)} style={styles.pay}><Text style={styles.payText}>Pay securely</Text></Pressable> : null}
    {['ASSIGNED', 'IN_PROGRESS'].includes(booking.status) ? <Pressable onPress={() => router.push(`/tracking/${booking.id}` as never)} style={styles.reschedule}><Text style={styles.rescheduleText}>Track technician live</Text></Pressable> : null}
    {booking.status === 'COMPLETED' && !booking.review ? <Pressable onPress={() => router.push(`/bookings/review/${booking.id}` as never)} style={styles.reschedule}><Text style={styles.rescheduleText}>Rate your service</Text></Pressable> : null}
    {booking.status === 'COMPLETED' ? <Pressable onPress={() => router.push(`/bookings/evidence/${booking.id}` as never)} style={styles.reschedule}><Text style={styles.rescheduleText}>View before & after photos</Text></Pressable> : null}
    {booking.status === 'COMPLETED' ? <Pressable onPress={() => router.push(`/bookings/job-card/${booking.id}` as never)} style={styles.reschedule}><Text style={styles.rescheduleText}>View digital job card</Text></Pressable> : null}
    {reschedulable.has(booking.status) ? <Pressable onPress={() => router.push(`/bookings/reschedule/${booking.id}` as never)} style={styles.reschedule}><Text style={styles.rescheduleText}>Reschedule booking</Text></Pressable> : null}
    {cancellable.has(booking.status) ? <Pressable disabled={cancelling} onPress={cancel} style={styles.cancel}>{cancelling ? <ActivityIndicator color="#B91C1C" /> : <Text style={styles.cancelText}>Cancel booking</Text>}</Pressable> : null}
  </ScrollView></SafeAreaView>;
}

function Section({ title, children }: { title: string; children: ReactNode }) { return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{children}</View>; }
function Row({ icon, label }: { icon: ComponentProps<typeof MaterialCommunityIcons>['name']; label: string }) { return <View style={styles.row}><MaterialCommunityIcons name={icon} size={20} color="#00A651" /><Text style={styles.rowText}>{label}</Text></View>; }

const styles = StyleSheet.create({safeArea:{flex:1,backgroundColor:'#F8FAFC'},content:{padding:16,paddingBottom:36},center:{flex:1,alignItems:'center',justifyContent:'center',gap:12,padding:24,backgroundColor:'#F8FAFC'},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:20},title:{fontSize:19,fontWeight:'800',color:'#0F172A'},spacer:{width:26},hero:{backgroundColor:'#E6F6ED',borderRadius:16,padding:18,marginBottom:14},heroStatus:{fontSize:15,fontWeight:'900',color:'#067647'},bookingNumber:{fontSize:13,color:'#475569',marginTop:4},section:{backgroundColor:'#FFF',borderRadius:16,borderWidth:1,borderColor:'#E2E8F0',padding:16,marginBottom:14},sectionTitle:{fontSize:15,fontWeight:'800',color:'#0F172A',marginBottom:12},row:{flexDirection:'row',gap:10,alignItems:'center',paddingVertical:8},rowText:{fontSize:14,color:'#334155',flex:1},amountRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},muted:{fontSize:13,color:'#64748B'},amount:{fontSize:20,fontWeight:'900',color:'#0F172A'},timeline:{flexDirection:'row',gap:10,paddingBottom:14},dot:{width:10,height:10,borderRadius:5,backgroundColor:'#00A651',marginTop:4},timelineText:{flex:1},timelineTitle:{fontSize:14,fontWeight:'800',color:'#0F172A'},timestamp:{fontSize:11,color:'#94A3B8',marginTop:3},primary:{backgroundColor:'#00A651',paddingHorizontal:18,paddingVertical:11,borderRadius:10},primaryText:{color:'#FFF',fontWeight:'800'},error:{color:'#991B1B',textAlign:'center'},pay:{height:52,borderRadius:12,backgroundColor:'#00A651',alignItems:'center',justifyContent:'center',marginBottom:12},payText:{fontSize:15,fontWeight:'900',color:'#FFF'},reschedule:{height:50,borderRadius:12,borderWidth:1,borderColor:'#86EFAC',alignItems:'center',justifyContent:'center',marginBottom:12},rescheduleText:{fontSize:15,fontWeight:'800',color:'#067647'},cancel:{minHeight:48,borderRadius:12,borderWidth:1,borderColor:'#FCA5A5',justifyContent:'center',alignItems:'center'},cancelText:{fontSize:15,fontWeight:'800',color:'#B91C1C'}});
