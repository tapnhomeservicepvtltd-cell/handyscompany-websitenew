import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Booking, getBooking } from '@/services/api/bookings';

export default function LiveTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter(); const [booking, setBooking] = useState<Booking | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!id) return; const load = async () => { try { setBooking(await getBooking(id)); } finally { setLoading(false); } }; void load(); const interval = setInterval(() => void load(), 15000); return () => clearInterval(interval); }, [id]);
  if (loading) return <SafeAreaView style={styles.center}><ActivityIndicator color="#00A651" /></SafeAreaView>;
  const location = booking?.technician?.technicianProfile;
  const hasLocation = location?.currentLatitude != null && location?.currentLongitude != null;
  return <SafeAreaView style={styles.safe}><View style={styles.header}><Pressable onPress={() => router.back()}><MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" /></Pressable><Text style={styles.title}>Live tracking</Text><View style={{ width: 26 }} /></View><View style={styles.content}><View style={styles.map}><MaterialCommunityIcons name="map-marker-radius-outline" size={64} color="#00A651" /><Text style={styles.mapTitle}>{hasLocation ? 'Technician location updated' : 'Waiting for technician location'}</Text><Text style={styles.mapText}>{hasLocation ? `${location!.currentLatitude!.toFixed(5)}, ${location!.currentLongitude!.toFixed(5)}` : 'Location appears when your assigned technician shares it.'}</Text></View><View style={styles.card}><Text style={styles.label}>ASSIGNED PROFESSIONAL</Text><Text style={styles.name}>{booking?.technician?.fullName ?? 'Not assigned yet'}</Text><Text style={styles.status}>{booking?.status.replaceAll('_', ' ')}</Text>{hasLocation ? <Text style={styles.updated}>Last updated {new Date(location!.updatedAt).toLocaleTimeString()} · refreshes every 15 seconds</Text> : null}</View></View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#F8FAFC'},center:{flex:1,alignItems:'center',justifyContent:'center'},header:{height:58,paddingHorizontal:16,backgroundColor:'#FFF',flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#E2E8F0'},title:{fontSize:18,fontWeight:'900',color:'#0F172A'},content:{padding:16,gap:14},map:{height:280,alignItems:'center',justifyContent:'center',borderRadius:18,backgroundColor:'#EAF9F0',padding:30},mapTitle:{fontWeight:'900',fontSize:17,color:'#0F172A',marginTop:14},mapText:{fontSize:13,color:'#475569',textAlign:'center',marginTop:8},card:{backgroundColor:'#FFF',padding:17,borderRadius:16,borderWidth:1,borderColor:'#E2E8F0'},label:{fontSize:11,fontWeight:'800',color:'#64748B'},name:{fontSize:18,fontWeight:'900',color:'#0F172A',marginTop:6},status:{fontSize:13,color:'#00A651',fontWeight:'800',marginTop:8},updated:{fontSize:12,color:'#64748B',marginTop:10} });
