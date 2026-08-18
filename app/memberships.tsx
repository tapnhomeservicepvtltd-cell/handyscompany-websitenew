import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { membershipsApi, MembershipPlan, PropertyType } from '../services/membershipsApi';

// Custom icons per sector category for distinct card headers
const SECTOR_ICONS: Record<string, { icon: string; color: string }> = {
  Residential: { icon: 'home-city', color: '#FCD34D' },
  Commercial: { icon: 'office-building', color: '#6EE7B7' },
  Hospitality: { icon: 'silverware-fork-knife', color: '#FCA5A5' },
  Education: { icon: 'school', color: '#93C5FD' },
  Healthcare: { icon: 'hospital-building', color: '#F472B6' },
  Government: { icon: 'town-hall', color: '#C084FC' },
  'Religious Places': { icon: 'temple-hindu', color: '#FDE047' },
  Automotive: { icon: 'car-sports', color: '#67E8F9' },
  'IT & Professional': { icon: 'laptop', color: '#A5B4FC' },
  'Fitness & Beauty': { icon: 'dumbbell', color: '#F87171' },
};

const SERVICE_ICONS = [
  { label: 'Plumber', icon: 'pipe-leak' },
  { label: 'Electrician', icon: 'lightning-bolt' },
  { label: 'Carpenter', icon: 'hammer' },
  { label: 'Appliance', icon: 'washing-machine' },
  { label: 'AC Service', icon: 'snowflake' },
  { label: 'TV Repair', icon: 'television' },
  { label: 'RO Repair', icon: 'water' },
  { label: 'Geyser', icon: 'water-boiler' },
  { label: 'Fan Repair', icon: 'fan' },
  { label: 'Cleaning', icon: 'broom' },
];

