import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ApiError } from '@/services/api/client';
import { Notification, getNotifications, markAllNotificationsRead, markNotificationRead } from '@/services/api/account';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';

export default function NotificationsScreen() {
  const router = useRouter(); 
  const [items, setItems] = useState<Notification[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => { 
    setLoading(true); 
    setError(null); 
    try { 
      setItems(await getNotifications()); 
    } catch (caught) { 
      setError(caught instanceof ApiError ? caught.message : 'Notifications could not be loaded.'); 
    } finally { 
      setLoading(false); 
    } 
  }, []);

  useFocusEffect(useCallback(() => { void load(); }, [load]));

  const read = async (id: string) => { 
    try { 
      await markNotificationRead(id); 
      setItems((current) => current.map((item) => item.id === id ? { ...item, isRead: true } : item)); 
    } catch { 
      void load(); 
    } 
  };

  const readAll = async () => { 
    try { 
      await markAllNotificationsRead(); 
      setItems((current) => current.map((item) => ({ ...item, isRead: true }))); 
    } catch { 
      void load(); 
    } 
  };

  if (loading) return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" />
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <View style={{width:50}} />
      </View>
      <View style={{ padding: 16 }}>
        <Skeleton width="100%" height={90} borderRadius={14} style={{ marginBottom: 12 }} />
        <Skeleton width="100%" height={90} borderRadius={14} style={{ marginBottom: 12 }} />
        <Skeleton width="100%" height={90} borderRadius={14} style={{ marginBottom: 12 }} />
        <Skeleton width="100%" height={90} borderRadius={14} style={{ marginBottom: 12 }} />
      </View>
    </SafeAreaView>
  );

  if (error) return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.error}>{error}</Text>
      <Pressable onPress={() => void load()} style={styles.primary}>
        <Text style={styles.primaryText}>Try again</Text>
      </Pressable>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" />
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <Pressable onPress={() => void readAll()}>
          <Text style={styles.readAll}>Read all</Text>
        </Pressable>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {items.length ? items.map((item) => (
          <Pressable 
            key={item.id} 
            onPress={() => void read(item.id)} 
            style={[styles.card, !item.isRead && styles.unread]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
          </Pressable>
        )) : (
          <EmptyState 
            icon="notifications-outline" 
            title="No Notifications" 
            subtitle="You're all caught up! New alerts will appear here." 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#E2E8F0' },
  title: { fontSize: 19, fontWeight: '800', color: '#0F172A' },
  readAll: { fontSize: 13, fontWeight: '800', color: '#00A651' },
  content: { padding: 16, gap: 10, paddingBottom: 36 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  unread: { borderColor: '#86EFAC', backgroundColor: '#F0FDF4' },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  body: { fontSize: 13, color: '#475569', lineHeight: 19, marginTop: 5 },
  date: { fontSize: 11, color: '#94A3B8', marginTop: 8 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  error: { color: '#991B1B', textAlign: 'center' },
  primary: { backgroundColor: '#00A651', paddingHorizontal: 18, paddingVertical: 11, borderRadius: 10 },
  primaryText: { color: '#FFF', fontWeight: '800' }
});
