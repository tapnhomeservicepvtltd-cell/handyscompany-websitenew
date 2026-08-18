import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import DynamicIcon from '../../../components/DynamicIcon';
import { serviceDetails } from '../../../data/serviceDetails';
import { getVariantIcon } from '../../../utils/variantIcon';

export default function VariantsScreen() {
  const { id } = useLocalSearchParams();
  const service = serviceDetails[id as string];
  const [selected, setSelected] = useState(0);
  const variants = service?.variants ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>{service?.title?.toUpperCase() || 'CHOOSE VARIANT'}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Labour Free summary card - matches "Labour Free Service" card */}
      {service?.labourFree && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>LABOUR FREE SERVICE</Text>
          <Text style={styles.summarySub}>
            Included in {service.subscriptionPlan || '₹699 Membership'}
          </Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLine}>✅ Labour Charge : <Text style={styles.freeText}>FREE</Text></Text>
            <Text style={styles.summaryLine}>✅ Visit Charge : ₹{service.visitCharge ?? 49}</Text>
            <Text style={styles.summaryLine}>✅ Material Cost : Extra</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.chooseLabel}>Choose Type / प्रकार चुनें</Text>
        {variants.map((v: any, index: number) => (
          <Pressable
            key={index}
            style={[styles.variantItem, selected === index && styles.variantItemActive]}
            onPress={() => setSelected(index)}
          >
            <View style={styles.variantLeft}>
              <View style={[styles.iconBox, selected === index && styles.iconBoxActive]}>
                <DynamicIcon
                  name={v.icon || getVariantIcon(v.title, service?.icon)}
                  library={v.library || 'MaterialCommunityIcons'}
                  color={selected === index ? '#00A651' : '#64748B'}
                  size={20}
                />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.varTitle}>{v.title}</Text>
                {!!v.hindiTitle && <Text style={styles.varHindi}>{v.hindiTitle}</Text>}
              </View>
            </View>
            <View style={[styles.radio, selected === index && styles.radioSelected]}>
              {selected === index && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}

        {variants.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#94A3B8', marginTop: 30 }}>
            No variants available — you can continue directly.
          </Text>
        )}
      </ScrollView>

      <Pressable style={styles.btn} onPress={() => router.push('/booking/date' as any)}>
        <Text style={styles.btnText}>CONTINUE</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingBottom: 12 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#EAF9F0',
    borderWidth: 1,
    borderColor: '#BEE9CF',
  },
  summaryTitle: { fontWeight: '900', color: '#00A651', fontSize: 13, letterSpacing: 0.5 },
  summarySub: { color: '#334155', fontSize: 12, marginTop: 2, marginBottom: 10 },
  summaryRow: { gap: 4 },
  summaryLine: { fontSize: 12.5, color: '#334155', fontWeight: '600' },
  freeText: { color: '#00A651', fontWeight: '900' },
  body: { paddingHorizontal: 20 },
  chooseLabel: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8 },
  variantItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, paddingHorizontal: 14, borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 14, marginBottom: 10, backgroundColor: '#fff',
  },
  variantItemActive: { borderColor: '#00A651', backgroundColor: '#F4FBF7' },
  variantLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9',
    alignItems: 'center', justifyContent: 'center',
  },
  iconBoxActive: { backgroundColor: '#EAF9F0' },
  varTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  varHindi: { fontSize: 12, color: '#64748B', marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: '#00A651' },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: '#00A651' },
  btn: { backgroundColor: '#00A651', padding: 16, borderRadius: 14, alignItems: 'center', margin: 20 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
});
