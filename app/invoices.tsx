import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ApiError } from '@/services/api/client';
import { Invoice, getMyInvoices, getInvoicePdfUrl } from '@/services/api/invoices';

export default function InvoicesScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selected invoice modal
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      setItems(await getMyInvoices());
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : 'Invoices could not be loaded.'
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

  const handleDownloadPdf = (invoice: Invoice) => {
    const pdfUrl = getInvoicePdfUrl(invoice.id);
    void Linking.openURL(pdfUrl).catch(() => {
      Alert.alert('Download Error', 'Could not open PDF file.');
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator color="#00A651" size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Pressable onPress={() => void load()} style={styles.primary}>
          <Text style={styles.primaryText}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" />
        </Pressable>
        <Text style={styles.title}>Tax Invoices</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void load(true)} />
        }
        contentContainerStyle={styles.content}
      >
        {items.length ? (
          items.map((invoice) => (
            <Pressable
              key={invoice.id}
              style={styles.card}
              onPress={() => setSelectedInvoice(invoice)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={22}
                    color="#00A651"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.number}>{invoice.invoiceNumber}</Text>
                  <Text style={styles.booking}>
                    Booking #{invoice.booking.bookingNumber}
                  </Text>
                </View>
                <Text style={styles.total}>₹{invoice.totalAmount}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.row}>
                <Text style={styles.label}>Issued Date</Text>
                <Text style={styles.value}>
                  {new Date(invoice.issuedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>GST Tax</Text>
                <Text style={styles.value}>₹{invoice.taxAmount}</Text>
              </View>

              {/* PDF Quick Download Button */}
              <Pressable
                style={styles.downloadBtn}
                onPress={() => handleDownloadPdf(invoice)}
              >
                <MaterialCommunityIcons name="download" size={16} color="#00A651" />
                <Text style={styles.downloadText}>Download Official PDF</Text>
              </Pressable>
            </Pressable>
          ))
        ) : (
          <View style={styles.center}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={48}
              color="#94A3B8"
            />
            <Text style={styles.empty}>
              Completed-service tax invoices will appear here.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <Modal
          visible={!!selectedInvoice}
          animationType="slide"
          transparent
          onRequestClose={() => setSelectedInvoice(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Invoice Breakdown</Text>
                <Pressable onPress={() => setSelectedInvoice(null)}>
                  <MaterialCommunityIcons name="close" size={24} color="#64748B" />
                </Pressable>
              </View>

              <ScrollView style={{ maxHeight: 400 }}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalInvNum}>
                    {selectedInvoice.invoiceNumber}
                  </Text>
                  <Text style={styles.modalSub}>
                    Booking #{selectedInvoice.booking.bookingNumber}
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                  <Text style={styles.label}>Subtotal Amount</Text>
                  <Text style={styles.value}>₹{selectedInvoice.amount}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>GST / Tax (18%)</Text>
                  <Text style={styles.value}>₹{selectedInvoice.taxAmount}</Text>
                </View>
                <View style={[styles.row, { marginTop: 12 }]}>
                  <Text style={[styles.label, { fontWeight: '900', color: '#0F172A' }]}>
                    Grand Total
                  </Text>
                  <Text style={[styles.value, { fontSize: 18, color: '#00A651' }]}>
                    ₹{selectedInvoice.totalAmount}
                  </Text>
                </View>
              </ScrollView>

              <Pressable
                style={styles.modalActionBtn}
                onPress={() => handleDownloadPdf(selectedInvoice)}
              >
                <MaterialCommunityIcons name="file-pdf-box" size={20} color="#FFF" />
                <Text style={styles.modalActionText}>Download PDF Invoice</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: { fontSize: 19, fontWeight: '800', color: '#0F172A' },
  content: { padding: 16, gap: 12, paddingBottom: 36 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EAF9F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  booking: { fontSize: 12, color: '#64748B', marginTop: 3 },
  total: { fontSize: 17, fontWeight: '900', color: '#0F172A' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 },
  label: { fontSize: 13, color: '#64748B' },
  value: { fontSize: 13, fontWeight: '700', color: '#334155' },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
    paddingVertical: 10,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  downloadText: { fontSize: 13, fontWeight: '800', color: '#00A651' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 32,
  },
  error: { color: '#991B1B', textAlign: 'center' },
  empty: { fontSize: 13, color: '#64748B', textAlign: 'center' },
  primary: {
    backgroundColor: '#00A651',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },
  primaryText: { color: '#FFF', fontWeight: '800' },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  modalSection: { alignItems: 'center', marginVertical: 8 },
  modalInvNum: { fontSize: 20, fontWeight: '900', color: '#00A651' },
  modalSub: { fontSize: 13, color: '#64748B', marginTop: 4 },
  modalActionBtn: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#00A651',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  modalActionText: { color: '#FFF', fontSize: 15, fontWeight: '800' },
});
