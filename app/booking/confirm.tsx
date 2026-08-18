import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ApiError } from '@/services/api/client';
import { Address, getAddresses } from '@/services/api/addresses';
import { createBooking } from '@/services/api/bookings';

export default function ConfirmBookingScreen() {
  const router = useRouter();
  const { serviceId, serviceName, addressId, scheduledAt } = useLocalSearchParams<{ serviceId: string; serviceName?: string; addressId: string; scheduledAt: string }>();
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAddresses().then((items) => setAddress(items.find((item) => item.id === addressId) ?? null)).finally(() => setLoading(false));
  }, [addressId]);

  const submit = async () => {
    if (!serviceId || !addressId || !scheduledAt) {
      Alert.alert('Booking information missing', 'Please choose a service, address, and time again.');
      router.replace('/(tabs)' as never);
      return;
    }

    setSubmitting(true);
    try {
      const booking = await createBooking({ serviceId, addressId, scheduledAt });
      router.replace(`/bookings/${booking.id}` as never);
    } catch (caught) {
      Alert.alert('Unable to place booking', caught instanceof ApiError ? caught.message : 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.header}><Pressable onPress={() => router.back()}><MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" /></Pressable><Text style={styles.title}>Confirm booking</Text><View style={{width:26}} /></View>
    <View style={styles.card}><Text style={styles.label}>SERVICE</Text><Text style={styles.value}>{serviceName ?? 'Selected service'}</Text></View>
    <View style={styles.card}><Text style={styles.label}>WHEN</Text><Text style={styles.value}>{scheduledAt ? new Date(scheduledAt).toLocaleString() : 'Not selected'}</Text></View>
    <View style={styles.card}><Text style={styles.label}>SERVICE ADDRESS</Text>{loading ? <ActivityIndicator color="#00A651" style={{alignSelf:'flex-start',marginTop:8}} /> : <Text style={styles.value}>{address ? `${address.addressLine1}, ${address.city}, ${address.state} – ${address.postalCode}` : 'Address unavailable'}</Text>}</View>
    <View style={styles.notice}><MaterialCommunityIcons name="information-outline" size={20} color="#065F46"/><Text style={styles.noticeText}>The final amount is confirmed after service selection and any applicable offers. You can review all details before payment.</Text></View>
  </ScrollView><View style={styles.footer}><Pressable disabled={submitting || loading || !address} onPress={() => void submit()} style={[styles.button,(submitting||loading||!address)&&styles.buttonDisabled]}>{submitting?<ActivityIndicator color="#FFF"/>:<Text style={styles.buttonText}>Place booking</Text>}</Pressable></View></SafeAreaView>;
}

const styles=StyleSheet.create({safeArea:{flex:1,backgroundColor:'#F8FAFC'},content:{padding:16,gap:12},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:8},title:{fontSize:19,fontWeight:'800',color:'#0F172A'},card:{backgroundColor:'#FFF',borderRadius:16,padding:17,borderWidth:1,borderColor:'#E2E8F0'},label:{fontSize:11,fontWeight:'800',color:'#64748B',letterSpacing:.4},value:{fontSize:15,fontWeight:'700',color:'#0F172A',marginTop:7,lineHeight:22},notice:{flexDirection:'row',gap:10,backgroundColor:'#ECFDF5',padding:14,borderRadius:14,alignItems:'flex-start'},noticeText:{flex:1,color:'#065F46',fontSize:13,lineHeight:19},footer:{padding:16,backgroundColor:'#FFF',borderTopWidth:1,borderColor:'#E2E8F0'},button:{height:54,borderRadius:14,backgroundColor:'#00A651',justifyContent:'center',alignItems:'center'},buttonDisabled:{backgroundColor:'#94A3B8'},buttonText:{color:'#FFF',fontWeight:'900',fontSize:16}});
