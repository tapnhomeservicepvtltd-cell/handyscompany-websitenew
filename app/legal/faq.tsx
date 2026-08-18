import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';
import { faqsList } from '@/data/legalData';
import type { FaqItem } from '@/data/legalData';
import { apiRequest } from '@/services/api/client';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FaqScreen() {
  const router = useRouter();
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [apiFaqs, setApiFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await apiRequest<FaqItem[]>('/api/v1/content/faqs', { authenticated: false });
        if (Array.isArray(data) && data.length > 0) {
          setApiFaqs(data);
        }
      } catch (err) {
        // Safe fallback
      }
    }
    void loadFaqs();
  }, []);

  const categories = [
    'All',
    'Booking',
    'Payments',
    'Membership',
    'Warranty',
    'Refund',
    'Coupons',
    'Technicians',
    'Invoices',
    'Safety',
    'Support',
  ];

  const sourceFaqs = apiFaqs.length > 0 ? apiFaqs : faqsList;
  const filteredFaqs = sourceFaqs.filter((item: FaqItem) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.questionEn.toLowerCase().includes(q) ||
      item.questionHi.toLowerCase().includes(q) ||
      item.answerEn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
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
        <Text style={styles.headerTitle}>
          {lang === 'EN' ? 'Help & FAQ Center (30+ Answers)' : 'सहायता व अक्सर पूछे जाने वाले प्रश्न'}
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
            placeholder={lang === 'EN' ? 'Search 30+ FAQs...' : '30+ प्रश्न खोजें...'}
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

        {/* Category Horizontal Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillContainer}
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.pill,
                selectedCategory === cat ? styles.pillActive : styles.pillInactive,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  selectedCategory === cat ? styles.pillTextActive : styles.pillTextInactive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* FAQ Accordion List */}
        <View style={styles.faqList}>
          {filteredFaqs.length ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <View key={faq.id} style={styles.faqCard}>
                  <Pressable
                    onPress={() => toggleAccordion(faq.id)}
                    style={styles.faqHeader}
                  >
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{faq.category}</Text>
                    </View>
                    <Text style={styles.faqQuestion}>
                      {lang === 'EN' ? faq.questionEn : faq.questionHi}
                    </Text>
                    <MaterialCommunityIcons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={22}
                      color="#00A651"
                    />
                  </Pressable>

                  {isExpanded && (
                    <View style={styles.faqBody}>
                      <Text style={styles.faqAnswer}>
                        {lang === 'EN' ? faq.answerEn : faq.answerHi}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <View style={styles.empty}>
              <MaterialCommunityIcons name="file-search-outline" size={48} color="#94A3B8" />
              <Text style={styles.emptyText}>
                {lang === 'EN' ? 'No FAQs matching your search.' : 'आपकी खोज के लिए कोई प्रश्न नहीं मिला।'}
              </Text>
            </View>
          )}
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
  headerTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A', flex: 1, marginHorizontal: 8 },
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
    marginBottom: 14,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#0F172A' },

  pillContainer: { marginBottom: 16 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  pillActive: { backgroundColor: '#00A651', borderColor: '#00A651' },
  pillInactive: { backgroundColor: '#FFF', borderColor: '#CBD5E1' },
  pillText: { fontSize: 12, fontWeight: '800' },
  pillTextActive: { color: '#FFF' },
  pillTextInactive: { color: '#475569' },

  faqList: { gap: 10 },
  faqCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  badge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeText: { fontSize: 10, fontWeight: '900', color: '#047857' },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '800', color: '#0F172A', lineHeight: 19 },
  faqBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
  },
  faqAnswer: { fontSize: 13, color: '#334155', lineHeight: 20 },

  empty: { alignItems: 'center', padding: 36, gap: 10 },
  emptyText: { fontSize: 14, color: '#64748B', fontWeight: '700' },
});
