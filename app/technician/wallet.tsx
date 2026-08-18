import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';

import { ApiError } from '@/services/api/client';
import {
  WalletTransaction,
  getWalletBalance,
  getWalletTransactions,
} from '@/services/api/wallet';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate();
  const month = d.toLocaleString('en-IN', { month: 'short' });
  const time = d.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${day} ${month}, ${time}`;
}

function rupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
}

function StatCard({ label, value, icon, iconColor }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={18} color={iconColor} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

interface TransactionItemProps {
  item: WalletTransaction;
}

function TransactionItem({ item }: TransactionItemProps) {
  const isCredit = item.type === 'CREDIT';
  return (
    <View style={styles.txCard}>
      {/* Left icon */}
      <View style={[styles.txIconWrap, isCredit ? styles.txIconCredit : styles.txIconDebit]}>
        <Ionicons
          name={isCredit ? 'arrow-up-circle' : 'arrow-down-circle'}
          size={26}
          color={isCredit ? '#00A651' : '#DC2626'}
        />
      </View>

      {/* Middle content */}
      <View style={styles.txMiddle}>
        <Text style={styles.txReason} numberOfLines={1}>
          {item.reason}
        </Text>
        <View style={styles.txTagRow}>
          <View style={styles.txBadge}>
            <Text style={styles.txBadgeText}>{item.referenceType}</Text>
          </View>
          <Text style={styles.txDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <Text style={styles.txBalance}>Balance: {rupees(item.balanceAfter)}</Text>
      </View>

      {/* Right amount */}
      <Text style={[styles.txAmount, isCredit ? styles.txAmountCredit : styles.txAmountDebit]}>
        {isCredit ? '+' : '-'}{rupees(item.amount)}
      </Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function WalletScreen() {
  const router = useRouter();

  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ─── Load data ─────────────────────────────────────────────────────────────
  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const [balData, txData] = await Promise.all([
        getWalletBalance(),
        getWalletTransactions(),
      ]);
      setBalance(balData.balance);
      setTransactions(txData);
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : 'Failed to load wallet data.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  // ─── Derived stats ─────────────────────────────────────────────────────────
  const totalCredits = transactions
    .filter((t) => t.type === 'CREDIT')
    .reduce((s, t) => s + t.amount, 0);

  const totalDebits = transactions
    .filter((t) => t.type === 'DEBIT')
    .reduce((s, t) => s + t.amount, 0);

  // ─── Withdraw handler ──────────────────────────────────────────────────────
  const handleWithdraw = () => {
    Alert.alert(
      'Withdrawal Request',
      'Withdrawal request sent! Funds will be credited to your bank account within 2-3 business days.',
      [{ text: 'OK' }]
    );
  };

  // ─── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#00A651" />
        <Text style={styles.loadingText}>Loading wallet…</Text>
      </SafeAreaView>
    );
  }

  // ─── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Ionicons name="alert-circle-outline" size={48} color="#DC2626" />
        <Text style={styles.errorText}>{error}</Text>
        <Pressable onPress={() => void load()} style={styles.retryBtn}>
          <Text style={styles.retryBtnText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // ─── List header (balance card + stats + section title) ───────────────────
  const ListHeader = (
    <View>
      {/* ── Balance Card ───────────────────────────────────────────────── */}
      <View style={styles.balanceCard}>
        {/* Decorative circles */}
        <View style={styles.decCircle1} />
        <View style={styles.decCircle2} />

        <Text style={styles.balanceLabel}>Total Earnings</Text>
        <Text style={styles.balanceAmount}>{rupees(balance ?? 0)}</Text>
        <Text style={styles.balanceSub}>Available to Withdraw</Text>

        <Pressable style={styles.withdrawBtn} onPress={handleWithdraw}>
          <Ionicons name="wallet-outline" size={16} color="#00A651" />
          <Text style={styles.withdrawBtnText}>Withdraw</Text>
        </Pressable>
      </View>

      {/* ── Stats Row ──────────────────────────────────────────────────── */}
      <View style={styles.statsRow}>
        <StatCard
          label="Credits"
          value={rupees(totalCredits)}
          icon="trending-up"
          iconColor="#00A651"
        />
        <StatCard
          label="Debits"
          value={rupees(totalDebits)}
          icon="trending-down"
          iconColor="#DC2626"
        />
        <StatCard
          label="Transactions"
          value={String(transactions.length)}
          icon="swap-horizontal"
          iconColor="#6366F1"
        />
      </View>

      {/* ── Section title ──────────────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
    </View>
  );

  // ─── Empty state ──────────────────────────────────────────────────────────
  const ListEmpty = (
    <View style={styles.emptyWrap}>
      <Ionicons name="receipt-outline" size={52} color="#94A3B8" />
      <Text style={styles.emptyTitle}>No transactions yet</Text>
      <Text style={styles.emptySubtitle}>Your earnings and debits will appear here.</Text>
    </View>
  );

  // ─── Main UI ──────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>My Wallet</Text>
        {/* Spacer for title centering */}
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void load(true)}
            tintColor="#00A651"
            colors={['#00A651']}
          />
        }
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Layout
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    backgroundColor: '#F1F5F9',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F1F5F9',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
  },

  // Balance Card
  balanceCard: {
    backgroundColor: '#00A651',
    borderRadius: 24,
    padding: 28,
    marginTop: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#00A651',
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    position: 'relative',
  },
  decCircle1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -40,
    right: -30,
  },
  decCircle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -20,
    left: -20,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.80)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 6,
    letterSpacing: -1,
  },
  balanceSub: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.70)',
    marginTop: 4,
    marginBottom: 22,
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  withdrawBtnText: {
    color: '#00A651',
    fontSize: 14,
    fontWeight: '800',
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },

  // Section
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 12,
  },

  // Transaction card
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    gap: 12,
  },
  txIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txIconCredit: {
    backgroundColor: '#ECFDF5',
  },
  txIconDebit: {
    backgroundColor: '#FEF2F2',
  },
  txMiddle: {
    flex: 1,
    gap: 3,
  },
  txReason: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  txTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  txBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  txBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.3,
  },
  txDate: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  txBalance: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '900',
    minWidth: 72,
    textAlign: 'right',
  },
  txAmountCredit: {
    color: '#00A651',
  },
  txAmountDebit: {
    color: '#DC2626',
  },

  // Loading text
  loadingText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },

  // Error state
  errorText: {
    fontSize: 15,
    color: '#991B1B',
    textAlign: 'center',
    paddingHorizontal: 32,
    fontWeight: '600',
  },
  retryBtn: {
    backgroundColor: '#00A651',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // Empty state
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
