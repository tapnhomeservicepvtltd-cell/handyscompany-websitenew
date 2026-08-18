import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import DynamicIcon from '../../components/DynamicIcon';
import { getServiceThumbnail } from '../../constants/serviceThumbnails';
import { getServiceById, ApiService } from '../../services/api/services';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const [service, setService] = useState<ApiService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchService = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getServiceById(id as string);
      setService(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load service details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchService();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#00A651" />
        <Text style={{ marginTop: 12, color: "#64748B" }}>Loading service details...</Text>
      </SafeAreaView>
    );
  }

  if (error || !service) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ fontSize: 16, color: '#EF4444', marginBottom: 12 }}>{error || 'Service not found'}</Text>
        <Pressable style={{ backgroundColor: '#00A651', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }} onPress={fetchService}>
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const categorySlug = service.category?.slug || (service as any).category || 'electrical';
  const bannerImage = getServiceThumbnail(id as string, categorySlug);
  const bannerSource = typeof bannerImage === 'string' ? { uri: `${bannerImage}?w=800&q=60` } : bannerImage;

  const includesList = (service.whatsIncludedEn || (service as any).includes || []).map((item: any) =>
    typeof item === 'string' ? { title: item, icon: 'check-circle' } : item
  );

  const benefitsList = (service.benefitsEn || (service as any).benefits || []).map((item: any) =>
    typeof item === 'string' ? { title: item, icon: 'shield-check' } : item
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner with Labour Free Tag + back button */}
        <View style={styles.imageContainer}>
          <Image source={bannerSource} style={styles.banner} />
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </Pressable>
          {service.labourFree && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>LABOUR FREE</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {(service as any).title || service.name}
            {(service as any).hindiTitle || service.nameHi ? ` | ${(service as any).hindiTitle || service.nameHi}` : ''}
          </Text>
          <Text style={styles.rating}>
            ★ {(service as any).rating ?? 4.8} ({(service as any).reviewsCount ?? service.reviewCount ?? 850} Reviews)
          </Text>

          {/* Pricing Row */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>⏱️ {service.duration || '30-60 Minutes'}</Text>
            <Text style={styles.infoText}>Visit ₹{service.visitCharge ?? 49}</Text>
            <Text style={[styles.infoText, { color: '#00A651', fontWeight: 'bold' }]}>
              {service.labourCharge === 'FREE' ? 'Labour FREE' : service.labourCharge || 'Labour Extra'}
            </Text>
          </View>

          {/* Description */}
          {!!service.description && <Text style={styles.desc}>{service.description}</Text>}
          {!!service.hindiDescription && <Text style={styles.hindiDesc}>{service.hindiDescription}</Text>}

          {/* Includes Grid */}
          {!!includesList.length && (
            <>
              <Text style={styles.sectionTitle}>Includes (शामिल)</Text>
              <View style={styles.grid}>
                {includesList.map((inc: any, i: number) => {
                  const isStr = typeof inc === 'string';
                  const title = isStr ? inc : inc.title;
                  const icon = isStr ? "check-circle" : inc.icon;
                  return (
                    <View key={i} style={styles.gridItem}>
                      <View style={styles.gridIconBox}>
                        <DynamicIcon name={icon} color="#00A651" size={18} fallback="check-circle" />
                      </View>
                      <Text style={styles.gridItemText}>{title}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {/* Benefits Row */}
          {!!benefitsList.length && (
            <>
              <Text style={styles.sectionTitle}>Benefits (फायदे)</Text>
              <View style={styles.benefitRow}>
                {benefitsList.map((b: any, i: number) => {
                  const isStr = typeof b === 'string';
                  const title = isStr ? b : b.title;
                  const icon = isStr ? "star-outline" : b.icon;
                  return (
                    <View key={i} style={styles.benefitItem}>
                      <View style={styles.benefitIconBox}>
                        <DynamicIcon name={icon} color="#00A651" size={20} fallback="star-outline" />
                      </View>
                      <Text style={styles.benefitText}>{title}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {/* FAQs Section */}
          {!!service.faqs?.length && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>FAQs (सवाल-जवाब)</Text>
              {service.faqs.map((faq: any, i: number) => (
                <View key={i} style={{ marginBottom: 12, backgroundColor: "#F8FAFC", padding: 12, borderRadius: 8 }}>
                  <Text style={{ fontWeight: '700', color: '#0F172A', marginBottom: 4 }}>Q: {faq.question}</Text>
                  <Text style={{ color: '#475569', fontSize: 13, lineHeight: 20 }}>A: {faq.answer}</Text>
                </View>
              ))}
            </>
          )}

          {/* Brands Section */}
          {!!service.brandsUsed?.length && (
            <>
              <Text style={styles.sectionTitle}>Brands Used (उपयोग किए गए ब्रांड)</Text>
              <View style={styles.brandRow}>
                {service.brandsUsed.map((brand: string, i: number) => (
                  <Text key={i} style={styles.brand}>{brand}</Text>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Persistent Bottom Bar */}
      <View style={styles.footer}>
        <Text style={styles.footerInfo}>
          Labour Charge {service.labourCharge || 'FREE'} | Visit Charge ₹{service.visitCharge ?? 49} | Material Extra
        </Text>
        <Pressable style={styles.btn} onPress={() => router.push(`/service/variants/${id}`)}>
          <Text style={styles.btnText}>CHOOSE VARIANT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageContainer: { position: 'relative' },
  banner: { width: '100%', height: 220, backgroundColor: '#F1F5F9' },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  badge: { position: 'absolute', top: 16, right: 16, backgroundColor: '#00A651', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  rating: { color: '#F59E0B', marginVertical: 8, fontWeight: '700' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#F8FAFC', borderRadius: 12, marginVertical: 15 },
  infoText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  desc: { fontSize: 14, color: '#444', lineHeight: 20 },
  hindiDesc: { fontSize: 14, color: '#666', marginTop: 5 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginTop: 25, marginBottom: 12, color: '#0F172A' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  gridItem: { width: '50%', flexDirection: 'row', alignItems: 'center', paddingVertical: 7, paddingHorizontal: 6 },
  gridIconBox: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: '#EAF9F0',
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  gridItemText: { color: '#334155', fontWeight: '600', fontSize: 13, flexShrink: 1 },
  benefitRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  benefitItem: { width: '23%', alignItems: 'center' },
  benefitIconBox: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#EAF9F0',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  benefitText: { fontSize: 10.5, fontWeight: '600', color: '#334155', textAlign: 'center' },
  brandRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 4 },
  brand: { fontWeight: 'bold', color: '#555', width: '48%', paddingVertical: 6 },
  footer: { padding: 16, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  footerInfo: { fontSize: 11, textAlign: 'center', color: '#00A651', marginBottom: 10 },
  btn: { backgroundColor: '#00A651', padding: 16, borderRadius: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