export default function MembershipsScreen() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [selected, setSelected] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const load = useCallback(async (propertyTypeId?: string) => {
    try {
      setError(undefined);
      const [types, nextPlans] = await Promise.all([
        membershipsApi.propertyTypes(),
        membershipsApi.plans(propertyTypeId),
      ]);
      setPropertyTypes(types);
      setPlans(nextPlans);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load plans');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const select = (id?: string) => {
    setSelected(id);
    setLoading(true);
    load(id);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.title}>All Property Memberships</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => load(selected)} />
        }
        ListHeaderComponent={
          <>
            {/* Sector Filter Tabs */}
            <Text style={styles.filterTitle}>Select Your Property Sector:</Text>
            <FlatList
              horizontal
              data={[{ id: '', name: 'All Sectors' } as PropertyType, ...propertyTypes]}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => select(item.id || undefined)}
                  style={[styles.filter, selected === item.id && styles.filterActive]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selected === item.id && styles.filterTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
            {error && (
              <Text style={styles.error}>
                {error}. Set `expo.extra.apiBaseUrl` to your NestJS API URL.
              </Text>
            )}
            {loading && plans.length === 0 && (
              <ActivityIndicator color="#006837" size="large" style={{ marginVertical: 20 }} />
            )}
          </>
        }
        renderItem={({ item }) => {
          const groupName = item.propertyType?.groupName || 'Property';
          const sectorMeta = SECTOR_ICONS[groupName] || { icon: 'domain', color: '#FCD34D' };

          return (
            <View style={styles.cardContainer}>
              {/* 🏆 TOP BADGES HEADER */}
              <View style={styles.topBadgeRow}>
                <View style={styles.membershipTag}>
                  <MaterialCommunityIcons
                    name={sectorMeta.icon as any}
                    size={14}
                    color="#92400E"
                  />
                  <Text style={styles.membershipTagText}>
                    {groupName.toUpperCase()} PLAN
                  </Text>
                </View>

                <View style={styles.saveTag}>
                  <Text style={styles.saveTagText}>SAVE ₹5000+</Text>
                </View>
              </View>

              {/* 👑 INDIVIDUAL PLAN TITLE & PRICE */}
              <View style={styles.titleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardMainTitle}>{item.name}</Text>
                  <Text style={styles.cardSubTitle}>
                    Pay Once • 6 Months Labour-FREE Services
                  </Text>
                </View>

                <View style={styles.priceColumn}>
                  <Text style={styles.cardPrice}>₹{item.price}</Text>
                  <Text style={styles.packDuration}>6 Months Pack</Text>
                </View>
              </View>

              {/* 🌟 WHAT YOU GET BANNER */}
              <View style={styles.sectionHeaderLine}>
                <View style={styles.line} />
                <Text style={styles.sectionHeaderText}>
                  WHAT YOU GET — ALL LABOUR FREE
                </Text>
                <View style={styles.line} />
              </View>

              {/* 🪛 10 SERVICE CIRCLE ICONS GRID */}
              <View style={styles.servicesGrid}>
                {SERVICE_ICONS.map((svc, idx) => (
                  <View key={idx} style={styles.gridItem}>
                    <View style={styles.iconCircle}>
                      <MaterialCommunityIcons
                        name={svc.icon as any}
                        size={22}
                        color="#004D25"
                      />
                      <View style={styles.checkBadge}>
                        <Ionicons name="checkmark" size={10} color="#FFF" />
                      </View>
                    </View>
                    <Text style={styles.iconLabel}>{svc.label}</Text>
                  </View>
                ))}
              </View>

              {/* 📄 BENEFIT BULLET HIGHLIGHTS */}
              <View style={styles.benefitBullets}>
                {(item.benefits?.length ? item.benefits : [
                  { id: '1', title: 'All Repairing Services Labour FREE' },
                  { id: '2', title: 'Home Cleaning (Only Chemical Price)' },
                  { id: '3', title: 'Pest Control (Only Chemical Price)' },
                  { id: '4', title: 'Free Monthly Inspection' },
                  { id: '5', title: 'Verified Professionals' }
                ]).map((b) => (
                  <View key={b.id} style={styles.bulletRow}>
                    <Ionicons name="checkmark-circle" size={14} color="#6EE7B7" />
                    <Text style={styles.bulletText}>{b.title}</Text>
                  </View>
                ))}
              </View>

              {/* 🔰 VERIFIED PROS & JOIN BUTTON FOOTER */}
              <View style={styles.footerRow}>
                <View style={styles.verifiedBox}>
                  <View style={styles.shieldCircle}>
                    <Ionicons name="checkmark" size={12} color="#006837" />
                  </View>
                  <Text style={styles.verifiedText}>Verified Pros</Text>
                </View>

                <Pressable
                  style={styles.joinButton}
                  onPress={() => router.push('/payment-gateway')}
                >
                  <Text style={styles.joinButtonText}>
                    JOIN MEMBERSHIP — ₹{item.price}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#0F172A" />
                </Pressable>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>
              No membership plan available for this sector selection.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  filterTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#004D25',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
  },
  filters: { paddingHorizontal: 14, gap: 8, paddingBottom: 14 },
  filter: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  filterActive: { backgroundColor: '#006837' },
  filterText: { fontWeight: '700', color: '#64748B', fontSize: 12 },
  filterTextActive: { color: '#FFF' },
  list: { paddingBottom: 32 },

  /* 🟢 INDIVIDUAL SECTOR LUXURY DEEP GREEN CARD */
  cardContainer: {
    marginHorizontal: 14,
    marginBottom: 20,
    backgroundColor: '#004D25',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  membershipTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FDE68A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membershipTagText: { fontSize: 10, fontWeight: '900', color: '#92400E', letterSpacing: 0.5 },
  saveTag: {
    backgroundColor: '#FDE68A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  saveTagText: { fontSize: 10, fontWeight: '900', color: '#92400E', letterSpacing: 0.5 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardMainTitle: { fontSize: 18, fontWeight: '900', color: '#FFF' },
  cardSubTitle: { fontSize: 12, color: '#A7F3D0', fontWeight: '600', marginTop: 3 },
  priceColumn: { alignItems: 'flex-end' },
  cardPrice: { fontSize: 26, fontWeight: '900', color: '#FFF' },
  packDuration: { fontSize: 11, fontWeight: '700', color: '#FCD34D', marginTop: -2 },

  sectionHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 8,
  },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  sectionHeaderText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FCD34D',
    letterSpacing: 0.8,
  },

  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
    rowGap: 14,
  },
  gridItem: { width: '18%', alignItems: 'center' },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#004D25',
  },
  iconLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 5,
    textAlign: 'center',
  },

  benefitBullets: {
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bulletText: { fontSize: 11, color: '#E2E8F0', fontWeight: '600' },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  verifiedBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shieldCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A7F3D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: { fontSize: 13, fontWeight: '800', color: '#FFF' },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FCD34D',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  joinButtonText: { fontSize: 11, fontWeight: '900', color: '#0F172A' },

  error: { margin: 16, color: '#B42318', lineHeight: 20 },
  empty: { padding: 24, textAlign: 'center', color: '#64748B' },
});
