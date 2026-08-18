import TrackingMap from '@/components/TrackingMap';
import { getTracking, TrackingView } from '@/services/api/tracking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
export default function CustomerTracking(){
  const {bookingId}=useLocalSearchParams<{bookingId:string}>();
  const router=useRouter();
  const [data,setData]=useState<TrackingView|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);

  const load=()=>{
    setLoading(true);setError(null);
    getTracking(bookingId)
      .then(x=>{setData(x);setLoading(false);})
      .catch((e)=>{setError(e?.message||'Network error');setLoading(false);});
  };

  useEffect(()=>{
    load();
    const timer=setInterval(()=>{
      getTracking(bookingId).then(x=>setData(x)).catch(()=>{});
    },7000);
    return()=>clearInterval(timer);
  },[bookingId]);

  if (loading && !data) return <SafeAreaView style={styles.center}><Text>Loading...</Text></SafeAreaView>;
  if (error && !data) return <SafeAreaView style={styles.center}><Text style={styles.error}>{error}</Text><Pressable onPress={load} style={styles.retry}><Text style={styles.retryText}>Retry</Text></Pressable></SafeAreaView>;
  if (!data) return <SafeAreaView style={styles.center}><Text>Tracking not found</Text></SafeAreaView>;

  const point=data?.liveLocations?.[0];
  const address=data?.address;
  const region={
    latitude:point?.latitude??address?.latitude??20.5937,
    longitude:point?.longitude??address?.longitude??78.9629,
    latitudeDelta:.035,longitudeDelta:.035
  };
  return <SafeAreaView style={styles.safe}>
    <View style={styles.map}>
      <TrackingMap region={region} point={point} address={address?.latitude&&address.longitude?{latitude:address.latitude,longitude:address.longitude}:undefined}/>
    </View>
    <View style={styles.sheet}>
      <Pressable onPress={()=>router.back()}><Text style={styles.back}>‹ Back</Text></Pressable>
      <Text style={styles.status}>{data?.trackingStatus?.replaceAll('_',' ')||'CONNECTING'}</Text>
      <Text style={styles.name}>{data?.technician?.fullName||'Technician assigned'}</Text>
      <Text style={styles.meta}>★ {data?.technician?.technicianProfile?.ratingAverage??'—'} · {data?.technician?.technicianProfile?.experienceYears??0} years experience</Text>
      <Text style={styles.meta}>{point?`Last location update ${new Date(point.createdAt).toLocaleTimeString()}`:'Waiting for technician location sharing'}</Text>
      <Pressable style={styles.call} onPress={()=>data?.technician?.phoneNumber&&void Linking.openURL(`tel:${data.technician.phoneNumber}`)}>
        <Text style={styles.callText}>Call technician</Text>
      </Pressable>
    </View>
  </SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#FFF'},map:{flex:1,backgroundColor:'#EAF9F0',alignItems:'center',justifyContent:'center'},sheet:{padding:18,borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#FFF'},back:{color:'#00A651',fontWeight:'800'},status:{fontWeight:'900',color:'#00A651',fontSize:13,marginTop:12},name:{fontWeight:'900',fontSize:21,color:'#0F172A',marginTop:5},meta:{fontSize:13,color:'#64748B',marginTop:5},call:{backgroundColor:'#00A651',borderRadius:12,alignItems:'center',padding:14,marginTop:16},callText:{color:'#FFF',fontWeight:'900'},center:{flex:1,justifyContent:'center',alignItems:'center'},error:{color:'red',marginBottom:10},retry:{padding:10,backgroundColor:'#00A651',borderRadius:5},retryText:{color:'white'}});
