import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TechPolicyItem {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string;
}

export default function TechnicianLegalScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>('agreement');

  const policies: TechPolicyItem[] = [
    {
      id: 'agreement',
      title: '1. Technician Service Agreement',
      icon: 'file-signature-outline',
      summary: 'Official partner contract, independent contractor terms & platform compliance.',
      details:
        'As a registered Partner with TapnHome Service Private Limited (HandysCompany), you operate as an independent service professional. You agree to maintain background verification standards, adhere to assigned jobs, and deliver high-quality craftsmanship.',
    },
    {
      id: 'commission',
      title: '2. Commission & Membership Selling Policy',
      icon: 'cash-register',
      summary: 'Job payout calculation, doorstep membership sales & ₹150 commission rewards.',
      details:
        'Technicians earn competitive service rates per job completion. Additionally, technicians earn an INSTANT ₹150 COMMISSION for every ₹699 Unlimited Membership registered at a customer doorstep. Commissions are credited directly to your Wallet.',
    },
    {
      id: 'wallet',
      title: '3. Wallet & Bank Settlement Policy',
      icon: 'wallet-membership',
      summary: 'Weekly automated bank payouts, instant wallet withdrawals & float limits.',
      details:
        'Wallet earnings can be withdrawn to your verified UPI or Bank Account. Payouts are settled automatically every Tuesday, or instantly on-demand subject to a minimal wallet balance threshold of ₹500.',
    },
    {
      id: 'conduct',
      title: '4. Code of Conduct & Safety Guidelines',
      icon: 'shield-account',
      summary: 'Professional decorum, zero tolerance for overcharging, and safety rules.',
      details:
        'Technicians must treat customers with respect and maintain zero tolerance for alcohol consumption, verbal arguments, or overcharging beyond the official Rate Card. Violations result in immediate account suspension.',
    },
    {
      id: 'uniform',
      title: '5. Uniform, ID Card & Attendance Policy',
      icon: 'account-tie',
      summary: 'Mandatory branded uniform, photo ID card display, and daily app check-in.',
      details:
        'Technicians must wear official HandysCompany T-shirts and display their photo ID cards during customer visits. Daily attendance is logged via the Available for Jobs toggle in the Partner Dashboard.',
    },
    {
      id: 'gps',
      title: '6. Live GPS Location Tracking Consent',
      icon: 'map-marker-path',
      summary: 'En-route GPS tracking consent for customer dispatch & safety monitoring.',
      details:
        'By accepting job dispatches, you consent to sharing live GPS coordinates with the customer and central dispatch radar during active job trips (STATUS: TRAVELLING to COMPLETED).',
    },
    {
      id: 'termination',
      title: '7. Customer Behavior & Disciplinary Actions',
      icon: 'alert-octagon-outline',
      summary: 'Dispute escalation channels, job cancellation rules & account termination.',
      details:
        'Technicians have the right to decline unsafe work environments. Disciplinary penalties or permanent platform off-boarding apply in cases of repeat low ratings (<4.0★), job no-shows, or unauthorized cash demands.',
    },
  ];

  const togglePolicy = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>Partner Legal & Guidelines</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <MaterialCommunityIcons name="shield-check" size={32} color="#00A651" />
          <Text style={styles.heroTitle}>HandysCompany Partner Policies</Text>
          <Text style={styles.heroSub}>
            TapnHome Service Private Limited • Official Partner Guidelines & SLA
          </Text>
        </View>

        <View style={styles.list}>
          {policies.map((p) => {
            const isExpanded = expandedId === p.id;
            return (
              <View key={p.id} style={styles.card}>
                <Pressable onPress={() => togglePolicy(p.id)} style={styles.cardHeader}>
                  <MaterialCommunityIcons name={p.icon as any} size={22} color="#00A651" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{p.title}</Text>
                    <Text style={styles.cardSummary}>{p.summary}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={22}
                    color="#94A3B8"
                  />
                </Pressable>

                {isExpanded && (
                  <View style={styles.cardBody}>
                    <Text style={styles.cardDetails}>{p.details}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  content: { padding: 16, paddingBottom: 36 },

  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#FFF', marginTop: 8 },
  heroSub: { fontSize: 11, color: '#94A3B8', marginTop: 4, textAlign: 'center' },

  list: { gap: 10 },
  card: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  cardSummary: { fontSize: 11, color: '#64748B', marginTop: 2 },
  cardBody: { paddingHorizontal: 14, paddingBottom: 14, paddingTop: 4, borderTopWidth: 1, borderColor: '#F1F5F9' },
  cardDetails: { fontSize: 12, color: '#334155', lineHeight: 18 },
});
