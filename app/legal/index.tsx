import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { companyDetails } from '@/data/legalData';
import { apiRequest } from '@/services/api/client';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

interface LegalCard {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  icon: IconName;
  route: string;
}

export default function LegalCenterHub() {
  const router = useRouter();
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [legalPagesApi, setLegalPagesApi] = useState<any[]>([]);

  useEffect(() => {
    async function loadLegalPages() {
      try {
        const data = await apiRequest<any[]>('/api/v1/content/legal-pages', { authenticated: false });
        if (Array.isArray(data) && data.length > 0) {
          setLegalPagesApi(data);
        }
      } catch (err) {
        // Fallback handled safely
      }
    }
    void loadLegalPages();
  }, []);

  const legalItems: LegalCard[] = [
    {
      id: 'about',
      titleEn: 'About HandysCompany',
      titleHi: 'हैंडीकंपनी के बारे में',
      descEn: 'Company vision, mission, quality assurance & values',
      descHi: 'कंपनी का विज़न, मिशन, गुणवत्ता और मूल्य',
      icon: 'information-outline',
      route: '/legal/document?type=aboutUs',
    },
    {
      id: 'contact',
      titleEn: 'Contact Us & Support',
      titleHi: 'संपर्क करें और सहायता',
      descEn: 'Customer phone support, email, office address & hours',
      descHi: 'फोन सहायता, ईमेल, कार्यालय का पता और समय',
      icon: 'phone-in-talk-outline',
      route: '/legal/document?type=contactUs',
    },
    {
      id: 'faq',
      titleEn: 'Help & FAQ Center',
      titleHi: 'सहायता और अक्सर पूछे जाने वाले प्रश्न',
      descEn: '30+ Answers to booking, payments, warranty & refund FAQs',
      descHi: 'बुकिंग, पेमेंट, वारंटी और रिफंड से जुड़े 30+ प्रश्न',
      icon: 'help-circle-outline',
      route: '/legal/faq',
    },
    {
      id: 'privacy',
      titleEn: 'Privacy Policy',
      titleHi: 'गोपनीयता नीति',
      descEn: 'Data encryption, permissions & DPDP Act 2023 compliance',
      descHi: 'डेटा सुरक्षा, अनुमतियां और डीपीडीपी अधिनियम 2023',
      icon: 'shield-lock-outline',
      route: '/legal/document?type=privacyPolicy',
    },
    {
      id: 'terms',
      titleEn: 'Terms & Conditions',
      titleHi: 'नियम और शर्तें',
      descEn: 'Platform usage, rate card rules, warranty & conduct',
      descHi: 'प्लेटफ़ॉर्म उपयोग, दर सूची नियम और वारंटी',
      icon: 'file-document-outline',
      route: '/legal/document?type=termsAndConditions',
    },
    {
      id: 'refund',
      titleEn: 'Refund & Cancellation Policy',
      titleHi: 'रिफंड और रद्दीकरण नीति',
      descEn: 'Instant 2-hour wallet refund & money-back guarantee',
      descHi: '2 घंटे में तुरंत वॉलेट रिफंड और मनी-बैक गारंटी',
      icon: 'cash-refund',
      route: '/legal/document?type=refundPolicy',
    },
  ];

  const filteredItems = legalItems.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.titleEn.toLowerCase().includes(q) ||
      item.titleHi.toLowerCase().includes(q) ||
      item.descEn.toLowerCase().includes(q)
    );
  });

  const handleReportIssue = () => {
    Alert.alert(
      '🚨 Report an Issue / Emergency',
      'Select issue type:',
      [
        { text: 'Billing Dispute', onPress: () => Linking.openURL(`mailto:${companyDetails.email}?subject=Billing%20Dispute`) },
        { text: 'Technician Emergency SOS', onPress: () => Linking.openURL(`tel:${companyDetails.phone}`) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {lang === 'EN' ? 'Legal & Support Center' : 'लीगल और सहायता केंद्र'}
        </Text>
        <Pressable
          onPress={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
          style={styles.langBtn}
        >
          <Text style={styles.langBtnText}>{lang === 'EN' ? 'हिं' : 'EN'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder={lang === 'EN' ? 'Search policies, FAQs & help...' : 'नीतियां, प्रश्न और सहायता खोजें...'}
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={18} color="#94A3B8" />
            </Pressable>
          ) : null}
        </View>

        {/* 🚨 Emergency Support & Contact Grid */}
        <Text style={styles.sectionTitle}>
          {lang === 'EN' ? '🚨 24/7 Support & Emergency Help' : '🚨 24/7 सहायता और आपातकालीन मदद'}
        </Text>

        <View style={styles.emergencyGrid}>
          <Pressable
            onPress={() => Linking.openURL(`tel:${companyDetails.phone}`)}
            style={styles.emergencyCard}
          >
            <View style={[styles.emergencyIcon, { backgroundColor: '#ECFDF5' }]}>
              <MaterialCommunityIcons name="phone" size={22} color="#00A651" />
            </View>
            <Text style={styles.emergencyTitle}>Call Support</Text>
            <Text style={styles.emergencySub}>{companyDetails.phone}</Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL('https://wa.me/91731500023')}
            style={styles.emergencyCard}
          >
            <View style={[styles.emergencyIcon, { backgroundColor: '#DCFCE7' }]}>
              <MaterialCommunityIcons name="whatsapp" size={22} color="#16A34A" />
            </View>
            <Text style={styles.emergencyTitle}>WhatsApp</Text>
            <Text style={styles.emergencySub}>Instant Chat</Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL(`mailto:${companyDetails.email}`)}
            style={styles.emergencyCard}
          >
            <View style={[styles.emergencyIcon, { backgroundColor: '#EFF6FF' }]}>
              <MaterialCommunityIcons name="email-outline" size={22} color="#3B82F6" />
            </View>
            <Text style={styles.emergencyTitle}>Email Desk</Text>
            <Text style={styles.emergencySub}>info@handyscompany.in</Text>
          </Pressable>

          <Pressable
            onPress={handleReportIssue}
            style={styles.emergencyCard}
          >
            <View style={[styles.emergencyIcon, { backgroundColor: '#FEF2F2' }]}>
              <MaterialCommunityIcons name="alert-octagon-outline" size={22} color="#EF4444" />
            </View>
            <Text style={styles.emergencyTitle}>Report Issue</Text>
            <Text style={styles.emergencySub}>SOS Priority</Text>
          </Pressable>
        </View>

        {/* Corporate Entity Header Card */}
        <View style={styles.entityCard}>
          <View style={styles.entityHeader}>
            <View style={styles.logoBadge}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#FFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.entityTitle}>{companyDetails.brand}</Text>
              <Text style={styles.entitySub}>{companyDetails.name}</Text>
            </View>
          </View>
          <Text style={styles.entityAddress}>{companyDetails.corporateOffice}</Text>
        </View>

        {/* Legal Document Navigation Cards */}
        <Text style={styles.sectionTitle}>
          {lang === 'EN' ? 'Legal Policies & Terms' : 'लीगल नीतियां व नियम'}
        </Text>

        <View style={styles.cardList}>
          {filteredItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(item.route as never)}
              style={styles.policyCard}
            >
              <View style={styles.iconWrap}>
                <MaterialCommunityIcons name={item.icon} size={24} color="#00A651" />
              </View>
              <View style={styles.policyTextWrap}>
                <Text style={styles.policyTitle}>
                  {lang === 'EN' ? item.titleEn : item.titleHi}
                </Text>
                <Text style={styles.policyDesc}>
                  {lang === 'EN' ? item.descEn : item.descHi}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color="#94A3B8" />
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            TapnHome Service Private Limited © 2026. Document Version v2.5.
          </Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  langBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#00A651',
    borderRadius: 8,
  },
  langBtnText: { color: '#FFF', fontWeight: '800', fontSize: 12 },
  content: { padding: 16, paddingBottom: 36 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#0F172A' },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0F172A', marginBottom: 12 },

  emergencyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  emergencyCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  emergencyIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  emergencyTitle: { fontSize: 12, fontWeight: '800', color: '#0F172A' },
  emergencySub: { fontSize: 10, color: '#64748B', marginTop: 2 },

  entityCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  entityHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  logoBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#00A651',
    alignItems: 'center',
    
  },
  entityTitle: { fontSize: 18, fontWeight: '900', color: '#FFF' },
  entitySub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  entityAddress: { fontSize: 11, color: '#CBD5E1', lineHeight: 16 },

  cardList: { gap: 10 },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    
  },
  policyTextWrap: { flex: 1 },
  policyTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  policyDesc: { fontSize: 12, color: '#64748B', marginTop: 2 },

  footer: { marginTop: 28, alignItems: 'center' },
  footerText: { fontSize: 11, color: '#94A3B8', textAlign: 'center' },
});
