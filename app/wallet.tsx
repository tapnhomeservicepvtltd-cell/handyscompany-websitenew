import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ApiError } from '@/services/api/client';
import { WalletTransaction, getWalletBalance, getWalletTransactions } from '@/services/api/account';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';

export default function WalletScreen() {
  const router = useRouter(); 
  const [balance, setBalance] = useState<string | number>(0); 
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => { 
    setLoading(true); 
    setError(null); 
    try { 
      const [wallet, history] = await Promise.all([getWalletBalance(), getWalletTransactions()]); 
      setBalance(wallet.balance); 
      setTransactions(history); 
    } catch (caught) { 
      setError(caught instanceof ApiError ? caught.message : 'Wallet could not be loaded.'); 
    } finally { 
      setLoading(false); 
    } 
  }, []);

  useFocusEffect(useCallback(() => { void load(); }, [load]));

  if (loading) return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ padding: 16 }}>
        <Skeleton width="100%" height={120} borderRadius={18} style={{ marginBottom: 24 }} />
        <Skeleton width={120} height={16} style={{ marginBottom: 12 }} />
        <Skeleton width="100%" height={60} style={{ marginBottom: 8 }} />
        <Skeleton width="100%" height={60} style={{ marginBottom: 8 }} />
        <Skeleton width="100%" height={60} style={{ marginBottom: 8 }} />
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
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" />
          </Pressable>
          <Text style={styles.title}>Wallet</Text>
          <View style={{width: 26}} />
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
          <Text style={styles.balance}>₹{balance}</Text>
          <Text style={styles.balanceHint}>Use this balance at checkout</Text>
        </View>

        <Text style={styles.sectionTitle}>Recent activity</Text>

        {transactions.length ? transactions.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={[styles.icon, {backgroundColor: item.type === 'CREDIT' ? '#DCFCE7' : '#FEE2E2'}]}>
              <MaterialCommunityIcons name={item.type === 'CREDIT' ? 'plus' : 'minus'} size={20} color={item.type === 'CREDIT' ? '#15803D' : '#DC2626'} />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.reason}>{item.reason}</Text>
              <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
            <Text style={[styles.value, {color: item.type === 'CREDIT' ? '#15803D' : '#DC2626'}]}>
              {item.type === 'CREDIT' ? '+' : '-'}₹{item.amount}
            </Text>
          </View>
        )) : (
          <EmptyState 
            icon="wallet-outline" 
            title="No transactions" 
            subtitle="Your wallet transaction history will appear here." 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 36 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 19, fontWeight: '800', color: '#0F172A' },
  balanceCard: { backgroundColor: '#00572F', borderRadius: 18, padding: 22 },
  balanceLabel: { fontSize: 11, fontWeight: '800', color: '#BBF7D0' },
  balance: { fontSize: 34, fontWeight: '900', color: '#FFF', marginVertical: 7 },
  balanceHint: { fontSize: 13, color: '#DCFCE7' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 24, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#F1F5F9' },
  icon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  reason: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  date: { fontSize: 12, color: '#64748B', marginTop: 3 },
  value: { fontSize: 15, fontWeight: '900' },
  empty: { backgroundColor: '#FFF', padding: 18, borderRadius: 12 },
  error: { color: '#991B1B', textAlign: 'center' },
  primary: { backgroundColor: '#00A651', paddingHorizontal: 18, paddingVertical: 11, borderRadius: 10 },
  primaryText: { color: '#FFF', fontWeight: '800' }
});
