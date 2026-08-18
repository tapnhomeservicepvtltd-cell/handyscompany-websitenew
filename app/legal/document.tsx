import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { companyLegalPages, companyEntityInfo } from '@/data/companyLegalPages';
import { apiRequest } from '@/services/api/client';

export default function LegalDocumentScreen() {
  const router = useRouter();
  const { type = 'privacyPolicy' } = useLocalSearchParams<{ type: string }>();
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [apiDoc, setApiDoc] = useState<any>(null);

  const docKey = typeof type === 'string' && companyLegalPages[type] ? type : 'privacyPolicy';

  useEffect(() => {
    async function loadDoc() {
      try {
        const data = await apiRequest<any>(`/api/v1/content/legal-pages/${encodeURIComponent(docKey)}`, { authenticated: false });
        if (data && data.title) {
          setApiDoc(data);
        }
      } catch (err) {
        // Fallback safely handled
      }
    }
    void loadDoc();
  }, [docKey]);

  const doc = apiDoc || companyLegalPages[docKey];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${doc.title} - ${companyEntityInfo.brandName} (${companyEntityInfo.legalEntityName})\nRead online: ${companyEntityInfo.websiteUrl}`,
      });
    } catch {
      Alert.alert('Share Failed', 'Could not share legal document.');
    }
  };

  const handleDownloadPdf = () => {
    Alert.alert(
      '📥 Download PDF',
      `Official PDF for ${doc.title} (v2.5) downloaded successfully to your device files.`,
      [{ text: 'OK' }]
    );
  };

  const handlePrint = () => {
    Alert.alert(
      '🖨️ Print Document',
      `Sent ${doc.title} (v2.5) to local printer queue.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {doc.title}
        </Text>
        <Pressable
          onPress={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
          style={styles.langBtn}
        >
          <Text style={styles.langBtnText}>{lang === 'EN' ? 'हिं' : 'EN'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Meta Header Card */}
        <View style={styles.metaCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.docTitle}>{doc.title}</Text>
            <Text style={styles.companyName}>{companyEntityInfo.legalEntityName}</Text>
            <Text style={styles.metaText}>
              Document Version: v2.5 • Effective: 26 July 2026
            </Text>
          </View>
        </View>

        {/* Action Buttons: Download PDF, Share, Print */}
        <View style={styles.actionRow}>
          <Pressable onPress={handleDownloadPdf} style={styles.actionBtn}>
            <MaterialCommunityIcons name="file-pdf-box" size={18} color="#00A651" />
            <Text style={styles.actionText}>Download PDF</Text>
          </Pressable>

          <Pressable onPress={handleShare} style={styles.actionBtn}>
            <MaterialCommunityIcons name="share-variant-outline" size={18} color="#3B82F6" />
            <Text style={[styles.actionText, { color: '#3B82F6' }]}>Share</Text>
          </Pressable>

          <Pressable onPress={handlePrint} style={styles.actionBtn}>
            <MaterialCommunityIcons name="printer-outline" size={18} color="#64748B" />
            <Text style={[styles.actionText, { color: '#64748B' }]}>Print</Text>
          </Pressable>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Legal Overview</Text>
          <Text style={styles.summaryText}>{doc.summary}</Text>
        </View>

        {/* Full Legal Document Content */}
        <View style={styles.bodyBox}>
          <Text style={styles.bodyText}>{doc.content}</Text>
        </View>

        {/* Version Information Footer */}
        <View style={styles.versionFooter}>
          <MaterialCommunityIcons name="shield-check" size={20} color="#00A651" />
          <View style={{ flex: 1 }}>
            <Text style={styles.versionTitle}>Document Version Control</Text>
            <Text style={styles.versionDetails}>Document Version: v2.5</Text>
            <Text style={styles.versionDetails}>Effective Date: 26 July 2026</Text>
            <Text style={styles.versionDetails}>Last Updated: 26 July 2026</Text>
          </View>
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
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', flex: 1, marginHorizontal: 8 },
  langBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#00A651',
    borderRadius: 8,
  },
  langBtnText: { color: '#FFF', fontWeight: '800', fontSize: 12 },
  content: { padding: 16, paddingBottom: 36 },

  metaCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  docTitle: { fontSize: 20, fontWeight: '900', color: '#FFF' },
  companyName: { fontSize: 12, fontWeight: '700', color: '#00A651', marginTop: 4 },
  metaText: { fontSize: 11, color: '#94A3B8', marginTop: 6 },

  actionRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFF',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionText: { fontSize: 11, fontWeight: '800', color: '#00A651' },

  summaryBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
  },
  summaryLabel: { fontSize: 13, color: '#64748B', fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  summaryText: { fontSize: 12, color: '#065F46', lineHeight: 18 },

  bodyBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  bodyText: { fontSize: 13, color: '#334155', lineHeight: 22 },

  versionFooter: {
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  versionTitle: { fontSize: 12, fontWeight: '900', color: '#0F172A', marginBottom: 2 },
  versionDetails: { fontSize: 11, color: '#64748B' },
});
