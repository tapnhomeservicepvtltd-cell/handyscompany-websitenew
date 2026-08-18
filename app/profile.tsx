import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import type { ComponentProps } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ApiError, logoutSession } from '@/services/api/client';
import { UserProfile, getMyProfile, updateMyProfile } from '@/services/api/users';
import { Skeleton } from '@/components/ui/Skeleton';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const user = await getMyProfile();
      setProfile(user); setName(user.fullName ?? ''); setEmail(user.email ?? '');
    } catch (caught) {
      Alert.alert('Profile unavailable', caught instanceof ApiError ? caught.message : 'Please sign in again.');
    } finally { setLoading(false); }
  }, []);

  useFocusEffect(useCallback(() => { void load(); }, [load]));

  const save = async () => {
    if (!name.trim()) { Alert.alert('Name required', 'Enter your full name.'); return; }
    setSaving(true);
    try {
      setProfile(await updateMyProfile({ fullName: name.trim(), email: email.trim() || undefined }));
      Alert.alert('Profile updated', 'Your changes have been saved.');
    } catch (caught) {
      Alert.alert('Unable to update', caught instanceof ApiError ? caught.message : 'Please try again.');
    } finally { setSaving(false); }
  };

  const logout = () => Alert.alert('Log out?', 'You will need to verify your phone again to sign in.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Log out', style: 'destructive', onPress: async () => { await logoutSession(); router.replace('/login' as never); } },
  ]);

  if (loading) return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ padding: 16 }}>
        <View style={styles.hero}>
          <Skeleton width={76} height={76} borderRadius={38} />
          <Skeleton width={150} height={18} style={{ marginTop: 12 }} />
          <Skeleton width={100} height={14} style={{ marginTop: 6 }} />
        </View>
        <Skeleton width={120} height={16} style={{ marginTop: 24, marginBottom: 12 }} />
        <View style={styles.card}>
          <Skeleton width="100%" height={46} style={{ marginBottom: 12 }} />
          <Skeleton width="100%" height={46} style={{ marginBottom: 12 }} />
          <Skeleton width="100%" height={48} />
        </View>
        <Skeleton width={100} height={16} style={{ marginTop: 24, marginBottom: 12 }} />
        <View style={styles.card}>
          <Skeleton width="100%" height={50} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={50} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={50} />
        </View>
      </View>
    </SafeAreaView>
  );

  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.hero}><View style={styles.avatar}><Text style={styles.avatarText}>{profile?.fullName?.trim().charAt(0).toUpperCase() || 'H'}</Text></View><Text style={styles.role}>{profile?.role === 'CUSTOMER' ? 'Customer account' : profile?.role}</Text><Text style={styles.phone}>{profile?.phoneNumber}</Text></View>
    <Text style={styles.sectionTitle}>Personal details</Text>
    <View style={styles.card}><Text style={styles.label}>FULL NAME</Text><TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Your name" /><Text style={styles.label}>EMAIL</Text><TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" /><Pressable disabled={saving} onPress={() => void save()} style={styles.primary}>{saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryText}>Save changes</Text>}</Pressable></View>
    <Text style={styles.sectionTitle}>Account</Text>
    <View style={styles.card}>
      {profile?.role === 'ADMIN' ? <MenuItem icon="view-dashboard-outline" label="Admin dashboard" onPress={() => router.push('/admin/dashboard' as never)} /> : null}
      {profile?.role === 'TECHNICIAN' ? <MenuItem icon="briefcase-account-outline" label="Partner dashboard" onPress={() => router.push('/technician/dashboard' as never)} /> : null}
      <MenuItem icon="map-marker-outline" label="Saved addresses" onPress={() => router.push('/booking/address' as never)} />
      <MenuItem icon="calendar-check-outline" label="My bookings" onPress={() => router.push('/bookings' as never)} />
      <MenuItem icon="file-document-outline" label="Invoices" onPress={() => router.push('/invoices' as never)} />
      <MenuItem icon="wallet-outline" label="Wallet" onPress={() => router.push('/wallet' as never)} />
      <MenuItem icon="bell-outline" label="Notifications" onPress={() => router.push('/notifications' as never)} />
      <MenuItem icon="shield-account-outline" label="Legal & Support Center" onPress={() => router.push('/legal' as never)} />
    </View>
    <Pressable onPress={logout} style={styles.logout}><Text style={styles.logoutText}>Log out</Text></Pressable>
  </ScrollView></SafeAreaView>;
}

function MenuItem({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.menu}><MaterialCommunityIcons name={icon} size={22} color="#00A651" /><Text style={styles.menuText}>{label}</Text><MaterialCommunityIcons name="chevron-right" size={22} color="#94A3B8" /></Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' }, center: { flex: 1, justifyContent: 'center', alignItems: 'center' }, content: { padding: 16, paddingBottom: 36 }, hero: { alignItems: 'center', paddingVertical: 22 }, avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#00A651', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#FFF', fontSize: 30, fontWeight: '900' }, role: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 10 }, phone: { fontSize: 13, color: '#64748B', marginTop: 3 }, sectionTitle: { fontSize: 14, fontWeight: '800', color: '#334155', marginTop: 16, marginBottom: 8 }, card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }, label: { fontSize: 11, fontWeight: '800', color: '#64748B', marginBottom: 6, marginTop: 6 }, input: { height: 46, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, paddingHorizontal: 12, fontSize: 14, color: '#0F172A', marginBottom: 8 }, primary: { height: 48, backgroundColor: '#00A651', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 8 }, primaryText: { color: '#FFF', fontWeight: '800' }, menu: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, borderBottomWidth: 1, borderColor: '#F1F5F9' }, menuText: { flex: 1, fontSize: 14, fontWeight: '700', color: '#0F172A' }, logout: { marginTop: 22, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#FCA5A5', alignItems: 'center', justifyContent: 'center' }, logoutText: { color: '#B91C1C', fontSize: 15, fontWeight: '800' },
});
